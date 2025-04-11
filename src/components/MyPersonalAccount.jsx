import { Pencil } from "lucide-react";
import { useState } from "react";

export default function PersonalAccount() {
  const [profilePic, setProfilePic] = useState("bhagwan.jpg");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="bg-[#FE7A3A] h-screen p-4 rounded-lg border-2">
      <div className="flex items-center text-white text-lg font-semibold pb-4">
        <button className="mr-4">&#x276E;</button>
        My Personal Account
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-12 h-12 rounded-full border border-gray-300"
            />

            {/* File Input */}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div>
              <p className="font-bold text-black">FOOD HUB</p>
              <p className="text-orange-500 text-sm font-semibold">
                0.0/5 ⭐⭐⭐⭐⭐
              </p>
            </div>

            {/* Pencil Icon Button */}
            {/* <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-300"
            >
              <Pencil size={12} className="text-gray-500" />
            </button> */}
          </div>
          {/* Edit Profile Button */}
          <button
            className="text-gray-500 flex items-center gap-1"
            onClick={triggerFileInput}
          >
            <Pencil size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 mt-4 flex items-center gap-3">
        <span className="text-[#FE7A3A] text-xl">🛒</span>
        <div>
          <p className="text-[#FE7A3A] font-semibold">My Orders</p>
          <p className="text-gray-500 text-sm">See your last order details</p>
        </div>
      </div>
    </div>
  );
}
