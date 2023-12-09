import React, { useMemo, useState } from 'react'
import { Icon } from '@iconify/react';
import { IProfile } from '../types/Profile';
import { formatAddr } from '../utils/shortenAddress';
import { init, useQuery } from '@airstack/airstack-react';
import Loader from './Loader';
import { ISocialLinks } from '../types/Social';
import { IExternalLinks } from '../types/ExternalLinks';
init('158213d00525d4f0aba84af3e090fa762');

type ISocialIconProps = {
  iconUrl: string;
  isHoverScale?: boolean;
};
interface Domain {
  dappName: string;
  name: string;
}

const SocialIcon = ({ iconUrl, isHoverScale = true }: ISocialIconProps) => {
  return (
    <Icon
      style={{ fontSize: '28px' }}
      icon={iconUrl}
      className={`${isHoverScale ? 'hover:scale-125' : ''}`}
    />
  );
};

type ISocialLinkProps = {
  url: string;
  iconUrl: string;
};
const SocialLink = ({ url, iconUrl }: ISocialLinkProps) => {
    return (
      <a href={url} target='_blank'>
        <SocialIcon iconUrl={iconUrl} />
      </a>
    );
};

type ISocialListProps = {
  name: string;
  url: string;
  icon: string;
};
const SocialLinkList = ({ name, url, icon }: ISocialListProps) => {
  return (
    <a
      href={url}
      target="_blank"
      className={`bg-gray-100 hover:bg-gray-200 w-full flex items-center gap-4 p-2 rounded-md ${name && url ? 'block' : 'hidden'}`}
    >
      <SocialIcon iconUrl={icon || 'ph:link-simple'} isHoverScale={false} />
      <p>{name}</p>
    </a>
  );
};

type PreviewProps = {
  profile: IProfile;
  socialLinks: ISocialLinks;
  externalLinks: IExternalLinks[];
};
const Preview = ({ profile, socialLinks, externalLinks }: PreviewProps) => {
  const [ens, setENS] = useState('');
  const EnsQuery = `query GetENS {
      Domains(
        input: {
          filter: {
            owner: {
              _in: "${profile.walletAddress}"
     
            }
          }
          blockchain: ethereum
        }
      ) {
        Domain {
          dappName
          name
        }
      }
    }`;
  const { data, loading, error } = useQuery(EnsQuery);

  if (error) {
    console.log('error: ', error);
  }

  useMemo(() => {
    if (!loading && data && data.Domains) {
      console.log(data);
      const ethNames = data?.Domains?.Domain?.filter((item: Domain) =>
        item.name.includes('.eth')
      ).map((item: Domain) => item.name);
      // Log or use the filtered array of names as needed
      console.log(ethNames[0]);
      setENS(ethNames[0]);
      // Log or use the filtered array as needed
    }
  }, [data]);
  useMemo(() => {
    if (loading) {
      setENS('');
    }
  }, [loading]);

  return (
    <div className="no-scrollbar">
      <div className="no-scrollbar h-[729px] w-[380px] overflow-y-auto rounded-[3rem] ring-8 ring-slate-800 overflow-hidden">
        <div className="px-2 pb-4 bg-white h-full w-full space-y-8 pt-12 max-w-lg mx-auto">
          <div className="text-center">
            <div className="h-20 w-20 rounded-full overflow-hidden ring ring-slate-200 mx-auto">
              <img
                src={
                  profile.photoUrl ||
                  'https://i.insider.com/56743fad72f2c12a008b6cc0'
                }
                alt="name"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold mt-4 text-slate-800">
              {profile.name || 'Den'}
            </h1>

            <p className="text-sm mt-2 text-slate-600">
              {profile.about || 'Innovating in web3'}
            </p>

            <p className="text-sm mt-2 text-slate-600 flex gap-2 justify-center items-center">
              {(profile.walletAddress && formatAddr(profile.walletAddress)) || (
                <p className="text-gray-400">0x20BE726807E2.....</p>
              )}

              {ens ? (
                <>
                  <span>|</span> {ens}
                </>
              ) : (
                ''
              )}
              <Loader isLoading={loading} />
            </p>
          </div>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <SocialLink
              url={socialLinks.facebook}
              iconUrl="ph:facebook-logo-duotone"
            />
            <SocialLink
              url={socialLinks.twitter}
              iconUrl="ph:twitter-logo-duotone"
            />
            <SocialLink
              url={socialLinks.instagram}
              iconUrl="ph:instagram-logo-duotone"
            />
            <SocialLink
              url={socialLinks.github}
              iconUrl="ph:github-logo-duotone"
            />
            <SocialLink
              url={socialLinks.telegram}
              iconUrl="ph:telegram-logo-duotone"
            />
            <SocialLink
              url={'' + socialLinks.linkedIn}
              iconUrl="ph:linkedin-logo-duotone"
            />
            <SocialLink
              url={'mailto:' + socialLinks.email}
              iconUrl="ph:envelope-duotone"
            />
            <SocialLink
              url={socialLinks.youtube}
              iconUrl="ph:youtube-logo-duotone"
            />
            <SocialLink
              url={'https://wa.me/' + socialLinks.whatsapp}
              iconUrl="ph:whatsapp-logo-duotone"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            {externalLinks.map((link: IExternalLinks) => (
              <SocialLinkList
                key={link.id}
                name={link.label}
                url={link.url}
                icon={link.iconKey}
              />
            ))}

            {/* <SocialLinkList
              name="Amazon wishlist"
              url="www.amazon.com"
              icon="ant-design:amazon-outlined"
            />
            <SocialLinkList
              name="React JS course"
              url="www.reactjs.com"
              icon="grommet-icons:reactjs"
            />
            <SocialLinkList
              name="Donate for our cause"
              url="https://who.int"
              icon="iconoir:donate"
            />
            <SocialLinkList
              name="Download my resume"
              url="www.reactjs.com"
              icon="ph:file-pdf"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview