import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountDownTimer";
import { loadRazorpay } from "../utils/loadRazorpay"; // 👈 Add this
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true); // 🌀 Initially true
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true); // Start loader
    axios
      .get("https://api.upswap.app/api/deals/lists/")
      .then((response) => {
        // console.log("DEALS RESPONSE 👉", response.data.deals); // 👈 ADD THIS LINE
        setDeals(response.data.deals);
        setLoading(false); // Stop loader
      })
      .catch((error) => {
        console.error("Error fetching deals:", error);
        setLoading(false); // Even on error, stop loader
      });
  }, []);

  const handleDealClick = (dealId) => {
    // Navigate to the DealDetailsPage with the deal_uuid
    navigate(`/DealDetails/${dealId}`);
  };
  const handleBuyNow = async (deal) => {
    const res = await loadRazorpay();

    if (!res) {
      toast.warn("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const storedPhoneNumber = localStorage.getItem("phone_number");

    const options = {
      key: "rzp_live_vChMTg5Zq6WCJI", // Replace with your live/test key
      amount: deal.deal_price * 100, // in paise
      currency: "INR",
      name: "Upswap Deals",
      description: deal.deal_title,
      image: "/logo.png", // optional
      handler: function (response) {
        // ✅ Success callback
        toast.success("✅ Payment Successful!");
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);

        // ✅ You can now show confirmation or store details in localStorage

        const phone = localStorage.getItem("phone_number");
        console.log("Phone used for payment:", phone);
      },

      prefill: {
        name: "Customer Name",
        email: "user@example.com",
        contact: storedPhoneNumber,
      },
      theme: {
        color: "#FE7A3A",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 cursor-pointer">
          {deals.map((deal) => (
            <div
              key={deal.deal_uuid}
              className="border rounded-lg p-4 shadow-md bg-white cursor"
              onClick={() => handleDealClick(deal.deal_uuid)}
            >
              <div className="relative">
                <img
                  src={deal.uploaded_images?.[0]}
                  alt={deal.deal_title}
                  className="w-full h-48 object-cover rounded-md"
                />

                <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                  LIVE
                </div>
              </div>

              <h2 className="text-lg font-semibold mt-2">{deal.deal_title}</h2>
              <p className="text-sm text-gray-600">{deal.select_service}</p>
              <p className="text-sm mt-1 flex gap-2">
                <span className="font-medium">Location:</span>
                <span>
                  {deal.location_city}, {deal.location_state}
                </span>
              </p>
              <p className="mt-2 flex gap-2">
                <span className="line-through text-red-500">
                  ₹{deal.actual_price}
                </span>
                <span className="text-green-600 font-bold">
                  ₹{deal.deal_price}
                </span>
              </p>
              <p className="text-sm text-gray-500 flex gap-2">
                <span className="font-semibold text-red-600">Discount:</span>
                <span>{deal.discount_percentage}%</span>
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold text-gray-800">
                  Deal Available on
                </span>
                <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-700">
                  <CountdownTimer
                    endDate={deal.end_date}
                    endTime={deal.end_time}
                  />
                </div>
              </div>
              {deal.buy_now && (
                <button
                  onClick={() => handleBuyNow(deal)}
                  className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
                >
                  Buy Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
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
