import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Password Reset
  const handleSubmit = async () => {
    setMessage(null);

    // Retrieve data from localStorage
    const phone_number = localStorage.getItem("phone_number") || "";
    const otp = localStorage.getItem("otp") || "";

    // Debugging logs
    console.log("Phone Number:", phone_number);
    console.log("OTP:", otp);
    console.log("New Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // Validate inputs before sending request
    if (!phone_number || !otp || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/reset-password-otp/",
        {
          phone_number,
          otp,
          new_password: password, // Corrected key name
          confirm_password: confirmPassword,
        }
      );

      console.log("API Response:", response.data); // Debugging log

      if (response.status === 200) {
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("API Error:", error.response);
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-5 text-orange-500">
          Reset Password
        </h2>

        <div className="flex justify-center my-5">
          <img
            src="/sdfss f.png"
            alt="Reset Illustration"
            className="w-48 h-auto"
          />
        </div>

        {/* New Password Input */}
        <div className="w-full">
          <label className="block text-sm font-semibold">New Password</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg p-3 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-4 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="w-full mt-4">
          <label className="block text-sm font-semibold">
            Confirm Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter confirm password"
              className="w-full border border-gray-300 rounded-lg p-3 text-base"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-4 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
        </div>

        {/* Error/Success Message */}
        {message && <p className="mt-3 text-center text-red-500">{message}</p>}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#FE7A3A] text-white rounded-lg py-3 mt-5 text-base font-semibold"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
