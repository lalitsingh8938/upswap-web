// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaLeftLong } from 'react-icons/fa6';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Define WebSocket ready states for clarity
// const WebSocketReadyState = {
//     CONNECTING: 0,
//     OPEN: 1,
//     CLOSING: 2,
//     CLOSED: 3
// };

// function ChatRoomPage() {
//   const { activityId, chatroomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   // State to track connection status for UI
//   const [isConnected, setIsConnected] = useState(false);
//   const websocket = useRef(null);
//   const loggedInUserId = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const sessionId = localStorage.getItem("sessionid");

//   useEffect(() => {
//     // console.log("useEffect running with IDs:", { activityId, chatroomId, loggedInUserId, sessionId });

//     if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
//       console.error("Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection.");
//       if (!loggedInUserId || !sessionId) {
//         toast.warn("Session information is missing. Please log in again.");
//         // Example: navigate('/login');
//       } else if (!activityId || !chatroomId) {
//         toast.warn("Chatroom or activity information is missing. Cannot load chat.");
//         // Example: navigate('/');
//       }
//       // Ensure connected state is false if connection cannot be attempted
//       setIsConnected(false);
//       return;
//     }

//     const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

//     console.log("Attempting to connect WebSocket to:", websocketUrl);

//     // Agar pehle se koi connection ref mein hai toh usko band kar do naya banane se pehle
//     if (websocket.current) {
//         console.log("Closing existing WebSocket connection before creating a new one.");
//         websocket.current.close(); // Close the previous connection
//         setIsConnected(false); // Update state immediately upon attempting to close old one
//     }

//     websocket.current = new WebSocket(websocketUrl);

//     websocket.current.onopen = () => {
//       console.log(`✅ WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`);
//       // Connection open ho gaya, state update karo
//       setIsConnected(true);
//     };

//     websocket.current.onmessage = (event) => {
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

//     websocket.current.onerror = (event) => {
//       console.error("❌ WebSocket error:", event);
//       // Connection mein error aaya, state update karo
//       setIsConnected(false); // Connection is no longer healthy/open
//       console.warn("WebSocket connection error. Check server and network.");
//     };

//     // ONCLOSE handler: connection close hone par chalta hai
//     websocket.current.onclose = (event) => {
//       console.warn("🔌 WebSocket disconnected:", event);
//       console.warn("Close code:", event.code, "Reason:", event.reason);
//       // Connection close ho gaya, state update karo
//       setIsConnected(false);
//       // You might want to handle specific close codes here,
//       // e.g., if session is invalid (code 4000 or similar)
//       // if (event.code === 4001) { /* handle invalid session */ }
//       // else if (event.code !== 1000) { /* maybe try to reconnect? */ }
//     };

//     // Cleanup function: component unmount hone par ya StrictMode ke pehle run ke baad chalta hai
//     return () => {
//       if (websocket.current && websocket.current.readyState !== WebSocketReadyState.CLOSING && websocket.current.readyState !== WebSocketReadyState.CLOSED) {
//         console.log(`WebSocket disconnected from chatroom: ${chatroomId} during cleanup`);
//         websocket.current.close(); // Close the connection
//       }
//       // Cleanup ke waqt connection band ho raha hai, state update karo
//       setIsConnected(false);
//       // Agar aapne reconnect logic implement kiya hai with timers,
//       // toh yahan timer ko bhi clear karna important hoga.
//     };
//   }, [activityId, chatroomId, loggedInUserId, sessionId]); // Dependencies theek hain

