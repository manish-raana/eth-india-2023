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
      className={`text-gray-500 ${isHoverScale ? 'hover:scale-125' : ''}`}
    />
  );
};

const Socials = () => {
  return (
    <div className="md:flex items-start p-5 pt-0 justify-between">
      <div className="text-start my-2 md:my-0">
        <p className="font-bold text-md">Social Links</p>
        <p className="text-sm">Add some social media links</p>
      </div>
      <div className="md:w-2/3">
        <div className="bg-white gap-4 p-5 flex flex-wrap w-full rounded-xl">
          <div className="md:w-[48%] w-full">
            <label className="label" htmlFor="">
              Facebook
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ph:facebook-logo" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your facebook profile"
              />
            </div>
          </div>
          <div className="md:w-[48%] w-full">
            <label className="label" htmlFor="">
              Twitter
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ph:twitter-logo" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your twitter profile"
              />
            </div>
          </div>
          <div className="md:w-[48%] w-full">
            <label className="label" htmlFor="">
              Instagram
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ph:instagram-logo" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your instagram profile"
              />
            </div>
          </div>
          <div className="md:w-[48%] w-full">
            <label className="label" htmlFor="">
              Github
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ph:github-logo" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your github profile"
              />
            </div>
          </div>
          <div className="md:w-[48%] w-full">
            <label className="label" htmlFor="">
              Telegram
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ph:telegram-logo" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your telegram handle"
              />
            </div>
          </div>
          <div className="md:w-[48%] w-full">
            <label className="label" htmlFor="">
              Linkedin
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ph:linkedin-logo" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your linkedin profile"
              />
            </div>
          </div>
          <div className="md:w-[48%] w-full">
            <label className="label" htmlFor="">
              Email
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ic:outline-email" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="md:w-[48%] w-full">
            <label className="label" htmlFor="">
              Youtube
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ph:youtube-logo" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your youtube channel link"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              Whatsapp
            </label>
            <div className="join flex gap-2 items-center bg-gray-100 border-2">
              <div className="flex items-center justify-center px-2">
                <SocialIcon iconUrl="ph:whatsapp-logo" isHoverScale={false} />
              </div>
              <input
                className="input w-full bg-white focus:outline-none rounded-l-none"
                type="text"
                placeholder="Enter your whatsapp number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Socials