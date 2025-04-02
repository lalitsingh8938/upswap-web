import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/send-otp/",
        {
          phone_number: phone, // Send phone number
        }
      );

      if (response.status === 200) {
        localStorage.setItem("phone_number", phone); // Store phone in localStorage
        toast.success("OTP sent successfully!");
        setTimeout(() => navigate("/VerifyOtpForgotPassword"), 2000); // Redirect after 2 seconds
      } else {
        toast.error("Something went wrong. Try again!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <ToastContainer position="top-center" autoClose={3000} />
      {/* Header */}
      <div className="w-full max-w-md px-6 shadow-lg rounded-md">
        <div className="flex items-center justify-between py-4">
          <button className="text-2xl text-[#FE7A3A]">←</button>
          <h2 className="text-xl font-semibold text-[#FE7A3A]">
            Forgot Password
          </h2>
          <span></span>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src="/Forgot password-cuate.svg"
            alt="Forgot Password"
            className="h-56"
          />
        </div>

        {/* Phone Number Input */}
        <div className="mt-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Phone number
          </label>
          <div className="relative flex items-center border rounded-lg p-2">
            <PhoneInput
              value={phone}
              onChange={(value) => setPhone(value)} // Ensure correct format
              inputProps={{
                required: true,
                placeholder: "Enter Phone number",
                className: "w-full pl-16 text-lg outline-none border-none",
              }}
            />

            <span className="absolute right-4 text-gray-400 text-sm">
              {phone.length}/10
            </span>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mt-4 text-center text-sm p-2 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full text-white text-lg py-3 rounded-lg mt-6 mb-6 ${
            phone.length < 10 || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
          disabled={phone.length < 10 || loading}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
