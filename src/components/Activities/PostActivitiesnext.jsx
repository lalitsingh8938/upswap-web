import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaTimes, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PostActivitiesnext = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    latitude: "",
    longitude: "",
    participation: true,
    infiniteTime: false,
    startNow: true,
    endTime: "",
    participants: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData((prev) => ({
        ...prev,
        title: savedData.title || "",
        description: savedData.description || "",
        category: savedData.category || "",
        location: savedData.location || "",
        latitude: savedData.latitude || "",
        longitude: savedData.longitude || "",
      }));
    }
  }, []);

  const handleToggle = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            // "Content-Type": "multipart/form-data",
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

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const newUploadedImages = [];
    const newPreviewImages = [];

    for (const file of files) {
      const preview = URL.createObjectURL(file);
      newPreviewImages.push(preview);

      const uploadedImage = await uploadImage(file);
      if (uploadedImage) {
        newUploadedImages.push(uploadedImage);
      }
    }

    setUploadedImages((prev) => [...prev, ...newUploadedImages]);
    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        activity_title: formData.title,
        activity_description: formData.description,
        activity_category: formData.category,
        user_participation: formData.participation,
        maximum_participants: formData.participants,
        infinite_time: formData.infiniteTime,
        set_current_datetime: formData.startNow,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        uploaded_images: uploadedImages,
      };

      if (!formData.infiniteTime && formData.endTime) {
        const [date, time] = formData.endTime.split("T");
        payload.end_date = date;
        payload.end_time = time;
      }

      const res = await axios.post(
        "https://api.upswap.app/api/activities/create/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      localStorage.removeItem("formData");
      toast.success("Activity created successfully!");
      navigate("/ActivitiesPage");
      console.log("Activity created:", res.data);
    } catch (error) {
      console.error("Error posting activity:", error);
      toast.error(error.response?.data?.message || "Failed to post activity.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    navigate("/PostActivities");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center min-h-screen bg-[#FE7A3A] rounded-lg border-2">
        <div className="bg-gradient-to-b from-orange-100 to-white rounded-xl p-6 shadow-md max-w-md w-full">
          <div className="relative">
            <div className="relative mb-4">
              <button
                onClick={handleClose}
                className="absolute -top-6 -right-5 bg-white text-[#FE7A3A] p-1 shadow hover:bg-gray-100 rounded-full"
                type="button"
              >
                <FaTimes size={16} />
              </button>

              <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
                Post an Activity
              </h2>
            </div>
          </div>

          <h3 className="text-gray-700 mb-2 font-semibold">
            Upload Business Photos (JPEG, PNG, Webp, etc)
          </h3>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#FE7A3A] p-4 rounded-lg cursor-pointer mb-4">
            <FaUpload className="text-[#FE7A3A] text-2xl" />
            <span className="text-[#FE7A3A] mt-2 text-sm">
              {uploading ? "Uploading..." : "Upload Activity Images"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>

          {previewImages.length > 0 && (
            <div className="mb-6 grid grid-cols-3 gap-4">
              {previewImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-24 rounded overflow-hidden border"
                >
                  <img
                    src={img}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-opacity-80"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4 mb-4">
            <ToggleSwitch
              label="Users Participation"
              checked={formData.participation}
              onToggle={() => handleToggle("participation")}
            />
            <ToggleSwitch
              label="Infinite Time"
              checked={formData.infiniteTime}
              onToggle={() => handleToggle("infiniteTime")}
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={formData.startNow}
              onChange={() => handleToggle("startNow")}
              className="form-checkbox h-4 w-4 text-[#FE7A3A] transition duration-150 ease-in-out mr-2"
            />
            <span className="text-sm font-medium">Start now</span>
          </div>

          {!formData.infiniteTime && (
            <div className="mb-4">
              <h3 className="text-gray-700 mb-2 font-semibold">End Time</h3>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          )}

          <div className="mb-6">
            <input
              type="number"
              name="participants"
              value={formData.participants}
              onChange={handleInputChange}
              placeholder="Enter maximum number of participants"
              min="1"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-[#FE7A3A] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center ${
              submitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

const ToggleSwitch = ({ label, checked, onToggle }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium">{label}</span>
    <button
      type="button"
      onClick={onToggle}
      className={`w-12 h-6 rounded-full p-1 transition-colors ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

export default PostActivitiesnext;
