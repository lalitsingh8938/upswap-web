// // App.js or wherever you want to render this section
// import React from "react";
// // Make sure you have react-icons installed: npm install react-icons
// import { FiShare2 } from "react-icons/fi"; // Share icon
// import { FaArrowRight } from "react-icons/fa"; // Right arrow icon

// // =============================================================================
// // DealCard Component
// // Har ek individual deal item ko render karega
// // =============================================================================
// const DealCard = ({ deal }) => {
//   const {
//     imageSrc,
//     title,
//     postedBy,
//     location,
//     originalPrice,
//     discountedPrice,
//     discountPercentage,
//     dealValidTill,
//   } = deal;

//   return (
//     <div
//       className="
//         border border-gray-200 rounded-lg overflow-hidden
//         bg-white shadow-md
//       "
//     >
//       {/* Image Section */}
//       <div className="h-48 overflow-hidden">
//         <img
//           src={imageSrc}
//           alt={title}
//           className="w-full h-full object-cover rounded-t-lg"
//         />
//       </div>

//       {/* Content Section */}
//       <div className="p-4">
//         <h3
//           className="
//             font-semibold text-lg leading-7 mb-2
//           "
//         >
//           {title}
//         </h3>

//         <p className="text-sm text-gray-500">
//           Posted by:{" "}
//           <span className="font-medium text-[#EF4444]">{postedBy}</span>
//         </p>
//         <p className="text-sm text-gray-500 mb-3">
//           Location:{" "}
//           <span className="font-medium text-gray-700">{location}</span>
//         </p>

//         {/* Price Section */}
//         <div className="flex items-baseline mb-3">
//           <span
//             className="
//               font-semibold text-xl leading-7 text-black mr-2
//             "
//           >
//             ₹{discountedPrice}
//           </span>
//           <span
//             className="
//               line-through text-sm text-gray-500 mr-2
//             "
//           >
//             ₹{originalPrice}
//           </span>
//           <span
//             className="
//               text-sm text-green-500 font-medium
//             "
//           >
//             {discountPercentage}% off
//           </span>
//         </div>

//         {/* Deal Valid Till */}
//         <p
//           className="
//             text-xs text-gray-500 mb-4
//           "
//         >
//           Deal valid till: {dealValidTill}
//         </p>

//         {/* Buttons Section */}
//         <div className="flex gap-3 justify-between">
//           <button
//             className="
//               flex-grow py-2 px-4 bg-orange-500 text-white
//               rounded-md font-medium
//               hover:bg-orange-600 transition-colors duration-200
//               whitespace-nowrap
//             "
//           >
//             Buy Now
//           </button>
//           <button
//             className="
//               p-2 border border-gray-300 rounded-md bg-white text-gray-700
//               flex items-center justify-center
//               hover:bg-gray-100 transition-colors duration-200
//             "
//           >
//             <FiShare2 className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // =============================================================================
// const ExclusiveDealsSection = () => {
//   const dealsData = [
//     {
//       id: 1,
//       imageSrc: "Image (1).png",
//       title: "Premium Yoga Mat Bundle",
//       postedBy: "Wellness Hub",
//       location: "Indirapuram, Delhi",
//       originalPrice: 1299,
//       discountedPrice: 999,
//       discountPercentage: 23,
//       dealValidTill: "Aug 10th, 8pm",
//     },
//     {
//       id: 2,
//       imageSrc: "Image (2).png",
//       title: "Professional Camera Rental",
//       postedBy: "Digital Studio",
//       location: "Connaught Place, Delhi",
//       originalPrice: 899,
//       discountedPrice: 799,
//       discountPercentage: 11,
//       dealValidTill: "Aug 10th, 8pm",
//     },
//     {
//       id: 3,
//       imageSrc: "Image (1).png",
//       title: "Organic Food Basket",
//       postedBy: "Fresh Farm",
//       location: "Dwarka, Delhi",
//       originalPrice: 1499,
//       discountedPrice: 1199,
//       discountPercentage: 20,
//       dealValidTill: "Aug 10th, 8pm",
//     },
//     {
//       id: 4,
//       imageSrc: "Image (1).png",
//       title: "Guitar Lessons (4 Sessions)",
//       postedBy: "Music Academy",
//       location: "Rohini, Delhi",
//       originalPrice: 2499,
//       discountedPrice: 1999,
//       discountPercentage: 20,
//       dealValidTill: "Aug 10th, 8pm",
//     },
//     {
//       id: 5,
//       imageSrc: "Image (2).png",
//       title: "Home Cleaning Service",
//       postedBy: "CleanX",
//       location: "Noida, UP",
//       originalPrice: 899,
//       discountedPrice: 599,
//       discountPercentage: 33,
//       dealValidTill: "Aug 10th, 8pm",
//     },
//     {
//       id: 6,
//       imageSrc: "Image (1).png",
//       title: "Art Workshop Materials",
//       postedBy: "Creative Arts",
//       location: "Gautam Ba, Delhi",
//       originalPrice: 1999,
//       discountedPrice: 1199,
//       discountPercentage: 40,
//       dealValidTill: "Aug 22nd, 4pm",
//     },
//   ];

