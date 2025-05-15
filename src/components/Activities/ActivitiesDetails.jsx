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

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className="p-4">
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" />
//       </div>

//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       {activity.uploaded_images.length > 0 && (
//         <div className="flex justify-center mb-8">
//           <img
//             src={
//               activity.uploaded_images && activity.uploaded_images.length > 0
//                 ? activity.uploaded_images[0]
//                 : "duplicate (1).png"
//             }
//             alt={activity.activity_title || "Activity image"}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(activity.uploaded_images[0])}
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         </div>
//       )}

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>
//           📍 Lat: {activity.latitude}, Lng: {activity.longitude}
//         </p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       <button className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition">
//         I am interested
//       </button>

//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
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
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false); // 👈 new state
//   const [chatMessage, setChatMessage] = useState(""); // 👈 chat ke text ke liye
//   const [chatHistory, setChatHistory] = useState([]); // 👈 previous chat ke liye
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("user_id");

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

//   // useEffect(() => {
//   //   if (activity?.end_date && activity?.end_time) {
//   //     const interval = setInterval(() => {
//   //       const now = new Date();
//   //       const end = new Date(`${activity.end_date}T${activity.end_time}`);
//   //       const diff = end - now;

//   //       if (diff > 0) {
//   //         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   //         const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   //         const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   //         const seconds = Math.floor((diff / 1000) % 60);
//   //         setTimeLeft(
//   //           `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
//   //         );
//   //       } else {
//   //         setTimeLeft("Expired");
//   //         clearInterval(interval);
//   //       }
//   //     }, 1000);

//   //     return () => clearInterval(interval);
//   //   }
//   // }, [activity]);
//   useEffect(() => {
//     if (activity?.end_date && activity?.end_time) {
//       const interval = setInterval(() => {
//         const now = new Date();

//         // Correctly parse end date and time separately
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]);

//   const handleSendMessage = () => {
//     if (chatMessage.trim() !== "") {
//       setChatHistory([...chatHistory, { sender: "You", message: chatMessage }]);
//       setChatMessage("");
//     }
//   };

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" />
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       {/* {activity.uploaded_images.length > 0 && (
//         <div className="flex justify-center mb-8">
//           <img
//             src={activity.uploaded_images[0]}
//             alt={activity.activity_title || "Activity image"}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(activity.uploaded_images[0])}
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         </div>
//       )} */}
//       {activity.uploaded_images.length > 0 && (
//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           {activity.uploaded_images.map((imgUrl, index) => (
//             <img
//               key={index}
//               src={imgUrl}
//               alt={`Activity image ${index + 1}`}
//               className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//               onClick={() => handleImageClick(imgUrl)}
//               onError={(e) => {
//                 e.target.src = "duplicate (1).png";
//               }}
//             />
//           ))}
//         </div>
//       )}

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Interested Button */}
//       {/* <button
//         onClick={() => setIsChatBoxOpen(true)} // 👈 chat box open karne ke liye
//         className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//       >
//         I am nterested
//       </button> */}
//       {activity?.user_participation === true && (
//         <button
//           onClick={() => setIsChatBoxOpen(true)}
//           className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//         >
//           I am interested
//         </button>
//       )}
//       {/* Interested Button */}
//       {/* {activity?.user_participation === false && activity?.created_by !== loggedInUserId && (
//         <button
//           onClick={() => setIsChatBoxOpen(true)}
//           className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//         >
//           I am interested
//         </button>
//       )} */}
//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       {/* Chat Box Modal */}
//       {isChatBoxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-96 p-4 flex flex-col">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">
//                 Chat with {activity.created_by}
//               </h2>
//               <button
//                 onClick={() => setIsChatBoxOpen(false)}
//                 className="text-red-500 font-bold"
//               >
//                 X
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto mb-2 border p-2 rounded h-64">
//               {chatHistory.map((chat, index) => (
//                 <div key={index} className="mb-1">
//                   <span className="font-semibold">{chat.sender}: </span>
//                   <span>{chat.message}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border rounded-l px-2 py-1 w-full"
//                 placeholder="Type your message..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-[#FE7A3A] text-white px-4 py-1 rounded-r"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

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
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
//   const [chatMessage, setChatMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const navigate = useNavigate();

//   // Get user ID from local storage directly
//   const loggedInUserId = localStorage.getItem("user_id");
//    console.log("Logged in user ID:", loggedInUserId); // Debugging line
// // "id": "0aa31117-5565-4360-aaf1-05730362706e",
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
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]);

//   const handleSendMessage = () => {
//     if (chatMessage.trim() !== "") {
//       setChatHistory([...chatHistory, { sender: "You", message: chatMessage }]);
//       setChatMessage("");
//     }
//   };

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" />
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {activity.uploaded_images.map((imgUrl, index) => (
//           <img
//             key={index}
//             src={imgUrl}
//             alt={`Activity image ${index + 1}`}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(imgUrl)}
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         ))}
//       </div>

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Interested Button */}
//       {/* Interested Button */}
//       {activity?.user_id !== loggedInUserId && (
//         <button
//           onClick={() => setIsChatBoxOpen(true)}
//           className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//         >
//           I am interested
//         </button>
//       )}
//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       {/* Chat Box Modal */}
//       {isChatBoxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-96 p-4 flex flex-col">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">
//                 Chat with {activity.created_by}
//               </h2>
//               <button
//                 onClick={() => setIsChatBoxOpen(false)}
//                 className="text-red-500 font-bold"
//               >
//                 X
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto mb-2 border p-2 rounded h-64">
//               {chatHistory.map((chat, index) => (
//                 <div key={index} className="mb-1">
//                   <span className="font-semibold">{chat.sender}: </span>
//                   <span>{chat.message}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border rounded-l px-2 py-1 w-full"
//                 placeholder="Type your message..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-[#FE7A3A] text-white px-4 py-1 rounded-r"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

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
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
//   const [chatMessage, setChatMessage] = useState(""); // State for the message in the chat box
//   const [chatHistory, setChatHistory] = useState([]);
//   const navigate = useNavigate();

//   // Get user ID from local storage directly
//   const loggedInUserId = localStorage.getItem("user_id");
//   // console.log("Logged in user ID:", loggedInUserId);

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
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]);

//   const handleInterestedClick = async () => {
//     if (!loggedInUserId) {
//       console.error("User ID not found.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/chat/create-chat-request/",
//         {
//           activity: activityId,
//           from_user: loggedInUserId,
//           initial_message: chatMessage, // Use the current value of chatMessage
//           is_accepted: false,
//         }
//       );

//       console.log("Chat request sent:", response.data);
//       console.log("Sending chat request with payload:", {
//         activity: activityId,
//         from_user: loggedInUserId,
//         initial_message: chatMessage,
//         is_accepted: false,
//       });
//       alert("Your interest request has been sent.");
//       setIsChatBoxOpen(false);
//       setChatMessage(""); // Clear the input after sending
//     } catch (error) {
//       console.error("Failed to send chat request:", error);
//       alert("Failed to send interest request.");
//     }
//   };

//   const handleSendMessageLocally = () => {
//     if (chatMessage.trim() !== "") {
//       setChatHistory([...chatHistory, { sender: "You", message: chatMessage }]);
//       setChatMessage("");
//     }
//   };

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" />
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {activity.uploaded_images.map((imgUrl, index) => (
//           <img
//             key={index}
//             src={imgUrl}
//             alt={`Activity image ${index + 1}`}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(imgUrl)}
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         ))}
//       </div>

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Interested Button */}
//       {activity?.user_id !== loggedInUserId && (
//         <button
//           onClick={() => setIsChatBoxOpen(true)} // Open the chat box
//           className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//         >
//           I am interested
//         </button>
//       )}

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       {/* Chat Box Modal */}
//       {isChatBoxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-96 p-4 flex flex-col">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">
//                 Chat with {activity.created_by}
//               </h2>
//               <button
//                 onClick={() => setIsChatBoxOpen(false)}
//                 className="text-red-500 font-bold"
//               >
//                 X
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto mb-2 border p-2 rounded h-64">
//               {chatHistory.map((chat, index) => (
//                 <div key={index} className="mb-1">
//                   <span className="font-semibold">{chat.sender}: </span>
//                   <span>{chat.message}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border rounded-l px-2 py-1 w-full"
//                 placeholder="Type your message..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessageLocally()}
//               />
//               <button
//                 onClick={handleInterestedClick} // Call the API on "Send"
//                 className="bg-[#FE7A3A] text-white px-4 py-1 rounded-r"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaLeftLong } from "react-icons/fa6";

// function ActivityDetailsPage() {
//   const { activityId } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const navigate = useNavigate();
//   const loggedInUserId = localStorage.getItem("user_id");

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

//     const fetchPendingChatRequests = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/chat/get-chat-requests/${activityId}/`
//         );
//         if (response.status === 200 && response.data)
//           console.log("Pending chat requests:", response.data);
//         if (response.status === 200) {
//           setPendingRequests(response.data);
//         } else {
//           console.error("Failed to fetch pending chat requests");
//         }
//       } catch (error) {
//         console.error("Error fetching pending chat requests:", error);
//       }
//     };

//     fetchActivityDetails();
//     fetchPendingChatRequests();
//   }, [activityId]);

//   useEffect(() => {
//     if (activity?.end_date && activity?.end_time) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]);

//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//     setIsImageModalOpen(true);
//   };

