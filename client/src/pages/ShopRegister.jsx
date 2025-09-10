
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Banknote } from 'lucide-react';
import { registerShopkeeper } from '../service/api'; // <-- API call function

const ShopRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName: '',
    shopkeeperName: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadhar: '',
    bankDetails: '',
    category: 'Men',     // default value
    services: [ ],      // at least one service
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleServiceChange = (index, value) => {
    const updatedServices = [...form.services];
    updatedServices[index] = value;
    setForm({ ...form, services: updatedServices });
  };

  const addService = () => {
    setForm({ ...form, services: [...form.services, ''] });
  };

  const removeService = (index) => {
    const updatedServices = [...form.services];
    updatedServices.splice(index, 1);
    setForm({ ...form, services: updatedServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      await registerShopkeeper(form); // your API call
      alert('Shopkeeper registered successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7ff]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="w-12 h-12 mx-auto bg-purple-100 text-purple-700 font-bold rounded-full flex items-center justify-center text-xl mb-6">
          M
        </div>
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">Shopkeeper Registration</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Enter your details to create a new shopkeeper account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <input name="shopName" value={form.shopName} onChange={handleChange} placeholder="Shop Name" className="w-1/2 border rounded px-3 py-2" required />
            <input name="shopkeeperName" value={form.shopkeeperName} onChange={handleChange} placeholder="Shopkeeper Name" className="w-1/2 border rounded px-3 py-2" required />
          </div>

          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" className="w-full border rounded px-3 py-2" required />

          <div className="flex gap-3">
            <div className="relative w-1/2">
              <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Password" className="w-full border rounded px-3 py-2 pr-10" required />
              <span className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <div className="relative w-1/2">
              <input name="confirmPassword" type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full border rounded px-3 py-2 pr-10" required />
              <span className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <textarea name="address" value={form.address} onChange={handleChange} placeholder="Local Address" className="w-full border rounded px-3 py-2" rows={2} required />

          <div className="flex gap-3">
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-1/3 border rounded px-3 py-2" required />
            <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-1/3 border rounded px-3 py-2" required />
            <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="w-1/3 border rounded px-3 py-2" required />
          </div>

          <div className="flex gap-3">
            <input name="aadhar" value={form.aadhar} onChange={handleChange} placeholder="Aadhar Number" className="w-1/2 border rounded px-3 py-2" required />
          </div>

          <div className="relative">
            <input name="bankDetails" value={form.bankDetails} onChange={handleChange} placeholder="Enter Bank Details" className="w-full border rounded px-3 py-2 pl-8" required />
            <Banknote size={18} className="absolute top-2.5 left-2 text-gray-500" />
          </div>

          {/* 🆕 Category Dropdown */}
          <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
            <option value="Men">Men's Salon</option>
            <option value="Women">Women's Salon</option>
          </select>

          {/* 🆕 Services Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Services Offered</label>
            {form.services.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(index, e.target.value)}
                  placeholder={`Service ${index + 1}`}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {form.services.length > 1 && (
                  <button type="button" onClick={() => removeService(index)} className="text-red-600 text-sm">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addService} className="text-sm text-purple-700 hover:underline mt-1">
              + Add another service
            </button>
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

export default ShopRegister;
