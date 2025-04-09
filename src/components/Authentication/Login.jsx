import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 use login from context

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
        login();
        // localStorage.setItem("refresh_token", refresh);
        toast.success("Login successfully!");
        localStorage.setItem("user_id", response.data.user.id);
        if (response.data && response.data.user && response.data.user.country) {
          localStorage.setItem("country", response.data.user.country);
          localStorage.setItem("country_code", response.data.user.country_code);
          localStorage.setItem("dial_code", response.data.user.dial_code);
        }

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
      // console.log("Decoded Google User Data:", decodedToken);

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
        login(); // 👈 update context
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





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     phone_number: "",
//     date_of_birth: "",
//     gender: "",
//     password: "",
//     confirm_password: "",
//     country_code: "",
//     dial_code: "",
//     country: "",
//     fcm_token: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [location, setLocation] = useState("");
//   const [showForm, setShowForm] = useState(true);
//   const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleLocationChange = (e) => {
//     const selected = e.target.value;
//     setLocation(selected);

//     if (selected === "live") {
//       if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setCoordinates({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//           },
//           (error) => {
//             alert("Unable to fetch location. Please allow location access.");
//           }
//         );
//       } else {
//         alert("Geolocation not supported");
//       }
//     } else {
//       setCoordinates({ lat: null, lng: null }); // reset if not live
//     }
//   };

//   if (!showForm) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const formattedData = {
//       name: formData.name,
//       username: formData.username,
//       email: formData.email,
//       phone_number: formData.phone_number,
//       date_of_birth: formData.date_of_birth,
//       gender: formData.gender,
//       password: formData.password,
//       confirm_password: formData.confirm_password,
//       country_code: formData.country_code,
//       dial_code: formData.dial_code,
//       country: formData.country,
//       fcm_token: "",
//       latitude: coordinates?.lat || null,
//       longitude: coordinates?.lng || null,
//     };
  
//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/register/",
//         formattedData
//       );
  
//       if (response.data && response.data.access) {
//         localStorage.setItem("access", response.data.access);
//         localStorage.setItem("phone_number", response.data.user.phone_number);
//       }
  
//       toast.success("Registration successful!");
//       navigate("/VerifyOtp");
//     } catch (error) {
//       console.log("Registration Error:", error.response?.data); // 👀 Debug here
//       toast.error(error.response?.data?.detail || "Registration failed!");
//     }
//   };
  
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md">
//         <div className="bg-orange-500 text-white text-center py-4 rounded-t-lg">
//           <h2 className="text-xl font-semibold">Registeration</h2>
//         </div>
//         <div className="bg-white p-6 rounded-b-lg shadow-md">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter Name"
//                 className="w-full p-2 border rounded"
//                 onChange={handleChange}
//                 maxLength={35}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Enter Username"
//                 className="w-full p-2 border rounded"
//                 onChange={handleChange}
//                 maxLength={20}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 className="w-full p-2 border rounded"
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Phone Number</label>
//               <div className="flex items-center rounded p-2 w-full border">
//                 <PhoneInput
//                   country={"in"}
//                   value={formData.phone_number}
//                   onChange={(phone_number, countryData) => {
//                     let formattedPhoneNumber = phone_number.replace(/^\+91/, "");
//                     if (formattedPhoneNumber.length > 10) {
//                       formattedPhoneNumber = formattedPhoneNumber.slice(-10);
//                     }

//                     setFormData((prevData) => ({
//                       ...prevData,
//                       phone_number: formattedPhoneNumber,
//                       country_code: countryData?.countryCode?.toUpperCase() || "",
//                       dial_code: `+${countryData?.dialCode || ""}`,
//                       country: countryData?.name || "",
//                     }));
//                   }}
//                   inputProps={{
//                     name: "phone_number",
//                     required: true,
//                   }}
//                   containerClass="w-full flex items-center"
//                   inputClass="flex-grow p-2 border-l border-gray-300 outline-none py-4"
//                   buttonClass="px-2"
//                 />
//               </div>
//             </div>

//             <div className="flex space-x-2">
//               <div className="w-1/2">
//                 <label className="block text-sm font-medium">Date of Birth</label>
//                 <input
//                   type="date"
//                   name="date_of_birth"
//                   className="w-full p-2 border rounded"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="w-1/2">
//                 <label className="block text-sm font-medium">Gender</label>
//                 <select
//                   name="gender"
//                   className="w-full p-2 border rounded"
//                   onChange={(e) => {
//                     const genderValue = e.target.value === "Male" ? "M" : "F";
//                     setFormData({ ...formData, gender: genderValue });
//                   }}
//                 >
//                   <option value="">Choose Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//               </div>
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium">Password</label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter Password"
//                 className="w-full p-2 border rounded pr-10"
//                 onChange={handleChange}
//               />
//               <span
//                 className="absolute right-3 top-9 cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium">Confirm Password</label>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirm_password"
//                 placeholder="Confirm Password"
//                 className="w-full p-2 border rounded pr-10"
//                 onChange={handleChange}
//               />
//               <span
//                 className="absolute right-3 top-9 cursor-pointer"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//             <label className="block text-gray-700 font-medium mb-1">Location</label>
//             <select
//               className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
//               onChange={handleLocationChange}
//               value={location}
//             >
//               <option value="">Choose Location</option>
//               <option value="live">Use Live Location</option>
//               <option value="mumbai">Mumbai</option>
//               <option value="delhi">Delhi</option>
//               <option value="bangalore">Bangalore</option>
//             </select>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-[#FE7A3A] text-white py-2 rounded"
//             >
//               {isLoading ? "Registering..." : "Register"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
