// ./pages/RegisterPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Store } from 'lucide-react'; // Make sure lucide-react is installed

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7ff] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md text-center">
        
        {/* Logo */}
        <div className="w-10 h-10 bg-purple-700 text-white rounded-md flex items-center justify-center mx-auto mb-6 text-lg font-semibold">
          M
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create an Account</h2>
        <p className="text-sm text-gray-600 mb-6">Choose your registration type.</p>

        {/* Buttons */}
        <div className="space-y-4 mb-6">
          <button
            onClick={() => navigate('/register/user')}
            className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 py-2.5 rounded-md text-gray-800 text-sm font-medium"
          >
            <User className="w-4 h-4" />
            Register as a User
          </button>

          <button
            onClick={() => navigate('/register/shop')}
            className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 py-2.5 rounded-md text-gray-800 text-sm font-medium"
          >
            <Store className="w-4 h-4" />
            Register as a Shopkeeper
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
