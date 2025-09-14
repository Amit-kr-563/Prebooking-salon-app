import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-teal-100 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10">
            <img
              src={logo}
              alt="Barber Illustration"
              className="w-full h-full"
            />
          </div>
          <div className="text-2xl font-bold">SalonEase</div>
        </div>

        <ul className="hidden md:flex space-x-6 font-bold">
          <li>
            <a href="#hero" className="hover:text-teal-900">
              Home
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-teal-900">
              Services
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-teal-900">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-teal-900">
              Contact
            </a>
          </li>
        </ul>

        <div className="hidden md:block">
          <Link to="/login">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
            >
              Login Now
            </button>
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-50">
          <a href="#hero" className="block py-2 hover:text-green-500">
            Home
          </a>
          <a href="#services" className="block py-2 hover:text-green-500">
            Services
          </a>
          <a href="#about" className="block py-2 hover:text-green-500">
            About
          </a>
          <a href="#contact" className="block py-2 hover:text-green-500">
            Contact
          </a>
          <Link to="/login">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login Now
            </button>{" "}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
