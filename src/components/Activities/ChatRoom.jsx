// // ChatRoom.jsx
// import React, { useState, useEffect, useRef } from "react";

// const ChatRoom = ({ roomId, userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [socket, setSocket] = useState(null);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (!roomId) return;

//     const ws = new WebSocket(`wss://api.upswap.app/ws/chat/${roomId}/`);
//     setSocket(ws);

//     ws.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     ws.onmessage = (e) => {
//       const data = JSON.parse(e.data);
//       if (data.message) {
//         setMessages((prev) => [...prev, data]);
//       }
//     };

//     ws.onclose = () => {
//       console.log("WebSocket disconnected");
//     };

//     return () => ws.close();
//   }, [roomId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (socket && input.trim()) {
//       const messageData = {
//         message: input.trim(),
//         sender: userId,
//       };
//       socket.send(JSON.stringify(messageData));
//       setMessages((prev) => [...prev, messageData]);
//       setInput("");
//     }
//   };

//   return (
//     <div className="flex flex-col w-full h-[400px] border rounded-lg p-4 bg-white">
//       <div className="flex-1 overflow-y-auto space-y-2 mb-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-2 rounded-lg w-fit max-w-[80%] ${
//               msg.sender === userId ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"
//             }`}
//           >
//             {msg.message}
//           </div>
//         ))}
//         <div ref={bottomRef} />
//       </div>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="flex-1 border p-2 rounded-lg"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;


// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';

// function ChatRoom() {
//   const { chatRoomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const websocket = useRef(null);
//   const loggedInUserId = localStorage.getItem("user_id"); // Get user ID

//   useEffect(() => {
//     if (chatRoomId && loggedInUserId) {
//       websocket.current = new WebSocket(`ws://your_django_domain/ws/chat/${chatRoomId}/`);

//       websocket.current.onopen = () => {
//         console.log(`WebSocket connected to chat room: ${chatRoomId} for user: ${loggedInUserId}`);
//       };

//       websocket.current.onclose = (event) => {
//         console.log(`WebSocket disconnected from chat room: ${chatRoomId}:`, event);
//       };

//       websocket.current.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         if (data.type === 'chat_message') {
//           setMessages((prevMessages) => [...prevMessages, {
//             sender: data.sender,
//             message: data.message
//           }]);
//         }
//       };

//       return () => {
//         if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
//           websocket.current.close();
//         }
//       };
//     }
//   }, [chatRoomId, loggedInUserId]);

//   const handleSendMessage = (event) => {
//     event.preventDefault();
//     if (newMessage && websocket.current && websocket.current.readyState === WebSocket.OPEN) {
//       websocket.current.send(JSON.stringify({
//         type: 'chat_message',
//         sender: loggedInUserId, // Or fetch username if available
//         message: newMessage,
//         chatroom_id: chatRoomId,
//       }));
//       setNewMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="bg-gray-200 p-4">
//         <h2>Chat Room: {chatRoomId}</h2>
//       </div>
//       <div className="flex-1 overflow-y-auto p-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-2 p-2 rounded-md ${msg.sender === loggedInUserId ? 'bg-blue-100 self-end text-right' : 'bg-gray-100 self-start text-left'}`}
//           >
//             <span className="font-semibold">{msg.sender}:</span> {msg.message}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSendMessage} className="p-4 bg-gray-300">
//         <div className="flex">
//           <input
//             type="text"
//             className="flex-grow mr-2 p-2 border rounded-md"
//             placeholder="Type your message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
//           >
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ChatRoom;

// // src/components/ChatRoom/ChatRoomPage.jsx
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaLeftLong } from 'react-icons/fa6';
// // import './ChatRoomPage.css'; // Remove or create this file if needed

// function ChatRoomPage() {
//   // *** यहाँ दोनों IDs प्राप्त करें ***
//   const { activityId, chatroomId } = useParams(); // Get both IDs from URL
//   const [messages, setMessages] = useState([]); // State to store chat messages
//   const [newMessage, setNewMessage] = useState(''); // State for the new message input
//   const websocket = useRef(null); // Ref to hold the WebSocket instance
//   const loggedInUserId = localStorage.getItem("user_id"); // Get logged-in user ID
//   const navigate = useNavigate(); // For navigation

//   // Get sessionId from localStorage
//   const sessionId = localStorage.getItem("sessionid"); // Assuming sessionId is stored with key "sessionid"

//   // WebSocket Effect (establish and manage the WebSocket connection)
//   useEffect(() => {
//     // Ensure all required IDs are available
//     if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
//       console.error("Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection.");
//       // Optionally redirect user or show an error if required data is missing
//          if (!loggedInUserId || !sessionId) {
//              alert("Session information is missing. Please log in again.");
//              // Example: navigate('/login'); // Redirect to login page
//          } else if (!activityId || !chatroomId) {
//              alert("Chatroom or activity information is missing. Cannot load chat.");
//              // Example: navigate('/'); // Redirect to home page
//          }
//       return; // Stop the effect if data is missing
//     }

//     // Establish WebSocket connection with chatroomId and sessionId in the URL
//     // Use the exact base URL and format provided by me
//     const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

//     console.log("Attempting to connect WebSocket to:", websocketUrl);

//     websocket.current = new WebSocket(websocketUrl);

//     websocket.current.onopen = () => {
//       console.log(`WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`);
//       // Maybe send user_id or other info upon connection if your backend expects it for authentication/identification
//       // Example:
//       // if (loggedInUserId) {
//       //   websocket.current.send(JSON.stringify({ type: 'user_identify', user_id: loggedInUserId }));
//       // }
//     };

//     // *** यहाँ Incoming message को handle करने का तरीका सही करें ***
//     websocket.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("Message received:", data);

//         // Assuming the message data format from your backend includes 'type' and 'message'
//         // And data.message is the actual message object { user, username, text, etc. }
//         // Adjust based on your backend WebSocket message format
//         if (data.type === 'chat_message' && data.message) {
//            // Add the new message to the messages state
//            setMessages((prevMessages) => [...prevMessages, data.message]);
//         } else {
//            console.warn("Received unexpected message format:", data);
//            // Optionally handle other message types or display a generic received message
//         }
//       } catch (error) {
//         console.error("Error parsing or handling received message:", error, event.data);
//       }
//     };
//     // *** onmessage correction ends here ***


//     websocket.current.onclose = (event) => {
//       console.log("WebSocket disconnected:", event);
//       // Attempt to reconnect or show a message to the user
//       console.log("Close code:", event.code, "Reason:", event.reason);
//       // You might want to implement a reconnection logic here
//       // e.g., setTimeout(() => { connectWebSocket() }, 1000);
//     };

