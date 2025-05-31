// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FiUser,
//   FiHash,
// } from "react-icons/fi";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";
// import {
//   FaRunning,
//   FaSwimmer,
//   FaBiking,
//   FaHiking,
//   FaGamepad,
// } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";

// const MyActivities = () => {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Function to fetch data based on URL query
//   const fetchActivities = async (type) => {
//     try {
//       setLoading(true); // Set loading to true when starting fetch
//       let url = "https://api.upswap.app/api/my-activities/";
//       if (type === "applied") {
//         url = "https://api.upswap.app/api/my-activities/applied/";
//       } else if (type === "history") {
//         url = "https://api.upswap.app/api/my-activities/history/";
//       }

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//         },
//       });

//       setActivities(response.data.all || []);
//     } catch (error) {
//       console.error("Error fetching activities:", error);
//     } finally {
//       setLoading(false); // Set loading to false when fetch completes (success or error)
//     }
//   };

//   useEffect(() => {
//     const { pathname } = location;
//     if (pathname.includes("applied")) {
//       fetchActivities("applied");
//     } else if (pathname.includes("history")) {
//       fetchActivities("history");
//     } else {
//       fetchActivities("posted");
//     }
//   }, [location]);

//   const getCategoryIcon = (category) => {
//     const categoryMap = {
//       Sports: {
//         icon: <FaRunning className="text-blue-500" />,
//         color: "bg-blue-100",
//       },
//       Swimming: {
//         icon: <FaSwimmer className="text-teal-500" />,
//         color: "bg-teal-100",
//       },
//       Cycling: {
//         icon: <FaBiking className="text-green-500" />,
//         color: "bg-green-100",
//       },
//       Hiking: {
//         icon: <FaHiking className="text-amber-500" />,
//         color: "bg-amber-100",
//       },
//       Gaming: {
//         icon: <FaGamepad className="text-purple-500" />,
//         color: "bg-purple-100",
//       },
//       Others: {
//         icon: <FiHash className="text-amber-500" />,
//         color: "bg-gray-100",
//       },
//     };
//     return categoryMap[category] || categoryMap["Others"];
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return "N/A";
//     try {
//       const time = timeString.split(".")[0]; // Remove milliseconds if present
//       const [hours, minutes] = time.split(":");
//       const period = hours >= 12 ? "PM" : "AM";
//       const formattedHours = hours % 12 || 12;
//       return `${formattedHours}:${minutes} ${period}`;
//     } catch (e) {
//       return timeString;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const getLocationString = (location) => {
//     if (!location) return "Location not specified";
//     if (location.startsWith("Lat:")) {
//       return "Custom Location";
//     }
//     return location;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {loading ? (
//         // Show loader while loading
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//         </div>
//       ) : activities.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//           {activities.map((activity) => {
//             const categoryInfo = getCategoryIcon(
//               activity.activity_category?.actv_category || "Others"
//             );

//             return (
//               <div
//                 key={activity.activity_id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
//               >
//                 <div className="relative h-48 bg-gray-200 overflow-hidden">
//                   <img
//                     src={
//                       activity.uploaded_images &&
//                       activity.uploaded_images.length > 0
//                         ? activity.uploaded_images[0]
//                         : "https://placehold.co/600x400?text=No+Image"
//                     }
//                     alt={activity.activity_title || "Activity Image"}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://placehold.co/600x400?text=No+Image";
//                     }}
//                   />
//                 </div>
//                 <div className="p-4 gap-3 flex flex-col">
//                   <h3 className="text-xl font-semibold text-gray-800 truncate">
//                     {activity.activity_title}
//                   </h3>
//                   <div className="flex items-center text-gray-600 text-sm">
//                     <FiUser className="mr-2 text-orange-500 flex-shrink-0" />
//                     <span className="truncate">
//                       Posted by: {activity.created_by || "User"}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                   📍 <div className="inline-block mr-1 text-orange-500" />
//                     {activity.location}
//                   </p>
//                   <div className="flex items-center text-gray-600 text-sm">
//                     {" "}
//                     <FaRegCalendarAlt className="mr-2 text-orange-500 flex-shrink-0" />
//                      <span>{formatDate(activity.start_date)} to</span>
//                     {" "}
//                   </div>
//                   <div className="flex items-center text-gray-600 text-sm">
//                     {" "}
//                     <FaRegCalendarAlt className="mr-2 text-orange-500 flex-shrink-0" />
//                      <span>{formatDate(activity.end_date)}</span>
//                     {" "}
//                   </div>

