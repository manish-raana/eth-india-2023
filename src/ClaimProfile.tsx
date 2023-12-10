import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSDK } from '@thirdweb-dev/react';
import Preview from './components/Preview';
import { IExternalLinks } from './types/ExternalLinks';
import { ISocialLinks } from './types/Social';
import { IProfile } from './types/Profile';
import { createClient } from '@supabase/supabase-js';
import { init, useQuery } from '@airstack/airstack-react';
import PreviewClaim from './components/PreviewClaim';
import Jazzicon from 'react-jazzicon';

const ClaimProfile = () => {
init('158213d00525d4f0aba84af3e090fa762');

const supabaseUrl = 'https://fqieqvhbzjfvgxfbtnnf.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
console.log(supabaseKey);
  const supabase = createClient(supabaseUrl, supabaseKey!);
  
const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState<{
    externalLinks: IExternalLinks[],
    socialLinks: ISocialLinks,
    profile: IProfile
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  async function searchENSData(searchKeyword: string) {
    setIsLoading(true);
    try {
      // event.preventDefault();
      // Use a case-insensitive ILIKE query to search for the keyword in the 'ENS' column
      const { data, error } = await supabase
        .from('ens-twitter-data')
        .select('*')
        .eq('ENS', `${searchKeyword}`);

      if (error) {
        console.error('Error fetching data:', error.message);
        return null;
      }
      console.log('sup-data: ', data);

      setUserData((prevData: any) => {
        return {
          ...prevData,
          ['socialLinks']: {
            ...prevData?.socialLinks,
            ['twitter']: data[0]?.handle ? 'https://twitter.com/' + data[0]?.handle : '',
          },
          ['profile']: {
            ...prevData?.profile,
            ['photoUrl']: data[0]?.avatar,
            ['about']: data[0]?.bio,
          },
        };
      });
      
      return data;
    } catch (error: any) {
      console.error('Error:', error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (id) {
      console.log('id: ', id);
      setUserData((prevData: any) => {
        return {
          ...prevData,
          ['profile']: {
            ...prevData?.profile,
            ['walletAddress']: id,
            ['name']:id
          },
        };
      });
      searchENSData(id);
    } else {
      navigate('/');
    }
  },[id])
  return (
    <div className="flex items-start justify-center w-full h-screen">
      <PreviewClaim
        externalLinks={userData?.externalLinks!}
        profile={userData?.profile!}
        socialLinks={userData?.socialLinks!}
        isUserPreview={false}
      />
    </div>
  );
};

export default ClaimProfile;