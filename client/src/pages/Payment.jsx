// Payment.jsx
import { useLocation } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();
  const bookingId = state?.bookingId;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Payment Page</h2>
      <p>Booking ID: {bookingId}</p>

      {/* यहां आप अपना Razorpay/Stripe integration डाल सकते हैं */}
    </div>
  );
};

export default Payment;
