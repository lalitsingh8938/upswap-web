// import React, { useState } from "react";
// import { FaBell, FaBars, FaChevronDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function Header() {
//   const [isDealsHovered, setIsDealsHovered] = useState(false);
//   const [isActivityHovered, setIsActivityHovered] = useState(false);
//   const navigate = useNavigate();

//   let dealsTimeout;
//   let activityTimeout;

//   // My Deals Handlers
//   const handleDealsMouseEnter = () => {
//     clearTimeout(dealsTimeout);
//     setIsDealsHovered(true);
//   };

//   const handleDealsMouseLeave = () => {
//     dealsTimeout = setTimeout(() => {
//       setIsDealsHovered(false);
//     }, 200);
//   };

//   // My Activity Handlers
//   const handleActivityMouseEnter = () => {
//     clearTimeout(activityTimeout);
//     setIsActivityHovered(true);
//   };

//   const handleActivityMouseLeave = () => {
//     activityTimeout = setTimeout(() => {
//       setIsActivityHovered(false);
//     }, 200);
//   };

//   // const handleActivityClick = (type) => {
//   //   if (type === "Posted Activities") navigate("/PostedActivities");
//   //   else if (type === "Applied Activities") navigate("/AppliedActivities");
//   //   else if (type === "History Activities") navigate("/HistoryActivities");
//   // };
//   const handleActivityClick = (type) => {
//     if (type === "Posted Activities") navigate("/PostedActivities");
//     else if (type === "Applied Activities") navigate("/MyActivities", { state: { activityType: "applied" } }); // added state
//     else if (type === "History Activities") navigate("/MyActivities", { state: { activityType: "history" } }); // added state
// };

//   // const handleActivityClick = (type) => {
//   //   if (type === "Posted Activities") navigate("/MyActivities/posted");
//   //   else if (type === "Applied Activities") navigate("/MyActivities/applied");
//   //   else if (type === "History Activities") navigate("/MyActivities/history");
//   // };

//   const handleDealClick = (type) => {
//     if (type === "Live Deals") navigate("/MyDeals/live");
//     else if (type === "Scheduled Deals") navigate("/MyDeals/scheduled");
//     else if (type === "History Deals") navigate("/MyDeals/history");
//     else if (type === "All Deals") navigate("/MyDeals/all"); // ✅ fixed path
//   };

//   return (
//     <header className="bg-[#FE7A3A] text-white flex justify-center items-center px-6 py-6 rounded-lg relative">
//       {/* Left Side - Logo */}
//       {/* <h1 className="text-2xl font-bold">UpSwap</h1> */}

//       {/* Center - Navigation */}
//       <nav className="flex justify-center items-center gap-12">
//         <button
//           className="text-white"
//           onClick={() => navigate("/DealsPage")} // Replace '/deals' with your actual route
//         >
//           Home
//         </button>
//         {/* My Deals with Dropdown */}
//         <div
//           className="relative"
//           onMouseEnter={handleDealsMouseEnter}
//           onMouseLeave={handleDealsMouseLeave}
//         >
//           <button className="text-white flex items-center gap-1">
//             My Deals
//             <FaChevronDown className="text-xs mt-1" />
//           </button>

//           {isDealsHovered && (
//             <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("Live Deals")}
//               >
//                 Live Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("Scheduled Deals")}
//               >
//                 Scheduled Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("History Deals")}
//               >
//                 History Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("All Deals")}
//               >
//                 All Deals
//               </button>
//             </div>
//           )}
//         </div>

//         <button className="text-white">UpSwap</button>

//         {/* My Activity with Dropdown */}
//         <div
//           className="relative"
//           onMouseEnter={handleActivityMouseEnter}
//           onMouseLeave={handleActivityMouseLeave}
//         >
//           <button className="text-white flex items-center gap-1">
//             My Activity
//             <FaChevronDown className="text-xs mt-1" />
//           </button>

//           {/* {isActivityHovered && (
//             <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
//               <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg">
//                 Posted Activities
//               </button>
//               <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg">
//                 Applied Activities
//               </button>
//               <button className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg">
//                 History Activities
//               </button>
//             </div>
//           )} */}
//           {isActivityHovered && (
//             <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("Posted Activities")}
//               >
//                 Posted Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("Applied Activities")}
//               >
//                 Applied Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("History Activities")}
//               >
//                 History Activities
//               </button>
//             </div>
//           )}
//         </div>

//         <button className="text-white">Vendors</button>
//       </nav>

//       {/* Right Side - Icons */}
//       {/* <div className="flex gap-4">
//         <FaBell className="text-xl" />
//         <FaBars className="text-xl" />
//       </div> */}
//     </header>
//   );
// }

