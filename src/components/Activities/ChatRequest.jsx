import React from "react";

const ChatRequest = () => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
      <div className="flex flex-col items-center space-y-3">
        {/* Name */}
        <h2 className="text-lg font-semibold text-gray-800">lalit singh</h2>
        
        {/* Rating */}
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-1">0.0/5</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-green-500">✅</span>
            ))}
          </div>
        </div>
        
        {/* View Profile */}
        <button className="text-blue-500 text-sm font-medium hover:text-blue-700">
          View Profile
        </button>
        
        {/* Action Buttons */}
        <div className="flex space-x-4 pt-2">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md flex items-center">
            <span>Accept</span>
            <span className="ml-1">⏰️</span>
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md flex items-center">
            <span>Reject</span>
            <span className="ml-1">⏰️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRequest;


// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ChatRequest = ({ request, loggedInUserId, activityAuthorId, onAccept, onReject }) => {
//   const navigate = useNavigate();

//   const handleAcceptClick = async () => {
//     try {
//       const response = await axios.patch(
//         "https://api.upswap.app/api/chat/accept-chat-request/",
//         {
//           id: request.id,
//           is_accepted: true,
//         }
//       );

//       console.log("Chat request accepted:", response.data);
//       if (response.data?.data?.chatroom_id) {
//         if (onAccept) {
//           onAccept(response.data.data.chatroom_id, request.id);
//         } else {
//           navigate(`/chat/${response.data.data.chatroom_id}`);
//         }
//       } else {
//         console.error("Chat room ID not found in the response.");
//         alert("Failed to open chat room.");
//       }
//     } catch (error) {
//       console.error("Failed to accept chat request:", error);
//       alert("Failed to accept request.");
//     }
//   };

//   const handleRejectClick = async () => {
//     try {
//       const response = await axios.patch(
//         "https://api.upswap.app/api/chat/reject-chat-request/", // आपकी रिजेक्ट API
//         {
//           id: request.id,
//           is_rejected: true,
//         }
//       );

//       console.log("Chat request rejected:", response.data);
//       if (onReject) {
//         onReject(request.id);
//       }
//     } catch (error) {
//       console.error("Failed to reject chat request:", error);
//       alert("Failed to reject request.");
//     }
//   };

//   if (loggedInUserId !== activityAuthorId) {
//     return null; // या आप एक मैसेज दिखा सकते हैं जैसे "You are not the author of this activity."
//   }

//   return (
//     <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
//       <div className="flex flex-col items-center space-y-3">
//         {/* Name */}
//         <h2 className="text-lg font-semibold text-gray-800">{request.from_user_name}</h2>

//         {/* Rating */}
//         <div className="flex items-center">
//           <span className="text-sm text-gray-600 mr-1">0.0/5</span>
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <span key={i} className="text-green-500">✅</span>
//             ))}
//           </div>
//         </div>

//         {/* View Profile */}
//         <button className="text-blue-500 text-sm font-medium hover:text-blue-700">
//           View Profile
//         </button>

//         {/* Action Buttons */}
//         <div className="flex space-x-4 pt-2">
//           <button
//             onClick={handleAcceptClick}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md flex items-center"
//           >
//             <span>Accept</span>
//             <span className="ml-1">✅</span>
//           </button>
//           <button
//             onClick={handleRejectClick}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md flex items-center"
//           >
//             <span>Reject</span>
//             <span className="ml-1">❌</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatRequest;

// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ChatRequest = ({ request, onAccept, onReject }) => {
//   const navigate = useNavigate();

//   const handleAcceptClick = async () => {
//     try {
//       const response = await axios.patch(
//         "https://api.upswap.app/api/chat/accept-chat-request/",
//         {
//           id: request.id,
//           is_accepted: true,
//         }
//       );
  
//       console.log("Chat request accepted:", response.data);
//       if (response.data?.data?.chatroom_id) {
//         if (onAccept) {
//           onAccept(response.data.data.chatroom_id, request.id);
//         } else {
//           navigate(`/chat/${response.data.data.chatroom_id}`);
//         }
//       } else {
//         console.error("Chat room ID not found in the response.");
//         alert("Failed to open chat room.");
//       }
//     } catch (error) {
//       console.error("Failed to accept chat request:", error);
//       alert("Failed to accept request.");
//     }
//   };

//   const handleRejectClick = async () => {
//     try {
//       const response = await axios.patch(
//         "https://api.upswap.app/api/chat/reject-chat-request/", 
//         {
//           id: request.id,
//           is_rejected: true,
//         }
//       );

//       console.log("Chat request rejected:", response.data);
//       if (onReject) {
//         onReject(request.id);
//       }
      
//     } catch (error) {
//       console.error("Failed to reject chat request:", error);
//       alert("Failed to reject request.");
//     }
//   };

//   return (
//     <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
//       <div className="flex flex-col items-center space-y-3">
//         {/* Name */}
//         <h2 className="text-lg font-semibold text-gray-800">{request.from_user_name}</h2>

//         {/* Rating */}
//         <div className="flex items-center">
//           <span className="text-sm text-gray-600 mr-1">0.0/5</span>
//           <div className="flex">
//             {[...Array(5)].map((_, i) => (
//               <span key={i} className="text-green-500">✅</span>
//             ))}
//           </div>
//         </div>

//         {/* View Profile */}
//         <button className="text-blue-500 text-sm font-medium hover:text-blue-700">
//           View Profile
//         </button>

//         {/* Action Buttons */}
//         <div className="flex space-x-4 pt-2">
//           <button
//             onClick={handleAcceptClick}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md flex items-center"
//           >
//             <span>Accept</span>
//             <span className="ml-1">⏰️</span>
//           </button>
//           <button
//             onClick={handleRejectClick}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md flex items-center"
//           >
//             <span>Reject</span>
//             <span className="ml-1">⏰️</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatRequest;