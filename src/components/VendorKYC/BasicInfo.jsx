// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Pencil } from "lucide-react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTimes } from "react-icons/fa";

// const BasicInfo = () => {
//   const navigate = useNavigate();
//   const [previewImage, setPreviewImage] = useState();
//   const [profileImage, setProfileImage] = useState();

//   const userId = localStorage.getItem("user_id");

//   const [formData, setFormData] = useState({
//     user: userId,
//     full_name: "",
//     phone_number: "",
//     business_description: "",
//     business_email_id: "",
//     business_establishment_year: "",
//   });
//   useEffect(() => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     const fetchVendorDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const data = response.data;
//        console.log("Vendor data:", data);

//         setFormData({
//           user: userId,
//           profile_pic: data.profile_pic || "",
//           full_name: data.full_name || "",
//           phone_number: data.phone_number || "",
//           business_description: data.business_description || "",
//           business_email_id: data.business_email_id || "",
//           business_establishment_year: data.business_establishment_year || "",
//         });

//         if (data.profile_image) {
//           setProfileImage(data.profile_image);
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor data", error);
//       }
//     };

//     fetchVendorDetails();
//   }, []);

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

//       const uploadedProfilePic = response.data[0];
//       setProfileImage(uploadedProfilePic);
//       localStorage.setItem("profile_image_url", uploadedProfilePic);
//       toast.success("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.warning("Failed to upload image");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     const {
//       full_name,
//       phone_number,
//       business_description,
//       business_email_id,
//       business_establishment_year,
//     } = formData;

//     if (!profileImage && !previewImage) {
//       toast.warning("Please upload your profile picture");
//       return;
//     }

//     if (!full_name) {
//       toast.warning("Please enter your full name");
//       return;
//     }
//     if (!phone_number) {
//       toast.warning("Please enter your phone number");
//       return;
//     }
//     if (!business_email_id) {
//       toast.warning("Please enter your business email ID");
//       return;
//     }
//     if (!business_establishment_year) {
//       toast.warning("Please enter business establishment year");
//       return;
//     }
//     if (!business_description) {
//       toast.warning("Please enter your business description");
//       return;
//     }

