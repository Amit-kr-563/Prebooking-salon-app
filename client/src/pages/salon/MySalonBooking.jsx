// // MySalonBookings.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MySalonBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [tab, setTab] = useState("upcoming");

//   useEffect(() => {
//     const storedSalonId = localStorage.getItem("salonId");
//      console.log("SalonId from localStorage:", storedSalonId);
//     if (storedSalonId) fetchBookings(storedSalonId);
//   }, []);

//   const fetchBookings = async (salonId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/bookings/salon/${salonId}`
//       );
//       setBookings(res.data);
//     } catch (error) {
//       console.error("Failed to fetch bookings", error);
//     }
//   };

//   const handleCancel = async (bookingId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
//       const storedSalonId = localStorage.getItem("salonId");
//       if (storedSalonId) fetchBookings(storedSalonId);
//     } catch (error) {
//       console.error("Failed to cancel booking", error);
//     }
//   };

//   const toDateTime = (dateStr, timeStr) => {
//     try {
//       return new Date(`${dateStr} ${timeStr}`);
//     } catch {
//       return new Date(dateStr);
//     }
//   };

//   const now = new Date();
//   const todayStr = now.toISOString().split("T")[0];

//   const filteredBookings = bookings
//     .filter((b) => {
//       if (!b.persons || b.persons.length === 0) return false;
//       const bookingDate = toDateTime(b.persons[0].date, b.persons[0].endTime);
//       if (tab === "upcoming") return bookingDate >= now && b.status === "confirmed";
//       if (tab === "completed") return bookingDate < now || b.status === "completed";
//       if (tab === "cancelled") return b.status === "cancelled";
//       return true;
//     })
//     .sort((a, b) => {
//       const dateA = toDateTime(a.persons[0].date, a.persons[0].startTime);
//       const dateB = toDateTime(b.persons[0].date, b.persons[0].startTime);
//       return dateA - dateB;
//     });

//   const summary = {
//     upcoming: bookings.filter(
//       (b) => b.status === "confirmed" && toDateTime(b.persons[0].date, b.persons[0].endTime) >= now
//     ).length,
//     completed: bookings.filter(
//       (b) => b.status === "completed" || toDateTime(b.persons[0].date, b.persons[0].endTime) < now
//     ).length,
//     cancelled: bookings.filter((b) => b.status === "cancelled").length,
//     totalRevenue: bookings
//       .filter((b) => b.status === "confirmed" || b.status === "completed")
//       .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
//         My Salon Dashboard
//       </h2>

//       {/* Summary */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {["upcoming", "completed", "cancelled", "totalRevenue"].map((key) => (
//           <div
//             key={key}
//             className={`p-4 rounded shadow text-center ${
//               key === "upcoming"
//                 ? "bg-purple-100"
//                 : key === "completed"
//                 ? "bg-green-100"
//                 : key === "cancelled"
//                 ? "bg-red-100"
//                 : "bg-yellow-100"
//             }`}
//           >
//             <p className="font-semibold capitalize">
//               {key === "totalRevenue" ? "Total Revenue" : key}
//             </p>
//             <p className="text-xl mt-1">
//               {key === "totalRevenue" ? `₹ ${summary.totalRevenue}` : summary[key]}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 justify-center sm:justify-start">
//         {["upcoming", "completed", "cancelled"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
//               tab === t
//                 ? "bg-purple-600 text-white shadow"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {t.charAt(0).toUpperCase() + t.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Bookings List */}
//       {filteredBookings.length === 0 ? (
//         <p className="text-center text-gray-500">No bookings found.</p>
//       ) : (
//         <div className="space-y-4">
//           {filteredBookings.map((booking) => {
//             const isToday = booking.persons[0].date === todayStr;
//             return (
//               <div
//                 key={booking._id}
//                 className={`border rounded-lg p-4 sm:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] ${
//                   isToday ? "bg-yellow-50 border-yellow-400" : "bg-white"
//                 }`}
//               >
//                 <h3 className="font-semibold text-lg sm:text-xl">
//                   User: {booking.userId?.name || "Unknown"} (
//                   {booking.userId?.email || "No Email"})
//                 </h3>

//                 {booking.persons.map((p, idx) => (
//                   <div key={idx} className="mt-2 pl-2 border-l border-gray-300">
//                     <p>
//                       <strong>Person {idx + 1}:</strong> {p.name}
//                     </p>
//                     <p>
//                       Date: <strong>{p.date}</strong> | Time:{" "}
//                       <strong>
//                         {p.startTime} - {p.endTime}
//                       </strong>
//                     </p>
//                     <p>
//                       Services:{" "}
//                       {Array.isArray(p.services) ? p.services.join(", ") : p.services}
//                     </p>
//                   </div>
//                 ))}