//   return (
//     <section
//       className="
//         py-8 px-4 max-w-7xl mx-auto
//       "
//     >
//       {/* Header Section */}
//       <div
//         className="
//           flex justify-between items-center mb-8
//         "
//       >
//         <div>
//           <h2
//             className="
//               text-4xl leading-10 font-bold text-gray-900 mb-2
//             "
//           >
//             Exclusive Deals for you
//           </h2>
//           <p
//             className="
//               text-lg leading-7 text-gray-700
//             "
//           >
//             Discover amazing offers from local vendors
//           </p>
//         </div>
//         <a
//           href="#" // Add your link here
//           className="
//             flex items-center text-base font-semibold text-orange-500
//             hover:text-orange-600 transition-colors duration-200
//           "
//         >
//           View all deals
//           <FaArrowRight className="ml-2 w-4 h-4" />
//         </a>
//       </div>

//       {/* Deals Grid */}
//       <div
//         className="
//           grid gap-6
//           grid-cols-1
//           sm:grid-cols-2 // On small screens and up, 2 columns
//           md:grid-cols-3 // On medium screens and up, 3 columns
//           lg:grid-cols-6 // On large screens and up, 4 columns
//           xl:grid-cols-4 // On extra large screens and up, 4 columns (as per snapshot)
//           // If you want more dynamic, use: grid-cols-auto-fit-[280px] in custom tailwind config
//           // For simplicity, fixed breakpoints are often easier to manage
//         "
//       >
//         {dealsData.map((deal) => (
//           <DealCard key={deal.id} deal={deal} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ExclusiveDealsSection;

