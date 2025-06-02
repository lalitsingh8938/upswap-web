// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAuth } from "./AuthContext";

// const EmailLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       toast.error("Please enter email and password");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post("https://api.upswap.app/api/login/", {
//         email,
//         password,
//       });

//       if (response.data.access && response.data.refresh) {
//         localStorage.setItem("access", response.data.access);
//         localStorage.setItem("refresh_token", response.data.refresh);
//         login();
//         toast.success("Login successfully!");
//         localStorage.setItem("user_id", response.data.user.id);
//         localStorage.setItem("vendor_id", response.data.vendor_id);
//         localStorage.setItem("sessionid", response.data.sessionid)
//         localStorage.setItem("username", response.data.user.username);
//         // localStorage.setItem("is_approved", response.data.is_approved);
//         if (response.data?.user?.country) {
//           localStorage.setItem("country", response.data.user.country);
//           localStorage.setItem("country_code", response.data.user.country_code);
//           localStorage.setItem("dial_code", response.data.user.dial_code);
//         }

//         navigate("/DealsPage");
//       } else {
//         toast.error("Login successful but token missing.");
//       }
//     } catch (error) {
//       toast.error("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         className="w-full p-3 border rounded-md focus:ring-orange-500 mt-4"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <div className="relative w-full mt-4">
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Enter Password"
//           className="w-full p-3 border rounded-md focus:ring-orange-500"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           className="absolute right-3 top-4 text-gray-500"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? (
//             <EyeSlashIcon className="w-5 h-5" />
//           ) : (
//             <EyeIcon className="w-5 h-5" />
//           )}
//         </button>
//       </div>

//       <div className="flex justify-end mt-2 cursor-pointer">
//         <p
//           className="text-orange-500 text-sm"
//           onClick={() => navigate("/ForgotPassword")}
//         >
//           Forgot password?
//         </p>
//       </div>

//       <button
//         className="w-full bg-[#FE7A3A] text-white p-3 rounded-md mt-4 hover:bg-orange-600"
//         onClick={handleLogin}
//         disabled={loading}
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </>
//   );
// };

// export default EmailLogin;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

      setLoading(false);

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        login();
        toast.success(response.data.message || "Login successful!");
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("vendor_id", response.data.vendor_id);
        localStorage.setItem("sessionid", response.data.sessionid);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("phone_number", response.data.user.phone_number);
        console.log("phone_number", response.data.user.phone_number);
        if (response.data?.user?.country) {
          localStorage.setItem("country", response.data.user.country);
          localStorage.setItem("country_code", response.data.user.country_code);
          localStorage.setItem("dial_code", response.data.user.dial_code);
        }

        navigate("/Home");
      } else if (response.data && response.data.message) {
        toast.success(response.data.message);
        navigate("/Home");
      } else {
        toast.error("Login successful but token missing.");
      }
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // Display message from backend
      } else if (error.message) {
        toast.error(`Login failed: ${error.message}`);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 border rounded-md focus:ring-orange-500 mt-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative w-full mt-4">
        <input
        type="password"
        id="password"
        name="password"
          // type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          className="w-full p-3 border rounded-md focus:ring-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
          className="w-full p-3 border rounded-md focus:ring-orange-500"
          onChange={(e) => setPassword(e.target.value)}
          required // Added required attribute
        /> */}
        {/* <button
          className="absolute right-3 top-4 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeSlashIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button> */}
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
    </>
  );
};

export default EmailLogin;
