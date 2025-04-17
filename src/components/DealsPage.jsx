import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.upswap.app/api/deals/lists/")
      .then((response) => {
        setDeals(response.data.deals);
      })
      .catch((error) => {
        console.error("Error fetching deals:", error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-around bg-white py-2">
        <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
          Deals
        </button>
        <button
          className="text-gray-400 px-4 py-2"
          onClick={() => navigate("/Activities")}
        >
          Activities
        </button>
      </div>

      {/* Search */}
      <div className="p-4 flex gap-2">
        <div className="flex-1 bg-white p-2 rounded-lg flex items-center gap-2 shadow">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search title, category, vendor..."
            className="w-full outline-none"
          />
        </div>
        <button className="bg-white p-2 rounded-lg shadow">
          <FaMapMarkerAlt className="text-[#FE7A3A]" />
        </button>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {deals.map((deal) => (
          <div
            key={deal.deal_uuid}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <img
              src={deal.uploaded_images?.[0]}
              alt={deal.deal_title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{deal.deal_title}</h2>
            <p className="text-sm text-gray-600">{deal.select_service}</p>
            <p className="text-sm mt-1">
              Location: {deal.location_city}, {deal.location_state}
            </p>
            <p className="mt-2">
              <span className="line-through text-red-500">
                ₹{deal.actual_price}
              </span>{" "}
              <span className="text-green-600 font-bold">
                ₹{deal.deal_price}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Discount: {deal.discount_percentage}%
            </p>
            {deal.buy_now && (
              <button className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]">
                Buy Now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
        onClick={() => navigate("/PostDeal")}
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
};

export default DealsList;
