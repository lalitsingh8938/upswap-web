// import React, { useState, useEffect } from "react";
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
//     // phone_number: "",
//     date_of_birth: "",
//     gender: "",
//     password: "",
//     confirm_password: "",
//     country_code: "",
//     dial_code: "",
//     country: "",
//     // social_id: "",
//     // type: "",
//     // fcm_token: "",
//     latitude: null,
//     longitude: null,
//     // termsAccepted: false,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = Number(position.coords.latitude.toFixed(6));
//           const longitude = Number(position.coords.longitude.toFixed(6));

//           setFormData((prevData) => ({
//             ...prevData,
//             latitude,
//             longitude,
//           }));

//           // console.log("Lat/Lng set:", latitude, longitude);
//         },
//         (error) => {
//           console.error("Location error:", error);
//           toast.error("Please allow location access!");
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   // 📌 Handle Form Submission (Send Data to API)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loading

//     const formattedData = {
//       name: formData.name,
//       username: formData.username,
//       email: formData.email,
//       phone_number: formData.phone_number, // Add the phone number here
//       date_of_birth: formData.date_of_birth,
//       gender: formData.gender,
//       password: formData.password,
//       confirm_password: formData.confirm_password,
//       country_code: formData.country_code,
//       dial_code: formData.dial_code,
//       country: formData.country,
//       latitude: formData.latitude,
//       longitude: formData.longitude,
//     };

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/register/",
//         formattedData
//       );

//       if (response.data && response.data.access) {
//         localStorage.setItem("access", response.data.access);
//         localStorage.setItem("phone_number", response.data.user.phone_number);

//         // ✅ Save country code & dial code
//         // localStorage.setItem("country_code", formData.country_code);
//         // localStorage.setItem("dial_code", formData.dial_code);
//       }

//       toast.success("Registration successful!");
//       navigate("/VerifyOtp");
//     } catch (error) {
//       toast.error("Registration failed!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md">
//         <div className="bg-orange-500 text-white text-center py-4 rounded-t-lg">
//           <h2 className="text-xl font-semibold">Sign Up</h2>
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
//                 {/* <PhoneInput
//                   country={"in"}
//                   value={formData.phone_number}
//                   onChange={(fullNumber, countryData) => {
//                     const numberOnly = fullNumber.replace(/\D/g, ""); // Remove non-digits
//                     const last10Digits = numberOnly.slice(-10); // Extract last 10 digits
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       phone_number: last10Digits, // Send only 10-digit number
//                       country_code:
//                         countryData?.countryCode?.toUpperCase() || "",
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
//                 /> */}

//                 <PhoneInput
//                   country={"in"} // Default country set karein
//                   value={formData.phone_number}
//                   onChange={(phone_number, countryData) => {
//                     // console.log("Country Data:", countryData); // Debugging ke liye

//                     let formattedPhoneNumber = phone_number.replace(
//                       /^\+91/,
//                       ""
//                     ); // +91 remove karein
//                     if (formattedPhoneNumber.length > 10) {
//                       formattedPhoneNumber = formattedPhoneNumber.slice(-10); // Sirf last 10 digits rakhein
//                     }

//                     setFormData((prevData) => ({
//                       ...prevData,
//                       phone_number: formattedPhoneNumber, // Sirf 10-digit number store karein
//                       country_code:
//                         countryData?.countryCode?.toUpperCase() || "", // e.g., "IN"
//                       dial_code: `+${countryData?.dialCode || ""}`, // e.g., "+91"
//                       country: countryData?.name || "", // e.g., "India"
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
//                 <label className="block text-sm font-medium">
//                   Date of Birth
//                 </label>
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
//               <label className="block text-sm font-medium">
//                 Confirm Password
//               </label>
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
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="termsAccepted"
//                 checked={formData.termsAccepted}
//                 onChange={handleChange}
//               />
//               <label className="text-sm">
//                 I accept Terms and Conditions & Privacy Policy
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading} // Fix: Directly checking email & password
//               className="w-full bg-[#FE7A3A] text-white py-2 rounded"
//             >
//               {isLoading ? "Register in..." : "Register"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

