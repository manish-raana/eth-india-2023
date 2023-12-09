import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import Layout from './components/layout/Layout';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ScrollSepoliaTestnet } from '@thirdweb-dev/chains';
import { BrowserRouter } from "react-router-dom"; 
import App from './App';
import Main from './main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThirdwebProvider
      activeChain={ScrollSepoliaTestnet}
      supportedChains={[ScrollSepoliaTestnet]}
      clientId="4c0c97b7299c42caf2cb72b200e924d8"
    >
      <App />
    </ThirdwebProvider>
  </BrowserRouter>
);

