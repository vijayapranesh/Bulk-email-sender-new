import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams(); // Get the token from the URL

  console.log(newPassword)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    console.log(newPassword)
    try {
      const response = await axios.post(
        "http://localhost:4001/api/auth/reset-password",
        {
          token,
          newPassword,
        }
      );
      // setMessage(response.data);
      setMessage(response.data.message);
    } catch (error) {
      // setMessage("Failed to reset password");
      setError(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Reset Password
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Enter new password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>

      </div>
    </div>
  );
}

export default ResetPassword;
