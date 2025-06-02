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

// import { useState } from "react";
// import { FaChevronDown, FaBars } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function Header() {
//   const [isDealsHovered, setIsDealsHovered] = useState(false);
//   const [isActivityHovered, setIsActivityHovered] = useState(false);
//   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   let dealsTimeout;
//   let activityTimeout;

//   const handleDealsMouseEnter = () => {
//     clearTimeout(dealsTimeout);
//     setIsDealsHovered(true);
//   };

//   const handleDealsMouseLeave = () => {
//     dealsTimeout = setTimeout(() => {
//       setIsDealsHovered(false);
//     }, 200);
//   };

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
//     setIsDealsHovered(false);
//   };

//   return (
//     <>
//       <header className="bg-white text-black flex items-center justify-between px-6 py-2 rounded-lg relative shadow-md">
//         {/* Left Section: Upswap Icon */}
//         <div className="flex items-center ml-10">
//           <img
//             src="/upswap.png"
//             alt="UpSwap Feature"
//             className="w-20 h-auto rounded-md cursor-pointer"
//             onClick={() => navigate("/Home")}
//           />
//         </div>

//         {/* Center Navigation Links */}
//         <nav className="hidden md:flex items-center gap-12 flex-grow justify-center">
//           <button
//             className="text-black hover:text-orange-500 transition"
//             onClick={() => navigate("/Home")}
//           >
//             Home
//           </button>

//           {/* My Deals Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={handleDealsMouseEnter}
//             onMouseLeave={handleDealsMouseLeave}
//           >
//             <button className="text-black flex items-center gap-1 hover:text-orange-500 transition">
//               My Deals
//               <FaChevronDown className="text-xs mt-1" />
//             </button>
//             {isDealsHovered && (
//               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-20">
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                   onClick={() => handleDealClick("Live Deals")}
//                 >
//                   Live Deals
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                   onClick={() => handleDealClick("Scheduled Deals")}
//                 >
//                   Scheduled Deals
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                   onClick={() => handleDealClick("History Deals")}
//                 >
//                   History Deals
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                   onClick={() => handleDealClick("All Deals")}
//                 >
//                   All Deals
//                 </button>
//               </div>
//             )}
//           </div>

//           <button
//             className="text-black hover:text-orange-500 transition"
//             onClick={() => navigate("/UpswapFeatures")}
//           >
//             UpSwap
//           </button>

//           {/* My Activity Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={handleActivityMouseEnter}
//             onMouseLeave={handleActivityMouseLeave}
//           >
//             <button className="text-black flex items-center gap-1 hover:text-orange-500 transition">
//               My Activity
//               <FaChevronDown className="text-xs mt-1" />
//             </button>
//             {isActivityHovered && (
//               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-20">
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() => handleActivityClick("All Activities")}
//                 >
//                   All Activities
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() => handleActivityClick("Live Activities")}
//                 >
//                   Live Activities
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() => handleActivityClick("Scheduled Activities")}
//                 >
//                   Scheduled Activities
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() =>
//                     handleActivityClick("Participation Activities")
//                   }
//                 >
//                   Participation Activities
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() => handleActivityClick("History Activities")}
//                 >
//                   History Activities
//                 </button>
//               </div>
//             )}
//           </div>

//           <button
//             className="text-black hover:text-orange-500 transition"
//             onClick={() => navigate("/UpswapVendors")}
//           >
//             Vendors
//           </button>
//         </nav>

//         {/* Right Section: Login/Sign Up Buttons and Side Menu Icon */}
//         <div className="flex items-center gap-4 mr-10">
//           <button
//             className="text-white font-semibold bg-[#FE7A3A] rounded-md px-4 py-2 hover:bg-orange-600 transition hidden sm:block"
//             onClick={() => navigate("/Register")}
//           >
//             Sign Up
//           </button>
//           <button
//             className="text-slate-600 font-semibold bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition hidden sm:block"
//             onClick={() => {
//               localStorage.clear();
//               navigate("/");
//             }}
//           >
//             Login
//           </button>

//           {/* Side Menu Icon */}
//           <button
//             className="text-2xl text-gray-700"
//             onClick={() => setIsSideMenuOpen(true)}
//           >
//             <FaBars />
//           </button>
//         </div>
//       </header>

