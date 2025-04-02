import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(240); // 4-minute timer
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white flex items-center">
        <button className="text-lg">←</button>
        <h2 className="flex-1 text-center font-semibold text-lg">Verify OTP</h2>
      </div>

      <div className="flex gap-3 mb-4">
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
        className="px-6 py-2 bg-[#FE7A3A] text-white rounded-md"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <p className="text-gray-500">
        Resend OTP in{" "}
        <span className="text-black font-semibold">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </span>
      </p>
    </div>
  );
};

export default OtpVerification;
// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const OtpVerification = () => {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [timer, setTimer] = useState(240); // 4-minute timer
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   const handleChange = (index, e) => {
//     const value = e.target.value;
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.substring(value.length - 1);
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };
//   const handleVerifyOtp = async () => {
//     setMessage(""); // Reset previous messages
//     setLoading(true);

//     const phoneNumber = localStorage.getItem("phone_number");
//     // const otp = localStorage.setItem("otp"); // Get OTP from localStorage // Get phone number
//     const enteredOtp = otp.join(""); // Convert array to string

//     if (!phoneNumber) {
//       setMessage("Phone number not found. Please try again.");
//       setLoading(false);
//       return;
//     }

//     if (enteredOtp.length !== 6) {
//       setMessage("Please enter a valid 6-digit OTP.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("https://api.upswap.app/api/validate-otp/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           phone_number: phoneNumber, // Send stored phone number
//           otp: enteredOtp,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("OTP verified successfully!");
//         localStorage.setItem("otp", enteredOtp);
//         navigate("/ResetPassword"); // Redirect to login page after successful verification
//       } else {
//         setMessage(data?.message || "Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       setMessage("An error occurred. Please try again later.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
//       {/* Header */}
//       <div className="w-full bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white flex items-center">
//         <button className="text-lg">←</button>
//         <h2 className="flex-1 text-center font-semibold text-lg">Verify OTP</h2>
//       </div>

//       {/* OTP Input Boxes */}
//       <div className="flex gap-3 mb-4">
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             type="text"
//             maxLength="1"
//             className="w-12 h-12 border rounded-md text-center text-xl font-bold focus:ring-orange-500"
//             value={digit}
//             onChange={(e) => handleChange(index, e)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             ref={(el) => (inputRefs.current[index] = el)}
//           />
//         ))}
//       </div>

//       {/* Verify Button */}
//       <button
//         onClick={handleVerifyOtp}
//         className="px-6 py-2 bg-orange-500 text-white rounded-md"
//         disabled={loading}
//       >
//         {loading ? "Verifying..." : "Verify OTP"}
//       </button>

//       {/* Message */}
//       {message && <p className="mt-3 text-red-500">{message}</p>}

//       {/* Resend OTP Timer */}
//       <p className="text-gray-500">
//         Resend OTP in{" "}
//         <span className="text-black font-semibold">
//           {String(Math.floor(timer / 60)).padStart(2, "0")}:
//           {String(timer % 60).padStart(2, "0")}
//         </span>
//       </p>

//       {/* Resend OTP Button */}
//       <button
//         // onClick={handleResendOtp}
//         className="px-6 py-2 bg-blue-500 text-white rounded-md"
//         disabled={loading || timer > 0}
//       >
//         {loading ? "Resending..." : "Resend OTP"}
//       </button>
//     </div>
//   );
// };

// export default OtpVerification;
