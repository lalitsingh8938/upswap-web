import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";

const PostDeal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-400 to-orange-500 p-4 rounded-lg">
      <div className="relative bg-white rounded-xl p-6 shadow-md max-w-md w-full">
        {/* Cross Button */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-orange-500">
          <FaTimes size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg mb-4">
          Become a Vendor
        </h2>

        {/* Deal Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Deal title
          </label>
          <input
            type="text"
            placeholder="Deal title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Deal Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Deal description
          </label>
          <textarea
            placeholder="Enter description"
            rows="4"
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Select Service */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Select Service
          </label>
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option>Select Service</option>
            <option>Service 1</option>
            <option>Service 2</option>
          </select>
        </div>

        {/* Upload or Take Picture */}
        <div className="flex items-center justify-center gap-2 border-t pt-4">
          <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
            <FaUpload className="text-orange-500 text-2xl" />
            <span className="text-orange-500 mt-2 text-sm">Upload</span>
            <input
              type="file"
              accept="application/pdf,image/*"
              multiple
              //  onChange={handleDocChange}
              hidden
            />
          </label>
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDeal;
