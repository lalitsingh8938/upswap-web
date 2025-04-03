import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex items-center bg-gray-100 ">
      <div className="fixed left-0 top-0 w-1/5 h-screen bg-white overflow-y-auto">
        <div className="bg-[#FE7A3A] text-white text-center p-1 rounded-md shadow-md">
          <h2 className="font-semibold items-center px-6 py-6 rounded-lg">
            Main Menu
          </h2>
        </div>

        <div className="mt-14 space-y-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border cursor-pointer"
              onClick={() => item.route && navigate(item.route)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-orange-500 text-xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-orange-500">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.subtitle}</p>
                </div>
              </div>
              {item.approved && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                  Approved
                </span>
              )}
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
              <FaBell className="text-orange-500" />
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

        {/* Logout Button Integrated */}
        <LogOut />
      </div>
    </div>
  );
}
