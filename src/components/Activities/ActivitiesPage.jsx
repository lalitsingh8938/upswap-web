// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

// const ActivitiesList = () => {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [timers, setTimers] = useState({});

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const updatedTimers = {};

//       activities.forEach((activity) => {
//         if (!activity.infinite_time && activity.end_date) {
//           const now = new Date(); // abhi ka exact time
//           const endTime = new Date(activity.end_date); // activity ka exact end time
//           const diff = endTime.getTime() - now.getTime(); // milliseconds ka difference

//           if (diff > 0) {
//             const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//             const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//             const minutes = Math.floor((diff / (1000 * 60)) % 60);
//             const seconds = Math.floor((diff / 1000) % 60);

//             updatedTimers[activity.activity_id] = `${days}d ${hours
//               .toString()
//               .padStart(2, "0")}h ${minutes
//               .toString()
//               .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
//           } else {
//             updatedTimers[activity.activity_id] = "Expired";
//           }
//         }
//       });

//       setTimers(updatedTimers);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [activities]);

//   const handleViewDetails = (activityId) => {
//     navigate(`/ActivitiesDetails/${activityId}`);
//   };

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.upswap.app/api/activities/lists/",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         console.log("API Response:", response.data);

//         const activitiesData = response.data.data || response.data || [];
//         setActivities(activitiesData);
//         setLoading(false);

//         if (activitiesData.length === 0) {
//           toast.info("No activities available");
//         }
//       } catch (err) {
//         console.error("Error fetching activities:", err);
//         setError(err.message);
//         toast.error("Failed to load activities");
//         setLoading(false);
//       }
//     };

//     fetchActivities();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE7A3A]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//         {error}
//       </div>
//     );
//   }

//   if (activities.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-gray-600">No activities available yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Tabs */}
//       <div className="flex justify-around bg-white py-2">
//         <button
//           className="text-gray-400 px-4 py-2"
//           onClick={() => navigate("/DealsPage")}
//         >
//           Deals
//         </button>
//         <button className="text-gray-400 px-4 py-2 border-[#FE7A3A] border-b-2">
//           Activities
//         </button>
//       </div>

//       {/* Search */}
//       <div className="p-4 flex gap-2">
//         <div className="flex-1 bg-white p-2 rounded-lg flex items-center gap-2 shadow">
//           <FaSearch className="text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search title, category, vendor..."
//             className="w-full outline-none"
//           />
//         </div>
//         <button className="bg-white p-2 rounded-lg shadow">
//           <FaMapMarkerAlt className="text-[#FE7A3A]" />
//         </button>
//       </div>

//       {/* Activities List */}
//       <div className="container mx-auto p-2 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
//           {activities.map((activity) => (
//             <div
//               key={activity.activity_id}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//             >
//               {/* Activity Images */}
//               <div className="overflow-hidden object-cover rounded-lg">
//                 <img
//                   src={
//                     activity.uploaded_images?.length > 0
//                       ? activity.uploaded_images[0]
//                       : "duplicate (1).png"
//                   }
//                   alt={activity.activity_title || "Activity image"}
//                   className="w-full h-36 object-cover"
//                   onError={(e) => {
//                     e.target.src = "duplicate (1).png";
//                   }}
//                 />
//               </div>

//               <div className="p-2">
//                 <div className="flex justify-between items-start mb-2">
//                   <h2 className="text-md font-semibold text-gray-800">
//                     {activity.activity_title || "Untitled Activity"}
//                   </h2>
//                   <span className="bg-[#FE7A3A] text-white text-xs font-semibold px-2 py-1 rounded-full">
//                     {activity.activity_category?.actv_category ||
//                       "Uncategorized"}
//                   </span>
//                 </div>

