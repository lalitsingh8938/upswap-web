// import React from "react";
// import { FaUser, FaBriefcase, FaMapMarkerAlt, FaShare } from "react-icons/fa";

// const vendors = [
//   {
//     name: "Wellness Yoga Studio",
//     owner: "Sarah Johnson",
//     type: "Fitness Center",
//     location: "Greater Kailash, Delhi",
//     image: "Image (5).png",
//   },
//   {
//     name: "Tech Solutions Hub",
//     owner: "Rahul Mehta",
//     type: "IT Services",
//     location: "Cyber City, Gurugram",
//     image: "Image (7).png",
//   },
//   {
//     name: "Green Earth Organics",
//     owner: "Priya Sharma",
//     type: "Organic Store",
//     location: "Vasant Kunj, Delhi",
//     image: "Image (5).png",
//   },
//   {
//     name: "Creative Arts Academy",
//     owner: "Michael Chen",
//     type: "Art School",
//     location: "Saket, Delhi",
//     image: "Image (7).png",
//   },
//   {
//     name: "Pet Care Center",
//     owner: "Amit Verma",
//     type: "Pet Services",
//     location: "Malviya Nagar, Delhi",
//     image: "Image (5).png",
//   },
//   {
//     name: "Foodie's Kitchen",
//     owner: "Lisa Wang",
//     type: "Restaurant",
//     location: "Defence Colony, Delhi",
//     image: "Image (7).png",
//   },
// ];

// const Vendors = () => {
//   return (
//     <div className="bg-white py-10 px-8 max-w-screen-xl mx-auto">
//       {/* Section Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold">Popular Vendors</h2>
//           <p className="text-gray-600 text-sm">
//             Discover trusted local businesses
//           </p>
//         </div>
//         <button className="text-orange-500 font-medium flex items-center gap-1 text-sm">
//           View all vendors <span>➔</span>
//         </button>
//       </div>

//       {/* Vendor Cards Grid */}
//       <div
//         className="
//           grid gap-4
//           grid-cols-1
//           sm:grid-cols-2
//           md:grid-cols-3
//           lg:grid-cols-4
//           xl:grid-cols-6
//           2xl:grid-cols-6
//         "
//       >
//         {vendors.map((vendor, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl border shadow-sm hover:shadow-md transition w-full"
//           >
//             {vendor.image && (
//               <img
//                 src={vendor.image}
//                 alt={vendor.name}
//                 className="w-full h-32 object-cover rounded-t-xl"
//               />
//             )}

//             <div className="p-4">
//               <h3 className="text-sm font-semibold mb-2">{vendor.name}</h3>

//               <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
//                 <FaUser className="text-gray-400" /> Owner Name:{" "}
//                 <span className="text-gray-800">{vendor.owner}</span>
//               </p>

//               <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
//                 <FaBriefcase className="text-gray-400" /> Business Type:{" "}
//                 <span className="text-gray-800">{vendor.type}</span>
//               </p>

//               <p className="text-xs text-gray-600 flex items-center gap-1">
//                 <FaMapMarkerAlt className="text-gray-400" /> Location:{" "}
//                 <span className="text-gray-800">{vendor.location}</span>
//               </p>

//               <div className="flex justify-between items-center mt-4">
//                 <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded">
//                   View full profile
//                 </button>
//                 <FaShare className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Vendors;

