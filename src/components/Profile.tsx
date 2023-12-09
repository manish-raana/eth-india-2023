import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { init, useQuery } from '@airstack/airstack-react';
import { IProfile } from '../types/Profile';

init('158213d00525d4f0aba84af3e090fa762');

type ProfileProps = {
  profile: IProfile;
  setProfile: any;
};
function Profile({ profile, setProfile }: ProfileProps) {
  interface Event {
    city: string;
    eventId: string;
    eventName: string;
    logo: string;
    startDate: string;
  }

  interface Poap {
    Blockchain: string;
    id: string;
    poapEvent: Event;
    tokenAddress: string;
    tokenId: string;
  }

  return (
    <div className="md:flex items-start p-5 justify-between">
      <div className="text-start my-2 md:my-0">
        <p className="font-bold text-md">Profile</p>
        <p className="text-sm">Some public information about you</p>
      </div>
      <div className="md:w-2/3">
        <div className="bg-white p-5 card flex flex-col items-start justify-start w-full">
          <div className="w-full">
            <label className="label" htmlFor="">
              Wallet Address
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              name="walletAddress"
              value={profile.walletAddress}
              onChange={(e: any) =>
                setProfile((profile: IProfile) => {
                  return {
                    ...profile,
                    [e.target.name]: e.target.value,
                  };
                })
              }
              placeholder="0x20BE726807E2....."
            />
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              Name
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              name="name"
              value={profile.name}
              onChange={(e: any) =>
                setProfile((profile: IProfile) => {
                  return {
                    ...profile,
                    [e.target.name]: e.target.value,
                  };
                })
              }
              placeholder="Enter your name"
            />
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              About Yourself
            </label>
            <textarea
              name="about"
              className="textarea bg-gray-100 w-full"
              placeholder="I am a web3 developer"
              value={profile.about}
              onChange={(e: any) =>
                setProfile((profile: IProfile) => {
                  return {
                    ...profile,
                    [e.target.name]: e.target.value,
                  };
                })
              }
            ></textarea>
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              Photo Url
            </label>
            <input
              name="photoUrl"
              className="input bg-gray-100 w-full"
              type="text"
              placeholder="Enter your photo Url"
              value={profile.photoUrl}
              onChange={(e: any) =>
                setProfile((profile: IProfile) => {
                  return {
                    ...profile,
                    [e.target.name]: e.target.value,
                  };
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