//   // *** Message History Fetch Effect (Still commented out as in your original code) ***
//   // useEffect(() => {
//   //   const fetchMessageHistory = async () => {
//   //     if (chatroomId && loggedInUserId && sessionId) {
//   //       console.log("Fetching message history for chatroom:", chatroomId);
//   //       try {
//   //         const res = await axios.get(`https://api.upswap.app/api/chat/get-chat-messages/${chatroomId}/`, {
//   //           headers: {
//   //             'X-Session-Id': sessionId,
//   //             // Or 'Authorization': `Bearer ${localStorage.getItem('authToken')}` if using tokens
//   //           },
//   //         });
//   //         if (res.data && Array.isArray(res.data)) {
//   //           setMessages(res.data);
//   //           console.log("Successfully fetched message history:", res.data.length, "messages");
//   //         } else {
//   //           console.warn("Message history API did not return an array:", res.data);
//   //           setMessages([]);
//   //         }
//   //       } catch (error) {
//   //         console.error("Failed to fetch message history:", error);
//   //         if (error.response) {
//   //           console.error("History API error response:", error.response.data);
//   //           console.error("History API error status:", error.response.status);
//   //           console.error("History API error headers:", error.response.headers);
//   //         } else if (error.request) {
//   //           console.error("History API error request:", error.request);
//   //         } else {
//   //           console.error("History API error message:", error.message);
//   //         }
//   //         setMessages([]);
//   //       }
//   //     } else {
//   //       console.warn("Cannot fetch message history: Missing chatroom ID, user ID, or session ID.");
//   //       setMessages([]);
//   //     }
//   //   };
//   //   fetchMessageHistory();
//   // }, [chatroomId, loggedInUserId, sessionId]);

//   const sendMessage = () => {
//     // Message send karne se pehle bhi check kar lo connection OPEN hai ya nahi
//     // isConnected state UI disable/enable ke liye hai, yeh double check safety ke liye acha hai
//     if (websocket.current && websocket.current.readyState === WebSocketReadyState.OPEN && newMessage.trim()) {
//       const messageToSend = {
//         type: 'chat_message',
//         message: {
// //           user: loggedInUserId,
// //           username: localStorage.getItem("username"),
//           text: newMessage.trim(),
// //           chatroom_id: chatroomId,
// //           session_id: sessionId,
//         }
//       };
//       websocket.current.send(JSON.stringify(messageToSend));
//       setNewMessage('');
//     } else {
//       console.warn("Cannot send message: WebSocket not connected, message empty, or missing required IDs.");
//       // Agar connected state false hai toh alert dikhao
//       if (!isConnected) {
//         toast.warn("Chat connection is not ready. Please wait or try refreshing.");
//       } else if (!newMessage.trim()) {
//         // Do nothing for empty message
//       } else {
//        toast.warn("Missing user or session information. Please log in again.");
//       }
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       // Ensure connection is open before sending on Enter
//       if (isConnected) {
//         sendMessage();
//       } else {
//         console.warn("Cannot send message on Enter: WebSocket not connected.");
//         // Optionally alert user if needed
//       }
//     }
//   };

//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div className="chat-room-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <div className="chat-room-header" style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
//         <button
//           onClick={() => activityId ? navigate(`/activity/${activityId}`) : navigate(-1)}
//           className="back-button"
//           style={{ marginRight: '10px' }}
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 style={{ margin: 0, flexGrow: 1 }}>Chat Room: {chatroomId}</h2>
//         {/* Connection Status Indicator (Optional) */}
//         <span style={{ marginLeft: '10px', fontSize: '0.9em', color: isConnected ? 'green' : 'red' }}>
//           {isConnected ? 'Connected' : 'Disconnected'}
//         </span>
//       </div>

