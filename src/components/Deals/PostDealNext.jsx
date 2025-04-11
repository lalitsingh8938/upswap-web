import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const stored = localStorage.getItem("dealData");
    if (stored) {
      setDealData(JSON.parse(stored));
    }
  }, []);

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
          alert("Unable to fetch location. Please allow location access.");
        }
      );
    } else {
      setCoordinates(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("deal_title", dealData.dealTitle || "");
    formData.append("deal_description", dealData.dealDescription || "");
    formData.append("select_service", dealData.selectedService || "");
    formData.append("start_now", startNow);
    formData.append("actual_price", actualPrice);
    formData.append("deal_price", dealPrice);
    formData.append("available_deals", availableDeals);
    formData.append("location", location);
    // ✅ Correct
    formData.append("vendor_kyc", "636e9708-645a-4259-9042-ce495bcdfeca");

    if (coordinates) {
      formData.append("latitude", coordinates.lat);
      formData.append("longitude", coordinates.lng);
    }
    formData.append("show_promotion", promotion);

    const savedAddress = JSON.parse(localStorage.getItem("address")) || {};

    formData.append(
      "location_house_no",
      savedAddress.house_no_building_name || ""
    );
    formData.append(
      "location_road_name",
      savedAddress.road_name_area_colony || ""
    );
    formData.append("location_country", savedAddress.country || "");
    formData.append("location_state", savedAddress.state || "");
    formData.append("location_city", savedAddress.city || "");
    formData.append("location_pincode", savedAddress.pincode || "");

    try {
      const response = await fetch("https://api.upswap.app/api/deals/create/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert("Deal created successfully!");
        navigate("/DealsPage");
      } else {
        console.error("API Error:", result);
        alert("Failed to create deal: " + (result.detail || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while creating the deal.");
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
    else navigate("/PostDeal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FE7A3A] p-4 border-2 rounded-lg">
      <form
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4 relative"
        onSubmit={handleSubmit}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#FE7A3A]"
          type="button"
        >
          <FaTimes size={20} />
        </button>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Deal Valid Till
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={startNow}
              onChange={() => setStartNow(!startNow)}
              className="accent-[#FE7A3A] w-5 h-5"
            />
            <span className="text-gray-700">Start now</span>
          </div>
        </div>

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />

        <div className="flex gap-3">
          <input
            type="number"
            value={actualPrice}
            onChange={(e) => setActualPrice(e.target.value)}
            placeholder="Actual Price"
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            type="number"
            value={dealPrice}
            onChange={(e) => setDealPrice(e.target.value)}
            placeholder="Deal Price"
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <input
          type="number"
          value={availableDeals}
          onChange={(e) => setAvailableDeals(e.target.value)}
          placeholder="Max no of deals available"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />

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

        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Show as promotion</label>
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