//       {/* Side Menu Drawer */}
//       {isSideMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-50"
//           onClick={() => setIsSideMenuOpen(false)}
//         >
//           <div
//             className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="text-xl mb-4"
//               onClick={() => setIsSideMenuOpen(false)}
//             >
//               × Close
//             </button>
//             <ul className="space-y-4">
//               <li>
//                 <button
//                   onClick={() => navigate("/MyPersonalAccount")}
//                   className="w-full text-left hover:text-orange-500"
//                 >
//                   My Personal Account
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate("/Deals")}
//                   className="w-full text-left hover:text-orange-500"
//                 >
//                   Explore Nearby Vendors
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate("/BasicInfo")}
//                   className="w-full text-left hover:text-orange-500"
//                 >
//                   My Business Account
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate("/Activities")}
//                   className="w-full text-left hover:text-orange-500"
//                 >
//                   Help Center
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate("/UpswapVendors")}
//                   className="w-full text-left hover:text-orange-500"
//                 >
//                   Refer a Friend
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Header;

// import { useState, useEffect } from "react";
// import { FaChevronDown, FaBars, FaUser, FaStore, FaBriefcase, FaQuestionCircle, FaGift, FaSun, FaBell } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Switch } from "@headlessui/react"; // Assuming you still want headlessui Switch
// import axios from "axios";
// import { toast } from "react-toastify";
// // import LogOut from "./LogOut"; // Adjust the path if LogOut is in a different directory

// function Header() {
//   const [isDealsHovered, setIsDealsHovered] = useState(false);
//   const [isActivityHovered, setIsActivityHovered] = useState(false);
//   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
//   const [isApproved, setIsApproved] = useState(null); // null, true, or false
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);

//   const navigate = useNavigate();

//   let dealsTimeout;
//   let activityTimeout;

//   const fetchKYCStatus = async () => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) {
//       console.warn("No vendor ID found in localStorage. Cannot fetch KYC status.");
//       setIsApproved(false); // Assume not approved if no vendor ID
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/vendor/status/${vendorId}/`
//       );
//       const updatedStatus = response.data.is_approved;
//       setIsApproved(updatedStatus);
//     } catch (error) {
//       console.error("Failed to fetch KYC status", error);
//       setIsApproved(false); // Set to false on error to prevent indefinite loading state
//       toast.error("Failed to load KYC status.");
//     }
//   };

//   useEffect(() => {
//     fetchKYCStatus();
//     // Fetch status every 5 seconds
//     const interval = setInterval(fetchKYCStatus, 5000);
//     return () => clearInterval(interval); // Clear interval on component unmount
//   }, []);

//   const handleDealsMouseEnter = () => {
//     clearTimeout(dealsTimeout);
//     setIsDealsHovered(true);
//   };

//   const handleDealsMouseLeave = () => {
//     dealsTimeout = setTimeout(() => {
//       setIsDealsHovered(false);
//     }, 200);
//   };

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
//     setIsActivityHovered(false); // Close dropdown after click
//   };

//   const handleDealClick = (type) => {
//     if (type === "Live Deals") navigate("/MyDeals/live");
//     else if (type === "Scheduled Deals") navigate("/MyDeals/scheduled");
//     else if (type === "History Deals") navigate("/MyDeals/history");
//     else if (type === "All Deals") navigate("/MyDeals/all");
//     setIsDealsHovered(false); // Close dropdown after click
//   };

//   const handleSideMenuItemClick = async (route, title) => {
//     setIsSideMenuOpen(false); // Close side menu on item click

//     if (title === "My Business Account") {
//       const vendorId = localStorage.getItem("vendor_id");
//       if (!vendorId) {
//         console.error("No vendor ID found.");
//         toast.error("Please log in to view business account details.");
//         return;
//       }
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}/`
//         );
//         const vendorDetails = response.data;
//         localStorage.setItem("vendor_details", JSON.stringify(vendorDetails));
//         navigate(route);
//       } catch (error) {
//         console.error("Error fetching vendor details:", error);
//         toast.error("Failed to load business account details.");
//       }
//     } else {
//       navigate(route);
//     }
//   };