//                   <div className="flex items-center text-gray-600 text-sm">
//                     <div className="flex items-center text-gray-600 text-sm">
//                     ⏰  <div className="mr-2 text-orange-500 flex-shrink-0" />
//                       <span>
//                         {formatTime(activity.start_time)} -{" "}
//                         {formatTime(activity.end_time)}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-center text-gray-600 text-sm">
//                   👥 <div className="mr-2 text-orange-500 flex-shrink-0" />
//                     <span>
//                       {activity.user_participation
//                         ? "You're participating"
//                         : "Open"}{" "}
//                       • Max {activity.maximum_participants}
//                     </span>
//                   </div>
//                   <div className="mt-4 flex justify-between">
//                     <button
//                       onClick={() =>
//                         navigate(`/ActivitiesDetails/${activity.activity_id}`)
//                       }
//                       className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
//                       onClick={() => navigate("/PostActivities")}
//                     >
//                       <FaPlus className="text-xl" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500">No activities found</div>
//       )}
//     </div>
//   );
// };

// export default MyActivities;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FiUser,
//   FiHash,
// } from "react-icons/fi";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";
// import {
//   FaRunning,
//   FaSwimmer,
//   FaBiking,
//   FaHiking,
//   FaGamepad,
// } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";

// const MyActivities = () => {
//   const [activityData, setActivityData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // all, live, scheduled, participation, history
//   const navigate = useNavigate();
//   const location = useLocation();

//   const fetchActivities = async (type) => {
//     try {
//       setLoading(true);
//       let url = "https://api.upswap.app/api/my-activities/";
//     //   if (type === "applied") {
//     //     url = "https://api.upswap.app/api/my-activities/applied/";
//     //   } else if (type === "history") {
//     //     url = "https://api.upswap.app/api/my-activities/history/";
//     //   }

//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//         },
//       });
//       // console.log("response", response.data);

//       setActivityData(response.data);
//     } catch (error) {
//       console.error("Error fetching activities:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   const { pathname } = location;
//   //   if (pathname.includes("applied")) {
//   //     fetchActivities("applied");
//   //   } else if (pathname.includes("history")) {
//   //     fetchActivities("history");
//   //   } else {
//   //     fetchActivities("posted");
//   //   }
//   // }, [location]);
//   useEffect(() => {
//     const path = location.pathname.toLowerCase();

//     if (path.includes("live")) {
//       setFilter("live");
//     } else if (path.includes("scheduled")) {
//       setFilter("scheduled");
//     } else if (path.includes("participation")) {
//       setFilter("participation");
//     } else if (path.includes("history")) {
//       setFilter("history");
//     } else {
//       setFilter("all");
//     }

//     fetchActivities("posted"); // or use different endpoints if needed

//   }, [location]);

