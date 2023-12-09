import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { init, useQuery } from '@airstack/airstack-react';

init('158213d00525d4f0aba84af3e090fa762');

function Profile() {
  const address = useAddress();
  const [_address, setAddress] = useState<string>(address || '');
  const [ens, setENS]=useState('')
  const [poaps, setPoaps]=useState()

  interface Domain {
    dappName: string;
    name: string;
  }

  interface Event {
    city: string,
    eventId: string,
    eventName: string,
    logo: string,
    startDate: string
  }

  interface Poap {
    Blockchain: string;
    id: string;
    poapEvent: Event;
    tokenAddress: string;
    tokenId: string;
  }




  const GetENS = () => {
    const ENS = `query GetENS {
      Domains(
        input: {
          filter: {
            owner: {
              _in: "0x4b70d04124c2996de29e0caa050a49822faec6cc"
     
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
    const { data, loading, error } = useQuery(ENS);
    return data
  };

  const GetPoap = () => {
    const PoapQuery = `
    query GetPOAPs($limit: Int $sortBy: OrderBy) {
      Poaps(
        input: {filter: {owner: {_eq: "0x4b70d04124c2996de29e0caa050a49822faec6cc"}}, blockchain: ALL, limit: $limit, order:{createdAtBlockNumber: $sortBy}}
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
    }
    `

    const variable = {"limit":10,"sortBy":"DESC"}



    const { data, loading, error } = useQuery(PoapQuery,variable);

    return data
  }

  const GetTokens = () => {
    const tokenQuery = `
    query GetTokens($tokenType: [TokenType!], $limit: Int, $sortBy: OrderBy) {
    
      ethereum: TokenBalances(
        input: {filter: {owner: {_eq: "0x4b70d04124c2996de29e0caa050a49822faec6cc"}, tokenType: {_in: $tokenType}}, blockchain: ethereum, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
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
        input: {filter: {owner: {_eq: "0x4b70d04124c2996de29e0caa050a49822faec6cc"}, tokenType: {_in: $tokenType}}, blockchain: base, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
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
        input: {filter: {owner: {_eq: "0x4b70d04124c2996de29e0caa050a49822faec6cc"}, tokenType: {_in: $tokenType}}, blockchain: polygon, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
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
    }
    `

    const tokenVariables={"limit":50,"sortBy":"DESC","tokenType":["ERC20"]}

    const { data, loading, error } = useQuery(tokenQuery,tokenVariables);

    return data
  }

  const GetNFT = () => {
    const NFTQuery = `
    query GetTokens($tokenType: [TokenType!], $limit: Int, $sortBy: OrderBy) {
    
      ethereum: TokenBalances(
        input: {filter: {owner: {_eq: "0x4b70d04124c2996de29e0caa050a49822faec6cc"}, tokenType: {_in: $tokenType}}, blockchain: ethereum, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
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
        input: {filter: {owner: {_eq: "0x4b70d04124c2996de29e0caa050a49822faec6cc"}, tokenType: {_in: $tokenType}}, blockchain: base, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
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
        input: {filter: {owner: {_eq: "0x4b70d04124c2996de29e0caa050a49822faec6cc"}, tokenType: {_in: $tokenType}}, blockchain: polygon, limit: $limit, order: {lastUpdatedTimestamp: $sortBy}}
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
    }
    `

    const nftvariables = {"limit":10,"sortBy":"DESC","tokenType":["ERC721","ERC1155"]}

    const { data, loading, error } = useQuery(NFTQuery,nftvariables);

    return data
  }


  const ensdata=GetENS()
  const poapdata=GetPoap()
  const tokendata=GetTokens()
  const nftdata = GetNFT()
  console.log(tokendata)



  useEffect(() => {

    if(ensdata){
      if(ensdata.Domains!=null)
      {
        console.log(ensdata)
        const ethNames = ensdata.Domains.Domain
        .filter((item: Domain) => item.name.includes('.eth'))
        .map((item: Domain) => item.name);

      // Log or use the filtered array of names as needed
      console.log(ethNames[0]);
      setENS(ensdata)
        // Log or use the filtered array as needed
      }
    }

    if(poapdata){
      console.log(poapdata)
      const poaps = poapdata.Poaps.Poap
      .map((item: Poap)=> item.poapEvent)
      .map((items:Event)=> items.eventName)

      console.log(poaps)
      setPoaps(poapdata)
    }

    if(tokendata){
      console.log(tokendata)
    }

    if(nftdata){
      console.log(nftdata)
    }
  }, [_address]);

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
              value={_address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x20BE726807E2....." />
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              Name
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              value={ens}
              onChange={(e=>setENS(e.target.value))}
              placeholder="Enter your name" />
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              About Yourself
            </label>
            <textarea
              className="textarea bg-gray-100 w-full"
              placeholder="I am a web3 developer"
              value={poaps || "Poaps"}
            ></textarea>
          </div>
          <div className="w-full">
            <label className="label" htmlFor="">
              Photo Url
            </label>
            <input
              className="input bg-gray-100 w-full"
              type="text"
              placeholder="Enter your photo Url" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
