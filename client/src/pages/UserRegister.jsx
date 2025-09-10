

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../service/api';

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

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await registerUser(form);
      alert("User registered successfully");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7ff]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="w-12 h-12 mx-auto bg-purple-100 text-purple-700 font-bold rounded-full flex items-center justify-center text-xl mb-6">
          M
        </div>
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">User Registration</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Enter your details to create a new user account.</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full border rounded px-3 py-2" required />
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" className="w-full border rounded px-3 py-2" required />

          <div className="flex gap-4 text-sm">
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g}><input type="radio" name="gender" value={g} onChange={handleChange} /> {g}</label>
            ))}
          </div>

          <div className="relative">
            <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Password" className="w-full border rounded px-3 py-2 pr-10" required />
            <span className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="relative">
            <input name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full border rounded px-3 py-2 pr-10" required />
            <span className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-purple-700 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;

