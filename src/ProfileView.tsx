import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSDK } from '@thirdweb-dev/react';
import { DotContactAddress, DotContractAbi } from './abi/dottt';
import { decodeData } from './utils/transformer';
import Preview from './components/Preview';
import { IExternalLinks } from './types/ExternalLinks';
import { ISocialLinks } from './types/Social';
import { IProfile } from './types/Profile';

const ProfileView = ({ match }: any) => {
  const [userData, setUserData] = useState<{
    externalLinks: IExternalLinks[],
    socialLinks: ISocialLinks,
    profile: IProfile
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  const sdk = useSDK();
  const getExpandedData = async() => {
    try {
      const DotContract = await sdk?.getContractFromAbi(
        DotContactAddress,
        DotContractAbi
      );
      const data = await DotContract?.call('expand', [id]);
      console.log('data: ', data);
      const _decodedData:any = decodeData(data[1]);
      console.log('decodedData: ', _decodedData);
      if (
        _decodedData &&
        _decodedData.profile &&
        _decodedData.socialLinks &&
        _decodedData.externalLinks
      ) {
        setUserData(_decodedData);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (id) { 
      getExpandedData();
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

export default ProfileView