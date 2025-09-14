import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { state } = useLocation();
  const { bookingId, totalAmount } = state || {};

  const handlePayment = async () => {
    try {
      
      const { data } = await axios.post("http://localhost:5000/api/payment/order", {
        bookingId,
        amount: totalAmount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Salon Booking",
        description: "Payment for salon booking",
        order_id: data.order.id,
        handler: async function (response) {
          await axios.post("http://localhost:5000/api/payment/verify", {
            bookingId,
            ...response,
          });
          alert("Payment Successful!");
          window.location.href = "/my-bookings";
        },
        prefill: {
          name: "Amit Kumar",
          email: "amit@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment Failed");
    }
  };

  useEffect(() => {
    if (bookingId && totalAmount) {
      handlePayment();
    }
  }, [bookingId, totalAmount]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-bold">Processing Payment...</h2>
    </div>
  );
};

export default Payment;