//   const handleInterestedClick = async () => {
//     if (!loggedInUserId) {
//       console.error("User ID not found.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/chat/create-chat-request/",
//         {
//           activity: activityId,
//           from_user: loggedInUserId,
//           initial_message: "", // You can set a default initial message
//           is_accepted: false,
//         }
//       );

//       console.log("Chat request sent:", response.data);
//       alert("Your interest request has been sent.");
//     } catch (error) {
//       console.error("Failed to send chat request:", error);
//       alert("Failed to send interest request.");
//     }
//   };

//   const handleAcceptRequest = async (requestId) => {
//     try {
//       const response = await axios.post(
//         `https://api.upswap.app/api/chat/accept-chat-request/${requestId}/`
//       );
//       if (response.status === 200) {
//         console.log("Chat request accepted:", response.data);
//         // Optionally update the pendingRequests state to remove the accepted request
//         setPendingRequests((prevRequests) =>
//           prevRequests.filter((req) => req.id === requestId)
//         );
//         alert("Chat request accepted!");
//         // Potentially navigate to the chat room
//       } else {
//         console.error("Failed to accept chat request:", response);
//         alert("Failed to accept chat request.");
//       }
//     } catch (error) {
//       console.error("Error accepting chat request:", error);
//       alert("Error accepting chat request.");
//     }
//   };

//   const handleRejectRequest = async (requestId) => {
//     // Implement your reject request API call here
//     console.log(`Reject request with ID: ${requestId}`);
//     // Example:
//     // try {
//     //     const response = await axios.post(
//     //         `YOUR_REJECT_CHAT_REQUEST_API_ENDPOINT/${requestId}/`
//     //     );
//     //     if (response.status === 200) {
//     //         setPendingRequests(prevRequests => prevRequests.filter(req => req.id === requestId));
//     //         alert("Chat request rejected.");
//     //     } else {
//     //         alert("Failed to reject chat request.");
//     //     }
//     // } catch (error) {
//     //     alert("Error rejecting chat request.");
//     // }
//   };

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" />
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {activity.uploaded_images.map((imgUrl, index) => (
//           <img
//             key={index}
//             src={imgUrl}
//             alt={`Activity image ${index + 1}`}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(imgUrl)}
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         ))}
//       </div>

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Display Accept/Reject Buttons for Pending Requests */}

//       {/* Interested Button */}
//       {activity?.user_id !== loggedInUserId && (
//         <button
//           onClick={() => {
//             // You might want to directly call handleInterestedClick here
//             // instead of opening a chat box if you don't need the initial message
//             handleInterestedClick();
//           }}
//           className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//         >
//           I am interested
//         </button>
//       )}
//       {activity?.user_id === loggedInUserId && pendingRequests.length > 0 && (
//         <div className="mt-6">
//           <h3>Pending Participation Requests:</h3>
//           <ul>
//             {pendingRequests.map((request) => (
//               <li key={request.id} className="mb-2 p-2 border rounded">
//                 User ID: {request.from_user}{" "}
//                 {/* Replace with actual user info if available */}
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={() => handleAcceptRequest(request.id)}
//                     className="bg-green-500 text-white py-2 px-4 rounded hover:brightness-110"
//                   >
//                     Accept
//                   </button>
//                   {/* Implement reject button and functionality if needed */}
//                   <button
//                     onClick={() => handleRejectRequest(request.id)}
//                     className="bg-red-500 text-white py-2 px-4 rounded hover:brightness-110"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaLeftLong } from 'react-icons/fa6';

// function ActivityDetailsPage() {
//   const { activityId } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
//   const [chatMessage, setChatMessage] = useState("");
//   const websocket = useRef(null);
//   const navigate = useNavigate();
//   const loggedInUserId = localStorage.getItem("user_id");
//   const [pendingChatRequests, setPendingChatRequests] = useState([]);

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

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       if (loggedInUserId === activity?.user_id) {
//         try {
//           const res = await axios.get(
//             `https://api.upswap.app/api/chat/chat-requests/?activity=${activityId}&is_accepted=false`
//           );
//           setPendingChatRequests(res.data);
//         } catch (error) {
//           console.error("Failed to fetch pending chat requests:", error);
//         }
//       }
//     };

//     if (activity) {
//       fetchPendingRequests();
//     }
//   }, [activityId, loggedInUserId, activity]);

//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//     setIsImageModalOpen(true);
//   };

//   useEffect(() => {
//     if (activity?.end_date && activity?.end_time) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]);

//   const handleInterestedClick = async () => {
//     if (!loggedInUserId) {
//       console.error("User ID not found.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/chat/create-chat-request/",
//         {
//           activity: activityId,
//           from_user: loggedInUserId,
//           initial_message: chatMessage,
//           is_accepted: false,
//         }
//       );

//       console.log("Chat request sent:", response.data);
//       alert("Your interest request has been sent.");
//       setIsChatBoxOpen(false);
//       setChatMessage("");
//     } catch (error) {
//       console.error("Failed to send chat request:", error);
//       alert("Failed to send interest request.");
//     }
//   };

//   const handleAcceptChatRequest = async (requestId) => {
//     try {
//       const response = await axios.post(
//         `https://api.upswap.app/api/chat/accept-chat-request/${requestId}/`,
//         {}
//       );
//       console.log("Chat request accepted:", response.data);
//       navigate(`/chat/${response.data.chatroom_id}`);
//       // After accepting, refetch pending requests to update the UI
//       const res = await axios.get(
//         `https://api.upswap.app/api/chat/chat-requests/?activity=${activityId}&is_accepted=false`
//       );
//       setPendingChatRequests(res.data);
//     } catch (error) {
//       console.error("Failed to accept chat request:", error);
//       alert("Failed to accept chat request.");
//     }
//   };

//   const handleRejectChatRequest = async (requestId) => {
//     try {
//       await axios.post(
//         `https://api.upswap.app/api/chat/reject-chat-request/${requestId}/`,
//         {}
//       );
//       console.log("Chat request rejected:", requestId);
//       // Optionally update the UI by refetching pending requests
//       const res = await axios.get(
//         `https://api.upswap.app/api/chat/chat-requests/?activity=${activityId}&is_accepted=false`
//       );
//       setPendingChatRequests(res.data);
//     } catch (error) {
//       console.error("Failed to reject chat request:", error);
//       alert("Failed to reject chat request.");
//     }
//   };

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" />
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {activity.uploaded_images.map((imgUrl, index) => (
//           <img
//             key={index}
//             src={imgUrl}
//             alt={`Activity image ${index + 1}`}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(imgUrl)}
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         ))}
//       </div>

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Interested Button */}
//       {activity?.user_id !== loggedInUserId && (
//         <button
//           onClick={() => setIsChatBoxOpen(true)}
//           className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//         >
//           I am interested
//         </button>
//       )}

//       {/* Accept/Reject Buttons for Activity Creator */}
//       {loggedInUserId === activity?.user_id && pendingChatRequests.length > 0 && (
//         <div className="mt-6 border-t pt-4">
//           <h3 className="text-lg font-semibold mb-2">Pending Chat Requests</h3>
//           {pendingChatRequests.map((request) => (
//             <div key={request.id} className="flex items-center justify-between py-2">
//               <span>User ID: {request.from_user}</span> {/* Display user information as needed */}
//               <div>
//                 <button
//                   onClick={() => handleAcceptChatRequest(request.id)}
//                   className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:brightness-110 transition"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleRejectChatRequest(request.id)}
//                   className="bg-red-500 text-white py-2 px-4 rounded-md hover:brightness-110 transition"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       {/* Chat Box Modal */}
//       {isChatBoxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-96 p-4 flex flex-col">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">
//                 Chat with {activity.created_by}
//               </h2>
//               <button
//                 onClick={() => setIsChatBoxOpen(false)}
//                 className="text-red-500 font-bold"
//               >
//                 X
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto mb-2 border p-2 rounded h-64">
//               {/* You might want to display some initial message here or nothing */}
//             </div>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border rounded-l px-2 py-1 w-full"
//                 placeholder="Type your message..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleInterestedClick()}
//               />
//               <button
//                 onClick={handleInterestedClick}
//                 className="bg-[#FE7A3A] text-white px-4 py-1 rounded-r
//                   "
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

// import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added useCallback
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaLeftLong } from 'react-icons/fa6';

// function ActivityDetailsPage() {
//   const { activityId } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
//   const [chatMessage, setChatMessage] = useState("");
//   const websocket = useRef(null);
//   const navigate = useNavigate();
//   const loggedInUserId = localStorage.getItem("user_id");

//   // State to store all chat requests related to this activity
//   const [allActivityChatRequests, setAllActivityChatRequests] = useState([]);

//   // Define the fetch function outside useEffect
//   // Using useCallback to memoize the function and prevent unnecessary re-creations
//   const fetchAllChatRequestsForActivity = useCallback(async () => {
//     if (activityId && loggedInUserId) { // Ensure activityId and userId are available
//       try {
//         const res = await axios.get(
//           `https://api.upswap.app/api/chat/get-chat-requests/${activityId}/`
//         );
//         // Assuming your API response has a 'data' field containing the list of requests
//         if (res.data && res.data.data) {
//           setAllActivityChatRequests(res.data.data);
//         } else {
//           setAllActivityChatRequests([]); // Ensure state is empty if no data
//         }
//       } catch (error) {
//         console.error("Failed to fetch all chat requests for activity:", error);
//         setAllActivityChatRequests([]); // Handle error by clearing state
//       }
//     } else {
//       setAllActivityChatRequests([]); // Clear if activityId or userId is missing
//     }
//   }, [activityId, loggedInUserId]); // Dependencies for useCallback

