import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const VendorKYC = () => {
  const navigate = useNavigate(); // Initialize navigate
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
          Become a Vendor
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mt-4">
          <div className="relative">
            <img
              src="bhagwan.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-orange-400"
            />
            <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer">
              📷
            </label>
          </div>
        </div>

        {/* Full Name */}
        <label className="block text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter full name"
        />

        {/* Phone Number */}
        <label className="block text-gray-700 mb-1">Phone Number</label>
        <div className="flex items-center border p-2 rounded-lg mb-3">
          <span className="mr-2">🇮🇳 +91</span>
          <input
            type="text"
            className="flex-1 outline-none"
            placeholder="Business Phone number"
          />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <input type="checkbox" id="samePhone" className="w-4 h-4" />
          <label htmlFor="samePhone" className="text-gray-600">
            Same as personal phone number
          </label>
        </div>

        {/* Business Email ID */}
        <label className="block text-gray-700 mb-1">Business Email ID</label>
        <input
          type="email"
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Business email id"
        />
        <div className="flex items-center gap-2 mb-3">
          <input type="checkbox" id="sameEmail" className="w-4 h-4" />
          <label htmlFor="sameEmail" className="text-gray-600">
            Same as personal email id
          </label>
        </div>

        {/* Business Establishment Year */}
        <label className="block text-gray-700 mb-1">
          Business Establishment Year
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter Business establishment year"
        />

        {/* Business Description */}
        <label className="block text-gray-700 mb-1">Business description</label>
        <textarea
          className="w-full border p-2 rounded-lg"
          placeholder="Enter your business description"
          rows="3"
        ></textarea>

        <button
          className="w-full bg-orange-500 text-white p-2 rounded-lg mt-4 hover:bg-orange-600"
          onClick={() => navigate("/VendorDocument")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VendorKYC;
