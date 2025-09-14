const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Shopkeeper", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  persons: [
    {
      name: { type: String, required: true },
      services: { type: [String], required: true },
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],

  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending", 
  },

 
  paymentInfo: {
    orderId: { type: String },
    paymentId: { type: String }, 
    signature: { type: String }, 
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },


  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
