// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
// import CountdownTimer from "../CountDownTimer";

// const MyDeals = ({ type }) => {
//   const [deals, setDeals] = useState([]);
//   const navigate = useNavigate();
//   // const now = new Date();

//   const handleDealClick = (dealId) => {
//     navigate(`/DealDetails/${dealId}`);
//   };

//   useEffect(() => {
//     const fetchDeals = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.upswap.app/api/my-deals/",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const allData = response.data;

//         let filtered = [];

//         if (type === "live") {
//           filtered = allData.live;
//         } else if (type === "scheduled") {
//           filtered = allData.scheduled;
//         } else if (type === "history") {
//           filtered = allData.history;
//         }else if (type === "All Deals") navigate("/MyDeals/all");

//         setDeals(filtered);
//         console.log(`➡️ Filtered (${type}) Deals:`, filtered);
//       } catch (error) {
//         console.error("❌ Error fetching deals:", error);
//       }
//     };

//     fetchDeals();
//   }, [type]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Tabs */}
//       <div className="flex justify-around bg-white py-2">
//         <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
//           Deals
//         </button>
//         <button
//           className="text-gray-400 px-4 py-2"
//           onClick={() => navigate("/Activities")}
//         >
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

//       {/* Deals Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
//         {deals.map((deal) => (
//           <div
//             key={deal.deal_uuid}
//             className="border rounded-lg p-4 shadow-md bg-white cursor"
//             onClick={() => handleDealClick(deal.deal_uuid)} // Add this line for navigation
//           >
//             <img
//               src={deal.uploaded_images?.[0]}
//               alt={deal.deal_title}
//               className="w-full h-48 object-cover rounded-md"
//             />
//             <h2 className="text-lg font-semibold mt-2">{deal.deal_title}</h2>
//             <p className="text-sm text-gray-600">{deal.select_service}</p>

//             <p className="text-sm mt-1 flex gap-2">
//               <span className="font-medium">Location:</span>
//               <span>
//                 {deal.location_city}, {deal.location_state}
//               </span>
//             </p>

//             <p className="mt-2 flex gap-2">
//               <span className="line-through text-red-500">
//                 ₹{deal.actual_price}
//               </span>{" "}
//               <span className="text-green-600 font-bold">
//                 ₹{deal.deal_price}
//               </span>
//             </p>

//             <p className="text-sm text-gray-500 flex gap-2">
//               <span className="font-semibold text-red-600">Discount:</span>
//               <span>{deal.discount_percentage}%</span>
//             </p>

//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-lg font-semibold text-gray-800">
//                 Deal Available on
//               </span>
//               <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-700">
//                 <CountdownTimer
//                   endDate={deal.end_date}
//                   endTime={deal.end_time}
//                 />
//               </div>
//             </div>

//             {deal.buy_now && (
//               <button className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]">
//                 Buy Now
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Floating Add Button */}
//       <button
//         className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
//         onClick={() => navigate("/PostDeal")}
//       >
//         <FaPlus className="text-xl" />
//       </button>
//     </div>
//   );
// };

// export default MyDeals;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
// import CountdownTimer from "../CountDownTimer";

// const MyDeals = ({ type }) => {
//   const [deals, setDeals] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleDealClick = (dealId) => {
//     navigate(`/DealDetails/${dealId}`);
//   };

//   useEffect(() => {
//     const fetchDeals = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           "https://api.upswap.app/api/my-deals/",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const allData = response.data;

//         let filtered = [];

//         if (type === "live") {
//           filtered = allData.live;
//         } else if (type === "scheduled") {
//           filtered = allData.scheduled;
//         } else if (type === "history") {
//           filtered = allData.history;
//         } else if (type === "all") {
//           filtered = [
//             ...allData.live,
//             ...allData.scheduled,
//             ...allData.history,
//           ]; // ✅ this line
//         }

//         setDeals(filtered);
//         console.log(`➡️ Filtered (${type}) Deals:`, filtered);
//       } catch (error) {
//         console.error("❌ Error fetching deals:", error);
//       }
//       setLoading(false); // ✅ stop loader
//     };

