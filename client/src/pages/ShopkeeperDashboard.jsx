import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../service/api";
import { useNavigate } from "react-router-dom";

const ShopkeeperDashboard = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await getCurrentUser(token);

        if (res.role !== "shopkeeper") {
          setError("This account is not a shopkeeper.");
        } else {
          setShop(res.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch shop data");
      }
      setLoading(false);
    };

    fetchShop();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p>Loading shopkeeper profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!shop) return <p>No shop data found.</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-md rounded mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopkeeper Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/my-booking")}
          className="text-purple-700 font-medium hover:text-purple-900 transition"
        >
          Your Booking
        </button>
      </div>

      <p>
        <strong>Salon Name:</strong> {shop.salonName}
      </p>
      <p>
        <strong>Owner Name:</strong> {shop.ownerName}
      </p>
      <p>
        <strong>Mobile:</strong> {shop.mobile}
      </p>
      <p>
        <strong>Address:</strong> {shop.address}
      </p>
      <p>
        <strong>Bank:</strong> {shop.bankName} ({shop.accountNumber})
      </p>
      <p>
        <strong>Category/Gender:</strong> {shop.genderType}
      </p>

      <div>
        <strong>Services:</strong>
        <ul className="list-disc ml-6">
          {shop.services?.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
