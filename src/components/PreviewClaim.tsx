import React, { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { IProfile } from '../types/Profile';
import { formatAddr } from '../utils/shortenAddress';
import { init, useQuery } from '@airstack/airstack-react';
import Loader from './Loader';
import { ISocialLinks } from '../types/Social';
import { IExternalLinks } from '../types/ExternalLinks';
import NftList from './NftList';
import PoapList from './PoapList';
import Jazzicon from 'react-jazzicon';

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
const normalizeLink = (inputLink: string) => {
  if (!/^https?:\/\//i.test(inputLink) && !/^www\./i.test(inputLink)) {
    inputLink = 'http://www.' + inputLink;
  } else if (!/^https?:\/\//i.test(inputLink)) {
    inputLink = 'http://' + inputLink;
  }
  return inputLink;
};
const SocialLink = ({ url, iconUrl }: ISocialLinkProps) => {
  return (
    <a href={normalizeLink(url)} target="_blank" rel="noopener noreferrer">
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
      href={normalizeLink(url)}
      target="_blank"
      className={`bg-gray-100 hover:bg-gray-200 w-full flex items-center gap-4 p-2 rounded-md ${
        name && url ? 'block' : 'hidden'
      }`}
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
  isUserPreview?: boolean;
};
const Preview = ({ profile, socialLinks, externalLinks, isUserPreview = true }: PreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ens, setENS] = useState('');
  const [poapList, setPoapList] = useState([]);
  const [nftList, setNftList] = useState([]);

  const GetPoap = (address: string) => {
    const PoapQuery = `query GetPOAPs($limit: Int $sortBy: OrderBy) {
    Poaps(
      input: {filter: {owner: {_eq: "${address}"}}, blockchain: ALL, limit: $limit, order:{createdAtBlockNumber: $sortBy}}
    ) {
      Poap {
        
        id
blockchain
tokenId
tokenAddress
poapEvent {
  city
  eventName
  startDate
  eventId
  logo: contentValue {
    image {
      small
      medium
    }
  }
}
      }
    } 
  }`;

    const variable = { limit: 10, sortBy: 'DESC' };

    const { data, loading, error } = useQuery(PoapQuery, variable);

    return data;
  };

  const GetNFT = (address: string) => {
    const NFTQuery = `query GetTokens($tokenType: [TokenType!], $limit: Int, $sortBy: OrderBy) {
    
    ethereum: TokenBalances(
      input: {filter: {owner: {_eq: "${address}"}, tokenType: {_in: $tokenType}}, blockchain: ethereum, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
    ) {
      TokenBalance {
        
        
amount
tokenType
blockchain
tokenAddress
formattedAmount
tokenId
tokenAddress
owner {
    addresses
}
tokenNfts {
    tokenId
    contentValue {
        image {
          medium
        }
    }
    erc6551Accounts {
      address {
        addresses
        tokenBalances {
          tokenAddress
          tokenId
          tokenNfts {
            contentValue {
              image {
                medium
              }
            }
          }
        }
      }
    }
}
token {
    isSpam
    name
    symbol
    logo {
      small
    }
    projectDetails {
      imageUrl
    }
}

      }
    }

    base: TokenBalances(
      input: {filter: {owner: {_eq: "${address}"}, tokenType: {_in: $tokenType}}, blockchain: base, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
    ) {
      TokenBalance {
        
        
amount
tokenType
blockchain
tokenAddress
formattedAmount
tokenId
tokenAddress
owner {
    addresses
}
tokenNfts {
    tokenId
    contentValue {
        image {
          medium
        }
    }
    erc6551Accounts {
      address {
        addresses
        tokenBalances {
          tokenAddress
          tokenId
          tokenNfts {
            contentValue {
              image {
                medium
              }
            }
          }
        }
      }
    }
}
token {
    isSpam
    name
    symbol
    logo {
      small
    }
    projectDetails {
      imageUrl
    }
}

      }
    }

    polygon: TokenBalances(
      input: {filter: {owner: {_eq: "${address}"}, tokenType: {_in: $tokenType}}, blockchain: polygon, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
    ) {
      TokenBalance {
        
        
amount
tokenType
blockchain
tokenAddress
formattedAmount
tokenId
tokenAddress
owner {
    addresses
}
tokenNfts {
    tokenId
    contentValue {
        image {
          medium
        }
    }
    erc6551Accounts {
      address {
        addresses
        tokenBalances {
          tokenAddress
          tokenId
          tokenNfts {
            contentValue {
              image {
                medium
              }
            }
          }
        }
      }
    }
}
token {
    isSpam
    name
    symbol
    logo {
      small
    }
    projectDetails {
      imageUrl
    }
}

      }
    }
  }`;

    const nftvariables = {
      limit: 10,
      sortBy: 'DESC',
      tokenType: ['ERC721', 'ERC1155'],
    };

    const { data, loading, error } = useQuery(NFTQuery, nftvariables);
    //setIsLoading(loading);
    return data;
  };

  console.log('profile?.walletAddress: ', profile?.walletAddress);
  const poapdata = GetPoap(profile?.walletAddress);
  const nftdata = GetNFT(profile?.walletAddress);

  useMemo(() => {
    //console.log('poapdata: ', poapdata);
    if (poapdata && poapdata?.Poaps?.Poap) {
      const _poapList = poapdata?.Poaps?.Poap;
      setPoapList(_poapList);
      setIsLoading(false);
    }
  }, [poapdata]);
  useMemo(() => {
    //console.log('nftdata: ', nftdata);
    if (nftdata) {
      const baseNft: [] = nftdata?.base?.TokenBalance || [];
      const polygonNft: [] = nftdata?.polygon?.TokenBalance || [];
      const ethereumNft: [] = nftdata?.ethereum?.TokenBalance || [];
      const _nftList = [...baseNft, ...polygonNft, ...ethereumNft];
      const filteredNft = _nftList.filter(
        (nft: any) => nft?.tokenNfts?.contentValue?.image?.medium
      );
      setNftList(filteredNft);
      setIsLoading(false);
    }
  }, [nftdata]);

  return (
    <div className="no-scrollbar">
      <div
        className={`no-scrollbar overflow-y-auto rounded-[3rem] overflow-hidden ${
          isUserPreview
            ? 'ring-8 ring-slate-800 w-[380px] h-[729px]'
            : 'w-[900px]'
        }`}
      >
        <div className="px-2 pb-4 bg-white h-full w-full space-y-8 pt-12 max-w-lg mx-auto">
          <div className="text-center">
            {profile?.photoUrl ? (
              <div className="h-20 w-20 rounded-full overflow-hidden ring ring-slate-200 mx-auto">
                <img
                  src={profile?.photoUrl}
                  alt="name"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full overflow-hidden ring ring-slate-200 mx-auto">
                <Jazzicon
                  diameter={100}
                  seed={Math.round(Math.random() * 10000000)}
                />
              </div>
            )}

            <h1 className="text-2xl font-bold mt-4 text-slate-800">
              {profile?.name}
            </h1>

            <p className={`text-sm mt-2 text-slate-600`}>{profile?.about}</p>

           {/*  <p className="text-sm mt-2 text-slate-600 flex gap-2 justify-center items-center">
              {(profile?.walletAddress &&
                formatAddr(profile?.walletAddress)) || (
                <p className="text-gray-400">0x20BE726807E2.....</p>
              )}

              {ens ? (
                <>
                  <span>|</span> {ens}
                </>
              ) : (
                ''
              )}
              <Loader isLoading={isLoading} />
            </p> */}
          </div>
          <div className="flex gap-3.5 items-center justify-center flex-wrap">
            {socialLinks?.facebook && (
              <SocialLink
                url={socialLinks?.facebook}
                iconUrl="ph:facebook-logo-duotone"
              />
            )}
            {socialLinks?.twitter && (
              <SocialLink
                url={socialLinks?.twitter}
                iconUrl="ph:twitter-logo-duotone"
              />
            )}
            {socialLinks?.instagram && (
              <SocialLink
                url={socialLinks?.instagram}
                iconUrl="ph:instagram-logo-duotone"
              />
            )}
            {socialLinks?.github && (
              <SocialLink
                url={socialLinks?.github}
                iconUrl="ph:github-logo-duotone"
              />
            )}
            {socialLinks?.telegram && (
              <SocialLink
                url={socialLinks?.telegram}
                iconUrl="ph:telegram-logo-duotone"
              />
            )}
            {socialLinks?.linkedIn && (
              <SocialLink
                url={socialLinks?.linkedIn}
                iconUrl="ph:linkedin-logo-duotone"
              />
            )}
            {socialLinks?.email && (
              <SocialLink
                url={'mailto:' + socialLinks?.email}
                iconUrl="ph:envelope-duotone"
              />
            )}
            {socialLinks?.youtube && (
              <SocialLink
                url={socialLinks?.youtube}
                iconUrl="ph:youtube-logo-duotone"
              />
            )}
            {socialLinks?.whatsapp && (
              <SocialLink
                url={'https://wa.me/' + socialLinks?.whatsapp}
                iconUrl="ph:whatsapp-logo-duotone"
              />
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            {externalLinks?.map((link: IExternalLinks) => (
              <SocialLinkList
                key={link?.id}
                name={link?.label}
                url={link?.url}
                icon={link?.iconKey}
              />
            ))}
          </div>
          {nftList.length > 0 && (
            <>
              <p className="text-2xl text-start font-bold">NFTs</p>
              <NftList nftList={nftList} />
            </>
          )}
          {poapList.length > 0 && (
            <>
              <p className="text-2xl text-start font-bold">POAPs</p>
              <PoapList poapList={poapList} />
            </>
          )}
          <div className="flex items-center justify-center">
            <Loader isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
