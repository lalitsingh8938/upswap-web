import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatRequestCardForAuthor = ({ request }) => {
  const navigate = useNavigate();

  const handleAcceptClick = async () => {
    try {
      const response = await axios.patch(
        "https://api.upswap.app/api/chat/accept-chat-request/",
        {
          id: request.id,
          is_accepted: true,
        }
      );

      console.log("Chat request accepted:", response.data);
      if (response.data?.data?.chatroom_id) {
        navigate(`/chat/${response.data.data.chatroom_id}`);
      } else {
        console.error("Chat room ID not found in the response.");
        alert("Failed to open chat room.");
      }
    } catch (error) {
      console.error("Failed to accept chat request:", error);
      alert("Failed to accept request.");
    }
  };

  const handleRejectClick = async () => {
    try {
      const response = await axios.patch(
        "https://api.upswap.app/api/chat/reject-chat-request/",
        {
          id: request.id,
          is_rejected: true,
        }
      );

      console.log("Chat request rejected:", response.data);
      // आप यहां UI को अपडेट कर सकते हैं
    } catch (error) {
      console.error("Failed to reject chat request:", error);
      alert("Failed to reject request.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4 mb-4">
      <div className="flex items-center space-x-4">
        {/* यूजर प्रोफाइल जानकारी */}
        {request.from_user_profile_pic && (
          <img
            className="w-12 h-12 rounded-full"
            src={request.from_user_profile_pic}
            alt={request.from_user_name}
          />
        )}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{request.from_user_name}</h2>
          {request.initial_message && (
            <p className="text-sm text-gray-600">Message: {request.initial_message}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={handleAcceptClick} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
          Accept
        </button>
        <button onClick={handleRejectClick} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Reject
        </button>
      </div>
    </div>
  );
};

export default ChatRequestCardForAuthor;