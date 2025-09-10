import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-50 text-gray-900 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10">
            <img src={logo} alt="Barber Illustration" className="w-full h-full" />
          </div>
          <div className="text-2xl font-bold">SalonEase</div>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="#hero" className="hover:text-green-500">Home</a></li>
          <li><a href="#services" className="hover:text-green-500">Services</a></li>
          <li><a href="#about" className="hover:text-green-500">About</a></li>
          <li><a href="#contact" className="hover:text-green-500">Contact</a></li>
        </ul>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link to="/login">
            <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 font-bold">Login Now</button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-50">
          <a href="#hero" className="block py-2 hover:text-green-500">Home</a>
          <a href="#services" className="block py-2 hover:text-green-500">Services</a>
          <a href="#about" className="block py-2 hover:text-green-500">About</a>
          <a href="#contact" className="block py-2 hover:text-green-500">Contact</a>
          <Link to="/login">
            <button className="w-full bg-green-500 py-2 rounded hover:bg-green-600 font-bold">Login Now</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
