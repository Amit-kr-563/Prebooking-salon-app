const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../schema/Booking");
const router = express.Router();

function toDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  return new Date(`${dateStr} ${timeStr}`);
}

async function updateExpiredBookings() {
  const now = new Date();
  const bookings = await Booking.find({ status: "confirmed" });

  for (const booking of bookings) {
    if (booking.persons && booking.persons.length > 0) {
      const { date, endTime } = booking.persons[0];
      const bookingEnd = toDateTime(date, endTime);

      if (bookingEnd && bookingEnd < now) {
        booking.status = "completed";
        await booking.save();
      }
    }
  }
}

router.post("/bookings", async (req, res) => {
  try {
    const { salonId, persons, userId, totalAmount } = req.body;

    if (!salonId || !userId || !persons || persons.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = new Booking({
      salonId: new mongoose.Types.ObjectId(salonId),
      userId: new mongoose.Types.ObjectId(userId),
      persons,
      totalAmount,
      status: "confirmed",
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking Save Error:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

router.get("/bookings/user/:userId", async (req, res) => {
  try {
    await updateExpiredBookings(); // 🔹 auto-update status before fetch

    const bookings = await Booking.find({
      userId: new mongoose.Types.ObjectId(req.params.userId),
    }).populate("salonId");

    res.json(bookings);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.put("/bookings/:bookingId/cancel", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { status: "cancelled" },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    console.error("Cancel Error:", error);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

router.get("/bookings/salon/:salonId", async (req, res) => {
  try {
    await updateExpiredBookings();

    const bookings = await Booking.find({
      salonId: new mongoose.Types.ObjectId(req.params.salonId),
    }).populate("userId");
    res.json(bookings);
  } catch (error) {
    console.error("Fetch Salon Bookings Error:", error);
    res.status(500).json({ error: "Failed to fetch salon bookings" });
  }
});

router.get("/bookings/salon/:salonId", async (req, res) => {
  const bookings = await Booking.find({ salonId: req.params.salonId }).populate(
    "userId",
    "name email"
  );
  res.json(bookings);
});

router.post("/bookings/:bookingId/review", async (req, res) => {
  try {
    const { rating, comment, userId } = req.body;

    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    if (booking.status !== "completed") {
      return res
        .status(400)
        .json({ error: "Can only review completed bookings" });
    }

    booking.reviews.push({ userId, rating, comment });
    await booking.save();

    res.json({ message: "Review added", booking });
  } catch (error) {
    console.error("Review Error:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
});

module.exports = router;
