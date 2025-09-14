

const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");




const Booking = require("../schema/Booking");


// Create order
router.post("/order", async (req, res) => {
  try {
    const { amount, bookingId } = req.body;
    console.log("Received Order Request:", req.body); 

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${bookingId}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ order });
  } catch (err) {
    console.error("Razorpay Order Error:", err); 
    res.status(500).json({ error: err.message });
  }
});

// Verify payment
// router.post("/verify", (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (razorpay_signature === expectedSign) {
//       res.status(200).json({ message: "Payment verified successfully" });
//     } else {
//       res.status(400).json({ error: "Invalid signature" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Payment verification failed" });
//   }
// });


router.post("/verify", async (req, res) => {
  try {
    const { bookingId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // 🔹 Signature verify
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // 🔹 Update booking in DB
    await Booking.findByIdAndUpdate(bookingId, {
      status: "confirmed",
      paymentInfo: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "paid",
      },
    });

    res.json({ success: true, message: "Payment verified & booking confirmed" });
  } catch (err) {
    console.error("Verify Payment Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const Booking = require("../schema/Booking"); // 👈 Import your Booking model

// // ✅ Verify payment
// router.post("/verify", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (razorpay_signature === expectedSign) {
//       // ✅ Payment verified → Update booking in DB
//       await Booking.findByIdAndUpdate(bookingId, {
//         status: "confirmed",
//         paymentInfo: {
//           orderId: razorpay_order_id,
//           paymentId: razorpay_payment_id,
//           signature: razorpay_signature,
//           status: "paid",
//         },
//       });

//       return res.status(200).json({ success: true, message: "Payment verified & booking confirmed" });
//     } else {
//       // ❌ Invalid signature → mark payment failed
//       await Booking.findByIdAndUpdate(bookingId, {
//         "paymentInfo.status": "failed",
//       });

//       return res.status(400).json({ success: false, error: "Invalid signature" });
//     }
//   } catch (err) {
//     console.error("Payment verification error:", err);
//     res.status(500).json({ success: false, error: "Payment verification failed" });
//   }
// });

// module.exports = router;