// export default Header;

// import React, { useState } from "react";
// import { FaBell, FaBars, FaChevronDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function Header() {
//   const [isDealsHovered, setIsDealsHovered] = useState(false);
//   const [isActivityHovered, setIsActivityHovered] = useState(false);
//   const navigate = useNavigate();

//   let dealsTimeout;
//   let activityTimeout;

//   // My Deals Handlers
//   const handleDealsMouseEnter = () => {
//     clearTimeout(dealsTimeout);
//     setIsDealsHovered(true);
//   };

//   const handleDealsMouseLeave = () => {
//     dealsTimeout = setTimeout(() => {
//       setIsDealsHovered(false);
//     }, 200);
//   };

//   // My Activity Handlers
//   const handleActivityMouseEnter = () => {
//     clearTimeout(activityTimeout);
//     setIsActivityHovered(true);
//   };

//   const handleActivityMouseLeave = () => {
//     activityTimeout = setTimeout(() => {
//       setIsActivityHovered(false);
//     }, 200);
//   };

//   const handleActivityClick = (type) => {
//     if (type === "All Activities") navigate("/AllActivities");
//     else if (type === "Live Activities") navigate("/LiveActivities");
//     else if (type === "Applied Activities") navigate("/AppliedActivities");
//     else if (type === "Participation Activities") navigate("/ParticipationActivities");
//     else if (type === "History Activities") navigate("/HistoryActivities");

//   };

//   const handleDealClick = (type) => {
//     if (type === "Live Deals") navigate("/MyDeals/live");
//     else if (type === "Scheduled Deals") navigate("/MyDeals/scheduled");
//     else if (type === "History Deals") navigate("/MyDeals/history");
//     else if (type === "All Deals") navigate("/MyDeals/all");
//   };

//   return (
//     <header className="bg-[#FE7A3A] text-white flex justify-center items-center px-6 py-6 rounded-lg relative">
//       <nav className="flex justify-center items-center gap-12">
//         <button className="text-white" onClick={() => navigate("/DealsPage")}>
//           Home
//         </button>

//         {/* My Deals Dropdown */}
//         <div
//           className="relative"
//           onMouseEnter={handleDealsMouseEnter}
//           onMouseLeave={handleDealsMouseLeave}
//         >
//           <button className="text-white flex items-center gap-1">
//             My Deals
//             <FaChevronDown className="text-xs mt-1" />
//           </button>
//           {isDealsHovered && (
//             <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("Live Deals")}
//               >
//                 Live Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("Scheduled Deals")}
//               >
//                 Scheduled Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("History Deals")}
//               >
//                 History Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("All Deals")}
//               >
//                 All Deals
//               </button>
//             </div>
//           )}
//         </div>

//         <button className="text-white">UpSwap</button>

//         {/* My Activity Dropdown */}
//         <div
//           className="relative"
//           onMouseEnter={handleActivityMouseEnter}
//           onMouseLeave={handleActivityMouseLeave}
//         >
//           <button className="text-white flex items-center gap-1">
//             My Activity
//             <FaChevronDown className="text-xs mt-1" />
//           </button>
//           {isActivityHovered && (
//             <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("All Activities")}
//               >
//                 All Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("Live Activities")}
//               >
//                 Live Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("Applied Activities")}
//               >
//                 Applied Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("Participation Activities")}
//               >
//                 Participation Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("History Activities")}
//               >
//                 History Activities
//               </button>
//             </div>
//           )}
//         </div>

//         <button className="text-white">Vendors</button>
//       </nav>
//     </header>
//   );
// }

// export default Header;

// import { useState } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function Header() {
//   const [isDealsHovered, setIsDealsHovered] = useState(false);
//   const [isActivityHovered, setIsActivityHovered] = useState(false);
//   const navigate = useNavigate();

//   let dealsTimeout;
//   let activityTimeout;

//   // My Deals Handlers
//   const handleDealsMouseEnter = () => {
//     clearTimeout(dealsTimeout);
//     setIsDealsHovered(true);
//   };

//   const handleDealsMouseLeave = () => {
//     dealsTimeout = setTimeout(() => {
//       setIsDealsHovered(false);
//     }, 200);
//   };

//   // My Activity Handlers
//   const handleActivityMouseEnter = () => {
//     clearTimeout(activityTimeout);
//     setIsActivityHovered(true);
//   };

//   const handleActivityMouseLeave = () => {
//     activityTimeout = setTimeout(() => {
//       setIsActivityHovered(false);
//     }, 200);
//   };