//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center">
//                     <span className="text-gray-500 mr-2">📍</span>
//                     <span>{activity.location || "Location not specified"}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="text-gray-500 mr-2">👥</span>
//                     <span>
//                       {activity.user_participation ? "Open" : "Closed"}
//                       {activity.maximum_participants > 0 &&
//                         ` (Max ${activity.maximum_participants})`}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="text-gray-500 mr-2">⏰</span>
//                     <span>
//                       {activity.infinite_time
//                         ? "Ongoing"
//                         : `${activity.start_date || ""} to ${
//                             activity.end_date || ""
//                           }`}
//                     </span>
//                   </div>
//                   {/* <span className="text-sm text-gray-500 gap-2 flex items-center">
//                     <span className="text-black mr-2">⏰ Date</span>
//                     {activity.start_date
//                       ? new Date(activity.start_date).toLocaleDateString()
//                       : "Date not available"}
//                   </span> */}

//                 </div>

//                 <div
//                   className="flex justify-between items-center
//                 "
//                 >
//                    {!activity.infinite_time && activity.end_date && (
//                     <div className="flex items-center text-sm text-red-500 font-semibold mt-2 rounded-lg w-52 px-2 py-1">
//                       ⏳ Ends in:{" "}
//                       {timers[activity.activity_id] || "Calculating..."}
//                     </div>
//                   )}
//                   <button
//                     className="px-2 py-1 rounded-md text-md font-semibold text-[#FE7A3A]"
//                     onClick={() => handleViewDetails(activity.activity_id)}
//                   >
//                     View
//                   </button>

