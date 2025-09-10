import { useState } from "react";

const SalonInfoForm = ({ onNext, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ ...formData, latitude, longitude });
          alert("📍 Location detected!");
        },
        (error) => {
          alert("❌ Location detection failed: " + error.message);
        }
      );
    } else {
      alert("Geolocation not supported in this browser.");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.salonName) newErrors.salonName = "Salon name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.genderType) newErrors.genderType = "Select salon type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [key]: file });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Step 2: Salon Information
      </h2>

      <form onSubmit={handleNext} className="space-y-5">
        {/* ✅ Salon Name */}
        <div>
          <label className="block font-medium text-gray-700">Salon Name</label>
          <input
            type="text"
            value={formData.salonName}
            onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
          />
          {errors.salonName && <p className="text-red-500 text-sm">{errors.salonName}</p>}
        </div>

        {/* ✅ Address */}
        <div>
          <label className="block font-medium text-gray-700">Salon Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* ✅ Gender Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Salon For</label>
          <div className="flex gap-5">
            {["Men", "Women", "Unisex"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="genderType"
                  value={type}
                  checked={formData.genderType === type}
                  onChange={(e) => setFormData({ ...formData, genderType: e.target.value })}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          {errors.genderType && (
            <p className="text-red-500 text-sm">{errors.genderType}</p>
          )}
        </div>

        {/* ✅ Location Detection */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Location Coordinates</label>
          <div className="flex gap-3 mb-2">
            <input
              type="text"
              placeholder="Latitude"
              value={formData.latitude || ""}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              className="w-1/2 border px-4 py-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Longitude"
              value={formData.longitude || ""}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              className="w-1/2 border px-4 py-2 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={detectLocation}
            className="text-sm text-blue-600 hover:underline"
          >
            📍 Detect My Location
          </button>
        </div>

        {/* ✅ Shop Front Photo */}
        <div>
          <label className="block font-medium text-gray-700">Shop Front Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "shopFrontPhoto")}
            className="block w-full border rounded-md p-2"
          />
        </div>

        {/* ✅ Shop Interior Photo */}
        <div>
          <label className="block font-medium text-gray-700">Shop Interior Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "shopInteriorPhoto")}
            className="block w-full border rounded-md p-2"
          />
        </div>

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md"
          >
            ⬅ Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Next ➡
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalonInfoForm;