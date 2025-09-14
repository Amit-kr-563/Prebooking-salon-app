import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/auth.json";

const SalonInfoForm = ({ onNext, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ ...formData, latitude, longitude });
          alert("✅ Location detected!");
        },
        (error) => {
          alert("❌ Location detection failed: " + error.message);
        }
      );
    } else {
      alert("❌ Geolocation not supported in this browser.");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="flex w-full max-w-6xl h-[80vh] bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:w-1/2 w-full bg-gray-100 flex justify-center items-center p-4">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: "100%", maxWidth: 400 }}
          />
        </div>

        <div className="md:w-1/2 w-full p-6 overflow-y-auto">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
              Step 2: Salon Information
            </h2>

            <form onSubmit={handleNext} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Salon Name
                </label>
                <input
                  type="text"
                  value={formData.salonName}
                  onChange={(e) =>
                    setFormData({ ...formData, salonName: e.target.value })
                  }
                  placeholder="Enter salon name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
                />
                {errors.salonName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salonName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Salon Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter salon address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Salon For
                </label>
                <div className="flex gap-5">
                  {["Men", "Women", "Unisex"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type="radio"
                        name="genderType"
                        value={type}
                        checked={formData.genderType === type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            genderType: e.target.value,
                          })
                        }
                        className="accent-teal-600"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
                {errors.genderType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.genderType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Location Coordinates
                </label>
                <div className="flex gap-3 mb-2">
                  <input
                    type="text"
                    placeholder="Latitude"
                    value={formData.latitude || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
                  />
                  <input
                    type="text"
                    placeholder="Longitude"
                    value={formData.longitude || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-200"
                  />
                </div>
                <button
                  type="button"
                  onClick={detectLocation}
                  className="text-sm text-teal-600 hover:underline font-bold"
                >
                  Detect My Location
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Shop Front Photo
                </label>
                <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-purple-50">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Click to upload or drag file here
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      (PNG, JPG, GIF up to 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "shopFrontPhoto")}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Shop Interior Photo
                </label>
                <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 hover:bg-purple-50">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Click to upload or drag file here
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      (PNG, JPG, GIF up to 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "shopInteriorPhoto")}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonInfoForm;
