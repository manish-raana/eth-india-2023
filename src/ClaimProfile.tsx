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
  const sdk = useSDK();
  const addrQuery = `query GetUserDetailsFromENS {
            Socials(
              input: {
                filter: { identity: { _eq: "${id}" } }
                blockchain: ethereum
              }
            ) {
              Social {
                userAddress
                dappName
                profileName
              }
            }
          }`;
  const { data, loading, error } = useQuery(addrQuery);
  
  if (error) {
    console.log('error: ', error);
  }

  useMemo(() => {
    if (!loading && data && data?.Socials && data?.Socials?.Social) {
      console.log('resolved-data: ', data?.Socials?.Social[0]);
      const addr = data?.Socials?.Social[0]?.userAddress;
      if (addr) { 
        setUserData((prevData:any) => { 
        return {
          ...prevData,
          ['profile']: {
            ...prevData?.profile,
            ['walletAddress']: addr,
          },
        };
      })
      }
    }
  }, [data]);

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
      console.log('data: ', data);

      setUserData((prevData: any) => {
        return {
          ...prevData,
          ['socialLinks']: {
            ...prevData?.socialLinks,
            ['twitter']: 'https://twitter.com/' + data[0]?.handle,
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
      searchENSData(id);
    } else {
      navigate('/');
    }
  },[id])
  return (
    <div className="flex items-start justify-center w-full h-screen">
      <Preview
        externalLinks={userData?.externalLinks!}
        profile={userData?.profile!}
        socialLinks={userData?.socialLinks!}
        isUserPreview={false}
      />
    </div>
  );
};

export default ClaimProfile;