import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // mobile nav
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown (desktop)
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Close profile dropdown on outside click (desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  // ✅ Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white relative">
      {/* Left - Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="bg-purple-700 text-white font-semibold w-8 h-8 flex items-center justify-center rounded">
          M
        </div>
        <span className="font-semibold text-xl text-purple-700">Project</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 relative">
        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center text-purple-700 font-medium hover:text-purple-900 transition"
          >
            View Profile <ChevronDown size={18} className="ml-1" />
          </button>

          {profileOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-lg flex flex-col py-2 z-50">
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
              >
                My Profile
              </button>
              <button
                onClick={() => navigate("/my-bookings")}
                className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
              >
                My Bookings
              </button>
              <button
                onClick={() => navigate("/payment-history")}
                className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
              >
                Payment History
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/help")}
                className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
              >
                Help
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="text-red-700 font-medium hover:text-red-900 transition"
        >
          Log out
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-purple-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* ✅ Mobile Dropdown (direct options) */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-full right-4 mt-2 w-48 bg-white shadow-lg rounded-lg flex flex-col py-2 md:hidden z-50"
        >
          <button
            onClick={() => {
              navigate("/profile");
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
          >
            My Profile
          </button>
          <button
            onClick={() => {
              navigate("/my-bookings");
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
          >
            My Bookings
          </button>
          <button
            onClick={() => {
              navigate("/payment-history");
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
          >
            Payment History
          </button>
          <button
            onClick={() => {
              navigate("/about");
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
          >
            About Us
          </button>
          <button
            onClick={() => {
              navigate("/help");
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left text-purple-700 hover:bg-purple-100"
          >
            Help
          </button>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="px-4 py-2 text-left text-red-700 hover:bg-red-100"
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;