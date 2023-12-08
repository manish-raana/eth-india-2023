import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './components/layout/Layout';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai, Base } from "@thirdweb-dev/chains";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={Mumbai} supportedChains={[Mumbai, Base]} clientId="4c0c97b7299c42caf2cb72b200e924d8">
      <Layout>
        <App />
      </Layout>
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
