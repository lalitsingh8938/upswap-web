import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddAddress = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    house_no_building_name: "",
    road_name_area_colony: "",
    state: "",
    city: "",
    pincode: "",
    country: "",
  });

  useEffect(() => {
    const storedCountry = localStorage.getItem("country");
    if (storedCountry) {
      setFormData((prev) => ({ ...prev, country: storedCountry }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save to localStorage when user clicks "Add Address"
  const handleAddAddress = () => {
    localStorage.setItem("address", JSON.stringify(formData));
  };

  // ✅ Navigate to next page
  const handleNext = () => {
    navigate("/BankDetails");
    if (onClose) onClose();
  };

  const handleClose = () => {
    navigate("/VendorDocument");
    if (onClose) onClose();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Address Info</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800 absolute top-4 right-4"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Input Fields */}
        <input
          type="text"
          name="house_no_building_name"
          value={formData.house_no_building_name}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter house no., building name"
        />

        <input
          type="text"
          name="road_name_area_colony"
          value={formData.road_name_area_colony}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter road name, area, colony"
        />

        <input
          type="text"
          name="country"
          value={formData.country}
          readOnly
          className="w-full border p-2 rounded-lg mb-3 bg-gray-100 cursor-not-allowed"
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3 bg-white"
        >
          <option value="">State</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Delhi">Delhi</option>
          <option value="Karnataka">Karnataka</option>
        </select>

        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3 bg-white"
        >
          <option value="">City</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Delhi">Delhi</option>
        </select>

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter pincode"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={handleAddAddress}
          >
            Add Address
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

export default AddAddress;