// import React, { useState, useEffect } from "react";
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
//     latitude: null,
//     longitude: null,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = Number(position.coords.latitude.toFixed(6));
//           const longitude = Number(position.coords.longitude.toFixed(6));

//           setFormData((prevData) => ({
//             ...prevData,
//             latitude,
//             longitude,
//           }));
//         },
//         (error) => {
//           console.error("Location error:", error);
//           toast.error("Please allow location access!");
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

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
//       latitude: formData.latitude,
//       longitude: formData.longitude,
//     };

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/register/",
//         formattedData
//       );

//       setIsLoading(false); // Stop loading after response

//       if (response.data && response.data.access) {
//         localStorage.setItem("access", response.data.access);
//         localStorage.setItem("phone_number", response.data.user.phone_number);
//         toast.success(response.data.message || "Registration successful!"); // Show message from response or default success message
//         navigate("/VerifyOtp");
//       } else if (response.data && response.data.message) {
//         toast.success(response.data.message); // Show success message from response
//         navigate("/VerifyOtp");
//       } else {
//         toast.success("Registration successful!"); // Default success message
//         navigate("/VerifyOtp");
//       }
//     } catch (error) {
//       setIsLoading(false); // Stop loading on error
//       if (error.response && error.response.data && error.response.data.message) {
//         toast.error(error.response.data.message); // Show error message from response
//       } else if (error.message) {
//         toast.error(`Registration failed: ${error.message}`); // Show generic error message
//       } else {
//         toast.error("Registration failed!"); // Default error message
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md">
//         <div className="bg-orange-500 text-white text-center py-4 rounded-t-lg">
//           <h2 className="text-xl font-semibold">Sign Up</h2>
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
//                       country_code:
//                         countryData?.countryCode?.toUpperCase() || "",
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
//                 <label className="block text-sm font-medium">
//                   Date of Birth
//                 </label>
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
//                     const genderValue =
//                       e.target.value === "Male" ? "M" : "F";
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
//               <label className="block text-sm font-medium">
//                 Confirm Password
//               </label>
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
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="termsAccepted"
//                 checked={formData.termsAccepted}
//                 onChange={handleChange}
//               />
//               <label className="text-sm">
//                 I accept Terms and Conditions & Privacy Policy
//               </label>
//             </div>

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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    password: "",
    confirm_password: "",
    country_code: "",
    dial_code: "",
    country: "",
    latitude: null,
    longitude: null,
    termsAccepted: false, // Added termsAccepted to the form data
  });

  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = Number(position.coords.latitude.toFixed(6));
          const longitude = Number(position.coords.longitude.toFixed(6));

          setFormData((prevData) => ({
            ...prevData,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Location error:", error);
          toast.error("Please allow location access!");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const {
      name,
      username,
      email,
      phone_number,
      date_of_birth,
      gender,
      password,
      confirm_password,
      termsAccepted,
    } = formData;

    if (
      !name ||
      !username ||
      !email ||
      !phone_number ||
      !date_of_birth ||
      !gender ||
      !password ||
      !confirm_password ||
      !termsAccepted
    ) {
      toast.error("Please fill in all the required fields.");
      return; // Stop the submission
    }

    if (password !== confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const formattedData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone_number: formData.phone_number,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      password: formData.password,
      confirm_password: formData.confirm_password,
      country_code: formData.country_code,
      dial_code: formData.dial_code,
      country: formData.country,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/register/",
        formattedData
      );

      setIsLoading(false);

      if (response.data && response.data.access) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("phone_number", response.data.user.phone_number);
        toast.success(response.data.message || "Registration successful!");
        navigate("/VerifyOtp");
      } else if (response.data && response.data.message) {
        toast.success(response.data.message);
        navigate("/VerifyOtp");
      } else {
        toast.success("Registration successful!");
        navigate("/VerifyOtp");
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(`Registration failed: ${error.message}`);
      } else {
        toast.error("Registration failed!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-lg">
          <button className="text-lg" onClick={() => navigate("/")}>
            ←
          </button>
          <h2 className="text-lg font-semibold" onClick={() => navigate("/")}>
            Sign Up
          </h2>
          <button className="text-lg">🏠</button>
        </div>
        <div className="bg-white p-6 rounded-b-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                maxLength={35}
                required // Added required attribute
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                maxLength={20}
                required // Added required attribute
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required // Added required attribute
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <div className="flex items-center rounded p-2 w-full border">
                <PhoneInput
                  country={"in"}
                  value={formData.phone_number}
                  onChange={(phone_number, countryData) => {
                    let formattedPhoneNumber = phone_number.replace(/^\+91/, "");
                    if (formattedPhoneNumber.length > 10) {
                      formattedPhoneNumber = formattedPhoneNumber.slice(-10);
                    }

                    setFormData((prevData) => ({
                      ...prevData,
                      phone_number: formattedPhoneNumber,
                      country_code:
                        countryData?.countryCode?.toUpperCase() || "",
                      dial_code: `+${countryData?.dialCode || ""}`,
                      country: countryData?.name || "",
                    }));
                  }}
                  inputProps={{
                    name: "phone_number",
                    required: true, // Keep required here for PhoneInput
                  }}
                  containerClass="w-full flex items-center"
                  inputClass="flex-grow p-2 border-l border-gray-300 outline-none py-4"
                  buttonClass="px-2"
                />
              </div>
            </div> */}
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <div className="flex items-center rounded p-2 w-full border">
                <PhoneInput
                  country={"in"}
                  value={formData.dial_code + formData.phone_number}
                  onChange={(value, countryData) => {
                    // Extract just the digits (remove all non-digit characters)
                    const digitsOnly = value.replace(/\D/g, "");

                    // Get the dial code length (number of digits)
                    const dialCodeLength = countryData.dialCode.length;

                    // Extract phone number (everything after dial code)
                    const phoneNumber = digitsOnly.slice(dialCodeLength);

                    setFormData((prevData) => ({
                      ...prevData,
                      phone_number: phoneNumber,
                      country_code: countryData.countryCode.toUpperCase(),
                      dial_code: `+${countryData.dialCode}`,
                      country: countryData.name,
                    }));
                  }}
                  inputProps={{
                    name: "phone_number",
                    required: true,
                  }}
                  containerClass="w-full flex items-center"
                  inputClass="flex-grow p-2 border-l border-gray-300 outline-none py-4"
                  buttonClass="px-2"
                  countryCodeEditable={false}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="block text-sm font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                  required // Added required attribute
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    const genderValue = e.target.value === "Male" ? "M" : "F";
                    setFormData({ ...formData, gender: genderValue });
                  }}
                  required // Added required attribute
                >
                  <option value="">Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                className="w-full p-2 border rounded pr-2"
                onChange={handleChange}
                required // Added required attribute
              />
              {/* <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span> */}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded pr-2"
                onChange={handleChange}
                required // Added required attribute
              />
              {/* <span
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span> */}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required // Added required attribute
              />
              <label className="text-sm">
                I accept Terms and Conditions & Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FE7A3A] text-white py-2 rounded"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa"; // Import FaArrowLeft
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
//     latitude: null,
//     longitude: null,
//     termsAccepted: false, // Added termsAccepted to the form data
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = Number(position.coords.latitude.toFixed(6));
//           const longitude = Number(position.coords.longitude.toFixed(6));

