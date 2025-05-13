// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ChatRequestCardForAuthor from './ChatRequestCardForAuthor'; // सुनिश्चित करें कि पाथ सही है

// const PendingChatRequestsForAuthorPage = () => {
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const loggedInUserId = localStorage.getItem('user_id'); // ऑथर का आईडी

//   useEffect(() => {
//     const fetchPendingRequests = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/chat/chat-requests/?activity_author=${loggedInUserId}&is_accepted=false`
//         );
//         console.log("Pending Requests for Author:", response.data.data); // चेक करें कि डेटा कैसा है
//         setPendingRequests(response.data.data);
//       } catch (error) {
//         console.error('Failed to fetch pending chat requests for author:', error);
//       }
//     };
  
//     fetchPendingRequests();
//   }, [loggedInUserId]);

//   const handleRequestAccepted = (chatroomId, requestId) => {
//     console.log(`Request ${requestId} accepted, navigating to chat room ${chatroomId}`);
//     // यहां आप यूजर को चैट रूम पर नेविगेट कर सकते हैं
//     // navigate(`/chat/${chatroomId}`); // यदि आप यहां नेविगेट करना चाहते हैं

//     // या आप स्टेट को अपडेट कर सकते हैं ताकि UI रिफ्लेक्ट करे कि रिक्वेस्ट एक्सेप्ट हो गई है
//     setPendingRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
//   };

//   const handleRequestRejected = (requestId) => {
//     console.log(`Request ${requestId} rejected`);
//     // यहां आप स्टेट को अपडेट कर सकते हैं
//     setPendingRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Pending Chat Requests for Your Activities</h2>
//       {pendingRequests.map((request) => (
//         <ChatRequestCardForAuthor
//           key={request.id}
//           request={request}
//           onAccept={handleRequestAccepted}
//           onReject={handleRequestRejected}
//         />
//       ))}
//       {pendingRequests.length === 0 && <p>No pending chat requests for your activities.</p>}
//     </div>
//   );
// };

// export default PendingChatRequestsForAuthorPage;