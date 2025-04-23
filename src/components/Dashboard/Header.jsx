import React, { useState } from "react";
import { FaBell, FaBars, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isDealsHovered, setIsDealsHovered] = useState(false);
  const [isActivityHovered, setIsActivityHovered] = useState(false);
  const navigate = useNavigate();

  let dealsTimeout;
  let activityTimeout;

  // My Deals Handlers
  const handleDealsMouseEnter = () => {
    clearTimeout(dealsTimeout);
    setIsDealsHovered(true);
  };

  const handleDealsMouseLeave = () => {
    dealsTimeout = setTimeout(() => {
      setIsDealsHovered(false);
    }, 200);
  };

  // My Activity Handlers
  const handleActivityMouseEnter = () => {
    clearTimeout(activityTimeout);
    setIsActivityHovered(true);
  };

  const handleActivityMouseLeave = () => {
    activityTimeout = setTimeout(() => {
      setIsActivityHovered(false);
    }, 200);
  };

  const handleDealClick = (type) => {
    if (type === "Live Deals") navigate("/MyDeals/live");
    else if (type === "Scheduled Deals") navigate("/MyDeals/scheduled");
    else if (type === "History Deals") navigate("/MyDeals/history");
    else if (type === "All Deals") navigate("/MyDeals/all"); // ✅ fixed path
  };

  return (
    <header className="bg-[#FE7A3A] text-white flex justify-between items-center px-6 py-6 rounded-lg relative">
      {/* Left Side - Logo */}
      <h1 className="text-2xl font-bold">UpSwap</h1>

      {/* Center - Navigation */}
      <nav className="flex justify-center items-center gap-12">
        <button
          className="text-white"
          onClick={() => navigate("/DealsPage")} // Replace '/deals' with your actual route
        >
          Home
        </button>
        {/* My Deals with Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleDealsMouseEnter}
          onMouseLeave={handleDealsMouseLeave}
        >
          <button className="text-white flex items-center gap-1">
            My Deals
            <FaChevronDown className="text-xs mt-1" />
          </button>

          {isDealsHovered && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
                onClick={() => handleDealClick("Live Deals")}
              >
                Live Deals
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
                onClick={() => handleDealClick("Scheduled Deals")}
              >
                Scheduled Deals
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
                onClick={() => handleDealClick("History Deals")}
              >
                History Deals
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
                onClick={() => handleDealClick("All Deals")}
              >
                All Deals
              </button>
            </div>
          )}
        </div>

        <button className="text-white">UpSwap</button>

        {/* My Activity with Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleActivityMouseEnter}
          onMouseLeave={handleActivityMouseLeave}
        >
          <button className="text-white flex items-center gap-1">
            My Activity
            <FaChevronDown className="text-xs mt-1" />
          </button>

          {isActivityHovered && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
              <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg">
                Posted Activities
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg">
                Applied Activities
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg">
                Activity History
              </button>
            </div>
          )}
        </div>

        <button className="text-white">Vendors</button>
      </nav>

      {/* Right Side - Icons */}
      <div className="flex gap-4">
        <FaBell className="text-xl" />
        <FaBars className="text-xl" />
      </div>
    </header>
  );
}

export default Header;
