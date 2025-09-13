// ./pages/RegisterPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Store } from 'lucide-react';
import Lottie from 'lottie-react';
import animationData from '../assets/register.json';

// import profile from "../assets/login-img.png"

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Image Section */}
       <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-4">
          <Lottie animationData={animationData} loop={true} style={{ width: '100%', maxWidth: 400 }} />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2 text-center md:text-left">
            Create an Account
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left font-bold ">
            Choose your registration type
          </p>

          {/* Buttons */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => navigate('/register/user')}
              className="w-full border border-gray-300 hover:bg-teal-500 flex items-center justify-center gap-2 py-3 rounded-lg text-gray-800 font-medium transition"
            >
              <User className="w-5 h-5" />
              Register as a User
            </button>

            <button
              onClick={() => navigate('/register/shop')}
              className="w-full border border-gray-300 hover:bg-teal-500 flex items-center justify-center gap-2 py-3 rounded-lg text-gray-800 font-medium transition"
            >
              <Store className="w-5 h-5" />
              Register as a Shopkeeper
            </button>
          </div>

          {/* Footer */}
          <p className="text-center md:text-left text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-700 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