//                 </div>
//               </div>
//             </div>
//           ))}
//           <button
//             className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
//             onClick={() => navigate("/PostActivities")}
//           >
//             <FaPlus className="text-xl" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivitiesList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};

      activities.forEach((activity) => {
        if (!activity.infinite_time && activity.end_date) {
          const now = new Date(); // abhi ka exact time
          const endTime = new Date(activity.end_date); // activity ka exact end time
          const diff = endTime.getTime() - now.getTime(); // milliseconds ka difference

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

  const handleViewDetails = (activityId) => {
    navigate(`/ActivitiesDetails/${activityId}`);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "https://api.upswap.app/api/activities/lists/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        // console.log("API Response:", response.data);

        const activitiesData = response.data.data || response.data || [];
        // console.log("Activities Data:", activitiesData);
        setActivities(activitiesData);
        setLoading(false);

        if (activitiesData.length === 0) {
          toast.info("No activities available");
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError(err.message);
        toast.error("Failed to load activities");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE7A3A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No activities available yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-around bg-white py-2">
         <button
          className="text-gray-400 px-4 py-2"
          onClick={() => navigate("/DealsPage")}
        >
          Deals
        </button>
        <button className="text-gray-400 px-4 py-2 border-[#FE7A3A] border-b-2">
          Activities
        </button>
      </div>

      {/* Search */}
      <div className="p-4 flex gap-2">
        <div className="flex-1 bg-white p-2 rounded-lg flex items-center gap-2 shadow">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search title, category, vendor..."
            className="w-full outline-none"
          />
        </div>
        <button className="bg-white p-2 rounded-lg shadow">
          <FaMapMarkerAlt className="text-[#FE7A3A]" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {activities.map((activity) => (
          <div
            key={activity.activity_id}
            className="flex border border-slate-400 rounded-xl shadow-md bg-white overflow-hidden"
          >
            {/* Left - Image Section */}
            {/* <div className="w-28 h-28 m-4 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-md">
              <img
                src={
                  activity.uploaded_images?.length > 0
                    ? activity.uploaded_images[0]
                    : "duplicate (1).png"
                }
                alt="Activity"
                className="w-full h-full object-cover justify-center items-center"
                onError={(e) => {
                  e.target.src = "duplicate (1).png";
                }}
              />
            </div> */}
            <div className="w-28 h-36 m-4 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-md ">
              <img
                src={
                  activity.uploaded_images?.length > 0
                    ? activity.uploaded_images[0]
                    : "duplicate (1).png"
                }
                alt="Activity"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "duplicate (1).png";
                }}
              />
            </div>

            {/* Right - Info Section */}
            <div className="flex flex-col justify-between py-4 w-full relative">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {activity.activity_title || "Untitled Activity"}
                </h2>

                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <BiSolidCategory className="text-base text-orange-500" />
                  <span>
                    - {activity.activity_category?.actv_category || "N/A"}
                  </span>
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  📍
                  <span>{activity.location || "Location not specified"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  👥
                  <span>
                    {activity.user_participation ? "Open" : "Closed"}{" "}
                    {activity.maximum_participants > 0 &&
                      `(Max ${activity.maximum_participants})`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  ⏰
                  <span>
                    {activity.infinite_time
                      ? "Ongoing"
                      : `${activity.start_date || ""} to ${
                          activity.end_date || ""
                        }`}
                  </span>
                </div>

                {/* Timer placed below time */}
                {!activity.infinite_time && activity.end_date && (
                  <div className="text-xs text-red-500 font-medium mt-1">
                    ⏳ Ends in:{" "}
                    {timers[activity.activity_id] || "Calculating..."}
                  </div>
                )}
              </div>

              {/* View button at the very bottom */}
              <div className="mt-1 px-1">
                <button
                  className="text-blue-600 font-semibold text-sm"
                  onClick={() => handleViewDetails(activity.activity_id)}
                >
                View details
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
            className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
            onClick={() => navigate("/PostActivities")}
          >
            <FaPlus className="text-xl" />
          </button>
      </div>
    </div>
  );
};

export default ActivitiesList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
// import { BiSolidCategory } from "react-icons/bi";

// const ActivitiesList = () => {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [timers, setTimers] = useState({});

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const updatedTimers = {};

//       activities.forEach((activity) => {
//         if (!activity.infinite_time && activity.end_date) {
//           const now = new Date(); // abhi ka exact time
//           const endTime = new Date(activity.end_date); // activity ka exact end time
//           const diff = endTime.getTime() - now.getTime(); // milliseconds ka difference

//           if (diff > 0) {
//             const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//             const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//             const minutes = Math.floor((diff / (1000 * 60)) % 60);
//             const seconds = Math.floor((diff / 1000) % 60);

//             updatedTimers[activity.activity_id] = `${days}d ${hours
//               .toString()
//               .padStart(2, "0")}h ${minutes
//               .toString()
//               .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
//           } else {
//             updatedTimers[activity.activity_id] = "Expired";
//           }
//         }
//       });

//       setTimers(updatedTimers);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [activities]);

//   const handleViewDetails = (activityId) => {
//     navigate(`/ActivitiesDetails/${activityId}`);
//   };

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.upswap.app/api/activities/lists/",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         console.log("API Response:", response.data);

//         const activitiesData = response.data.data || response.data || [];
//         setActivities(activitiesData);
//         setLoading(false);

//         if (activitiesData.length === 0) {
//           toast.info("No activities available");
//         }
//       } catch (err) {
//         console.error("Error fetching activities:", err);
//         setError(err.message);
//         toast.error("Failed to load activities");
//         setLoading(false);
//       }
//     };

//     fetchActivities();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE7A3A]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//         {error}
//       </div>
//     );
//   }

//   if (activities.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-gray-600">No activities available yet.</p>
//       </div>
//     );
//   }

//   return (
//       <div className="w-full p-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {activities.map((activity) => (
//           <div
//             key={activity.activity_id}
//             className="flex items-center justify-between border border-slate-400 rounded-xl shadow-md bg-white overflow-hidden p-4"
//           >
//             {/* Info Section - Left */}
//             <div className="flex flex-col justify-center w-full pr-4">
//               <h2 className="text-base font-semibold text-gray-800">
//                 <span>Activity ID: </span>
//                 {activity.activity_id ? `${activity.activity_id}  ` : ""}
//                 {activity.activity_title || "Untitled Activity"}
//               </h2>

//               <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
//                 <BiSolidCategory className="text-base text-orange-500" />
//                 <span>
//                   - {activity.activity_category?.actv_category || "N/A"}
//                 </span>
//               </p>

//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 📍
//                 <span>{activity.location || "Location not specified"}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 👥
//                 <span>
//                   {activity.user_participation ? "Open" : "Closed"}{" "}
//                   {activity.maximum_participants > 0 &&
//                     `(Max ${activity.maximum_participants})`}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
//                 ⏰
//                 <span>
//                   {activity.infinite_time
//                     ? "Ongoing"
//                     : `${activity.start_date || ""} to ${
//                         activity.end_date || ""
//                       }`}
//                 </span>
//               </div>

//               {!activity.infinite_time && activity.end_date && (
//                 <div className="text-xs text-red-500 font-medium mt-1">
//                   ⏳ Ends in: {timers[activity.activity_id] || "Calculating..."}
//                 </div>
//               )}

//               <div className="mt-2">
//                 <button
//                   className="text-blue-600 font-semibold text-sm"
//                   onClick={() => handleViewDetails(activity.activity_id)}
//                 >
//                   view details
//                 </button>
//               </div>
//             </div>

//             {/* Image Section - Right */}
//             <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-md">
//               <img
//                 src={
//                   activity.uploaded_images?.length > 0
//                     ? activity.uploaded_images[0]
//                     : "duplicate (1).png"
//                 }
//                 alt="Activity"
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.src = "duplicate (1).png";
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     // <div className="w-full p-4">
//     //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
//     //     {" "}
//     //     {/* changed lg:grid-cols-4 to lg:grid-cols-2 */}
//     //     {activities.map((activity) => (
//     //       <div
//     //         key={activity.activity_id}
//     //         className="flex items-center justify-between border border-slate-400 rounded-xl shadow-md bg-white overflow-hidden p-4 min-w-[400px]" // added min width
//     //       >
//     //         {/* Info Section - Left */}
//     //         <div className="flex flex-col justify-center w-full pr-4">
//     //           <h2 className="text-base font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
//     //             {/* <span>Activity ID:</span> */}
//     //             {/* {activity.activity_id ? `${activity.activity_id} ` : ""} */}
                
//     //           </h2>
//     //           {activity.activity_title || "Untitled Activity"}

//     //           <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
//     //             <BiSolidCategory className="text-base text-orange-500" />
//     //             <span>
//     //               - {activity.activity_category?.actv_category || "N/A"}
//     //             </span>
//     //           </p>

//     //           <div className="flex items-center gap-2 text-sm text-gray-600">
//     //             📍
//     //             <span>{activity.location || "Location not specified"}</span>
//     //           </div>
//     //           <div className="flex items-center gap-2 text-sm text-gray-600">
//     //             👥
//     //             <span>
//     //               {activity.user_participation ? "Open" : "Closed"}{" "}
//     //               {activity.maximum_participants > 0 &&
//     //                 `(Max ${activity.maximum_participants})`}
//     //             </span>
//     //           </div>
//     //           <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
//     //             ⏰
//     //             <span>
//     //               {activity.infinite_time
//     //                 ? "Ongoing"
//     //                 : `${activity.start_date || ""} to ${
//     //                     activity.end_date || ""
//     //                   }`}
//     //             </span>
//     //           </div>

//     //           {!activity.infinite_time && activity.end_date && (
//     //             <div className="text-xs text-red-500 font-medium mt-1">
//     //               ⏳ Ends in: {timers[activity.activity_id] || "Calculating..."}
//     //             </div>
//     //           )}

//     //           <div className="mt-2">
//     //             <button
//     //               className="text-blue-600 font-semibold text-sm"
//     //               onClick={() => handleViewDetails(activity.activity_id)}
//     //             >
//     //               View 
//     //             </button>
//     //           </div>
//     //         </div>

//     //         {/* Image Section - Right */}
//     //         <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-md">
//     //           <img
//     //             src={
//     //               activity.uploaded_images?.length > 0
//     //                 ? activity.uploaded_images[0]
//     //                 : "duplicate (1).png"
//     //             }
//     //             alt="Activity"
//     //             className="w-full h-full object-cover"
//     //             onError={(e) => {
//     //               e.target.src = "duplicate (1).png";
//     //             }}
//     //           />
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>
//   );
// };

// export default ActivitiesList;
