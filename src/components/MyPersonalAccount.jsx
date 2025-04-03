import { Pencil } from "lucide-react";

export default function PersonalAccount() {
  return (
    <div className="bg-[#FE7A3A] h-screen p-4 rounded-lg">
      <div className="flex items-center text-white text-lg font-semibold pb-4">
        <button className="mr-4">&#x276E;</button>
        My Personal Account
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="bhagwan.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-bold text-black">FOOD HUB</p>
              <p className="text-orange-500 text-sm font-semibold">
                0.0/5 ⭐⭐⭐⭐⭐
              </p>
            </div>
          </div>
          <button className="text-gray-500 flex items-center gap-1 ">
            <Pencil size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 mt-4 flex items-center gap-3">
        <span className="text-orange-500 text-xl">🛒</span>
        <div>
          <p className="text-orange-500 font-semibold">My Orders</p>
          <p className="text-gray-500 text-sm">See your last order details</p>
        </div>
      </div>
    </div>
  );
}
