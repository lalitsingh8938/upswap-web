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
          {/* <input
            // type="tel"
            inputMode="numeric"
            pattern="\d*"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 p-3 rounded-r-lg bg-white border border-slate-300 outline-none"
            required // Added required attribute
          /> */}
          <input
            type="tel"
            pattern="\d*"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              setPhone(onlyNums);
            }}
            className="flex-1 p-3 rounded-r-lg bg-white border border-slate-300 outline-none"
            required
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
// import "react-phone-input-2/lib/style.css"; // Keep styles for the button part

// const UserProfile = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");

//   // This state will hold the full phone number string as displayed in the input
//   const [fullPhoneNumberInput, setFullPhoneNumberInput] = useState("");

//   // These states will manage the country/dial code selected via the PhoneInput button
//   const [selectedCountryCode, setSelectedCountryCode] = useState("in"); // Default country for the flag
//   const [selectedDialCode, setSelectedDialCode] = useState("+91"); // Default dial code

//   const [profileImage, setProfileImage] = useState("");
//   const [previewImage, setPreviewImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchUserData(userId);
//     }
//   }, []);

//   const fetchUserData = async (userId) => {
//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/customuser/details/${userId}/`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       if (response.data) {
//         setUserData(response.data);
//         setName(response.data.name || "");
//         setUsername(response.data.username || "");
//         setBio(response.data.bio || "");
//         setEmail(response.data.email || "");
//         setDob(response.data.date_of_birth || "");
//         setGender(response.data.gender || "");

//         const apiPhoneNumber = response.data.phone_number || "";
//         setFullPhoneNumberInput(apiPhoneNumber); // Display the full number as is

//         // Attempt to infer country and dial code from the fetched number
//         // This is a common requirement. `react-phone-input-2` can help with this.
//         // We'll use a temporary PhoneInput instance or a utility function if available.
//         // For accurate parsing, consider 'libphonenumber-js'.
//         // For simplicity here, let's make an assumption or use a basic check.
//         // If your API provides `dial_code` and `local_phone_number` separately,
//         // it would be even easier. Assuming API returns `+XXYYYYYYYYY`.

//         if (apiPhoneNumber) {
//           // A rudimentary way to guess initial country/dial code based on the number
//           // This part might need fine-tuning or a dedicated parsing library like `libphonenumber-js`
//           // for perfect accuracy across all international numbers.
//           // For react-phone-input-2's internal parsing, it needs to be rendered.
//           // A more robust way to get initial country/dial code is to use a lookup
//           // table or a dedicated phone number parsing library.
//           // For now, let's stick to setting the `PhoneInput`'s `value` to infer.
//           // This will require a temporary `PhoneInput` to get the `countryData`.

//           // Since we can't directly call PhoneInput's internal parsing without rendering,
//           // we'll rely on the onChange event for initial setup if needed or
//           // keep the default 'in' if the API number doesn't easily conform.

//           // A more direct way to initialize flag/dial_code for the button is to
//           // temporarily create a PhoneInput component or use its internal logic.
//           // For this example, we'll assume `PhoneInput` will handle this when it's rendered.
//           // The best approach here is to let `PhoneInput` be the source of truth
//           // for `selectedCountryCode` and `selectedDialCode` during initialization.
//           // Let's create a temporary instance to parse if needed.
//           // This is a bit advanced but good to know:
//           try {
//             // This is a hacky way to use `PhoneInput`'s internal parsing without
//             // fully rendering it in the main UI flow just for initial data.
//             // A more elegant solution would be to use `libphonenumber-js` directly.
//             // For now, let's just make sure the `PhoneInput` component handles its own value.
//             // The `onChange` will trigger during initial load if `value` is set.

//             // If the API returns '+911234567890', we want the button to reflect +91.
//             // PhoneInput's `value` prop needs the full number.
//             // The trick is, we want the *button* to show the correct flag/code,
//             // but the *input* to show the full string.
//             // We'll use the onChange of the *hidden* PhoneInput to get the data.
//             // Or, more simply, just update the selected country/dial code when
//             // PhoneInput updates its internal state.

//             // Let's refine the initial state setting for selected country/dial code.
//             // Assuming your backend stores numbers consistently (e.g., E.164 format +XXYYYYYYYYY)
//             if (apiPhoneNumber.startsWith("+")) {
//                 const phoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
//                 try {
//                     const number = phoneNumberUtil.parseAndKeepRawInput(apiPhoneNumber);
//                     const regionCode = phoneNumberUtil.getRegionCodeForNumber(number);
//                     const dialCode = number.getCountryCode();
//                     setSelectedCountryCode(regionCode ? regionCode.toLowerCase() : "us"); // Default to US if unknown
//                     setSelectedDialCode(`+${dialCode}`);
//                 } catch (parseError) {
//                     console.warn("Failed to parse phone number with libphonenumber-js:", parseError);
//                     // Fallback to default if parsing fails
//                     setSelectedCountryCode("in");
//                     setSelectedDialCode("+91");
//                 }
//             } else {
//                 // If the number from API doesn't start with '+', it might be a local number.
//                 // In this case, defaulting to 'in' and '+91' is reasonable.
//                 setSelectedCountryCode("in");
//                 setSelectedDialCode("+91");
//             }
//           } catch (e) {
//             console.error("Error setting initial phone data:", e);
//             // Fallback
//             setSelectedCountryCode("in");
//             setSelectedDialCode("+91");
//           }
//         }

