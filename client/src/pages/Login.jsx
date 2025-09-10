
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Login() {
//   const [mobile, setMobile] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!mobile || !password) {
//       alert('Please enter mobile and password');
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/login', { mobile, password });

//       const { token, role, data } = res.data;

//       // ✅ Save token & role in localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);
//       localStorage.setItem('user', JSON.stringify(data));
//       localStorage.setItem('userId', data._id); // for MyBookings API

//       alert(res.data.message || 'Login successful');

//       // ✅ Role-based redirect
//       if (role === "shopkeeper") {
//         navigate('/shopkeeper/dashboard');
//       } else if (role === "user") {
//         navigate('/user/dashboard');
//       } else {
//         alert("Unknown role!");
//       }

//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-bold text-center mb-4">Login</h2>
//         <input
//           value={mobile}
//           onChange={e => setMobile(e.target.value)}
//           placeholder="Mobile"
//           className="w-full border px-3 py-2 rounded mb-3"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full border px-3 py-2 rounded mb-3"
//         />
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         <p className="text-center text-sm mt-3">
//           Not registered?{' '}
//           <span
//             className="text-purple-700 underline cursor-pointer"
//             onClick={() => navigate('/register')}
//           >
//             Register here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobile || !password) {
      alert('Please enter mobile and password');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', { mobile, password });

      const { token, role, data } = res.data;

      // ✅ Save token & role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('userId', data._id); // existing for user bookings

      // ✅ Save salonId for shopkeepers
      if (role === 'shopkeeper') {
        localStorage.setItem('salonId', data._id);
      }

      alert(res.data.message || 'Login successful');

      // ✅ Role-based redirect
      if (role === "shopkeeper") {
        navigate('/shopkeeper/dashboard');
      } else if (role === "user") {
        navigate('/user/dashboard');
      } else {
        alert("Unknown role!");
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>
        <input
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          placeholder="Mobile"
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center text-sm mt-3">
          Not registered?{' '}
          <span
            className="text-purple-700 underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

