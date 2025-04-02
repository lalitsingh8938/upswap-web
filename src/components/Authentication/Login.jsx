import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //   const [latitude, setLatitude] = useState(null);
  //   const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get user's location
  //   const getLocation = () => {
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setLatitude(position.coords.latitude);
  //           setLongitude(position.coords.longitude);
  //         },
  //         (error) => console.error("Error getting location:", error)
  //       );
  //     }
  //   };

  // Call getLocation when component mounts
  //   useState(() => {
  //     getLocation();
  //   }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    const data = {
      email,
      password,
      //   fcm_token: null, // Optional
      //   latitude: latitude ? latitude.toString() : null,
      //   longitude: longitude ? longitude.toString() : null,
    };

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/login/",
        data
      );

      console.log("Login Successful:", response.data);

      // ✅ Access & Refresh Token ko LocalStorage me save karein
      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        toast.success("Login successfully!");
        navigate("/DealsPage"); // Redirect to DealsPage after successful login
      } else {
        toast.error("Login successful but token missing.");
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 border">
      <div className="w-full max-w-md px-6 shadow-lg rounded-md">
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-lg">
          <button className="text-lg">←</button>
          <h2 className="text-lg font-semibold">Login</h2>
          <button className="text-lg">🏠</button>
        </div>

        <div className="flex justify-center my-6">
          <img src="/UPswap svg 1 1.png" alt="Logo" className="h-12 w-32" />
        </div>

        <div className="relative w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-md focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email && (
            <span className="absolute right-3 top-4 text-green-500">✔</span>
          )}
        </div>

        <div className="relative w-full mt-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full p-3 border rounded-md focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="absolute right-3 top-4 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex justify-end mt-2 cursor-pointer">
          <p
            className="text-orange-500 text-sm"
            onClick={() => navigate("/ForgotPassword")}
          >
            Forgot password?
          </p>
        </div>

        <button
          className="w-full bg-[#FE7A3A] text-white p-3 rounded-md mt-4 hover:bg-orange-600"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-gray-100 p-3 rounded-md hover:bg-gray-200">
          <FcGoogle className="h-6 w-6" />
          <span className="font-medium">Login with Google</span>
        </button>

        <div className="text-center mt-4 mb-6">
          <p
            className="text-orange-500 font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
