import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/auth.json';

const OwnerAuthStep = ({ formData, setFormData, onNext }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const handleSendOtp = () => {
    if (formData.mobile.length === 10) {
      alert(`OTP sent to ${formData.mobile} (use 1234 for demo)`);
      setOtpSent(true);
    } else {
      alert(' Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      setMobileVerified(true);
      alert('Mobile number verified!');
    } else {
      alert(' Invalid OTP.');
    }
  };

  const handleNext = () => {
    if (!mobileVerified) {
      alert('Please verify your mobile number first.');
      return;
    }
    if (!formData.password) {
      alert(' Please enter a password.');
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md w-full max-w-6xl h-[80vh] overflow-hidden">
        
        {/* Left Side - Animation */}
        <div className="md:w-1/2 w-full bg-gray-100 flex justify-center items-center p-4">
          <Lottie animationData={animationData} loop={true} style={{ width: '100%', maxWidth: 500 }} />
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 w-full flex justify-center items-center p-6">
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center text-teal-600 mb-5">
              Owner Authentication
            </h2>

            <label className="block text-sm font-bold text-gray-700 mb-1"> Mobile Number</label>
            <input
              type="tel"
              maxLength="10"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              placeholder="Enter a 10-digit mobile no:"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none mb-4 transition duration-200"
            />
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer w-full"
              >
                Send OTP
              </button>
            )}

            {otpSent && !mobileVerified && (
              <>
                <label className="block text-sm font-bold text-gray-700 mb-1 mt-3"> Enter OTP</label>
                <input
                  type="text"
                  maxLength="4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none mb-4 transition duration-200"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer w-full"
                >
                  Verify OTP
                </button>
              </>
            )}

            <label className="block text-sm font-bold text-gray-700 mb-1 mt-3">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none mb-5 transition duration-200"
            />

            <button
              onClick={handleNext}
              disabled={!mobileVerified}
              className={`w-full py-2 rounded-lg font-bold transition duration-200 ${
                mobileVerified
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              Next 
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default OwnerAuthStep;