//     fetchDeals();
//   }, [type]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Tabs */}
//       <div className="flex justify-around bg-white py-2">
//         <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
//           Deals
//         </button>
//         <button
//           className="text-gray-400 px-4 py-2"
//           onClick={() => navigate("/Activities")}
//         >
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

//       {/* Deals Grid or Loader */}
//       {loading ? (
//         <div className="flex justify-center items-center h-96">
//           <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 cursor-pointer">
//           {deals.map((deal) => (
//             <div
//               key={deal.deal_uuid}
//               className="border rounded-lg p-4 shadow-md bg-white cursor"
//               onClick={() => handleDealClick(deal.deal_uuid)}
//             >
//               <div className="relative">
//                 <img
//                   src={deal.uploaded_images?.[0]}
//                   alt={deal.deal_title}
//                   className="w-full h-48 object-cover rounded-md"
//                 />
//                 {/* Status badge based on `type` */}
//                 {type === "live" && (
//                   <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
//                     LIVE
//                   </div>
//                 )}
//                 {type === "scheduled" && (
//                   <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
//                     SCHEDULED
//                   </div>
//                 )}
//                 {type === "history" && (
//                   <div className="absolute top-0 left-0 bg-gray-500 text-white text-xs px-2 py-1 rounded-md">
//                     EXPIRED
//                   </div>
//                 )}
//               </div>

//               <h2 className="text-lg font-semibold mt-2">{deal.deal_title}</h2>
//               <p className="text-sm text-gray-600">{deal.select_service}</p>
//               <p className="text-sm mt-1 flex gap-2">
//                 <span className="font-medium">Location:</span>
//                 <span>
//                   {deal.location_city}, {deal.location_state}
//                 </span>
//               </p>
//               <p className="mt-2 flex gap-2">
//                 <span className="line-through text-red-500">
//                   ₹{deal.actual_price}
//                 </span>
//                 <span className="text-green-600 font-bold">
//                   ₹{deal.deal_price}
//                 </span>
//               </p>
//               <p className="text-sm text-gray-500 flex gap-2">
//                 <span className="font-semibold text-red-600">Discount:</span>
//                 <span>{deal.discount_percentage}%</span>
//               </p>
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-lg font-semibold text-gray-800">
//                   Deal Available on
//                 </span>
//                 <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-700">
//                   <CountdownTimer
//                     endDate={deal.end_date}
//                     endTime={deal.end_time}
//                   />
//                 </div>
//               </div>
//               {deal.buy_now && (
//                 <button className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]">
//                   Buy Now
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Floating Add Button */}
//       <button
//         className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
//         onClick={() => navigate("/PostDeal")}
//       >
//         <FaPlus className="text-xl" />
//       </button>
//     </div>
//   );
// };

// export default MyDeals;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
// import CountdownTimer from "../CountDownTimer";

// const MyDeals = ({ type }) => {
//   const [deals, setDeals] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [hasNoDeals, setHasNoDeals] = useState(false);

//   const handleDealClick = (dealId) => {
//     navigate(`/DealDetails/${dealId}`);
//   };

//   useEffect(() => {
//     const fetchDeals = async () => {
//       setLoading(true);
//       setHasNoDeals(false);
//       try {
//         const response = await axios.get(
//           "https://api.upswap.app/api/my-deals/",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const allData = response.data;
//         console.log("Fetched Deals Data:", allData); // Log the fetched data

//         let filtered = [];

//         if (type === "live") {
//           filtered = allData.live || [];
//         } else if (type === "scheduled") {
//           filtered = allData.scheduled || [];
//         } else if (type === "history") {
//           filtered = allData.history || [];
//         } else if (type === "all") {
//           filtered = [
//             ...(allData.live || []),
//             ...(allData.scheduled || []),
//             ...(allData.history || []),
//           ];
//         }

//         setDeals(filtered);

//         // Check if all arrays are empty
//         if (
//           (!allData.live || allData.live.length === 0) &&
//           (!allData.scheduled || allData.scheduled.length === 0) &&
//           (!allData.history || allData.history.length === 0)
//         ) {
//           setHasNoDeals(true);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching deals:", error);
//         setHasNoDeals(true);
//       }
//       setLoading(false);
//     };