//   const handleActivityClick = (type) => {
//     if (type === "All Activities") navigate("/MyActivities/All");
//     else if (type === "Live Activities") navigate("/MyActivities/Live");
//     else if (type === "Scheduled Activities")
//       navigate("/MyActivities/Scheduled");
//     else if (type === "Participation Activities")
//       navigate("/MyActivities/Participation");
//     else if (type === "History Activities") navigate("/MyActivities/History");
//   };

//   const handleDealClick = (type) => {
//     if (type === "Live Deals") navigate("/MyDeals/live");
//     else if (type === "Scheduled Deals") navigate("/MyDeals/scheduled");
//     else if (type === "History Deals") navigate("/MyDeals/history");
//     else if (type === "All Deals") navigate("/MyDeals/all");

//     // Close dropdown after selection
//     setIsDealsHovered(false);
//   };

//   return (
//     <header className="bg-white text-black flex items-center justify-between px-6 py-2 rounded-lg relative shadow-md">
//       {/* Left Section: Upswap Icon */}
//       <div className="flex items-center ml-10">
//         <img
//           src="/upswap.png" // Assuming this path is correct
//           alt="UpSwap Feature"
//           className="w-20 h-auto rounded-md cursor-pointer" // Added h-auto for aspect ratio, cursor-pointer for clickability
//           // onClick={() => navigate("/")} // Assuming clicking logo goes to home
//         />
//       </div>

//       {/* Center Navigation Links (Hidden on small, flex on medium+) */}
//       <nav className="hidden md:flex items-center gap-12 flex-grow justify-center">
//         <button
//           className="text-black hover:text-orange-500 transition"
//           onClick={() => navigate("/Home")}
//         >
//           Home
//         </button>

//         {/* My Deals Dropdown */}
//         <div
//           className="relative"
//           onMouseEnter={handleDealsMouseEnter}
//           onMouseLeave={handleDealsMouseLeave}
//         >
//           <button className="text-black flex items-center gap-1 hover:text-orange-500 transition">
//             My Deals
//             <FaChevronDown className="text-xs mt-1" />
//           </button>
//           {isDealsHovered && (
//             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-20">
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("Live Deals")}
//               >
//                 Live Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("Scheduled Deals")}
//               >
//                 Scheduled Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("History Deals")}
//               >
//                 History Deals
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                 onClick={() => handleDealClick("All Deals")}
//               >
//                 All Deals
//               </button>
//             </div>
//           )}
//         </div>

//         <button
//           className="text-black hover:text-orange-500 transition"
//           onClick={() => navigate("/UpswapFeatures")}
//         >
//           UpSwap
//         </button>

//         {/* My Activity Dropdown */}
//         <div
//           className="relative"
//           onMouseEnter={handleActivityMouseEnter}
//           onMouseLeave={handleActivityMouseLeave}
//         >
//           <button className="text-black flex items-center gap-1 hover:text-orange-500 transition">
//             My Activity
//             <FaChevronDown className="text-xs mt-1" />
//           </button>
//           {isActivityHovered && (
//             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-20">
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("All Activities")}
//               >
//                 All Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("Live Activities")}
//               >
//                 Live Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("Scheduled Activities")}
//               >
//                 Scheduled Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("Participation Activities")}
//               >
//                 Participation Activities
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                 onClick={() => handleActivityClick("History Activities")}
//               >
//                 History Activities
//               </button>
//             </div>
//           )}
//         </div>

//         <button
//           className="text-black hover:text-orange-500 transition"
//           onClick={() => navigate("/UpswapVendors")}
//         >
//           Vendors
//         </button>
//       </nav>

//       {/* Right Section: Login/Sign Up Buttons and Mobile Menu Toggle */}
//       <div className="flex items-center gap-4 mr-10">
//         {/* Sign Up Button (Hidden on small, block on medium+) */}
//         <button
//           className="text-white font-semibold bg-[#FE7A3A] rounded-md px-4 py-2 hover:bg-orange-600 transition hidden sm:block"
//           onClick={() => navigate("/Register")}
//         >
//           Sign Up
//         </button>
//         {/* Login Button (Hidden on small, block on medium+) */}
//         <button
//           className="text-slate-600 font-semibold bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition hidden sm:block"
//           onClick={() => navigate("/Login")}
//         >
//           Login
//         </button>

//         {/* Mobile menu icon (Hamburger) for small screens */}
//         <button className="md:hidden text-2xl text-gray-700">
//           {/* You'd typically use a proper icon like FaBars or a custom SVG here */}
//           ☰
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;

