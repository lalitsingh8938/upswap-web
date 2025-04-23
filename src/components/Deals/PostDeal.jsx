import React, { useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostDeal = () => {
  const [dealTitle, setDealTitle] = useState("");
  const [dealDescription, setDealDescription] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("images", file);
    formData.append("model_name", "CreateDeal");

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/UploadImagesAPI/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      const data = response.data;

      if (
        response.status === 201 &&
        data?.data?.[0]?.thumbnail &&
        data?.data?.[0]?.compressed
      ) {
        toast.success("Image uploaded successfully!");
        return {
          thumbnail: data.data[0].thumbnail,
          compressed: data.data[0].compressed,
        };
      } else {
        toast.error("Image upload failed.");
        return null;
      }
    } catch (err) {
      toast.error("Something went wrong while uploading.");
      return null;
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];
    const previewArray = [];

    setIsUploading(true);

    for (const file of files) {
      const urls = await uploadImage(file);
      if (urls) {
        uploadedUrls.push(urls);
        previewArray.push(URL.createObjectURL(file));
      }
    }

    const updatedUrls = [...imageUrls, ...uploadedUrls];
    const updatedPreviews = [...imagePreviews, ...previewArray];

    setImageUrls(updatedUrls);
    setImagePreviews(updatedPreviews);

    localStorage.setItem("uploaded_deal_images", JSON.stringify(updatedUrls));

    setIsUploading(false);
  };

  const removePhoto = (index) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageUrls(updatedUrls);
    setImagePreviews(updatedPreviews);

    localStorage.setItem("uploaded_deal_images", JSON.stringify(updatedUrls));
  };

  const handleNext = () => {
    if (!dealTitle.trim()) {
      toast.error("Please enter a deal title.");
      return;
    }

    if (!dealDescription.trim()) {
      toast.error("Please enter a deal description.");
      return;
    }

    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image before proceeding.");
      return;
    }

    localStorage.setItem("deal_title", dealTitle);
    localStorage.setItem("deal_description", dealDescription);
    localStorage.setItem("deal_service", selectedService);

    navigate("/PostDealNext");
  };

  const handleClose = () => {
    navigate("/DealsPage", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FE7A3A] p-6 border-2 rounded-lg">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="relative bg-gradient-to-b from-orange-100 to-white rounded-xl p-6 shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
          Post a Deal
        </h2>

        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#FE7A3A]"
          type="button"
        >
          <FaTimes size={20} />
        </button>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Deal title
          </label>
          <input
            type="text"
            value={dealTitle}
            onChange={(e) => setDealTitle(e.target.value)}
            placeholder="Deal title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <select
          name="service_category"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full border p-2 rounded-lg mb-4 bg-white"
        >
          <option value="">Choose Item Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Consultants">Consultants</option>
          <option value="Estate Agents">Estate Agents</option>
          <option value="Rent & Hire">Rent & Hire</option>
          <option value="Dentist">Dentist</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Food">Food</option>
          <option value="Bakery">Bakery</option>
          <option value="Groceries">Groceries</option>
          <option value="Others">Others</option>
        </select>

        {/* Deal Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Deal description
          </label>
          <textarea
            value={dealDescription}
            onChange={(e) => setDealDescription(e.target.value)}
            placeholder="Enter description"
            rows="4"
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Upload Image */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#FE7A3A] p-4 rounded-lg cursor-pointer">
          <FaUpload className="text-[#FE7A3A] text-2xl" />
          <span className="text-[#FE7A3A] mt-2 text-sm">
            {isUploading ? "Uploading..." : "Upload Deal Images"}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>

        {imagePreviews.length > 0 && (
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-3 gap-8">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 flex justify-center items-center"
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-0 right-0 bg-white p-1 rounded-full shadow text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <button
          className="mt-6 w-full bg-[#FE7A3A] text-white py-2 rounded-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostDeal;
