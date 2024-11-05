// hooks/useMetaMask.ts
import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';




declare global {
  interface Window {
    ethereum: any;
  }
}

export const useMetaMask = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<{ symbol: string; amount: number; value: number }>({
    symbol: 'ETH',
    amount: 0,
    value: 0,
  });
  const [network, setNetwork] = useState('Ethereum Mainnet');

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } else {
      alert("MetaMask is not installed");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setTokenBalance({ symbol: 'ETH', amount: 0, value: 0 });
  };

  return { walletAddress, connectWallet, disconnectWallet, tokenBalance, network };
};
