const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Connection = require("./database/db");
const Routes = require("./router/authRouter");
const salon = require("./router/registerSalon");
const path = require("path");
const Booking = require("./router/bookingRouter");
const paymentRouter = require("./router/paymentRouter");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Connection();

app.use("/api", Routes);
app.use("/api", salon);
app.use("/api", Booking);
app.use("/api/payment", paymentRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);
