// import React, { useState } from "react";
// import {
//   FaMars,
//   FaVenus,
//   FaGenderless,
//   FaTransgenderAlt,
//   FaEdit,
// } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const UserProfile = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [phone, setPhone] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [previewImage, setPreviewImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleFileChange = async (event) => {
//     if (event.target.files.length === 0) return;

//     const file = event.target.files[0];
//     if (!file) return;

//     const previewURL = URL.createObjectURL(file);
//     setPreviewImage(previewURL);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadProfileImageAPI/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       console.log("Upload API response:", response.data);

//       const imageUrl = response.data[0]; // ✅ Get the image URL from array

//       if (!imageUrl) {
//         throw new Error("No image URL found in response");
//       }

//       setProfileImage(imageUrl); // ✅ Save it to state

//       toast.success("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload Error:", error);
//       setError("Failed to upload image: " + error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const payload = {
//       name,
//       username,
//       email,
//       phone_number: phone,
//       gender,
//       date_of_birth: dob,
//       bio,
//       profile_pic: profileImage,
//     };

//     try {
//       const response = await fetch(
//         "https://api.upswap.app/api/custom-user/edit-profile/",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Profile updated successfully!");
//       } else {
//         setError(data.detail || "Failed to update profile");
//       }
//     } catch (err) {
//       console.error("Network Error:", err);
//       setError("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleClose = () => {
//     navigate("/MyPersonalAccount"); // Directly navigate to the PostDeal page
//   };

//   return (
//     <div className="min-h-screen bg-[#FE7A3A] border-2 rounded-lg flex items-center justify-center px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="relative w-full max-w-md bg-gradient-to-b from-orange-100 to-white p-6 rounded-2xl shadow-lg"
//       >
//         <button
//           onClick={handleClose}
//           className="absolute top-1 right-2 text-gray-500  hover:text-[#FE7A3A] z-10 rounded-lg"
//           type="button"
//         >
//           <FaTimes size={18} />
//         </button>

//         <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
//           User Profile
//         </h2>