//       <div className="message-list" style={{ flexGrow: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column' }}>
//         {messages.map((msg, index) => (
//           <div
//             key={msg.id || index}
//             className={`message ${String(msg.user) === String(loggedInUserId) ? 'sent' : 'received'}`}
//             style={{
//               marginBottom: '5px',
//               padding: '8px 12px',
//               borderRadius: '15px',
//               maxWidth: '70%',
//               wordBreak: 'break-word',
//               alignSelf: String(msg.user) === String(loggedInUserId) ? 'flex-end' : 'flex-start',
//               background: String(msg.user) === String(loggedInUserId) ? '#007bff' : '#e9e9eb',
//               color: String(msg.user) === String(loggedInUserId) ? 'white' : 'black',
//             }}
//           >
//             {String(msg.user) !== String(loggedInUserId) && msg.username && (
//               <div style={{ fontSize: '0.8em', color: '#555', marginBottom: '2px' }}>{msg.username}</div>
//             )}
//             <span className="message-text">{msg.text || 'Loading...'}</span>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="message-input-area" style={{ padding: '10px', borderTop: '1px solid #ccc', display: 'flex' }}>
//         {chatroomId && sessionId ? (
//           <>
//             <input
//               type="text"
//               className="message-input"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               // Disabled prop ab isConnected state par depend karega
//               disabled={!isConnected}
//               style={{ flexGrow: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
//             />
//             <button
//               className="send-button"
//               onClick={sendMessage}
//               // Send button bhi isConnected state par depend karega
//               disabled={!isConnected || !newMessage.trim()}
//               style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//             >
//               Send
//             </button>
//           </>
//         ) : (
//           <p className="text-center text-red-500">Loading chat or session information...</p>
//         )}
//         {/* Optional: Show status if IDs are available but not connected */}
//         {chatroomId && sessionId && !isConnected && (
//              <p className="text-center text-orange-500" style={{ flexGrow: 1, textAlign: 'center' }}>Connecting...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatRoomPage;

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaLeftLong } from 'react-icons/fa6';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Define WebSocket ready states for clarity
// const WebSocketReadyState = {
//     CONNECTING: 0,
//     OPEN: 1,
//     CLOSING: 2,
//     CLOSED: 3
// };

// function ChatRoomPage() {
//   const { activityId, chatroomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   // State to track connection status for UI
//   const [isConnected, setIsConnected] = useState(false);
//   const websocket = useRef(null);
//   const loggedInUserId = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const sessionId = localStorage.getItem("sessionid");

//   useEffect(() => {
//     // console.log("useEffect running with IDs:", { activityId, chatroomId, loggedInUserId, sessionId });

//     if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
//       console.error("Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection.");
//       if (!loggedInUserId || !sessionId) {
//         toast.warn("Session information is missing. Please log in again.");
//         // Example: navigate('/login');
//       } else if (!activityId || !chatroomId) {
//         toast.warn("Chatroom or activity information is missing. Cannot load chat.");
//         // Example: navigate('/');
//       }
//       // Ensure connected state is false if connection cannot be attempted
//       setIsConnected(false);
//       return;
//     }

//     const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

//     console.log("Attempting to connect WebSocket to:", websocketUrl);

//     // Agar pehle se koi connection ref mein hai toh usko band kar do naya banane se pehle
//     if (websocket.current) {
//         console.log("Closing existing WebSocket connection before creating a new one.");
//         websocket.current.close(); // Close the previous connection
//         setIsConnected(false); // Update state immediately upon attempting to close old one
//     }

//     websocket.current = new WebSocket(websocketUrl);

//     websocket.current.onopen = () => {
//       console.log(`✅ WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`);
//       // Connection open ho gaya, state update karo
//       setIsConnected(true);
//     };

//     websocket.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("Message received:", data);
//         if (data.type === 'chat_message' && data.message) {
//           setMessages((prevMessages) => [...prevMessages, data.message]);
//         } else {
// //           console.warn("Received unexpected message format:", data);
//         }
//       } catch (error) {
//         console.error("Error parsing or handling received message:", error, event.data);
//       }
//     };

//     websocket.current.onerror = (event) => {
//       console.error("❌ WebSocket error:", event);
//       // Connection mein error aaya, state update karo
//       setIsConnected(false); // Connection is no longer healthy/open
//       console.warn("WebSocket connection error. Check server and network.");
//     };

//     // ONCLOSE handler: connection close hone par chalta hai
//     websocket.current.onclose = (event) => {
//       console.warn("🔌 WebSocket disconnected:", event);
//       console.warn("Close code:", event.code, "Reason:", event.reason);
//       // Connection close ho gaya, state update karo
//       setIsConnected(false);
//       // You might want to handle specific close codes here,
//       // e.g., if session is invalid (code 4000 or similar)
//       // if (event.code === 4001) { /* handle invalid session */ }
//       // else if (event.code !== 1000) { /* maybe try to reconnect? */ }
//     };

