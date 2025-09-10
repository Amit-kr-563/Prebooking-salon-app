// // pages/OwnerAuthStep.jsx

// import React, { useState } from 'react';

// const OwnerAuthStep = ({ formData, setFormData, onNext }) => {
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [mobileVerified, setMobileVerified] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false);

//   const handleSendOtp = () => {
//     if (formData.mobile.length === 10) {
//       alert(`✅ OTP sent to ${formData.mobile} (use 1234 for demo)`);
//       setOtpSent(true);
//     } else {
//       alert('❌ Please enter a valid 10-digit mobile number.');
//     }
//   };

//   const handleVerifyOtp = () => {
//     if (otp === '1234') {
//       setMobileVerified(true);
//       alert('✅ Mobile number verified!');
//     } else {
//       alert('❌ Invalid OTP.');
//     }
//   };

//   const handleVerifyEmail = () => {
//     if (formData.email.includes('@') && formData.email.includes('.')) {
//       setEmailVerified(true);
//       alert('✅ Email verified!');
//     } else {
//       alert('❌ Please enter a valid email address.');
//     }
//   };

//   const handleNext = () => {
//     if (!mobileVerified) {
//       alert('Please verify your mobile number first.');
//       return;
//     }
//     if (!emailVerified) {
//       alert('Please verify your email first.');
//       return;
//     }
//     onNext(); // move to next page
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
//       <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           🧾 Step 1: Owner Authentication
//         </h2>

//         {/* Mobile Input */}
//         <label className="block mb-1 font-medium">📱 Mobile Number</label>
//         <input
//           type="tel"
//           maxLength="10"
//           value={formData.mobile}
//           onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
//           className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
//           placeholder="Enter 10-digit mobile"
//         />
//         {!otpSent && (
//           <button
//             onClick={handleSendOtp}
//             className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-3 hover:bg-blue-700"
//           >
//             Send OTP
//           </button>
//         )}

//         {/* OTP Verification */}
//         {otpSent && !mobileVerified && (
//           <>
//             <input
//               type="text"
//               maxLength="4"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
//             />
//             <button
//               onClick={handleVerifyOtp}
//               className="bg-green-600 text-white py-2 px-4 rounded w-full mb-3 hover:bg-green-700"
//             >
//               Verify OTP
//             </button>
//           </>
//         )}

//         {/* Email Input */}
//         <label className="block mb-1 font-medium">📧 Email Address</label>
//         <input
//           type="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
//           placeholder="Enter your email"
//         />
//         {!emailVerified && (
//           <button
//             onClick={handleVerifyEmail}
//             className="bg-yellow-600 text-white py-2 px-4 rounded w-full mb-3 hover:bg-yellow-700"
//           >
//             Verify Email
//           </button>
//         )}

//         {/* Next Button */}
//         <button
//           onClick={handleNext}
//           disabled={!mobileVerified || !emailVerified}
//           className={`py-2 px-4 rounded w-full ${
//             mobileVerified && emailVerified
//               ? 'bg-purple-600 hover:bg-purple-700 text-white'
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           Next ➡️
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OwnerAuthStep;
import React, { useState } from 'react';

const OwnerAuthStep = ({ formData, setFormData, onNext }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  const handleSendOtp = () => {
    if (formData.mobile.length === 10) {
      alert(`✅ OTP sent to ${formData.mobile} (use 1234 for demo)`);
      setOtpSent(true);
    } else {
      alert('❌ Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      setMobileVerified(true);
      alert('✅ Mobile number verified!');
    } else {
      alert('❌ Invalid OTP.');
    }
  };

  const handleNext = () => {
    if (!mobileVerified) {
      alert('Please verify your mobile number first.');
      return;
    }
    if (!formData.password) {
      alert('❌ Please enter a password.');
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🧾 Step 1: Owner Authentication
        </h2>

        {/* Mobile Input */}
        <label className="block mb-1 font-medium">📱 Mobile Number</label>
        <input
          type="tel"
          maxLength="10"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
          placeholder="Enter 10-digit mobile"
        />
        {!otpSent && (
          <button
            onClick={handleSendOtp}
            className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-3 hover:bg-blue-700"
          >
            Send OTP
          </button>
        )}

        {/* OTP Verification */}
        {otpSent && !mobileVerified && (
          <>
            <input
              type="text"
              maxLength="4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-green-600 text-white py-2 px-4 rounded w-full mb-3 hover:bg-green-700"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* Password Input */}
        <label className="block mb-1 font-medium">🔒 Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
          placeholder="Enter a password"
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!mobileVerified}
          className={`py-2 px-4 rounded w-full ${
            mobileVerified
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default OwnerAuthStep;