//     websocket.current.onerror = (error) => {
//       console.error("WebSocket error:", error);
//       // Show error message to the user
//       alert("WebSocket error. Could not connect to chat.");
//     };

//     // Cleanup function: Close the WebSocket connection when the component unmounts
//     return () => {
//       // Check if websocket.current exists and is not already closing or closed
//       if (websocket.current && websocket.current.readyState !== WebSocket.CLOSING && websocket.current.readyState !== WebSocket.CLOSED) {
//         websocket.current.close();
//         console.log(`WebSocket disconnected from chatroom: ${chatroomId} during cleanup`);
//       }
//     };
//   }, [activityId, chatroomId, loggedInUserId, sessionId]); // Add sessionId to dependencies


//    // *** Message History Fetch Effect - Already present, but added error logging details ***
//    // This useEffect runs when chatroomId, loggedInUserId, or sessionId changes
// //    useEffect(() => {
// //        const fetchMessageHistory = async () => {
// //            // Check if chatroomId, loggedInUserId, and sessionId are available before fetching history
// //            if (chatroomId && loggedInUserId && sessionId) {
// //                console.log("Fetching message history for chatroom:", chatroomId);
// //                try {
// //                    // **NOTE:** You need a backend API to fetch message history for a chatroom
// //                    // This API might also require sessionId or other auth
// //                    const res = await axios.get(`https://api.upswap.app/api/chat/get-chat-messages/<str:chat_room_id>/`, {
// //                        headers: {
// //                            // Example of passing sessionId in headers (common for auth)
// //                            'X-Session-Id': sessionId,
// //                             // Or use standard Authorization header if your API uses tokens/JWT
// //                             // 'Authorization': `Bearer YOUR_AUTH_TOKEN`
// //                        },
// //                         // If your API expects sessionId as a query parameter instead:
// //                         // params: { session_id: sessionId }
// //                    });
// //                    // Assuming the response is an array of message objects { id, user, text, timestamp, etc. }
// //                    if (res.data && Array.isArray(res.data)) { // Check if data is an array
// //                        // *** Purane messages ko state mein set karein ***
// //                        setMessages(res.data);
// //                        console.log("Successfully fetched message history:", res.data.length, "messages");
// //                    } else {
// //                         console.warn("Message history API did not return an array:", res.data);
// //                          setMessages([]); // Clear messages if history is not in expected format
// //                     }
// //                } catch (error) {
// //                    console.error("Failed to fetch message history:", error);
// //                     // Log the specific CORS error details if available
// //                     if (error.response) {
// //                         console.error("History API error response:", error.response.data);
// //                         console.error("History API error status:", error.response.status);
// //                         console.error("History API error headers:", error.response.headers);
// //                     } else if (error.request) {
// //                          console.error("History API error request:", error.request);
// //                     } else {
// //                         console.error("History API error message:", error.message);
// //                     }
// //                     setMessages([]); // Clear messages on error
// //                }
// //            } else {
// //                 console.warn("Cannot fetch message history: Missing chatroom ID, user ID, or session ID.");
// //                  setMessages([]); // Clear messages if required data is missing
// //             }
// //        };
// //         // Fetch history when chatroom, user, or session ID changes
// //         // This runs when component mounts and dependencies are available/change
// //        fetchMessageHistory();

// //    }, [chatroomId, loggedInUserId, sessionId]); // Add sessionId to history fetch dependencies


//   const sendMessage = () => {
//     // Check if WebSocket is open, message is not empty, and required IDs are available
//     if (websocket.current && websocket.current.readyState === WebSocket.OPEN && newMessage.trim() && loggedInUserId && chatroomId && sessionId) {
//       const messageToSend = {
//         type: 'chat_message', // Message type, adjust based on your backend needs
//         // The actual message payload - adjust based on your backend expectations
//         message: {
//           // You might need to include sender identification (user ID, username)
//           user: loggedInUserId, // Sender's user ID
//           username: localStorage.getItem("username"), // Example: get username from local storage if available
//           text: newMessage.trim(), // The message text
//           // Add timestamp or other info if needed by backend
//           // Include chatroom_id or session_id in the payload if your backend requires it for processing
//           chatroom_id: chatroomId,
//           session_id: sessionId,
//           // Optionally add a temporary ID for optimistic updates
//           // id: Date.now(), // Simple temporary ID
//         }
//       };
//       websocket.current.send(JSON.stringify(messageToSend));
//       setNewMessage(''); // Clear the input field after sending

//       // Optional: Optimistic update - add the message to the UI immediately
//       // Ensure the format matches what your backend sends back
//       // setMessages(prevMessages => [...prevMessages, {
//       //    user: loggedInUserId,
//       //    username: localStorage.getItem("username"),
//       //    text: newMessage.trim(),
//       //    // timestamp: new Date().toISOString(), // Add client timestamp
//       //    // id: messageToSend.message.id, // Use the temporary ID
//       // }]);

//     } else {
//        console.warn("Cannot send message: WebSocket not connected, message empty, or missing required IDs.");
//        // Provide user feedback if sending fails
//        if (!websocket.current || websocket.current.readyState !== WebSocket.OPEN) {
//            alert("Chat connection is not ready. Please wait or try refreshing.");
//        } else if (!newMessage.trim()) {
//            // Do nothing for empty message, it's a warning for developers
//        } else {
//            alert("Missing user or session information. Please log in again.");
//        }
//     }
//   };

//    // Handle Enter key press in the input field
//    const handleKeyDown = (event) => {
//        if (event.key === 'Enter') {
//            event.preventDefault(); // Prevent default form submission/newline
//            sendMessage();
//        }
//    };

//    // Optional: Ref for auto-scrolling messages
//    const messagesEndRef = useRef(null);

//    const scrollToBottom = () => {
//      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//    }

//    // Scroll to bottom whenever messages update
//    useEffect(() => {
//      scrollToBottom();
//    }, [messages]);


//   return (
//     <div className="chat-room-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}> {/* Added some inline styles for layout */}
//       {/* Top bar with back button */}
//       <div className="chat-room-header" style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
//          {/* Back button - navigates to activity details page */}
//          {/* Ensure activityId is available before creating the back button path */}
//          <button
//             onClick={() => activityId ? navigate(`/activity/${activityId}`) : navigate(-1)} // Go back to activity or previous page
//             className="back-button" // Add CSS class if using ChatRoomPage.css
//             style={{ marginRight: '10px' }} // Example inline style
//           >
//             <FaLeftLong className="w-5 h-5" />
//           </button>
//         <h2 style={{ margin: 0, flexGrow: 1 }}>Chat Room: {chatroomId}</h2> {/* Still displaying chatroomId in header */}
//       </div>