//   const getCategoryIcon = (category) => {
//     const categoryMap = {
//       Sports: {
//         icon: <FaRunning className="text-blue-500" />,
//         color: "bg-blue-100",
//       },
//       Swimming: {
//         icon: <FaSwimmer className="text-teal-500" />,
//         color: "bg-teal-100",
//       },
//       Cycling: {
//         icon: <FaBiking className="text-green-500" />,
//         color: "bg-green-100",
//       },
//       Hiking: {
//         icon: <FaHiking className="text-amber-500" />,
//         color: "bg-amber-100",
//       },
//       Gaming: {
//         icon: <FaGamepad className="text-purple-500" />,
//         color: "bg-purple-100",
//       },
//       Others: {
//         icon: <FiHash className="text-amber-500" />,
//         color: "bg-gray-100",
//       },
//     };
//     return categoryMap[category] || categoryMap["Others"];
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return "N/A";
//     try {
//       const time = timeString.split(".")[0];
//       const [hours, minutes] = time.split(":");
//       const period = hours >= 12 ? "PM" : "AM";
//       const formattedHours = hours % 12 || 12;
//       return `${formattedHours}:${minutes} ${period}`;
//     } catch (e) {
//       return timeString;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const filteredActivities = activityData[filter] || [];

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* <div className="flex gap-6 mb-4"> */}
//       <div className="flex justify-around bg-white py-3 sticky top-0 z-10 shadow-sm">
//         {["all", "live", "scheduled", "participation", "history"].map((type) => (
//           <button
//             key={type}
//             onClick={() => setFilter(type)}
//             className={`px-4 py-2 rounded-md ${
//               filter === type ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
//             }`}
//           >
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//         </div>
//       ) : filteredActivities.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//           {filteredActivities.map((activity) => {
//             const categoryInfo = getCategoryIcon(
//               activity.activity_category?.actv_category || "Others"
//             );

//             return (
//               <div
//                 key={activity.activity_id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
//               >
//                 <div className="relative h-48 bg-gray-200 overflow-hidden">
//                   <img
//                     src={
//                       activity.uploaded_images &&
//                       activity.uploaded_images.length > 0
//                         ? activity.uploaded_images[0]
//                         : "https://placehold.co/600x400?text=No+Image"
//                     }
//                     alt={activity.activity_title || "Activity Image"}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://placehold.co/600x400?text=No+Image";
//                     }}
//                   />
//                 </div>
//                 <div className="p-4 gap-3 flex flex-col">
//                   <h3 className="text-xl font-semibold text-gray-800 truncate">
//                     {activity.activity_title}
//                   </h3>
//                   <div className="flex items-center text-gray-600 text-sm">
//                     <FiUser className="mr-2 text-orange-500 flex-shrink-0" />
//                     <span className="truncate">
//                       Posted by: {activity.created_by || "User"}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     📍 {activity.location}
//                   </p>
//                   <div className="flex items-center text-gray-600 text-sm">
//                     <FaRegCalendarAlt className="mr-2 text-orange-500 flex-shrink-0" />
//                     <span>{formatDate(activity.start_date)} to {formatDate(activity.end_date)}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600 text-sm">
//                     ⏰
//                     <span className="ml-2">
//                       {formatTime(activity.start_time)} - {formatTime(activity.end_time)}
//                     </span>
//                   </div>
//                   <div className="flex items-center text-gray-600 text-sm">
//                     👥
//                     <span className="ml-2">
//                       {activity.user_participation
//                         ? "You're participating"
//                         : "Open"}{" "}
//                       • Max {activity.maximum_participants}
//                     </span>
//                   </div>
//                   <div className="mt-4 flex justify-between">
//                     <button
//                       onClick={() =>
//                         navigate(`/ActivitiesDetails/${activity.activity_id}`)
//                       }
//                       className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500">No activities found</div>
//       )}

//       <button
//         className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
//         onClick={() => navigate("/PostActivities")}
//       >
//         <FaPlus className="text-xl" />
//       </button>
//     </div>
//   );
// };

