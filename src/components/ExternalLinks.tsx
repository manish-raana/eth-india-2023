import React from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline';

const ExternalLinks = () => {
  return (
    <div className="md:flex items-start p-5 pt-0 justify-between">
      <div className="text-start my-2 md:my-0">
        <p className="font-bold text-md">Links</p>
        <p className="text-sm">Add some links here</p>
        <p className="text-xs">
          Icon keys can be found in https://icones.js.org/.
        </p>
      </div>
      <div className="md:w-2/3">
        <div className="bg-white p-5 rounded-xl flex flex-wrap gap-4 group w-full relative">
          <div className="absolute -right-1 -top-1 invisible group-hover:visible cursor-pointer">
            <XCircleIcon className="w-10" />
          </div>
          <div className="md:w-[48%]">
            <label className="label" htmlFor="">
              Icon Key (optional)
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              placeholder="Enter icon key"
            />
          </div>
          <div className="md:w-[48%]">
            <label className="label" htmlFor="">
              Label
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              placeholder="Enter label"
            />
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              URL
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              placeholder="Enter site url"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExternalLinks