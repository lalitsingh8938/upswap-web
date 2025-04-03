import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const activities = [
  {
    id: 1,
    title: "Tournament Cricket",
    postedBy: "Gtmkrishna2468",
    location: "Vrindavan, Uttar Pradesh",
    distance: "0.17 km away",
    image: "WhatsApp Image 2025-03-18 at 15.28.47_c4dda71e.jpg",
    timeLeft: "24:00:06:43",
  },
  {
    id: 2,
    title: "Chess Master League",
    postedBy: "Gtmkrishna2468",
    location: "Vrindavan, Uttar Pradesh",
    distance: "1.29 km away",
    image: "WhatsApp Image 2025-03-18 at 15.29.09_61554ddd.jpg",
    timeLeft: "36519:23:31:43",
  },
  {
    id: 3,
    title: "Omaxe Hiring",
    postedBy: "Gtmkrishna2468",
    location: "Vrindavan, Uttar Pradesh",
    distance: "1.29 km away",
    image: "WhatsApp Image 2025-03-18 at 15.37.03_28b784cc.jpg",
    timeLeft: "36519:00:36:43",
  },
  {
    id: 4,
    title: "Hiring IT Solutions",
    postedBy: "Gtmkrishna2468",
    location: "Vrindavan, Uttar Pradesh",
    distance: "1.29 km away",
    image: "WhatsApp Image 2025-03-18 at 15.28.47_c4dda71e.jpg",
    timeLeft: "36519:12:10:30",
  },
  {
    id: 5,
    title: "Event 5",
    postedBy: "User123",
    location: "Delhi, India",
    distance: "2.5 km away",
    image: "WhatsApp Image 2025-03-18 at 15.29.09_61554ddd.jpg",
    timeLeft: "10:15:30:20",
  },
  {
    id: 6,
    title: "Event 6",
    postedBy: "User456",
    location: "Mumbai, India",
    distance: "3.1 km away",
    image: "WhatsApp Image 2025-03-18 at 15.37.03_28b784cc.jpg",
    timeLeft: "5:12:45:10",
  },
  {
    id: 7,
    title: "Event 7",
    postedBy: "User789",
    location: "Bangalore, India",
    distance: "4.0 km away",
    image: "WhatsApp Image 2025-03-18 at 15.28.47_c4dda71e.jpg",
    timeLeft: "20:10:05:30",
  },
  {
    id: 8,
    title: "Event 8",
    postedBy: "User999",
    location: "Kolkata, India",
    distance: "5.2 km away",
    image: "WhatsApp Image 2025-03-18 at 15.29.09_61554ddd.jpg",
    timeLeft: "30:20:15:40",
  },
  {
    id: 9,
    title: "Event 9",
    postedBy: "User000",
    location: "Chennai, India",
    distance: "6.7 km away",
    image: "WhatsApp Image 2025-03-18 at 15.37.03_28b784cc.jpg",
    timeLeft: "15:30:25:20",
  },
  {
    id: 10,
    title: "Event 10",
    postedBy: "UserABC",
    location: "Hyderabad, India",
    distance: "7.8 km away",
    image: "WhatsApp Image 2025-03-18 at 15.28.47_c4dda71e.jpg",
    timeLeft: "25:40:35:10",
  },
  {
    id: 11,
    title: "Event 11",
    postedBy: "UserXYZ",
    location: "Pune, India",
    distance: "8.9 km away",
    image: "WhatsApp Image 2025-03-18 at 15.29.09_61554ddd.jpg",
    timeLeft: "12:25:10:15",
  },
  {
    id: 12,
    title: "Event 12",
    postedBy: "UserMNO",
    location: "Ahmedabad, India",
    distance: "9.0 km away",
    image: "WhatsApp Image 2025-03-18 at 15.37.03_28b784cc.jpg",
    timeLeft: "18:55:20:05",
  },
];

const convertToSeconds = (timeStr) => {
  const [days, hours, minutes, seconds] = timeStr.split(":").map(Number);
  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
};

const formatTime = (seconds) => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${d}d ${h}h ${m}m ${s}s`;
};

const ActivityCard = ({ activity }) => {
  const [timeLeft, setTimeLeft] = useState(convertToSeconds(activity.timeLeft));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src={activity.image}
        alt={activity.title}
        className="w-full h-32 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{activity.title}</h2>
      <p className="text-sm text-gray-600">
        Posted by: <span className="text-orange-500">{activity.postedBy}</span>
      </p>
      <p className="text-sm text-gray-600">
        {activity.location} ({activity.distance})
      </p>
      <div className="mt-2 bg-orange-500 text-white px-3 py-1 rounded-md text-sm text-center">
        Activity valid till: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate(); // Initialize navigate
  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="flex justify-around bg-white py-2 border-b">
        <button
          className="text-gray-400 border-gray-400 px-4 py-2"
          onClick={() => navigate("/DealsPage")}
        >
          Deals
        </button>
        <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
          Activities
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default App;
