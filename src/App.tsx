import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Preview from './components/Preview';
import Profile from './components/Profile';
import Socials from './components/Socials';
import ExternalLinks from './components/ExternalLinks';
import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Layout from './components/layout/Layout';
import { IProfile } from './types/Profile';
import { ISocialLinks } from './types/Social';
import { IExternalLinks } from './types/ExternalLinks';
import { useSDK, useAddress } from '@thirdweb-dev/react';
import { decodeData, encodeData } from './utils/transformer';
import { DotContactAddress, DotContractAbi } from './abi/dottt';
import { SuccessAlert } from './utils/alerts';
import { ethers } from 'ethers';
import ProfileView from './ProfileView';
import Loader from './components/Loader';
// Create a Main component

const All = () => {
  const [linkId, setLinkId] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const address = useAddress();
  console.log('address: ', address);
  //const address = '0x4b70d04124c2996de29e0caa050a49822faec6cc';
  const initialProfile: IProfile = {
    walletAddress: '',
    name: '',
    about: '',
    photoUrl: '',
  };
  const initialSocialLinks: ISocialLinks = {
    facebook: '',
    youtube: '',
    instagram: '',
    twitter: '',
    whatsapp: '',
    telegram: '',
    github: '',
    email: '',
    linkedIn: '',
  };
  const [profile, setProfile] = useState<IProfile>(initialProfile);
  const [socialLinks, setSocialLinks] =
    useState<ISocialLinks>(initialSocialLinks);
  const initialLinks: IExternalLinks[] = [
    {
      id: 1,
      label: 'My Website',
      iconKey: 'ph:globe-duotone',
      url: 'www.abc.com',
    },
    {
      id: 2,
      label: 'Amazon',
      iconKey: 'mdi:amazon',
      url: 'www.amazon.com',
    },
    {
      id: 3,
      label: 'React Js Course',
      iconKey: 'grommet-icons:reactjs',
      url: 'www.reactjs.com',
    },
  ];
  const [links, setLinks] = useState(initialLinks);
  const handlePublish = () => {
    const data = {
      externalLinks: links,
      socialLinks: socialLinks,
      profile: profile
    }
    const encodedData = encodeData(data);
    //console.log('encodedData: ', encodedData);
    /* const decodedData = decodeData(String(encodedData));
    console.log('decodedData: ', decodedData); */
    storeEncodedData(encodedData);
  }
  useEffect(() => {
    setProfile({...initialProfile, walletAddress:address!});
  },[address]);
  const sdk = useSDK();

  const storeEncodedData = async (encodedData: string) => {
    try {
      setIsLoader(true);
      const DotContract = await sdk?.getContractFromAbi(
        DotContactAddress,
        DotContractAbi
      );
      const tx = await DotContract?.call('compress', [encodedData]);
     
      console.log('tx: ', tx.receipt);
      if (tx && tx.receipt) {
        const event:any = tx.receipt.events[0].args;
        console.log('link-id: ', parseInt(event[0]));
        setLinkId(parseInt(event[0]));
        SuccessAlert('Published Successfully!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className="App w-full md:flex bg-gray-100">
      <div className="relative md:w-full md:h-[88vh] py-10 overflow-y-scroll">
        <Profile profile={profile} setProfile={setProfile} />
        <div className="divider"></div>
        <Socials socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
        <div className="divider"></div>
        <ExternalLinks
          links={links}
          setLinks={setLinks}
          handlePublish={handlePublish}
          linkId={linkId}
          isLoader={isLoader}
        />
        <button
          onClick={handlePublish}
          className="fixed left-5 hidden bottom-16 btn btn-primary md:btn-wide md:flex items-center gap-4 w-full"
          disabled={isLoader}
        >
          Publish
          <Loader isLoading={isLoader} />
        </button>
      </div>
      <div className="md:w-1/2 p-10 bg-white flex items-center justify-center">
        <Preview
          profile={profile}
          socialLinks={socialLinks}
          externalLinks={links}
        />
      </div>
    </div>
  );
};

// Modify App component to use Routes and define routes
function App() {
  return (
    <Routes>
      {/* Route for the current content */}
      <Route path="/" element={<Main />} />
      {/* Route for the Main component */}

      <Route
        path="/app"
        element={
          <Layout>
            <All />
          </Layout>
        }
      />
      <Route path="/:id" element={<ProfileView />} />
    </Routes>
  );
}

export default App;

