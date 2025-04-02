import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300); // 5-minute timer
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);

    const phoneNumber = localStorage.getItem("phone_number");
    const enteredOtp = otp.join("");

    if (!phoneNumber) {
      toast.error("Phone number not found. Please try again.");
      setLoading(false);
      return;
    }

    if (enteredOtp.length !== 6) {
      toast.warn("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.upswap.app/api/validate-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          otp: enteredOtp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verified successfully!");
        localStorage.setItem("otp", enteredOtp);
        setTimeout(() => navigate("/ResetPassword"), 2000);
      } else {
        toast.error(data?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#FE7A3A]">
          Verify OTP
        </h2>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 border rounded-md text-center text-xl font-bold focus:ring-orange-500"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        <button
          onClick={handleVerifyOtp}
          className="w-full px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="text-gray-500 mt-3">
          Resend OTP in{" "}
          <span className="text-black font-semibold">
            {String(Math.floor(timer / 60)).padStart(2, "0")}:
            {String(timer % 60).padStart(2, "0")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
