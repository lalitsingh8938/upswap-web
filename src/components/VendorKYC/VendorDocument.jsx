import React, { useState } from "react";
import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorDocument = () => {
  const navigate = useNavigate();
  const [businessDescription, setBusinessDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [businessDocs, setBusinessDocs] = useState([]);
  const [businessPhotos, setBusinessPhotos] = useState([]);

  // Upload Document
  const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(
        "https://api.upswap.app/api/UploadDocumentsAPI/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return URL.createObjectURL(file);
    } catch (error) {
      console.error("Document upload failed:", error);
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
      await axios.post(
        "https://api.upswap.app/api/UploadImagesAPI/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return URL.createObjectURL(file);
    } catch (error) {
      console.error("Photo upload failed:", error);
      alert("Failed to upload photo");
      return null;
    }
  };

  // Handle Document Upload
  const handleDocChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedDocs = await Promise.all(files.map(uploadDocument));
    setBusinessDocs((prevDocs) => [
      ...prevDocs,
      ...uploadedDocs.filter(Boolean),
    ]);
  };

  // Handle Photo Upload
  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedPhotos = await Promise.all(files.map(uploadPhoto));
    setBusinessPhotos((prevPhotos) => [
      ...prevPhotos,
      ...uploadedPhotos.filter(Boolean),
    ]);
  };

  // Remove Document
  const removeDocument = (index) => {
    setBusinessDocs((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };

  // Remove Photo
  const removePhoto = (index) => {
    setBusinessPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    localStorage.setItem("business_description", businessDescription);
    // localStorage.setItem("bank_account_number", accountNumber);
    navigate("/BankDetails");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
          Become a Vendor
        </h2>

        <label className="block text-gray-700 mb-1 mt-2 font-semibold">
          Business Description
        </label>
        <textarea
          className="w-full border p-2 rounded-lg mb-4 text-gray-600"
          placeholder="Enter your business description"
          rows="3"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
        ></textarea>

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

        {/* <button className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-2 rounded-lg mt-4">
          <FaPlus /> Add Address
        </button>

        <h3 className="text-gray-700 mt-4 mb-2 font-semibold">Bank Details</h3>
        <label className="block text-gray-700 mb-1 font-semibold">
          Account Number
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg text-gray-600"
          placeholder="Enter bank account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        /> */}

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigate("/BasicInfo")}
          >
            Back
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
  );
};

export default VendorDocument;
