import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/userNavbar";
import { getCurrentUser } from "../service/api"; 

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchService, setSearchService] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/login"); 
      return;
    }

    getCurrentUser(token)
      .then((data) => {
        setUser(data); // backend se aaya user data
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        navigate("/login"); // agar error hai (expired token) to login
      });
  }, [navigate]);

  const handleSearch = () => {
    if (!searchLocation || !searchGender || !searchService) {
      alert("Please fill all search fields");
      return;
    }

    navigate("/results", {
      state: {
        location: searchLocation.trim(),
        gender: searchGender,
        service: searchService,
      },
    });
  };


  if (!user) return <p className="text-center mt-10">Loading user data...</p>;

  // --- Rest of your services code (same as before) ---
  const servicesByGender = {
    Men: ["Haircut", "Shaving", "Beard Trim", "Head Massage"],
    Women: ["Haircut", "Facial", "Manicure", "Pedicure", "Threading"],
    Unisex: ["Haircut", "Facial", "Spa", "Massage"],
  };

  const currentServiceOptions = servicesByGender[searchGender] || [];

  const menServices = [
    { name: "Haircut", emoji: "✂️" },
    { name: "Beard Trim", emoji: "🧔" },
    { name: "Shaving / Styling", emoji: "🪒" },
    { name: "Hair Color / Highlight", emoji: "🎨" },
    { name: "Head Massage", emoji: "💆" },
  ];

  const womenServices = [
    { name: "Haircut", emoji: "✂️" },
    { name: "Hair Spa", emoji: "🌿" },
    { name: "Facial", emoji: "💆‍♀️" },
    { name: "Waxing", emoji: "🕯️" },
    { name: "Makeup", emoji: "💄" },
    { name: "Mehndi", emoji: "🌸" },
    { name: "Manicure", emoji: "💅" },
    { name: "Pedicure", emoji: "🦶" },
    { name: "Threading", emoji: "🧵" },
  ];

  const unisexServices = [
    { name: "Massage", emoji: "💆" },
    { name: "Bridal Package", emoji: "👰" },
    { name: "Groom Package", emoji: "🤵" },
    { name: "Skin Care", emoji: "🌟" },
    { name: "Nail Art", emoji: "💅" },
    { name: "Hair Styling", emoji: "💇" },
    { name: "Spa & Relaxation", emoji: "🧖" },
  ];

  // ✅ Reusable Service Section
  const ServiceSection = ({ title, services }) => (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        {title}
        <span className="ml-3 w-12 h-[3px] bg-yellow-500 inline-block rounded"></span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="text-5xl mb-3">{service.emoji}</div>
            <p className="text-lg font-medium">{service.name}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <UserNavbar />

      <div className="p-8 max-w-5xl mx-auto bg-white shadow-md rounded mt-10">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.data?.name}</h1>

        {/* Search Form */}
        <div className="mt-6 bg-gray-50 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">🔍 Search Salon</h2>

          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="📍 Location (pincode, city, or address)"
            className="w-full border rounded px-3 py-2 mb-3"
          />

          <select
            value={searchGender}
            onChange={(e) => {
              setSearchGender(e.target.value);
              setSearchService("");
            }}
            className="w-full border rounded px-3 py-2 mb-3"
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Female</option>
            <option value="Unisex">Unisex</option>
          </select>

          <select
            value={searchService}
            onChange={(e) => setSearchService(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3"
            disabled={!searchGender}
          >
            <option value="">Select Service</option>
            {currentServiceOptions.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Services Sections */}
        <ServiceSection title="💇 Men Services" services={menServices} />
        <ServiceSection title="💇‍♀️ Women Services" services={womenServices} />
        <ServiceSection title="🌸 Unisex Services" services={unisexServices} />
      </div>
    </>
  );
};

export default UserDashboard;
