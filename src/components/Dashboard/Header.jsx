import React from "react";
import { FaBell, FaBars } from "react-icons/fa";

function Header() {
  return (
    <header className="bg-[#FE7A3A] text-white flex justify-between items-center px-6 py-6 rounded-lg">
      
      {/* Left Side - Logo */}
      <h1 className="text-2xl font-bold">UpSwap</h1>

      {/* Center - Navigation */}
      <nav className="flex justify-center items-center gap-12">
        <button className="text-white">Home</button>
        <button className="text-white">My Deals</button>
        <button className="text-white">UpSwap</button>
        <button className="text-white">My Activity</button>
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
