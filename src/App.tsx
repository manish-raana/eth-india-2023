import React, { useState } from 'react';
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

// Create a Main component

const All = () => {
  const initialProfile: IProfile = {
    walletAddress: '',
    name: '',
    about: '',
    photoUrl: ''
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
    linkedIn:''
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
  return (
    <div className="App w-full md:flex bg-gray-100">
      <div className="md:w-full md:h-[88vh] py-10 overflow-y-scroll">
        <Profile profile={profile} setProfile={setProfile} />
        <div className="divider"></div>
        <Socials socialLinks={socialLinks} setSocialLinks={setSocialLinks} />
        <div className="divider"></div>
        <ExternalLinks links={links} setLinks={setLinks} />
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

      <Route path="/app" element={
      <Layout >
      <All />
      </Layout>
      } />

    </Routes>
  );
}

export default App;