//   // Effect to fetch initial activity details
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

//   // Effect to fetch all chat requests for this activity when activity/user data is ready
//   useEffect(() => {
//     if (activity) { // Fetch requests after activity details are loaded
//         fetchAllChatRequestsForActivity();
//     }
//   }, [activity, fetchAllChatRequestsForActivity]); // Dependency on activity and the memoized fetch function

//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//     setIsImageModalOpen(true);
//   };

//   useEffect(() => {
//     if (activity?.end_date && activity?.end_time) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]);

//   const handleInterestedClick = async () => {
//     if (!loggedInUserId) {
//       console.error("User ID not found.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/chat/create-chat-request/",
//         {
//           activity: activityId,
//           from_user: loggedInUserId,
//           initial_message: chatMessage,
//           is_accepted: false,
//         }
//       );

//       console.log("Chat request sent:", response.data);
//       alert("Your interest request has been sent. Waiting for the activity creator to accept.");
//       setIsChatBoxOpen(false);
//       setChatMessage("");
//       // After sending a request, refetch all chat requests for the activity
//       await fetchAllChatRequestsForActivity();

//     } catch (error) {
//       console.error("Failed to send chat request:", error);
//       alert("Failed to send interest request.");
//     }
//   };

//    const handleAcceptChatRequest = async (requestId) => {
//     try {
//       const response = await axios.post(
//         `https://api.upswap.app/api/chat/accept-chat-request/${requestId}/`,
//         {}
//       );
//       console.log("Chat request accepted:", response.data);

//       // Assuming the response for acceptance includes the chatroom_id
//       if (response.data && response.data.activityId) {
//           navigate(`/ChatRoom/${response.data.activityId}`);
//       } else {
//            console.error("Acceptance response did not contain chatroom_id");
//            alert("Chat request accepted, but failed to get chatroom details.");
//       }
//       // Refetch all chat requests to update the UI for the creator (to remove pending requests)
//       await fetchAllChatRequestsForActivity();

//     } catch (error) {
//       console.error("Failed to accept chat request:", error);
//       alert("Failed to accept chat request.");
//     }
//   };

//   const handleRejectChatRequest = async (requestId) => {
//     try {
//       const response = await axios.post( // Assuming reject also returns a response
//         `https://api.upswap.app/api/chat/reject-chat-request/${requestId}/`,
//         {}
//       );
//       console.log("Chat request rejected:", requestId, response.data);

//       // Refetch all chat requests to update the UI for the creator (to remove rejected requests)
//       await fetchAllChatRequestsForActivity();

//     } catch (error) {
//       console.error("Failed to reject chat request:", error);
//       alert("Failed to reject chat request.");
//     }
//   };

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   // Logic for the interested user (not the activity creator)
//   const userSentRequest = allActivityChatRequests.find(
//     (request) => String(request.from_user) === String(loggedInUserId)
//   );
//   const isUserRequestAccepted = userSentRequest && userSentRequest.is_accepted === true;

//   // Logic for the activity creator
//   // Filter requests where the activity_admin is the logged-in user and are not yet accepted
//   const pendingChatRequestsForCreator = allActivityChatRequests.filter(
//     // **NOTE:** Ensure 'activity_admin' is the correct field from your API response
//     // that holds the ID of the activity creator. If not, use the appropriate field,
//     // possibly comparing request.activity_admin or similar to activity?.user_id or loggedInUserId
//     (request) => String(request.activity_admin) === String(loggedInUserId) && request.is_accepted === false
//   );

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" />
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {activity.uploaded_images.map((imgUrl, index) => (
//           <img
//             key={index}
//             src={imgUrl}
//             alt={`Activity image ${index + 1}`}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(imgUrl)}
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         ))}
//       </div>

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Interested Button / Go to Chat Button / Pending Message for the interested user */}
//       {String(loggedInUserId) !== String(activity?.user_id) && (
//         <>
//           {isUserRequestAccepted ? (
//             // Show Go to Chat button if the user's request is accepted
//             <button
//               onClick={() => navigate(`/chat/${userSentRequest.chatroom_id}`)}
//               className="mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//             >
//               Go to Chat
//             </button>
//           ) : userSentRequest ? ( // If userSentRequest exists but is not accepted
//             // Show pending message if user has sent a request but it's not accepted
//             <p className="mt-4 text-center text-gray-600">Your chat request is pending review.</p>
//           ) : (
//             // Show "I am interested" button if user has not sent any request
//             <button
//               onClick={() => setIsChatBoxOpen(true)}
//               className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//             >
//               I am interested
//             </button>
//           )}
//         </>
//       )}

//       {/* Accept/Reject Buttons for Activity Creator */}
//       {String(loggedInUserId) === String(activity?.user_id) && pendingChatRequestsForCreator.length > 0 && (
//         <div className="mt-6 border-t pt-4">
//           <h3 className="text-lg font-semibold mb-2">Pending Chat Requests</h3>
//           {pendingChatRequestsForCreator.map((request) => (
//             <div key={request.id} className="flex items-center justify-between py-2">
//                {/* Display user information - assuming your API returns 'from_user_name' */}
//               <span>User: {request.from_user_name || `ID: ${request.from_user}`}</span>
//               <div>
//                 <button
//                   onClick={() => handleAcceptChatRequest(request.id)}
//                   className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:brightness-110 transition"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleRejectChatRequest(request.id)}
//                   className="bg-red-500 text-white py-2 px-4 rounded-md hover:brightness-110 transition"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       {/* Chat Box Modal */}
//       {isChatBoxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-96 p-4 flex flex-col">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">
//                 Chat with {activity.created_by}
//               </h2>
//               <button
//                 onClick={() => setIsChatBoxOpen(false)}
//                 className="text-red-500 font-bold"
//               >
//                 X
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto mb-2 border p-2 rounded h-64">
//               {/* Initial messages might be displayed here if your chatroom API returns them */}
//             </div>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border rounded-l px-2 py-1 w-full"
//                 placeholder="Type your message..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleInterestedClick()}
//               />
//               <button
//                 onClick={handleInterestedClick}
//                 className="bg-[#FE7A3A] text-white px-4 py-1 rounded-r
//                   "
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

// import React, { useState, useEffect, useRef, useCallback } from "react"; // Added useCallback
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaLeftLong } from "react-icons/fa6";
// import { toast } from "react-toastify";

// function ActivityDetailsPage() {
//   const { activityId } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
//   const [chatMessage, setChatMessage] = useState("");
//   const websocket = useRef(null);
//   const navigate = useNavigate();
//   const loggedInUserId = localStorage.getItem("user_id");

//   // State to store all chat requests related to this activity
//   const [allActivityChatRequests, setAllActivityChatRequests] = useState([]);

//   // Define the fetch function outside useEffect
//   // Using useCallback to memoize the function and prevent unnecessary re-creations
//   const fetchAllChatRequestsForActivity = useCallback(async () => {
//     if (activityId && loggedInUserId) {
//       // Ensure activityId and userId are available
//       try {
//         const res = await axios.get(
//           `https://api.upswap.app/api/chat/get-chat-requests/${activityId}/`
//         );
//         // Assuming your API response has a 'data' field containing the list of requests
//         if (res.data && res.data.data) {
//           setAllActivityChatRequests(res.data.data);
//         } else {
//           setAllActivityChatRequests([]); // Ensure state is empty if no data
//         }
//       } catch (error) {
//         console.error("Failed to fetch all chat requests for activity:", error);
//         setAllActivityChatRequests([]); // Handle error by clearing state
//       }
//     } else {
//       setAllActivityChatRequests([]); // Clear if activityId or userId is missing
//     }
//   }, [activityId, loggedInUserId]); // Dependencies for useCallback

//   // Effect to fetch initial activity details
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
// // 50100624753992
//     fetchActivityDetails();
//   }, [activityId]);

//   // Effect to fetch all chat requests for this activity when activity/user data is ready
//   useEffect(() => {
//     if (activity) {
//       // Fetch requests after activity details are loaded
//       fetchAllChatRequestsForActivity();
//     }
//   }, [activity, fetchAllChatRequestsForActivity]); // Dependency on activity and the memoized fetch function

//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//     setIsImageModalOpen(true);
//   };

//   useEffect(() => {
//     if (activity?.end_date && activity?.end_time) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]);

//   const handleInterestedClick = async () => {
//     if (!loggedInUserId) {
//       console.error("User ID not found.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/chat/create-chat-request/",
//         {
//           activity: activityId,
//           from_user: loggedInUserId,
//           initial_message: chatMessage,
//           is_accepted: false,
//         }
//       );

//       console.log("Chat request sent:", response.data);
//       toast.success(
//         "Your interest request has been sent. Waiting for the activity creator to accept."
//       );
//       setIsChatBoxOpen(false);
//       setChatMessage("");
//       // After sending a request, refetch all chat requests for the activity
//       await fetchAllChatRequestsForActivity();
//     } catch (error) {
//       console.error("Failed to send chat request:", error);
//       toast.error("Failed to send interest request.");
//     }
//   };

//   const handleAcceptChatRequest = async (requestId) => {
//     try {
//       const response = await axios.post(
//         `https://api.upswap.app/api/chat/accept-chat-request/${requestId}/`,
//         {}
//       );
//       console.log("Chat request accepted:", response.data);