//     // Cleanup function: component unmount hone par ya StrictMode ke pehle run ke baad chalta hai
//     return () => {
//       if (websocket.current && websocket.current.readyState !== WebSocketReadyState.CLOSING && websocket.current.readyState !== WebSocketReadyState.CLOSED) {
//         console.log(`WebSocket disconnected from chatroom: ${chatroomId} during cleanup`);
//         websocket.current.close(); // Close the connection
//       }
//       // Cleanup ke waqt connection band ho raha hai, state update karo
//       setIsConnected(false);
//       // Agar aapne reconnect logic implement kiya hai with timers,
//       // toh yahan timer ko bhi clear karna important hoga.
//     };
//   }, [activityId, chatroomId, loggedInUserId, sessionId]); // Dependencies theek hain

//   // *** Message History Fetch Effect (Still commented out as in your original code) ***
// //    useEffect(() => {
// //     const fetchMessageHistory = async () => {
// //        if (chatroomId && loggedInUserId && sessionId) {
// //          console.log("Fetching message history for chatroom:", chatroomId);
// //          try {
// //            const res = await axios.get(`https://api.upswap.app/api/chat/get-chat-messages/${chatroomId}/`, {
// //              headers: {
// //                'X-Session-Id': sessionId,
// //                // Or 'Authorization': `Bearer ${localStorage.getItem('authToken')}` if using tokens
// //              },
// //            });
// //            if (res.data && Array.isArray(res.data)) {
// //              setMessages(res.data);
// //              console.log("Successfully fetched message history:", res.data.length, "messages");
// //            } else {
// //              console.warn("Message history API did not return an array:", res.data);
// //              setMessages([]);
// //            }
// //          } catch (error) {
// //            console.error("Failed to fetch message history:", error);
// //            if (error.response) {
// //              console.error("History API error response:", error.response.data);
// //              console.error("History API error status:", error.response.status);
// //              console.error("History API error headers:", error.response.headers);
// //            } else if (error.request) {
// //              console.error("History API error request:", error.request);
// //           } else {
// //              console.error("History API error message:", error.message);
// //           }
// //            setMessages([]);
// //          }
// //        } else {
// //          console.warn("Cannot fetch message history: Missing chatroom ID, user ID, or session ID.");
// //          setMessages([]);
// //        }
// //      };
// //      fetchMessageHistory();
// //     }, [chatroomId, loggedInUserId, sessionId]);

//   const sendMessage = () => {
//     // Message send karne se pehle bhi check kar lo connection OPEN hai ya nahi
//     // isConnected state UI disable/enable ke liye hai, yeh double check safety ke liye acha hai
//     if (websocket.current && websocket.current.readyState === WebSocketReadyState.OPEN && newMessage.trim()) {
//       const messageToSend = {
//         type: 'chat_message',
//         message: {
// //           user: loggedInUserId,
// //           username: localStorage.getItem("username"),
//           text: newMessage.trim(),
// //           chatroom_id: chatroomId,
// //           session_id: sessionId,
//         }
//       };
//       websocket.current.send(JSON.stringify(messageToSend));
//       setNewMessage('');
//     } else {
//       console.warn("Cannot send message: WebSocket not connected, message empty, or missing required IDs.");
//       // Agar connected state false hai toh alert dikhao
//       if (!isConnected) {
//         toast.warn("Chat connection is not ready. Please wait or try refreshing.");
//       } else if (!newMessage.trim()) {
//         // Do nothing for empty message
//       } else {
//        toast.warn("Missing user or session information. Please log in again.");
//       }
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       // Ensure connection is open before sending on Enter
//       if (isConnected) {
//         sendMessage();
//       } else {
//         console.warn("Cannot send message on Enter: WebSocket not connected.");
//         // Optionally alert user if needed
//       }
//     }
//   };

