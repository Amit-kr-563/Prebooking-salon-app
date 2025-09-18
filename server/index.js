const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// Database connection
const Connection = require("./database/db");

// Routers
const Routes = require("./router/authRouter");
const salon = require("./router/registerSalon");
const Booking = require("./router/bookingRouter");
const paymentRouter = require("./router/paymentRouter");

dotenv.config();
const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://prebooking-salon-app-2.onrender.com" // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
Connection();

// Routes
app.use("/api", Routes);
app.use("/api", salon);
app.use("/api", Booking);
app.use("/api/payment", paymentRouter);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