//   const sideMenuItems = [
//     {
//       icon: <FaUser />,
//       title: "My Personal Account",
//       subtitle: "Account Settings and orders",
//       route: "/MyPersonalAccount",
//     },
//     {
//       icon: <FaStore />,
//       title: "Explore Nearby Vendors",
//       subtitle: "Explore and save local favourite vendors",
//       route: "/DealsPage",
//     },
//     {
//       icon: <FaBriefcase />,
//       title: "My Business Account",
//       subtitle: "Complete your profile for posting deals",
//       route: "/BasicInfo",
//       showKycStatus: true, // This item will display the KYC status
//     },
//     {
//       icon: <FaQuestionCircle />,
//       title: "Help Center",
//       subtitle: "Contact Us, Report, tutorials & more",
//       route: "/MyActivities",
//     },
//     {
//       icon: <FaGift />,
//       title: "Refer a Friend",
//       subtitle: "Earn rewards for inviting friends",
//       route: "/UpswapVendors",
//     },
//   ];

//   return (
//     <>
//       <header className="bg-white text-black flex items-center justify-between px-6 py-2 rounded-lg relative shadow-md">
//         {/* Left Section: Upswap Icon */}
//         <div className="flex items-center ml-10">
//           <img
//             src="/upswap.png"
//             alt="UpSwap Feature"
//             className="w-20 h-auto rounded-md cursor-pointer"
//             onClick={() => navigate("/Home")}
//           />
//         </div>

//         {/* Center Navigation Links */}
//         <nav className="hidden md:flex items-center gap-12 flex-grow justify-center">
//           <button
//             className="text-black hover:text-orange-500 transition"
//             onClick={() => navigate("/Home")}
//           >
//             Home
//           </button>

//           {/* My Deals Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={handleDealsMouseEnter}
//             onMouseLeave={handleDealsMouseLeave}
//           >
//             <button className="text-black flex items-center gap-1 hover:text-orange-500 transition">
//               My Deals
//               <FaChevronDown className="text-xs mt-1" />
//             </button>
//             {isDealsHovered && (
//               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-20">
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                   onClick={() => handleDealClick("Live Deals")}
//                 >
//                   Live Deals
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                   onClick={() => handleDealClick("Scheduled Deals")}
//                 >
//                   Scheduled Deals
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                   onClick={() => handleDealClick("History Deals")}
//                 >
//                   History Deals
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-orange-100 rounded-lg"
//                   onClick={() => handleDealClick("All Deals")}
//                 >
//                   All Deals
//                 </button>
//               </div>
//             )}
//           </div>

//           <button
//             className="text-black hover:text-orange-500 transition"
//             onClick={() => navigate("/UpswapFeatures")}
//           >
//             UpSwap
//           </button>

//           {/* My Activity Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={handleActivityMouseEnter}
//             onMouseLeave={handleActivityMouseLeave}
//           >
//             <button className="text-black flex items-center gap-1 hover:text-orange-500 transition">
//               My Activity
//               <FaChevronDown className="text-xs mt-1" />
//             </button>
//             {isActivityHovered && (
//               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-20">
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() => handleActivityClick("All Activities")}
//                 >
//                   All Activities
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() => handleActivityClick("Live Activities")}
//                 >
//                   Live Activities
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() => handleActivityClick("Scheduled Activities")}
//                 >
//                   Scheduled Activities
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() =>
//                     handleActivityClick("Participation Activities")
//                   }
//                 >
//                   Participation Activities
//                 </button>
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-lg"
//                   onClick={() => handleActivityClick("History Activities")}
//                 >
//                   History Activities
//                 </button>
//               </div>
//             )}
//           </div>

//           <button
//             className="text-black hover:text-orange-500 transition"
//             onClick={() => navigate("/UpswapVendors")}
//           >
//             Vendors
//           </button>
//         </nav>

//         {/* Right Section: Login/Sign Up Buttons and Side Menu Icon */}
//         <div className="flex items-center gap-4 mr-10">
//           <button
//             className="text-white font-semibold bg-[#FE7A3A] rounded-md px-4 py-2 hover:bg-orange-600 transition hidden sm:block"
//             onClick={() => navigate("/Register")}
//           >
//             Sign Up
//           </button>
//           <button
//             className="text-slate-600 font-semibold bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition hidden sm:block"
//             onClick={() => {
//               localStorage.clear();
//               navigate("/");
//             }}
//           >
//             Login
//           </button>

