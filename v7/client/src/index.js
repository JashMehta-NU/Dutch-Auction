import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContractDeployer from './components/AuctionDeploy';
import ConnectWalletButton from './components/connectwalletbutton';
import reportWebVitals from './reportWebVitals';
import AuctionInfo from './components/AuctionInfo';
import Bid from './components/Bid';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";


function getLibrary(provider) {
  return new Web3Provider(provider);
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectWalletButton />
    </Web3ReactProvider>, */}


    {/* <App /> */}

    <ContractDeployer />
    <AuctionInfo />
    <Bid />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