//       {/* Message List Area - Scrolls */}
//       <div className="message-list" style={{ flexGrow: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column' }}>
//         {/* Display messages */}
//         {messages.map((msg, index) => (
//           // *** यहाँ messages को display करने का तरीका सही करें ***
//           // Assuming each message object { user, username, text, timestamp, ... }
//           // Adjust based on the actual message object format from your backend (both history and websocket)
//           <div
//               key={msg.id || index} // Use a unique ID if available, otherwise use index (less ideal)
//               className={`message ${String(msg.user) === String(loggedInUserId) ? 'sent' : 'received'}`}
//               style={{
//                   marginBottom: '5px',
//                   padding: '8px 12px',
//                   borderRadius: '15px',
//                   maxWidth: '70%',
//                   wordBreak: 'break-word',
//                   alignSelf: String(msg.user) === String(loggedInUserId) ? 'flex-end' : 'flex-start',
//                   background: String(msg.user) === String(loggedInUserId) ? '#007bff' : '#e9e9eb',
//                   color: String(msg.user) === String(loggedInUserId) ? 'white' : 'black',
//               }}
//           >
//              {/* Display sender's username/ID above message text if it's a received message */}
//              {/* Assuming message object has a 'username' field */}
//              {String(msg.user) !== String(loggedInUserId) && msg.username && (
//                  <div style={{ fontSize: '0.8em', color: '#555', marginBottom: '2px' }}>{msg.username}</div>
//              )}
//             <span className="message-text">{msg.text || 'Loading...'}</span> {/* Display msg.text */}
//              {/* Optional timestamp */}
//              {/* {msg.timestamp && <span style={{ fontSize: '0.7em', color: String(msg.user) === String(loggedInUserId) ? '#ccc' : '#555', marginLeft: '10px' }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>} */}
//           </div>
//           // *** messages display correction ends here ***
//         ))}
//          {/* Element to scroll to */}
//          <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input Area */}
//       <div className="message-input-area" style={{ padding: '10px', borderTop: '1px solid #ccc', display: 'flex' }}>
//         {/* Check if chatroomId and sessionId are available before showing input */}
//         {chatroomId && sessionId ? (
//            <>
//             <input
//               type="text"
//               className="message-input"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               // Disable input if WebSocket is not open
//               disabled={!websocket.current || websocket.current.readyState !== WebSocket.OPEN}
//               style={{ flexGrow: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
//             />
//             <button
//               className="send-button"
//               onClick={sendMessage}
//               // Disable button if WebSocket is not open or message is empty
//               disabled={!websocket.current || websocket.current.readyState !== WebSocket.OPEN || !newMessage.trim()}
//               style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//             >
//               Send
//             </button>
//            </>
//         ) : (
//             <p className="text-center text-red-500">Loading chat or session information...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatRoomPage;

// src/components/ChatRoom/ChatRoomPage.jsx


// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaLeftLong } from 'react-icons/fa6';
// // import './ChatRoomPage.css'; // Remove or create this file if needed

// function ChatRoomPage() {
//   const { activityId, chatroomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const websocket = useRef(null);
//   const loggedInUserId = localStorage.getItem("user_id");
//   const navigate = useNavigate();
//   const sessionId = localStorage.getItem("sessionid");

//   useEffect(() => {
//     // console.log("useEffect running with IDs:", { activityId, chatroomId, loggedInUserId, sessionId });

//     if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
//       console.error("Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection.");
//       if (!loggedInUserId || !sessionId) {
//         alert("Session information is missing. Please log in again.");
//         // Example: navigate('/login');
//       } else if (!activityId || !chatroomId) {
//         alert("Chatroom or activity information is missing. Cannot load chat.");
//         // Example: navigate('/');
//       }
//       return;
//     }

//     const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

//     console.log("Attempting to connect WebSocket to:", websocketUrl);

//     // Agar pehle se koi connection ref mein hai toh usko band kar do naya banane se pehle
//     // Yeh StrictMode mein double-run handle karne mein help karega, ya agar dependencies change hon toh
//     if (websocket.current) {
//         websocket.current.close();
//         console.log("Closing existing WebSocket connection before creating a new one.");
//     }

//     websocket.current = new WebSocket(websocketUrl);

//     websocket.current.onopen = () => {
//       console.log(`✅ WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`);
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
//       // alert("WebSocket error. Could not connect to chat."); // Re-enabling alert can be annoying in development
//       console.warn("WebSocket connection error. Check server and network.");
//     };

//     // ONCLOSE log uncommented
//     websocket.current.onclose = (event) => {
//       console.warn("🔌 WebSocket disconnected:", event);
//       console.warn("Close code:", event.code, "Reason:", event.reason);
//       // You might want to handle specific close codes here,
//       // e.g., if session is invalid (code 4000 or similar)
//       // if (event.code === 4001) { /* handle invalid session */ }
//       // else if (event.code !== 1000) { /* maybe try to reconnect? */ }
//     };

//     // Cleanup function: component unmount hone par ya StrictMode ke pehle run ke baad chalta hai
//     return () => {
//       if (websocket.current && websocket.current.readyState !== WebSocket.CLOSING && websocket.current.readyState !== WebSocket.CLOSED) {
//         websocket.current.close();
//         console.log(`WebSocket disconnected from chatroom: ${chatroomId} during cleanup`);
//       }
//       // Agar aapne reconnect logic implement kiya hai with timers,
//       // toh yahan timer ko bhi clear karna important hoga.
//     };
//   }, [activityId, chatroomId, loggedInUserId, sessionId]); // Dependencies theek hain