//           {/* Side Menu Icon */}
//           <button
//             className="text-2xl text-gray-700"
//             onClick={() => setIsSideMenuOpen(true)}
//           >
//             <FaBars />
//           </button>
//         </div>
//       </header>

//       {/* Side Menu Drawer */}
//       {isSideMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 z-50"
//           onClick={() => setIsSideMenuOpen(false)}
//         >
//           <div
//             className="fixed top-0 right-0 w-64 h-full bg-slate-100 shadow-lg p-4 overflow-y-auto" // Changed background to slate-100
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="bg-white p-1 rounded-md shadow-md mb-4"> {/* Added for logo */}
//               <h2 className="font-semibold flex justify-center items-center px-6 py-6 rounded-lg">
//                 <img
//                   src="/upswap.png"
//                   alt="logo"
//                   className="w-32 h-12 object-cover rounded-lg"
//                 />
//               </h2>
//             </div>

//             <button
//               className="text-xl mb-4 text-gray-700 hover:text-red-500"
//               onClick={() => setIsSideMenuOpen(false)}
//             >
//               × Close
//             </button>

//             {isApproved === false && ( // Show warning only when explicitly false
//               <div className="bg-yellow-100 text-yellow-800 p-2 text-center rounded-md mt-4 mx-2">
//                 Your KYC Approval is revoked. Please wait for approval.
//               </div>
//             )}

//             <h3 className="text-[#FE7A3A] font-semibold mt-6 ml-2">Main Menu</h3>
//             <ul className="space-y-2 mt-4">
//               {sideMenuItems.map((item, index) => (
//                 <li key={index}>
//                   <button
//                     onClick={() => handleSideMenuItemClick(item.route, item.title)}
//                     className="flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-slate-200"
//                   >
//                     <span className="text-[#FE7A3A] text-xl mr-3">{item.icon}</span>
//                     <div className="flex flex-col items-start">
//                       <h3 className="font-semibold text-black flex items-center gap-2">
//                         {item.title}
//                       </h3>
//                       {item.showKycStatus && isApproved !== null && ( // Only show status if fetched
//                         <span
//                           className={`text-xs font-semibold mt-1 ${
//                             isApproved ? "text-green-600" : "text-red-400"
//                           }`}
//                         >
//                           {isApproved ? "✅ Approved" : "⏳ In Review"}
//                         </span>
//                       )}
//                     </div>
//                   </button>
//                 </li>
//               ))}
//             </ul>

//             <h3 className="text-[#FE7A3A] font-semibold mt-6 ml-2">Settings</h3>

//             <div className="flex items-center justify-between mt-3 ml-2">
//               <div className="flex items-center space-x-2">
//                 <FaSun className="text-[#FE7A3A]" />
//                 <span>Dark Mode</span>
//               </div>
//               <Switch
//                 checked={darkMode}
//                 onChange={setDarkMode}
//                 className={`${
//                   darkMode ? "bg-green-500" : "bg-gray-300"
//                 } relative inline-flex h-6 w-11 items-center rounded-full`}
//               >
//                 <span className="sr-only">Enable Dark Mode</span>
//                 <span
//                   className={`${
//                     darkMode ? "translate-x-6" : "translate-x-1"
//                   } inline-block h-4 w-4 transform bg-white rounded-full`}
//                 />
//               </Switch>
//             </div>

//             <div className="flex items-center justify-between mt-3 ml-2">
//               <div className="flex items-center space-x-2">
//                 <FaBell className="text-[#FE7A3A]" />
//                 <span>Notifications</span>
//               </div>
//               <Switch
//                 checked={notifications}
//                 onChange={setNotifications}
//                 className={`${
//                   notifications ? "bg-green-500" : "bg-gray-300"
//                 } relative inline-flex h-6 w-11 items-center rounded-full`}
//               >
//                 <span className="sr-only">Enable Notifications</span>
//                 <span
//                   className={`${
//                     notifications ? "translate-x-6" : "translate-x-1"
//                   } inline-block h-4 w-4 transform bg-white rounded-full`}
//                 />
//               </Switch>
//             </div>
//             {/* <LogOut /> */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Header;