//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div className="p-3 bg-gray-100 border-b border-gray-300 flex items-center">
//         <button
//           onClick={() => activityId ? navigate(`/activity/${activityId}`) : navigate(-1)}
//           className="mr-2"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="flex-grow m-0 text-lg font-semibold">Chat Room: {chatroomId}</h2>
//         <span className={`ml-2 text-sm ${isConnected ? 'text-green-600' : 'text-red-500'}`}>
//           {isConnected ? 'Connected' : 'Disconnected'}
//         </span>
//       </div>

//       {/* Message List */}
//       <div className="flex-grow overflow-y-auto p-3 flex flex-col">
//         {messages.map((msg, index) => {
//           const isSender = String(msg.user) === String(loggedInUserId);
//           return (
//             <div
//               key={msg.id || index}
//               className={`mb-2 px-4 py-2 rounded-2xl max-w-[70%] break-words ${
//                 isSender ? 'self-end bg-blue-600 text-white' : 'self-start bg-gray-200 text-black'
//               }`}
//             >
//               {!isSender && msg.username && (
//                 <div className="text-xs text-gray-600 mb-1">{msg.username}</div>
//               )}
//               <span>{msg.text || 'Loading...'}</span>
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
//                 (!isConnected || !newMessage.trim())
//                   ? 'bg-blue-300 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               Send
//             </button>
//           </>
//         ) : (
//           <p className="text-red-500 text-center w-full">Loading chat or session information...</p>
//         )}

