


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Booking = () => {
  const navigate = useNavigate();
  const { state: salon } = useLocation();

  const [persons, setPersons] = useState([{ name: "", services: [] }]);
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]); // ✅ Already booked slots

  // Load services
  useEffect(() => {
    if (salon?.servicesAndTiming?.services) {
      setServices(salon.servicesAndTiming.services);
    }
  }, [salon]);

  // ✅ Utils
  const parseTime = (timeStr) => {
    const [time, meridian] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const meridian = h >= 12 ? "PM" : "AM";
    return `${h12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${meridian}`;
  };

  // ✅ Round up to nearest 15 min
  const roundUpToNearest15 = (mins) => {
    return Math.ceil(mins / 15) * 15;
  };

  // ✅ Fetch booked slots for selected date & salon
 useEffect(() => {
  const fetchBookings = async () => {
    if (!bookingDate || !salon?._id) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/${salon._id}?date=${bookingDate}`
      );

      const slots = [];

      res.data.forEach((booking) => {
        booking.persons.forEach((person) => {
          if (person.date === bookingDate) {
            const start = parseTime(person.startTime);
            const end = parseTime(person.endTime);

            const roundedEnd = roundUpToNearest15(end);

            for (let mins = start; mins < roundedEnd; mins += 15) {
              slots.push(formatTime(mins));
            }
          }
        });
      });

      setBookedSlots(slots);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };
  fetchBookings();
}, [bookingDate, salon]);

  const calculateEndTime = (startTimeStr, personsArr) => {
    const totalDuration = personsArr.reduce((sum, p) => {
      return (
        sum +
        p.services.reduce((s, srv) => {
          const svc = services.find((sv) => sv.name === srv);
          return s + (svc ? parseInt(svc.duration, 10) : 0);
        }, 0)
      );
    }, 0);
    return formatTime(parseTime(startTimeStr) + totalDuration);
  };

  const handleChange = (index, field, value) => {
    const newPersons = [...persons];
    if (field === "services") {
      if (newPersons[index].services.includes(value)) {
        newPersons[index].services = newPersons[index].services.filter(
          (s) => s !== value
        );
      } else {
        newPersons[index].services.push(value);
      }
    } else {
      newPersons[index][field] = value;
    }
    setPersons(newPersons);

    // Total price
    let sum = 0;
    newPersons.forEach((p) => {
      p.services.forEach((srv) => {
        const s = services.find((sv) => sv.name === srv);
        if (s) sum += parseInt(s.price, 10);
      });
    });
    setTotal(sum);

    if (startTime) {
      setEndTime(calculateEndTime(startTime, newPersons));
    }
  };

  const generateTimeSlots = (openingTime, closingTime) => {
    const openingMins = parseTime(openingTime);
    const closingMins = parseTime(closingTime);
    const slots = [];
    for (let mins = openingMins; mins + 15 <= closingMins; mins += 15) {
      slots.push(formatTime(mins));
    }
    return slots;
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
    setEndTime(calculateEndTime(value, persons));
  };

  const handlePayNow = async () => {
    if (persons.length === 0) return alert("Please select at least 1 person.");
    if (!bookingDate) return alert("Please select a booking date.");
    if (!startTime) return alert("Please select a start time.");

    for (let i = 0; i < persons.length; i++) {
      if (!persons[i].name.trim())
        return alert(`Enter name for person ${i + 1}.`);
      if (persons[i].services.length === 0)
        return alert(`Select at least one service for person ${i + 1}.`);
    }

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in!");
        return;
      }

      const personsWithTime = persons.map((p) => ({
        ...p,
        date: bookingDate,
        startTime,
        endTime,
      }));

      const bookingData = {
        salonId: salon._id,
        userId,
        persons: personsWithTime,
        totalAmount: total,
      };

      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData
      );

      navigate(`/booking/${salon._id}/payment`, {
        state: { bookingId: res.data._id, totalAmount: total },
      });
    } catch (err) {
      console.error("Booking failed:", err);
      alert(err.response?.data?.message || "Booking failed.");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Carousel */}
      {salon && (
        <div className="mb-6">
          <Slider {...sliderSettings}>
            {[salon.shopFrontPhoto, salon.shopInteriorPhoto]
              .filter(Boolean)
              .map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`http://localhost:5000/uploads/${photo}`}
                    alt={`Salon Photo ${idx + 1}`}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              ))}
          </Slider>
        </div>
      )}

      {/* Header */}
      <h2 className="text-2xl font-bold">{salon?.salonName}</h2>
      <p className="text-gray-600 flex items-center gap-2">
        <span className="material-icons text-sm">location_on</span>
        {salon?.address}
      </p>
      <p className="flex items-center gap-1 text-yellow-500 font-medium">
        ⭐ {salon?.rating || 4.1}{" "}
        <span className="text-gray-600">({salon?.reviewCount || 0} reviews)</span>
      </p>

      <hr className="my-6" />

      {/* Booking Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="material-icons">group</span> 1. Select People
          </h3>
          <select
            value={persons.length}
            onChange={(e) =>
              setPersons(
                Array.from(
                  { length: parseInt(e.target.value) },
                  () => ({ name: "", services: [] })
                )
              )
            }
            className="border p-2 rounded w-full"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} Person
              </option>
            ))}
          </select>

          {persons.map((p, i) => (
            <div
              key={i}
              className="mt-4 border p-3 rounded-lg shadow-sm bg-gray-50"
            >
              <p className="font-medium mb-2">Person {i + 1}</p>
              <input
                type="text"
                placeholder="Enter name"
                value={p.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                className="border p-2 rounded w-full mb-3"
              />
              {services.map((s) => (
                <label
                  key={s.name}
                  className="flex items-center justify-between border-b py-2 text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={p.services.includes(s.name)}
                      onChange={() => handleChange(i, "services", s.name)}
                      className="accent-purple-600"
                    />
                    {s.name}
                  </div>
                  <span className="font-medium">₹ {s.price}</span>
                </label>
              ))}
            </div>
          ))}
        </div>

        {/* Step 2 */}
        <div>
          <h3 className="font-semibold mb-3">2. Select a Date</h3>
          <input
            type="date"
            className="border p-2 rounded w-full"
            min={new Date().toISOString().split("T")[0]}
            max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </div>

        {/* Step 3 */}
        <div>
          <h3 className="font-semibold mb-3">3. Select a Time Slot</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {salon &&
              generateTimeSlots(
                salon.servicesAndTiming.openingTime,
                salon.servicesAndTiming.closingTime
              ).map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isBooked}
                    onClick={() => handleStartTimeChange(slot)}
                    className={`border rounded-md px-3 py-2 text-sm ${
                      isBooked
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : startTime === slot
                        ? "bg-purple-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {isBooked ? "Already Booked" : slot}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Footer */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <p className="text-lg font-bold">
          Total: <span className="ml-2">₹ {total}</span>
        </p>
        {endTime && (
          <p className="text-lg font-bold text-green-600">End Time: {endTime}</p>
        )}
        <button
          type="button"
          onClick={handlePayNow}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700"
        >
          ₹ Pay Now
        </button>
      </div>
    </div>
  );
};

export default Booking;

