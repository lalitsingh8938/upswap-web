import React from "react";
import { FaUpload, FaCamera, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigat

const VendorDocument = () => {
  //   const [phone, setPhone] = useState("+91");
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
          Become a Vendor
        </h2>

        {/* Business Description */}
        <label className="block text-gray-700 mb-1 mt-2 font-semibold">Business Description</label>

        <textarea
          className="w-full border p-2 rounded-lg mb-4 text-gray-600"
          placeholder="Enter your business description"
          rows="3"
        ></textarea>

        {/* Upload Business Documents */}
        <h3 className="text-gray-700 mb-2 font-semibold">
          Upload Business related documents
        </h3>
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-1/2 rounded-lg">
            <FaUpload className="text-orange-500 text-2xl" />
            <button className="text-orange-500 mt-2 text-sm">
              Upload Picture
            </button>
          </div>
          <div className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-1/2 rounded-lg">
            <FaCamera className="text-orange-500 text-2xl" />
            <button className="text-orange-500 mt-2 text-sm">
              Take Picture
            </button>
          </div>
        </div>

        {/* Upload Business Photos */}
        <h3 className="text-gray-700 mb-2 font-semibold">Upload Business related photos</h3>
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-1/2 rounded-lg">
            <FaUpload className="text-orange-500 text-2xl" />
            <button className="text-orange-500 mt-2 text-sm">
              Upload Picture
            </button>
          </div>
          <div className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-1/2 rounded-lg">
            <FaCamera className="text-orange-500 text-2xl" />
            <button className="text-orange-500 mt-2 text-sm">
              Take Picture
            </button>
          </div>
        </div>

        {/* Add Address Button */}
        <button className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-2 rounded-lg mb-4">
          <FaPlus /> Add Address
        </button>

        {/* Bank Details */}
        <h3 className="text-gray-700 mb-2 font-semibold">Bank Details</h3>
        <label className="block text-gray-700 mb-1 font-semibold">Account Number</label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg text-gray-600"
          placeholder="Enter bank account number"
        />

        {/* Next Button */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigate("/BasicInfo")} // Replace with actual previous page route
          >
            Back
          </button>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            onClick={() => navigate("/BankDetails")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDocument;
