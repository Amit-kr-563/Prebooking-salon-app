import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api", // automatically uses env URL
});

export const registerUser = async (data) => {
  return await API.post("/register/user", data);
};


export const registerShopkeeper = async (form) => {
  return await API.post("/register/shop", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const loginUser = async (credentials) => {
  const response = await API.post("/login", credentials);
  const { data } = response;

  if (data?.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

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

export const searchSalons = async (searchData) => {
  return await API.post("/search", searchData);
};
