import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import Connection from "./database/db.js";
import Routes from "./router/authRouter.js";
import salon from "./router/registerSalon.js";
import Booking from "./router/bookingRouter.js";
import paymentRouter from "./router/paymentRouter.js";

dotenv.config();
const app = express();

// ---------- CORS Configuration ----------
app.use(cors({
  origin: true,            // allow all origins
  methods: ['GET','POST','PUT','DELETE','OPTIONS'], // allow all methods
  allowedHeaders: ['Content-Type', 'Authorization'], // allow required headers
  credentials: true        // allow cookies/authorization headers
}));

// Handle OPTIONS preflight requests
app.options('*', cors());

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Database ----------
Connection();

// ---------- Routes ----------
app.use("/api", Routes);
app.use("/api", salon);
app.use("/api", Booking);
app.use("/api/payment", paymentRouter);

// Serve uploaded files
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
