// context/MetaMaskContext.js or .ts
import { createContext, useContext, useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';

const MetaMaskContext = createContext();

import { ReactNode } from 'react';

export const MetaMaskProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Connect wallet and save address to state and localStorage
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]); // Save to localStorage
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  // Disconnect wallet and clear localStorage
  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
  };

  // Check for existing wallet connection on load
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  return (
    <MetaMaskContext.Provider value={{ walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => useContext(MetaMaskContext);