//     localStorage.setItem("vendorData", JSON.stringify(formData));
//     localStorage.setItem(phone_number, formData.phone_number);
//     navigate("/VendorDocument");
//   };
//   const handleClose = () => {
//     navigate("/PostDeal"); // Directly navigate to the PostDeal page
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen border-2 bg-[#FE7A3A] to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//       <button
//           onClick={handleClose}
//           className="absolute top-0 right-2 text-gray-500 hover:text-[#FE7A3A]"
//           type="button"
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         {/* Profile Image Upload */}
//         <div className="flex justify-center mt-4">
//           <div className="relative">
//             <img
//               src={profileImage || previewImage || "/default-avatar.png"}
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-4 border-[#FE7A3A] object-cover"
//             />
//             <label className="absolute bottom-0 right-0 bg-[#FE7A3A] text-white p-1 rounded-full cursor-pointer">
//               <Pencil size={16} />
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </label>
//           </div>
//         </div>

//         {/* Full Name */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Full Name
//         </label>
//         <input
//           type="text"
//           name="full_name"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter full name"
//           value={formData.full_name}
//           onChange={handleChange}
//         />

//         {/* Phone Number */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Phone Number
//         </label>
//         <div className="flex items-center border p-2 rounded-lg mb-3">
//           <span className="mr-2">🇮🇳 +91</span>
//           <input
//             type="number"
//             name="phone_number"
//             className="flex-1 outline-none"
//             placeholder="Business Phone number"
//             value={formData.phone_number}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex items-center gap-2 mb-3">
//           <input type="checkbox" id="samePhone" className="w-4 h-4" />
//           <label htmlFor="samePhone" className="text-gray-600 font-semibold">
//             Same as personal phone number
//           </label>
//         </div>

//         {/* Business Email ID */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Email ID
//         </label>
//         <input
//           type="email"
//           name="business_email_id"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Business email id"
//           value={formData.business_email_id}
//           onChange={handleChange}
//         />

//         <div className="flex items-center gap-2 mb-3">
//           <input type="checkbox" id="sameEmail" className="w-4 h-4" />
//           <label htmlFor="sameEmail" className="text-gray-600 font-semibold">
//             Same as personal email id
//           </label>
//         </div>

//         {/* Business Establishment Year */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Establishment Year
//         </label>
//         <input
//           type="number"
//           name="business_establishment_year"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter Business establishment year"
//           value={formData.business_establishment_year}
//           onChange={handleChange}
//         />

//         {/* Business Description */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Description
//         </label>
//         <textarea
//           type="text"
//           name="business_description"
//           className="w-full border p-2 rounded-lg"
//           placeholder="Enter your business description"
//           rows="3"
//           value={formData.business_description}
//           onChange={handleChange}
//         ></textarea>

//         {/* Next Button */}
//         <button
//           className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mt-4 hover:bg-[#FE7A3A]"
//           onClick={handleNext}
//         >
//           Next
//         </button>

//         {/* Toast Container */}
//         <ToastContainer position="top-center" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default BasicInfo;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTimes } from "react-icons/fa";
// import { FaSpinner } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";

// const BasicInfo = () => {
//   const navigate = useNavigate();
//   const [previewImage, setPreviewImage] = useState();
//   const [profileImageFile, setProfileImageFile] = useState(null);
//   const [profileImageUrl, setProfileImageUrl] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

//   const userId = localStorage.getItem("user_id");

//   const [formData, setFormData] = useState({
//     user: userId,
//     profile_pic: "",
//     full_name: "",
//     phone_number: "",
//     business_description: "",
//     business_email_id: "",
//     business_establishment_year: "",
//   });

//   // useEffect(() => {
//   //   const vendorId = localStorage.getItem("vendor_id");
//   //   if (!vendorId) return;

//   //   const fetchVendorDetails = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `https://api.upswap.app/api/vendor/details/${vendorId}`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${localStorage.getItem("access")}`,
//   //           },
//   //         }
//   //       );

//   //       const data = response.data;

//   //       setFormData({
//   //         user: userId,
//   //         profile_pic: data.profile_pic || "",
//   //         full_name: data.full_name || "",
//   //         phone_number: data.phone_number || "",
//   //         business_description: data.business_description || "",
//   //         business_email_id: data.business_email_id || "",
//   //         business_establishment_year: data.business_establishment_year || "",
//   //       });

//   //       if (data.profile_pic) {
//   //         setProfileImageUrl(data.profile_pic);
//   //         localStorage.setItem("profile_image_url", data.profile_pic); // Save URL on fetch
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to fetch vendor data", error);
//   //     }
//   //   };

//   //   fetchVendorDetails();
//   // }, [userId]);

//   useEffect(() => {
//     // Pehle API call ke alawa, localStorage se bhi data check karo
//     const savedData = localStorage.getItem("vendorData");
//     if (savedData) {
//       setFormData(JSON.parse(savedData));
//       const savedProfilePic = localStorage.getItem("profile_image_url");
//       if (savedProfilePic) {
//         setProfileImageUrl(savedProfilePic);
//       }
//       return; // localStorage data mil gaya toh API call nahi karni
//     }

//     // Agar localStorage mein data nahi hai, tab API call karo
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     const fetchVendorDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const data = response.data;

//         setFormData({
//           user: userId,
//           profile_pic: data.profile_pic || "",
//           full_name: data.full_name || "",
//           phone_number: data.phone_number || "",
//           business_description: data.business_description || "",
//           business_email_id: data.business_email_id || "",
//           business_establishment_year: data.business_establishment_year || "",
//         });

//         if (data.profile_pic) {
//           setProfileImageUrl(data.profile_pic);
//           localStorage.setItem("profile_image_url", data.profile_pic);
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor data", error);
//       }
//     };

//     fetchVendorDetails();
//   }, [userId]);

//   // const handleFileChange = async (event) => {
//   //   if (event.target.files.length === 0) return;

//   //   const file = event.target.files[0];
//   //   if (!file) return;

//   //   setProfileImageFile(file);
//   //   const previewURL = URL.createObjectURL(file);
//   //   setPreviewImage(previewURL);
//   //   setProfileImageUrl(previewURL);

//   //   const imageFormData = new FormData();
//   //   imageFormData.append("file", file);

//   //   try {
//   //     const response = await axios.post(
//   //       "https://api.upswap.app/api/UploadProfileImageAPI/",
//   //       imageFormData,
//   //       {
//   //         headers: {
//   //           "Content-Type": "multipart/form-data",
//   //           Authorization: `Bearer ${localStorage.getItem("access")}`,
//   //         },
//   //       }
//   //     );

//   //     const uploadedProfilePic = response.data[0];
//   //     setFormData((prev) => ({ ...prev, profile_pic: uploadedProfilePic }));
//   //     setProfileImageUrl(uploadedProfilePic);
//   //     localStorage.setItem("profile_image_url", uploadedProfilePic); // Save URL on upload
//   //     toast.success("Profile image uploaded successfully!");
//   //   } catch (error) {
//   //     console.error("Upload error:", error);
//   //     toast.warning("Failed to upload image");
//   //   }
//   // };

//   const handleFileChange = async (event) => {
//     if (event.target.files.length === 0) return;

//     const file = event.target.files[0];
//     if (!file) return;

//     setProfileImageFile(file);
//     const previewURL = URL.createObjectURL(file);
//     setPreviewImage(previewURL);
//     setProfileImageUrl(previewURL);

//     const imageFormData = new FormData();
//     imageFormData.append("file", file);

//     setIsUploading(true); // <-- start loading

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadProfileImageAPI/",
//         imageFormData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       const uploadedProfilePic = response.data[0];
//       setFormData((prev) => ({ ...prev, profile_pic: uploadedProfilePic }));
//       setProfileImageUrl(uploadedProfilePic);
//       localStorage.setItem("profile_image_url", uploadedProfilePic);
//       toast.success("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.warning("Failed to upload image");
//     } finally {
//       setIsUploading(false); // <-- stop loading
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     const {
//       full_name,
//       phone_number,
//       business_description,
//       business_email_id,
//       business_establishment_year,
//     } = formData;

//     if (!profileImageUrl && !localStorage.getItem("profile_image_url")) {
//       toast.warning("Please upload your profile picture");
//       return;
//     }

//     if (!full_name) {
//       toast.warning("Please enter your full name");
//       return;
//     }
//     if (!phone_number) {
//       toast.warning("Please enter your phone number");
//       return;
//     }
//     if (!business_email_id) {
//       toast.warning("Please enter your business email ID");
//       return;
//     }
//     if (!business_establishment_year) {
//       toast.warning("Please enter business establishment year");
//       return;
//     }
//     if (!business_description) {
//       toast.warning("Please enter your business description");
//       return;
//     }

//     localStorage.setItem("vendorData", JSON.stringify(formData));
//     navigate("/VendorDocument");
//   };

//   const handleClose = () => {
//     navigate("/PostDeal");
//   };

//   return (
//     // <div className="flex justify-center items-center min-h-screen border-2 bg-[#FE7A3A] to-white p-4 rounded-lg">
//     // <div className="min-h-screen bg-[#D0B9A7] flex items-center justify-center py-8">
//     <div className="min-h-screen bg-[#D0B9A7] flex items-center justify-center py-8">
//       {/* <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"> */}
//       {/* <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md px-4 sm:px-6 md:px-8"> */}
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto md:px-8">
//         {/* <button
//           onClick={handleClose}
//           className="absolute top-0 right-2 text-gray-500 hover:text-[#FE7A3A]"
//           type="button"
//         >
//           <FaTimes size={20} />
//         </button> */}
//         {/* button is now outside this div */}
//         <div className="flex justify-center items-center bg-[#FE7A3A] py-3 px-4 rounded-lg mb-4">
//           <h2 className="text-xl font-semibold text-white">Become a Vendor</h2>
//         </div>

//         {/* The button is moved here, directly inside the main form container */}
//         <button
//           onClick={handleClose}
//           className="absolute top-0 right-2 text-gray-500 hover:text-[#FE7A3A]"
//           type="button"
//         >
//           <FaTimes size={20} />
//         </button>

//         {/* Profile Image Upload */}
//         {/* <div className="flex justify-center mt-4">
//           <div className="relative">
//             {previewImage ||
//             profileImageUrl ||
//             localStorage.getItem("local_profile_image_url") ? (
//               <img
//                 src={
//                   previewImage ||
//                   profileImageUrl ||
//                   localStorage.getItem("local_profile_image_url")
//                 }
//                 alt="Profile Preview"
//                 className="w-24 h-24 rounded-full object-cover border-2 border-[#FE7A3A]"
//               />
//             ) : (
//               <p>No image</p>
//             )}
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
//         </div> */}
//         <div className="flex justify-center items-center h-full my-4">
//           <div className="relative w-24 h-24">
//             {isUploading && (
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
//                 <FaSpinner className="animate-spin text-white text-xl" />
//               </div>
//             )}

//             {previewImage ||
//             profileImageUrl ||
//             localStorage.getItem("profile_image_url") ? (
//               <img
//                 src={
//                   previewImage ||
//                   profileImageUrl ||
//                   localStorage.getItem("profile_image_url")
//                 }
//                 alt="Profile Preview"
//                 className="w-24 h-24 rounded-full object-cover border-2 border-[#FE7A3A]"
//               />
//             ) : (
//               <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//                 No image
//               </div>
//             )}

//             <label
//               htmlFor="profileImageInput"
//               className={`absolute bottom-1 right-1 bg-[#FE7A3A] p-1.5 rounded-full cursor-pointer shadow-md ${
//                 isUploading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               <FaEdit className="text-white text-sm" />
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               id="profileImageInput"
//               onChange={handleFileChange}
//               disabled={isUploading}
//             />
//           </div>
//         </div>

//         {/* Full Name */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Full Name
//         </label>

//         <input
//           type="text"
//           name="full_name"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter full name"
//           value={formData.full_name}
//           onChange={handleChange}
//         />

//         {/* Phone Number */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Phone Number
//         </label>
//         <div className="flex items-center border p-2 rounded-lg mb-3">
//           <span className="mr-2">🇮🇳 +91</span>
//           <input
//             // type="number"
//             inputMode="numeric"
//             pattern="\d*"
//             name="phone_number"
//             className="flex-1 outline-none"
//             placeholder="Business Phone number"
//             value={formData.phone_number}
//             onChange={handleChange}
//           />
//         </div>

//         {/* <div className="flex items-center gap-2 mb-3">
//           <input type="checkbox" id="samePhone" className="w-4 h-4" />
//           <label htmlFor="samePhone" className="text-gray-600 font-semibold">
//             Same as personal phone number
//           </label>
//         </div> */}
//         <div className="flex items-center gap-2 mb-3">
//           {/* <input
//             type="checkbox"
//             id="samePhone"
//             className="w-4 h-4"
//             onChange={(e) => {
//               if (e.target.checked) {
//                 const personalPhone = localStorage.getItem("phone_number");
//                 if (personalPhone) {
//                   setFormData({
//                     ...formData,
//                     phone_number: personalPhone,
//                   });
//                 } else {
//                   toast.warning(
//                     "Personal phone number not found in local storage"
//                   );
//                 }
//               }
//             }}
//           /> */}
//           <input
//             type="checkbox"
//             id="samePhone"
//             className="w-4 h-4"
//             onChange={(e) => {
//               if (e.target.checked) {
//                 const personalPhone = localStorage.getItem("phone_number");
//                 if (personalPhone) {
//                   setFormData((prev) => ({
//                     ...prev,
//                     phone_number: personalPhone,
//                   }));
//                 } else {
//                   toast.warning(
//                     "Personal phone number not found in local storage"
//                   );
//                 }
//               } else {
//                 // Unchecked → clear the field
//                 setFormData((prev) => ({
//                   ...prev,
//                   phone_number: "",
//                 }));
//               }
//             }}
//           />

//           <label htmlFor="samePhone" className="text-gray-600 font-semibold">
//             Same as personal phone number
//           </label>
//         </div>

//         {/* Business Email ID */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Email ID
//         </label>
//         <input
//           type="email"
//           name="business_email_id"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Business email id"
//           value={formData.business_email_id}
//           onChange={handleChange}
//         />

//         {/* <div className="flex items-center gap-2 mb-3">
//           <input type="checkbox" id="sameEmail" className="w-4 h-4" />
//           <label htmlFor="sameEmail" className="text-gray-600 font-semibold">
//             Same as personal email id
//           </label>
//         </div> */}
//         <div className="flex items-center gap-2 mb-3">
//           {/* <input
//             type="checkbox"
//             id="sameEmail"
//             className="w-4 h-4"
//             onChange={(e) => {
//               if (e.target.checked) {
//                 const email = localStorage.getItem("email");
//                 if (email) {
//                   setFormData({
//                     ...formData,
//                     business_email_id: email,
//                   });
//                 } else {
//                   toast.warning("Personal email not found in local storage");
//                 }
//               }
//             }}
//           /> */}
//           <input
//             type="checkbox"
//             id="sameEmail"
//             className="w-4 h-4"
//             onChange={(e) => {
//               if (e.target.checked) {
//                 const email = localStorage.getItem("email");
//                 if (email) {
//                   setFormData((prev) => ({
//                     ...prev,
//                     business_email_id: email,
//                   }));
//                 } else {
//                   toast.warning("Personal email not found in local storage");
//                 }
//               } else {
//                 // Unchecked → clear the field
//                 setFormData((prev) => ({
//                   ...prev,
//                   business_email_id: "",
//                 }));
//               }
//             }}
//           />

//           <label htmlFor="sameEmail" className="text-gray-600 font-semibold">
//             Same as personal email id
//           </label>
//         </div>

//         {/* Business Establishment Year */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Establishment Year
//         </label>
//         {/* <input
//           type="number"
//           // type="text"
//             pattern="\d*" // Ensures only digits are entered
//           name="business_establishment_year"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter Business establishment year"
//           value={formData.business_establishment_year}
//           onChange={handleChange}
//         /> */}
//         {/* <input
//           // type="number"
//           name="business_establishment_year"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter Business establishment year (e.g., 2005)"
//           value={formData.business_establishment_year}
//           onChange={(e) => {
//             const value = e.target.value;
//             // Allow only 4-digit numbers (1000–9999)
//             if (
//               value === "" ||
//               (/^\d{0,4}$/.test(value) && value <= new Date().getFullYear())
//             ) {
//               setFormData({ ...formData, business_establishment_year: value });
//             }
//           }}
//         /> */}
//         <select
//           name="business_establishment_year"
//           value={formData.business_establishment_year}
//           onChange={(e) =>
//             setFormData((prev) => ({
//               ...prev,
//               business_establishment_year: e.target.value,
//             }))
//           }
//           className="w-full border p-2 rounded-lg mb-3"
//         >
//           <option value="">Select Year</option>
//           {Array.from({ length: 100 }, (_, i) => {
//             const year = new Date().getFullYear() - i;
//             return (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             );
//           })}
//         </select>

//         {/* Business Description */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Description
//         </label>
//         <textarea
//           type="text"
//           name="business_description"
//           className="w-full border p-2 rounded-lg"
//           placeholder="Enter your business description"
//           rows="3"
//           value={formData.business_description}
//           onChange={handleChange}
//         ></textarea>

//         {/* Next Button */}
//         <button
//           className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mt-4 hover:bg-[#FE7A3A]"
//           onClick={handleNext}
//         >
//           Next
//         </button>

//         {/* Toast Container */}
//         <ToastContainer position="top-center" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default BasicInfo;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const BasicInfo = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState();
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const userId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    user: userId,
    profile_pic: "",
    full_name: "",
    phone_number: "",
    business_description: "",
    business_email_id: "",
    business_establishment_year: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("vendorData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      const savedProfilePic = localStorage.getItem("profile_image_url");
      if (savedProfilePic) {
        setProfileImageUrl(savedProfilePic);
      }
      return;
    }

    const vendorId = localStorage.getItem("vendor_id");
    if (!vendorId) return;

    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.upswap.app/api/vendor/details/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        const data = response.data;

        setFormData({
          user: userId,
          profile_pic: data.profile_pic || "",
          full_name: data.full_name || "",
          phone_number: data.phone_number || "",
          business_description: data.business_description || "",
          business_email_id: data.business_email_id || "",
          business_establishment_year: data.business_establishment_year || "",
        });

        if (data.profile_pic) {
          setProfileImageUrl(data.profile_pic);
          localStorage.setItem("profile_image_url", data.profile_pic);
        }
      } catch (error) {
        console.error("Failed to fetch vendor data", error);
      }
    };

    fetchVendorDetails();
  }, [userId]);

  const handleFileChange = async (event) => {
    if (event.target.files.length === 0) return;

    const file = event.target.files[0];
    if (!file) return;

    setProfileImageFile(file);
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
    setProfileImageUrl(previewURL);

    const imageFormData = new FormData();
    imageFormData.append("file", file);

    setIsUploading(true);

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/UploadProfileImageAPI/",
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      const uploadedProfilePic = response.data[0];
      setFormData((prev) => ({ ...prev, profile_pic: uploadedProfilePic }));
      setProfileImageUrl(uploadedProfilePic);
      localStorage.setItem("profile_image_url", uploadedProfilePic);
      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.warning("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const {
      full_name,
      phone_number,
      business_description,
      business_email_id,
      business_establishment_year,
    } = formData;

    if (!profileImageUrl && !localStorage.getItem("profile_image_url")) {
      toast.warning("Please upload your profile picture");
      return;
    }

    if (!full_name) {
      toast.warning("Please enter your full name");
      return;
    }
    if (!phone_number) {
      toast.warning("Please enter your phone number");
      return;
    }
    if (!business_email_id) {
      toast.warning("Please enter your business email ID");
      return;
    }
    if (!business_establishment_year) {
      toast.warning("Please enter business establishment year");
      return;
    }
    if (!business_description) {
      toast.warning("Please enter your business description");
      return;
    }

    localStorage.setItem("vendorData", JSON.stringify(formData));
    navigate("/VendorDocument");
  };

  const handleClose = () => {
    navigate("/Home");
  };

  return (
    // <div className="min-h-screen bg-gradient-to-b from-orange-400 to-white flex items-center justify-center py-8">
      
     <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl rounded-md mx-auto bg-gradient-to-b from-orange-400 to-white">{/* Main form container with relative positioning if not already there */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto md:px-8 relative"> 
        {/* Cross button moved here and positioned absolutely relative to its parent */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#FE7A3A] rounded-full "
          type="button"
        >
          <FaTimes size={18} />
        </button>

        {/* This div now only contains the heading */}
        <div className="flex justify-center items-center bg-[#FE7A3A] py-3 px-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-white">
            Become a Vendor
          </h2>
        </div>

        <div className="flex justify-center items-center h-full my-4">
          <div className="relative w-24 h-24">
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                <FaSpinner className="animate-spin text-white text-xl" />
              </div>
            )}

            {previewImage ||
            profileImageUrl ||
            localStorage.getItem("profile_image_url") ? (
              <img
                src={
                  previewImage ||
                  profileImageUrl ||
                  localStorage.getItem("profile_image_url")
                }
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#FE7A3A]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No image
              </div>
            )}

            <label
              htmlFor="profileImageInput"
              className={`absolute bottom-1 right-1 bg-[#FE7A3A] p-1.5 rounded-full cursor-pointer shadow-md ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaEdit className="text-white text-sm" />
            </label>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImageInput"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>
        </div>

        {/* Full Name */}
        <label className="block text-gray-700 mb-1 font-semibold">
          Full Name
        </label>

        <input
          type="text"
          name="full_name"
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter full name"
          value={formData.full_name}
          onChange={handleChange}
        />

        {/* Phone Number */}
        <label className="block text-gray-700 mb-1 font-semibold">
          Phone Number
        </label>
        <div className="flex items-center border p-2 rounded-lg mb-3">
          <span className="mr-2">🇮🇳 +91</span>
          <input
            inputMode="numeric"
            pattern="\d*"
            name="phone_number"
            className="flex-1 outline-none"
            placeholder="Business Phone number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            id="samePhone"
            className="w-4 h-4"
            onChange={(e) => {
              if (e.target.checked) {
                const personalPhone = localStorage.getItem("phone_number");
                if (personalPhone) {
                  setFormData((prev) => ({
                    ...prev,
                    phone_number: personalPhone,
                  }));
                } else {
                  toast.warning(
                    "Personal phone number not found in local storage"
                  );
                }
              } else {
                setFormData((prev) => ({
                  ...prev,
                  phone_number: "",
                }));
              }
            }}
          />

          <label htmlFor="samePhone" className="text-gray-600 font-semibold">
            Same as personal phone number
          </label>
        </div>

        {/* Business Email ID */}
        <label className="block text-gray-700 mb-1 font-semibold">
          Business Email ID
        </label>
        <input
          type="email"
          name="business_email_id"
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Business email id"
          value={formData.business_email_id}
          onChange={handleChange}
        />

        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            id="sameEmail"
            className="w-4 h-4"
            onChange={(e) => {
              if (e.target.checked) {
                const email = localStorage.getItem("email");
                if (email) {
                  setFormData((prev) => ({
                    ...prev,
                    business_email_id: email,
                  }));
                } else {
                  toast.warning("Personal email not found in local storage");
                }
              } else {
                setFormData((prev) => ({
                  ...prev,
                  business_email_id: "",
                }));
              }
            }}
          />

          <label htmlFor="sameEmail" className="text-gray-600 font-semibold">
            Same as personal email id
          </label>
        </div>

        {/* Business Establishment Year */}
        <label className="block text-gray-700 mb-1 font-semibold">
          Business Establishment Year
        </label>
        <select
          name="business_establishment_year"
          value={formData.business_establishment_year}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              business_establishment_year: e.target.value,
            }))
          }
          className="w-full border p-2 rounded-lg mb-3"
        >
          <option value="">Select Year</option>
          {Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        {/* Business Description */}
        <label className="block text-gray-700 mb-1 font-semibold">
          Business Description
        </label>
        <textarea
          type="text"
          name="business_description"
          className="w-full border p-2 rounded-lg"
          placeholder="Enter your business description"
          rows="3"
          value={formData.business_description}
          onChange={handleChange}
        ></textarea>

        {/* Next Button */}
        <button
          className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mt-4 hover:bg-[#FE7A3A]"
          onClick={handleNext}
        >
          Next
        </button>

        {/* Toast Container */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default BasicInfo;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTimes, FaEdit } from "react-icons/fa";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const BasicInfo = () => {
//   const navigate = useNavigate();
//   const [previewImage, setPreviewImage] = useState();
//   const [profileImageFile, setProfileImageFile] = useState(null);
//   const [profileImageUrl, setProfileImageUrl] = useState("");
//   const userId = localStorage.getItem("user_id");

//   const [formData, setFormData] = useState({
//     user: userId,
//     profile_pic: "",
//     full_name: "",
//     phone_number: "",
//     business_description: "",
//     business_email_id: "",
//     business_establishment_year: "",
//   });

//   const [isFormValid, setIsFormValid] = useState(false);

//   useEffect(() => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     const fetchVendorDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const data = response.data;

//         setFormData({
//           user: userId,
//           profile_pic: data.profile_pic || "",
//           full_name: data.full_name || "",
//           phone_number: data.phone_number || "",
//           business_description: data.business_description || "",
//           business_email_id: data.business_email_id || "",
//           business_establishment_year: data.business_establishment_year || "",
//         });

//         if (data.profile_pic) {
//           setProfileImageUrl(data.profile_pic);
//           localStorage.setItem("profile_image_url", data.profile_pic);
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor data", error);
//       }
//     };

//     fetchVendorDetails();
//   }, [userId]);

//   useEffect(() => {
//     const {
//       full_name,
//       phone_number,
//       business_description,
//       business_email_id,
//       business_establishment_year,
//     } = formData;

//     const hasImage =
//       profileImageUrl || localStorage.getItem("profile_image_url");

//     if (
//       hasImage &&
//       full_name.trim() &&
//       phone_number.trim() &&
//       business_description.trim() &&
//       business_email_id.trim() &&
//       (business_establishment_year ?? '').toString().trim()
//     ) {
//       setIsFormValid(true);
//     } else {
//       setIsFormValid(false);
//     }
//   }, [formData, profileImageUrl]);

//   const handleFileChange = async (event) => {
//     if (event.target.files.length === 0) return;

//     const file = event.target.files[0];
//     if (!file) return;

//     setProfileImageFile(file);
//     const previewURL = URL.createObjectURL(file);
//     setPreviewImage(previewURL);
//     setProfileImageUrl(previewURL);

//     const imageFormData = new FormData();
//     imageFormData.append("file", file);

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadProfileImageAPI/",
//         imageFormData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       const uploadedProfilePic = response.data[0];
//       setFormData((prev) => ({ ...prev, profile_pic: uploadedProfilePic }));
//       setProfileImageUrl(uploadedProfilePic);
//       localStorage.setItem("profile_image_url", uploadedProfilePic);
//       toast.success("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.warning("Failed to upload image");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     localStorage.setItem("vendorData", JSON.stringify(formData));
//     navigate("/VendorDocument");
//   };

//   const handleClose = () => {
//     navigate("/PostDeal");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen border-2 bg-[#FE7A3A] to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <button
//           onClick={handleClose}
//           className="absolute top-0 right-2 text-gray-500 hover:text-[#FE7A3A]"
//           type="button"
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         <div className="flex justify-center mt-4">
//           <div className="relative">
//             {previewImage || profileImageUrl ? (
//               <img
//                 src={previewImage || profileImageUrl}
//                 alt="Profile Preview"
//                 className="w-24 h-24 rounded-full object-cover border-2 border-[#FE7A3A]"
//               />
//             ) : (
//               <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-[#FE7A3A]">
//                 No image
//               </div>
//             )}
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

//         <label className="block text-gray-700 mb-1 font-semibold">
//           Full Name
//         </label>
//         <input
//           type="text"
//           name="full_name"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter full name"
//           value={formData.full_name}
//           onChange={handleChange}
//         />

//         <label className="block text-gray-700 mb-1 font-semibold">
//           Phone Number
//         </label>
//         <div className="flex items-center border p-2 rounded-lg mb-3">
//           <span className="mr-2">🇮🇳 +91</span>
//           <input
//             inputMode="numeric"
//             pattern="\d*"
//             name="phone_number"
//             className="flex-1 outline-none"
//             placeholder="Business Phone number"
//             value={formData.phone_number}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex items-center gap-2 mb-3">
//           <input type="checkbox" id="samePhone" className="w-4 h-4" />
//           <label htmlFor="samePhone" className="text-gray-600 font-semibold">
//             Same as personal phone number
//           </label>
//         </div>

//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Email ID
//         </label>
//         <input
//           type="email"
//           name="business_email_id"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Business email id"
//           value={formData.business_email_id}
//           onChange={handleChange}
//         />

//         <div className="flex items-center gap-2 mb-3">
//           <input type="checkbox" id="sameEmail" className="w-4 h-4" />
//           <label htmlFor="sameEmail" className="text-gray-600 font-semibold">
//             Same as personal email id
//           </label>
//         </div>

//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Establishment Year
//         </label>
//         <input
//           type="number"
//           name="business_establishment_year"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter Business establishment year"
//           value={formData.business_establishment_year}
//           onChange={handleChange}
//         />

//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Description
//         </label>
//         <textarea
//           name="business_description"
//           className="w-full border p-2 rounded-lg"
//           placeholder="Enter your business description"
//           rows="3"
//           value={formData.business_description}
//           onChange={handleChange}
//         ></textarea>

//         <button
//           className={`w-full ${
//             isFormValid
//               ? "bg-[#FE7A3A] hover:bg-[#fe924e]"
//               : "bg-gray-400 cursor-not-allowed"
//           } text-white p-2 rounded-lg mt-4`}
//           onClick={handleNext}
//           disabled={!isFormValid}
//         >
//           Next
//         </button>

//         <ToastContainer position="top-center" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default BasicInfo;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Pencil } from "lucide-react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTimes } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";

// const BasicInfo = () => {
//   const navigate = useNavigate();
//   const [previewImage, setPreviewImage] = useState();
//   const [profileImage, setProfileImage] = useState();
//   const userId = localStorage.getItem("user_id");

//   const [formData, setFormData] = useState({
//     user: userId,
//     profile_pic: "",
//     full_name: "",
//     phone_number: "",
//     business_description: "",
//     business_email_id: "",
//     business_establishment_year: "",
//   });

//   useEffect(() => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     const fetchVendorDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const data = response.data;
//         // console.log("Vendor data:", data);

//         setFormData({
//           user: userId,
//           profile_pic: data.profile_pic || "",
//           full_name: data.full_name || "",
//           phone_number: data.phone_number || "",
//           business_description: data.business_description || "",
//           business_email_id: data.business_email_id || "",
//           business_establishment_year: data.business_establishment_year || "",
//         });

//         if (data.profile_pic) {
//           setProfileImage(data.profile_pic);
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor data", error);
//       }
//     };

//     fetchVendorDetails();
//   }, [userId]);

//   const handleFileChange = async (event) => {
//     if (event.target.files.length === 0) return;

//     const file = event.target.files[0];
//     if (!file) return;

//     const previewURL = URL.createObjectURL(file);
//     setPreviewImage(previewURL);

//     const imageFormData = new FormData();
//     imageFormData.append("file", file);

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadProfileImageAPI/",
//         imageFormData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       const uploadedProfilePic = response.data[0];
//       setProfileImage(uploadedProfilePic);
//       setFormData((prev) => ({ ...prev, profile_pic: uploadedProfilePic }));
//       localStorage.setItem("profile_image_url", uploadedProfilePic);
//       toast.success("Profile image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.warning("Failed to upload image");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     const {
//       full_name,
//       phone_number,
//       business_description,
//       business_email_id,
//       business_establishment_year,
//       profile_pic,
//     } = formData;

//     if (!profile_pic && !previewImage) {
//       toast.warning("Please upload your profile picture");
//       return;
//     }

//     if (!full_name) {
//       toast.warning("Please enter your full name");
//       return;
//     }
//     if (!phone_number) {
//       toast.warning("Please enter your phone number");
//       return;
//     }
//     if (!business_email_id) {
//       toast.warning("Please enter your business email ID");
//       return;
//     }
//     if (!business_establishment_year) {
//       toast.warning("Please enter business establishment year");
//       return;
//     }
//     if (!business_description) {
//       toast.warning("Please enter your business description");
//       return;
//     }

//     localStorage.setItem("vendorData", JSON.stringify(formData));
//     // localStorage.setItem("phone_number", formData.phone_number);
//     navigate("/VendorDocument");
//   };

//   const handleClose = () => {
//     navigate("/PostDeal");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen border-2 bg-[#FE7A3A] to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <button
//           onClick={handleClose}
//           className="absolute top-0 right-2 text-gray-500 hover:text-[#FE7A3A]"
//           type="button"
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         {/* Profile Image Upload */}
//         <div className="flex justify-center mt-4">
//           <div className="relative">
//             {previewImage || profileImage || formData.profile_pic ? (
//               <img
//                 src={previewImage || profileImage || formData.profile_pic}
//                 alt="Profile Preview"
//                 className="w-24 h-24 rounded-full object-cover border-2 border-[#FE7A3A]"
//               />
//             ) : (
//               <p>No image</p>
//             )}
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
//             {/* </label> */}
//           </div>
//         </div>

//         {/* Full Name */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Full Name
//         </label>
//         <input
//           type="text"
//           name="full_name"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter full name"
//           value={formData.full_name}
//           onChange={handleChange}
//         />

//         {/* Phone Number */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Phone Number
//         </label>
//         <div className="flex items-center border p-2 rounded-lg mb-3">
//           <span className="mr-2">🇮🇳 +91</span>
//           <input
//             type="number"
//             name="phone_number"
//             className="flex-1 outline-none"
//             placeholder="Business Phone number"
//             value={formData.phone_number}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex items-center gap-2 mb-3">
//           <input type="checkbox" id="samePhone" className="w-4 h-4" />
//           <label htmlFor="samePhone" className="text-gray-600 font-semibold">
//             Same as personal phone number
//           </label>
//         </div>

//         {/* Business Email ID */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Email ID
//         </label>
//         <input
//           type="email"
//           name="business_email_id"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Business email id"
//           value={formData.business_email_id}
//           onChange={handleChange}
//         />

//         <div className="flex items-center gap-2 mb-3">
//           <input type="checkbox" id="sameEmail" className="w-4 h-4" />
//           <label htmlFor="sameEmail" className="text-gray-600 font-semibold">
//             Same as personal email id
//           </label>
//         </div>

//         {/* Business Establishment Year */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Establishment Year
//         </label>
//         <input
//           type="number"
//           name="business_establishment_year"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter Business establishment year"
//           value={formData.business_establishment_year}
//           onChange={handleChange}
//         />

//         {/* Business Description */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Description
//         </label>
//         <textarea
//           type="text"
//           name="business_description"
//           className="w-full border p-2 rounded-lg"
//           placeholder="Enter your business description"
//           rows="3"
//           value={formData.business_description}
//           onChange={handleChange}
//         ></textarea>

//         {/* Next Button */}
//         <button
//           className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mt-4 hover:bg-[#FE7A3A]"
//           onClick={handleNext}
//         >
//           Next
//         </button>

//         {/* Toast Container */}
//         <ToastContainer position="top-center" autoClose={3000} />
//       </div>
//     </div>
//   );
// };

// export default BasicInfo;
