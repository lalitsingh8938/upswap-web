import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasicInfo = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState();
  const [profileImage, setProfileImage] = useState();

  const userId = localStorage.getItem("user_id");

  const [formData, setFormData] = useState({
    user: userId,
    full_name: "",
    phone_number: "",
    business_description: "",
    business_email_id: "",
    business_establishment_year: "",
  });

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

      const uploadedProfilePic = response.data[0];
      setProfileImage(uploadedProfilePic);
      localStorage.setItem("profile_image_url", uploadedProfilePic);
      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.warning("Failed to upload image");
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

    if (!profileImage && !previewImage) {
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
    localStorage.setItem(phone_number, formData.phone_number);
    navigate("/VendorDocument");
  };

  return (
    <div className="flex justify-center items-center min-h-screen border-2 bg-[#FE7A3A] to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
          Become a Vendor
        </h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center mt-4">
          <div className="relative">
            <img
              src={profileImage || previewImage || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-[#FE7A3A] object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-[#FE7A3A] text-white p-1 rounded-full cursor-pointer">
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
            type="number"
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
          type="number"
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
