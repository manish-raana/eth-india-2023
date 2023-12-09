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
import Explorer from './components/landing/explorer';
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
  const handleDemoLoad = () => {
    const demoProfile = {
      walletAddress: '0x74B428c4871aD222c62cF85Fe077960b8C73E043',
      name: 'Saurav Tomar',
      about: 'Building web3 CRM',
      photoUrl: 'https://i.insider.com/56743fad72f2c12a008b6cc0',
    };
    setProfile(demoProfile)
    const demoSocialLinks = {
      facebook: 'https://www.facebook.com/john_snow',
      twitter: 'https://twitter.com/aimlbigdata',
      instagram: 'https://www.instagram.com/s',
      email: 'founders@xagi.in',
      github: 'https://github.com/sauravtom',
      telegram: 'https://t.me/stomatrix',
      whatsapp: '+918888888888',
      youtube: 'https://youtube.com/@john_snow',
      linkedIn: 'https://www.linkedin.com/in/saurav-tomar-863796238/',
    };
    setSocialLinks(demoSocialLinks)
    const demoExternalLinks = [
      {
        id: 1,
        label: 'My Website',
        iconKey: 'ph:globe-duotone',
        url: 'https://xagi.in',
      },
      {
        id: 2,
        label: 'Amazon wishlist',
        iconKey: 'ant-design:amazon-outlined',
        url: 'https://amazon.in',
      },
      {
        id: 3,
        label: 'React JS course',
        iconKey: 'grommet-icons:reactjs',
        url: 'https://reactjs.org/',
      },
      {
        id: 4,
        label: 'Donate for our cause',
        iconKey: 'iconoir:donate',
        url: 'https://who.int',
      },
      {
        id: 5,
        label: 'Download my resume',
        iconKey: 'ph:file-pdf',
        url: 'https://google.com',
      },
    ];
    setLinks(demoExternalLinks)
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
          className="fixed left-5 hidden bottom-24 btn btn-primary md:btn-wide md:flex items-center gap-4 w-full"
          disabled={isLoader}
        >
          Publish
          <Loader isLoading={isLoader} />
        </button>
        <button
          onClick={handleDemoLoad}
          className="fixed left-5 hidden bottom-8 btn bg-gray-300 md:btn-wide md:flex items-center gap-4 w-full"
          disabled={isLoader}
        >
          Load Demo Data
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
      <Route
        path="/explore"
        element={
          <Explorer />
        }
      />
    </Routes>
  );
}

export default App;

