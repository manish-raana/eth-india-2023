import React from 'react'
import { Icon } from '@iconify/react';

type ISocialIconProps = {
  iconUrl: string;
  isHoverScale?: boolean;
};

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
      className="bg-gray-100 hover:bg-gray-200 w-full flex items-center gap-4 p-2 rounded-md"
    >
      <SocialIcon iconUrl={icon} isHoverScale={false} />
      <p>{name}</p>
    </a>
  );
};
const Preview = () => {
  return (
    <div className="">
      <div className="h-[729px] w-[380px] overflow-y-auto rounded-[3rem] ring-8 ring-slate-800 overflow-hidden">
        <div className="px-2 pb-4 bg-white h-full w-full space-y-8 pt-12 max-w-lg mx-auto">
          <div className="text-center">
            <div className="h-20 w-20 rounded-full overflow-hidden ring ring-slate-200 mx-auto">
              <img
                src="https://i.insider.com/56743fad72f2c12a008b6cc0"
                alt="name"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold mt-4 text-slate-800">
              Saurav Tomar
            </h1>
            <h1 className="text-lg font-bold mt-4 text-slate-00">
              Saurav Tomar
            </h1>
            <p className="text-sm mt-2 text-slate-600">Building web3 CRM</p>
          </div>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <SocialLink url="" iconUrl="ph:facebook-logo-duotone" />
            <SocialLink url="" iconUrl="ph:twitter-logo-duotone" />
            <SocialLink url="" iconUrl="ph:instagram-logo-duotone" />
            <SocialLink url="" iconUrl="ph:github-logo-duotone" />
            <SocialLink url="" iconUrl="ph:telegram-logo-duotone" />
            <SocialLink url="" iconUrl="ph:linkedin-logo-duotone" />
            <SocialLink url="" iconUrl="ph:envelope-duotone" />
            <SocialLink url="" iconUrl="ph:youtube-logo-duotone" />
            <SocialLink url="" iconUrl="ph:whatsapp-logo-duotone" />
            <SocialLink url="" iconUrl="www.amazon.in" />
            <SocialLink url="" iconUrl="www.flipkart.com" />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <SocialLinkList
              name="My Website"
              url="www.facebook.com"
              icon="ph:globe-duotone"
            />
            <SocialLinkList
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview