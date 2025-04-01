import React from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdReorder } from "react-icons/io";

const MyActivity = () => {
  const activities = [
    {
      id: 1,
      type: "History",
      image: "/WhatsApp Image 2025-03-18 at 15.34.42_4222016d.jpg",
      title: "Holi with friends",
      rating: 0,
      description: "Enjoy with colour",
      posted: "2 days ago",
      location: "Omaxe Eternity Vrindavan, Uttar Pradesh",
      distance: "0.17 km away",
      actionText: "Repost Deal",
    },
    {
      id: 2,
      type: "Live",
      image: "/WhatsApp Image 2025-03-18 at 15.36.21_fa412db3.jpg",
      title: "Janmbhumi darshan",
      rating: 0,
      description: "Morning 6 to 1, Evening 4 to 9",
      posted: "3 days ago",
      maxParticipants: 250,
      location: "Janmbhumi temple, Mathura, Uttar Pradesh",
      distance: "7.92 km away",
      actionText: "Deactivate",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-500 p-4 text-white flex justify-between items-center">
        <button className="text-xl">&larr;</button>
        <h2 className="text-lg font-semibold">My Activity</h2>
        <IoMdReorder size={24} />
      </div>

      {/* Search & Filters */}
      <div className="p-4 bg-white">
        <div className="flex items-center bg-gray-200 p-2 rounded-lg">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for activity"
            className="ml-2 w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex justify-around mt-4">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            All 17
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-lg">
            Participation 0
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-lg">Live 12</button>
        </div>
      </div>

      {/* Activities List */}
      <div className="p-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <div className="flex items-center mb-2">
              <span
                className={`px-3 py-1 text-white text-xs rounded-full ${
                  activity.type === "Live" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {activity.type}
              </span>
              <h3 className="ml-2 font-bold">{activity.title}</h3>
            </div>

            {/* Image Section */}
            {activity.image && (
              <div className="flex justify-center">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-36 h-36 object-cover rounded-lg"
                />
              </div>
            )}

            <p className="text-yellow-500">{activity.rating}/5 ★★★★★</p>
            <p className="text-gray-600 text-sm">{activity.description}</p>
            <p className="text-gray-400 text-xs">Posted on: {activity.posted}</p>
            {activity.maxParticipants && (
              <p className="text-red-500 text-sm">
                Max No. of participants: {activity.maxParticipants}
              </p>
            )}
            <p className="flex items-center text-gray-600 text-sm">
              <FaMapMarkerAlt className="text-red-500 mr-1" /> {activity.location} ({activity.distance})
            </p>
            <button className="mt-2 w-full py-2 bg-orange-500 text-white rounded-lg">
              {activity.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyActivity;