// App.js or wherever you want to render this section

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { FcServices } from "react-icons/fc";
import { FaPlus, FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Added FaArrowLeft for "Show Less"
import {
  FaShare, // Removed FaStar as it's not used in this specific ActivitiesList component's logic
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loadRazorpay } from "../../utils/loadRazorpay";

// =============================================================================
// DealCard Component
// =============================================================================
const DealCard = ({ deal, onBuyNow, isProcessing, onClick }) => {
  const {
    deal_title,
    select_service,
    location_city,
    location_state,
    actual_price,
    deal_price,
    discount_percentage,
    end_date,
    end_time,
    uploaded_images,
    deal_uuid,
    buy_now,
  } = deal;

  const imageSrc =
    uploaded_images && uploaded_images.length > 0
      ? uploaded_images[0]
      : "/upswap.png";

  return (
    <div
      className="
        border border-gray-200 rounded-lg overflow-hidden
        bg-white shadow-md cursor-pointer
        transition-transform duration-200 hover:scale-[1.01]
      "
      onClick={() => onClick(deal_uuid)}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={imageSrc}
          alt={deal_title || "Deal image"}
          className="w-full h-full object-cover rounded-t-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/upswap.png";
          }}
        />
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
          LIVE
        </div>
      </div>

      <div className="p-3 gap-1 flex flex-col">
        <h3
          className="
            font-semibold text-base leading-tight mb-1
          "
        >
          {deal_title}
        </h3>

        {/* <p className="text-xs text-gray-500">
          Service:{" "}
           <p className="text-sm text-gray-600">{deal.select_service}</p>
        </p>
        <p className="text-xs text-gray-500 mb-2">
           📍{" "}
          <span className="font-medium text-gray-700">
           {deal.location_city}, {deal.location_state}
          </span>
        </p> */}
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <FcServices className="w-4 h-4" />
          <span className="text-sm text-gray-600">{deal.select_service}</span>
        </p>
        <p className="text-xs text-gray-500 mb-2 gap-2">
          📍{" "}
          <span className="font-medium text-gray-700">
            {deal.location_city}, {deal.location_state}
          </span>
        </p>

        <div className="flex items-baseline mb-2">
          <span
            className="
              font-semibold text-lg leading-snug text-black mr-2
            "
          >
            ₹{deal_price}
          </span>
          <span
            className="
              line-through text-xs text-gray-500 mr-2
            "
          >
            ₹{actual_price}
          </span>
          <span
            className="
              text-xs text-green-500 font-medium
            "
          >
            {discount_percentage}% off
          </span>
        </div>

        <div className="flex gap-2 mt-3 justify-between ">
          <button
            className="
              p-1.5 border border-gray-300 rounded-md bg-white text-gray-700
              flex items-center justify-center
              hover:bg-gray-100 transition-colors duration-200
            "
            onClick={(e) => {
              e.stopPropagation();
              toast.info("Share functionality coming soon!");
            }}
          >
            {/* <FiShare2 className="w-4 h-4" /> */}
            <FaShare className="w-4 h-4" />
          </button>
          {buy_now && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow(deal);
              }}
              className="
                flex-grow py-1.5 px-3 bg-orange-500 text-white
                rounded-md font-medium text-sm
                hover:bg-orange-600 transition-colors duration-200
                whitespace-nowrap
              "
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Buy Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// DealsList Component (API Fetching + UI Integration)
// =============================================================================
const DealsList = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingDealId, setProcessingDealId] = useState(null);
  const [showAllDeals, setShowAllDeals] = useState(false); // State to control showing all deals
  const navigate = useNavigate();

  const fetchDeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.upswap.app/api/deals/lists/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDeals(response.data.deals || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching deals:", err);
      setError("Failed to load deals. Please try again later.");
      toast.error("Failed to load deals. Please check your connection.");
      setIsLoading(false);
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
      setProcessingDealId(deal.deal_uuid);
      const paymentInitToastId = toast.info("Initializing payment...", {
        autoClose: false,
        toastId: "paymentInit",
      });

      try {
        const res = await loadRazorpay();

        if (!res) {
          toast.dismiss(paymentInitToastId);
          toast.warn(
            "Razorpay SDK failed to load. Please check your internet connection."
          );
          setProcessingDealId(null);
          return;
        }

        const storedPhoneNumber = localStorage.getItem("phone_number");
        if (!storedPhoneNumber) {
          toast.dismiss(paymentInitToastId);
          toast.error(
            "Phone number not found. Please update your profile to proceed with payment."
          );
          setProcessingDealId(null);
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
            toast.dismiss(paymentInitToastId);
            toast.success("✅ Payment Successful!");
            console.log("Payment ID:", response.razorpay_payment_id);
            setProcessingDealId(null);
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

        rzp.on("payment.failed", function (response) {
          toast.dismiss(paymentInitToastId);
          toast.error(
            `❌ Payment Failed: ${
              response.error.description || "Something went wrong."
            }`
          );
          console.error("Razorpay Payment Failed:", response.error);
          setProcessingDealId(null);
        });

        rzp.on("payment.modal.closed", function () {
          toast.dismiss(paymentInitToastId);
          toast.info("Payment process cancelled.");
          setProcessingDealId(null);
        });

        rzp.open();
        toast.dismiss(paymentInitToastId);
      } catch (err) {
        toast.dismiss(paymentInitToastId);
        console.error("Error initiating Razorpay:", err);
        toast.error("Failed to initiate payment. Please try again.");
        setProcessingDealId(null);
      }
    },
    [navigate]
  );

  // Determine which deals to display based on showAllDeals state
  const displayedDeals = useMemo(() => {
    return showAllDeals ? deals : deals.slice(0, 6);
  }, [deals, showAllDeals]);

  // Toggle the showAllDeals state
  const handleToggleView = () => {
    setShowAllDeals((prevState) => !prevState);
  };

  // Only show the button if there are more than 6 deals
  const shouldShowToggleButton = deals.length > 6;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE7A3A]"></div>
          <p className="text-[#FE7A3A] text-lg mt-4">Loading deals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" bg-white flex flex-col items-center justify-center text-gray-700 text-xl p-4">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={fetchDeals}
          className="mt-4 px-4 py-2 bg-[#FE7A3A] text-white rounded-lg hover:bg-orange-500"
        >
          Retry Loading Deals
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white ">
      <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl leading-10 font-bold text-gray-900 mb-2">
              Exclusive Deals for you
            </h2>
            <p className="text-lg leading-7 text-gray-700">
              Discover amazing offers from local vendors
            </p>
          </div>
          {shouldShowToggleButton && (
            <button
              onClick={handleToggleView}
              className="
                flex items-center text-base font-semibold text-orange-500
                hover:text-orange-600 transition-colors duration-200
              "
            >
              {showAllDeals ? (
                <>
                  Show Less <FaArrowLeft className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  View all deals <FaArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-6
            2xl:grid-cols-6
          "
        >
          {/* {displayedDeals.length > 0 ? (
            displayedDeals.map((deal) => (
              <DealCard
                key={deal.deal_uuid}
                deal={deal}
                onBuyNow={handleBuyNow}
                isProcessing={processingDealId === deal.deal_uuid}
                onClick={handleDealClick}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 p-8">
              <p className="text-lg">
                No deals available at the moment. Check back soon!
              </p>
            </div>
          )} */}

          {displayedDeals.length > 0 ? (
  <>
    {displayedDeals.map((deal) => (
      <DealCard
        key={deal.deal_uuid}
        deal={deal}
        onBuyNow={handleBuyNow}
        isProcessing={processingDealId === deal.deal_uuid}
        onClick={handleDealClick}
      />
    ))}

    {/* Post Deal Card */}
    <div
      onClick={() => navigate("/PostDeal")}
      className="
        border border-dashed border-[#FE7A3A] rounded-lg 
        flex flex-col items-center justify-center 
        p-6 cursor-pointer bg-white hover:bg-orange-50 
        transition-colors duration-200
      "
    >
      <FaPlus className="text-3xl text-[#FE7A3A] mb-2" />
      <p className="text-sm font-semibold text-[#FE7A3A]">Post a New Deal</p>
    </div>
  </>
) : (
  <div className="col-span-full text-center text-gray-600 p-8">
    <p className="text-lg">
      No deals available at the moment. Check back soon!
    </p>
  </div>
)}

        </div>
      </div>

      {/* <button
        className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        onClick={() => navigate("/PostDeal")}
        aria-label="Post a new deal"
      >
        <FaPlus className="text-xl" />
      </button> */}
    </div>
  );
};

export default DealsList;
