
import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { searchSalons } from '../service/api';

const SearchResults = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Rating');

  const searchParams = location.state || {};

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await searchSalons(searchParams);
        setResults(data.salons || []);
      } catch (err) {
        console.error('Search failed', err);
        alert('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  const handleFilter = (type) => {
    let sorted = [...results];
    if (type === 'Rating') {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    setActiveFilter(type);
    setResults(sorted);
  };

  if (loading) return <p className="p-8 text-lg text-center">Loading search results...</p>;

  return (
    <div className="min-h-screen p-6 bg-[#f6f3fd] text-[#1c0631] font-sans">
      <h2 className="text-2xl font-bold mb-4">Available Salons</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['Rating', 'Price: Low to High', 'Price: High to Low', 'Nearby'].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={`px-4 py-2 rounded-md border ${
              activeFilter === filter
                ? 'bg-purple-800 text-white'
                : 'bg-white text-black'
            }`}
            disabled={filter === 'Nearby'}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search Results */}
      {results.length === 0 ? (
        <p>No salons found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {results.map((salon) => (
            <div
              key={salon._id}
              className="bg-white rounded-xl shadow-md overflow-hidden max-w-md"
            >
              <img
                src={`http://localhost:5000/uploads/${salon.shopFrontPhoto}`}
                alt={salon.salonName}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{salon.salonName}</h3>
                <p className="flex items-center text-sm text-gray-600 mt-1">
                  <FaMapMarkerAlt className="mr-1 text-purple-800" /> {salon.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    salon.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-700 underline mt-1 inline-block"
                >
                  View on Map
                </a>
<div className="flex items-center mt-2 text-yellow-600">
  <FaStar className="mr-1" />
  <span className="text-sm">
    {salon.rating > 0 ? salon.rating.toFixed(1) : "No rating yet"}
    {salon.reviewCount > 0 && (
      <span className="text-gray-600 ml-1">
        ({salon.reviewCount} reviews)
      </span>
    )}
  </span>
</div>


                <div className="flex flex-wrap gap-2 mt-3">
  {salon.servicesAndTiming?.services?.map((service, idx) => (
    <span
      key={idx}
      className="px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded-md"
    >
      {service.name}
    </span>
  ))}
</div>

                  <button
  className="w-full bg-purple-800 text-white py-2 mt-4 rounded-md hover:bg-purple-900 transition"
  onClick={() => navigate(`/booking/${salon._id}`, { state: salon })}
>
  Book Now
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
