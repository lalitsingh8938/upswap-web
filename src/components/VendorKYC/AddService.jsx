import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddService = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    item_name: "",
    service_category: "",
    item_description: "",
    item_price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save to localStorage
  const handleAddService = () => {
    localStorage.setItem("serviceData", JSON.stringify(formData));
    toast.success("Service saved successfully!");
  };

  // Validation before navigating
  const handleNext = () => {
    const { item_name, service_category, item_description, item_price } =
      formData;

    if (
      !item_name.trim() ||
      !service_category.trim() ||
      !item_description.trim() ||
      !item_price.trim()
    ) {
      toast.warn("Please fill all fields before proceeding.");
      return;
    }

    // All fields filled: save and navigate
    localStorage.setItem("serviceData", JSON.stringify(formData));
    navigate("/ServiceTime");
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/BankDetails");
    }
  };

  return (
    <div className="flex justify-center items-center border-2 min-h-screen bg-[#FE7A3A] to-white p-4 rounded-lg">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* ❌ Cross Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-[#FE7A3A]"
        >
          <FaTimes size={20} />
        </button>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Service</h2>
        </div>

        {/* Input Fields */}
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Item name"
        />

        <select
          name="service_category"
          value={formData.service_category}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3 bg-white"
        >
          <option value="">Choose Item Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>

        <textarea
          name="item_description"
          value={formData.item_description}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Item description"
          rows="3"
        ></textarea>

        <input
          type="number"
          name="item_price"
          value={formData.item_price}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="₹ Item price"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleAddService}
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
          >
            Add Service
          </button>
          <button
            onClick={handleNext}
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddService;
