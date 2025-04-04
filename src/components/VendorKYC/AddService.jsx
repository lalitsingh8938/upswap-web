import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  // Save to localStorage when "Add Service" (bottom-left) is clicked
  const handleAddService = () => {
    localStorage.setItem("serviceData", JSON.stringify(formData));
  };

  // When "Next" (bottom-right) is clicked, you can navigate or call next step
  const handleNext = () => {
    navigate("/ServiceTime"); // replace with your actual next route
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/BankDetails");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* Cross Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
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
          type="text"
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
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Add Service
          </button>
          <button
            onClick={handleNext}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddService;
