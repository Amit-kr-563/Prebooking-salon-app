import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "My Profile", path: "/profile" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Payment History", path: "/payment-history" },
    { name: "About Us", path: "/about" },
    { name: "Help", path: "/help" },
  ];

  return (
    <nav className="w-full bg-gray-300 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center space-x-2">
                    <div className="h-10 w-10">
                      <img src={logo} alt="Barber Illustration" className="w-full h-full" />
                    </div>
                    <div className="text-2xl font-bold">SalonEase</div>
                  </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center text-gray-800  hover:text-teal-700 transition font-bold text-xl"
            >
              View Profile <ChevronDown size={18} className="ml-1" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl py-2 border border-gray-100 flex flex-col">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(item.path)}
                    className="px-4 py-2 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            Log out
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-full right-6 mt-2 w-52 bg-white shadow-xl rounded-xl border border-gray-100 flex flex-col py-2 md:hidden"
          >
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className="px-4 py-2 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-4 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserNavbar;
