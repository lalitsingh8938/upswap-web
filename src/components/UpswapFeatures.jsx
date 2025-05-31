
import React from "react";


const UpswapFeatures = () => {
  return (
    // <div className="min-h-screen bg-gray-100">
  <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl rounded-md mx-auto bg-gradient-to-b from-orange-400">
    {/* Header */}
      <div className="bg-gradient-to-r bg-[#FE7A3A] border-2 text-white p-4 text-center font-bold text-lg relative rounded-lg">
        
        <span>New Features</span>
      </div>
      
      {/* Feature Section */}
      <div className="bg-white p-4 shadow-md rounded-lg m-4 flex flex-col items-center text-center">
  <img
    src="/upswapfeatures.png"
    alt="UpSwap Feature"
    className="w-1/4 rounded-md"
  />
  <h2 className="text-xl font-bold mt-4">
    UpSwap's Appointment System: Your Ticket to Seamless Service
  </h2>
  <p className="text-gray-600 mt-2">
    Introducing UpSwap's Appointment System: Your Shortcut to Convenience!
  </p>
  <p className="text-gray-600 mt-2">
    Say farewell to long waits! UpSwap is thrilled to announce our upcoming
    Appointment System, revolutionizing how you engage with local vendors.
    With this innovative feature, vendors can seamlessly organize
    appointments, ensuring personalized service for you.
  </p>
  <p className="text-gray-600 mt-2">
    Here's how it works: Browse your favorite vendors, book your appointment slot
    hassle-free, and enjoy priority service upon arrival. No more tedious waiting
    lines! Plus, choose your payment preference.
  </p>
</div>

      
      {/* Bottom Navigation */}
      {/* <div className="fixed bottom-0 w-full bg-white shadow-md flex justify-around py-3 border-t">
        <div className="flex flex-col items-center text-gray-600">
          <FaHome className="text-xl" />
          <span className="text-sm">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <FaTags className="text-xl" />
          <span className="text-sm">My Deals</span>
        </div>
        <div className="flex flex-col items-center text-purple-600">
          <FaExchangeAlt className="text-xl" />
          <span className="text-sm font-bold">UpSwap</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <FaUser className="text-xl" />
          <span className="text-sm">My Activity</span>
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <FaStore className="text-xl" />
          <span className="text-sm">Vendors</span>
        </div>
      </div> */}
    </div>
  );
};

export default UpswapFeatures;


