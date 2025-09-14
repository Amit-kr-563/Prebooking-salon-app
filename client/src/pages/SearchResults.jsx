import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { searchSalons } from "../service/api";
import Navbar from "../components/UserNavbar";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Rating");

  const searchParams = location.state || {};

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await searchSalons(searchParams);
        setResults(data.salons || []);
      } catch (err) {
        console.error("Search failed", err);
        alert("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchParams]);

  const handleFilter = (type) => {
    let sorted = [...results];
    if (type === "Rating") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    setActiveFilter(type);
    setResults(sorted);
  };

  if (loading)
    return (
      <p className="p-8 text-lg text-center text-gray-600">
        Loading search results...
      </p>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 md:p-8 mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Available Salons
        </h2>

        <div className="flex justify-center gap-3 flex-wrap mb-8">
          {["Rating", "Price: Low to High", "Price: High to Low", "Nearby"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                className={`px-4 py-2 rounded-md border transition ${
                  activeFilter === filter
                    ? "bg-teal-700 text-white border-teal-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-teal-800"
                }`}
                disabled={filter === "Nearby"}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {results.length === 0 ? (
          <p className="text-center text-gray-500 font-bold">
            No salons found.
          </p>
        ) : (
          <div className="flex overflow-x-auto gap-6 py-4">
            {results.map((salon) => (
              <div
                key={salon._id}
                className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
              >
                <img
                  src={`http://localhost:5000/uploads/${salon.shopFrontPhoto}`}
                  alt={salon.salonName}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{salon.salonName}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-1 text-teal-600" />
                    {salon.address}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      salon.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-teal-600 underline"
                  >
                    View on Map
                  </a>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <FaStar className="mr-1" />
                    {salon.rating > 0
                      ? salon.rating.toFixed(1)
                      : "No rating yet"}
                    {salon.reviewCount > 0 && (
                      <span className="text-gray-500 ml-1">
                        ({salon.reviewCount})
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {salon.servicesAndTiming?.services?.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs bg-teal-100 text-teal-700 rounded-full"
                      >
                        {service.name}
                      </span>
                    ))}
                  </div>
                  <button
                    className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                    onClick={() =>
                      navigate(`/booking/${salon._id}`, { state: salon })
                    }
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
