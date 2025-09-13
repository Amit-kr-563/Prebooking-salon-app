import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
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
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Error fetching user:", err);
        navigate("/login");
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

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading user data...</p>;

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

  // Modern Service Section
  const ServiceSection = ({ title, services }) => (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
        {title}
        <span className="ml-3 w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 inline-block rounded"></span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer border border-gray-100"
          >
            <div className="text-5xl mb-4">{service.emoji}</div>
            <p className="text-lg font-semibold text-gray-700">{service.name}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <UserNavbar />

      <div className="p-8 max-w-6xl mx-auto mt-10">
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Welcome, <span className="text-teal-600">{user.data?.name}</span>
          </h1>

          {/* Search Form */}
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <label className="text-gray-600 font-bold mb-1 block">Location</label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Pincode, city, or address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="text-gray-600 font-medium mb-1 block">Gender</label>
              <select
                value={searchGender}
                onChange={(e) => {
                  setSearchGender(e.target.value);
                  setSearchService("");
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-gray-600 font-medium mb-1 block">Service</label>
              <select
                value={searchService}
                onChange={(e) => setSearchService(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                disabled={!searchGender}
              >
                <option value="">Select Service</option>
                {currentServiceOptions.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Services Sections */}
          <ServiceSection title="💇 Men Services" services={menServices} />
          <ServiceSection title="💇‍♀️ Women Services" services={womenServices} />
          <ServiceSection title="🌸 Unisex Services" services={unisexServices} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
