import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Switch } from "@headlessui/react";

const DealForm = () => {
  const [startNow, setStartNow] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleLocationChange = (e) => {
    const selected = e.target.value;
    setLocation(selected);

    if (selected === "live") {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            alert("Unable to fetch location. Please allow location access.");
          }
        );
      } else {
        alert("Geolocation not supported");
      }
    } else {
      setCoordinates(null); // reset if not live
    }
  };

  if (!showForm) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-400 to-orange-500 p-4 relative rounded-lg">
      <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4 relative">
        {/* ❌ Close Button */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-orange-500">
          <FaTimes size={20} />
        </button>

        {/* Deal Valid Till */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Deal Valid Till
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={startNow}
              onChange={() => setStartNow(!startNow)}
              className="accent-orange-500 w-5 h-5"
            />
            <span className="text-gray-700">Start now</span>
          </div>
        </div>

        {/* End Time */}
        <div>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Select end time"
          />
        </div>

        {/* Actual Price & Deal Price */}
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Actual Price"
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            placeholder="Deal Price"
            className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Available Deals */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Available deals
          </label>
          <input
            type="number"
            placeholder="Max no of deals available"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Location
          </label>
          <select
            value={location}
            onChange={handleLocationChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
        </div>

        {/* Show as Promotion */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Show as promotion</label>
          <Switch
            checked={promotion}
            onChange={setPromotion}
            className={`${
              promotion ? "bg-orange-500" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
          >
            <span
              className={`${
                promotion ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DealForm;
