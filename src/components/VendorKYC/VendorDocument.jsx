import React, { useState } from "react";
import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorDocument = () => {
  const navigate = useNavigate();

  const [businessDocs, setBusinessDocs] = useState([]);
  const [businessPhotos, setBusinessPhotos] = useState([]);

  // Upload Document
  const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "https://api.upswap.app/api/UploadDocumentsAPI/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const fileUrl = response.data; // ?.[0]

      localStorage.setItem(
        "uploaded_business_documents1",
        JSON.stringify(fileUrl)
      );
      return fileUrl;
    } catch (error) {
      alert("Failed to upload document");
      return null;
    }
  };

  // Upload Photo
  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("images", file);
    formData.append("model_name", "RaiseAnIssueCustomUser");
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

      const imageUrl = response.data?.data; // ✅ nested path .[0]?.compressed;

      localStorage.setItem("uploaded_images1", JSON.stringify(imageUrl));
      return imageUrl;
    } catch (error) {
      // console.error("Photo upload failed:", error);
      toast.error("Failed to upload photo");
      return null;
    }
  };

  // Handle Document Upload
  const handleDocChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedDocs = await Promise.all(files.map(uploadDocument));
    const newDocs = [...businessDocs, ...uploadedDocs.filter(Boolean)];
    setBusinessDocs(newDocs);
  };

  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedPhotos = await Promise.all(files.map(uploadPhoto));
    const newPhotos = [
      ...businessPhotos,
      ...uploadedPhotos.flat().filter(Boolean),
    ];

    setBusinessPhotos(newPhotos);
  };

  // Remove Document
  const removeDocument = (index) => {
    setBusinessDocs((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };

  // Remove Photo
  const removePhoto = (index) => {
    setBusinessPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    navigate("/BasicInfo");
  };

  const handleNext = () => {
    if (businessDocs.length === 0) {
      toast.error("Please upload at least one document.");
      return;
    }

    if (businessPhotos.length === 0) {
      toast.error("Please upload at least one business photo.");
      return;
    }

    const addressAdded = localStorage.getItem("address_added") === "true";
    if (!addressAdded) {
      toast.error("Please add your address before proceeding.");
      return;
    }

    // All checks passed
    navigate("/BankDetails");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="relative bg-white rounded-xl w-full max-w-md">
        <ToastContainer position="top-center" autoClose={3000} />

        {/* Top-right Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
            Become a Vendor
          </h2>

          {/* Document Upload */}
          <h3 className="text-gray-700 mb-2 font-semibold">
            Upload Business Documents
          </h3>
          <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
            <FaUpload className="text-orange-500 text-2xl" />
            <span className="text-orange-500 mt-2 text-sm">Upload</span>
            <input
              type="file"
              accept="application/pdf,image/*"
              multiple
              onChange={handleDocChange}
              hidden
            />
          </label>
          {businessDocs.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
            >
              <span className="text-gray-600">Document {index + 1}</span>
              <button
                onClick={() => removeDocument(index)}
                className="text-red-500"
              >
                <FaTimes />
              </button>
            </div>
          ))}

          {/* Photo Upload */}
          <h3 className="text-gray-700 mb-2 font-semibold">
            Upload Business Photos
          </h3>
          <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
            <FaUpload className="text-orange-500 text-2xl" />
            <span className="text-orange-500 mt-2 text-sm">Upload</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              hidden
            />
          </label>

          {/* Photo Preview */}
          {businessPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {businessPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={photo}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Address */}
          <button
            className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-2 rounded-lg mt-4"
            onClick={() => navigate("/AddAddress")}
          >
            <FaPlus /> Add Address
          </button>

          {/* Footer Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              onClick={() => {
                if (businessDocs.length === 0) {
                  toast.warn(
                    "Please upload at least one document before saving."
                  );
                  return;
                }

                if (businessPhotos.length === 0) {
                  toast.warn(
                    "Please upload at least one business photo before saving."
                  );
                  return;
                }

                toast.success("Data saved locally!");
              }}
            >
              Save Data
            </button>

            <button
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDocument;
