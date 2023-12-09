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
import { useSDK, useAddress } from '@thirdweb-dev/react';
import { decodeData, encodeData } from './utils/transformer';
import { DotContactAddress, DotContractAbi } from './abi/dottt';
import { SuccessAlert } from './utils/alerts';
import { ethers } from 'ethers';
import ProfileView from './ProfileView';
// Create a Main component

const All = () => {
  const [linkId, setLinkId] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  //const address = useAddress();
  const address = '0x4b70d04124c2996de29e0caa050a49822faec6cc';
  const initialProfile: IProfile = {
    walletAddress: address || '',
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

  const sdk = useSDK();

  const storeEncodedData = async (encodedData: string) => {
    try {
      setIsLoader(true);
      const DotContract = await sdk?.getContractFromAbi(
        DotContactAddress,
        DotContractAbi
      );
      const tx = await DotContract?.call('compress', [encodedData]);
     /*  const tx = {
        receipt: {
          to: '0xCBca82302699b4C98BfaF49bF4f4d27c3FDa1848',
          from: '0x20BE726807E2A60d56625384D003a7F1E5e96b6F',
          contractAddress: null,
          transactionIndex: 2,
          gasUsed: {
            type: 'BigNumber',
            hex: '0x092333',
          },
          logsBloom:
            '0x00000000000000000000000000000000000000000000000000000008000000000000000010000000000000000000000040000000000000000020000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000',
          blockHash:
            '0x6c50fa61d744316b6add36559081bf6c870559e638f2457f420f144342147157',
          transactionHash:
            '0xf720c00fc68ea66593acceb34cb53f36913a6d332a27333a17881484abe48e30',
          logs: [
            {
              transactionIndex: 2,
              blockNumber: 2534141,
              transactionHash:
                '0xf720c00fc68ea66593acceb34cb53f36913a6d332a27333a17881484abe48e30',
              address: '0xCBca82302699b4C98BfaF49bF4f4d27c3FDa1848',
              topics: [
                '0x9b7f4b64c618b7f4556eb67a96d7a0e26e168a77de8cc56d4dab673fd7b10756',
              ],
              data: '0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002a465794a6c6548526c636d356862457870626d747a496a706265794a705a4349364d537769624746695a5777694f694a4e655342585a574a7a6158526c4969776961574e76626b746c65534936496e426f4f6d647362324a6c4c57523162335276626d55694c434a31636d77694f694a336433637559574a6a4c6d4e7662534a394c487369615751694f6a4973496d7868596d5673496a6f6951573168656d39754969776961574e76626b746c65534936496d316b6154706862574636623234694c434a31636d77694f694a336433637559573168656d39754c6d4e7662534a394c487369615751694f6a4d73496d7868596d5673496a6f69556d566859335167536e4d6751323931636e4e6c4969776961574e76626b746c65534936496d6479623231745a58517461574e76626e4d36636d56685933527163794973496e567962434936496e6433647935795a57466a6447707a4c6d4e7662534a39585377696332396a6157467354476c7561334d694f6e73695a6d466a5a574a76623273694f6949694c434a356233563064574a6c496a6f69496977696157357a6447466e636d4674496a6f6949697769644864706448526c6369493649694973496e646f5958527a59584277496a6f6949697769644756735a576479595730694f6949694c434a6e6158526f645749694f6949694c434a6c625746706243493649694973496d7870626d746c5a456c75496a6f69496e3073496e427962325a70624755694f6e736964324673624756305157526b636d567a63794936496a42344e4749334d4751774e4445794e474d794f546b325a4755794f575577593246684d445577595451354f4449795a6d466c597a5a6a59794973496d3568625755694f6949694c434a68596d39316443493649694973496e426f6233527656584a73496a6f69496e313900000000000000000000000000000000000000000000000000000000',
              logIndex: 5,
              blockHash:
                '0x6c50fa61d744316b6add36559081bf6c870559e638f2457f420f144342147157',
            },
          ],
          blockNumber: 2534141,
          confirmations: 1,
          cumulativeGasUsed: {
            type: 'BigNumber',
            hex: '0x0d812b',
          },
          effectiveGasPrice: {
            type: 'BigNumber',
            hex: '0x29b92700',
          },
          status: 1,
          type: 0,
          byzantium: true,
          events: [
            {
              transactionIndex: 2,
              blockNumber: 2534141,
              transactionHash:
                '0xf720c00fc68ea66593acceb34cb53f36913a6d332a27333a17881484abe48e30',
              address: '0xCBca82302699b4C98BfaF49bF4f4d27c3FDa1848',
              topics: [
                '0x9b7f4b64c618b7f4556eb67a96d7a0e26e168a77de8cc56d4dab673fd7b10756',
              ],
              data: '0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002a465794a6c6548526c636d356862457870626d747a496a706265794a705a4349364d537769624746695a5777694f694a4e655342585a574a7a6158526c4969776961574e76626b746c65534936496e426f4f6d647362324a6c4c57523162335276626d55694c434a31636d77694f694a336433637559574a6a4c6d4e7662534a394c487369615751694f6a4973496d7868596d5673496a6f6951573168656d39754969776961574e76626b746c65534936496d316b6154706862574636623234694c434a31636d77694f694a336433637559573168656d39754c6d4e7662534a394c487369615751694f6a4d73496d7868596d5673496a6f69556d566859335167536e4d6751323931636e4e6c4969776961574e76626b746c65534936496d6479623231745a58517461574e76626e4d36636d56685933527163794973496e567962434936496e6433647935795a57466a6447707a4c6d4e7662534a39585377696332396a6157467354476c7561334d694f6e73695a6d466a5a574a76623273694f6949694c434a356233563064574a6c496a6f69496977696157357a6447466e636d4674496a6f6949697769644864706448526c6369493649694973496e646f5958527a59584277496a6f6949697769644756735a576479595730694f6949694c434a6e6158526f645749694f6949694c434a6c625746706243493649694973496d7870626d746c5a456c75496a6f69496e3073496e427962325a70624755694f6e736964324673624756305157526b636d567a63794936496a42344e4749334d4751774e4445794e474d794f546b325a4755794f575577593246684d445577595451354f4449795a6d466c597a5a6a59794973496d3568625755694f6949694c434a68596d39316443493649694973496e426f6233527656584a73496a6f69496e313900000000000000000000000000000000000000000000000000000000',
              logIndex: 5,
              blockHash:
                '0x6c50fa61d744316b6add36559081bf6c870559e638f2457f420f144342147157',
              args: [
                {
                  type: 'BigNumber',
                  hex: '0x01',
                },
                'eyJleHRlcm5hbExpbmtzIjpbeyJpZCI6MSwibGFiZWwiOiJNeSBXZWJzaXRlIiwiaWNvbktleSI6InBoOmdsb2JlLWR1b3RvbmUiLCJ1cmwiOiJ3d3cuYWJjLmNvbSJ9LHsiaWQiOjIsImxhYmVsIjoiQW1hem9uIiwiaWNvbktleSI6Im1kaTphbWF6b24iLCJ1cmwiOiJ3d3cuYW1hem9uLmNvbSJ9LHsiaWQiOjMsImxhYmVsIjoiUmVhY3QgSnMgQ291cnNlIiwiaWNvbktleSI6Imdyb21tZXQtaWNvbnM6cmVhY3RqcyIsInVybCI6Ind3dy5yZWFjdGpzLmNvbSJ9XSwic29jaWFsTGlua3MiOnsiZmFjZWJvb2siOiIiLCJ5b3V0dWJlIjoiIiwiaW5zdGFncmFtIjoiIiwidHdpdHRlciI6IiIsIndoYXRzYXBwIjoiIiwidGVsZWdyYW0iOiIiLCJnaXRodWIiOiIiLCJlbWFpbCI6IiIsImxpbmtlZEluIjoiIn0sInByb2ZpbGUiOnsid2FsbGV0QWRkcmVzcyI6IjB4NGI3MGQwNDEyNGMyOTk2ZGUyOWUwY2FhMDUwYTQ5ODIyZmFlYzZjYyIsIm5hbWUiOiIiLCJhYm91dCI6IiIsInBob3RvVXJsIjoiIn19',
              ],
              event: 'LinkAdded',
              eventSignature: 'LinkAdded(uint256,string)',
            },
          ],
        },
      }; */
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
      <div className="md:w-full md:h-[88vh] py-10 overflow-y-scroll">
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

