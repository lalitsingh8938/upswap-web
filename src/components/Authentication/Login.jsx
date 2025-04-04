import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://api.upswap.app/api/login/", {
        email,
        password,
      });

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        // console.log("refresh_token", response.data.refresh);

        // localStorage.setItem("refresh_token", refresh);
        toast.success("Login successfully!");
        localStorage.setItem("user_id", response.data.user.id);


        navigate("/DealsPage");
      } else {
        toast.error("Login successful but token missing.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login Functionality
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google Login Failed: No credential received.");
        return;
      }

      // ✅ JWT Token ko decode karo
      const decodedToken = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google User Data:", decodedToken);

      // ✅ Extract necessary user data
      const payload = {
        social_id: decodedToken.sub, // Google User ID
        email: decodedToken.email,
        name: decodedToken.name,
        // phone_number: null,
        type: "Google",
      };

      // ✅ Backend API call
      const response = await axios.post(
        "https://api.upswap.app/api/social-login/",
        payload
      );

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        
        toast.success("Google Login Successful!");
        navigate("/DealsPage");
      } else {
        toast.error("Login successful but token missing.");
      }
    } catch (error) {
      toast.error("Google Login Failed.");
      console.error(
        "Google Login Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 border">
      <div className="w-full max-w-md px-6 shadow-lg rounded-md">
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-lg">
          <button className="text-lg" onClick={() => navigate("/")}>
            ←
          </button>
          <h2 className="text-lg font-semibold" onClick={() => navigate("/")}>
            Login
          </h2>
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

        {/* ✅ Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Google Login Failed")}
        />

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
