import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
// import loginImage from '../assets/login-img.png';
import animationData from '../assets/Login.json';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobile || !password) {
      alert('Please enter mobile and password');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', { mobile, password });
      const { token, role, data } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('userId', data._id);

      if (role === 'shopkeeper') localStorage.setItem('salonId', data._id);

      alert(res.data.message || 'Login successful');

      if (role === "shopkeeper") navigate('/shopkeeper/dashboard');
      else if (role === "user") navigate('/user/dashboard');
      else alert("Unknown role!");
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Image Section */}
       <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-4">
          <Lottie animationData={animationData} loop={true} style={{ width: '100%', maxWidth: 400 }} />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl text-center md:text-left font-bold text-teal-600 mb-2 ">Welcome to SalonEase</h1>
          <p className="text-gray-500 mb-6 text-center md:text-left font-bold">Login with Mobile</p>

          <input
            type="text"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            placeholder="Mobile"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-gray-500">
            Don't have account?{' '}
            <span className="text-teal-700 cursor-pointer font-bold" onClick={() => navigate('/register')}>
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