//   // *** Message History Fetch Effect (Still commented out as in your original code) ***
//    useEffect(() => {
//      const fetchMessageHistory = async () => {
//        if (chatroomId && loggedInUserId && sessionId) {
//          console.log("Fetching message history for chatroom:", chatroomId);
//          try {
//            const res = await axios.get(`https://api.upswap.app/api/chat/get-chat-messages/${chatroomId}/`, {
//              headers: {
//                'X-Session-Id': sessionId,
//                // Or 'Authorization': `Bearer ${localStorage.getItem('authToken')}` if using tokens
//              },
//            });
//            if (res.data && Array.isArray(res.data)) {
//              setMessages(res.data);
//              console.log("Successfully fetched message history:", res.data.length, "messages");
//            } else {
//              console.warn("Message history API did not return an array:", res.data);
//              setMessages([]);
//            }
//          } catch (error) {
//            console.error("Failed to fetch message history:", error);
//            if (error.response) {
//              console.error("History API error response:", error.response.data);
//              console.error("History API error status:", error.response.status);
//              console.error("History API error headers:", error.response.headers);
//            } else if (error.request) {
//              console.error("History API error request:", error.request);
//            } else {
//              console.error("History API error message:", error.message);
//            }
//            setMessages([]);
//          }
//        } else {
//          console.warn("Cannot fetch message history: Missing chatroom ID, user ID, or session ID.");
//          setMessages([]);
//        }
//      };
//      fetchMessageHistory();
//   }, [chatroomId, loggedInUserId, sessionId]);

//   const sendMessage = () => {
//     if (websocket.current && websocket.current.readyState === WebSocket.OPEN && newMessage.trim() && loggedInUserId && chatroomId && sessionId) {
//       const messageToSend = {
//         type: 'chat_message',
//         message: {
//           user: loggedInUserId,
//           username: localStorage.getItem("username"),
//           text: newMessage.trim(),
//           chatroom_id: chatroomId,
//           session_id: sessionId,
//         }
//       };
//       websocket.current.send(JSON.stringify(messageToSend));
//       setNewMessage('');
//     } else {
//       console.warn("Cannot send message: WebSocket not connected, message empty, or missing required IDs.");
//       if (!websocket.current || websocket.current.readyState !== WebSocket.OPEN) {
//         alert("Chat connection is not ready. Please wait or try refreshing.");
//       } else if (!newMessage.trim()) {
//         // Do nothing for empty message
//       } else {
//         alert("Missing user or session information. Please log in again.");
//       }
//     }
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       sendMessage();
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
//               disabled={!websocket.current || websocket.current.readyState !== WebSocket.OPEN}
//               style={{ flexGrow: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
//             />
//             <button
//               className="send-button"
//               onClick={sendMessage}
//               disabled={!websocket.current || websocket.current.readyState !== WebSocket.OPEN || !newMessage.trim()}
//               style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//             >
//               Send
//             </button>
//           </>
//         ) : (
//           <p className="text-center text-red-500">Loading chat or session information...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatRoomPage;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLeftLong } from 'react-icons/fa6';
// import './ChatRoomPage.css'; // Remove or create this file if needed

// Define WebSocket ready states for clarity
const WebSocketReadyState = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};


