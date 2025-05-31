import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const DiscoverConnectResponsive = () => {
  const [isLoading, setIsLoading] = useState(true); // State to control the loading spinner
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts early
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      // Full-screen overlay for the spinner while content is loading
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Processing...
        </p>
      </div>
    );
  }

  return (
    <div className="min-80 bg-orange-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 rounded-md">
      {/* Main content block: text-center for text alignment, w-full for full width, max-w-4xl and mx-auto to center itself */}
      <div className="text-center w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-4">
          {" "}
          {/* Adjusted text size for responsiveness, consistent margin-bottom */}
          Discover & Connect Locally
        </h1>
        {/* Paragraph: Centered using mx-auto and max-w, responsive text size */}
        <p className="sm:text-lg text-gray-600 mb-10 px-4 max-w-2xl mx-auto">
          Find amazing activities, exclusive deals, and trusted services from
          vendors in your neighborhood.
        </p>

        {/* Search and Location Bar Container: Centered, responsive stacking */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 w-full max-w-2xl mx-auto">
          <div className="relative flex flex-col sm:flex-row items-center w-full bg-white rounded-lg shadow-md p-2">
            {/* What are you looking for? (Equal width with flex-grow on sm and up) */}
            <div className="flex items-center w-full sm:flex-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 ml-2 min-w-max"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-grow p-2 outline-none text-gray-700 placeholder-gray-400 w-full"
              />
            </div>

            {/* Location (Equal width with flex-grow on sm and up) */}
            <div className="flex items-center border-t sm:border-t-0 sm:border-l border-gray-200 mt-2 sm:mt-0 pt-2 sm:pt-0 pl-0 sm:pl-5 w-full sm:flex-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 ml-2 sm:ml-0 min-w-max"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Search Button */}
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 w-full sm:w-auto mt-2 sm:mt-0 ml-0 sm:ml-2">
              Search
            </button>
          </div>
        </div>

        {/* Explore Activities and Browse Deals Buttons - Centered relative to the search bar block */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-2xl mx-auto">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 shadow-md w-full sm:w-auto
          " onClick={() => navigate("/Activities")}>
            
            Explore Activities
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 transition duration-300 shadow-md w-full sm:w-auto" 
          onClick={() => navigate("/Deals")}>
            Browse Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverConnectResponsive;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const DiscoverConnectResponsive = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeButton, setActiveButton] = useState("activities"); // NEW
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500"></div>
//         <p className="mt-4 text-lg font-semibold text-gray-700">Processing...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-80 bg-orange-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 rounded-md">
//       <div className="text-center w-full max-w-4xl mx-auto">
//         <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-4">
//           Discover & Connect Locally
//         </h1>
//         <p className="sm:text-lg text-gray-600 mb-10 px-4 max-w-2xl mx-auto">
//           Find amazing activities, exclusive deals, and trusted services from vendors in your neighborhood.
//         </p>

//         <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 w-full max-w-2xl mx-auto">
//           <div className="relative flex flex-col sm:flex-row items-center w-full bg-white rounded-lg shadow-md p-2">
//             <div className="flex items-center w-full sm:flex-grow">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 ml-2 min-w-max" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="What are you looking for?"
//                 className="flex-grow p-2 outline-none text-gray-700 placeholder-gray-400 w-full"
//               />
//             </div>

//             <div className="flex items-center border-t sm:border-t-0 sm:border-l border-gray-200 mt-2 sm:mt-0 pt-2 sm:pt-0 pl-0 sm:pl-5 w-full sm:flex-grow">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 ml-2 sm:ml-0 min-w-max" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Location"
//                 className="w-full p-2 outline-none text-gray-700 placeholder-gray-400"
//               />
//             </div>

//             <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 w-full sm:w-auto mt-2 sm:mt-0 ml-0 sm:ml-2">
//               Search
//             </button>
//           </div>
//         </div>

//         {/* BUTTONS SECTION */}
//         <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-2xl mx-auto">
//           <button
//             className={`px-6 py-2 rounded-md shadow-md w-full sm:w-auto transition duration-300 ${
//               activeButton === "activities"
//                 ? "bg-orange-500 text-white"
//                 : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
//             }`}
//             onClick={() => {
//               setActiveButton("activities");
//               navigate("/Activities");
//             }}
//           >
//             Explore Activities
//           </button>

//           <button
//             className={`px-6 py-2 rounded-md shadow-md w-full sm:w-auto transition duration-300 ${
//               activeButton === "deals"
//                 ? "bg-orange-500 text-white"
//                 : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
//             }`}
//             onClick={() => {
//               setActiveButton("deals");
//               navigate("/Deals");
//             }}
//           >
//             Browse Deals
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscoverConnectResponsive;

// // App.js or wherever you want to render this section
// import React from 'react';
// // Make sure you have react-icons installed: npm install react-icons
// import { FiShare2 } from 'react-icons/fi'; // Share icon
// import { FaArrowRight } from 'react-icons/fa'; // Right arrow icon

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
//           Posted by: <span className="font-medium text-gray-700">{postedBy}</span>
//         </p>
//         <p className="text-sm text-gray-500 mb-3">
//           Location: <span className="font-medium text-gray-700">{location}</span>
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
// // ExclusiveDealsSection Component
// // Poore section ko render karega
// // =============================================================================
// const ExclusiveDealsSection = () => {
//   // Dummy Data (Aap is data ko API se fetch kar sakte hain)
//   const dealsData = [
//     {
//       id: 1,
//       imageSrc: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Yoga+Mat',
//       title: 'Premium Yoga Mat Bundle',
//       postedBy: 'Wellness Hub',
//       location: 'Indirapuram, Delhi',
//       originalPrice: 1299,
//       discountedPrice: 999,
//       discountPercentage: 23,
//       dealValidTill: 'Aug 10th, 8pm',
//     },
//     {
//       id: 2,
//       imageSrc: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Camera+Rental',
//       title: 'Professional Camera Rental',
//       postedBy: 'Digital Studio',
//       location: 'Connaught Place, Delhi',
//       originalPrice: 899,
//       discountedPrice: 799,
//       discountPercentage: 11,
//       dealValidTill: 'Aug 10th, 8pm',
//     },
//     {
//       id: 3,
//       imageSrc: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Organic+Food',
//       title: 'Organic Food Basket',
//       postedBy: 'Fresh Farm',
//       location: 'Dwarka, Delhi',
//       originalPrice: 1499,
//       discountedPrice: 1199,
//       discountPercentage: 20,
//       dealValidTill: 'Aug 10th, 8pm',
//     },
//     {
//       id: 4,
//       imageSrc: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Guitar+Lessons',
//       title: 'Guitar Lessons (4 Sessions)',
//       postedBy: 'Music Academy',
//       location: 'Rohini, Delhi',
//       originalPrice: 2499,
//       discountedPrice: 1999,
//       discountPercentage: 20,
//       dealValidTill: 'Aug 10th, 8pm',
//     },
//     {
//       id: 5,
//       imageSrc: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Home+Cleaning',
//       title: 'Home Cleaning Service',
//       postedBy: 'CleanX',
//       location: 'Noida, UP',
//       originalPrice: 899,
//       discountedPrice: 599,
//       discountPercentage: 33,
//       dealValidTill: 'Aug 10th, 8pm',
//     },
//     {
//       id: 6,
//       imageSrc: 'https://via.placeholder.com/400x300/e0e0e0/000000?text=Art+Materials',
//       title: 'Art Workshop Materials',
//       postedBy: 'Creative Arts',
//       location: 'Gautam Ba, Delhi',
//       originalPrice: 1999,
//       discountedPrice: 1199,
//       discountPercentage: 40,
//       dealValidTill: 'Aug 22nd, 4pm',
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
//           lg:grid-cols-4 // On large screens and up, 4 columns
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