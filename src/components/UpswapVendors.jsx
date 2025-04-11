import { FaSearch, FaMapMarkerAlt, FaHeart, FaBars } from "react-icons/fa";

const UpswapVendors = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
        <button className="text-xl">&#8592;</button>
        <h1 className="text-lg font-semibold">Vendors</h1>
        <div className="flex gap-4">
          <FaHeart className="text-xl" />
          <FaBars className="text-xl" />
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-md">
          <FaSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="Search vendor, category..."
            className="flex-grow bg-transparent outline-none p-2"
          />
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
        </div>
      </div>
      
      {/* Vendor Card */}
      <div className="p-4">
        <div className="flex bg-white rounded-lg shadow-md p-4 items-center">
          <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg">
            <img
              src="/deoration-pieces_1282251-4973 1.png"
              alt="Vendor Logo"
              className="w-16 h-16 object-cover"
            />
          </div>
          <div className="flex-grow px-4">
            <h2 className="font-bold text-lg">FOOD HUB</h2>
            <p className="text-sm text-gray-600">
              Special Thali, Afghani Momos, Luxury Sofa set, Football, Polyester Shirt
            </p>
            <p className="text-xs text-gray-500">
              Shop no.32 Omaxe Eternity Vrindavan, Mathura
            </p>
          </div>
          <FaHeart className="text-gray-400 text-xl" />
        </div>
      </div>
      
      {/* Bottom Navigation */}
      
    </div>
  );
};

export default UpswapVendors;