// components/Dashboard/Header.jsx
import { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaUser, FaStore, FaBriefcase, FaQuestionCircle, FaGift, FaSun, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-toastify";
import LogOut from "../Authentication/LogOut"; // Adjust path if LogOut is in a different directory

// Accept props for sidebar state management
function Header({ isSideMenuOpen, setIsSideMenuOpen }) { // <--- Added these props
  const [isDealsHovered, setIsDealsHovered] = useState(false);
  const [isActivityHovered, setIsActivityHovered] = useState(false);
  // isSideMenuOpen state is now managed by the parent Layout component
  const [isApproved, setIsApproved] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const navigate = useNavigate();

  let dealsTimeout;
  let activityTimeout;

  const fetchKYCStatus = async () => {
    const vendorId = localStorage.getItem("vendor_id");
    if (!vendorId) {
      console.warn("No vendor ID found in localStorage. Cannot fetch KYC status.");
      setIsApproved(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.upswap.app/api/vendor/status/${vendorId}/`
      );
      const updatedStatus = response.data.is_approved;
      setIsApproved(updatedStatus);
    } catch (error) {
      console.error("Failed to fetch KYC status", error);
      setIsApproved(false);
      toast.error("Failed to load KYC status.");
    }
  };

  useEffect(() => {
    fetchKYCStatus();
    const interval = setInterval(fetchKYCStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDealsMouseEnter = () => { /* ... (same as before) ... */ };
  const handleDealsMouseLeave = () => { /* ... (same as before) ... */ };
  const handleActivityMouseEnter = () => { /* ... (same as before) ... */ };
  const handleActivityMouseLeave = () => { /* ... (same as before) ... */ };
  const handleActivityClick = (type) => { /* ... (same as before) ... */ };
  const handleDealClick = (type) => { /* ... (same as before) ... */ };

  const handleSideMenuItemClick = async (route, title) => {
    setIsSideMenuOpen(false); // Close side menu on item click
    const vendorId = localStorage.getItem("vendor_id");

    if (title === "My Business Account") {
      if (!vendorId) {
        console.error("No vendor ID found.");
        toast.error("Please log in to view business account details.");
        return;
      }
      try {
        const response = await axios.get(
          `https://api.upswap.app/api/vendor/details/${vendorId}/`
        );
        const vendorDetails = response.data;
        localStorage.setItem("vendor_details", JSON.stringify(vendorDetails));
        navigate(route);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        toast.error("Failed to load business account details.");
      }
    } else {
      navigate(route);
    }
  };

  const sideMenuItems = [
    {
      icon: <FaUser />,
      title: "My Personal Account",
      subtitle: "Account Settings and orders",
      route: "/MyPersonalAccount",
    },
    {
      icon: <FaStore />,
      title: "Explore Nearby Vendors",
      subtitle: "Explore and save local favourite vendors",
      route: "/DealsPage",
    },
    {
      icon: <FaBriefcase />,
      title: "My Business Account",
      subtitle: "Complete your profile for posting deals",
      route: "/BasicInfo",
      showKycStatus: true,
    },
    {
      icon: <FaQuestionCircle />,
      title: "Help Center",
      subtitle: "Contact Us, Report, tutorials & more",
      route: "/MyActivities/All", // Changed to a specific route that exists
    },
    {
      icon: <FaGift />,
      title: "Refer a Friend",
      subtitle: "Earn rewards for inviting friends",
      route: "/UpswapVendors",
    },
  ];

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
            onClick={() => setIsSideMenuOpen(true)} // Uses the setter from props
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* Side Menu Drawer */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-50 rounded-t-xl"
          onClick={() => setIsSideMenuOpen(false)} // Uses the setter from props
        >
         {/* rounded-s-sm */}
          <div
            className="fixed top-0 right-0 w-[260px] h-full bg-slate-100  shadow-lg p-4 overflow-y-auto" // Set explicit width
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-1 rounded-md shadow-md mb-4">
              <h2 className="font-semibold flex justify-center items-center px-6 py-6 rounded-lg">
                <img
                  src="/upswap.png"
                  alt="logo"
                  className="w-32 h-12 object-cover rounded-lg"
                />
              </h2>
            </div>

            {/* <button
              className="text-md mb-4 text-gray-700 hover:text-red-500"
              onClick={() => setIsSideMenuOpen(false)}
            >
              {/* × */}
               {/* ✖  */}
            {/* </button> */} 
            <div className="flex justify-end"> {/* Added flex and justify-end */}
          <button
            className="hover:text-red-500" // Changed text-md to text-xl for a slightly larger 'X'
            onClick={() => setIsSideMenuOpen(false)}
          >
            ✖
          </button>
        </div>

            {isApproved === false && (
              <div className="bg-yellow-100 text-yellow-800 p-2 text-center rounded-md mt-4 mx-2">
                Your KYC Approval is revoked. Please wait for approval.
              </div>
            )}

            <h3 className="text-[#FE7A3A] font-semibold mt-6 ml-2">Main Menu</h3>
            <ul className="space-y-2 mt-4">
              {sideMenuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSideMenuItemClick(item.route, item.title)}
                    className="flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-slate-200"
                  >
                    <span className="text-[#FE7A3A] text-xl mr-3">{item.icon}</span>
                    <div className="flex flex-col items-start">
                      <h3 className="font-semibold text-black flex items-center gap-2">
                        {item.title}
                      </h3>
                      {item.showKycStatus && isApproved !== null && (
                        <span
                          className={`text-xs font-semibold mt-1 ${
                            isApproved ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isApproved ? "✅ Approved" : "❌ In Review"}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-[#FE7A3A] font-semibold mt-6 ml-2">Settings</h3>

            <div className="flex items-center justify-between mt-3 ml-2">
              <div className="flex items-center space-x-2">
                <FaSun className="text-[#FE7A3A]" />
                <span>Dark Mode</span>
              </div>
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={`${
                  darkMode ? "bg-green-500" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable Dark Mode</span>
                <span
                  className={`${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between mt-3 ml-2">
              <div className="flex items-center space-x-2">
                <FaBell className="text-[#FE7A3A]" />
                <span>Notifications</span>
              </div>
              <Switch
                checked={notifications}
                onChange={setNotifications}
                className={`${
                  notifications ? "bg-green-500" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable Notifications</span>
                <span
                  className={`${
                    notifications ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform bg-white rounded-full`}
                />
              </Switch>
            </div>
            <LogOut />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
// import { useState, useEffect } from "react";
// import { FaChevronDown, FaBars, FaUser, FaStore, FaBriefcase, FaQuestionCircle, FaGift, FaSun, FaBell } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Switch } from "@headlessui/react";
// import axios from "axios";
// // import LogOut from "./LogOut"; // Make sure to adjust the import path

// export default function Header() {
//   const [isDealsHovered, setIsDealsHovered] = useState(false);
//   const [isActivityHovered, setIsActivityHovered] = useState(false);
//   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
//   const [isApproved, setIsApproved] = useState(null);
//   const navigate = useNavigate();

//   let dealsTimeout;
//   let activityTimeout;

//   const handleDealsMouseEnter = () => {
//     clearTimeout(dealsTimeout);
//     setIsDealsHovered(true);
//   };

//   const handleDealsMouseLeave = () => {
//     dealsTimeout = setTimeout(() => {
//       setIsDealsHovered(false);
//     }, 200);
//   };

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
//     else if (type === "Scheduled Activities") navigate("/MyActivities/Scheduled");
//     else if (type === "History") navigate("/MyActivities/History");
//   };

//   const fetchKYCStatus = async () => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/vendor/status/${vendorId}/`
//       );
//       setIsApproved(response.data.is_approved);
//     } catch (error) {
//       console.error("Failed to fetch KYC status", error);
//     }
//   };

//   useEffect(() => {
//     fetchKYCStatus();
//     const interval = setInterval(fetchKYCStatus, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const menuItems = [
//     {
//       icon: <FaUser />,
//       title: "My Personal Account",
//       route: "/MyPersonalAccount",
//     },
//     {
//       icon: <FaStore />,
//       title: "Explore Nearby Vendors",
//       route: "/DealsPage",
//     },
//     {
//       icon: <FaBriefcase />,
//       title: "My Business Account",
//       route: "/BasicInfo",
//     },
//     {
//       icon: <FaQuestionCircle />,
//       title: "Help Center",
//       route: "/MyActivities",
//     },
//     {
//       icon: <FaGift />,
//       title: "Refer a Friend",
//       route: "/UpswapVendors",
//     },
//   ];

//   return (
//     <div>
//       {/* Header Top Bar */}
//       <div className="flex justify-between items-center p-4 bg-white shadow">
//         <h1 className="text-xl font-bold">Your App Header</h1>
//         <FaBars
//           className="text-2xl cursor-pointer"
//           onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
//         />
//       </div>

//       {/* SideMenu Component */}
//       {isSideMenuOpen && (
//         <SideMenu
//           isApproved={isApproved}
//           menuItems={menuItems}
//           navigate={navigate}
//           closeMenu={() => setIsSideMenuOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// const SideMenu = ({ isApproved, menuItems, navigate, closeMenu }) => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);

//   return (
//     <div className="fixed left-0 top-0 w-[260px] h-screen bg-slate-100 shadow-lg z-50 overflow-y-auto">
//       <div className="bg-white p-1 rounded-md shadow-md flex justify-between items-center">
//         <h2 className="font-semibold flex justify-center items-center px-6 py-6">
//           <img
//             src="/upswap.png"
//             alt="logo"
//             className="w-32 h-12 object-cover rounded-lg"
//           />
//         </h2>
//         <button
//           onClick={closeMenu}
//           className="text-xl px-4 py-2 hover:text-red-500"
//         >
//           ✖
//         </button>
//       </div>

//       {/* KYC Status Notice */}
//       {isApproved === false && (
//         <div className="bg-yellow-100 text-yellow-800 p-2 text-center rounded-md mt-4 mx-4">
//           Your KYC Approval is revoked. Please wait for approval.
//         </div>
//       )}

//       <div className="text-left ml-4 mt-4 text-[#FE7A3A] font-semibold">
//         Main Menu
//       </div>

//       <div className="mt-4 space-y-2">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between bg-white w-[240px] mx-auto p-3 rounded-lg shadow-sm border cursor-pointer"
//             onClick={() => {
//               navigate(item.route);
//               closeMenu();
//             }}
//           >
//             <div className="flex items-center space-x-3">
//               <span className="text-[#FE7A3A] text-xl">{item.icon}</span>
//               <div>
//                 <h3 className="font-semibold text-black">
//                   {item.title}
//                 </h3>
//               </div>
//             </div>
//             {item.title === "My Business Account" && isApproved && (
//               <span className="text-green-600 text-sm font-semibold">
//                 ✅ Approved
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Settings Section */}
//       <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-[240px] mx-auto">
//         <h3 className="text-[#FE7A3A] font-semibold">Settings</h3>

//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center space-x-2">
//             <FaSun className="text-[#FE7A3A]" />
//             <span>Dark Mode</span>
//           </div>
//           <Switch
//             checked={darkMode}
//             onChange={setDarkMode}
//             className={`${
//               darkMode ? "bg-green-500" : "bg-gray-300"
//             } relative inline-flex h-6 w-11 items-center rounded-full`}
//           >
//             <span className="sr-only">Enable Dark Mode</span>
//             <span
//               className={`${
//                 darkMode ? "translate-x-6" : "translate-x-1"
//               } inline-block h-4 w-4 transform bg-white rounded-full`}
//             />
//           </Switch>
//         </div>

//         <div className="flex items-center justify-between mt-3">
//           <div className="flex items-center space-x-2">
//             <FaBell className="text-[#FE7A3A]" />
//             <span>Notifications</span>
//           </div>
//           <Switch
//             checked={notifications}
//             onChange={setNotifications}
//             className={`${
//               notifications ? "bg-green-500" : "bg-gray-300"
//             } relative inline-flex h-6 w-11 items-center rounded-full`}
//           >
//             <span className="sr-only">Enable Notifications</span>
//             <span
//               className={`${
//                 notifications ? "translate-x-6" : "translate-x-1"
//               } inline-block h-4 w-4 transform bg-white rounded-full`}
//             />
//           </Switch>
//         </div>
//       </div>

//       {/* <LogOut /> */}
//     </div>
//   );
// };
