import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaUser, FaStore, FaBriefcase, FaQuestionCircle, FaGift, FaSun, FaBell, FaSignOutAlt } from "react-icons/fa";

export default function MainMenu() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const menuItems = [
    { icon: <FaUser />, title: "My Personal Account", subtitle: "Account Settings and orders" },
    { icon: <FaStore />, title: "Explore Nearby Vendors", subtitle: "Explore and save local favourite vendors" },
    { icon: <FaBriefcase />, title: "My Business Account", subtitle: "Complete your profile for posting deals", approved: true },
    { icon: <FaQuestionCircle />, title: "Help Center", subtitle: "Contact Us, Report, tutorials & more" },
    { icon: <FaGift />, title: "Refer a Friend", subtitle: "Earn rewards for inviting friends" },
  ];

  return (
    <div className="min-h-screen flex items-center  bg-gray-100">
  <div className="w-1/4 bg-white p-5 rounded-lg shadow-lg">
    <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white text-center py-5 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-center">Main Menu</h2>
    </div>
    <div className="mt-5 space-y-3">
      {menuItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
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
    <button className="w-full mt-6 py-3 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold flex items-center justify-center space-x-2">
      <FaSignOutAlt /> <span>Log Out</span>
    </button>
  </div>
</div>

  );
}