//         setProfileImage(response.data.profile_pic || "");
//         setPreviewImage(response.data.profile_pic || "");
//       } else {
//         console.error("User data not found in the API response");
//         setError("Failed to fetch user data.");
//         toast.error("Failed to fetch user data.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setError("Failed to fetch user data.");
//       toast.error("Failed to fetch user data.");
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
//       const imageUrl = response.data[0];
//       if (!imageUrl) {
//         throw new Error("No image URL found in response");
//       }
//       setProfileImage(imageUrl);
//       toast.success("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload Error:", error);
//       setError("Failed to upload image: " + error.message);
//       toast.error("Failed to upload image.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Construct the full phone number to send to API
//     // Ensure the input field has a valid number before submission
//     if (!fullPhoneNumberInput || !fullPhoneNumberInput.trim()) {
//         toast.error("Please enter a phone number.");
//         setLoading(false);
//         return;
//     }

//     // You can add more validation here if needed, e.g., using libphonenumber-js
//     // to validate the `fullPhoneNumberInput` against `selectedCountryCode`.

//     if (!name || !username || !email || !dob || !gender) { // Check other mandatory fields
//       toast.error("Please fill in all the mandatory fields.");
//       setLoading(false);
//       return;
//     }


//     const payload = {
//       name,
//       username,
//       email,
//       phone_number: fullPhoneNumberInput, // Send the full number as entered
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
//         toast.error(data.detail || "Failed to update profile.");
//       }
//     } catch (err) {
//       console.error("Network Error:", err);
//       setError("Network error");
//       toast.error("Network error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     navigate("/MyPersonalAccount");
//   };

//   return (
//     <div className="min-h-screen bg-[#FE7A3A] border-2 rounded-lg flex items-center justify-center px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="relative w-full max-w-md bg-gradient-to-b from-orange-100 to-white p-6 rounded-2xl shadow-lg"
//       >
//         <button
//           onClick={handleClose}
//           className="absolute top-1 right-2 text-gray-500 hover:text-[#FE7A3A] z-10 rounded-lg"
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
//           required
//         />

//         <label className="text-gray-700 font-semibold">Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter username"
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//           required
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
//           required
//         />

//         <label className="text-gray-700 font-semibold">Date of Birth</label>
//         <input
//           type="date"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//           className="w-full p-3 mb-4 rounded-lg border border-slate-300"
//           required
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
//           {/* This PhoneInput is used ONLY for the button (flag and dial code selection) */}
//           {/* We hide its input part */}
//           <PhoneInput
//             country={selectedCountryCode}
//             enableSearch={true}
//             value={fullPhoneNumberInput} // Still feed it the full number to help it identify the country
//             onChange={(phoneNumber, countryData) => {
//               // Update the states for the selected country and dial code
//               setSelectedCountryCode(countryData.countryCode);
//               setSelectedDialCode(`+${countryData.dialCode}`);
//               // When the user changes the country via the button,
//               // we might want to pre-fill the input with the new dial code
//               // if it's currently empty or doesn't start with the correct one.
//               if (!fullPhoneNumberInput.startsWith(`+${countryData.dialCode}`)) {
//                  setFullPhoneNumberInput(`+${countryData.dialCode}`);
//               }
//             }}
//             inputStyle={{ display: 'none' }} // Hides the input part of PhoneInput
//             containerStyle={{ width: 'auto' }} // Adjust container width
//             buttonClass="!h-full !border !border-slate-300 !rounded-l-lg !px-2" // Style the button only
//             disableSearchIcon={true} // Hide search icon if you want a cleaner button
//           />
//           {/* This is your actual input field for the full phone number */}
//           <input
//             type="tel" // Use type="tel" for phone numbers
//             inputMode="numeric" // Suggest numeric keyboard
//             pattern="[0-9+]*" // Allow digits and '+'
//             placeholder="e.g., +911234567890"
//             value={fullPhoneNumberInput}
//             onChange={(e) => {
//               // Allow user to type anything, but you can add more strict validation
//               setFullPhoneNumberInput(e.target.value);
//             }}
//             className="flex-1 p-3 rounded-r-lg bg-white border border-slate-300 outline-none text-base"
//             required // Mark as required
//           />
//         </div>

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