//                 <p className="mt-2">
//                   Status: <strong>{booking.status}</strong>
//                 </p>
//                 <p className="mt-1 font-bold">Total: ₹ {booking.totalAmount}</p>

//                 {tab === "upcoming" && booking.status === "confirmed" && (
//                   <button
//                     onClick={() => handleCancel(booking._id)}
//                     className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
//                   >
//                     Cancel Booking
//                   </button>
//                 )}

//                 {isToday && (
//                   <p className="mt-2 text-yellow-700 font-semibold">
//                     Today's Booking
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MySalonBookings;
// MySalonBookings.jsx


import React, { useEffect, useState } from "react";
import axios from "axios";

const MySalonBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("upcoming");

  useEffect(() => {
    const storedSalonId = localStorage.getItem("salonId");
    if (storedSalonId) fetchBookings(storedSalonId);
  }, []);

  // 🔹 Fetch bookings for a salon
  const fetchBookings = async (salonId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/bookings/salon/${salonId}` // ✅ fixed
      );
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  // 🔹 Cancel booking
  const handleCancel = async (bookingId) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/cancel`);
      const storedSalonId = localStorage.getItem("salonId");
      if (storedSalonId) fetchBookings(storedSalonId);
    } catch (error) {
      console.error("Failed to cancel booking", error);
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
  const todayStr = now.toISOString().split("T")[0];

  // 🔹 Filter bookings based on tab
  const filteredBookings = bookings
    .filter((b) => {
      if (!b.persons || b.persons.length === 0) return false;
      const bookingDate = toDateTime(b.persons[0].date, b.persons[0].endTime);
      if (tab === "upcoming") return bookingDate >= now && b.status === "confirmed";
      if (tab === "completed") return bookingDate < now || b.status === "completed";
      if (tab === "cancelled") return b.status === "cancelled";
      return true;
    })
    .sort((a, b) => {
      const dateA = toDateTime(a.persons[0].date, a.persons[0].startTime);
      const dateB = toDateTime(b.persons[0].date, b.persons[0].startTime);
      return dateA - dateB;
    });

  // 🔹 Summary for dashboard
  const summary = {
    upcoming: bookings.filter(
      (b) => b.status === "confirmed" && toDateTime(b.persons[0].date, b.persons[0].endTime) >= now
    ).length,
    completed: bookings.filter(
      (b) => b.status === "completed" || toDateTime(b.persons[0].date, b.persons[0].endTime) < now
    ).length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    totalRevenue: bookings
      .filter((b) => b.status === "confirmed" || b.status === "completed")
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0),
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        My Salon Dashboard
      </h2>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {["upcoming", "completed", "cancelled", "totalRevenue"].map((key) => (
          <div
            key={key}
            className={`p-4 rounded shadow text-center ${
              key === "upcoming"
                ? "bg-purple-100"
                : key === "completed"
                ? "bg-green-100"
                : key === "cancelled"
                ? "bg-red-100"
                : "bg-yellow-100"
            }`}
          >
            <p className="font-semibold capitalize">
              {key === "totalRevenue" ? "Total Revenue" : key}
            </p>
            <p className="text-xl mt-1">
              {key === "totalRevenue" ? `₹ ${summary.totalRevenue}` : summary[key]}
            </p>
          </div>
        ))}
      </div>

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
          {filteredBookings.map((booking) => {
            const isToday = booking.persons[0].date === todayStr;
            return (
              <div
                key={booking._id}
                className={`border rounded-lg p-4 sm:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] ${
                  isToday ? "bg-yellow-50 border-yellow-400" : "bg-white"
                }`}
              >
                <h3 className="font-semibold text-lg sm:text-xl">
                  User: {booking.userId?.name || "Unknown"} (
                  {booking.userId?.email || "No Email"})
                </h3>

                {booking.persons.map((p, idx) => (
                  <div key={idx} className="mt-2 pl-2 border-l border-gray-300">
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

                <p className="mt-2">
                  Status: <strong>{booking.status}</strong>
                </p>
                <p className="mt-1 font-bold">Total: ₹ {booking.totalAmount}</p>

                {tab === "upcoming" && booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                  >
                    Cancel Booking
                  </button>
                )}

                {isToday && (
                  <p className="mt-2 text-yellow-700 font-semibold">
                    Today's Booking
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MySalonBookings;
