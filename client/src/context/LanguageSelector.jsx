import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

function LanguageSelector() {
  const { setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showPopup, setShowPopup] = useState(!localStorage.getItem('language'));
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleContinue = () => {
    setLanguage(selectedLanguage);
    setShowPopup(false);
    navigate('/login');
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Choose your language</h2>
        <p className="text-sm text-gray-600 mb-4">Select your preferred language to continue.</p>

        <div className="space-y-3 mb-6">
          {["English", "Hindi"].map((lang) => (
            <label key={lang} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="language"
                value={lang}
                checked={selectedLanguage === lang}
                onChange={handleLanguageChange}
                className="form-radio text-purple-700"
              />
              <span className="text-gray-800 text-sm">{lang === "Hindi" ? "हिंदी (Hindi)" : "English"}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-md text-sm font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default LanguageSelector;
