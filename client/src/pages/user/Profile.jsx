import React, { useEffect, useState } from "react";
import { getCurrentUser, changePassword } from "../../service/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  // ✅ Auto clear message after 3 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  // Fetch user details
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

  // Handle password change
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
      setShowChangePassword(false); // ✅ hide form after success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to change password ❌");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
        My Profile
      </h2>

      {user && (
        <div className="bg-white p-5 rounded-lg shadow-md mb-6 space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Name:</label>
            <p className="border border-gray-300 rounded px-3 py-2 bg-gray-50">{user.name}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Mobile:</label>
            <p className="border border-gray-300 rounded px-3 py-2 bg-gray-50">{user.mobile}</p>
          </div>
          {user.email && (
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Email:</label>
              <p className="border border-gray-300 rounded px-3 py-2 bg-gray-50">{user.email}</p>
            </div>
          )}
          {/* ✅ Hidden Password Field */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Password:</label>
            <p className="border border-gray-300 rounded px-3 py-2 bg-gray-50">
              ********
            </p>
          </div>
        </div>
      )}

      {/* Change Password Section */}
      <div className="bg-white p-5 rounded-lg shadow-md">

        {!showChangePassword ? (
          <button
            onClick={() => setShowChangePassword(true)}
            className="w-full bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition font-medium"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition font-medium"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => setShowChangePassword(false)}
                className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ✅ Auto disappearing messages */}
        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;