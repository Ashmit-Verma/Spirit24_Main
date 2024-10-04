import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#141414] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <button className="bg-red-500 border-2 border-white text-white px-4 py-2 rounded-full transition-all hover:bg-red-600">
            Home
          </button>
          <a href="/login" className="bg-[#141414] border-2 border-white text-white px-4 py-2 rounded-full transition-all hover:bg-gray-800">
            Dashboard
          </a>
        </div>

        {/* Center: Logo */}
        <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          <img src="logo.png" alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Right: User Profile Icon */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="text-black" size={20} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <button className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded-full transition-all hover:bg-red-600">
            Home
          </button>
          <button className="block w-full text-left bg-gray-800 text-white px-4 py-2 rounded-full transition-all hover:bg-gray-700">
            Dashboard
          </button>
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
              <User className="text-black" size={20} />
            </div>
            <span className="text-white">User Profile</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
