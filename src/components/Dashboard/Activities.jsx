// import React from "react";
// import { FaMapMarkerAlt, FaClock, FaStar, FaShare } from "react-icons/fa";

// const activities = [
//   {
//     title: "Morning Yoga Session",
//     postedBy: "Wellness Circle",
//     location: "Lodhi Gardens, Delhi",
//     rating: 4.8,
//     daysLeft: "3 days to go",
//     image: "Image (3).png",
//   },
//   {
//     title: "Photography Walk",
//     postedBy: "Delhi Clicks",
//     location: "India Gate, Delhi",
//     rating: 4.6,
//     daysLeft: "5 days to go",
//     image: "Image (4).png",
//   },
//   {
//     title: "Book Reading Club",
//     postedBy: "Readers Hub",
//     location: "CP Book Cafe, Delhi",
//     rating: 4.9,
//     daysLeft: "2 days to go",
//     image: "/Image (3).png",
//   },
//   {
//     title: "Pottery Workshop",
//     postedBy: "Art Studio",
//     location: "Hauz Khas, Delhi",
//     rating: 4.7,
//     daysLeft: "4 days to go",
//     image: "Image (4).png",
//   },
//   {
//     title: "Football Match",
//     postedBy: "Sports Club",
//     location: "DDA Sports Complex, Delhi",
//     rating: 4.5,
//     daysLeft: "1 day to go",
//     image: "/Image (3).png",
//   },
//   {
//     title: "Cooking Class",
//     postedBy: "Culinary Arts",
//     location: "Community Center, Delhi",
//     rating: 4.9,
//     daysLeft: "6 days to go",
//     image: "/Image (4).png",
//   },
// ];

// const Activities = () => {
//   return (
//     <div className=" py-10 px-8 max-w-screen-xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold">Local Activities & Events</h2>
//           <p className="text-gray-600">
//             Connect with people who share your interests
//           </p>
//         </div>
//         <button className="text-orange-500 font-medium flex items-center gap-1">
//           View all activities <span>➔</span>
//         </button>
//       </div>

//       <div
//         className="
//           grid gap-4
//           grid-cols-1
//           sm:grid-cols-2
//           md:grid-cols-3
//           lg:grid-cols-4
//           xl:grid-cols-6
//           2xl:grid-cols-6
//         "
//       >
//         {activities.map((activity, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-xl shadow-sm border p-3 w-full hover:shadow-md transition"
//           >
//             {activity.image && (
//               <img
//                 src={activity.image}
//                 alt={activity.title}
//                 className="w-full h-32 object-cover rounded-lg mb-3"
//               />
//             )}
//             <h3 className="text-sm font-semibold mb-1">{activity.title}</h3>
//             <p className="text-xs text-gray-600">
//               <span className="font-semibold text-red-500">Posted by: </span>
//               {activity.postedBy}
//             </p>
//             <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
//               <FaMapMarkerAlt className="text-gray-400" /> {activity.location}
//             </p>

//             <div className="flex items-center gap-2 text-xs mt-2 text-gray-700">
//               <span>Rating:</span>
//               <span className="flex items-center gap-1 text-yellow-500">
//                 {activity.rating} <FaStar />
//               </span>
//             </div>

//             <p className="text-xs flex items-center gap-1 text-gray-500 mt-1">
//               <FaClock /> Activity valid time: <span>{activity.daysLeft}</span>
//             </p>

//             <div className="flex justify-between items-center mt-3">
//               <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded-md">
//                 Want to Participate
//               </button>
//               <FaShare className="text-gray-500 hover:text-gray-700 cursor-pointer text-sm" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Activities;

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaPlus,
  FaArrowRight,
  FaArrowLeft,
  FaClock,
  FaShare, // Removed FaStar as it's not used in this specific ActivitiesList component's logic
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

// =============================================================================
// ActivityCard Component
// (Extracted for better readability and reusability)
// =============================================================================

