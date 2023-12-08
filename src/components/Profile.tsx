import React from 'react'

const Profile = () => {
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
              Name
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              About Yourself
            </label>
            <textarea
              className="textarea bg-gray-100 w-full"
              placeholder="I am a web3 developer"
            ></textarea>
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              Photo Url
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              placeholder="Enter your photo Url"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile