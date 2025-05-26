// import { useState, useEffect, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaLeftLong } from "react-icons/fa6";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Define WebSocket ready states for clarity
// const WebSocketReadyState = {
//   CONNECTING: 0,
//   OPEN: 1,
//   CLOSING: 2,
//   CLOSED: 3,
// };

// function ChatRoomPage() {
//   const { activityId, chatroomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   // State to track connection status for UI
//   const [isConnected, setIsConnected] = useState(false);
//   const websocket = useRef(null);
//   const loggedInUserId = localStorage.getItem("user_id");
//   const username = localStorage.getItem("username");
//   const navigate = useNavigate();
//   const sessionId = localStorage.getItem("sessionid");
//   const messagesEndRef = useRef(null);
//   const adminUserId = localStorage.getItem("admin_user_id"); // Assuming you store the admin's user ID

//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);
// console.log("ChatRoomPage: activityId", activityId);
// console.log("ChatRoomPage: chatroomId", chatroomId);
// console.log("ChatRoomPage: loggedInUserId", loggedInUserId);
// console.log("ChatRoomPage: sessionId", sessionId);
//   useEffect(() => {
//     if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
//       console.error(
//         "Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection."
//       );
//       if (!loggedInUserId || !sessionId) {
//         toast.warn("Session information is missing. Please log in again.");
//         // Example: navigate('/login');
//       } else if (!activityId || !chatroomId) {
//         toast.warn(
//           "Chatroom or activity information is missing. Cannot load chat."
//         );
//         // Example: navigate('/');
//       }
//       setIsConnected(false);
//       return;
//     }

//     const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

//     console.log("Attempting to connect WebSocket to:", websocketUrl);

//     if (websocket.current) {
//       console.log(
//         "Closing existing WebSocket connection before creating a new one."
//       );
//       websocket.current.close();
//       setIsConnected(false);
//     }

//     websocket.current = new WebSocket(websocketUrl);

//     websocket.current.onopen = () => {
//       console.log(
//         `✅ WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`
//       );
//       setIsConnected(true);
//     };

//     websocket.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("WebSocket Message Received:", data);