import { useState } from "react";
import { FaChevronDown, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const [isDealsHovered, setIsDealsHovered] = useState(false);
  const [isActivityHovered, setIsActivityHovered] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  let dealsTimeout;
  let activityTimeout;

  const handleDealsMouseEnter = () => {
    clearTimeout(dealsTimeout);
    setIsDealsHovered(true);
  };

  const handleDealsMouseLeave = () => {
    dealsTimeout = setTimeout(() => {
      setIsDealsHovered(false);
    }, 200);
  };

  const handleActivityMouseEnter = () => {
    clearTimeout(activityTimeout);
    setIsActivityHovered(true);
  };

  const handleActivityMouseLeave = () => {
    activityTimeout = setTimeout(() => {
      setIsActivityHovered(false);
    }, 200);
  };

  const handleActivityClick = (type) => {
    if (type === "All Activities") navigate("/MyActivities/All");
    else if (type === "Live Activities") navigate("/MyActivities/Live");
    else if (type === "Scheduled Activities")
      navigate("/MyActivities/Scheduled");
    else if (type === "Participation Activities")
      navigate("/MyActivities/Participation");
    else if (type === "History Activities") navigate("/MyActivities/History");
  };

  const handleDealClick = (type) => {
    if (type === "Live Deals") navigate("/MyDeals/live");
    else if (type === "Scheduled Deals") navigate("/MyDeals/scheduled");
    else if (type === "History Deals") navigate("/MyDeals/history");
    else if (type === "All Deals") navigate("/MyDeals/all");
    setIsDealsHovered(false);
  };

  return (
    <>
      <header className="bg-white text-black flex items-center justify-between px-6 py-2 rounded-lg relative shadow-md">
        {/* Left Section: Upswap Icon */}
        <div className="flex items-center ml-10">
          <img
            src="/upswap.png"
            alt="UpSwap Feature"
            className="w-20 h-auto rounded-md cursor-pointer"
            onClick={() => navigate("/Home")}
          />
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-12 flex-grow justify-center">
          <button
            className="text-black hover:text-orange-500 transition"
            onClick={() => navigate("/Home")}
          >
            Home
          </button>

          {/* My Deals Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleDealsMouseEnter}
            onMouseLeave={handleDealsMouseLeave}
          >
            <button className="text-black flex items-center gap-1 hover:text-orange-500 transition">
              My Deals
              <FaChevronDown className="text-xs mt-1" />
            </button>
            {isDealsHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-20">
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

          <button
            className="text-black hover:text-orange-500 transition"
            onClick={() => navigate("/UpswapFeatures")}
          >
            UpSwap
          </button>

          {/* My Activity Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleActivityMouseEnter}
            onMouseLeave={handleActivityMouseLeave}
          >
            <button className="text-black flex items-center gap-1 hover:text-orange-500 transition">
              My Activity
              <FaChevronDown className="text-xs mt-1" />
            </button>
            {isActivityHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-20">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
                  onClick={() => handleActivityClick("All Activities")}
                >
                  All Activities
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
                  onClick={() => handleActivityClick("Live Activities")}
                >
                  Live Activities
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
                  onClick={() => handleActivityClick("Scheduled Activities")}
                >
                  Scheduled Activities
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
                  onClick={() =>
                    handleActivityClick("Participation Activities")
                  }
                >
                  Participation Activities
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
                  onClick={() => handleActivityClick("History Activities")}
                >
                  History Activities
                </button>
              </div>
            )}
          </div>

          <button
            className="text-black hover:text-orange-500 transition"
            onClick={() => navigate("/UpswapVendors")}
          >
            Vendors
          </button>
        </nav>

        {/* Right Section: Login/Sign Up Buttons and Side Menu Icon */}
        <div className="flex items-center gap-4 mr-10">
          <button
            className="text-white font-semibold bg-[#FE7A3A] rounded-md px-4 py-2 hover:bg-orange-600 transition hidden sm:block"
            onClick={() => navigate("/Register")}
          >
            Sign Up
          </button>
          <button
            className="text-slate-600 font-semibold bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition hidden sm:block"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Login
          </button>

          {/* Side Menu Icon */}
          <button
            className="text-2xl text-gray-700"
            onClick={() => setIsSideMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* Side Menu Drawer */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsSideMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-xl mb-4"
              onClick={() => setIsSideMenuOpen(false)}
            >
              × Close
            </button>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => navigate("/MyPersonalAccount")}
                  className="w-full text-left hover:text-orange-500"
                >
                  My Personal Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/Deals")}
                  className="w-full text-left hover:text-orange-500"
                >
                  Explore Nearby Vendors
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/BasicInfo")}
                  className="w-full text-left hover:text-orange-500"
                >
                  My Business Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/Activities")}
                  className="w-full text-left hover:text-orange-500"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/UpswapVendors")}
                  className="w-full text-left hover:text-orange-500"
                >
                  Refer a Friend
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
