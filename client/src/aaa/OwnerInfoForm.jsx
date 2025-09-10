// components/OwnerInfoForm.jsx
import { useState } from "react";

const OwnerInfoForm = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.ownerName) newErrors.ownerName = "Owner name is required";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Valid 10-digit mobile number is required";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext(); // Call parent step change
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Step 1: Owner Information</h2>
      <form onSubmit={handleNext} className="space-y-4">
        <div>
          <label className="block font-medium">Owner Name</label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName}</p>}
        </div>

        <div>
          <label className="block font-medium">Mobile Number</label>
          <input
            type="tel"
            maxLength={10}
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>

        <div>
          <label className="block font-medium">Email ID</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default OwnerInfoForm;