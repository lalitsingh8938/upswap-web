import React, { useState } from "react";
import { FaSearch, FaBars, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { RiExchangeDollarLine } from "react-icons/ri";
import productData from "./productData.json"; // Sample JSON file for product list

const MyDeals = () => {
  const [activeTab, setActiveTab] = useState("Live");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = activeTab === "All" 
  ? productData 
  : productData.filter((product) => product.status.toLowerCase() === activeTab.toLowerCase());


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-4 flex justify-between items-center">
        <button className="text-xl">&larr;</button>
        <h1 className="text-lg font-semibold">My Deals</h1>
        <FaBars className="text-xl" />
      </header>

      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
          <FaSearch className="text-gray-500 mx-2" />
          <input
            type="text"
            placeholder="Search for deals"
            className="w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 p-2">
        {["All", "Live", "Scheduled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab
                ? "bg-orange-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {tab} ({filteredProducts.length})
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="p-4 grid lg:grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md flex"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="ml-4 flex-1">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Live
              </span>
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-sm text-gray-600 flex items-center">
                <FaMapMarkerAlt className="mr-1 text-red-500" /> {product.location}
              </p>
              <p className="text-sm text-gray-500">
                <span className="line-through text-gray-400">₹{product.originalPrice}</span>
                <span className="text-orange-600 font-bold"> ₹{product.discountedPrice}</span>
              </p>
              <button className="mt-2 bg-orange-500 text-white px-4 py-1 rounded-lg">
                Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-20 right-6 bg-orange-500 p-4 rounded-full shadow-lg text-white">
        <FaTag className="text-2xl" />
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full bg-white shadow-md flex justify-around py-2">
        <BiHomeAlt className="text-2xl text-gray-600" />
        <MdOutlineLocalOffer className="text-2xl text-orange-500" />
        <RiExchangeDollarLine className="text-2xl text-gray-600" />
        <AiOutlineShoppingCart className="text-2xl text-gray-600" />
        <AiOutlineUser className="text-2xl text-gray-600" />
      </nav>
    </div>
  );
};

export default MyDeals;