const ActivityCard = ({ activity, timerValue, handleViewDetails }) => {
  const navigate = useNavigate();
  const imageSrc =
    activity.uploaded_images?.length > 0
      ? activity.uploaded_images[0]
      : "/duplicate (1).png"; // Use a default image if none available

  return (
    <div
      key={activity.activity_id}
      className="bg-white rounded-xl shadow-sm border w-full hover:shadow-md transition cursor-pointer"
      onClick={() => handleViewDetails(activity.activity_id)} // Make the whole card clickable
    >
      {/* Image Section */}
      <div className="w-full h-32 overflow-hidden rounded-t-lg mb-3">
        <img
          src={imageSrc}
          alt={activity.activity_title || "Activity"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/upswap.png"; // Fallback if image fails to load
          }}
        />
      </div>
      <div className="p-3 gap-1 flex flex-col h-full">
        {/* Info Section */}
        <h3 className="text-sm font-semibold mb-1">
          {activity.activity_title || "Untitled Activity"}
        </h3>
        {/* <p className="text-xs text-gray-600 mb-1">
          <span className="font-semibold text-red-500">Posted by: </span>
          {activity.select_service || "N/A"}{" "}
          {/* Assuming 'select_service' is the poster */}
        {/* </p> */}
        {/* <p className="text-xs text-gray-600 flex items-center gap-1 mb-1"> */}
        {/* <FaMapMarkerAlt className="text-gray-400" />{" "}
          {activity.location_city || "N/A"}, {activity.location_state || "N/A"}
        </p> */}
        <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
          📍
          <span>{activity.location || "Location not specified"}</span>
        </p>

        {/* Category */}
        <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
          <BiSolidCategory className="text-base text-orange-500" />
          <span>{activity.activity_category?.actv_category || "N/A"}</span>
        </p>

        {/* Participation & Max Participants */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          👥
          <span>
            {activity.user_participation ? "Open" : "Closed"}{" "}
            {activity.maximum_participants > 0 &&
              `(Max ${activity.maximum_participants})`}
          </span>
        </div>

        {/* Time/Timer */}
        {/* <p className="text-xs flex items-center gap-1 text-gray-500 mt-1">
          <FaClock />
          {activity.infinite_time ? (
            <span>Ongoing</span>
          ) : (
            <span>
              {activity.start_date || "N/A"} to {activity.end_date || "N/A"}
            </span>
          )}
        </p> */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          ⏰
          <span>
            {activity.infinite_time
              ? "Ongoing"
              : `${activity.start_date || ""} to ${activity.end_date || ""}`}
          </span>
        </div>

        {/* Timer display */}
        {/* {!activity.infinite_time && activity.end_date && (
          <div className="text-xs text-red-500 font-medium mt-1">
            ⏳ Ends in: {timerValue || "Calculating..."}
          </div>
        )} */}

        {/* <div className="flex justify-between items-center mt-3"> */}
        {/* You can add a 'Want to Participate' button if needed */}
        {/* <button
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded-md"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when button is clicked
            toast.info("Participation functionality coming soon!");
          }}
        >
          Want to Participate
        </button> */}
        {/* <FaShare
          className="text-gray-500 hover:text-gray-700 cursor-pointer text-sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when share is clicked
            toast.info("Share functionality coming soon!");
          }}
        /> */}
        {/* </div> */}
        <div className="flex gap-2 justify-between mt-4">
          <button
            className="
                                p-1.5 border border-gray-300 rounded-md bg-white text-gray-700
                                flex items-center justify-center
                                hover:bg-gray-100 transition-colors duration-200
                              "
            onClick={(e) => {
              e.stopPropagation();
              toast.info("Share functionality coming soon!");
            }}
          >
            <FaShare className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleViewDetails(activity.activity_id)}
            className="
                                flex-grow py-1.5 px-3 bg-orange-500 text-white
                                rounded-md font-medium text-sm
                                hover:bg-orange-600 transition-colors duration-200
                                whitespace-nowrap
                              "
          >
            View Details
          </button>

          
        </div>
      </div>
    </div>
  );
};

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timers, setTimers] = useState({});
  const [showAllActivities, setShowAllActivities] = useState(false); // State for toggle view
  const navigate = useNavigate();

  // --- API Fetching Logic ---
  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.upswap.app/api/activities/lists/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`, // Correct template literal for Authorization
          },
        }
      );

      const activitiesData = response.data.data || response.data || [];
      setActivities(activitiesData);
      setLoading(false);

      if (activitiesData.length === 0) {
        toast.info("No activities available.");
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError("Failed to load activities. Please try again later.");
      toast.error("Failed to load activities.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // --- Countdown Timer Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      activities.forEach((activity) => {
        if (!activity.infinite_time && activity.end_date) {
          const now = new Date();
          const endTime = new Date(activity.end_date); // Ensure this is a valid date string
          const diff = endTime.getTime() - now.getTime();

          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            updatedTimers[activity.activity_id] = `${days}d ${hours
              .toString()
              .padStart(2, "0")}h ${minutes
              .toString()
              .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
          } else {
            updatedTimers[activity.activity_id] = "Expired";
          }
        }
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [activities]);

  // --- Navigation Handlers ---
  const handleViewDetails = (activityId) => {
    navigate(`/ActivitiesDetails/${activityId}`);
  };

  // --- Toggle View Logic (Show 6 or All) ---
  const displayedActivities = useMemo(() => {
    return showAllActivities ? activities : activities.slice(0, 6);
  }, [activities, showAllActivities]);

  const handleToggleView = () => {
    setShowAllActivities((prevState) => !prevState);
  };

  // Only show the toggle button if there are more than 6 activities
  const shouldShowToggleButton = activities.length > 6;

  // --- Loading, Error, No Activities States ---
  if (loading) {
    return (
      <div className=" bg-white flex items-center justify-center h-screen">
        {" "}
        {/* Added h-screen for full height during loading */}
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE7A3A]"></div>
          <p className="text-[#FE7A3A] text-lg mt-4">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" bg-white flex flex-col items-center justify-center text-gray-700 text-xl p-4 h-screen">
        {" "}
        {/* Added h-screen for full height during error */}
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={fetchActivities}
          className="mt-4 px-4 py-2 bg-[#FE7A3A] text-white rounded-lg hover:bg-orange-500"
        >
          Retry Loading Activities
        </button>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className=" bg-white flex items-center justify-center text-gray-600 text-xl p-4 h-screen">
        {" "}
        {/* Added h-screen for full height when no activities */}
        <p>No activities available yet. Check back soon!</p>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="bg-white ">
      {/* Changed py-8 to pt-0 and pb-8 to reduce top gap */}
      <div className="pt-0 pb-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        {/* Header and Toggle Button */}
        <div className="flex justify-between items-center mb-6 mt-4">
          <div>
            <h2 className="text-2xl font-bold">Local Activities & Events</h2>
            <p className="text-gray-600">
              Connect with people who share your interests
            </p>
          </div>
          {shouldShowToggleButton && (
            <button
              onClick={handleToggleView}
              className="text-orange-500 font-medium flex items-center gap-1 hover:text-orange-600 transition-colors"
            >
              {showAllActivities ? (
                <>
                  Show Less <FaArrowLeft className="ml-1 text-sm" />
                </>
              ) : (
                <>
                  View all activities <FaArrowRight className="ml-1 text-sm" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Activities Grid */}
        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-6
            2xl:grid-cols-6
          "
        >
          {displayedActivities.map((activity) => (
            <ActivityCard
              key={activity.activity_id}
              activity={activity}
              timerValue={timers[activity.activity_id]}
              handleViewDetails={handleViewDetails}
            />
          ))}

          <div
            onClick={() => navigate("/PostActivities")}
            className="
                  border border-dashed border-[#FE7A3A] rounded-lg 
                  flex flex-col items-center justify-center 
                  p-6 cursor-pointer bg-white hover:bg-orange-50 
                  transition-colors duration-200
                "
          >
            <FaPlus className="text-3xl text-[#FE7A3A] mb-2" />
            <p className="text-sm font-semibold text-[#FE7A3A]">
              Post a New Activities
            </p>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
    </div>
  );
};

export default ActivitiesList;
