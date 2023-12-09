import React from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useNetworkMismatch, useSwitchChain } from '@thirdweb-dev/react';
import { ScrollSepoliaTestnet } from '@thirdweb-dev/chains';

const Navbar = () => {
  const isMismatched = useNetworkMismatch();
  const switchChain = useSwitchChain();
 
  return (
    <div className="navbar bg-base-100 px-10 border border-b">
      <div className="navbar-start">
        <a href='/' className="btn btn-ghost text-xl rounded-full w-12 p-0">
          <img src="/logo.png" className="w-64" alt="" />
        </a>
      </div>

      <div className="navbar-end flex gap-4 items-center">
        {isMismatched && (
          <button
            onClick={() => switchChain(ScrollSepoliaTestnet.chainId)}
            className="btn btn-error"
          >
            Switch to Scroll Sepolia
          </button>
        )}
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
