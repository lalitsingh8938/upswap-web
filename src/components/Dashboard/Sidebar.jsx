// import React, { useState } from "react";
// import { Switch } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaStore, FaBriefcase, FaQuestionCircle, FaGift, FaSun, FaBell, FaSignOutAlt } from "react-icons/fa";

// export default function MainMenu() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);
//   const navigate = useNavigate();

//   const menuItems = [
//     { icon: <FaUser />, title: "My Personal Account", subtitle: "Account Settings and orders", route: "/MyPersonalAccount" },
//     { icon: <FaStore />, title: "Explore Nearby Vendors", subtitle: "Explore and save local favourite vendors" },
//     { icon: <FaBriefcase />, title: "My Business Account", subtitle: "Complete your profile for posting deals", route: "/MyActivities", approved: true },
//     { icon: <FaQuestionCircle />, title: "Help Center", subtitle: "Contact Us, Report, tutorials & more" },
//     { icon: <FaGift />, title: "Refer a Friend", subtitle: "Earn rewards for inviting friends" },
//   ];

//   return (
//     <div className="min-h-screen flex items-center bg-gray-100 ">
//       <div className="fixed left-0 top-0 w-1/5 h-screen bg-white overflow-y-auto">
//         <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center p-1 rounded-md shadow-md">
//           <h2 className="text-xl font-semibold py-6">Main Menu</h2>
//         </div>

//         <div className="mt-16 space-y-3">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border cursor-pointer"
//               onClick={() => item.route && navigate(item.route)} // Navigation Logic
//             >
//               <div className="flex items-center space-x-3">
//                 <span className="text-orange-500 text-xl">{item.icon}</span>
//                 <div>
//                   <h3 className="font-semibold text-orange-500">{item.title}</h3>
//                   <p className="text-gray-500 text-sm">{item.subtitle}</p>
//                 </div>
//               </div>
//               {item.approved && <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">Approved</span>}
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
//           <h3 className="text-orange-500 font-semibold">Settings</h3>
//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center space-x-2">
//               <FaSun className="text-orange-500" />
//               <span>Dark Mode</span>
//             </div>
//             <Switch checked={darkMode} onChange={setDarkMode} className={`${darkMode ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}>
//               <span className="sr-only">Enable Dark Mode</span>
//               <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full`} />
//             </Switch>
//           </div>

//           <div className="flex items-center justify-between mt-3">
//             <div className="flex items-center space-x-2">
//               <FaBell className="text-orange-500" />
//               <span>Notifications</span>
//             </div>
//             <Switch checked={notifications} onChange={setNotifications} className={`${notifications ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}>
//               <span className="sr-only">Enable Notifications</span>
//               <span className={`${notifications ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full`} />
//             </Switch>
//           </div>
//         </div>
        
//         <button className="w-full mt-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold flex items-center justify-center space-x-2">
//           <FaSignOutAlt /> <span>Log Out</span>
//         </button>
//       </div>
//     </div>
//   );
// }








import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaStore, FaBriefcase, FaQuestionCircle, FaGift, FaSun, FaBell } from "react-icons/fa";
import LogOut from "../Authentication/LogOut";


