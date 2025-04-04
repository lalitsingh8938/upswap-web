// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { Pencil } from "lucide-react";

// const BasicInfo = () => {
//   const navigate = useNavigate(); // Initialize navigate
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         {/* Profile Image */}
//         <div className="flex justify-center mt-4">
//           <div className="relative">
//             <img
//               src="bhagwan.jpg"
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-4 border-orange-400"
//             />

//             <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer">
//               <Pencil size={16} />
//             </label>
//           </div>
//         </div>

//         {/* Full Name */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Full Name
//         </label>
//         <input
//           type="text"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter full name"
//         />

//         {/* Phone Number */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Phone Number
//         </label>
//         <div className="flex items-center border p-2 rounded-lg mb-3">
//           <span className="mr-2">🇮🇳 +91</span>
//           <input
//             type="text"
//             className="flex-1 outline-none"
//             placeholder="Business Phone number"
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
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Business email id"
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
//           type="text"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter Business establishment year"
//         />

//         {/* Business Description */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Description
//         </label>
//         <textarea
//           className="w-full border p-2 rounded-lg"
//           placeholder="Enter your business description"
//           rows="3"
//         ></textarea>

//         <button
//           className="w-full bg-orange-500 text-white p-2 rounded-lg mt-4 hover:bg-orange-600"
//           onClick={() => navigate("/VendorDocument")}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BasicInfo;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import axios from "axios";

const BasicInfo = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState();
  const [profileImage, setProfileImage] = useState();

  // ✅ Get user ID from localStorage
  const userId = localStorage.getItem("user_id");

  // ✅ Initialize form data with user ID
  const [formData, setFormData] = useState({
    user: userId,
    full_name: "",
    phone_number: "",
    business_description: "",
    business_email_id: "",
    business_establishment_year: "",
  });

  // ✅ File change handler
  const handleFileChange = async (event) => {
    if (event.target.files.length === 0) return;

    const file = event.target.files[0];
    if (!file) return;

    if (previewImage && previewImage.name === file.name) return;

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

      console.log("Uploaded Image URL:", response.data.profile_pic);
      setProfileImage(response.data.profile_pic);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    }
  };

  // ✅ Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save and navigate
  const handleNext = () => {
    localStorage.setItem("vendorData", JSON.stringify(formData));
    navigate("/VendorDocument");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
          Become a Vendor
        </h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center mt-4">
          <div className="relative">
            <img
              src={profileImage || previewImage || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-orange-400 object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer">
              <Pencil size={16} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
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
            type="text"
            name="phone_number"
            className="flex-1 outline-none"
            placeholder="Business Phone number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <input type="checkbox" id="samePhone" className="w-4 h-4" />
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
          <input type="checkbox" id="sameEmail" className="w-4 h-4" />
          <label htmlFor="sameEmail" className="text-gray-600 font-semibold">
            Same as personal email id
          </label>
        </div>

        {/* Business Establishment Year */}
        <label className="block text-gray-700 mb-1 font-semibold">
          Business Establishment Year
        </label>
        <input
          type="text"
          name="business_establishment_year"
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter Business establishment year"
          value={formData.business_establishment_year}
          onChange={handleChange}
        />

        {/* Business Description */}
        <label className="block text-gray-700 mb-1 font-semibold">
          Business Description
        </label>
        <textarea
          name="business_description"
          className="w-full border p-2 rounded-lg"
          placeholder="Enter your business description"
          rows="3"
          value={formData.business_description}
          onChange={handleChange}
        ></textarea>

        {/* Next Button */}
        <button
          className="w-full bg-orange-500 text-white p-2 rounded-lg mt-4 hover:bg-orange-600"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicInfo;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Pencil } from "lucide-react";
// import axios from "axios";

// const BasicInfo = () => {
//   const navigate = useNavigate();
//   const [profileImage, setProfileImage] = useState("");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phoneNumber: "",
//     businessEmail: "",
//     businessYear: "",
//     businessDescription: "",
//   });

//   // Handle File Change and Auto Upload
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Show image preview
//     const previewURL = URL.createObjectURL(file);
//     setProfileImage(previewURL);

//     // Upload to API
//     const formData = new FormData();
//     formData.append("profile_image", file);

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadProfileImageAPI/",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setProfileImage(response.data.imageUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Failed to upload image");
//     }
//   };

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Save Data and Navigate
//   const handleNext = () => {
//     localStorage.setItem("vendorData", JSON.stringify(formData));
//     navigate("/VendorDocument");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         {/* Profile Image Upload */}
//         <div className="flex justify-center mt-4">
//           <div className="relative">
//             <img
//               src={profileImage}
//               alt="Profile"
//               className="w-24 h-24 rounded-full border-4 border-orange-400"
//             />
//             <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer">
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

//         {/* Upload Button */}
//         {/* <button
//           className="w-full bg-blue-500 text-white p-2 rounded-lg mt-2 hover:bg-blue-600"
//           onClick={uploadImage}
//         >
//           Upload Image
//         </button> */}

//         {/* Full Name */}
//         <label className="block text-gray-700 mb-1 font-semibold">Full Name</label>
//         <input
//           type="text"
//           name="fullName"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter full name"
//           value={formData.fullName}
//           onChange={handleChange}
//         />

//         {/* Phone Number */}
//         <label className="block text-gray-700 mb-1 font-semibold">Phone Number</label>
//         <div className="flex items-center border p-2 rounded-lg mb-3">
//           <span className="mr-2">🇮🇳 +91</span>
//           <input
//             type="text"
//             name="phoneNumber"
//             className="flex-1 outline-none"
//             placeholder="Business Phone number"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Business Email ID */}
//         <label className="block text-gray-700 mb-1 font-semibold">Business Email ID</label>
//         <input
//           type="email"
//           name="businessEmail"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Business email id"
//           value={formData.businessEmail}
//           onChange={handleChange}
//         />

//         {/* Business Establishment Year */}
//         <label className="block text-gray-700 mb-1 font-semibold">
//           Business Establishment Year
//         </label>
//         <input
//           type="text"
//           name="businessYear"
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter Business establishment year"
//           value={formData.businessYear}
//           onChange={handleChange}
//         />

//         {/* Business Description */}
//         <label className="block text-gray-700 mb-1 font-semibold">Business Description</label>
//         <textarea
//           name="businessDescription"
//           className="w-full border p-2 rounded-lg"
//           placeholder="Enter your business description"
//           rows="3"
//           value={formData.businessDescription}
//           onChange={handleChange}
//         ></textarea>

//         {/* Next Button */}
//         <button
//           className="w-full bg-orange-500 text-white p-2 rounded-lg mt-4 hover:bg-orange-600"
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BasicInfo;
