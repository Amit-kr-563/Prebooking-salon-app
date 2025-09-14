import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { getCurrentUser } from "../service/api";

import haircutMen from "../assets/haircut.jpg";
import beardTrim from "../assets/shaving.jpg";
import shaving from "../assets/shaving.jpg";
import hairColor from "../assets/color.jpg";
import headMassage from "../assets/massage.jpg";

import haircutWomen from "../assets/w-cut.jpg";
import facial from "../assets/wface.jpg";
import manicure from "../assets/wpedi.jpg";
import pedicure from "../assets/wpedi.jpg";
import threading from "../assets/wspa.jpg";

import massage from "../assets/massage.jpg";
import bridal from "../assets/ob.jpg";
import skinCare from "../assets/massage.jpg";
import nailArt from "../assets/massage.jpg";
import hairStyling from "../assets/massage.jpg";

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

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500">Loading user data...</p>
    );

  const menServices = [
    { name: "Haircut", image: haircutMen },
    { name: "Beard Trim", image: beardTrim },
    { name: "Shaving / Styling", image: shaving },
    { name: "Hair Color / Highlight", image: hairColor },
    { name: "Head Massage", image: headMassage },
  ];

  const womenServices = [
    { name: "Haircut", image: haircutWomen },
    { name: "Facial", image: facial },
    { name: "Manicure", image: manicure },
    { name: "Pedicure", image: pedicure },
    { name: "Threading", image: threading },
  ];

  const unisexServices = [
    { name: "Massage", image: massage },
    { name: "Bridal Package", image: bridal },
    { name: "Skin Care", image: skinCare },
    { name: "Nail Art", image: nailArt },
    { name: "Hair Styling", image: hairStyling },
  ];

  const servicesByGender = {
    Men: menServices.map((s) => s.name),
    Women: womenServices.map((s) => s.name),
    Unisex: unisexServices.map((s) => s.name),
  };

  const currentServiceOptions = servicesByGender[searchGender] || [];

  const ServiceSection = ({ title, services }) => (
    <section className="mt-12 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
        {title}
        <span className="ml-3 w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 inline-block rounded"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer border border-gray-100 text-center"
          >
            <div className="h-32 flex items-center justify-center mb-4">
              <img
                src={service.image}
                alt={service.name}
                className="max-h-full object-contain"
              />
            </div>
            <p className="font-semibold text-gray-700">{service.name}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <UserNavbar />
      <div className="p-6 md:p-8 max-w-7xl mx-auto mt-10">
        <div className="bg-gradient-to-r from-gray-100 via-white to-blue-50 p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Welcome, <span className="text-teal-600">{user.data?.name}</span>
          </h1>

          <div className="mt-6 bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <label className="text-gray-600 font-bold mb-1 block">
                Location
              </label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Pincode, city, or address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="text-gray-600 font-medium mb-1 block">
                Gender
              </label>
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
              <label className="text-gray-600 font-medium mb-1 block">
                Service
              </label>
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
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Search
            </button>
          </div>

          <ServiceSection title=" Men Services" services={menServices} />
          <ServiceSection title=" Women Services" services={womenServices} />
          <ServiceSection title=" Unisex Services" services={unisexServices} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
