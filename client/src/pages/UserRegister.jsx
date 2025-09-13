import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../service/api';
import registerImg from '../assets/reg.png'; // replace with your uploaded image
import Lottie from 'lottie-react';
import animationData from '../assets/Code.json';

const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");

    try {
      await registerUser(form);
      alert("User registered successfully");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden h-[700px] md:h-[500px]">

        {/* Left Image Section */}
         <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-4">
          <Lottie animationData={animationData} loop={true} style={{ width: '100%', maxWidth: 400 }} />
        </div>


        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2 text-center md:text-left">
            Register Now
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left font-semibold">
            Fill in this form to create a new user account.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />

            <div className="flex gap-4 text-sm justify-center md:justify-start ">
              {['Male', 'Female', 'Other'].map(g => (
                <label key={g} className="flex items-center gap-1 ">
                  <input className='accent-teal-500' type="radio" name="gender" value={g} onChange={handleChange} /> {g}
                </label>
              ))}
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button type="submit" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer w-full">
              Register
            </button>
          </form>

          <p className="text-sm text-center md:text-left text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-700 hover:underline font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
