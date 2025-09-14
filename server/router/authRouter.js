const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../schema/userSchema");
const Shopkeeper = require("../schema/Salon");

const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });
router.post("/register/user", async (req, res) => {
  try {
    const { name, email, mobile, gender, password } = req.body;

    if (!name || !email || !mobile || !gender || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({ message: "Mobile already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      gender,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("🔥 Registration error:", err);
    res
      .status(500)
      .json({ message: "User registration failed", error: err.message });
  }
});

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res
        .status(400)
        .json({ message: "Mobile and password are required" });
    }

    let user = await User.findOne({ mobile });
    let role = "user";

    if (!user) {
      user = await Shopkeeper.findOne({ mobile });
      role = "shopkeeper";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid mobile or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid mobile or password" });
    }

    const userData = user.toObject();
    delete userData.password;

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: `${role} login successful`,
      role,
      token,
      data: userData,
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

const Booking = require("../schema/Booking");

router.post("/search", async (req, res) => {
  try {
    const { location, gender, service } = req.body || {};

    let filters = {};
    if (location) filters.address = new RegExp(location, "i");
    if (gender) filters.genderType = new RegExp(gender, "i");
    if (service) {
      filters["servicesAndTiming.services"] = {
        $elemMatch: { name: new RegExp(service, "i") },
      };
    }

    const salons = await Shopkeeper.find(filters);

    const salonWithReviews = await Promise.all(
      salons.map(async (salon) => {
        const reviews = await Booking.aggregate([
          {
            $match: { salonId: salon._id, "reviews.rating": { $exists: true } },
          },
          { $unwind: "$reviews" },
          {
            $group: {
              _id: "$salonId",
              avgRating: { $avg: "$reviews.rating" },
              totalReviews: { $sum: 1 },
            },
          },
        ]);

        return {
          ...salon.toObject(),
          rating: reviews[0]?.avgRating || 0,
          reviewCount: reviews[0]?.totalReviews || 0,
        };
      })
    );

    res.json({ salons: salonWithReviews });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    let account;

    if (req.user.role === "user") {
      account = await User.findById(req.user.id).select("-password");
    } else if (req.user.role === "shopkeeper") {
      account = await Shopkeeper.findById(req.user.id).select("-password");
    }

    if (!account) {
      return res.status(404).json({ message: `${req.user.role} not found` });
    }

    res.json({
      role: req.user.role,
      data: account,
    });
  } catch (err) {
    console.error("❌ /me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/me/password", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new password are required" });
    }

    let user;
    if (req.user.role === "user") {
      user = await User.findById(req.user.id);
    } else if (req.user.role === "shopkeeper") {
      user = await Shopkeeper.findById(req.user.id);
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("🔥 Update password error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
