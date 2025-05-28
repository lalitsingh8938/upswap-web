// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import CountdownTimer from "./CountDownTimer";
// import { loadRazorpay } from "../utils/loadRazorpay"; // 👈 Add this
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DealsList = () => {
//   const [deals, setDeals] = useState([]);
//   const [loading, setLoading] = useState(true); // 🌀 Initially true
//   const navigate = useNavigate();
//   useEffect(() => {
//     setLoading(true); // Start loader
//     axios
//       .get("https://api.upswap.app/api/deals/lists/")
//       .then((response) => {
//         // console.log("DEALS RESPONSE 👉", response.data.deals); // 👈 ADD THIS LINE
//         setDeals(response.data.deals);
//         setLoading(false); // Stop loader
//       })
//       .catch((error) => {
//         console.error("Error fetching deals:", error);
//         setLoading(false); // Even on error, stop loader
//       });
//   }, []);

//   const handleDealClick = (dealId) => {
//     // Navigate to the DealDetailsPage with the deal_uuid
//     navigate(`/DealDetails/${dealId}`);
//   };
//   const handleBuyNow = async (deal) => {
//     const res = await loadRazorpay();

//     if (!res) {
//       toast.warn("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     const storedPhoneNumber = localStorage.getItem("phone_number");

//     const options = {
//       key: "rzp_live_vChMTg5Zq6WCJI", // Replace with your live/test key
//       amount: deal.deal_price * 100, // in paise
//       currency: "INR",
//       name: "Upswap Deals",
//       description: deal.deal_title,
//       image: "/logo.png", // optional
//       handler: function (response) {
//         // ✅ Success callback
//         toast.success("✅ Payment Successful!");
//         console.log("Payment ID:", response.razorpay_payment_id);
//         console.log("Order ID:", response.razorpay_order_id);
//         console.log("Signature:", response.razorpay_signature);

//         // ✅ You can now show confirmation or store details in localStorage

//         const phone = localStorage.getItem("phone_number");
//         console.log("Phone used for payment:", phone);
//       },

//       prefill: {
//         name: "Customer Name",
//         email: "user@example.com",
//         contact: storedPhoneNumber,
//       },
//       theme: {
//         color: "#FE7A3A",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Tabs */}
//       <div className="flex justify-around bg-white py-2">
//         <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
//           Deals
//         </button>
//         <button
//           className="text-gray-400 px-4 py-2"
//           onClick={() => navigate("/ActivitiesPage")}
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
//       {loading ? (
//         <div className="flex justify-center items-center h-96">
//           <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4 cursor-pointer">
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

//                 <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
//                   LIVE
//                 </div>
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
//                 <button
//                   onClick={() => handleBuyNow(deal)}
//                   className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
//                 >
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

// export default DealsList;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import CountdownTimer from "./CountDownTimer";
// import { loadRazorpay } from "../utils/loadRazorpay";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DealsList = () => {
//   const [deals, setDeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("https://api.upswap.app/api/deals/lists/")
//       .then((response) => {
//         setDeals(response.data.deals);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching deals:", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleDealClick = (dealId) => {
//     navigate(`/DealDetails/${dealId}`);
//   };

//   const handleBuyNow = async (deal) => {
//     const res = await loadRazorpay();

//     if (!res) {
//       toast.warn("Razorpay SDK failed to load. Are you online?");
//       return;
//     }

//     const storedPhoneNumber = localStorage.getItem("phone_number");

//     const options = {
//       key: "rzp_live_vChMTg5Zq6WCJI",
//       amount: deal.deal_price * 100,
//       currency: "INR",
//       name: "Upswap Deals",
//       description: deal.deal_title,
//       image: "/logo.png",
//       handler: function (response) {
//         toast.success("✅ Payment Successful!");
//         console.log("Payment ID:", response.razorpay_payment_id);
//         console.log("Order ID:", response.razorpay_order_id);
//         console.log("Signature:", response.razorpay_signature);
//         const phone = localStorage.getItem("phone_number");
//         console.log("Phone used for payment:", phone);
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "user@example.com",
//         contact: storedPhoneNumber,
//       },
//       theme: {
//         color: "#FE7A3A",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Tabs */}
//       <div className="flex justify-around bg-white py-2">
//         <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
//           Deals
//         </button>
//         <button
//           className="text-gray-400 px-4 py-2"
//           onClick={() => navigate("/ActivitiesPage")}
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
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 cursor-pointer">
//           {deals.map((deal) => (
//             <div
//               key={deal.deal_uuid}
//               className="border rounded-lg p-2 shadow-md bg-white cursor"
//               onClick={() => handleDealClick(deal.deal_uuid)}
//             >
//               <div className="relative">
//                 <img
//                   src={deal.uploaded_images?.[0]}
//                   alt={deal.deal_title}
//                   className="w-full h-36 object-cover rounded-md"
//                 />

//                 <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
//                   LIVE
//                 </div>
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
//               <div className="flex items-center gap-2">
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
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleBuyNow(deal);
//                   }}
//                   className="mt-1 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
//                 >
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

// export default DealsList;

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaPlus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountDownTimer";
import { loadRazorpay } from "../utils/loadRazorpay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingDealId, setProcessingDealId] = useState(null); // State to track which deal is being processed
  const navigate = useNavigate();

  // Function to fetch deals with robust error handling
  const fetchDeals = useCallback(async () => {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(
        "https://api.upswap.app/api/deals/lists/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDeals(response.data.deals || []); // Default to empty array if no deals
      setIsLoading(false); // Stop loading on success
    } catch (err) {
      console.error("Error fetching deals:", err);
      setError("Failed to load deals. Please try again later.");
      toast.error("Failed to load deals. Please check your connection.");
      setIsLoading(false); // Stop loading on error
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handleDealClick = (dealId) => {
    navigate(`/DealDetails/${dealId}`);
  };

  const handleBuyNow = useCallback(
    async (deal) => {
      setProcessingDealId(deal.deal_uuid); // Set the ID of the deal currently being processed
      const paymentInitToastId = toast.info("Initializing payment...", {
        autoClose: false,
        toastId: "paymentInit",
      });

      try {
        const res = await loadRazorpay();

        if (!res) {
          toast.dismiss(paymentInitToastId); // Dismiss the initial toast
          toast.warn(
            "Razorpay SDK failed to load. Please check your internet connection."
          );
          setProcessingDealId(null); // Reset processing state
          return;
        }

        const storedPhoneNumber = localStorage.getItem("phone_number");
        if (!storedPhoneNumber) {
          toast.dismiss(paymentInitToastId); // Dismiss the initial toast
          toast.error(
            "Phone number not found. Please update your profile to proceed with payment."
          );
          setProcessingDealId(null); // Reset processing state
          navigate("/UserProfile");
          return;
        }

        const options = {
          key: "rzp_live_vChMTg5Zq6WCJI",
          amount: deal.deal_price * 100,
          currency: "INR",
          name: "Upswap Deals",
          description: deal.deal_title,
          image: "/logo.png",
          handler: function (response) {
            toast.dismiss(paymentInitToastId); // Dismiss initial toast on success
            toast.success("✅ Payment Successful!");
            console.log("Payment ID:", response.razorpay_payment_id);
            console.log("Order ID:", response.razorpay_order_id);
            console.log("Signature:", response.razorpay_signature);
            // IMPORTANT: Send Razorpay response to your backend for verification
            // Do NOT rely solely on client-side success for order fulfillment
            setProcessingDealId(null); // Reset processing state after success
          },
          prefill: {
            name: "Customer Name",
            email: "user@example.com",
            contact: storedPhoneNumber,
          },
          theme: {
            color: "#FE7A3A",
          },
        };

        const rzp = new window.Razorpay(options);

        // Event listener for payment failure (user cancels, network issue, etc.)
        rzp.on("payment.failed", function (response) {
          toast.dismiss(paymentInitToastId); // Dismiss initial toast on failure
          toast.error(
            `❌ Payment Failed: ${
              response.error.description || "Something went wrong."
            }`
          );
          console.error("Razorpay Payment Failed:", response.error);
          setProcessingDealId(null); // Reset processing state on failure
        });

        rzp.on("payment.modal.closed", function () {
          // This event fires if the user closes the Razorpay popup without success or failure
          toast.dismiss(paymentInitToastId); // Dismiss initial toast if modal closed
          toast.info("Payment process cancelled."); // Inform user about cancellation
          setProcessingDealId(null); // Reset processing state
        });

        rzp.open();
        // Dismiss the "Initializing payment..." toast once the Razorpay modal opens successfully
        // This is crucial for better UX, as the user now sees the payment modal.
        toast.dismiss(paymentInitToastId);
      } catch (err) {
        toast.dismiss(paymentInitToastId); // Dismiss initial toast on error
        console.error("Error initiating Razorpay:", err);
        toast.error("Failed to initiate payment. Please try again.");
        setProcessingDealId(null); // Reset processing state on error
      }
    },
    [navigate]
  );

  // Conditional rendering for loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE7A3A]"></div>
          <p className="text-[#FE7A3A] text-lg mt-4">Loading deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-700 text-xl p-4">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={fetchDeals} // Retry button
          className="mt-4 px-4 py-2 bg-[#FE7A3A] text-white rounded-lg hover:bg-orange-500"
        >
          Retry Loading Deals
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-around bg-white py-2">
        <button className="text-[#FE7A3A] border-b-2 border-[#FE7A3A] px-4 py-2">
          Deals
        </button>
        <button
          className="text-gray-400 px-4 py-2"
          onClick={() => navigate("/ActivitiesPage")}
        >
          Activities
        </button>
      </div>

      {/* Search */}
      <div className="p-4 flex gap-2">
        <div className="flex-1 bg-white p-2 rounded-lg flex items-center gap-2 shadow">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search title, category, vendor..."
            className="w-full outline-none"
            aria-label="Search deals"
          />
        </div>
        <button
          className="bg-white p-2 rounded-lg shadow"
          aria-label="Filter by location"
        >
          <FaMapMarkerAlt className="text-[#FE7A3A]" />
        </button>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4 cursor-pointer">
        {deals.length > 0 ? (
          deals.map((deal) => (
            <div
              key={deal.deal_uuid}
              className="border rounded-lg p-2 shadow-md bg-white cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
              onClick={() => handleDealClick(deal.deal_uuid)}
            >
              <div className="relative">
                {/* <img
                  src={deal.uploaded_images?.[0] || "/default-deal-image.png"}
                  alt={deal.deal_title || "Deal image"}
                  className="w-full h-36 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-deal-image.png";
                  }}
                /> */}
                <img
                  src={
                    deal.uploaded_images && deal.uploaded_images.length > 0
                      ? deal.uploaded_images[0]
                      : "/upswap.png"
                  }
                  alt={deal.deal_title || "Deal image"}
                  className="w-full h-36 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/upswap.png";
                  }}
                />

                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                  LIVE
                </div>
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
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-semibold text-gray-800">
                  Deal Available for:
                </span>
                <div className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded-md text-xs font-medium text-gray-700">
                  <CountdownTimer
                    endDate={deal.end_date}
                    endTime={deal.end_time}
                  />
                </div>
              </div>
              {deal.buy_now && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(deal);
                  }}
                  className="mt-3 w-full px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-orange-500 transition-colors duration-200"
                  disabled={processingDealId === deal.deal_uuid} // Disable ONLY the clicked button
                >
                  {processingDealId === deal.deal_uuid
                    ? "Processing..."
                    : "Buy Now"}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 p-8">
            <p className="text-lg">
              No deals available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        onClick={() => navigate("/PostDeal")}
        aria-label="Post a new deal"
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
};

export default DealsList;