//           setFormData((prevData) => ({
//             ...prevData,
//             latitude,
//             longitude,
//           }));
//         },
//         (error) => {
//           console.error("Location error:", error);
//           toast.error("Please allow location access!");
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all required fields are filled
//     const {
//       name,
//       username,
//       email,
//       phone_number,
//       date_of_birth,
//       gender,
//       password,
//       confirm_password,
//       termsAccepted,
//     } = formData;

//     if (
//       !name ||
//       !username ||
//       !email ||
//       !phone_number ||
//       !date_of_birth ||
//       !gender ||
//       !password ||
//       !confirm_password ||
//       !termsAccepted
//     ) {
//       toast.error("Please fill in all the required fields.");
//       return; // Stop the submission
//     }

//     if (password !== confirm_password) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     setIsLoading(true);

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
//       latitude: formData.latitude,
//       longitude: formData.longitude,
//     };

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/register/",
//         formattedData
//       );

//       setIsLoading(false);

//       if (response.data && response.data.access) {
//         localStorage.setItem("access", response.data.access);
//         localStorage.setItem("phone_number", response.data.user.phone_number);
//         toast.success(response.data.message || "Registration successful!");
//         navigate("/VerifyOtp");
//       } else if (response.data && response.data.message) {
//         toast.success(response.data.message);
//         navigate("/VerifyOtp");
//       } else {
//         toast.success("Registration successful!");
//         navigate("/VerifyOtp");
//       }
//     } catch (error) {
//       setIsLoading(false);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         toast.error(error.response.data.message);
//       } else if (error.message) {
//         toast.error(`Registration failed: ${error.message}`);
//       } else {
//         toast.error("Registration failed!");
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md">
//         {/* Modified Header */}
//         <div className="bg-orange-500 text-white py-4 rounded-t-lg flex items-center justify-between px-4">
//           {/* <div
//             // Navigate back on click
//             className="cursor-pointer" // Add cursor pointer for better UX
//              onClick={() => navigate("/")}
//           >
//             <FaArrowLeft size={20} />