//         <div className="flex justify-center mb-4">
//           <div className="relative w-24 h-24">
//             <img
//               src={profileImage || previewImage || "/default-avatar.png"}
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-4 border-[#FE7A3A] object-cover"
//             />

//             <label
//               htmlFor="profileImageInput"
//               className="absolute bottom-1 right-1 bg-[#FE7A3A] p-1.5 rounded-full cursor-pointer shadow-md"
//             >
//               <FaEdit className="text-white text-sm" />
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="profileImageInput"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         <label className="text-gray-700 font-semibold">Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter name"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter username"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Bio</label>
//         <textarea
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Enter bio"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter email"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Date of Birth</label>
//         <input
//           type="date"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Gender</label>
//         <div className="flex justify-center mb-4 gap-2">
//           {[
//             { label: "M", icon: <FaMars /> },
//             { label: "F", icon: <FaVenus /> },
//             { label: "N", icon: <FaGenderless /> },
//             { label: "O", icon: <FaTransgenderAlt /> },
//           ].map(({ label, icon }) => (
//             <button
//               type="button"
//               key={label}
//               onClick={() => setGender(label)}
//               className={`flex-1 flex flex-col items-center justify-center p-1 rounded-lg ${
//                 gender === label
//                   ? "bg-[#FE7A3A] text-white"
//                   : "bg-gray-600 text-gray-300"
//               }`}
//             >
//               <div className="text-xl">{icon}</div>
//               <span className="text-xs mt-1">{label}</span>
//             </button>
//           ))}
//         </div>

//         <label className="text-gray-700 font-semibold">Phone Number</label>
//         <div className="flex mb-6">
//           <span className="flex items-center px-3 bg-white rounded-l-lg border border-r-0 border-slate-300 text-base">
//             🇮🇳 +91
//           </span>
//           <input
//             type="tel"
//             placeholder="Phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="flex-1 p-3 rounded-r-lg bg-white border border-slate-300 outline-none"
//           />
//         </div>
//         {/* <label className="text-gray-700 font-semibold">Phone Number</label>
//         <div className="mb-6 ">
//           <PhoneInput
//             country={"in"}
//             enableSearch
//             value={phone}
//             onChange={(value, country) => {
//               const numberWithoutDialCode = value.replace(
//                 `+${country.dialCode}`,
//                 ""
//               );
//               setPhone(numberWithoutDialCode);
//             }}
//             inputClass="!w-full !p-3 !text-base !rounded-lg !border !border-slate-300"
//             buttonClass="!border !border-slate-300"
//             containerClass="!w-full"
//           />
//         </div> */}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[#FE7A3A] hover:bg-orange-500 text-white py-3 rounded-lg font-semibold"
//         >
//           {loading ? "Updating..." : "Update"}
//         </button>

//         {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import {
//   FaMars,
//   FaVenus,
//   FaGenderless,
//   FaTransgenderAlt,
//   FaEdit,
// } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const UserProfile = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [phone, setPhone] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [previewImage, setPreviewImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null); // State to hold user data
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchUserData(userId);
//     }
//   }, []); // Empty dependency array ensures this runs only once after initial render

//   const fetchUserData = async (userId) => {
//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/customuser/details/${userId}/`, // Added trailing slash for consistency
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       if (response.data) {
//         setUserData(response.data);
//         // Update form fields with fetched data
//         setName(response.data.name || "");
//         setUsername(response.data.username || "");
//         setBio(response.data.bio || "");
//         setEmail(response.data.email || "");
//         setDob(response.data.date_of_birth || "");
//         setGender(response.data.gender || "");
//         setPhone(response.data.phone_number ||""); // Remove +91 if present
//         setProfileImage(response.data.profile_pic || "");
//         setPreviewImage(response.data.profile_pic || ""); // Set initial preview
//       } else {
//         console.error("User data not found in the API response");
//         setError("Failed to fetch user data.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setError("Failed to fetch user data.");
//     }
//   };

//   const handleFileChange = async (event) => {
//     if (event.target.files.length === 0) return;

//     const file = event.target.files[0];
//     if (!file) return;

//     const previewURL = URL.createObjectURL(file);
//     setPreviewImage(previewURL);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadProfileImageAPI/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       console.log("Upload API response:", response.data);

//       const imageUrl = response.data[0]; // ✅ Get the image URL from array

//       if (!imageUrl) {
//         throw new Error("No image URL found in response");
//       }

//       setProfileImage(imageUrl); // ✅ Save it to state

//       toast.success("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload Error:", error);
//       setError("Failed to upload image: " + error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const payload = {
//       name,
//       username,
//       email,
//       phone_number: phone,
//       gender,
//       date_of_birth: dob,
//       bio,
//       profile_pic: profileImage,
//     };

//     try {
//       const response = await fetch(
//         "https://api.upswap.app/api/custom-user/edit-profile/",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Profile updated successfully!");
//       } else {
//         setError(data.detail || "Failed to update profile");
//       }
//     } catch (err) {
//       console.error("Network Error:", err);
//       setError("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleClose = () => {
//     navigate("/MyPersonalAccount"); // Directly navigate to the PostDeal page
//   };

//   return (
//     <div className="min-h-screen bg-[#FE7A3A] border-2 rounded-lg flex items-center justify-center px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="relative w-full max-w-md bg-gradient-to-b from-orange-100 to-white p-6 rounded-2xl shadow-lg"
//       >
//         <button
//           onClick={handleClose}
//           className="absolute top-1 right-2 text-gray-500  hover:text-[#FE7A3A] z-10 rounded-lg"
//           type="button"
//         >
//           <FaTimes size={18} />
//         </button>

//         <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
//           User Profile
//         </h2>

//         <div className="flex justify-center mb-4">
//           <div className="relative w-24 h-24">
//             <img
//               src={profileImage || previewImage || "/default-avatar.png"}
//               alt="Profile"
//               className="w-24 h-24 rounded-full object-cover"
//             />

//             <label
//               htmlFor="profileImageInput"
//               className="absolute bottom-1 right-1 bg-[#FE7A3A] p-1.5 rounded-full cursor-pointer shadow-md"
//             >
//               <FaEdit className="text-white text-sm" />
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="profileImageInput"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         <label className="text-gray-700 font-semibold">Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter name"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter username"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Bio</label>
//         <textarea
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Enter bio"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter email"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Date of Birth</label>
//         <input
//           type="date"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Gender</label>
//         <div className="flex justify-center mb-4 gap-2">
//           {[
//             { label: "M", icon: <FaMars /> },
//             { label: "F", icon: <FaVenus /> },
//             { label: "N", icon: <FaGenderless /> },
//             { label: "O", icon: <FaTransgenderAlt /> },
//           ].map(({ label, icon }) => (
//             <button
//               type="button"
//               key={label}
//               onClick={() => setGender(label)}
//               className={`flex-1 flex flex-col items-center justify-center p-1 rounded-lg ${
//                 gender === label
//                   ? "bg-[#FE7A3A] text-white"
//                   : "bg-gray-600 text-gray-300"
//               }`}
//             >
//               <div className="text-xl">{icon}</div>
//               <span className="text-xs mt-1">{label}</span>
//             </button>
//           ))}
//         </div>

//         <label className="text-gray-700 font-semibold">Phone Number</label>
//         <div className="flex mb-6">
//           <span className="flex items-center px-3 bg-white rounded-l-lg border border-r-0 border-slate-300 text-base">
//             🇮🇳 +91
//           </span>
//           <input
//             type="tel"
//             placeholder="Phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="flex-1 p-3 rounded-r-lg bg-white border border-slate-300 outline-none"
//           />
//         </div>
//         {/* <label className="text-gray-700 font-semibold">Phone Number</label>
//         <div className="mb-6 ">
//           <PhoneInput
//             country={"in"}
//             enableSearch
//             value={phone}
//             onChange={(value, country) => {
//               const numberWithoutDialCode = value.replace(
//                 `+${country.dialCode}`,
//                 ""
//               );
//               setPhone(numberWithoutDialCode);
//             }}
//             inputClass="!w-full !p-3 !text-base !rounded-lg !border !border-slate-300"
//             buttonClass="!border !border-slate-300"
//             containerClass="!w-full"
//           />
//         </div> */}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[#FE7A3A] hover:bg-orange-500 text-white py-3 rounded-lg font-semibold"
//         >
//           {loading ? "Updating..." : "Update"}
//         </button>

//         {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default UserProfile;

// import { useState, useEffect } from "react";
// import {
//   FaMars,
//   FaVenus,
//   FaGenderless,
//   FaTransgenderAlt,
//   FaEdit,
// } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const UserProfile = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [phone, setPhone] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [previewImage, setPreviewImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null); // State to hold user data
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchUserData(userId);
//     }
//   }, []); // Empty dependency array ensures this runs only once after initial render

//   const fetchUserData = async (userId) => {
//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/customuser/details/${userId}/`, // Added trailing slash for consistency
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       if (response.data) {
//         setUserData(response.data);
//         // Update form fields with fetched data
//         setName(response.data.name || "");
//         setUsername(response.data.username || "");
//         setBio(response.data.bio || "");
//         setEmail(response.data.email || "");
//         setDob(response.data.date_of_birth || "");
//         setGender(response.data.gender || "");
//         setPhone(response.data.phone_number || ""); // Remove +91 if present
//         setProfileImage(response.data.profile_pic || "");
//         setPreviewImage(response.data.profile_pic || ""); // Set initial preview
//       } else {
//         console.error("User data not found in the API response");
//         setError("Failed to fetch user data.");
//         toast.error("Failed to fetch user data."); // Added toast message
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setError("Failed to fetch user data.");
//       toast.error("Failed to fetch user data."); // Added toast message
//     }
//   };

//   const handleFileChange = async (event) => {
//     if (event.target.files.length === 0) return;

//     const file = event.target.files[0];
//     if (!file) return;

//     const previewURL = URL.createObjectURL(file);
//     setPreviewImage(previewURL);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadProfileImageAPI/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       console.log("Upload API response:", response.data);

//       const imageUrl = response.data[0]; // ✅ Get the image URL from array

//       if (!imageUrl) {
//         throw new Error("No image URL found in response");
//         toast.error("Failed to get image URL from response."); // Added toast message
//       }

//       setProfileImage(imageUrl); // ✅ Save it to state

//       toast.success("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload Error:", error);
//       setError("Failed to upload image: " + error.message);
//       toast.error("Failed to upload image."); // Added toast message
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Check if all mandatory fields are filled
//     if (!name || !username || !email || !dob || !gender || !phone) {
//       toast.error("Please fill in all the mandatory fields.");
//       setLoading(false);
//       return;
//     }

//     const payload = {
//       name,
//       username,
//       email,
//       phone_number: phone,
//       gender,
//       date_of_birth: dob,
//       bio,
//       profile_pic: profileImage,
//     };

//     try {
//       const response = await fetch(
//         "https://api.upswap.app/api/custom-user/edit-profile/",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Profile updated successfully!");
//       } else {
//         setError(data.detail || "Failed to update profile");
//         toast.error(data.detail || "Failed to update profile."); // Added toast message
//       }
//     } catch (err) {
//       console.error("Network Error:", err);
//       setError("Network error");
//       toast.error("Network error."); // Added toast message
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleClose = () => {
//     navigate("/MyPersonalAccount"); // Directly navigate to the PostDeal page
//   };

//   return (
//     <div className="min-h-screen bg-[#FE7A3A] border-2 rounded-lg flex items-center justify-center px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="relative w-full max-w-md bg-gradient-to-b from-orange-100 to-white p-6 rounded-2xl shadow-lg"
//       >
//         <button
//           onClick={handleClose}
//           className="absolute top-1 right-2 text-gray-500  hover:text-[#FE7A3A] z-10 rounded-lg"
//           type="button"
//         >
//           <FaTimes size={18} />
//         </button>

//         <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
//           User Profile
//         </h2>

//         <div className="flex justify-center mb-4">
//           <div className="relative w-24 h-24">
//             <img
//               src={profileImage || previewImage || "/default-avatar.png"}
//               alt="Profile"
//               className="w-24 h-24 rounded-full object-cover border-2 border-[#FE7A3A]"
//             />

//             <label
//               htmlFor="profileImageInput"
//               className="absolute bottom-1 right-1 bg-[#FE7A3A] p-1.5 rounded-full cursor-pointer shadow-md"
//             >
//               <FaEdit className="text-white text-sm" />
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="profileImageInput"
//               onChange={handleFileChange}
//             />
//           </div>
//         </div>

//         <label className="text-gray-700 font-semibold">Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter name"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//           required // Added required attribute
//         />

//         <label className="text-gray-700 font-semibold">Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter username"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//           required // Added required attribute
//         />

//         <label className="text-gray-700 font-semibold">Bio</label>
//         <textarea
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           placeholder="Enter bio"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//         />

//         <label className="text-gray-700 font-semibold">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter email"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//           required // Added required attribute
//         />

//         <label className="text-gray-700 font-semibold">Date of Birth</label>
//         <input
//           type="date"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//           required // Added required attribute
//         />

//         <label className="text-gray-700 font-semibold">Gender</label>
//         <div className="flex justify-center mb-4 gap-2">
//           {[
//             { label: "M", icon: <FaMars /> },
//             { label: "F", icon: <FaVenus /> },
//             { label: "N", icon: <FaGenderless /> },
//             { label: "O", icon: <FaTransgenderAlt /> },
//           ].map(({ label, icon }) => (
//             <button
//               type="button"
//               key={label}
//               onClick={() => setGender(label)}
//               className={`flex-1 flex flex-col items-center justify-center p-1 rounded-lg ${
//                 gender === label
//                   ? "bg-[#FE7A3A] text-white"
//                   : "bg-gray-600 text-gray-300"
//               }`}
//             >
//               <div className="text-xl">{icon}</div>
//               <span className="text-xs mt-1">{label}</span>
//             </button>
//           ))}
//           {!gender && (
//             <p className="text-red-500 text-xs mt-1">Gender is required</p>
//           )}
//         </div>

//         <label className="text-gray-700 font-semibold">Phone Number</label>
//         <div className="flex mb-6">
//           <span className="flex items-center px-3 bg-white rounded-l-lg border border-r-0 border-slate-300 text-base">
//             🇮🇳 +91
//           </span>
//           <input
//             type="tel"
//             placeholder="Phone number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="flex-1 p-3 rounded-r-lg bg-white border border-slate-300 outline-none"
//             required // Added required attribute
//           />
//         </div>
//         {/* <label className="text-gray-700 font-semibold">Phone Number</label>
//         <div className="mb-6 ">
//           <PhoneInput
//             country={"in"}
//             enableSearch
//             value={phone}
//             onChange={(value, country) => {
//               const numberWithoutDialCode = value.replace(
//                 `+${country.dialCode}`,
//                 ""
//               );
//               setPhone(numberWithoutDialCode);
//             }}
//             inputClass="!w-full !p-3 !text-base !rounded-lg !border !border-slate-300"
//             buttonClass="!border !border-slate-300"
//             containerClass="!w-full"
//           />
//         </div> */}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-[#FE7A3A] hover:bg-orange-500 text-white py-3 rounded-lg font-semibold"
//         >
//           {loading ? "Updating..." : "Update"}
//         </button>

//         {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default UserProfile;


import { useState, useEffect } from "react";
import {
  FaMars,
  FaVenus,
  FaGenderless,
  FaTransgenderAlt,
  FaEdit,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // State to hold user data
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchUserData(userId);
    }
  }, []); // Empty dependency array ensures this runs only once after initial render

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `https://api.upswap.app/api/customuser/details/${userId}/`, // Added trailing slash for consistency
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (response.data) {
        setUserData(response.data);
        // Update form fields with fetched data
        setName(response.data.name || "");
        setUsername(response.data.username || "");
        setBio(response.data.bio || "");
        setEmail(response.data.email || "");
        setDob(response.data.date_of_birth || "");
        setGender(response.data.gender || "");
        setPhone(response.data.phone_number || ""); // Remove +91 if present
        setProfileImage(response.data.profile_pic || "");
        setPreviewImage(response.data.profile_pic || ""); // Set initial preview
      } else {
        console.error("User data not found in the API response");
        setError("Failed to fetch user data.");
        toast.error("Failed to fetch user data."); // Added toast message
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data.");
      toast.error("Failed to fetch user data."); // Added toast message
    }
  };

  const handleFileChange = async (event) => {
    if (event.target.files.length === 0) return;

    const file = event.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/UploadProfileImageAPI/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      console.log("Upload API response:", response.data);

      const imageUrl = response.data[0]; // ✅ Get the image URL from array

      if (!imageUrl) {
        throw new Error("No image URL found in response");
        toast.error("Failed to get image URL from response."); // Added toast message
      }

      setProfileImage(imageUrl); // ✅ Save it to state

      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Failed to upload image: " + error.message);
      toast.error("Failed to upload image."); // Added toast message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if all mandatory fields are filled
    if (!name || !username || !email || !dob || !gender || !phone) {
      toast.error("Please fill in all the mandatory fields.");
      setLoading(false);
      return;
    }

    const payload = {
      name,
      username,
      email,
      phone_number: phone,
      gender,
      date_of_birth: dob,
      bio,
      profile_pic: profileImage,
    };

    try {
      const response = await fetch(
        "https://api.upswap.app/api/custom-user/edit-profile/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        // toast.success(`Response: ${JSON.stringify(data)}`); // Show the response in a toast message
      } else {
        setError(data.detail || "Failed to update profile");
        toast.error(data.detail || "Failed to update profile."); // Added toast message
        toast.error(`Error Response: ${JSON.stringify(data)}`); // Show the error response in a toast message
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Network error");
      toast.error("Network error."); // Added toast message
      toast.error(`Network Error: ${err.message}`); // Show the network error message
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    navigate("/MyPersonalAccount"); // Directly navigate to the PostDeal page
  };

  return (
    <div className="min-h-screen bg-[#FE7A3A] border-2 rounded-lg flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-gradient-to-b from-orange-100 to-white p-6 rounded-2xl shadow-lg"
      >
        <button
          onClick={handleClose}
          className="absolute top-1 right-2 text-gray-500  hover:text-[#FE7A3A] z-10 rounded-lg"
          type="button"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
          User Profile
        </h2>

        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24">
            <img
              src={profileImage || previewImage || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#FE7A3A]"
            />

            <label
              htmlFor="profileImageInput"
              className="absolute bottom-1 right-1 bg-[#FE7A3A] p-1.5 rounded-full cursor-pointer shadow-md"
            >
              <FaEdit className="text-white text-sm" />
            </label>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImageInput"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <label className="text-gray-700 font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full p-3 mb-4 rounded-lg border border-slate-300"
          required // Added required attribute
        />

        <label className="text-gray-700 font-semibold">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full p-3 mb-4 rounded-lg border border-slate-300"
          required // Added required attribute
        />

        <label className="text-gray-700 font-semibold">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter bio"
          className="w-full p-3 mb-4 rounded-lg border border-slate-300"
        />

        <label className="text-gray-700 font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full p-3 mb-4 rounded-lg border border-slate-300"
          required // Added required attribute
        />

        <label className="text-gray-700 font-semibold">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border border-slate-300"
          required // Added required attribute
        />

        <label className="text-gray-700 font-semibold">Gender</label>
        <div className="flex justify-center mb-4 gap-2">
          {[
            { label: "M", icon: <FaMars /> },
            { label: "F", icon: <FaVenus /> },
            { label: "N", icon: <FaGenderless /> },
            { label: "O", icon: <FaTransgenderAlt /> },
          ].map(({ label, icon }) => (
            <button
              type="button"
              key={label}
              onClick={() => setGender(label)}
              className={`flex-1 flex flex-col items-center justify-center p-1 rounded-lg ${
                gender === label
                  ? "bg-[#FE7A3A] text-white"
                  : "bg-gray-600 text-gray-300"
              }`}
            >
              <div className="text-xl">{icon}</div>
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
          {!gender && (
            <p className="text-red-500 text-xs mt-1">Gender is required</p>
          )}
        </div>

        <label className="text-gray-700 font-semibold">Phone Number</label>
        <div className="flex mb-6">
          <span className="flex items-center px-3 bg-white rounded-l-lg border border-r-0 border-slate-300 text-base">
            🇮🇳 +91
          </span>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 p-3 rounded-r-lg bg-white border border-slate-300 outline-none"
            required // Added required attribute
          />
        </div>
        {/* <label className="text-gray-700 font-semibold">Phone Number</label>
        <div className="mb-6 ">
          <PhoneInput
            country={"in"}
            enableSearch
            value={phone}
            onChange={(value, country) => {
              const numberWithoutDialCode = value.replace(
                `+${country.dialCode}`,
                ""
              );
              setPhone(numberWithoutDialCode);
            }}
            inputClass="!w-full !p-3 !text-base !rounded-lg !border !border-slate-300"
            buttonClass="!border !border-slate-300"
            containerClass="!w-full"
          />
        </div> */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FE7A3A] hover:bg-orange-500 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Updating..." : "Update"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default UserProfile;