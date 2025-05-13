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
  if (websocket.current && websocket.current.readyState === WebSocketReadyState.OPEN && newMessage.trim()) {
    const messageToSend = newMessage.trim(); // Seedha message string bhej rahe hain
    websocket.current.send(JSON.stringify(messageToSend));
    setNewMessage('');
  } else {
    console.warn("Cannot send message: WebSocket not connected or message empty.");
    if (!isConnected) {
      alert("Chat connection is not ready. Please wait or try refreshing.");
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
