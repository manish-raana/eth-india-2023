import React, { useState } from 'react';
import { XCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { IExternalLinks } from '../types/ExternalLinks';
import Loader from './Loader';
import { useCopyToClipboard } from 'usehooks-ts';
import { SuccessAlert } from '../utils/alerts';


type RowProps = {
  link: IExternalLinks;
  handleRowRemove: any;
  handleRowUpdate: any;
};

const Row = ({ link, handleRowRemove, handleRowUpdate }: RowProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedLink = { ...link, [name]: value };
    handleRowUpdate(updatedLink);
  };
  return (
    <div className="bg-white p-5 rounded-xl flex flex-wrap gap-4 group w-full relative">
      <div className="absolute -right-1 -top-1 invisible group-hover:visible cursor-pointer">
        <XCircleIcon className="w-10" onClick={() => handleRowRemove(link)} />
      </div>
      <div className="md:w-[48%]">
        <label className="label" htmlFor="">
          Icon Key (optional)
        </label>
        <input
          name="iconKey"
          value={link.iconKey}
          onChange={handleChange}
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
          name="label"
          value={link.label}
          onChange={handleChange}
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
          name="url"
          value={link.url}
          onChange={handleChange}
          className="input bg-gray-100 w-full"
          type="text"
          placeholder="Enter site url"
        />
      </div>
    </div>
  );
};

type Props = {
  links: IExternalLinks[];
  setLinks: any;
  handlePublish: any;
  linkId: number;
  isLoader: boolean;
};
const ExternalLinks = ({
  links,
  setLinks,
  handlePublish,
  linkId,
  isLoader,
}: Props) => {
  const [value, copy] = useCopyToClipboard();
  const handleRowUpdate = (updatedLink: IExternalLinks) => {
    const updatedList = links.map((link) =>
      link.id === updatedLink.id ? updatedLink : link
    );
    setLinks(updatedList);
  };
  const handleRowRemove = (item: any) => {
    const newList = links.filter((link: IExternalLinks) => link.id !== item.id);
    setLinks(newList);
  };
  const handleRowAdd = () => {
    const newlink = {
      id: links.length + 1,
      label: '',
      iconKey: '',
      url: '',
    };
    const updatedLink = [...links, newlink];
    setLinks(updatedLink);
  };
  const handleCopy = () => {
    const link = window.location.origin + '/' + linkId;
    copy(link);
    SuccessAlert('Link Copied Successfully!');
  }
  return (
    <>
      <div className="md:flex items-start p-5 pt-0 justify-between">
        <div className="text-start my-2 md:my-0">
          <p className="font-bold text-md">Links</p>
          <p className="text-sm">Add some links here</p>
          <p className="text-xs">
            Icon keys can be found on
            <a
              className="ml-2 hover:underline"
              target="_blank"
              href="https://icones.js.org/."
            >
              https://icones.js.org/.
            </a>
          </p>
        </div>
        <div className="md:w-2/3 flex flex-col gap-6">
          {links.map((link: IExternalLinks, index: number) => (
            <Row
              key={index}
              link={link}
              handleRowRemove={handleRowRemove}
              handleRowUpdate={handleRowUpdate}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-end gap-4 px-5 ">
        <button
          onClick={handleRowAdd}
          className="btn btn-neutral md:w-2/3"
          disabled={isLoader}
        >
          Add More Link
        </button>
        <button
          onClick={handlePublish}
          className="btn btn-primary md:btn-wide flex items-center gap-4 w-full md:hidden"
          disabled={isLoader}
        >
          Publish
          <Loader isLoading={isLoader} />
        </button>
      </div>

      {linkId !== 0 && (
        <div className="flex items-center justify-center md:justify-center px-5 mt-2 -ml-2 font-bold">
          <p>
            Your Link:{' '}
            <a
              className="hover:underline ml-3"
              target="_blank"
              href={`${window.location.origin}/${linkId}`}
            >
              {window.location.origin}/{linkId}
            </a>
          </p>

          <DocumentDuplicateIcon
            className="w-6 ml-2 cursor-pointer hover:scale-125"
            onClick={handleCopy}
          />
        </div>
      )}
    </>
  );
};

export default ExternalLinks;
