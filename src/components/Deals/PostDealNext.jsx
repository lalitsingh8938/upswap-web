import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DealForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [dealData, setDealData] = useState({});
  const [startNow, setStartNow] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [location, setLocation] = useState("");
  const [endTime, setEndTime] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [dealPrice, setDealPrice] = useState("");
  const [availableDeals, setAvailableDeals] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [buyNow, setBuyNow] = useState(false);

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("deal_data"); // ✅ updated key
    if (stored) {
      setDealData(JSON.parse(stored));
    }
  }, []);

  const vendor_kyc = localStorage.getItem("vendor_id");
  const Vendor_id  = localStorage.getItem("vendor_id")
  const userId = localStorage.getItem("user_id");

  const handleLocationChange = (e) => {
    const selected = e.target.value;
    setLocation(selected);

    if (selected === "live" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          toast.warning(
            "Unable to fetch location. Please allow location access."
          );
        }
      );
    } else {
      setCoordinates(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedAddress = JSON.parse(localStorage.getItem("address")) || {};
    const uploadedImages =
      JSON.parse(localStorage.getItem("uploaded_deal_images")) || [];

    const dealTitle = localStorage.getItem("deal_title");
    const dealDescription = localStorage.getItem("deal_description");
    const selectedService = localStorage.getItem("deal_service");
    const vendorData = JSON.parse(localStorage.getItem("vendorData"));

    // Format uploaded images into a list of objects with both thumbnail and compressed URLs
    const uploadedImagesFormatted = uploadedImages.map((image) => ({
      thumbnail: image.thumbnail, // Store the thumbnail URL
      compressed: image.compressed, // Store the compressed URL
    }));

    const discount_percentage =
      actualPrice && dealPrice
        ? (((actualPrice - dealPrice) / actualPrice) * 100).toFixed(2)
        : 0;

    const deal_post_time = new Date()
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);

    const payload = {
      vendor_name: vendorData?.full_name || "",
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      buy_now: buyNow,
      discount_percentage: parseFloat(discount_percentage),
      deal_post_time: deal_post_time,
      deal_title: dealTitle || "",
      deal_description: dealDescription || "",
      select_service: selectedService || "",
      start_now: startNow,
      end_time: endTime,
      actual_price: actualPrice,
      deal_price: dealPrice,
      available_deals: availableDeals,
      location: location,
      vendor_kyc: vendor_kyc,
      vendor_uuid: Vendor_id,
      show_promotion: promotion,
      uploaded_images: uploadedImagesFormatted,
      location_house_no: savedAddress.house_no_building_name || "",
      location_road_name: savedAddress.road_name_area_colony || "",
      location_country: savedAddress.country || "",
      location_state: savedAddress.state || "",
      location_city: savedAddress.city || "",
      location_pincode: savedAddress.pincode || "",
    };

    if (coordinates) {
      payload.latitude = coordinates.lat;
      payload.longitude = coordinates.lng;
    }

    try {
      const response = await fetch("https://api.upswap.app/api/deals/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("API Parsed Response:", result);

      if (response.ok) {
        toast.success("Deal created successfully!");
        localStorage.clear()
        navigate("/DealsPage");
      } else {
        toast.warning(
          "Failed to create deal: " + (result.detail || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Error:", err);
      toast.warning("Something went wrong while creating the deal.");
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
    else navigate("/PostDeal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FE7A3A] p-4 border-2 rounded-lg">
      <form
        className="bg-gradient-to-b from-orange-100 to-white p-6 rounded-xl shadow-md w-full max-w-md space-y-2 relative"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
          Post a Deal
        </h2>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-0 right-2 text-gray-500 hover:text-[#FE7A3A]"
          type="button"
        >
          <FaTimes size={20} />
        </button>

        {/* Deal Timing */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Deal Timing
          </h2>

          <label className="block text-gray-700 font-medium mb-1">
            Deal Valid Till
          </label>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={startNow}
              onChange={() => setStartNow(!startNow)}
              className="accent-[#FE7A3A] w-5 h-5"
            />
            <span className="text-gray-700">Start now</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-gray-700 block mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="text-gray-700 block mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="text-gray-700 block mb-1">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="text-gray-700 block mb-1">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Pricing</h2>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={buyNow}
              onChange={() => setBuyNow(!buyNow)}
              className="accent-[#FE7A3A] w-5 h-5"
            />
            <label className="text-gray-700">Buy Now</label>
          </div>
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-gray-700 block mb-1">Actual Price</label>
              <input
                type="number"
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
                placeholder="Actual Price"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="text-gray-700 block mb-1">Deal Price</label>
              <input
                type="number"
                value={dealPrice}
                onChange={(e) => setDealPrice(e.target.value)}
                placeholder="Deal Price"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Availability
          </h2>
          <label className="text-gray-700 block mb-1">Available Deals</label>
          <input
            type="number"
            value={availableDeals}
            onChange={(e) => setAvailableDeals(e.target.value)}
            placeholder="Max no of deals available"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* Location and Promotion */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Location & Promotion
          </h2>
          <label className="text-gray-700 block mb-1">Location</label>
          <select
            value={location}
            onChange={handleLocationChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Choose Location</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="live">📍 Use my live location</option>
          </select>
          {coordinates && (
            <p className="text-sm text-green-600 mt-1">
              Location: Lat {coordinates.lat.toFixed(4)}, Lng{" "}
              {coordinates.lng.toFixed(4)}
            </p>
          )}

          <div className="flex items-center justify-between mt-4">
            <label className="text-gray-700 font-medium">
              Show as promotion
            </label>
            <Switch
              checked={promotion}
              onChange={setPromotion}
              className={`${
                promotion ? "bg-orange-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  promotion ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#FE7A3A] hover:bg-orange-600 text-white w-full py-2 rounded-md shadow-md"
        >
          Submit Deal
        </button>
      </form>
    </div>
  );
};

export default DealForm;