//         // Check if the received data has the expected message structure
//         if (data.message && data.sender && data.sent_at) {
//           // Backend message format: { message: 'text', sender: 'uuid', sent_at: 'timestamp' }
//           const receivedMessage = {
//             user: data.sender,
//             username: data.sender, // Using sender ID as username for now, adjust if backend sends username differently
//             text: data.message, // Message text is directly in data.message
//             timestamp: data.sent_at,
//             id: Math.random().toString(36).substring(7), // Generate a temporary ID for the message in the UI
//           };
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         } else {
//           console.warn("Received unexpected WebSocket message format:", data);
//         }
//         // ****** CHANGE END ******
//       } catch (error) {
//         console.error(
//           "Error parsing or handling received WebSocket message:",
//           error,
//           event.data
//         );
//       }
//     };

//     websocket.current.onerror = (event) => {
//       console.error("❌ WebSocket error:", event);
//       setIsConnected(false);
//       console.warn("WebSocket connection error. Check server and network.");
//     };

//     websocket.current.onclose = (event) => {
//       console.warn("🔌 WebSocket disconnected:", event);
//       console.warn("Close code:", event.code, "Reason:", event.reason);
//       setIsConnected(false);
//     };

//     return () => {
//       if (
//         websocket.current &&
//         websocket.current.readyState !== WebSocketReadyState.CLOSING &&
//         websocket.current.readyState !== WebSocketReadyState.CLOSED
//       ) {
//         console.log(
//           `WebSocket disconnected from chatroom: ${chatroomId} during cleanup`
//         );
//         websocket.current.close();
//       }
//       setIsConnected(false);
//     };
//   }, [activityId, chatroomId, loggedInUserId, sessionId]);

//   // Fetch message history on component mount
//   useEffect(() => {
//     const fetchMessageHistory = async () => {
//       if (chatroomId && sessionId) {
//         console.log("Fetching message history for chatroom:", chatroomId);
//         try {
//           const res = await axios.get(
//             `https://api.upswap.app/api/chat/get-chat-messages/${chatroomId}/`,
//             {
//               headers: {
//                 "X-Session-Id": sessionId,
//                 Authorization: `Bearer ${localStorage.getItem("access")}`,
//               },
//             }
//           );
//           console.log("History API Response:", res.data);
//           // ****** CHANGE START ******
//           if (res.data && Array.isArray(res.data.results)) {
//             const formattedMessages = res.data.results.map((msg) => ({
//               user: msg.sender, // use `sender` not `user`
//               text: msg.content,
//               timestamp: msg.created_at,
//               id: msg.id,
//             }));

//             setMessages(formattedMessages.reverse());
//             console.log("Formatted History Messages:", formattedMessages);
//             scrollToBottom();
//           } else {
//             console.warn(
//               "Message history API did not return results array:",
//               res.data
//             ); // Updated warning
//             setMessages([]);
//           }
//           // ****** CHANGE END ******
//         } catch (error) {
//           console.error("Failed to fetch message history:", error);
//         }
//       } else {
//         console.warn(
//           "Cannot fetch message history: Missing chatroom ID or session ID."
//         );
//         setMessages([]);
//       }
//     };
//     fetchMessageHistory();
//   }, [chatroomId, sessionId, scrollToBottom]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, scrollToBottom]);

//   const sendMessage = () => {
//     if (
//       websocket.current &&
//       websocket.current.readyState === WebSocketReadyState.OPEN &&
//       newMessage.trim()
//     ) {
//       const messageToSend = {
//         type: "chat_message",
//         message: newMessage.trim(),
//       };
//       websocket.current.send(JSON.stringify(messageToSend));
//       setNewMessage("");
//     } else {
//       console.warn(
//         "Cannot send message: WebSocket not connected, message empty, or missing required IDs."
//       );
//       if (!isConnected) {
//         toast.warn(
//           "Chat connection is not ready. Please wait or try refreshing."
//         );
//       } else if (!newMessage.trim()) {
//         // Do nothing for empty message
//       } else {
//         toast.warn("Missing user or session information. Please log in again.");
//       }
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       if (isConnected) {
//         sendMessage();
//       } else {
//         console.warn("Cannot send message on Enter: WebSocket not connected.");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div className="p-3 bg-gray-100 border-b border-gray-300 flex items-center">
//         <button
//           onClick={() =>
//             activityId
//               ? navigate(`/ActivitiesDetails/${activityId}`)
//               : navigate(-1)
//           }
//           className="mr-2"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="flex-grow m-0 text-lg font-semibold">
//           {/* Chat Room: {chatroomId} */}
//            {/* Chat Room: {username} */}
//            Chat with: {username}
//         </h2>
//         <span
//           className={`ml-2 text-sm ${
//             isConnected ? "text-green-600" : "text-red-500"
//           }`}
//         >
//           {isConnected ? "Connected" : "Disconnected"}
//         </span>
//       </div>

//       {/* Message List */}
//       {/* <div className="flex-grow overflow-y-auto p-3 flex flex-col"> */}
//       {/* {console.log("Messages State in Render:", messages)} */}
//       {/* {messages.map((msg, index) => {
//           const isSender = String(msg?.user) === String(loggedInUserId);
//           const isAdmin = String(msg?.user) === String(adminUserId); // Check if the sender is the admin
//           return (
//             <div
//               key={msg?.id || index}
//               className={`mb-2 px-4 py-2 rounded-2xl max-w-[70%] break-words ${
//                 isSender
//                   ? "self-end bg-blue-600 text-white" // Logged-in user's messages on the right in blue
//                   : isAdmin
//                   ? "self-end bg-blue-600 text-white" // Admin's messages also on the right in blue
//                   : "self-start bg-gray-200 text-black" // Other participants' messages on the left in gray
//               }`}
//             >
//               {!isSender && !isAdmin && msg?.username && (
//                 <div className="text-xs text-gray-600 mb-1"></div>
//               )}
//               <span>{msg?.text || "Loading..."}</span>
//               {msg?.timestamp && (
//                 <div
//                   className={`text-xs text-gray-500 mt-1 ${
//                     isSender || isAdmin ? "text-right" : "text-left"
//                   }`}
//                 >
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </div>
//               )}
//             </div> */}
//       {/* );
//         })}
//         <div ref={messagesEndRef} />
//       </div> */}

//       <div className="flex-grow overflow-y-auto p-3 flex flex-col space-y-2">
//         {messages.map((msg) => {
//           const isOwnMessage = msg.user === loggedInUserId;
//           return (
//             <div
//               key={msg.id}
//               className={`flex ${
//                 isOwnMessage ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`rounded-lg px-4 py-2 max-w-xs break-words ${
//                   isOwnMessage
//                     ? "bg-blue-500 text-white"
//                     : "bg-orange-500  text-white"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input Area */}
//       <div className="p-3 border-t border-gray-300 flex items-center">
//         {chatroomId && sessionId ? (
//           <>
//             <input
//               type="text"
//               className="flex-grow mr-2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               disabled={!isConnected}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={!isConnected || !newMessage.trim()}
//               className={`px-4 py-2 rounded-md text-white ${
//                 !isConnected || !newMessage.trim()
//                   ? "bg-blue-300 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               Send
//             </button>
//           </>
//         ) : (
//           <p className="text-orange-500  text-center w-full">
//             Loading chat or session information...
//           </p>
//         )}

//         {chatroomId && sessionId && !isConnected && (
//           <p className="text-orange-500 text-center w-full">Connecting...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatRoomPage;

// import { useState, useEffect, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaLeftLong } from "react-icons/fa6";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Define WebSocket ready states for clarity
// const WebSocketReadyState = {
//   CONNECTING: 0,
//   OPEN: 1,
//   CLOSING: 2,
//   CLOSED: 3,
// };

// function ChatRoomPage() {
//   const { activityId, chatroomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   // State to track connection status for UI
//   const [isConnected, setIsConnected] = useState(false);
//   const websocket = useRef(null);
//   const loggedInUserId = localStorage.getItem("user_id");
//   const username = localStorage.getItem("username");
//   const navigate = useNavigate();
//   const sessionId = localStorage.getItem("sessionid");
//   const messagesEndRef = useRef(null);
//   const adminUserId = localStorage.getItem("admin_user_id"); // Assuming you store the admin's user ID
//   const SocailId = localStorage.getItem("social_id"); // Assuming you store the social ID
//   // console.log("ChatRoomPage: activityId", activityId);

//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
//       console.error(
//         "Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection."
//       );
//       if (!loggedInUserId || !sessionId) {
//         toast.warn("Session information is missing. Please log in again.");
//         // Example: navigate('/login');
//       } else if (!activityId || !chatroomId) {
//         toast.warn(
//           "Chatroom or activity information is missing. Cannot load chat."
//         );
//         // Example: navigate('/');
//       }
//       setIsConnected(false);
//       return;
//     }

//     const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

//     console.log("Attempting to connect WebSocket to:", websocketUrl);

//     if (websocket.current) {
//       console.log(
//         "Closing existing WebSocket connection before creating a new one."
//       );
//       websocket.current.close();
//       setIsConnected(false);
//     }

//     websocket.current = new WebSocket(websocketUrl);

//     websocket.current.onopen = () => {
//       console.log(
//         `✅ WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`
//       );
//       setIsConnected(true);
//     };

//     websocket.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("WebSocket Message Received:", data);

//         // Check if the received data has the expected message structure
//         if (data.message && data.sender && data.sent_at) {
//           // Backend message format: { message: 'text', sender: 'uuid', sent_at: 'timestamp' }
//           const receivedMessage = {
//             user: data.sender,
//             username: data.sender, // Using sender ID as username for now, adjust if backend sends username differently
//             text: data.message, // Message text is directly in data.message
//             timestamp: data.sent_at,
//             id: Math.random().toString(36).substring(7), // Generate a temporary ID for the message in the UI
//           };
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         } else {
//           console.warn("Received unexpected WebSocket message format:", data);
//         }
//         // ****** CHANGE END ******
//       } catch (error) {
//         console.error(
//           "Error parsing or handling received WebSocket message:",
//           error,
//           event.data
//         );
//       }
//     };

//     websocket.current.onerror = (event) => {
//       console.error("❌ WebSocket error:", event);
//       setIsConnected(false);
//       console.warn("WebSocket connection error. Check server and network.");
//     };

//     websocket.current.onclose = (event) => {
//       console.warn("🔌 WebSocket disconnected:", event);
//       console.warn("Close code:", event.code, "Reason:", event.reason);
//       setIsConnected(false);
//     };

//     return () => {
//       if (
//         websocket.current &&
//         websocket.current.readyState !== WebSocketReadyState.CLOSING &&
//         websocket.current.readyState !== WebSocketReadyState.CLOSED
//       ) {
//         console.log(
//           `WebSocket disconnected from chatroom: ${chatroomId} during cleanup`
//         );
//         websocket.current.close();
//       }
//       setIsConnected(false);
//     };
//   }, [activityId, chatroomId, loggedInUserId, sessionId]);

//   // Fetch message history on component mount
//   useEffect(() => {
//     const fetchMessageHistory = async () => {
//       if (chatroomId && sessionId) {
//         console.log("Fetching message history for chatroom:", chatroomId);
//         try {
//           const res = await axios.get(
//             `https://api.upswap.app/api/chat/get-chat-messages/${chatroomId}/`,
//             {
//               headers: {
//                 "X-Session-Id": sessionId,
//                 Authorization: `Bearer ${localStorage.getItem("access")}`,
//               },
//             }
//           );
//           console.log("History API Response:", res.data);
//           // ****** CHANGE START ******
//           if (res.data && Array.isArray(res.data.results)) {
//             const formattedMessages = res.data.results.map((msg) => ({
//               user: msg.sender, // use `sender` not `user`
//               text: msg.content,
//               timestamp: msg.created_at,
//               id: msg.id,
//             }));

//             setMessages(formattedMessages.reverse());
//             console.log("Formatted History Messages:", formattedMessages);
//             scrollToBottom();
//           } else {
//             console.warn(
//               "Message history API did not return results array:",
//               res.data
//             ); // Updated warning
//             setMessages([]);
//           }
//           // ****** CHANGE END ******
//         } catch (error) {
//           console.error("Failed to fetch message history:", error);
//         }
//       } else {
//         console.warn(
//           "Cannot fetch message history: Missing chatroom ID or session ID."
//         );
//         setMessages([]);
//       }
//     };
//     fetchMessageHistory();
//   }, [chatroomId, sessionId, scrollToBottom]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, scrollToBottom]);

//   const sendMessage = () => {
//     if (
//       websocket.current &&
//       websocket.current.readyState === WebSocketReadyState.OPEN &&
//       newMessage.trim()
//     ) {
//       const messageToSend = {
//         type: "chat_message",
//         message: newMessage.trim(),
//       };
//       websocket.current.send(JSON.stringify(messageToSend));
//       setNewMessage("");
//     } else {
//       console.warn(
//         "Cannot send message: WebSocket not connected, message empty, or missing required IDs."
//       );
//       if (!isConnected) {
//         toast.warn(
//           "Chat connection is not ready. Please wait or try refreshing."
//         );
//       } else if (!newMessage.trim()) {
//         // Do nothing for empty message
//       } else {
//         toast.warn("Missing user or session information. Please log in again.");
//       }
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       if (isConnected) {
//         sendMessage();
//       } else {
//         console.warn("Cannot send message on Enter: WebSocket not connected.");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div className="p-3 bg-gray-100 border-b border-gray-300 flex items-center">
//         <button
//           onClick={() =>
//             activityId
//               ? navigate(`/ActivitiesDetails/${activityId}`)
//               : navigate(-1)
//           }
//           className="mr-2"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="flex-grow m-0 text-lg font-semibold">
//           {/* Chat Room: {chatroomId} */}
//           {/* Chat Room: {username} */}
//           Chat with: {username}
//         </h2>
//         <span
//           className={`ml-2 text-sm ${
//             isConnected ? "text-green-600" : "text-red-500"
//           }`}
//         >
//           {isConnected ? "Connected" : "Disconnected"}
//         </span>
//       </div>

//       {/* Message List */}
//       {/* <div className="flex-grow overflow-y-auto p-3 flex flex-col"> */}
//       {/* {console.log("Messages State in Render:", messages)} */}
//       {/* {messages.map((msg, index) => {
//           const isSender = String(msg?.user) === String(loggedInUserId);
//           const isAdmin = String(msg?.user) === String(adminUserId); // Check if the sender is the admin
//           return (
//             <div
//               key={msg?.id || index}
//               className={`mb-2 px-4 py-2 rounded-2xl max-w-[70%] break-words ${
//                 isSender
//                   ? "self-end bg-blue-600 text-white" // Logged-in user's messages on the right in blue
//                   : isAdmin
//                   ? "self-end bg-blue-600 text-white" // Admin's messages also on the right in blue
//                   : "self-start bg-gray-200 text-black" // Other participants' messages on the left in gray
//               }`}
//             >
//               {!isSender && !isAdmin && msg?.username && (
//                 <div className="text-xs text-gray-600 mb-1"></div>
//               )}
//               <span>{msg?.text || "Loading..."}</span>
//               {msg?.timestamp && (
//                 <div
//                   className={`text-xs text-gray-500 mt-1 ${
//                     isSender || isAdmin ? "text-right" : "text-left"
//                   }`}
//                 >
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </div>
//               )}
//             </div> */}
//       {/* );
//         })}
//         <div ref={messagesEndRef} />
//       </div> */}

//       <div className="flex-grow overflow-y-auto p-3 flex flex-col space-y-2">
//         {messages.map((msg) => {
//           const isOwnMessage = msg.user === loggedInUserId;
//           return (
//             <div
//               key={msg.id}
//               className={`flex ${
//                 isOwnMessage ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`rounded-lg px-4 py-2 max-w-xs break-words ${
//                   isOwnMessage
//                     ? "bg-blue-500 text-white"
//                     : "bg-orange-500  text-white"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input Area */}
//       <div className="p-3 border-t border-gray-300 flex items-center">
//         {chatroomId && sessionId ? (
//           <>
//             <input
//               type="text"
//               className="flex-grow mr-2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               disabled={!isConnected}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={!isConnected || !newMessage.trim()}
//               className={`px-4 py-2 rounded-md text-white ${
//                 !isConnected || !newMessage.trim()
//                   ? "bg-blue-300 cursor-not-allowed"
//                   : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               Send
//             </button>
//           </>
//         ) : (
//           <p className="text-orange-500  text-center w-full">
//             Loading chat or session information...
//           </p>
//         )}

//         {chatroomId && sessionId && !isConnected && (
//           <p className="text-orange-500 text-center w-full">Connecting...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatRoomPage;

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define WebSocket ready states for clarity
const WebSocketReadyState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

function ChatRoomPage() {
  const { activityId, chatroomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // State to track connection status for UI
  const [isConnected, setIsConnected] = useState(false);
  const websocket = useRef(null);
  const loggedInUserId = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionid");
  const messagesEndRef = useRef(null);
  const adminUserId = localStorage.getItem("admin_user_id"); // Assuming you store the admin's user ID
  const SocailId = localStorage.getItem("social_id"); // Assuming you store the social ID

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
      console.error(
        "Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection."
      );
      if (!loggedInUserId || !sessionId) {
        toast.warn("Session information is missing. Please log in again.");
      } else if (!activityId || !chatroomId) {
        toast.warn(
          "Chatroom or activity information is missing. Cannot load chat."
        );
      }
      setIsConnected(false);
      return;
    }

    const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

    console.log("Attempting to connect WebSocket to:", websocketUrl);

    if (websocket.current) {
      console.log(
        "Closing existing WebSocket connection before creating a new one."
      );
      websocket.current.close();
      setIsConnected(false);
    }

    websocket.current = new WebSocket(websocketUrl);

    websocket.current.onopen = () => {
      console.log(
        `✅ WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`
      );
      setIsConnected(true);
    };

    websocket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket Message Received:", data);

        if (data.message && data.sender && data.sent_at) {
          const receivedMessage = {
            user: data.sender,
            username: data.sender,
            text: data.message,
            timestamp: data.sent_at,
            id: Math.random().toString(36).substring(7),
          };
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        } else {
          console.warn("Received unexpected WebSocket message format:", data);
        }
      } catch (error) {
        console.error(
          "Error parsing or handling received WebSocket message:",
          error,
          event.data
        );
      }
    };

    websocket.current.onerror = (event) => {
      console.error("❌ WebSocket error:", event);
      setIsConnected(false);
      console.warn("WebSocket connection error. Check server and network.");
    };

    websocket.current.onclose = (event) => {
      console.warn("🔌 WebSocket disconnected:", event);
      console.warn("Close code:", event.code, "Reason:", event.reason);
      setIsConnected(false);
    };

    return () => {
      if (
        websocket.current &&
        websocket.current.readyState !== WebSocketReadyState.CLOSING &&
        websocket.current.readyState !== WebSocketReadyState.CLOSED
      ) {
        console.log(
          `WebSocket disconnected from chatroom: ${chatroomId} during cleanup`
        );
        websocket.current.close();
      }
      setIsConnected(false);
    };
  }, [activityId, chatroomId, loggedInUserId, sessionId]);

  useEffect(() => {
    const fetchMessageHistory = async () => {
      if (chatroomId && sessionId) {
        console.log("Fetching message history for chatroom:", chatroomId);
        try {
          const res = await axios.get(
            `https://api.upswap.app/api/chat/get-chat-messages/${chatroomId}/`,
            {
              headers: {
                "X-Session-Id": sessionId,
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );
          console.log("History API Response:", res.data);
          if (res.data && Array.isArray(res.data.results)) {
            const formattedMessages = res.data.results.map((msg) => ({
              user: msg.sender,
              text: msg.content,
              timestamp: msg.created_at,
              id: msg.id,
            }));

            setMessages(formattedMessages.reverse());
            console.log("Formatted History Messages:", formattedMessages);
            scrollToBottom();
          } else {
            console.warn(
              "Message history API did not return results array:",
              res.data
            );
            setMessages([]);
          }
        } catch (error) {
          console.error("Failed to fetch message history:", error);
        }
      } else {
        console.warn(
          "Cannot fetch message history: Missing chatroom ID or session ID."
        );
        setMessages([]);
      }
    };
    fetchMessageHistory();
  }, [chatroomId, sessionId, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = () => {
    if (
      websocket.current &&
      websocket.current.readyState === WebSocketReadyState.OPEN &&
      newMessage.trim()
    ) {
      const messageToSend = {
        type: "chat_message",
        message: newMessage.trim(),
      };
      websocket.current.send(JSON.stringify(messageToSend));
      setNewMessage("");
    } else {
      console.warn(
        "Cannot send message: WebSocket not connected, message empty, or missing required IDs."
      );
      if (!isConnected) {
        toast.warn(
          "Chat connection is not ready. Please wait or try refreshing."
        );
      } else if (!newMessage.trim()) {
        // Do nothing for empty message
      } else {
        toast.warn("Missing user or session information. Please log in again.");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isConnected) {
        sendMessage();
      } else {
        console.warn("Cannot send message on Enter: WebSocket not connected.");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-3 bg-gray-100 border-b border-gray-300 flex items-center">
        <button
          onClick={() =>
            activityId
              ? navigate(`/ActivitiesDetails/${activityId}`)
              : navigate(-1)
          }
          className="mr-2"
        >
          <FaLeftLong className="w-5 h-5" />
        </button>
        <h2 className="flex-grow m-0 text-lg font-semibold">
          Chat with: {username}
        </h2>
        <span
          className={`ml-2 text-sm ${
            isConnected ? "text-green-600" : "text-red-500"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Message List */}
      <div className="flex-grow overflow-y-auto p-3 flex flex-col space-y-2">
        {messages.map((msg) => {
          const isOwnMessage = String(msg.user) === String(loggedInUserId);
          // const isAdmin = String(msg.user) === String(adminUserId); // Not directly used for styling in this new approach

          let localTime = "";
          if (msg.timestamp) {
            try {
              const date = new Date(msg.timestamp);
              // Options to show only time with AM/PM
              localTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            } catch (error) {
              console.error("Error parsing timestamp:", msg.timestamp, error);
              localTime = "Invalid Time";
            }
          }

          return (
            <div
              key={msg.id}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-xs break-words flex items-end ${
                  // Added flex items-end
                  isOwnMessage
                    ? "bg-blue-500 text-white"
                    : "bg-orange-500 text-white"
                }`}
              >
                {/* Message text */}
                <span className="text-base leading-tight">{msg.text}</span>

                {/* Timestamp */}
                {msg.timestamp && (
                  // <span
                  //   className={`ml-2 text-xs opacity-80 ${ // ml-2 for gap, opacity for subtle look
                  //     isOwnMessage ? "text-blue-200" : "text-orange-200"
                  //   }`}
                  //   style={{ whiteSpace: 'nowrap' }} // Prevent time from wrapping
                  // >
                  //   {localTime}
                  // </span>
                  <sub
                    className={`ml-2 text-xs opacity 90 ${
                      isOwnMessage ? "text-blue-200" : "text-orange-200"
                    }`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {localTime}
                  </sub>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="p-3 border-t border-gray-300 flex items-center">
        {chatroomId && sessionId ? (
          <>
            <input
              type="text"
              className="flex-grow mr-2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isConnected}
            />
            <button
              onClick={sendMessage}
              disabled={!isConnected || !newMessage.trim()}
              className={`px-4 py-2 rounded-md text-white ${
                !isConnected || !newMessage.trim()
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Send
            </button>
          </>
        ) : (
          <p className="text-orange-500 text-center w-full">
            Loading chat or session information...
          </p>
        )}

        {chatroomId && sessionId && !isConnected && (
          <p className="text-orange-500 text-center w-full">Connecting...</p>
        )}
      </div>
    </div>
  );
}

export default ChatRoomPage;
