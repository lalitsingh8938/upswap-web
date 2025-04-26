// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaLeftLong } from "react-icons/fa6";

// function ActivityDetailsPage() {
//   const { activityId } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchActivityDetails = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.upswap.app/api/activities/details/${activityId}/`
//         );
//         setActivity(res.data);
//       } catch (error) {
//         console.error("Failed to fetch activity details:", error);
//       }
//     };

//     fetchActivityDetails();
//   }, [activityId]);
//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//     setIsImageModalOpen(true);
//   };

//   useEffect(() => {
//     if (activity?.end_date && activity?.end_time) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const end = new Date(`${activity.end_date}T${activity.end_time}`);
//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutes = Math.floor((diff / (1000 * 60)) % 60);
//           const seconds = Math.floor((diff / 1000) % 60);
//           setTimeLeft(
//             `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]);

//   if (!activity) return <div>Loading...</div>;

//   return (

//     <div style={{ padding: "16px" }}>
//      <div>
//      <button
//     onClick={() => navigate(-1)}
//     className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//   >
//     <FaLeftLong className="w-5 h-5" />
//   </button>
//      </div>
//       <h2>{activity.activity_title}</h2>
//       {activity.uploaded_images.length > 0 && (
//         <div className="flex justify-center mb-4">
//           <img
//             src={
//               activity.uploaded_images && activity.uploaded_images.length > 0
//                 ? activity.uploaded_images[0]
//                 : "duplicate (1).png"
//             }
//             alt={activity.activity_title || "Activity image"}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         </div>
//       )}

//       <div
//         style={{
//           backgroundColor: "#333",
//           color: "#fff",
//           padding: "8px",
//           marginTop: "8px",
//           borderRadius: "4px",
//         }}
//       >
//         {timeLeft}
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>
//           📍 Lat: {activity.latitude}, Lng: {activity.longitude}
//         </p>
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>
//       <button
//         style={{
//           marginTop: "20px",
//           backgroundColor: "orange",
//           color: "white",
//           padding: "12px 20px",
//           border: "none",
//           borderRadius: "8px",
//           width: "100%",
//           fontSize: "16px",
//           backgroundColor: "#FE7A3A",
//         }}
//       >
//         I am interested
//       </button>

//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 rounded-lg"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";

function ActivityDetailsPage() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.upswap.app/api/activities/details/${activityId}/`
        );
        setActivity(res.data);
      } catch (error) {
        console.error("Failed to fetch activity details:", error);
      }
    };

    fetchActivityDetails();
  }, [activityId]);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setIsImageModalOpen(true);
  };

  useEffect(() => {
    if (activity?.end_date && activity?.end_time) {
      const interval = setInterval(() => {
        const now = new Date();
        const end = new Date(`${activity.end_date}T${activity.end_time}`);
        const diff = end - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setTimeLeft(
            `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
          );
        } else {
          setTimeLeft("Expired");
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activity]);

  if (!activity) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
        >
          <FaLeftLong className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-center flex-1">
          Activity Description
        </h2>
        <div className="w-14" />
      </div>

      <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

      {activity.uploaded_images.length > 0 && (
        <div className="flex justify-center mb-8">
          <img
            src={
              activity.uploaded_images && activity.uploaded_images.length > 0
                ? activity.uploaded_images[0]
                : "duplicate (1).png"
            }
            alt={activity.activity_title || "Activity image"}
            className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
            onClick={() => handleImageClick(activity.uploaded_images[0])}
            onError={(e) => {
              e.target.src = "duplicate (1).png";
            }}
          />
        </div>
      )}

      <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
        {timeLeft}
      </div>

      <div className="mt-4 space-y-1 text-sm">
        <p>
          <b>Posted by:</b> {activity.created_by}
        </p>
        <p>
          📍 Lat: {activity.latitude}, Lng: {activity.longitude}
        </p>
      </div>

      <div className="mt-4 text-sm">
        <b>About This Activity</b>
        <p>{activity.activity_description}</p>
      </div>

      <button className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition">
        I am interested
      </button>

      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsImageModalOpen(false)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default ActivityDetailsPage;
