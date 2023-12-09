import React from 'react';

const NftList = ({ nftList }: any) => {
  console.log('nftList: ', nftList);
  return (
    <div className="carousel carousel-center max-w-md p-4 space-x-4 rounded-box">
      {nftList?.map((nft: any, index: number) => (
        <div key={index} className="relative carousel-item">
          <img
            src={nft?.tokenNfts?.contentValue?.image?.medium}
            className="rounded-box w-56 h-40"
          />
          <p className="absolute -bottom-5 right-5 text-xs">
            Chain:{' '}
            <span className="capitalize font-bold">{nft.blockchain}</span>
          </p>
          <p className="absolute -bottom-5 left-5 text-xs">
            Amount: <span className="capitalize font-bold">{nft.amount}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default NftList;