function ChatRoomPage() {
  const { activityId, chatroomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // State to track connection status for UI
  const [isConnected, setIsConnected] = useState(false);
  const websocket = useRef(null);
  const loggedInUserId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionid");

  useEffect(() => {
    // console.log("useEffect running with IDs:", { activityId, chatroomId, loggedInUserId, sessionId });

    if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
      console.error("Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection.");
      if (!loggedInUserId || !sessionId) {
        alert("Session information is missing. Please log in again.");
        // Example: navigate('/login');
      } else if (!activityId || !chatroomId) {
        alert("Chatroom or activity information is missing. Cannot load chat.");
        // Example: navigate('/');
      }
      // Ensure connected state is false if connection cannot be attempted
      setIsConnected(false);
      return;
    }

    const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

    console.log("Attempting to connect WebSocket to:", websocketUrl);

    // Agar pehle se koi connection ref mein hai toh usko band kar do naya banane se pehle
    if (websocket.current) {
        console.log("Closing existing WebSocket connection before creating a new one.");
        websocket.current.close(); // Close the previous connection
        setIsConnected(false); // Update state immediately upon attempting to close old one
    }

    websocket.current = new WebSocket(websocketUrl);

    websocket.current.onopen = () => {
      console.log(`✅ WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`);
      // Connection open ho gaya, state update karo
      setIsConnected(true);
    };

    websocket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);
        if (data.type === 'chat_message' && data.message) {
          setMessages((prevMessages) => [...prevMessages, data.message]);
        } else {
          console.warn("Received unexpected message format:", data);
        }
      } catch (error) {
        console.error("Error parsing or handling received message:", error, event.data);
      }
    };

    websocket.current.onerror = (event) => {
      console.error("❌ WebSocket error:", event);
      // Connection mein error aaya, state update karo
      setIsConnected(false); // Connection is no longer healthy/open
      console.warn("WebSocket connection error. Check server and network.");
    };

    // ONCLOSE handler: connection close hone par chalta hai
    websocket.current.onclose = (event) => {
      console.warn("🔌 WebSocket disconnected:", event);
      console.warn("Close code:", event.code, "Reason:", event.reason);
      // Connection close ho gaya, state update karo
      setIsConnected(false);
      // You might want to handle specific close codes here,
      // e.g., if session is invalid (code 4000 or similar)
      // if (event.code === 4001) { /* handle invalid session */ }
      // else if (event.code !== 1000) { /* maybe try to reconnect? */ }
    };

    // Cleanup function: component unmount hone par ya StrictMode ke pehle run ke baad chalta hai
    return () => {
      if (websocket.current && websocket.current.readyState !== WebSocketReadyState.CLOSING && websocket.current.readyState !== WebSocketReadyState.CLOSED) {
        console.log(`WebSocket disconnected from chatroom: ${chatroomId} during cleanup`);
        websocket.current.close(); // Close the connection
      }
      // Cleanup ke waqt connection band ho raha hai, state update karo
      setIsConnected(false);
      // Agar aapne reconnect logic implement kiya hai with timers,
      // toh yahan timer ko bhi clear karna important hoga.
    };
  }, [activityId, chatroomId, loggedInUserId, sessionId]); // Dependencies theek hain

  // *** Message History Fetch Effect (Still commented out as in your original code) ***
  // useEffect(() => {
  //   const fetchMessageHistory = async () => {
  //     if (chatroomId && loggedInUserId && sessionId) {
  //       console.log("Fetching message history for chatroom:", chatroomId);
  //       try {
  //         const res = await axios.get(`https://api.upswap.app/api/chat/get-chat-messages/${chatroomId}/`, {
  //           headers: {
  //             'X-Session-Id': sessionId,
  //             // Or 'Authorization': `Bearer ${localStorage.getItem('authToken')}` if using tokens
  //           },
  //         });
  //         if (res.data && Array.isArray(res.data)) {
  //           setMessages(res.data);
  //           console.log("Successfully fetched message history:", res.data.length, "messages");
  //         } else {
  //           console.warn("Message history API did not return an array:", res.data);
  //           setMessages([]);
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch message history:", error);
  //         if (error.response) {
  //           console.error("History API error response:", error.response.data);
  //           console.error("History API error status:", error.response.status);
  //           console.error("History API error headers:", error.response.headers);
  //         } else if (error.request) {
  //           console.error("History API error request:", error.request);
  //         } else {
  //           console.error("History API error message:", error.message);
  //         }
  //         setMessages([]);
  //       }
  //     } else {
  //       console.warn("Cannot fetch message history: Missing chatroom ID, user ID, or session ID.");
  //       setMessages([]);
  //     }
  //   };
  //   fetchMessageHistory();
  // }, [chatroomId, loggedInUserId, sessionId]);

  const sendMessage = () => {
    // Message send karne se pehle bhi check kar lo connection OPEN hai ya nahi
    // isConnected state UI disable/enable ke liye hai, yeh double check safety ke liye acha hai
    if (websocket.current && websocket.current.readyState === WebSocketReadyState.OPEN && newMessage.trim() && loggedInUserId && chatroomId && sessionId) {
      const messageToSend = {
        type: 'chat_message',
        message: {
          user: loggedInUserId,
          username: localStorage.getItem("username"),
          text: newMessage.trim(),
          chatroom_id: chatroomId,
          session_id: sessionId,
        }
      };
      websocket.current.send(JSON.stringify(messageToSend));
      setNewMessage('');
    } else {
      console.warn("Cannot send message: WebSocket not connected, message empty, or missing required IDs.");
      // Agar connected state false hai toh alert dikhao
      if (!isConnected) {
        alert("Chat connection is not ready. Please wait or try refreshing.");
      } else if (!newMessage.trim()) {
        // Do nothing for empty message
      } else {
        alert("Missing user or session information. Please log in again.");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Ensure connection is open before sending on Enter
      if (isConnected) {
        sendMessage();
      } else {
        console.warn("Cannot send message on Enter: WebSocket not connected.");
        // Optionally alert user if needed
      }
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-room-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div className="chat-room-header" style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => activityId ? navigate(`/activity/${activityId}`) : navigate(-1)}
          className="back-button"
          style={{ marginRight: '10px' }}
        >
          <FaLeftLong className="w-5 h-5" />
        </button>
        <h2 style={{ margin: 0, flexGrow: 1 }}>Chat Room: {chatroomId}</h2>
        {/* Connection Status Indicator (Optional) */}
        <span style={{ marginLeft: '10px', fontSize: '0.9em', color: isConnected ? 'green' : 'red' }}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="message-list" style={{ flexGrow: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, index) => (
          <div
            key={msg.id || index}
            className={`message ${String(msg.user) === String(loggedInUserId) ? 'sent' : 'received'}`}
            style={{
              marginBottom: '5px',
              padding: '8px 12px',
              borderRadius: '15px',
              maxWidth: '70%',
              wordBreak: 'break-word',
              alignSelf: String(msg.user) === String(loggedInUserId) ? 'flex-end' : 'flex-start',
              background: String(msg.user) === String(loggedInUserId) ? '#007bff' : '#e9e9eb',
              color: String(msg.user) === String(loggedInUserId) ? 'white' : 'black',
            }}
          >
            {String(msg.user) !== String(loggedInUserId) && msg.username && (
              <div style={{ fontSize: '0.8em', color: '#555', marginBottom: '2px' }}>{msg.username}</div>
            )}
            <span className="message-text">{msg.text || 'Loading...'}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-area" style={{ padding: '10px', borderTop: '1px solid #ccc', display: 'flex' }}>
        {chatroomId && sessionId ? (
          <>
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              // Disabled prop ab isConnected state par depend karega
              disabled={!isConnected}
              style={{ flexGrow: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button
              className="send-button"
              onClick={sendMessage}
              // Send button bhi isConnected state par depend karega
              disabled={!isConnected || !newMessage.trim()}
              style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Send
            </button>
          </>
        ) : (
          <p className="text-center text-red-500">Loading chat or session information...</p>
        )}
        {/* Optional: Show status if IDs are available but not connected */}
        {chatroomId && sessionId && !isConnected && (
             <p className="text-center text-orange-500" style={{ flexGrow: 1, textAlign: 'center' }}>Connecting...</p>
        )}
      </div>
    </div>
  );
}

export default ChatRoomPage;

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaLeftLong } from 'react-icons/fa6';
// // import './ChatRoomPage.css'; // Remove or create this file if needed

// function ChatRoomPage() {
//   // *** यहाँ दोनों IDs प्राप्त करें ***
//   const { activityId, chatroomId } = useParams(); // Get both IDs from URL
//   const [messages, setMessages] = useState([]); // State to store chat messages
//   const [newMessage, setNewMessage] = useState(''); // State for the new message input
//   const websocket = useRef(null); // Ref to hold the WebSocket instance
//   const loggedInUserId = localStorage.getItem("user_id"); // Get logged-in user ID
//   const navigate = useNavigate(); // For navigation

//   // Get sessionId from localStorage
//   const sessionId = localStorage.getItem("sessionid"); // Assuming sessionId is stored with key "sessionid"

//   // WebSocket Effect (establish and manage the WebSocket connection)
//   useEffect(() => {
//     // Ensure all required IDs are available
//     if (!activityId || !chatroomId || !loggedInUserId || !sessionId) {
//       console.error("Required IDs (Activity, Chatroom, User, or Session) are missing. Cannot establish WebSocket connection.");
//       // Optionally redirect user or show an error if required data is missing
//          if (!loggedInUserId || !sessionId) {
//              alert("Session information is missing. Please log in again.");
//              // Example: navigate('/login'); // Redirect to login page
//          } else if (!activityId || !chatroomId) {
//              alert("Chatroom or activity information is missing. Cannot load chat.");
//              // Example: navigate('/'); // Redirect to home page
//          }
//       return; // Stop the effect if data is missing
//     }

//     // Establish WebSocket connection with chatroomId and sessionId in the URL
//     // Use the exact base URL and format provided by you
//     const websocketUrl = `wss://api.upswap.app/ws/ws/uchat/${chatroomId}/${sessionId}/`;

//     console.log("Attempting to connect WebSocket to:", websocketUrl);

//     websocket.current = new WebSocket(websocketUrl);

//     websocket.current.onopen = () => {
//       console.log(`WebSocket connected to chatroom: ${chatroomId} with session: ${sessionId}`);
//       // Maybe send user_id or other info upon connection if your backend expects it for authentication/identification
//       // Example:
//       // if (loggedInUserId) {
//       //   websocket.current.send(JSON.stringify({ type: 'user_identify', user_id: loggedInUserId }));
//       // }
//     };

//     // *** यहाँ Incoming message को handle करने का तरीका सही करें (based on your log) ***
//     websocket.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("Message received:", data);

//         // Based on your log, the message object is likely nested under 'message' key
//         // And the object itself { user, username, text, chatroom_id, session_id } is what you need to display
//         if (data && data.message) { // Check if data and data.message exist
//            // Add the nested message object to the messages state
//            setMessages((prevMessages) => [...prevMessages, data.message]);
//         } else {
//            console.warn("Received unexpected message format (missing data.message):", data);
//            // Optionally handle other message types or display a generic received message
//         }
//       } catch (error) {
//         console.error("Error parsing or handling received message:", error, event.data);
//       }
//     };
//     // *** onmessage correction ends here ***


//     websocket.current.onclose = (event) => {
//       console.log("WebSocket disconnected:", event);
//       // Attempt to reconnect or show a message to the user
//       console.log("Close code:", event.code, "Reason:", event.reason);
//       // You might want to implement a reconnection logic here
//       // e.g., setTimeout(() => { connectWebSocket() }, 1000);
//     };

//     websocket.current.onerror = (error) => {
//       console.error("WebSocket error:", error);
//       // Show error message to the user
//       alert("WebSocket error. Could not connect to chat.");
//     };

//     // Cleanup function: Close the WebSocket connection when the component unmounts
//     return () => {
//       // Check if websocket.current exists and is not already closing or closed
//       if (websocket.current && websocket.current.readyState !== WebSocket.CLOSING && websocket.current.readyState !== WebSocket.CLOSED) {
//         websocket.current.close();
//         console.log(`WebSocket disconnected from chatroom: ${chatroomId} during cleanup`);
//       }
//     };
//   }, [activityId, chatroomId, loggedInUserId, sessionId]); // Add sessionId to dependencies


//    // *** Message History Fetch Effect - No changes needed here for the CORS issue, but added console logs ***
//    // This useEffect runs when chatroomId, loggedInUserId, or sessionId changes
//    useEffect(() => {
//        const fetchMessageHistory = async () => {
//            // Check if chatroomId, loggedInUserId, and sessionId are available before fetching history
//            if (chatroomId && loggedInUserId && sessionId) {
//                console.log("Fetching message history for chatroom:", chatroomId);
//                try {
//                    // **NOTE:** You need a backend API to fetch message history for a chatroom
//                    // This API might also require sessionId or other auth
//                    const res = await axios.get(`https://api.upswap.app/api/chat/chatrooms/${chatroomId}/messages/`, {
//                        headers: {
//                            // Example of passing sessionId in headers (common for auth)
//                            'X-Session-Id': sessionId,
//                             // Or use standard Authorization header if your API uses tokens/JWT
//                             // 'Authorization': `Bearer YOUR_AUTH_TOKEN`
//                        },
//                         // If your API expects sessionId as a query parameter instead:
//                         // params: { session_id: sessionId }
//                    });
//                    // Assuming the response is an array of message objects { id, user, text, timestamp, etc. }
//                    if (res.data && Array.isArray(res.data)) { // Check if data is an array
//                        // *** Purane messages ko state mein set karein ***
//                        setMessages(res.data);
//                        console.log("Successfully fetched message history:", res.data.length, "messages");
//                    } else {
//                         console.warn("Message history API did not return an array or expected format:", res.data);
//                          setMessages([]); // Clear messages if history is not in expected format
//                     }
//                } catch (error) {
//                    console.error("Failed to fetch message history:", error);
//                     // Log the specific CORS error details if available
//                     if (error.response) {
//                         console.error("History API error response:", error.response.data);
//                         console.error("History API error status:", error.response.status);
//                         console.error("History API error headers:", error.response.headers);
//                     } else if (error.request) {
//                          console.error("History API error request:", error.request);
//                     } else {
//                         console.error("History API error message:", error.message);
//                     }
//                     setMessages([]); // Clear messages on error
//                }
//            } else {
//                 console.warn("Cannot fetch message history: Missing chatroom ID, user ID, or session ID.");
//                  setMessages([]); // Clear messages if required data is missing
//             }
//        };
//         // Fetch history when chatroom, user, or session ID changes
//         // This runs when component mounts and dependencies are available/change
//        fetchMessageHistory();

//    }, [chatroomId, loggedInUserId, sessionId]); // Add sessionId to history fetch dependencies


//   const sendMessage = () => {
//     // Check if WebSocket is open, message is not empty, and required IDs are available
//     if (websocket.current && websocket.current.readyState === WebSocket.OPEN && newMessage.trim() && loggedInUserId && chatroomId && sessionId) {
//       const messageToSend = {
//         type: 'chat_message', // Message type, adjust based on your backend needs
//         // The actual message payload - adjust based on your backend expectations
//         message: {
//           // You might need to include sender identification (user ID, username)
//           user: loggedInUserId, // Sender's user ID
//           username: localStorage.getItem("username"), // Example: get username from local storage if available
//           text: newMessage.trim(), // The message text
//           // Add timestamp or other info if needed by backend
//           // Include chatroom_id or session_id in the payload if your backend requires it for processing
//           chatroom_id: chatroomId,
//           session_id: sessionId,
//           // Optionally add a temporary ID for optimistic updates
//           // id: Date.now(), // Simple temporary ID
//         }
//       };
//       websocket.current.send(JSON.stringify(messageToSend));
//       setNewMessage(''); // Clear the input field after sending

//       // Optional: Optimistic update - add the message to the UI immediately
//       // Ensure the format matches what your backend sends back (the nested message object)
//       // setMessages(prevMessages => [...prevMessages, {
//       //    user: loggedInUserId,
//       //    username: localStorage.getItem("username"),
//       //    text: newMessage.trim(),
//       //    // timestamp: new Date().toISOString(), // Add client timestamp
//       //    // id: messageToSend.message.id, // Use the temporary ID
//       // }]);

//     } else {
//        console.warn("Cannot send message: WebSocket not connected, message empty, or missing required IDs.");
//        // Provide user feedback if sending fails
//        if (!websocket.current || websocket.current.readyState !== WebSocket.OPEN) {
//            alert("Chat connection is not ready. Please wait or try refreshing.");
//        } else if (!newMessage.trim()) {
//            // Do nothing for empty message, it's a warning for developers
//        } else {
//            alert("Missing user or session information. Please log in again.");
//        }
//     }
//   };

//    // Handle Enter key press in the input field
//    const handleKeyDown = (event) => {
//        if (event.key === 'Enter') {
//            event.preventDefault(); // Prevent default form submission/newline
//            sendMessage();
//        }
//    };

//    // Optional: Ref for auto-scrolling messages
//    const messagesEndRef = useRef(null);

//    const scrollToBottom = () => {
//      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//    }

//    // Scroll to bottom whenever messages update
//    useEffect(() => {
//      scrollToBottom();
//    }, [messages]);


//   return (
//     <div className="chat-room-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}> {/* Added some inline styles for layout */}
//       {/* Top bar with back button */}
//       <div className="chat-room-header" style={{ padding: '10px', background: '#f0f0f0', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
//          {/* Back button - navigates to activity details page */}
//          {/* Ensure activityId is available before creating the back button path */}
//          <button
//             onClick={() => activityId ? navigate(`/activity/${activityId}`) : navigate(-1)} // Go back to activity or previous page
//             className="back-button" // Add CSS class if using ChatRoomPage.css
//             style={{ marginRight: '10px' }} // Example inline style
//           >
//             <FaLeftLong className="w-5 h-5" />
//           </button>
//         <h2 style={{ margin: 0, flexGrow: 1 }}>Chat Room: {chatroomId}</h2> {/* Still displaying chatroomId in header */}
//       </div>

//       {/* Message List Area - Scrolls */}
//       <div className="message-list" style={{ flexGrow: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column' }}>
//         {/* Display messages */}
//         {messages.map((msg, index) => (
//           // *** यहाँ messages को display करने का तरीका सही करें ***
//           // Assuming each message object { user, username, text, timestamp, ... }
//           // Adjust based on the actual message object format from your backend (both history and websocket)
//           // The message object to display is now directly msg, which should have 'user', 'text', etc.
//           <div
//               key={msg.id || index} // Use a unique ID if available, otherwise use index (less ideal)
//               className={`message ${String(msg.user) === String(loggedInUserId) ? 'sent' : 'received'}`}
//               style={{
//                   marginBottom: '5px',
//                   padding: '8px 12px',
//                   borderRadius: '15px',
//                   maxWidth: '70%',
//                   wordBreak: 'break-word',
//                   alignSelf: String(msg.user) === String(loggedInUserId) ? 'flex-end' : 'flex-start',
//                   background: String(msg.user) === String(loggedInUserId) ? '#007bff' : '#e9e9eb',
//                   color: String(msg.user) === String(loggedInUserId) ? 'white' : 'black',
//               }}
//           >
//              {/* Display sender's username/ID above message text if it's a received message */}
//              {/* Assuming message object has a 'username' field */}
//              {/* Only show username for received messages and if username exists */}
//              {String(msg.user) !== String(loggedInUserId) && msg.username && (
//                  <div style={{ fontSize: '0.8em', color: '#555', marginBottom: '2px' }}>{msg.username}</div>
//              )}
//             <span className="message-text">{msg.text || 'Loading...'}</span> {/* Display msg.text */}
//              {/* Optional timestamp - assuming msg has a timestamp field */}
//              {/* {msg.timestamp && <span style={{ fontSize: '0.7em', color: String(msg.user) === String(loggedInUserId) ? '#ccc' : '#555', marginLeft: '10px' }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>} */}
//           </div>
//           // *** messages display correction ends here ***
//         ))}
//          {/* Element to scroll to */}
//          <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input Area */}
//       <div className="message-input-area" style={{ padding: '10px', borderTop: '1px solid #ccc', display: 'flex' }}>
//         {/* Check if chatroomId and sessionId are available before showing input */}
//         {chatroomId && sessionId ? (
//            <>
//             <input
//               type="text"
//               className="message-input"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               // Disable input if WebSocket is not open
//               disabled={!websocket.current || websocket.current.readyState !== WebSocket.OPEN}
//               style={{ flexGrow: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
//             />
//             <button
//               className="send-button"
//               onClick={sendMessage}
//               // Disable button if WebSocket is not open or message is empty
//               disabled={!websocket.current || websocket.current.readyState !== WebSocket.OPEN || !newMessage.trim()}
//               style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
//             >
//               Send
//             </button>
//            </>
//         ) : (
//             <p className="text-center text-red-500">Loading chat or session information...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatRoomPage;



// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaLeftLong } from 'react-icons/fa6'; // For back button
// // import './ChatRoomPage.css'; // You can create this CSS file for styling

// function ChatRoomPage() {
//   const { chatroomId } = useParams(); // Get chatroom ID from URL parameters
//   const [messages, setMessages] = useState([]); // State to store chat messages
//   const [newMessage, setNewMessage] = useState(''); // State for the new message input
//   const websocket = useRef(null); // Ref to hold the WebSocket instance
//   const loggedInUserId = localStorage.getItem("user_id"); // Get logged-in user ID
//   const navigate = useNavigate(); // For navigation, e.g., back button

//   // Effect to establish and manage the WebSocket connection
//   useEffect(() => {
//     if (!chatroomId || !loggedInUserId) {
//       console.error("Chatroom ID or User ID is missing.");
//       // Optionally redirect user or show an error
//       return;
//     }

//     // Establish WebSocket connection
//     // **NOTE:** Replace 'your_django_domain' with your actual backend domain/IP
//     // and ensure your WebSocket URL path is correct
//     websocket.current = new WebSocket(`ws://your_django_domain/ws/chat/${chatroomId}/`);

//     websocket.current.onopen = () => {
//       console.log(`WebSocket connected to chatroom: ${chatroomId}`);
//       // Maybe send a user identification message to the backend upon connection
//       // websocket.current.send(JSON.stringify({ type: 'user_join', user_id: loggedInUserId }));
//     };

//     websocket.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log("Message received:", data);

//       // Assuming the message data format includes 'user' (sender ID) and 'text'
//       // Adjust based on your backend WebSocket message format
//       if (data.type === 'chat_message') {
//            setMessages((prevMessages) => [...prevMessages, data.message]); // Assuming data.message is the message object
//       }
//        // Handle other message types if necessary (e.g., 'user_join', 'user_leave')

//     };

//     websocket.current.onclose = (event) => {
//       console.log("WebSocket disconnected:", event);
//        // Attempt to reconnect or show a message to the user
//     };

//     websocket.current.onerror = (error) => {
//       console.error("WebSocket error:", error);
//        // Show error message to the user
//     };

//     // Cleanup function: Close the WebSocket connection when the component unmounts
//     return () => {
//       if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
//         websocket.current.close();
//         console.log(`WebSocket disconnected from chatroom: ${chatroomId}`);
//       }
//     };
//   }, [chatroomId, loggedInUserId]); // Re-run effect if chatroomId or loggedInUserId changes

//    // Optional: Effect to fetch message history when the chatroom opens
//    useEffect(() => {
//        const fetchMessageHistory = async () => {
//            if (chatroomId) {
//                try {
//                    // **NOTE:** You need a backend API to fetch message history for a chatroom
//                    const res = await axios.get(`https://api.upswap.app/api/chat/chatrooms/${chatroomId}/messages/`);
//                    // Assuming the response is an array of message objects
//                    if (res.data) {
//                        setMessages(res.data);
//                    }
//                } catch (error) {
//                    console.error("Failed to fetch message history:", error);
//                }
//            }
//        };
//        fetchMessageHistory();
//    }, [chatroomId]); // Fetch history when chatroomId changes


//   const sendMessage = () => {
//     // Check if the WebSocket is open and the message is not empty
//     if (websocket.current && websocket.current.readyState === WebSocket.OPEN && newMessage.trim()) {
//       const messageToSend = {
//         type: 'chat_message', // Message type, adjust based on your backend needs
//         message: {
//           user: loggedInUserId, // Sender's user ID
//           text: newMessage.trim(), // The message text
//           // Add timestamp or other info if needed by backend
//         }
//       };
//       websocket.current.send(JSON.stringify(messageToSend));
//       setNewMessage(''); // Clear the input field after sending
//     } else {
//        console.warn("WebSocket not connected or message is empty.");
//        // Optionally show a message to the user
//     }
//   };

//    // Handle Enter key press in the input field
//    const handleKeyDown = (event) => {
//        if (event.key === 'Enter') {
//            event.preventDefault(); // Prevent default form submission/newline
//            sendMessage();
//        }
//    };


//   return (
//     <div className="chat-room-container"> {/* Use a class for styling */}
//       {/* Top bar with back button */}
//       <div className="chat-room-header">
//          <button
//             onClick={() => navigate(-1)} // Go back to the previous page (activity details)
//             className="back-button" // Add CSS class
//           >
//             <FaLeftLong className="w-5 h-5" /> {/* Assuming you have FaLeftLong imported */}
//           </button>
//         <h2>Chat Room: {chatroomId}</h2>
//       </div>


//       <div className="message-list">
//         {/* Display messages */}
//         {messages.map((msg, index) => (
//           // Assuming each message object has 'user' and 'text' fields
//           // You might want to add sender identification/styling
//           <div key={index} className={`message ${String(msg.user) === String(loggedInUserId) ? 'sent' : 'received'}`}>
//              {/* Assuming message object has a username field, otherwise use ID */}
//             <span className="message-sender">{msg.username || `User ${msg.user}`}:</span>
//             <span className="message-text">{msg.text}</span>
//              {/* Optionally display timestamp: <span className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span> */}
//           </div>
//         ))}
//          {/* Optional: Auto-scroll to the bottom of the message list */}
//       </div>

//       <div className="message-input-area">
//         <input
//           type="text"
//           className="message-input"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={handleKeyDown} // Add key down handler
//         />
//         <button
//           className="send-button"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatRoomPage;

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function ChatRoomPage() {
//   const { chatroomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const websocket = useRef(null);
//   const loggedInUserId = localStorage.getItem("user_id");
//   const [isChatActive, setIsChatActive] = useState(false);

//   useEffect(() => {
//     const fetchChatStatus = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/chat/chatrooms/${chatroomId}/` // Backend API to get chatroom details
//         );
//         if (response.data && response.data.is_accepted) {
//           setIsChatActive(true);
//           // Establish WebSocket connection here only if chat is active
//           websocket.current = new WebSocket(`ws://your_django_domain/ws/chat/${chatroomId}/`);

//           websocket.current.onopen = () => {
//             console.log("WebSocket connected to chatroom:", chatroomId);
//           };

//           websocket.current.onclose = (event) => {
//             console.log("WebSocket disconnected from chatroom:", event);
//           };

//           websocket.current.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             setMessages((prevMessages) => [...prevMessages, data]);
//           };

//           return () => {
//             if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
//               websocket.current.close();
//             }
//           };
//         } else {
//           setIsChatActive(false);
//           alert("Chat is not active yet.");
//           // Optionally redirect the user or display a message
//         }
//       } catch (error) {
//         console.error("Failed to fetch chatroom status:", error);
//         setIsChatActive(false);
//         alert("Failed to load chat.");
//         // Optionally redirect the user or display an error message
//       }
//     };

//     fetchChatStatus();
//   }, [chatroomId]);

//   const sendMessage = () => {
//     if (isChatActive && websocket.current && websocket.current.readyState === WebSocket.OPEN && newMessage.trim()) {
//       const message = {
//         user: loggedInUserId,
//         text: newMessage,
//       };
//       websocket.current.send(JSON.stringify(message));
//       setNewMessage('');
//     } else if (!isChatActive) {
//       alert("Chat is not active. You cannot send messages.");
//     }
//   };

//   return (
//     <div>
//       <h2>Chat Room: {chatroomId}</h2>
//       {isChatActive ? (
//         <div>
//           <div className="message-list">
//             {messages.map((msg, index) => (
//               <p key={index}>
//                 {msg.user}: {msg.text}
//               </p>
//             ))}
//           </div>
//           <div className="send-message">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button onClick={sendMessage}>Send</button>
//           </div>
//         </div>
//       ) : (
//         <p>Chat is not active. Waiting for acceptance...</p>
//       )}
//     </div>
//   );
// }

// export default ChatRoomPage;

// import React, { useState } from "react";

// const SimpleChat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const handleSend = () => {
//     if (message.trim() !== "") {
//       setMessages([...messages, message]);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto h-screen flex flex-col bg-white border shadow-lg rounded p-4">
//       <h2 className="text-xl font-bold mb-4">Simple Chat</h2>
      
//       <div className="flex-1 overflow-y-auto border rounded p-2 mb-4 bg-gray-50">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className="bg-blue-100 text-gray-800 px-3 py-2 rounded mb-2 w-max max-w-full"
//           >
//             {msg}
//           </div>
//         ))}
//       </div>

//       <div className="flex">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SimpleChat;
