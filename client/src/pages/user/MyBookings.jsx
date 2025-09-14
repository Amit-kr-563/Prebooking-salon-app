import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/UserNavbar";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) fetchBookings(storedUserId);
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
    if (tab === "upcoming")
      return bookingDate >= now && b.status === "confirmed";
    if (tab === "completed")
      return bookingDate < now || b.status === "completed";
    if (tab === "cancelled") return b.status === "cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className="pt-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">
          My Bookings
        </h2>

        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {["upcoming", "completed", "cancelled"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded font-medium transition-colors duration-200 ${
                tab === t
                  ? "bg-teal-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {filteredBookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="w-full max-w-3xl space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-semibold text-xl text-teal-700">
                  {booking.salonId?.salonName || "Salon Name"}
                </h3>
                <p className="text-gray-600">{booking.salonId?.address}</p>

                {booking.persons.map((p, idx) => (
                  <div
                    key={idx}
                    className="mt-4 pl-3 border-l-4 border-teal-300"
                  >
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
                      {Array.isArray(p.services)
                        ? p.services.join(", ")
                        : p.services}
                    </p>
                  </div>
                ))}

                <p className="mt-4 text-gray-700">
                  Status: <strong>{booking.status}</strong>
                </p>
                <p className="mt-1 font-bold">Total: ₹ {booking.totalAmount}</p>

                {tab === "upcoming" && booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                  >
                    Cancel Booking
                  </button>
                )}

                {tab === "completed" && booking.status === "completed" && (
                  <div className="mt-6 border-t pt-4">
                    {booking.reviews && booking.reviews.length > 0 ? (
                      <div>
                        <h4 className="font-semibold text-teal-700">
                          Your Review
                        </h4>
                        <p>⭐ Rating: {booking.reviews[0].rating}</p>
                        <p className="italic text-gray-600">
                          "{booking.reviews[0].comment}"
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold text-teal-700">
                          Leave a Review
                        </h4>
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
                          className="border p-2 rounded w-24 mr-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                          className="border p-2 rounded w-full mt-3 focus:outline-none focus:ring-2 focus:ring-teal-300"
                        />
                        <button
                          onClick={() =>
                            handleReviewSubmit(
                              booking._id,
                              booking.newRating,
                              booking.newComment
                            )
                          }
                          className="mt-3 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors duration-200"
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
    </div>
  );
};

export default MyBookings;