import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaMapMarkerAlt,
  FaShare,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllVendors, setShowAllVendors] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://api.upswap.app/api/vendor/lists/")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response (Vendors List):", data);
        setVendors(data?.vendors || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vendors:", err);
        setLoading(false);
        toast.error("Failed to fetch popular vendors.");
      });
  }, []);

  // Determine which vendors to display based on showAllVendors state
  const displayedVendors = showAllVendors ? vendors : vendors.slice(0, 6);

  // Only show the button if there are more than 6 vendors
  const shouldShowToggleButton = vendors.length > 6;

  const handleToggleView = () => {
    setShowAllVendors((prevState) => !prevState);
  };

  return (
    <div className="bg-white">
      <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        {/* Section Header - Matching Deals component styling */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl leading-10 font-bold text-gray-900 mb-2">
              Popular Vendors
            </h2>
            <p className="text-lg leading-7 text-gray-700">
              Discover trusted local businesses
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
              {showAllVendors ? (
                <>
                  Show Less <FaArrowLeft className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  View all vendors <FaArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {vendors.length === 0 && (
              <div className="text-center text-gray-600">
                No popular vendors found.
              </div>
            )}

            {/* Vendor Cards Grid - Matching Deals component grid layout */}
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
              {displayedVendors.map((vendor) => (
                <div
                  key={vendor.vendor_id}
                  className="
                    border border-gray-200 rounded-lg overflow-hidden
                    bg-white shadow-md cursor-pointer
                    transition-transform duration-200 hover:scale-[1.01]
                  "
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={vendor.profile_pic || "/duplicate (1).png"}
                      alt={vendor.full_name}
                      className="w-full h-full object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/duplicate (1).png";
                      }}
                    />
                  </div>

                  <div className="p-3">
                    {/* <h3 className="font-semibold text-base leading-tight mb-2 gap-8 flex items-center">
                       👥{vendor.full_name}
                    </h3> */}
                    <h3 className="font-semibold text-base leading-tight mb-2 flex items-center gap-1">
                      <span>👥</span>
                      <span>{vendor.full_name}</span>
                    </h3>

                    {/* <p className="text-xs text-gray-500">
                         <BiSolidCategory className="text-base text-orange-500" />
                      <span className="font-medium text-[#EF4444]">
                        
                        {vendor.services?.[0]?.item_name || "N/A"}
                      </span>
                    </p> */}

                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                      <BiSolidCategory className="text-base text-orange-500" />
                      <span className="font-medium text-[#EF4444]">
                        {vendor.services?.[0]?.item_name || "N/A"}
                      </span>
                    </p>

                    <p className="text-xs text-gray-500 mb-2">
                      📍{" "}
                      <span className="font-medium text-gray-700">
                        {vendor.addresses?.[0]?.road_name_area_colony || "N/A"}
                      </span>
                    </p>

                    <div className="flex gap-2 justify-between mt-4">
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
                        <FaShare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/vendor/${vendor.vendor_id}`);
                        }}
                        className="
                          flex-grow py-1.5 px-3 bg-orange-500 text-white
                          rounded-md font-medium text-sm
                          hover:bg-orange-600 transition-colors duration-200
                          whitespace-nowrap
                        "
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Vendors;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // =============================================================================
// // VendorCard Component (matches DealCard style)
// // =============================================================================
// const VendorCard = ({ vendor, onClick }) => {
//   const { vendor_name, vendor_service, vendor_city, vendor_state, vendor_image } = vendor;

//   const imageSrc = vendor_image ? vendor_image : "/upswap.png";

//   return (
//     <div
//       className="
//         border border-gray-200 rounded-lg overflow-hidden
//         bg-white shadow-md cursor-pointer
//         transition-transform duration-200 hover:scale-[1.01]
//       "
//       onClick={() => onClick(vendor)}
//     >
//       <div className="relative h-36 overflow-hidden">
//         <img
//           src={imageSrc}
//           alt={vendor_name || "Vendor image"}
//           className="w-full h-full object-cover rounded-t-lg"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = "/upswap.png";
//           }}
//         />
//       </div>

//       <div className="p-3">
//         <h3 className="font-semibold text-base leading-tight mb-1">{vendor_name}</h3>
//         <p className="text-xs text-gray-500 mb-1">
//           Service: <span className="font-medium text-[#EF4444]">{vendor_service}</span>
//         </p>
//         <p className="text-xs text-gray-500">
//           Location: <span className="font-medium text-gray-700">{vendor_city}, {vendor_state}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// // =============================================================================
// // VendorList Component (matches DealsList outer padding/grid)
// // =============================================================================
// const VendorList = () => {
//   const [vendors, setVendors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchVendors = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("https://api.upswap.app/api/vendors/lists/", {
//         headers: { "Content-Type": "application/json" },
//       });
//       setVendors(response.data.vendors || []);
//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error fetching vendors:", err);
//       setError("Failed to load vendors. Please try again later.");
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const handleVendorClick = (vendor) => {
//     console.log("Vendor clicked:", vendor);
//     // Navigate or open modal if needed
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE7A3A]"></div>
//           <p className="text-[#FE7A3A] text-lg mt-4">Loading vendors...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white flex flex-col items-center justify-center text-gray-700 text-xl p-4">
//         <p className="text-red-500">Error: {error}</p>
//         <button
//           onClick={fetchVendors}
//           className="mt-4 px-4 py-2 bg-[#FE7A3A] text-white rounded-lg hover:bg-orange-500"
//         >
//           Retry Loading Vendors
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white">
//       <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-4xl leading-10 font-bold text-gray-900 mb-2">
//               Our Trusted Vendors
//             </h2>
//             <p className="text-lg leading-7 text-gray-700">
//               Discover local vendors offering great services
//             </p>
//           </div>
//         </div>

//         <div
//           className="
//             grid gap-4
//             grid-cols-1
//             sm:grid-cols-2
//             md:grid-cols-3
//             lg:grid-cols-4
//             xl:grid-cols-6
//             2xl:grid-cols-6
//           "
//         >
//           {vendors.length > 0 ? (
//             vendors.map((vendor) => (
//               <VendorCard key={vendor.vendor_id} vendor={vendor} onClick={handleVendorClick} />
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-600 p-8">
//               <p className="text-lg">
//                 No vendors available at the moment. Check back soon!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorList;