export default function MainMenu() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaUser />, title: "My Personal Account", subtitle: "Account Settings and orders", route: "/MyPersonalAccount" },
    { icon: <FaStore />, title: "Explore Nearby Vendors", subtitle: "Explore and save local favourite vendors" },
    { icon: <FaBriefcase />, title: "My Business Account", subtitle: "Complete your profile for posting deals", route: "/MyActivities", approved: true },
    { icon: <FaQuestionCircle />, title: "Help Center", subtitle: "Contact Us, Report, tutorials & more" },
    { icon: <FaGift />, title: "Refer a Friend", subtitle: "Earn rewards for inviting friends" },
  ];

  return (
    <div className="min-h-screen flex items-center bg-gray-100 ">
      <div className="fixed left-0 top-0 w-1/5 h-screen bg-white overflow-y-auto">
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center p-1 rounded-md shadow-md">
          <h2 className="text-xl font-semibold py-6">Main Menu</h2>
        </div>

        <div className="mt-16 space-y-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border cursor-pointer"
              onClick={() => item.route && navigate(item.route)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-orange-500 text-xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-orange-500">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.subtitle}</p>
                </div>
              </div>
              {item.approved && <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">Approved</span>}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-orange-500 font-semibold">Settings</h3>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <FaSun className="text-orange-500" />
              <span>Dark Mode</span>
            </div>
            <Switch checked={darkMode} onChange={setDarkMode} className={`${darkMode ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}>
              <span className="sr-only">Enable Dark Mode</span>
              <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full`} />
            </Switch>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <FaBell className="text-orange-500" />
              <span>Notifications</span>
            </div>
            <Switch checked={notifications} onChange={setNotifications} className={`${notifications ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}>
              <span className="sr-only">Enable Notifications</span>
              <span className={`${notifications ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full`} />
            </Switch>
          </div>
        </div>

        {/* Logout Button Integrated */}
        <LogOut />
        
      </div>
    </div>
  );
}





// import React, { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";

// export default function Sidebar() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 1024) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div>
//       {!isSidebarOpen && (
//         <button onClick={() => setIsSidebarOpen(true)} className="fixed left-4 top-4 z-50 p-2 bg-orange-500 text-white rounded-full shadow-md">
//           <FaBars size={24} />
//         </button>
//       )}

//       {isSidebarOpen && (
//         <div className="fixed left-0 top-0 w-1/5 h-screen bg-white transition-all duration-300 ease-in-out">
//           <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center p-4 shadow-md relative">
//             <h2 className="text-xl font-semibold">Main Menu</h2>
//             <button onClick={() => setIsSidebarOpen(false)} className="absolute right-4 top-4 text-white">
//               <FaTimes size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { Switch } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaStore, FaBriefcase, FaQuestionCircle, FaGift, FaSun, FaBell, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

// export default function MainMenu() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 1024) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const menuItems = [
//     { icon: <FaUser />, title: "My Personal Account", subtitle: "Account Settings and orders", route: "/MyPersonalAccount" },
//     { icon: <FaStore />, title: "Explore Nearby Vendors", subtitle: "Explore and save local favourite vendors" },
//     { icon: <FaBriefcase />, title: "My Business Account", subtitle: "Complete your profile for posting deals", route: "/MyActivities", approved: true },
//     { icon: <FaQuestionCircle />, title: "Help Center", subtitle: "Contact Us, Report, tutorials & more" },
//     { icon: <FaGift />, title: "Refer a Friend", subtitle: "Earn rewards for inviting friends" },
//   ];

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar Toggle Button */}
//       {!isSidebarOpen && (
//         <button onClick={() => setIsSidebarOpen(true)} className="fixed left-4 top-4 z-50 p-2 bg-orange-500 text-white rounded-full shadow-md">
//           <FaBars size={24} />
//         </button>
//       )}
      
//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <div className="fixed left-0 top-0 w-1/5 h-screen bg-white overflow-y-auto transition-all duration-300 ease-in-out">
//           <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center p-1 rounded-md shadow-md relative">
//             <h2 className="text-xl font-semibold py-6">Main Menu</h2>
//             {/* Close Sidebar Button */}
//             <button onClick={() => setIsSidebarOpen(false)} className="absolute right-4 top-4 text-white">
//               <FaTimes size={20} />
//             </button>
//           </div>

//           <div className="mt-16 space-y-3">
//             {menuItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border cursor-pointer"
//                 onClick={() => item.route && navigate(item.route)}
//               >
//                 <div className="flex items-center space-x-3">
//                   <span className="text-orange-500 text-xl">{item.icon}</span>
//                   <div>
//                     <h3 className="font-semibold text-orange-500">{item.title}</h3>
//                     <p className="text-gray-500 text-sm">{item.subtitle}</p>
//                   </div>
//                 </div>
//                 {item.approved && <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">Approved</span>}
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-orange-500 font-semibold">Settings</h3>
//             <div className="flex items-center justify-between mt-3">
//               <div className="flex items-center space-x-2">
//                 <FaSun className="text-orange-500" />
//                 <span>Dark Mode</span>
//               </div>
//               <Switch checked={darkMode} onChange={setDarkMode} className={`${darkMode ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}>
//                 <span className="sr-only">Enable Dark Mode</span>
//                 <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full`} />
//               </Switch>
//             </div>

//             <div className="flex items-center justify-between mt-3">
//               <div className="flex items-center space-x-2">
//                 <FaBell className="text-orange-500" />
//                 <span>Notifications</span>
//               </div>
//               <Switch checked={notifications} onChange={setNotifications} className={`${notifications ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}>
//                 <span className="sr-only">Enable Notifications</span>
//                 <span className={`${notifications ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full`} />
//               </Switch>
//             </div>
//           </div>

//           <button className="w-full mt-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold flex items-center justify-center space-x-2">
//             <FaSignOutAlt /> <span>Log Out</span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