//       // Assuming the response for acceptance includes the chatroom_id
//       // *** यहाँ correction है ***
//       if (response.data && response.data.chatroom_id) {
//         // Check for chatroom_id
//         // Navigate using both activityId and chatroom_id as planned
//         navigate(`/chatroom/${activityId}/${response.data.chatroom_id}`); // Corrected navigation path
//       } else {
//         console.error(
//           "Acceptance response did not contain chatroom_id or was not in expected format",
//           response.data
//         );
//         toast.warn(
//           "Chat request accepted, but failed to get chatroom details."
//         );
//       }
//       // Refetch all chat requests to update the UI for the creator (to remove pending requests)
//       await fetchAllChatRequestsForActivity();
//     } catch (error) {
//       console.error("Failed to accept chat request:", error);
//       toast.error("Failed to accept chat request.");
//     }
//   };

//   const handleRejectChatRequest = async (requestId) => {
//     try {
//       const response = await axios.post(
//         // Assuming reject also returns a response
//         `https://api.upswap.app/api/chat/reject-chat-request/${requestId}/`,
//         {}
//       );
//       console.log("Chat request rejected:", requestId, response.data);

//       // Refetch all chat requests to update the UI for the creator (to remove rejected requests)
//       await fetchAllChatRequestsForActivity();
//     } catch (error) {
//       console.error("Failed to reject chat request:", error);
//       toast.warn("Failed to reject chat request.");
//     }
//   };

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   // Logic for the interested user (not the activity creator)
//   const userSentRequest = allActivityChatRequests.find(
//     (request) => String(request.from_user) === String(loggedInUserId)
//   );
//   const isUserRequestAccepted =
//     userSentRequest && userSentRequest.is_accepted === true;

