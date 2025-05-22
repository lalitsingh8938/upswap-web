// import React, { useState, useEffect } from "react";
// import { Switch } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaUser,
//   FaStore,
//   FaBriefcase,
//   FaQuestionCircle,
//   FaGift,
//   FaSun,
//   FaBell,
// } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa";
// import LogOut from "../Authentication/LogOut";

// export default function MainMenu() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);
//   const [isApproved, setIsApproved] = useState();
//   // localStorage.getItem("is_approved") === "true"

//   const navigate = useNavigate();

//   const fetchKYCStatus = async () => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/vendor/status/${vendorId}/`
//       );
//       const updatedStatus = response.data.is_approved;
//       setIsApproved(updatedStatus);
//       // localStorage.setItem("is_approved", updatedStatus); // Sync localStorage
//     } catch (error) {
//       console.error("Failed to fetch KYC status", error);
//     }
//   };

//   useEffect(() => {
//     fetchKYCStatus(); // Initial fetch
//     const interval = setInterval(fetchKYCStatus, 5000); // Auto-poll
//     return () => clearInterval(interval); // Cleanup
//   }, []);

//   const menuItems = [
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
//       approved: true,
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
//   // bg-gradient-to-b from-orange-100
//   return (
//     <div className="min-h-screen flex items-center bg-green-500">
//       <div className="fixed left-0 top-0 w-[260px] h-screen bg-slate-100 to-white overflow-y-auto">
//         <div className="bg-slate-100 p-1 rounded-md shadow-md">
//           <h2 className="font-semibold flex justify-center items-center px-6 py-6 rounded-lg">
//             <img
//               src="/upswap.png"
//               alt="logo"
//               className="w-32 h-12 object-cover rounded-lg"
//             />
//           </h2>
//         </div>

//         {/* ✅ Show warning at top ONLY when isApproved is false */}
//         {!isApproved && (
//           <div className="bg-yellow-100 text-yellow-800 p-2 text-center rounded-md mt-4 mx-4">
//             Your KYC Approval is revoked. Please waiting for Approval
//           </div>
//         )}

//         {/* All Menu Items and Settings grouped together */}
//         <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-[257px]">
//           <h3 className="text-[#FE7A3A] font-semibold">Main Menu</h3>
//           <div className="space-y-2 mt-4">
//             {menuItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center w-full p-2 rounded-lg cursor-pointer"
//                 onClick={() => item.route && navigate(item.route)}
//               >
//                 <div className="flex items-center space-x-3">
//                   <span className="text-[#FE7A3A] text-xl">{item.icon}</span>
//                   <div className="flex flex-col">
//                     <h3 className="font-semibold text-black flex items-center gap-2">
//                       {item.title}
//                     </h3>
//                     {item.title === "My Business Account" && isApproved && (
//                       <span className="text-green-600 text-xs font-semibold mt-1">
//                         ✅ Approved
//                       </span>
//                     )}
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>

//           <h3 className="text-[#FE7A3A] font-semibold mt-6">Settings</h3>

//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center space-x-2">
//               <FaSun className="text-[#FE7A3A]" />
//               <span>Dark Mode</span>
//             </div>
//             <Switch
//               checked={darkMode}
//               onChange={setDarkMode}
//               className={`${
//                 darkMode ? "bg-green-500" : "bg-gray-300"
//               } relative inline-flex h-6 w-11 items-center rounded-full`}
//             >
//               <span className="sr-only">Enable Dark Mode</span>
//               <span
//                 className={`${
//                   darkMode ? "translate-x-6" : "translate-x-1"
//                 } inline-block h-4 w-4 transform bg-white rounded-full`}
//               />
//             </Switch>
//           </div>