//     fetchDeals();
//   }, [type]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Tabs */}
//       <div className="flex justify-around bg-white py-2">
//         <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
//           Deals
//         </button>
//         <button
//           className="text-gray-400 px-4 py-2"
//           onClick={() => navigate("/Activities")}
//         >
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

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center items-center h-96">
//           <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : hasNoDeals ? (
//         <div className="flex flex-col items-center justify-center h-96">
//           <p className="text-gray-500 text-lg mb-4">You have no deals</p>
//           <button
//             onClick={() => navigate("/PostDeal")}
//             className="flex items-center gap-2 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
//           >
//             <FaPlus className="text-xl" />
//             <span>Create Your First Deal</span>
//           </button>
//         </div>
//       ) : deals.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-96">
//           <p className="text-gray-500 text-lg">No {type} deals found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 cursor-pointer">
//           {deals.map((deal) => (
//             <div
//               key={deal.deal_uuid}
//               className="border rounded-lg p-4 shadow-md bg-white cursor"
//               onClick={() => handleDealClick(deal.deal_uuid)}
//             >
//               {/* Deal content remains same */}
//               <div className="relative">
//                 <img
//                   src={deal.uploaded_images?.[0]}
//                   alt={deal.deal_title}
//                   className="w-full h-48 object-cover rounded-md"
//                 />
//                 {type === "live" && (
//                   <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
//                     LIVE
//                   </div>
//                 )}
//                 {type === "scheduled" && (
//                   <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
//                     SCHEDULED
//                   </div>
//                 )}
//                 {type === "history" && (
//                   <div className="absolute top-0 left-0 bg-gray-500 text-white text-xs px-2 py-1 rounded-md">
//                     EXPIRED
//                   </div>
//                 )}
//               </div>