// export default MyActivities;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiHash } from "react-icons/fi";
import {
  FaRegCalendarAlt,
  FaPlus,
  FaRunning,
  FaSwimmer,
  FaBiking,
  FaHiking,
  FaGamepad,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const MyActivities = () => {
  const [activityData, setActivityData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const url = "https://api.upswap.app/api/my-activities/";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setActivityData(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("live")) {
      setFilter("live");
    } else if (path.includes("scheduled")) {
      setFilter("scheduled");
    } else if (path.includes("participation")) {
      setFilter("participation");
    } else if (path.includes("history")) {
      setFilter("history");
    } else {
      setFilter("all");
    }
    fetchActivities();
  }, [location]);

  const getCategoryIcon = (category) => {
    const categoryMap = {
      Sports: {
        icon: <FaRunning className="text-blue-500" />,
        color: "bg-blue-100",
      },
      Swimming: {
        icon: <FaSwimmer className="text-teal-500" />,
        color: "bg-teal-100",
      },
      Cycling: {
        icon: <FaBiking className="text-green-500" />,
        color: "bg-green-100",
      },
      Hiking: {
        icon: <FaHiking className="text-amber-500" />,
        color: "bg-amber-100",
      },
      Gaming: {
        icon: <FaGamepad className="text-purple-500" />,
        color: "bg-purple-100",
      },
      Others: {
        icon: <FiHash className="text-amber-500" />,
        color: "bg-gray-100",
      },
    };
    return categoryMap[category] || categoryMap["Others"];
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const time = timeString.split(".")[0];
      const [hours, minutes] = time.split(":");
      const h = parseInt(hours, 10);
      const period = h >= 12 ? "PM" : "AM";
      const formattedHours = h % 12 || 12;
      return `${formattedHours}:${minutes} ${period}`;
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredActivities = activityData[filter] || [];

  return (
    <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl rounded-md mx-auto bg-gradient-to-b from-orange-400 to-white">
      <div className=" rounded-md flex justify-around bg-white py-3 sticky top-0 z-10 shadow-sm">
        {["all", "live", "scheduled", "participation", "history"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-md ${
                filter === type
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          )
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredActivities.map((activity) => {
            const categoryInfo = getCategoryIcon(
              activity.activity_category?.actv_category || "Others"
            );

            return (
              <div
                key={activity.activity_id}
                className="bg-white rounded-xl mt-5 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={
                      activity.uploaded_images?.[0] ||
                      "https://placehold.co/600x400?text=No+Image"
                    }
                    alt={activity.activity_title || "Activity Image"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                  <div
                    className={`absolute top-0 right-0 m-2 p-1 rounded-full ${categoryInfo.color}`}
                  >
                    {categoryInfo.icon}
                  </div>
                  {filter === "live" && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      LIVE
                    </div>
                  )}
                  {filter === "scheduled" && (
                    <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
                      SCHEDULED
                    </div>
                  )}
                  {filter === "history" && (
                    <div className="absolute top-0 left-0 bg-gray-500 text-white text-xs px-2 py-1 rounded-md">
                      EXPIRED
                    </div>
                  )}
                </div>
                <div className="p-4 gap-3 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">
                    {activity.activity_title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiUser className="mr-2 text-orange-500 flex-shrink-0" />
                    <span className="truncate">
                      Posted by: {activity.created_by || "User"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    📍 {activity.location}
                  </p>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FaRegCalendarAlt className="mr-2 text-orange-500 flex-shrink-0" />
                    <span>
                      {formatDate(activity.start_date)} to{" "}
                      {formatDate(activity.end_date)}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    ⏰
                    <span className="ml-2">
                      {formatTime(activity.start_time)} -{" "}
                      {formatTime(activity.end_time)}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    👥
                    <span className="ml-2">
                      {activity.user_participation
                        ? "You're participating"
                        : "Open"}{" "}
                      • Max {activity.maximum_participants}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() =>
                        navigate(`/ActivitiesDetails/${activity.activity_id}`)
                      }
                      className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-gray-500 text-lg mb-4">You have no Activity</p>
          <button
            onClick={() => navigate("/PostActivities")}
            className="flex items-center gap-2 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
          >
            <FaPlus className="text-xl" />
            <span>Create Your First Activity</span>
          </button>
        </div>
      )}

      <button
        className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
        onClick={() => navigate("/PostActivities")}
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
};

export default MyActivities;
