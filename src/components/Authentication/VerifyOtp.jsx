import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300); // 5-minute timer
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Get access token from localStorage
    const access = localStorage.getItem("access");

    if (!access) {
      setMessage("Access token not found. Please login again.");
      setLoading(false);
      return;
    }

    const response = await fetch("https://api.upswap.app/api/verify-otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify({ otp: enteredOtp }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("OTP verified successfully!");
      navigate("/Login");
    } else {
      setMessage(data?.message || "Invalid OTP. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        {/* Header */}
        <div className="bg-gradient-to-r text-white py-3 rounded-t-lg">
          <h2 className="text-lg font-semibold text-[#FE7A3A]">Verify OTP</h2>
        </div>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-3 my-4">
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

        {/* Verify Button */}
        <button
          onClick={handleVerifyOtp}
          className="w-full py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e7692e] transition-all"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Message */}
        {message && <p className="mt-3 text-red-500">{message}</p>}

        {/* Resend OTP Timer */}
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