//         {chatroomId && sessionId && !isConnected && (
//           <p className="text-orange-500 text-center w-full">Connecting...</p>
//         )}
//       </div>
//     </div>
//   );
// };

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
        // Example: navigate('/login');
      } else if (!activityId || !chatroomId) {
        toast.warn(
          "Chatroom or activity information is missing. Cannot load chat."
        );
        // Example: navigate('/');
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
        // ****** CHANGE START ******
        // Check if the received data has the expected message structure
        if (data.message && data.sender && data.sent_at) {
          // Backend message format: { message: 'text', sender: 'uuid', sent_at: 'timestamp' }
          const receivedMessage = {
            // Use data.sender for the user who sent the message
            // You might need to map sender ID to username if backend doesn't send username
            user: data.sender,
            username: data.sender, // Using sender ID as username for now, adjust if backend sends username differently
            text: data.message, // Message text is directly in data.message
            timestamp: data.sent_at,
            id: Math.random().toString(36).substring(7), // Generate a temporary ID for the message in the UI
          };
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        } else {
          console.warn("Received unexpected WebSocket message format:", data);
        }
        // ****** CHANGE END ******
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

  // Fetch message history on component mount
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
          // ****** CHANGE START ******
          if (res.data && Array.isArray(res.data.results)) {
            // Check res.data.results
            const formattedMessages = res.data.results.map((msg) => ({
              // Use res.data.results
              user: msg.user, // Assuming backend provides user ID here
              username: msg.username, // Assuming backend provides username here
              //  message: newMessage.trim(),
              text: msg.content,
              timestamp: msg.timestamp,
              id: msg.id,
            }));
            setMessages(formattedMessages);
            console.log("Formatted History Messages:", formattedMessages);
            scrollToBottom();
          } else {
            console.warn(
              "Message history API did not return results array:",
              res.data
            ); // Updated warning
            setMessages([]);
          }
          // ****** CHANGE END ******
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
      //  text: msg.content,
        
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
            activityId ? navigate(`/ActivitiesDetails/${activityId}`) : navigate(-1)
          }
          className="mr-2"
        >
          <FaLeftLong className="w-5 h-5" />
        </button>
        <h2 className="flex-grow m-0 text-lg font-semibold">
          Chat Room: {chatroomId}
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
      <div className="flex-grow overflow-y-auto p-3 flex flex-col">
        {/* {console.log("Messages State in Render:", messages)} */}
        {messages.map((msg, index) => {
          const isSender = String(msg?.user) === String(loggedInUserId);
          return (
            <div
              key={msg?.id || index}
              className={`mb-2 px-4 py-2 rounded-2xl max-w-[70%] break-words ${
                isSender
                  ? "self-end bg-blue-600 text-white"
                  : "self-start bg-gray-200 text-black"
              }`}
            >
              {!isSender && msg?.username && (
                <div className="text-xs text-gray-600 mb-1">{msg.username}</div>
              )}
              <span>{msg?.text || "Loading..."}</span>
              {msg?.timestamp && (
                <div
                  className={`text-xs text-gray-500 mt-1 ${
                    isSender ? "text-right" : "text-left"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              )}
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
          <p className="text-red-500 text-center w-full">
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
//       } else if (!activityId || !chatroomId) {
//         toast.warn(
//           "Chatroom or activity information is missing. Cannot load chat."
//         );
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
        
//         if (data.message && data.sender && data.sent_at) {
//           const receivedMessage = {
//             user: data.sender,
//             username: data.sender,
//             text: data.message,
//             timestamp: data.sent_at,
//             id: Math.random().toString(36).substring(7),
//           };
//           setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//         } else {
//           console.warn("Received unexpected WebSocket message format:", data);
//         }
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
//     };

//     websocket.current.onclose = (event) => {
//       console.warn("🔌 WebSocket disconnected:", event);
//       setIsConnected(false);
//     };

//     return () => {
//       if (
//         websocket.current &&
//         websocket.current.readyState !== WebSocketReadyState.CLOSING &&
//         websocket.current.readyState !== WebSocketReadyState.CLOSED
//       ) {
//         websocket.current.close();
//       }
//       setIsConnected(false);
//     };
//   }, [activityId, chatroomId, loggedInUserId, sessionId]);

//   // Fetch message history on component mount
//   useEffect(() => {
//     const fetchMessageHistory = async () => {
//       if (chatroomId && sessionId) {
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
          
//           if (res.data && Array.isArray(res.data.results)) {
//             const formattedMessages = res.data.results.map((msg) => ({
//               user: msg.user,
//               username: msg.username,
//               text: msg.content,
//               timestamp: msg.timestamp,
//               id: msg.id,
//             }));
//             setMessages(formattedMessages);
//             scrollToBottom();
//           } else {
//             setMessages([]);
//           }
//         } catch (error) {
//           console.error("Failed to fetch message history:", error);
//         }
//       } else {
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
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Header */}
//       <div className="p-3 bg-gray-100 border-b border-gray-300 flex items-center">
//         <button
//           onClick={() =>
//             activityId ? navigate(`/ActivitiesDetails/${activityId}`) : navigate(-1)
//           }
//           className="mr-2"
//         >
//           <FaLeftLong className="w-5 h-5" />
//         </button>
//         <h2 className="flex-grow m-0 text-lg font-semibold">
//           Chat Room: {chatroomId}
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
//       <div className="flex-grow overflow-y-auto p-3 flex flex-col">
//         {messages.map((msg, index) => {
//           // Check if message is from the current logged-in user
//           const isCurrentUser = String(msg?.user) === String(loggedInUserId);
          
//           return (
//             <div
//               key={msg?.id || index}
//               className={`mb-2 px-4 py-2 rounded-2xl max-w-[70%] break-words ${
//                 isCurrentUser
//                   ? "self-end bg-blue-600 text-white"
//                   : "self-start bg-gray-200 text-black"
//               }`}
//             >
//               {/* Show username only for messages from other users */}
//               {!isCurrentUser && msg?.username && (
//                 <div className="text-xs text-gray-600 mb-1">{msg.username}</div>
//               )}
//               <span>{msg?.text || "Loading..."}</span>
//               {msg?.timestamp && (
//                 <div
//                   className={`text-xs mt-1 ${
//                     isCurrentUser ? "text-blue-200 text-right" : "text-gray-500 text-left"
//                   }`}
//                 >
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </div>
//               )}
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
//           <p className="text-red-500 text-center w-full">
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