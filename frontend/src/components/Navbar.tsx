// components/Navbar.tsx
import { usePathname } from 'next/navigation';
import { useMetaMask } from '../context/MetaMaskContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { BsGlobe, BsWallet } from 'react-icons/bs';

export default function Navbar() {
  const { walletAddress, connectWallet, disconnectWallet } = useMetaMask();
  const { logout } = useAuth(); // Access logout function
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 p-4 shadow-md">
      <div className={`container mx-auto flex items-center ${isAuthPage ? 'justify-center' : 'justify-between'}`}>
        {isAuthPage ? (
          <h1 className="text-2xl font-bold text-neutral-light">Welcome to Crypto Title</h1>
        ) : (
          <>
            <h1 className="text-xl font-bold text-primary flex items-center space-x-2">
              <BsGlobe /> <span>Crypto Title Dashboard</span>
            </h1>

            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="flex items-center space-x-1 text-neutral-light hover:text-primary-dark">
                <FaHome />
                <span>Dashboard</span>
              </a>
              <a href="/profile" className="flex items-center space-x-1 text-neutral-light hover:text-primary-dark">
                <FaUser />
                <span>Profile</span>
              </a>

              <div className="relative">
                <button
                  onClick={() => {
                    if (!walletAddress) {
                      connectWallet();
                    }
                    toggleDropdown();
                  }}
                  className="py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75 flex items-center space-x-2"
                >
                  <BsWallet className="mr-2" />
                  {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect MetaMask"}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 border border-neutral-light bg-background-accent p-4 rounded-lg shadow-lg z-20">
                    {walletAddress && (
                      <button
                        onClick={disconnectWallet}
                        className="w-full text-left text-primary hover:text-primary-dark py-2"
                      >
                        Disconnect Wallet
                      </button>
                    )}
                    <button
                      onClick={logout} // Trigger logout function
                      className="w-full text-left text-primary hover:text-primary-dark py-2 mt-2 border-t border-neutral-dark pt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
