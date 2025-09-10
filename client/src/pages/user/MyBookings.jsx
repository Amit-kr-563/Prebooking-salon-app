import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) fetchBookings(storedUserId);//..
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/user/${userId}`
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) fetchBookings(storedUserId);
    } catch (error) {
      console.error("Failed to cancel booking", error);
    }
  };

  const handleReviewSubmit = async (bookingId, rating, comment) => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.post(
        `http://localhost:5000/api/bookings/${bookingId}/review`,
        { userId, rating, comment }
      );
      alert("Review submitted!");
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) fetchBookings(storedUserId);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  const toDateTime = (dateStr, timeStr) => {
    try {
      return new Date(`${dateStr} ${timeStr}`);
    } catch {
      return new Date(dateStr);
    }
  };

  const now = new Date();
  const filteredBookings = bookings.filter((b) => {
    if (!b.persons || b.persons.length === 0) return false;
    const bookingDate = toDateTime(b.persons[0].date, b.persons[0].endTime);
    if (tab === "upcoming") return bookingDate >= now && b.status === "confirmed";
    if (tab === "completed") return bookingDate < now || b.status === "completed";
    if (tab === "cancelled") return b.status === "cancelled";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        My Bookings
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 justify-center sm:justify-start">
        {["upcoming", "completed", "cancelled"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
              tab === t
                ? "bg-purple-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <h3 className="font-semibold text-lg sm:text-xl">
                {booking.salonId?.salonName || "Salon Name"}
              </h3>
              <p className="text-gray-600">{booking.salonId?.address}</p>

              {/* Persons */}
              {booking.persons.map((p, idx) => (
                <div key={idx} className="mt-3 pl-2 border-l border-gray-300">
                  <p>
                    <strong>Person {idx + 1}:</strong> {p.name}
                  </p>
                  <p>
                    Date: <strong>{p.date}</strong> | Time:{" "}
                    <strong>
                      {p.startTime} - {p.endTime}
                    </strong>
                  </p>
                  <p>
                    Services:{" "}
                    {Array.isArray(p.services) ? p.services.join(", ") : p.services}
                  </p>
                </div>
              ))}

              <p className="mt-3 text-gray-700">
                Status: <strong>{booking.status}</strong>
              </p>
              <p className="mt-1 font-bold">Total: ₹ {booking.totalAmount}</p>

              {/* Cancel Button */}
              {tab === "upcoming" && booking.status === "confirmed" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  Cancel Booking
                </button>
              )}

              {/* Review Section */}
              {/* Review Section */}
{tab === "completed" && booking.status === "completed" && (
  <div className="mt-4 border-t pt-3">
    {booking.reviews && booking.reviews.length > 0 ? (
      // ✅ Agar review already hai toh usko dikhana hai
      <div>
        <h4 className="font-semibold">Your Review</h4>
        <p>⭐ Rating: {booking.reviews[0].rating}</p>
        <p className="italic">"{booking.reviews[0].comment}"</p>
      </div>
    ) : (
      // ✅ Agar review nahi hai toh form dikhana hai
      <div>
        <h4 className="font-semibold">Leave a Review</h4>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={booking.newRating || ""}
          onChange={(e) =>
            setBookings((prev) =>
              prev.map((b) =>
                b._id === booking._id
                  ? { ...b, newRating: e.target.value }
                  : b
              )
            )
          }
          className="border p-2 rounded w-20 mr-2"
        />
        <input
          type="text"
          placeholder="Write a comment"
          value={booking.newComment || ""}
          onChange={(e) =>
            setBookings((prev) =>
              prev.map((b) =>
                b._id === booking._id
                  ? { ...b, newComment: e.target.value }
                  : b
              )
            )
          }
          className="border p-2 rounded w-full mt-2"
        />
        <button
          onClick={() =>
            handleReviewSubmit(
              booking._id,
              booking.newRating,
              booking.newComment
            )
          }
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Submit Review
        </button>
      </div>
    )}
  </div>
)}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