//           </div> */}
//           <button className="text-lg cursor-pointer" onClick={() => navigate("/")}>
//             ←
//           </button>
//           <h2 className="text-xl font-semibold flex-grow text-center -ml-6">
//             {/* -ml-6 is a small adjustment to keep "Sign Up" centered despite the arrow */}
//             Sign Up
//           </h2>
//           <div className="w-5"></div> {/* Placeholder to balance the arrow space */}
//         </div>
//         {/* End Modified Header */}

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
//                 required // Added required attribute
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
//                 required // Added required attribute
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
//                 required // Added required attribute
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Phone Number</label>
//               <div className="flex items-center rounded p-2 w-full border">
//                 <PhoneInput
//                   country={"in"}
//                   value={formData.dial_code + formData.phone_number}
//                   onChange={(value, countryData) => {
//                     // Extract just the digits (remove all non-digit characters)
//                     const digitsOnly = value.replace(/\D/g, "");

//                     // Get the dial code length (number of digits)
//                     const dialCodeLength = countryData.dialCode.length;

//                     // Extract phone number (everything after dial code)
//                     const phoneNumber = digitsOnly.slice(dialCodeLength);

//                     setFormData((prevData) => ({
//                       ...prevData,
//                       phone_number: phoneNumber,
//                       country_code: countryData.countryCode.toUpperCase(),
//                       dial_code: `+${countryData.dialCode}`,
//                       country: countryData.name,
//                     }));
//                   }}
//                   inputProps={{
//                     name: "phone_number",
//                     required: true,
//                   }}
//                   containerClass="w-full flex items-center"
//                   inputClass="flex-grow p-2 border-l border-gray-300 outline-none py-4"
//                   buttonClass="px-2"
//                   countryCodeEditable={false}
//                 />
//               </div>
//             </div>

//             <div className="flex space-x-2">
//               <div className="w-1/2">
//                 <label className="block text-sm font-medium">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   name="date_of_birth"
//                   className="w-full p-2 border rounded"
//                   onChange={handleChange}
//                   required // Added required attribute
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
//                   required // Added required attribute
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
//                 type={showPassword ? "text" : "password"} // Toggle input type
//                 id="password"
//                 name="password"
//                 placeholder="Enter Password"
//                 className="w-full p-2 border rounded pr-10" // Added pr-10 for icon space
//                 onChange={handleChange}
//                 required // Added required attribute
//               />
//               <span
//                 className="absolute right-3 top-9 cursor-pointer text-gray-500" // Styled icon position
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium">
//                 Confirm Password
//               </label>
//               <input
//                 type={showConfirmPassword ? "text" : "password"} // Toggle input type
//                 name="confirm_password"
//                 id="confirm_password"
//                 placeholder="Confirm Password"
//                 className="w-full p-2 border rounded pr-10" // Added pr-10 for icon space
//                 onChange={handleChange}
//                 required // Added required attribute
//               />
//               <span
//                 className="absolute right-3 top-9 cursor-pointer text-gray-500" // Styled icon position
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="termsAccepted"
//                 checked={formData.termsAccepted}
//                 onChange={handleChange}
//                 required // Added required attribute
//               />
//               <label className="text-sm">
//                 I accept Terms and Conditions & Privacy Policy
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-[#FE7A3A] text-white py-2 rounded disabled:opacity-50" // Added disabled style
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