//               <h2 className="text-lg font-semibold mt-2">{deal.deal_title}</h2>
//               <p className="text-sm text-gray-600">{deal.select_service}</p>
//               <p className="text-sm mt-1 flex gap-2">
//                 <span className="font-medium">Location:</span>
//                 <span>
//                   {deal.location_city}, {deal.location_state}
//                 </span>
//               </p>
//               <p className="mt-2 flex gap-2">
//                 <span className="line-through text-red-500">
//                   ₹{deal.actual_price}
//                 </span>
//                 <span className="text-green-600 font-bold">
//                   ₹{deal.deal_price}
//                 </span>
//               </p>
//               <p className="text-sm text-gray-500 flex gap-2">
//                 <span className="font-semibold text-red-600">Discount:</span>
//                 <span>{deal.discount_percentage}%</span>
//               </p>
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-lg font-semibold text-gray-800">
//                   Deal Available on
//                 </span>
//                 <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-700">
//                   <CountdownTimer
//                     endDate={deal.end_date}
//                     endTime={deal.end_time}
//                   />
//                 </div>
//               </div>
//               {deal.buy_now && (
//                 <button className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]">
//                   Buy Now
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {!hasNoDeals && (
//         <button
//           className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
//           onClick={() => navigate("/PostDeal")}
//         >
//           <FaPlus className="text-xl" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default MyDeals;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
// import CountdownTimer from "../CountDownTimer";

// const MyDeals = ({ type }) => {
//   const [deals, setDeals] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [hasNoDeals, setHasNoDeals] = useState(false);

//   const handleDealClick = (dealId) => {
//     navigate(`/DealDetails/${dealId}`);
//   };

//   useEffect(() => {
//     const fetchDeals = async () => {
//       setLoading(true);
//       setHasNoDeals(false);
//       try {
//         const response = await axios.get(
//           "https://api.upswap.app/api/my-deals/",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const allData = response.data;
//         console.log("Fetched Deals Data:", allData);

//         let filtered = [];

//         if (type === "live") {
//           filtered = allData.live || [];
//         } else if (type === "scheduled") {
//           filtered = allData.scheduled || [];
//         } else if (type === "history") {
//           filtered = allData.history || [];
//         } else if (type === "all") {
//           filtered = [
//             ...(allData.live || []),
//             ...(allData.scheduled || []),
//             ...(allData.history || []),
//           ];
//         }

//         setDeals(filtered);

//         if (
//           (!allData.live || allData.live.length === 0) &&
//           (!allData.scheduled || allData.scheduled.length === 0) &&
//           (!allData.history || allData.history.length === 0)
//         ) {
//           setHasNoDeals(true);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching deals:", error);
//         setHasNoDeals(true);
//       }
//       setLoading(false);
//     };

//     fetchDeals();
//   }, [type]);

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Tabs */}
//       {/* <div className="flex justify-around bg-white py-2">
//         <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
//           Deals
//         </button>
//         <button
//           className="text-gray-400 px-4 py-2"
//           onClick={() => navigate("/Activities")}
//         >
//           Activities
//         </button>
//       </div> */}

//       {/* Search */}
//       {/* <div className="p-4 flex gap-2">
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
//       </div> */}

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//         </div>
//       ) : hasNoDeals ? (
//         <div className="flex flex-col items-center justify-center h-96">
//           <p className="text-gray-500 text-lg mb-4">You have no deals</p>
//           <button
//             onClick={() => navigate("/PostDeal")}
//             className="flex items-center gap-2 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
//           >
//             <FaPlus className="text-xl" />
//             <span>Create Your First Deal</span>
//           </button>
//         </div>
//       ) : deals.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-96">
//           <p className="text-gray-500 text-lg">No {type} deals found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 cursor-pointer">
//           {deals.map((deal) => (
//             <div
//               key={deal.deal_uuid}
//               className="border rounded-lg p-4 shadow-md bg-white cursor"
//               onClick={() => handleDealClick(deal.deal_uuid)}
//             >
//               <div className="relative">
//                 <img
//                   src={deal.uploaded_images?.[0]}
//                   alt={deal.deal_title}
//                   className="w-full h-48 object-cover rounded-md"
//                 />
//                 {type === "live" && (
//                   <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
//                     LIVE
//                   </div>
//                 )}
//                 {type === "scheduled" && (
//                   <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
//                     SCHEDULED
//                   </div>
//                 )}
//                 {type === "history" && (
//                   <div className="absolute top-0 left-0 bg-gray-500 text-white text-xs px-2 py-1 rounded-md">
//                     EXPIRED
//                   </div>
//                 )}
//               </div>

//               <h2 className="text-lg font-semibold mt-2">{deal.deal_title}</h2>
//               <p className="text-sm text-gray-600">{deal.select_service}</p>
//               <p className="text-sm mt-1 flex gap-2">
//                 <span className="font-medium">Location:</span>
//                 <span>
//                   {deal.location_city}, {deal.location_state}
//                 </span>
//               </p>
//               <p className="mt-2 flex gap-2">
//                 <span className="line-through text-red-500">
//                   ₹{deal.actual_price}
//                 </span>
//                 <span className="text-green-600 font-bold">
//                   ₹{deal.deal_price}
//                 </span>
//               </p>
//               <p className="text-sm text-gray-500 flex gap-2">
//                 <span className="font-semibold text-red-600">Discount:</span>
//                 <span>{deal.discount_percentage}%</span>
//               </p>
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-lg font-semibold text-gray-800">
//                   Deal Available on
//                 </span>
//                 <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-700">
//                   <CountdownTimer
//                     endDate={deal.end_date}
//                     endTime={deal.end_time}
//                   />
//                 </div>
//               </div>
//               {deal.buy_now && (
//                 <button className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]">
//                   Buy Now
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {!hasNoDeals && (
//         <button
//           className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
//           onClick={() => navigate("/PostDeal")}
//         >
//           <FaPlus className="text-xl" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default MyDeals;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import CountdownTimer from "../CountDownTimer";

const MyDeals = () => {
  const [deals, setDeals] = useState([]);
  const [type, setType] = useState("live"); // 👈 dynamic type state
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasNoDeals, setHasNoDeals] = useState(false);

  const handleDealClick = (dealId) => {
    navigate(`/DealDetails/${dealId}`);
  };

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      setHasNoDeals(false);
      try {
        const response = await axios.get(
          "https://api.upswap.app/api/my-deals/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        const allData = response.data;

        let filtered = [];

        if (type === "live") filtered = allData.live || [];
        else if (type === "scheduled") filtered = allData.scheduled || [];
        else if (type === "history") filtered = allData.history || [];
        else if (type === "all")
          filtered = [
            ...(allData.live || []),
            ...(allData.scheduled || []),
            ...(allData.history || []),
          ];

        setDeals(filtered);

        if (
          (!allData.live || allData.live.length === 0) &&
          (!allData.scheduled || allData.scheduled.length === 0) &&
          (!allData.history || allData.history.length === 0)
        ) {
          setHasNoDeals(true);
        }
      } catch (error) {
        console.error("❌ Error fetching deals:", error);
        setHasNoDeals(true);
      }
      setLoading(false);
    };

    fetchDeals();
  }, [type]);

  const renderButton = (label, value) => (
    <button
      onClick={() => setType(value)}
      className={`px-4 py-2 rounded-md font-medium transition ${
        type === value
          ? "bg-[#FE7A3A] text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    // <div className="bg-gray-100 min-h-screen">
     <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl rounded-md mx-auto bg-gradient-to-b from-orange-400 to-white">
      {/* Filter Buttons */}
      <div className="flex justify-around bg-white py-3 sticky top-0 z-10 shadow-sm rounded-md">
        {renderButton("Live", "live")}
        {renderButton("Scheduled", "scheduled")}
        {renderButton("History", "history")}
        {renderButton("All", "all")}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : hasNoDeals ? (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-gray-500 text-lg mb-4">You have no deals</p>
          <button
            onClick={() => navigate("/PostDeal")}
            className="flex items-center gap-2 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
          >
            <FaPlus className="text-xl" />
            <span an>Create Your First Deal</span>
          </button>
        </div>
      ) : deals.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-gray-500 text-lg">No {type} deals found</p>
          <button
            onClick={() => navigate("/PostDeal")}
            className="flex items-center gap-2 px-4 mt-2 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
          >
            <FaPlus className="text-xl" />
            <span data-an>Create Your First Deal</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 cursor-pointer">
          {deals.map((deal) => (
            <div
              key={deal.deal_uuid}
              className="border rounded-lg p-4 shadow-md bg-white"
              onClick={() => handleDealClick(deal.deal_uuid)}
            >
              <div className="relative">
                <img
                  src={deal.uploaded_images?.[0]}
                  alt={deal.deal_title}
                  className="w-full h-48 object-cover rounded-md"
                />
                {type === "live" && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                    LIVE
                  </div>
                )}
                {type === "scheduled" && (
                  <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
                    SCHEDULED
                  </div>
                )}
                {type === "history" && (
                  <div className="absolute top-0 left-0 bg-gray-500 text-white text-xs px-2 py-1 rounded-md">
                    EXPIRED
                  </div>
                )}
              </div>

              <h2 className="text-lg font-semibold mt-2">{deal.deal_title}</h2>
              <p className="text-sm text-gray-600">{deal.select_service}</p>
              <p className="text-sm mt-1 flex gap-2">
                <span className="font-medium">Location:</span>
                <span>
                  {deal.location_city}, {deal.location_state}
                </span>
              </p>
              <p className="mt-2 flex gap-2">
                <span className="line-through text-red-500">
                  ₹{deal.actual_price}
                </span>
                <span className="text-green-600 font-bold">
                  ₹{deal.deal_price}
                </span>
              </p>
              <p className="text-sm text-gray-500 flex gap-2">
                <span className="font-semibold text-red-600">Discount:</span>
                <span>{deal.discount_percentage}%</span>
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold text-gray-800">
                  Deal Available on
                </span>
                <div className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-700">
                  <CountdownTimer
                    endDate={deal.end_date}
                    endTime={deal.end_time}
                  />
                </div>
              </div>
              {deal.buy_now && (
                <button className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]">
                  Buy Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {!hasNoDeals && (
        <button
          className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
          onClick={() => navigate("/PostDeal")}
        >
          <FaPlus className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default MyDeals;
