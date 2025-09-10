
// import axios from 'axios';

// // Base API instance
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// // ✅ User Registration
// export const registerUser = async (data) => {
//   return await API.post('/register/user', data);
// };

// // ✅ Shopkeeper Registration
// export const registerShopkeeper = async (form) => {
//   return await API.post('/register/shop', form); // 🔧 Note: if you're uploading files, use FormData and set headers manually.
// };


// export const loginUser = async (credentials) => {
//   const response = await API.post('/login', credentials);
//   const { data } = response;

//   if (data?.token) {
//     localStorage.setItem("token", data.token); // Save token
//   }

//   return data;
// };


// // Optional: get current user (based on token)
// export const getCurrentUser = async (token) => {
//   const res = await axios.get("http://localhost:5000/api/me", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };

// export const searchSalons = async (searchData) => {
//   return await API.post('/search', searchData);
// };


import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ================== AUTH ==================

// ✅ User Registration
export const registerUser = async (data) => {
  return await API.post("/register/user", data);
};

// ✅ Shopkeeper Registration
export const registerShopkeeper = async (form) => {
  return await API.post("/register/shop", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Login
export const loginUser = async (credentials) => {
  const response = await API.post("/login", credentials);
  const { data } = response;

  if (data?.token) {
    localStorage.setItem("token", data.token); // Save JWT token
  }

  return data;
};

// ✅ Get Current User (using token)
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await API.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Change Password
export const changePassword = async ({ oldPassword, newPassword }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await API.put(
    "/me/password",
    { oldPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// ================== SALON ==================

// ✅ Search Salons
export const searchSalons = async (searchData) => {
  return await API.post("/search", searchData);
};