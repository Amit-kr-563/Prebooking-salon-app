import React, { useEffect, useState } from "react";
import { getCurrentUser, changePassword } from "../../service/api";
import Navbar from "../../components/UserNavbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await getCurrentUser(token);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        return;
      }

      const res = await changePassword({ oldPassword, newPassword }, token);
      setMessage(res.message || "Password updated successfully ✅");
      setOldPassword("");
      setNewPassword("");
      setShowChangePassword(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to change password ❌");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">Loading profile...</p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 bg-red-100 p-4 rounded-md">
        {error}
      </p>
    );

  return (
    <>
      <Navbar />
      <div className="w-full max-w-4xl mx-auto mt-24 p-8 bg-gray-200 rounded-2xl shadow-xl ">
        <h2 className="text-4xl font-extrabold mb-8 text-teal-700 text-center tracking-wide">
          My Profile
        </h2>

        {user && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-6 border border-gray-100">
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">
                Name:
              </label>
              <p className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-base">
                {user.name}
              </p>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">
                Mobile:
              </label>
              <p className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-base">
                {user.mobile}
              </p>
            </div>
            {user.email && (
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-lg">
                  Email:
                </label>
                <p className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-base">
                  {user.email}
                </p>
              </div>
            )}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 text-lg">
                Password:
              </label>
              <p className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-base">
                ********
              </p>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          {!showChangePassword ? (
            <button
              onClick={() => setShowChangePassword(true)}
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-300"
                required
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowChangePassword(false)}
                  className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer "
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {message && (
            <p className="text-green-600 mt-6 text-center bg-green-100 p-3 rounded-lg text-base">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-600 mt-6 text-center bg-red-100 p-3 rounded-lg text-base">
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
