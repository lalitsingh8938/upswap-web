import React, { useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VendorForm = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [businessHours, setBusinessHours] = useState([
    { day: "Sunday", time: "11:00 AM - 7:00 PM", active: true },
    { day: "Monday", time: "10:00 AM - 8:00 PM", active: true },
    { day: "Tuesday", time: "10:00 AM - 8:00 PM", active: true },
    { day: "Wednesday", time: "10:00 AM - 8:00 PM", active: true },
    { day: "Thursday", time: "10:00 AM - 8:00 PM", active: true },
    { day: "Friday", time: "10:00 AM - 8:00 PM", active: true },
    { day: "Saturday", time: "10:00 AM - 8:00 PM", active: true },
  ]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-500 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
          Become a Vendor
        </h2>

        {/* Add Services Section */}
        <button className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-3 rounded-lg my-4">
          <FaPlus /> Add services provided by your business
        </button>

        {/* Business Hours Section */}
        <div className="bg-orange-500 text-white p-3 rounded-t-lg text-lg font-semibold flex justify-between">
          Choose Business Hours <span className="cursor-pointer">▼</span>
        </div>
        <div className="bg-white border border-orange-400 rounded-b-lg p-3">
          {businessHours.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-0"
            >
              <span className="text-gray-700 font-medium">{item.day}</span>
              <span className="text-gray-600">{item.time}</span>
              <FaPen className="text-gray-500 cursor-pointer" />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={item.active}
                  readOnly
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-orange-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
              </label>
            </div>
          ))}
        </div>

        {/* Extra Checkbox */}
        <div className="flex items-center gap-2 my-4">
          <input
            type="checkbox"
            className="w-5 h-5 border border-orange-500 rounded-md"
          />
          <span className="text-gray-600">
            Share a few details to enhance your Upswap experience
          </span>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigate("/BankDetails")} // Replace with actual previous page route
          >
            Back
          </button>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            onClick={() => navigate("/ServiceTime")} // Replace with actual next page route
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