//   // Logic for the activity creator
//   // Filter requests where the activity_admin is the logged-in user and are not yet accepted
//   const pendingChatRequestsForCreator = allActivityChatRequests.filter(
//     // **NOTE:** Ensure 'activity_admin' is the correct field from your API response
//     // that holds the ID of the activity creator. If not, use the appropriate field,
//     // possibly comparing request.activity_admin or similar to activity?.user_id or loggedInUserId
//     (request) =>
//       String(request.activity_admin) === String(loggedInUserId) &&
//       request.is_accepted === false
//   );

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" />
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {activity.uploaded_images.map((imgUrl, index) => (
//           <img
//             key={index}
//             src={imgUrl}
//             alt={`Activity image ${index + 1}`}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(imgUrl)}
//             onError={(e) => {
//               e.target.src = "duplicate (1).png";
//             }}
//           />
//         ))}
//       </div>

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Interested Button / Go to Chat Button / Pending Message for the interested user */}
//       {String(loggedInUserId) !== String(activity?.user_id) && (
//         <>
//           {isUserRequestAccepted ? (
//             // Show Go to Chat button if the user's request is accepted
//             <button
//               onClick={() =>
//                 navigate(`/chat/${activityId}/${userSentRequest.chatroom_id}`)
//               } // Corrected navigation for interested user too
//               className="mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//             >
//               Go to Chat
//             </button>
//           ) : userSentRequest ? ( // If userSentRequest exists but is not accepted
//             // Show pending message if user has sent a request but it's not accepted
//             <p className="mt-4 text-center text-gray-600">
//               Your chat request is pending review.
//             </p>
//           ) : (
//             // Show "I am interested" button if user has not sent any request
//             <button
//               onClick={() => setIsChatBoxOpen(true)}
//               className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//             >
//               I am interested
//             </button>
//           )}
//         </>
//       )}

//       {/* Accept/Reject Buttons for Activity Creator */}
//       {String(loggedInUserId) === String(activity?.user_id) &&
//         pendingChatRequestsForCreator.length > 0 && (
//           <div className="mt-6 border-t pt-4">
//             <h3 className="text-lg font-semibold mb-2">
//               Pending Chat Requests
//             </h3>
//             {pendingChatRequestsForCreator.map((request) => (
//               <div
//                 key={request.is_accepted}
//                 className="flex items-center justify-between py-2"
//               >
//                 {/* Display user information - assuming your API returns 'from_user_name' */}
//                 <span>
//                   User: {request.from_user_name || `ID: ${request.from_user}`}
//                 </span>
//                 <div>
//                   <button
//                     onClick={() => handleAcceptChatRequest(request.id)}
//                     className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:brightness-110 transition"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleRejectChatRequest(request.id)}
//                     className="bg-red-500 text-white py-2 px-4 rounded-md hover:brightness-110 transition"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="w-1/2 h-1/2 object-contain rounded-lg shadow-lg"
//           />
//         </div>
//       )}

//       {/* Chat Box Modal */}
//       {isChatBoxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-96 p-4 flex flex-col">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">
//                 Chat with {activity.created_by}
//               </h2>
//               <button
//                 onClick={() => setIsChatBoxOpen(false)}
//                 className="text-red-500 font-bold"
//               >
//                 X
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto mb-2 border p-2 rounded h-64">
//               {/* Initial messages might be displayed here if your chatroom API returns them */}
//             </div>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border rounded-l px-2 py-1 w-full"
//                 placeholder="Type your message..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleInterestedClick()}
//               />
//               <button
//                 onClick={handleInterestedClick}
//                 className="bg-[#FE7A3A] text-white px-4 py-1 rounded-r
//                   "
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

// import React, { useState, useEffect, useRef, useCallback } from "react"; // Added useCallback
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaLeftLong } from "react-icons/fa6";
// import { toast } from "react-toastify";

// function ActivityDetailsPage() {
//   const { activityId } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
//   const [chatMessage, setChatMessage] = useState("");
//   const websocket = useRef(null);
//   const navigate = useNavigate();
//   // Ensure loggedInUserId is correctly fetched and is a string for comparison
//   const loggedInUserId = String(localStorage.getItem("user_id"));

//   // State to store all chat requests related to this activity
//   const [allActivityChatRequests, setAllActivityChatRequests] = useState([]);

//   // Define the fetch function outside useEffect
//   // Using useCallback to memoize the function and prevent unnecessary re-creations
//   const fetchAllChatRequestsForActivity = useCallback(async () => {
//     // Ensure activityId and loggedInUserId are available before fetching
//     if (activityId && loggedInUserId) {
//       try {
//         const res = await axios.get(
//           `https://api.upswap.app/api/chat/get-chat-requests/${activityId}/`
//         );
//         // Assuming your API response has a 'data' field containing the list of requests
//         if (res.data && res.data.data) {
//           setAllActivityChatRequests(res.data.data);
//         } else {
//           // Handle cases where data is not in expected format or is empty
//           console.warn("API response data is not in expected format or is empty:", res.data);
//           setAllActivityChatRequests([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch all chat requests for activity:", error);
//         setAllActivityChatRequests([]); // Handle error by clearing state
//       }
//     } else {
//        // Clear requests if activityId or userId is missing (shouldn't happen if component loads correctly)
//        setAllActivityChatRequests([]);
//     }
//   }, [activityId, loggedInUserId]); // Dependencies for useCallback

//   // Effect to fetch initial activity details
//   useEffect(() => {
//     const fetchActivityDetails = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.upswap.app/api/activities/details/${activityId}/`
//         );
//         setActivity(res.data);
//       } catch (error) {
//         console.error("Failed to fetch activity details:", error);
//         // Optionally navigate away or show error message if activity not found
//       }
//     };

//     fetchActivityDetails();
//   }, [activityId]); // Dependency on activityId

//   // Effect to fetch all chat requests for this activity when activity/user data is ready
//   // This will run after the activity state is updated or loggedInUserId changes
//   useEffect(() => {
//     if (activity) {
//       // Fetch requests after activity details are loaded
//       fetchAllChatRequestsForActivity();
//     }
//     // Include activity and fetchAllChatRequestsForActivity in dependencies
//     // fetchAllChatRequestsForActivity is a useCallback dependency, so it's stable
//   }, [activity, fetchAllChatRequestsForActivity]);

//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//     setIsImageModalOpen(true);
//   };

//   // Countdown timer effect
//   useEffect(() => {
//     if (activity?.end_date && activity?.end_time) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]); // Dependency on activity (specifically end_date and end_time)

//   const handleInterestedClick = async () => {
//     if (!loggedInUserId) {
//       console.error("User ID not found.");
//       toast.error("Please log in to express interest."); // User feedback
//       return;
//     }

//     // Prevent sending request if one is already pending or accepted
//     const userSentRequest = allActivityChatRequests.find(
//         (request) => String(request.from_user) === String(loggedInUserId)
//     );
//     if(userSentRequest) {
//         if(userSentRequest.is_accepted) {
//              toast.info("You already have an active chat for this activity.");
//              // Optional: navigate them to the chat
//              navigate(`/chat/${activityId}/${userSentRequest.chatroom_id}`);
//         } else {
//              toast.info("You have already sent an interest request for this activity. Please wait for the creator to respond.");
//         }
//         setIsChatBoxOpen(false); // Close modal if a request exists
//         return;
//     }

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/chat/create-chat-request/",
//         {
//           activity: activityId,
//           from_user: loggedInUserId,
//           initial_message: chatMessage || "I am interested in this activity.", // Send message or default
//           is_accepted: false, // Ensure this is false by default
//         }
//       );

//       console.log("Chat request sent:", response.data);
//       toast.success(
//         "Your interest request has been sent. Waiting for the activity creator to accept."
//       );
//       setIsChatBoxOpen(false);
//       setChatMessage("");
//       // After sending a request, refetch all chat requests for the activity to update UI
//       await fetchAllChatRequestsForActivity();
//     } catch (error) {
//       console.error("Failed to send chat request:", error);
//       // Provide more specific error feedback if possible (e.g., based on error.response)
//       if (error.response && error.response.data && error.response.data.message) {
//            toast.error(`Failed to send interest request: ${error.response.data.message}`);
//       } else {
//            toast.error("Failed to send interest request. Please try again.");
//       }
//     }
//   };

//   const handleAcceptChatRequest = async (requestId) => {
//     try {
//       const response = await axios.post(
//         `https://api.upswap.app/api/chat/accept-chat-request/`,
//         {}
//       );
//       console.log("Chat request accepted:", response.data);

//       // Assuming the response for acceptance includes the chatroom_id
//       if (response.data && response.data.chatroom_id) {
//         // Check for chatroom_id and navigate
//         // Navigate using both activityId and chatroom_id
//         navigate(`/chat/${activityId}/${response.data.chatroom_id}`); // Corrected navigation path
//       } else {
//         console.error(
//           "Acceptance response did not contain chatroom_id or was not in expected format",
//           response.data
//         );
//         toast.warn(
//           "Chat request accepted, but failed to get chatroom details. You may need to find the chat via your chat list."
//         );
//         // Still refetch requests even if navigation fails, to update UI
//         await fetchAllChatRequestsForActivity();
//       }

//     } catch (error) {
//       console.error("Failed to accept chat request:", error);
//        if (error.response && error.response.data && error.response.data.message) {
//            toast.error(`Failed to accept chat request: ${error.response.data.message}`);
//        } else {
//            toast.error("Failed to accept chat request.");
//        }
//     }
//   };

//   const handleRejectChatRequest = async (requestId) => {
//     try {
//       const response = await axios.post(
//         // Assuming reject also returns a response
//         `https://api.upswap.app/api/chat/reject-chat-request/${requestId}/`,
//         {}
//       );
//       console.log("Chat request rejected:", requestId, response.data);

//       // Refetch all chat requests to update the UI for the creator (to remove rejected requests)
//       await fetchAllChatRequestsForActivity();
//       toast.success("Chat request rejected."); // User feedback
//     } catch (error) {
//       console.error("Failed to reject chat request:", error);
//        if (error.response && error.response.data && error.response.data.message) {
//            toast.warn(`Failed to reject chat request: ${error.response.data.message}`);
//        } else {
//            toast.warn("Failed to reject chat request.");
//        }
//     }
//   };

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   // Logic for the interested user (not the activity creator)
//   // Find if the logged-in user has already sent a request for THIS activity
//    const userSentRequest = allActivityChatRequests.find(
//        (request) => String(request.from_user) === loggedInUserId
//    );

//   const isUserRequestAccepted =
//     userSentRequest && userSentRequest.is_accepted === true;

//   // Logic for the activity creator
//   // Filter requests for THIS activity that are not yet accepted.
//   // This filter runs ONLY if the loggedInUser is the activity creator (checked in the render block).
//   const pendingChatRequestsForCreator = allActivityChatRequests.filter(
//     // **CORRECTED FILTER LOGIC:**
//     // We know from the API response that the `activity_admin` field doesn't contain the ID.
//     // The API endpoint `/get-chat-requests/${activityId}/` should filter by activity already.
//     // The outer render block checks if the loggedInUser IS the activity creator.
//     // So, we just need to find requests for this activity that are not accepted.
//      (request) => request.is_accepted === false
//   );

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" /> {/* Spacer */}
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {activity.uploaded_images.map((imgUrl, index) => (
//           <img
//             key={index}
//             src={imgUrl}
//             alt={`Activity image ${index + 1}`}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(imgUrl)}
//             onError={(e) => {
//                // Optional: Handle image load errors more gracefully
//                // e.target.src = "duplicate (1).png"; // Make sure this path is correct
//                console.error("Failed to load image:", imgUrl);
//                e.target.style.display = 'none'; // Hide broken image icon
//             }}
//           />
//         ))}
//          {activity.uploaded_images.length === 0 && (
//             <div className="w-52 h-52 flex items-center justify-center text-gray-500 border-2 border-gray-200 rounded-md">
//                 No Images Available
//             </div>
//          )}
//       </div>

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Interested Button / Go to Chat Button / Pending Message for the interested user */}
//       {/* Check if the logged-in user is NOT the activity creator */}
//       {String(loggedInUserId) !== String(activity?.user_id) && (
//         <>
//           {isUserRequestAccepted ? (
//             // Show Go to Chat button if the user's request is accepted
//             <button
//               onClick={() =>
//                 navigate(`/chat/${activityId}/${userSentRequest.chatroom_id}`)
//               } // Use userSentRequest's chatroom_id
//               className="mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//             >
//               Go to Chat
//             </button>
//           ) : userSentRequest ? ( // If userSentRequest exists but is not accepted
//             // Show pending message if user has sent a request but it's not accepted
//             <p className="mt-4 text-center text-gray-600">
//               Your chat request is pending review.
//             </p>
//           ) : (
//             // Show "I am interested" button if user has not sent any request
//             <button
//               onClick={() => setIsChatBoxOpen(true)}
//               className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//             >
//               I am interested
//             </button>
//           )}
//         </>
//       )}

//       {/* Accept/Reject Buttons for Activity Creator */}
//       {/* Check if the logged-in user IS the activity creator */}
//       {String(loggedInUserId) === String(activity?.user_id) &&
//         pendingChatRequestsForCreator.length > 0 && (
//           <div className="mt-6 border-t pt-4">
//             <h3 className="text-lg font-semibold mb-2">
//               Pending Chat Requests
//             </h3>
//             {pendingChatRequestsForCreator.map((request) => (
//               <div
//                 key={request.id} // Using request.id as key
//                 className="flex items-center justify-between py-2 border-b last:border-b-0" // Added border for separation
//               >
//                 {/* Display user information */}
//                 <span>
//                   User: {request.from_user_name || `ID: ${request.from_user}`}
//                 </span>
//                 <div>
//                   <button
//                     onClick={() => handleAcceptChatRequest(request.id)}
//                     className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:brightness-110 transition text-sm"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleRejectChatRequest(request.id)}
//                     className="bg-red-500 text-white py-2 px-4 rounded-md hover:brightness-110 transition text-sm"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="max-w-full max-h-full object-contain rounded-lg shadow-lg" // Adjusted sizing for better display
//           />
//         </div>
//       )}

//       {/* Chat Box Modal for sending initial interest message */}
//       {isChatBoxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"> {/* Added padding */}
//           <div className="bg-white rounded-lg w-full max-w-sm p-4 flex flex-col"> {/* Added max-w */}
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">
//                 Chat with {activity.created_by}
//               </h2>
//               <button
//                 onClick={() => setIsChatBoxOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 font-bold" // Styled close button
//               >
//                 &times; {/* Use times symbol for X */}
//               </button>
//             </div>
//             {/* Removed the empty chat display area as this modal is only for sending the *initial* request */}
//             <p className="text-sm text-gray-700 mb-3">Send an initial message to the activity creator.</p>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border rounded-l px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FE7A3A]" // Added focus styles
//                 placeholder="Type your message..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleInterestedClick()}
//               />
//               <button
//                 onClick={handleInterestedClick}
//                 className="bg-[#FE7A3A] text-white px-4 py-2 rounded-r font-medium hover:brightness-110 transition"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;

import React, { useState, useEffect, useRef, useCallback } from "react"; // Added useCallback
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

function ActivityDetailsPage() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const websocket = useRef(null);
  const navigate = useNavigate();
  // Ensure loggedInUserId is correctly fetched and is a string for comparison
  const loggedInUserId = String(localStorage.getItem("user_id"));

  // State to store all chat requests related to this activity
  const [allActivityChatRequests, setAllActivityChatRequests] = useState([]);

  // Define the fetch function outside useEffect
  // Using useCallback to memoize the function and prevent unnecessary re-creations
  const fetchAllChatRequestsForActivity = useCallback(async () => {
    // Ensure activityId and loggedInUserId are available before fetching
    if (activityId && loggedInUserId) {
      try {
        const res = await axios.get(
          `https://api.upswap.app/api/chat/get-chat-requests/${activityId}/`
        );
        // Assuming your API response has a 'data' field containing the list of requests
        if (res.data && res.data.data) {
          setAllActivityChatRequests(res.data.data);
        } else {
          // Handle cases where data is not in expected format or is empty
          console.warn(
            "API response data is not in expected format or is empty:",
            res.data
          );
          setAllActivityChatRequests([]);
        }
      } catch (error) {
        console.error("Failed to fetch all chat requests for activity:", error);
        setAllActivityChatRequests([]); // Handle error by clearing state
      }
    } else {
      // Clear requests if activityId or userId is missing (shouldn't happen if component loads correctly)
      setAllActivityChatRequests([]);
    }
  }, [activityId, loggedInUserId]); // Dependencies for useCallback

  // Effect to fetch initial activity details
  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.upswap.app/api/activities/details/${activityId}/`
        );
        setActivity(res.data);
      } catch (error) {
        console.error("Failed to fetch activity details:", error);
        // Optionally navigate away or show error message if activity not found
      }
    };

    fetchActivityDetails();
  }, [activityId]); // Dependency on activityId

  // Effect to fetch all chat requests for this activity when activity/user data is ready
  // This will run after the activity state is updated or loggedInUserId changes
  useEffect(() => {
    if (activity) {
      // Fetch requests after activity details are loaded
      fetchAllChatRequestsForActivity();
    }
    // Include activity and fetchAllChatRequestsForActivity in dependencies
    // fetchAllChatRequestsForActivity is a useCallback dependency, so it's stable
  }, [activity, fetchAllChatRequestsForActivity]);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl);
    setIsImageModalOpen(true);
  };

  // Countdown timer effect
  useEffect(() => {
    if (activity?.end_date && activity?.end_time) {
      const interval = setInterval(() => {
        const now = new Date();
        const [hours, minutes, seconds] = activity.end_time
          .split(":")
          .map(Number);
        const end = new Date(activity.end_date);
        end.setHours(hours);
        end.setMinutes(minutes);
        end.setSeconds(seconds);

        const diff = end - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
          const secondsLeft = Math.floor((diff / 1000) % 60);

          setTimeLeft(
            `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
          );
        } else {
          setTimeLeft("Expired");
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activity]); // Dependency on activity (specifically end_date and end_time)

  const handleInterestedClick = async () => {
    if (!loggedInUserId) {
      console.error("User ID not found.");
      toast.error("Please log in to express interest."); // User feedback
      return;
    }

    // Prevent sending request if one is already pending or accepted
    const userSentRequest = allActivityChatRequests.find(
      (request) => String(request.from_user) === String(loggedInUserId)
    );
    if (userSentRequest) {
      if (userSentRequest.is_accepted) {
        toast.info("You already have an active chat for this activity.");
        // Optional: navigate them to the chat
        navigate(`/chat/${activityId}/${userSentRequest.chatroom_id}`);
      } else {
        toast.info(
          "You have already sent an interest request for this activity. Please wait for the creator to respond."
        );
      }
      setIsChatBoxOpen(false); // Close modal if a request exists
      return;
    }

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/chat/create-chat-request/",
        {
          activity: activityId,
          from_user: loggedInUserId,
          initial_message: chatMessage || "I am interested in this activity.", // Send message or default
          is_accepted: false, // Ensure this is false by default
        }
      );

      console.log("Chat request sent:", response.data);
      console.log("Activity ID:", activityId);

      toast.success(
        "Your interest request has been sent. Waiting for the Activity Admin to accept."
      );
      setIsChatBoxOpen(false);
      setChatMessage("");
      // After sending a request, refetch all chat requests for the activity to update UI
      await fetchAllChatRequestsForActivity();
    } catch (error) {
      console.error("Failed to send chat request:", error);
      // Provide more specific error feedback if possible (e.g., based on error.response)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(
          `Failed to send interest request: ${error.response.data.message}`
        );
      } else {
        toast.error("Failed to send interest request. Please try again.");
      }
    }
  };

  // Modified function to accept the request object
  // const handleAcceptChatRequest = async (request) => {
  //   try {
  //     // const response = await axios.patch(
  //     //   "https://api.upswap.app/api/chat/accept-chat-request/",
  //     //   {
  //     //     id: request.id,
  //     //     is_accepted: true,
  //     //   }
  //     // );
  //     const response = await axios.patch(
  //       "https://api.upswap.app/api/chat/accept-chat-request/",
  //       [
  //         {
  //           id: request.id, // dynamically use the request ID
  //           is_accepted: true,
  //         },
  //       ]
  //     );

  //     const { chatroom_id } = response.data;

  //     if (chatroom_id) {
  //       // 🔌 Establish WebSocket connection
  //       websocket.current = new WebSocket(
  //         `wss://api.upswap.app/ws/chat/${chatroom_id}/`

  //       );

  //       websocket.current.onopen = () => {
  //         console.log("WebSocket connected to chatroom:", chatroom_id);
  //       };

  //       websocket.current.onmessage = (event) => {
  //         const data = JSON.parse(event.data);
  //         console.log("New message:", data);
  //         // Optionally show in chat UI or store in state
  //       };

  //       websocket.current.onclose = () => {
  //         console.log("WebSocket disconnected");
  //       };

  //       websocket.current.onerror = (error) => {
  //         console.error("WebSocket error:", error);
  //       };

  //       // Navigate to chat room
  //       navigate(`/chat/${activityId}/${chatroom_id}`);
  //     } else {
  //       toast.warn("Chat accepted but chatroom ID is missing.");
  //     }

  //     await fetchAllChatRequestsForActivity();
  //   } catch (error) {
  //     console.error("Failed to accept chat request:", error);
  //     toast.error("Failed to accept chat request.");
  //   }
  // };
  const handleAcceptChatRequest = async (request) => {
    try {
      const response = await axios.patch(
        "https://api.upswap.app/api/chat/accept-chat-request/",
        [
          {
            id: request.id, // dynamically use the request ID
            is_accepted: true,
          },
        ]
      );

      const accepted = response.data.accepted?.[0];
      const chatroomId = accepted?.chat_room?.id;
      const sessionId = localStorage.getItem("sessionid");
      const loggedInUserId = localStorage.getItem("user_id");
      const username = localStorage.getItem("username");
      toast.success("Chat Request Accepted");

      console.log(
        "chatroomid",
        chatroomId,
        "sessionid",
        sessionId,
        "user_id",
        loggedInUserId,
        "username",
        username
      );

      if (!chatroomId || !sessionId) {
        console.error("Missing chatroomId or sessionId");
        return;
      }

      const wsUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

      const socket = new WebSocket(wsUrl);

      // socket.onopen = () => {
      //   console.log("✅ WebSocket connected");
      //   // You can now show the chat UI or navigate to chatroom
      //   navigate(`/chat/${activityId}/${chatroomId}`);
      // };
      socket.onopen = () => {
        console.log("✅ WebSocket connected");
        websocket.current = socket;
         navigate(`/chat/${activityId}/${chatroomId}`);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("📨 Message received:",  data);
      };
//       websocket.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("Message received:", data);
//         if (data.type === 'chat_message' && data.message) {
//           setMessages((prevMessages) => [...prevMessages, data.message]);
//         } else {
//           console.warn("Received unexpected message format:", data);
//         }
//       } catch (error) {
//         console.error("Error parsing or handling received message:", error, event.data);
//       }
//     };

      socket.onclose = () => {
        console.log("🔌 WebSocket closed");
      };

      socket.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
      };
    } catch (err) {
      console.error("❗ Error accepting request:", err);
    }
  };

  const handleRejectChatRequest = async (requestId) => {
    try {
      const response = await axios.post(
        // Assuming reject also returns a response
        `https://api.upswap.app/api/chat/reject-chat-request/${requestId}/`,
        {} // Reject might not need a body, or a different body
      );
      console.log("Chat request rejected:", requestId, response.data);

      // Refetch all chat requests to update the UI for the creator (to remove rejected requests)
      await fetchAllChatRequestsForActivity();
      toast.success("Chat request rejected."); // User feedback
    } catch (error) {
      console.error("Failed to reject chat request:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.warn(
          `Failed to reject chat request: ${error.response.data.message}`
        );
      } else {
        toast.warn("Failed to reject chat request.");
      }
    }
  };

  if (!activity) return <div className="p-4 text-center">Loading...</div>;

  // Logic for the interested user (not the activity creator)
  // Find if the logged-in user has already sent a request for THIS activity
  const userSentRequest = allActivityChatRequests.find(
    (request) => String(request.from_user) === loggedInUserId
  );

  const isUserRequestAccepted =
    userSentRequest && userSentRequest.is_accepted === true;

  // Logic for the activity creator
  // Filter requests for THIS activity that are not yet accepted.
  // This filter runs ONLY if the loggedInUser IS the activity creator (checked in the render block).
  const pendingChatRequestsForCreator = allActivityChatRequests.filter(
    // **CORRECTED FILTER LOGIC:**
    // We know from the API response that the `activity_admin` field doesn't contain the ID.
    // The API endpoint `/get-chat-requests/${activityId}/` should filter by activity already.
    // The outer render block checks if the loggedInUser IS the activity creator.
    // So, we just need to find requests for this activity that are not accepted.
    (request) => request.is_accepted === false
  );

  return (
    <div className="p-4">
      {/* Top bar */}
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
        <div className="w-14" /> {/* Spacer */}
      </div>

      {/* Activity Info */}
      <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {activity.uploaded_images.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`Activity image ${index + 1}`}
            className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
            onClick={() => handleImageClick(imgUrl)}
            onError={(e) => {
              // Optional: Handle image load errors more gracefully
              // e.target.src = "duplicate (1).png"; // Make sure this path is correct
              console.error("Failed to load image:", imgUrl);
              e.target.style.display = "none"; // Hide broken image icon
            }}
          />
        ))}
        {activity.uploaded_images.length === 0 && (
          <div className="w-52 h-52 flex items-center justify-center text-gray-500 border-2 border-gray-200 rounded-md">
            No Images Available
          </div>
        )}
      </div>

      <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
        {timeLeft}
      </div>

      <div className="mt-4 space-y-1 text-sm">
        <p>
          <b>Posted by:</b> {activity.created_by}
        </p>
        <p>📍 Address: {activity.location}</p>
      </div>

      <div className="mt-4 text-sm">
        <b>About This Activity</b>
        <p>{activity.activity_description}</p>
      </div>

      {/* Interested Button / Go to Chat Button / Pending Message for the interested user */}
      {/* Check if the logged-in user is NOT the activity creator */}
      {String(loggedInUserId) !== String(activity?.user_id) && (
        <>
          {isUserRequestAccepted ? (
            // Show Go to Chat button if the user's request is accepted
            <button
              onClick={() =>
                navigate(`/chat/${activityId}/${userSentRequest.chatroom_id}`)
              } // Use userSentRequest's chatroom_id
              className="mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
            >
              Go to Chat
            </button>
          ) : userSentRequest ? (
            // If userSentRequest exists but is not accepted
            // Show pending message if user has sent a request but it's not accepted
            <p className="mt-4 text-center text-gray-600">
              Your chat request is pending review.
            </p>
          ) : (
            // Show "I am interested" button if user has not sent any request
            <button
              onClick={() => setIsChatBoxOpen(true)}
              className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
            >
              I am interested
            </button>
          )}
        </>
      )}

      {/* Accept/Reject Buttons for Activity Creator */}
      {/* Check if the logged-in user IS the activity creator */}
      {String(loggedInUserId) === String(activity?.user_id) &&
        pendingChatRequestsForCreator.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">
              Pending Chat Requests
            </h3>
            {pendingChatRequestsForCreator.map((request) => (
              <div
                key={request.id} // Using request.id as key
                className="flex items-center justify-between py-2 border-b last:border-b-0" // Added border for separation
              >
                {/* Display user information */}
                <span>
                  User: {request.from_user_name || `ID: ${request.from_user}`}
                </span>
                <div>
                  {/* Pass the full request object to handleAcceptChatRequest */}
                  <button
                    onClick={() => handleAcceptChatRequest(request)}
                    className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:brightness-110 transition text-sm"
                    // onClick={() => navigate("/ChatRoom")}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectChatRequest(request.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:brightness-110 transition text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsImageModalOpen(false)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg" // Adjusted sizing for better display
          />
        </div>
      )}

      {/* Chat Box Modal for sending initial interest message */}
      {isChatBoxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          {" "}
          {/* Added padding */}
          <div className="bg-white rounded-lg w-full max-w-sm p-4 flex flex-col">
            {" "}
            {/* Added max-w */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                Chat with {activity.created_by}
              </h2>
              <button
                onClick={() => setIsChatBoxOpen(false)}
                className="text-gray-500 hover:text-gray-700 font-bold" // Styled close button
              >
                &times; {/* Use times symbol for X */}
              </button>
            </div>
            {/* Removed the empty chat display area as this modal is only for sending the *initial* request */}
            <p className="text-sm text-gray-700 mb-3">
              Send an initial message to the activity creator.
            </p>
            <div className="flex">
              <input
                type="text"
                className="border rounded-l px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FE7A3A]" // Added focus styles
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleInterestedClick()}
              />
              <button
                onClick={handleInterestedClick}
                className="bg-[#FE7A3A] text-white px-4 py-2 rounded-r font-medium hover:brightness-110 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityDetailsPage;


// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaLeftLong } from "react-icons/fa6";
// import { toast } from "react-toastify";

// function ActivityDetailsPage() {
//   const { activityId } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
//   const [chatMessage, setChatMessage] = useState("");
//   const websocket = useRef(null); // Note: WebSocket logic is present but not fully implemented/used in the provided handlers
//   const navigate = useNavigate();
//   // Ensure loggedInUserId is correctly fetched and is a string for comparison
//   const loggedInUserId = String(localStorage.getItem("user_id"));

//   // State to store all chat requests related to this activity
//   const [allActivityChatRequests, setAllActivityChatRequests] = useState([]);

//   // Define the fetch function outside useEffect
//   // Using useCallback to memoize the function and prevent unnecessary re-creations
//   const fetchAllChatRequestsForActivity = useCallback(async () => {
//     // Ensure activityId and loggedInUserId are available before fetching
//     if (activityId && loggedInUserId) {
//       try {
//         const res = await axios.get(
//           `https://api.upswap.app/api/chat/get-chat-requests/${activityId}/`
//         );
//         // Assuming your API response has a 'data' field containing the list of requests
//         if (res.data && res.data.data) {
//           setAllActivityChatRequests(res.data.data);
//         } else {
//           // Handle cases where data is not in expected format or is empty
//           console.warn("API response data is not in expected format or is empty:", res.data);
//           setAllActivityChatRequests([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch all chat requests for activity:", error);
//         setAllActivityChatRequests([]); // Handle error by clearing state
//       }
//     } else {
//        // Clear if activityId or userId is missing (shouldn't happen if component loads correctly)
//        setAllActivityChatRequests([]);
//     }
//   }, [activityId, loggedInUserId]); // Dependencies for useCallback

//   // Effect to fetch initial activity details
//   useEffect(() => {
//     const fetchActivityDetails = async () => {
//       try {
//         const res = await axios.get(
//           `https://api.upswap.app/api/activities/details/${activityId}/`
//         );
//         setActivity(res.data);
//       } catch (error) {
//         console.error("Failed to fetch activity details:", error);
//         // Optionally navigate away or show error message if activity not found
//       }
//     };

//     fetchActivityDetails();
//   }, [activityId]); // Dependency on activityId

//   // Effect to fetch all chat requests for this activity when activity/user data is ready
//   // This will run after the activity state is updated or loggedInUserId changes
//   useEffect(() => {
//     if (activity) {
//       // Fetch requests after activity details are loaded
//       fetchAllChatRequestsForActivity();
//     }
//     // Include activity and fetchAllChatRequestsForActivity in dependencies
//     // fetchAllChatRequestsForActivity is a useCallback dependency, so it's stable
//   }, [activity, fetchAllChatRequestsForActivity]);

//   // Countdown timer effect
//   useEffect(() => {
//     if (activity?.end_date && activity?.end_time) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const [hours, minutes, seconds] = activity.end_time
//           .split(":")
//           .map(Number);
//         const end = new Date(activity.end_date);
//         end.setHours(hours);
//         end.setMinutes(minutes);
//         end.setSeconds(seconds);

//         const diff = end - now;

//         if (diff > 0) {
//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
//           const minutesLeft = Math.floor((diff / (1000 * 60)) % 60);
//           const secondsLeft = Math.floor((diff / 1000) % 60);

//           setTimeLeft(
//             `${days} days ${hoursLeft} hours ${minutesLeft} minutes ${secondsLeft} seconds`
//           );
//         } else {
//           setTimeLeft("Expired");
//           clearInterval(interval);
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [activity]); // Dependency on activity (specifically end_date and end_time)

//   const handleImageClick = (imgUrl) => {
//     setSelectedImage(imgUrl);
//     setIsImageModalOpen(true);
//   };

//   const handleInterestedClick = async () => {
//     if (!loggedInUserId) {
//       console.error("User ID not found.");
//       toast.error("Please log in to express interest."); // User feedback
//       return;
//     }

//     // Prevent sending request if one is already pending or accepted
//     const userSentRequest = allActivityChatRequests.find(
//         (request) => String(request.from_user) === loggedInUserId
//     );
//     if(userSentRequest) {
//         if(userSentRequest.is_accepted && userSentRequest.chatroom_id) { // Check for chatroom_id too
//              toast.info("You already have an active chat for this activity.");
//              // Optional: navigate them to the chat
//              navigate(`/chat/${activityId}/${userSentRequest.chatroom_id}`);
//         } else if (!userSentRequest.is_accepted) {
//              toast.info("You have already sent an interest request for this activity. Please wait for the creator to respond.");
//         } else {
//              // This case might occur if is_accepted is true but chatroom_id is null (unlikely with correct API)
//              toast.warn("Your request status is unclear. Please check your chat list.");
//         }
//         setIsChatBoxOpen(false); // Close modal if a request exists
//         return;
//     }

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/chat/create-chat-request/",
//         {
//           activity: activityId,
//           from_user: loggedInUserId,
//           initial_message: chatMessage || "I am interested in this activity.", // Send message or default
//           is_accepted: false, // Ensure this is false by default
//         }
//       );

//       console.log("Chat request sent:", response.data);
//       toast.success(
//         "Your interest request has been sent. Waiting for the activity creator to accept."
//       );
//       setIsChatBoxOpen(false);
//       setChatMessage("");
//       // After sending a request, refetch all chat requests for the activity to update UI
//       await fetchAllChatRequestsForActivity();
//     } catch (error) {
//       console.error("Failed to send chat request:", error);
//       // Provide more specific error feedback if possible (e.g., based on error.response)
//       if (error.response && error.response.data && error.response.data.message) {
//            // Display backend validation errors etc.
//            const errorMsg = typeof error.response.data.message === 'string'
//                             ? error.response.data.message
//                             : (error.response.data.error ? JSON.stringify(error.response.data.error) : 'Unknown error');
//            toast.error(`Failed to send interest request: ${errorMsg}`);
//       } else {
//            toast.error("Failed to send interest request. Please try again.");
//       }
//     }
//   };

//   // --- CORRECTED HANDLER FUNCTIONS ---
//   // Function now accepts the full request object
//   const handleAcceptChatRequest = async (request) => {
//     const requestId = request.id; // Get the ID from the object

//     if (!loggedInUserId) {
//         console.error("User ID not found.");
//         toast.error("User not logged in.");
//         return;
//     }

//     try {
//       const response = await axios.post(
//         // Use the requestId in the URL
//         `https://api.upswap.app/api/chat/accept-chat-request/${requestId}/`,
//          // Send an empty body {} or include data if your specific API requires it.
//          // Based on the previous error, if your API truly needs activity and from_user in the body,
//          // you would send: { activity: activityId, from_user: request.from_user }
//         {}
//       );
//       console.log("Chat request accepted:", response.data);
//       toast.success("Chat request accepted!"); // Success feedback

//       if (response.data && response.data.chatroom_id) {
//         // Navigate to the chatroom using the ID from the response
//         navigate(`/chat/${activityId}/${response.data.chatroom_id}`);
//       } else {
//         console.error(
//           "Acceptance response did not contain chatroom_id or was not in expected format",
//           response.data
//         );
//         toast.warn(
//           "Chat request accepted, but failed to get chatroom details. Please check your chat list."
//         );
//         // Refetch requests even if navigation info is missing, to update the list
//         await fetchAllChatRequestsForActivity();
//       }

//     } catch (error) {
//       console.error("Failed to accept chat request:", error);
//        if (error.response && error.response.data) {
//            const errorMsg = typeof error.response.data.message === 'string'
//                             ? error.response.data.message
//                             : (error.response.data.error ? JSON.stringify(error.response.data.error) : 'Unknown error');
//            toast.error(`Failed to accept chat request: ${errorMsg}`);
//        } else {
//            toast.error("Failed to accept chat request. Please try again.");
//        }
//        // Refetch requests on failure in case state needs updating
//        await fetchAllChatRequestsForActivity();
//     }
//   };

//   // --- CORRECTED HANDLER FUNCTIONS ---
//   // Function now accepts the full request object
//   const handleRejectChatRequest = async (request) => {
//     const requestId = request.id; // Get the ID from the object

//     if (!loggedInUserId) {
//         console.error("User ID not found.");
//         toast.error("User not logged in.");
//         return;
//     }

//     try {
//       const response = await axios.post(
//         // Use the requestId in the URL
//         `https://api.upswap.app/api/chat/reject-chat-request/${requestId}/`,
//         // Send an empty body {} or include data if your specific API requires it.
//         {}
//       );
//       console.log("Chat request rejected:", requestId, response.data);
//       toast.success("Chat request rejected."); // Success feedback

//       // Refetch all chat requests to update the UI for the creator (to remove rejected requests)
//       await fetchAllChatRequestsForActivity();
//     } catch (error) {
//       console.error("Failed to reject chat request:", error);
//        if (error.response && error.response.data) {
//            const errorMsg = typeof error.response.data.message === 'string'
//                             ? error.response.data.message
//                             : (error.response.data.error ? JSON.stringify(error.response.data.error) : 'Unknown error');
//            toast.warn(`Failed to reject chat request: ${errorMsg}`);
//        } else {
//            toast.warn("Failed to reject chat request.");
//        }
//        // Refetch requests on failure
//        await fetchAllChatRequestsForActivity();
//     }
//   };
//   // --- END CORRECTED HANDLER FUNCTIONS ---

//   if (!activity) return <div className="p-4 text-center">Loading...</div>;

//   // Logic for the interested user (not the activity creator)
//   // Find if the logged-in user has already sent a request for THIS activity
//    const userSentRequest = allActivityChatRequests.find(
//        (request) => String(request.from_user) === loggedInUserId
//    );

//   const isUserRequestAccepted =
//     userSentRequest && userSentRequest.is_accepted === true;

//   // Logic for the activity creator
//   // Filter requests for THIS activity that are not yet accepted.
//   // This filter runs ONLY if the loggedInUser is the activity creator (checked in the render block).
//   const pendingChatRequestsForCreator = allActivityChatRequests.filter(
//     // CORRECTED FILTER LOGIC: Check if request is not accepted.
//     // The outer render block checks if the loggedInUser IS the activity creator.
//     // The API endpoint should filter by activity already.
//      (request) => request.is_accepted === false
//   );

//   return (
//     <div className="p-4">
//       {/* Top bar */}
//       <div className="bg-gradient-to-r bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex items-center justify-between">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-white text-sm px-1 py-1 rounded-md hover:bg-red-500"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="text-lg font-semibold text-center flex-1">
//           Activity Description
//         </h2>
//         <div className="w-14" /> {/* Spacer */}
//       </div>

//       {/* Activity Info */}
//       <h2 className="text-xl p-1 font-semibold ">{activity.activity_title}</h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {activity.uploaded_images.map((imgUrl, index) => (
//           <img
//             key={index}
//             src={imgUrl}
//             alt={`Activity image ${index + 1}`}
//             className="w-52 h-52 object-cover rounded-md cursor-pointer border-2 border-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={() => handleImageClick(imgUrl)}
//             onError={(e) => {
//                // Optional: Handle image load errors more gracefully
//                // e.target.src = "duplicate (1).png"; // Make sure this path is correct
//                console.error("Failed to load image:", imgUrl);
//                e.target.style.display = 'none'; // Hide broken image icon
//             }}
//           />
//         ))}
//          {activity.uploaded_images.length === 0 && (
//             <div className="w-52 h-52 flex items-center justify-center text-gray-500 border-2 border-gray-200 rounded-md">
//                 No Images Available
//             </div>
//          )}
//       </div>

//       <div className="bg-gray-800 text-white p-2 mt-2 rounded text-sm">
//         {timeLeft}
//       </div>

//       <div className="mt-4 space-y-1 text-sm">
//         <p>
//           <b>Posted by:</b> {activity.created_by}
//         </p>
//         <p>📍 Address: {activity.location}</p>
//       </div>

//       <div className="mt-4 text-sm">
//         <b>About This Activity</b>
//         <p>{activity.activity_description}</p>
//       </div>

//       {/* Interested Button / Go to Chat Button / Pending Message for the interested user */}
//       {/* Check if the logged-in user is NOT the activity creator */}
//       {String(loggedInUserId) !== String(activity?.user_id) && (
//         <>
//           {isUserRequestAccepted ? (
//             // Show Go to Chat button if the user's request is accepted
//             <button
//               onClick={() =>
//                 navigate(`/chat/${activityId}/${userSentRequest.chatroom_id}`)
//               } // Use userSentRequest's chatroom_id
//               className="mt-6 bg-blue-500 text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//             >
//               Go to Chat
//             </button>
//           ) : userSentRequest ? ( // If userSentRequest exists but is not accepted
//             // Show pending message if user has sent a request but it's not accepted
//             <p className="mt-4 text-center text-gray-600">
//               Your chat request is pending review.
//             </p>
//           ) : (
//             // Show "I am interested" button if user has not sent any request
//             <button
//               onClick={() => setIsChatBoxOpen(true)}
//               className="mt-6 bg-[#FE7A3A] text-white py-3 px-4 rounded-lg w-full text-base font-medium hover:brightness-110 transition"
//             >
//               I am interested
//             </button>
//           )}
//         </>
//       )}

//       {/* Accept/Reject Buttons for Activity Creator */}
//       {/* Check if the logged-in user IS the activity creator */}
//       {String(loggedInUserId) === String(activity?.user_id) &&
//         pendingChatRequestsForCreator.length > 0 && (
//           <div className="mt-6 border-t pt-4">
//             <h3 className="text-lg font-semibold mb-2">
//               Pending Chat Requests
//             </h3>
//             {pendingChatRequestsForCreator.map((request) => (
//               <div
//                 key={request.id} // Using request.id as key
//                 className="flex items-center justify-between py-2 border-b last:border-b-0" // Added border for separation
//               >
//                 {/* Display user information */}
//                 <span>
//                   User: {request.from_user_name || `ID: ${request.from_user}`}
//                 </span>
//                 <div>
//                   <button
//                     // --- CORRECTED CALL ---
//                     onClick={() => handleAcceptChatRequest(request)}
//                     className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:brightness-110 transition text-sm"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     // --- CORRECTED CALL ---
//                     onClick={() => handleRejectChatRequest(request)}
//                     className="bg-red-500 text-white py-2 px-4 rounded-md hover:brightness-110 transition text-sm"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setIsImageModalOpen(false)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="max-w-full max-h-full object-contain rounded-lg shadow-lg" // Adjusted sizing for better display
//           />
//         </div>
//       )}

//       {/* Chat Box Modal for sending initial interest message */}
//       {isChatBoxOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"> {/* Added padding */}
//           <div className="bg-white rounded-lg w-full max-w-sm p-4 flex flex-col"> {/* Added max-w */}
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-semibold">
//                 Chat with {activity.created_by}
//               </h2>
//               <button
//                 onClick={() => setIsChatBoxOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 font-bold" // Styled close button
//               >
//                 &times; {/* Use times symbol for X */}
//               </button>
//             </div>
//             {/* Removed the empty chat display area as this modal is only for sending the *initial* request */}
//             <p className="text-sm text-gray-700 mb-3">Send an initial message to the activity creator.</p>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border rounded-l px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FE7A3A]" // Added focus styles
//                 placeholder="Type your message..."
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleInterestedClick()}
//               />
//               <button
//                 onClick={handleInterestedClick}
//                 className="bg-[#FE7A3A] text-white px-4 py-2 rounded-r font-medium hover:brightness-110 transition"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ActivityDetailsPage;
