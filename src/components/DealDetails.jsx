import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";

const DealDetails = () => {
  const { deal_uuid } = useParams();
  const [dealDetails, setDealDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!deal_uuid) return;

    axios
      .get(`https://api.upswap.app/api/deals/details/${deal_uuid}`)
      .then((response) => {
        setDealDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching deal details:", error);
      });
  }, [deal_uuid]);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setIsImageModalOpen(true);
  };

  if (!dealDetails) {
    return (
      <span className="flex justify-center items-center gap-2">
        <LuLoader className="animate-spin" />
        Please wait...
      </span>
    );
  }

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
        >
          <FaLeftLong className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-center flex-1">
          Deal Description
        </h2>
        <div className="w-14" /> {/* Placeholder to keep title centered */}
      </div>

      {/* Title and vendor */}
      <div className="p-4">
        <h1 className="text-xl font-bold">{dealDetails.deal_title}</h1>
        <p className="text-sm text-gray-600">
          Posted by:{" "}
          <span className="text-orange-500 font-medium">
            {dealDetails.vendor_name}
          </span>
        </p>
        <p className="text-sm text-red-500 mt-1">
          📍 {dealDetails.location_city}, {dealDetails.location_state}
        </p>
      </div>

      {/* Images preview */}
      <div className="relative mx-4 flex gap-2 flex-wrap justify-center">
        {/* {dealDetails.uploaded_images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Deal Image ${index + 1}`}
            onClick={() => handleImageClick(img)}
            className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
          />
        ))} */}
        {dealDetails.uploaded_images?.map((img, index) => (
          <img
            key={index}
            src={img}
            // src={img || img || "/default-avatar.png"}
            alt={`Detail of deal ${index + 1}`} // Changed this line
            onClick={() => handleImageClick(img)}
            className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
          />
        ))}

        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {dealDetails.available_deals} DEALS REMAINING
        </div>
      </div>

      {/* Description */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 mt-4">Deal Description</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {dealDetails.deal_description}
        </p>
      </div>

      {/* Price and quantity input */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
        <div>
          <p className="text-sm line-through text-gray-400">
            ₹ {dealDetails.actual_price}
          </p>
          <p className="text-xl font-bold text-black">
            ₹ {dealDetails.deal_price}{" "}
            <span className="text-sm text-green-600">
              -{dealDetails.discount_percentage}%
            </span>
          </p>
        </div>

        {/* Quantity Editable Input */}
        <div className="flex items-center border border-gray-300 rounded-full px-2 py-1 bg-white shadow-sm">
          <button
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            className="text-orange-500 text-xl font-bold px-3"
          >
            –
          </button>

          <input
            type="text"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val >= 1) setQuantity(val);
            }}
            className="w-10 text-center outline-none border-none bg-transparent text-base font-medium"
          />

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="text-orange-500 text-xl font-bold px-3"
          >
            +
          </button>
        </div>
      </div>

      {/* Buy Now button */}
      <div className="p-4">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md">
          Buy now
        </button>
      </div>

      {/* Fullscreen image preview modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 rounded-lg"
          onClick={() => setIsImageModalOpen(false)}
        >
          {/* <img
            src={selectedImage}
            alt="Preview"
            className="w-1/2 h-1/ rounded-lg shadow-lg"
          /> */}
          <img
            src={selectedImage}
            alt="Preview"
            className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default DealDetails;
