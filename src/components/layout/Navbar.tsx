import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-10 border border-b">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl rounded-full w-12 p-0">
          <img src="/logo.png" className="w-64" alt="" />
        </a>
      </div>

      <div className="navbar-end">
        <ConnectWallet />
      </div>
    </div>
  );
}

export default Navbar