//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center space-x-2">
//               <FaBell className="text-[#FE7A3A]" />
//               <span>Notifications</span>
//             </div>
//             <Switch
//               checked={notifications}
//               onChange={setNotifications}
//               className={`${
//                 notifications ? "bg-green-500" : "bg-gray-300"
//               } relative inline-flex h-6 w-11 items-center rounded-full`}
//             >
//               <span className="sr-only">Enable Notifications</span>
//               <span
//                 className={`${
//                   notifications ? "translate-x-6" : "translate-x-1"
//                 } inline-block h-4 w-4 transform bg-white rounded-full`}
//               />
//             </Switch>
//           </div>
//         </div>
//         <LogOut />

//         {/* Logout Button */}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaStore,
  FaBriefcase,
  FaQuestionCircle,
  FaGift,
  FaSun,
  FaBell,
} from "react-icons/fa";
import LogOut from "../Authentication/LogOut";

export default function MainMenu() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isApproved, setIsApproved] = useState();

  const navigate = useNavigate();

  const fetchKYCStatus = async () => {
    const vendorId = localStorage.getItem("vendor_id");
    if (!vendorId) return;

   try {
      const response = await axios.get(
        `https://api.upswap.app/api/vendor/status/${vendorId}/`

      );
      const updatedStatus = response.data.is_approved;
      setIsApproved(updatedStatus);
    } catch (error) {
      console.error("Failed to fetch KYC status", error);
    }
  // try {
  //   const res = await axios.get("https://api.upswap.app/api/vendor/status/${vendorId}/", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access")}`,
  //     },
  //   });
  //   console.log("KYC status:", res.data);
  // } catch (error) {
  //   console.error("KYC API Error:", error.response?.data || error.message);
  // }

  };

  useEffect(() => {
    fetchKYCStatus(); // Initial fetch
    const interval = setInterval(fetchKYCStatus, 20000); // Auto-poll
    return () => clearInterval(interval); // Cleanup
  }, []);

  const menuItems = [
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
      approved: true,
    },
    {
      icon: <FaQuestionCircle />,
      title: "Help Center",
      subtitle: "Contact Us, Report, tutorials & more",
      route: "/MyActivities",
    },
    {
      icon: <FaGift />,
      title: "Refer a Friend",
      subtitle: "Earn rewards for inviting friends",
      route: "/UpswapVendors",
    },
  ];

  const handleEditClick = (e, route) => {
    e.stopPropagation(); // Prevent triggering parent div click
    navigate(route);
  };

  return (
    <div className="min-h-screen flex items-center bg-green-500">
      <div className="fixed left-0 top-0 w-[260px] h-screen bg-slate-100 to-white overflow-y-auto">
        <div className="bg-slate-100 p-1 rounded-md shadow-md">
          <h2 className="font-semibold flex justify-center items-center px-6 py-6 rounded-lg">
            <img
              src="/upswap.png"
              alt="logo"
              className="w-32 h-12 object-cover rounded-lg"
            />
          </h2>
        </div>

        {!isApproved && (
          <div className="bg-yellow-100 text-yellow-800 p-2 text-center rounded-md mt-4 mx-4">
            Your KYC Approval is revoked. Please wait for approval.
          </div>
        )}

        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-[257px]">
          <h3 className="text-[#FE7A3A] font-semibold">Main Menu</h3>
          <div className="space-y-2 mt-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-slate-100"
                onClick={() => item.route && navigate(item.route)}
              >
                <div className="flex items-center space-x-3 w-full justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-[#FE7A3A] text-xl">{item.icon}</span>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-black flex items-center gap-2">
                        {item.title}
                      </h3>
                      {item.title === "My Business Account" && isApproved && (
                        <span className="text-green-600 text-xs font-semibold mt-1">
                          ✅ Approved
                        </span>
                      )}
                    </div>
                  </div>
                  {item.title === "My Business Account" && (
                    <button
                      onClick={(e) => handleEditClick(e, item.route)}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      ✏️ Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-[#FE7A3A] font-semibold mt-6">Settings</h3>

          <div className="flex items-center justify-between mt-3">
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

          <div className="flex items-center justify-between mt-3">
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
        </div>

        {/* Logout Button */}
        <LogOut />
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { Switch } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaUser,
//   FaStore,
//   FaBriefcase,
//   FaQuestionCircle,
//   FaGift,
//   FaSun,
//   FaBell,
// } from "react-icons/fa";
// import LogOut from "../Authentication/LogOut";

// export default function MainMenu() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);
//   const [isApproved, setIsApproved] = useState();

//   const navigate = useNavigate();

//   const fetchKYCStatus = async () => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/vendor/status/${vendorId}/`
//       );
//       const updatedStatus = response.data.is_approved;
//       setIsApproved(updatedStatus);
//       // const updatedStatus =
//       //   response.data.is_approved === true ||
//       //   response.data.is_approved === "true";
//       // setIsApproved(updatedStatus);
//       // console.log("KYC Status Raw Response:", response.data.is_approved);
//       // console.log("KYC Status Processed:", updatedStatus);
//     } catch (error) {
//       console.error("Failed to fetch KYC status", error);
//     }
//   };

//   useEffect(() => {
//     fetchKYCStatus();
//     const interval = setInterval(fetchKYCStatus, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleEditClick = async (e, route) => {
//     e.stopPropagation();
//     const vendorId = localStorage.getItem("vendor_id");

//     if (!vendorId) {
//       console.error("No vendor ID found.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/vendor/details/${vendorId}/`
//       );

//       const vendorDetails = response.data;
//       localStorage.setItem("vendor_details", JSON.stringify(vendorDetails));
//       navigate(route);
//     } catch (error) {
//       console.error("Error fetching vendor details:", error);
//       alert("Failed to load business account details.");
//     }
//   };

//   const menuItems = [
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
//       approved: true,
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
//     <div className="min-h-screen flex items-center bg-green-500">
//       <div className="fixed left-0 top-0 w-[260px] h-screen bg-slate-100 to-white overflow-y-auto">
//         <div className="bg-slate-100 p-1 rounded-md shadow-md">
//           <h2 className="font-semibold flex justify-center items-center px-6 py-6 rounded-lg">
//             <img
//               src="/upswap.png"
//               alt="logo"
//               className="w-32 h-12 object-cover rounded-lg"
//             />
//           </h2>
//         </div>

//         {!isApproved && (
//           <div className="bg-yellow-100 text-yellow-800 p-2 text-center rounded-md mt-4 mx-4">
//             Your KYC Approval is revoked. Please wait for approval.
//           </div>
//         )}

//         <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-[257px]">
//           <h3 className="text-[#FE7A3A] font-semibold">Main Menu</h3>
//           <div className="space-y-2 mt-4">
//             {menuItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-slate-100"
//                 onClick={() => item.route && navigate(item.route)}
//               >
//                 <div className="flex items-center space-x-3 w-full justify-between">
//                   <div className="flex items-center space-x-3">
//                     <span className="text-[#FE7A3A] text-xl">{item.icon}</span>
//                     <div className="flex flex-col">
//                       <h3 className="font-semibold text-black flex items-center gap-2">
//                         {item.title}
//                       </h3>
//                       {item.title === "My Business Account" && isApproved && (
//                         <span className="text-green-600 text-xs font-semibold mt-1">
//                           ✅ Approved
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                   {item.title === "My Business Account" && (
//                     <button
//                       onClick={(e) => handleEditClick(e, item.route)}
//                       className="text-sm text-blue-500 hover:underline"
//                     >
//                       ✏️ Edit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <h3 className="text-[#FE7A3A] font-semibold mt-6">Settings</h3>

//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center space-x-2">
//               <FaSun className="text-[#FE7A3A]" />
//               <span>Dark Mode</span>
//             </div>
//             <Switch
//               checked={darkMode}
//               onChange={setDarkMode}
//               className={`${
//                 darkMode ? "bg-green-500" : "bg-gray-300"
//               } relative inline-flex h-6 w-11 items-center rounded-full`}
//             >
//               <span className="sr-only">Enable Dark Mode</span>
//               <span
//                 className={`${
//                   darkMode ? "translate-x-6" : "translate-x-1"
//                 } inline-block h-4 w-4 transform bg-white rounded-full`}
//               />
//             </Switch>
//           </div>

//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center space-x-2">
//               <FaBell className="text-[#FE7A3A]" />
//               <span>Notifications</span>
//             </div>
//             <Switch
//               checked={notifications}
//               onChange={setNotifications}
//               className={`${
//                 notifications ? "bg-green-500" : "bg-gray-300"
//               } relative inline-flex h-6 w-11 items-center rounded-full`}
//             >
//               <span className="sr-only">Enable Notifications</span>
//               <span
//                 className={`${
//                   notifications ? "translate-x-6" : "translate-x-1"
//                 } inline-block h-4 w-4 transform bg-white rounded-full`}
//               />
//             </Switch>
//           </div>
//         </div>

//         <LogOut />
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { FaSun, FaBell } from "react-icons/fa";
// import { Switch } from "@headlessui/react";
// import LogOut from "./LogOut"; // Make sure to import your LogOut component

// const SideMenu = ({ isApproved, menuItems, navigate }) => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);

//   return (
//     <div className="fixed left-0 top-0 w-[260px] h-screen bg-slate-100 to-white overflow-y-auto">
//       <div className="bg-white p-1 rounded-md shadow-md">
//         <h2 className="font-semibold flex justify-center items-center px-6 py-6 rounded-lg">
//           <img
//             src="upswap.png"
//             alt="logo"
//             className="w-32 h-12 object-cover rounded-lg"
//           />
//         </h2>
//       </div>

//       {/* ✅ Show warning at top ONLY when isApproved is false */}
//       {!isApproved && (
//         <div className="bg-yellow-100 text-yellow-800 p-2 text-center rounded-md mt-4 mx-4">
//           Your KYC Approval is revoked. Please waiting for Approval
//         </div>
//       )}

//       <div className="text-left ml-2">Main Menu</div>

//       <div className="mt-6 space-y-2">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between bg-white w-[260px] p-4 rounded-lg shadow-sm border cursor-pointer"
//             onClick={() => item.route && navigate(item.route)}
//           >
//             <div className="flex items-center space-x-3">
//               <span className="text-[#FE7A3A] text-xl">{item.icon}</span>
//               <div>
//                 <h3 className="font-semibold text-black flex items-center gap-2">
//                   {item.title}
//                 </h3>
//                 {/* <p className="text-gray-500 text-sm">{item.subtitle}</p> */}
//               </div>
//             </div>
//             {item.title === "My Business Account" && isApproved && (
//               <span className="text-green-600 text-sm font-semibold rounded">
//                 ✅Approved
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-[257px]">
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

//       <LogOut />
//     </div>
//   );
// };

// const MainLayout = () => {
//   const [showSideMenu, setShowSideMenu] = useState(true);
//   const [isApproved, setIsApproved] = useState(false); // Example state
//   const [menuItems, setMenuItems] = useState([]); // Your menu items array
//   const navigate = (route) => {}; // Your navigation function

//   return (
//     <div className="min-h-screen flex items-center bg-green-500">
//       {/* Toggle button for side menu */}
//       <button
//         onClick={() => setShowSideMenu(!showSideMenu)}
//         className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
//       >
//         {showSideMenu ? "Hide Menu" : "Show Menu"}
//       </button>

//       {/* Conditionally render SideMenu based on showSideMenu state */}
//       {showSideMenu && (
//         <SideMenu
//           isApproved={isApproved}
//           menuItems={menuItems}
//           navigate={navigate}
//         />
//       )}

//       {/* Your main content goes here */}
//       <div className={`flex-1 ${showSideMenu ? "ml-[260px]" : ""}`}>
//         {/* Main content */}
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
