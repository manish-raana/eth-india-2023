import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <img src="/logo.png" alt="" />
          </div>
        </div>
        <a className="btn btn-ghost text-xl rounded-full w-12 p-0">
          <img src="/logo.png" className='w-64' alt="" />
        </a>
      </div>

      <div className="navbar-end">
        <ConnectWallet />
      </div>
    </div>
  );
}

export default Navbar