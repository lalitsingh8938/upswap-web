// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const VendorProfile = () => {
//   const { userId } = useParams(); // Get userId from the URL
//   const navigate = useNavigate();
//   const [vendorDetails, setVendorDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!userId) {
//       setError("Vendor ID is missing.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     fetch(`https://api.upswap.app/api/customuser/details/${userId}/`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Vendor Profile API Response:", data);
//         if (data && data.full_name) { // Assuming 'full_name' is a key in successful response
//           setVendorDetails(data);
//         } else {
//           setError("Vendor details not found or invalid response structure.");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching vendor details:", err);
//         setError("Failed to load vendor profile. Please try again.");
//         toast.error("Failed to load vendor profile.");
//         setLoading(false);
//       });
//   }, [userId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <h2 className="text-xl text-red-500">{error}</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-[#FE7A3A] text-white py-2 px-4 rounded-md"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (!vendorDetails) {
//     return (
//       <div className="text-center p-4">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <h2 className="text-xl">No vendor details available.</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-[#FE7A3A] text-white py-2 px-4 rounded-md"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <ToastContainer position="top-center" autoClose={3000} />

//       {/* Header */}
//       <div className="flex items-center bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
//         <button className="text-xl" onClick={() => navigate(-1)}>
//           &#8592;
//         </button>
//         <h1 className="text-lg font-semibold flex-grow text-center">
//           Vendor Profile
//         </h1>
//       </div>

//       {/* Vendor Details */}
//       <div className="p-4">
//         <div className="bg-white rounded-lg shadow-md p-6 text-center">
//           <img
//             src={vendorDetails.profile_pic || "/placeholder.jpg"}
//             alt={vendorDetails.full_name}
//             className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-2 border-[#FE7A3A]"
//           />
//           <h2 className="font-bold text-2xl mb-2">{vendorDetails.full_name}</h2>
//           <p className="text-gray-700 mb-2">{vendorDetails.email}</p>
//           <p className="text-gray-700 mb-4">{vendorDetails.phone_number}</p>

//           {vendorDetails.addresses && vendorDetails.addresses.length > 0 && (
//             <div className="text-left mt-4">
//               <h3 className="font-semibold text-lg mb-2">Address:</h3>
//               <p className="text-gray-600">
//                 {vendorDetails.addresses[0].road_name_area_colony},{" "}
//                 {vendorDetails.addresses[0].city},{" "}
//                 {vendorDetails.addresses[0].state} -{" "}
//                 {vendorDetails.addresses[0].pincode}
//               </p>
//               <p className="text-gray-600">
//                 {vendorDetails.addresses[0].full_address}
//               </p>
//             </div>
//           )}

//           {vendorDetails.services && vendorDetails.services.length > 0 && (
//             <div className="text-left mt-4">
//               <h3 className="font-semibold text-lg mb-2">Services:</h3>
//               {vendorDetails.services.map((service, index) => (
//                 <div key={index} className="mb-2 p-2 bg-gray-100 rounded-md">
//                   <p className="font-medium">{service.item_name}</p>
//                   <p className="text-sm text-gray-600">
//                     {service.item_description}
//                   </p>
//                   <p className="text-sm text-gray-600">Price: ${service.price}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorProfile;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; // Import icons

// const VendorProfile = () => {
//   const { userId } = useParams(); // Get userId from the URL, this IS the vendor's ID to fetch
//   const navigate = useNavigate();
//   const [vendorDetails, setVendorDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showFullDescription, setShowFullDescription] = useState(false); // State for "show more"
// const vendorId = localStorage.getItem("vendor_id");
//   useEffect(() => {
//     if (!userId) {
//       setError("Vendor ID is missing from URL.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     // CORRECTED API CALL: Use the userId from useParams()
//     fetch(`https://api.upswap.app/api/vendor/details/${vendorId}`,
//       {headers: {
//         authorization: `Bearer ${localStorage.getItem("access") || ""}`,
//       }}
//     )
//       .then((res) => {
//         if (!res.ok) {
//           // If response is not OK (e.g., 404, 500), throw an error
//           if (res.status === 404) {
//             throw new Error("Vendor not found.");
//           }
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Vendor Profile API Response:", data);
//         if (data) { // Check if data object is not null/undefined
//           setVendorDetails(data);
//         } else {
//           setError("Vendor details not found or invalid response structure.");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching vendor details:", err);
//         setError(`Failed to load vendor profile: ${err.message}. Please try again.`);
//         toast.error(`Failed to load vendor profile: ${err.message}.`);
//         setLoading(false);
//       });
//   }, [userId]); // Dependency array: re-run useEffect if userId changes

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <h2 className="text-xl text-red-500">{error}</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-[#FE7A3A] text-white py-2 px-4 rounded-md"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (!vendorDetails) {
//     return (
//       <div className="text-center p-4">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <h2 className="text-xl">No vendor details available.</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-[#FE7A3A] text-white py-2 px-4 rounded-md"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // Determine if description needs "show more"
//   const businessDescription = vendorDetails.business_description || "No business description available.";
//   const displayDescription = showFullDescription ? businessDescription : businessDescription.substring(0, 150); // Show first 150 chars
//   const needsShowMore = businessDescription.length > 150;

//   // Combine address parts
//   const fullAddress = vendorDetails.addresses && vendorDetails.addresses.length > 0
//     ? `${vendorDetails.addresses[0].road_name_area_colony || ''}, ${vendorDetails.addresses[0].city || ''}, ${vendorDetails.addresses[0].state || ''}, ${vendorDetails.addresses[0].pincode || ''}`.replace(/,\s*$/g, '') // Remove trailing comma if parts are empty
//     : "No address available.";

//   return (
//     <div className="min-h-screen bg-gray-50"> {/* Changed background to slightly off-white for better separation */}
//       <ToastContainer position="top-center" autoClose={3000} />

//       {/* Header */}
//       {/* <div className="flex items-center bg-gradient-to-r border-b-2 border-[#FE7A3A] bg-[#FE7A3A] text-white p-4">
//         <button className="text-xl" onClick={() => navigate(-1)}>
//           &#8592;
//         </button>
//         <h1 className="text-lg font-semibold flex-grow text-center">
//           {vendorDetails.full_name || "Vendor Profile"}
//         </h1>
//       </div> */}

//       <div className="p-6 space-y-4">
//         {/* Profile Pic - Centered at the top of the content area */}
//         <div className="flex justify-center -mt-16 mb-4"> {/* Negative margin to pull it up into header area slightly */}
//           <img
//             src={vendorDetails.profile_pic || ""}
//             alt={vendorDetails.full_name}
//             className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
//           />
//         </div>

//         {/* Email and Phone Number */}
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <div className="flex items-center mb-2">
//             <FaEnvelope className="text-gray-600 mr-2" />
//             <p className="text-gray-800">{vendorDetails.business_email_id || "N/A"}</p>
//           </div>
//           <div className="flex items-center">
//             <FaPhoneAlt className="text-gray-600 mr-2" />
//             <p className="text-gray-800">{vendorDetails.phone_number || "N/A"}</p>
//           </div>
//         </div>

//         {/* Business Description */}
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="font-semibold text-lg mb-2">Business description</h2>
//           <p className="text-gray-700 leading-relaxed">
//             {displayDescription}
//             {needsShowMore && (
//               <span
//                 className="text-blue-500 cursor-pointer ml-1 hover:underline"
//                 onClick={() => setShowFullDescription(!showFullDescription)}
//               >
//                 {showFullDescription ? "show less" : "show more ..."}
//               </span>
//             )}
//           </p>
//         </div>

//         {/* Images (Assuming your API might return a list of images or a primary image) */}
//         <div className="bg-white rounded-lg shadow-md p-4">
//             <h2 className="font-semibold text-lg mb-2">Images</h2>
//             <div className="flex space-x-4 overflow-x-auto pb-2"> {/* Added pb-2 for scrollbar space */}
//                 {/* Example of how you might map an array of business images if available */}
//                 {/* {vendorDetails.business_images && vendorDetails.business_images.length > 0 ? (
//                     vendorDetails.business_images.map((imgUrl, index) => (
//                         <img
//                             key={index}
//                             src={imgUrl} // Assuming imgUrl is the direct URL
//                             alt={`Business Image ${index + 1}`}
//                             className="w-32 h-32 object-cover rounded-lg shadow-sm flex-shrink-0"
//                         />
//                     ))
//                 ) : ( */}
//                     {/* Placeholder images if no specific business images are provided */}
//                     <img
//                         src="https://via.placeholder.com/128x128?text=Storefront" // Placeholder for "Store" image
//                         alt="Storefront"
//                         className="w-32 h-32 object-cover rounded-lg shadow-sm flex-shrink-0"
//                     />
//                      <img
//                         src="https://via.placeholder.com/128x128?text=Service+View" // Another placeholder
//                         alt="Service View"
//                         className="w-32 h-32 object-cover rounded-lg shadow-sm flex-shrink-0"
//                     />
//                 {/* )} */}
//             </div>
//         </div>

//         {/* Location */}
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="font-semibold text-lg mb-2">Location</h2>
//           <div className="flex items-center">
//             <FaMapMarkerAlt className="text-gray-600 mr-2 flex-shrink-0" />
//             <p className="text-gray-700 break-words">{fullAddress}</p> {/* break-words for long addresses */}
//             {/* You can add an arrow icon here if you want to indicate navigability to a map */}
//             {/* <span className="ml-auto text-gray-500">&#8250;</span> */}
//           </div>
//         </div>

//         {/* Services/Other details */}
//         {vendorDetails.services && vendorDetails.services.length > 0 && (
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h3 className="font-semibold text-lg mb-2">Services:</h3>
//             <div className="space-y-3">
//               {vendorDetails.services.map((service, index) => (
//                 <div key={index} className="p-3 bg-gray-100 rounded-md border border-gray-200">
//                   <p className="font-medium text-gray-800">{service.item_name || "N/A"}</p>
//                   <p className="text-sm text-gray-600">{service.item_description || "No description"}</p>
//                   <p className="text-sm text-gray-600">Price: ${service.price || "N/A"}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VendorProfile;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInfoCircle, FaImage, FaTag } from "react-icons/fa"; // Added more icons

// const VendorProfile = () => {
//   const { userId } = useParams(); // <-- THIS IS THE VENDOR ID FROM THE URL
//   const navigate = useNavigate();
//   const [vendorDetails, setVendorDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showFullDescription, setShowFullDescription] = useState(false); // State for "show more"
// const vendorId = localStorage.getItem("vendor_id"); // <-- Use userId from useParams() directly
//   // REMOVE THIS LINE: const vendorId = localStorage.getItem("vendor_id");
//   // You don't need the localStorage vendorId here, as you're viewing *another* vendor's profile.

//   useEffect(() => {
//     if (!userId) { // Ensure userId from URL is present
//       setError("Vendor ID is missing from URL.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     // CRITICAL FIX: Use 'userId' from useParams() in the API call
//     // Using the 'customuser/details' endpoint as previously established.
//     // If 'vendor/details' is the correct one, make sure to use userId, not localStorage's vendorId.
//     fetch(`https://api.upswap.app/api/vendor/details/${vendorId}`, // <-- Use userId from useParams()
//       {
//         headers: {
//           // You might need an Authorization header if this API requires it
//           // even for viewing other user profiles. If not, you can remove it.
//           authorization: `Bearer ${localStorage.getItem("access") || ""}`,
//         }
//       }
//     )
//       .then((res) => {
//         if (!res.ok) {
//           if (res.status === 404) {
//             throw new Error("Vendor not found. The ID might be incorrect.");
//           }
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Vendor Profile API Response:", data); // IMPORTANT: Check this console log for actual data structure
//         if (data) {
//           setVendorDetails(data);
//         } else {
//           setError("Vendor details not found or invalid response structure.");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching vendor details:", err);
//         setError(`Failed to load vendor profile: ${err.message}. Please try again.`);
//         toast.error(`Failed to load vendor profile: ${err.message}.`);
//         setLoading(false);
//       });
//   }, [userId]); // Dependency array: re-run useEffect if userId changes

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 min-h-screen flex flex-col justify-center items-center">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <h2 className="text-2xl text-red-600 font-semibold mb-4">{error}</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-[#FE7A3A] hover:bg-[#FF8C4A] text-white py-2 px-6 rounded-md shadow-md transition duration-300"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (!vendorDetails) {
//     return (
//       <div className="text-center p-4 min-h-screen flex flex-col justify-center items-center">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <h2 className="text-2xl text-gray-700 font-semibold mb-4">No vendor details available.</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-4 bg-[#FE7A3A] hover:bg-[#FF8C4A] text-white py-2 px-6 rounded-md shadow-md transition duration-300"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // --- Data preparation for display ---
//   const businessDescription = vendorDetails.business_description || "No business description provided.";
//   const displayDescription = showFullDescription ? businessDescription : businessDescription.substring(0, 200); // Increased substring for more initial content
//   const needsShowMore = businessDescription.length > 200; // Adjusted based on substring length

//   const address = vendorDetails.addresses && vendorDetails.addresses.length > 0
//     ? vendorDetails.addresses[0]
//     : {}; // Use an empty object if no addresses to prevent errors

//   const fullAddress = `${address.road_name_area_colony || ''}${address.road_name_area_colony && address.city ? ', ' : ''}${address.city || ''}${address.city && address.state ? ', ' : ''}${address.state || ''}${address.state && address.pincode ? ' - ' : ''}${address.pincode || ''}`.trim();

//   // FOR NOW, I'm keeping the placeholder and assuming 'profile_pic' is the only direct image.
//   // If your API does provide an array of URLs for business images, assign it here.
//   const businessImages = vendorDetails.business_images && Array.isArray(vendorDetails.business_images)
//     ? vendorDetails.business_images // Assuming this array directly contains image URLs
//     : []; // Fallback to an empty array

//   // Example for business images if they are nested in 'vendorDetails.data.images' or similar
//   // const businessImages = (vendorDetails.data && Array.isArray(vendorDetails.data.images)) ? vendorDetails.data.images : [];

//   return (
//     <div className="min-h-screen bg-gray-50 pb-8"> {/* Added padding to bottom */}
//       <ToastContainer position="top-center" autoClose={3000} />

//       {/* Header */}
//       <div className="flex items-center bg-gradient-to-r from-[#FE7A3A] to-[#FF9A6A] text-white p-4 relative z-10">
//          <button className="text-2xl" onClick={() => navigate(-1)}>
//           &#8592;
//         </button>
//         <h1 className="text-xl font-semibold flex-grow text-center pr-10"> {/* Added right padding to balance back arrow */}
//           {vendorDetails.full_name || "Vendor Profile"}
//         </h1>
//       </div>

//       {/* Profile Pic - Centered and slightly overlapping the header */}
//       <div className="flex justify-center -mt-16 mb-4 relative z-20">
//         <img
//           src={vendorDetails.profile_pic || "https://via.placeholder.com/150?text=Vendor"}
//           alt={vendorDetails.full_name || "Vendor Profile Picture"}
//           className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
//         />
//       </div>

//       <div className="p-4 space-y-5"> {/* Increased spacing between sections */}

//         {/* Contact Information */}
//         <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
//           <h2 className="font-bold text-xl mb-3 text-gray-800">Contact Details</h2>
//           <div className="flex items-center mb-3 text-gray-700">
//             <FaEnvelope className="text-[#FE7A3A] mr-3 text-lg" />
//             <p>{vendorDetails.email || "Email not available"}</p>
//           </div>
//           <div className="flex items-center text-gray-700">
//             <FaPhoneAlt className="text-[#FE7A3A] mr-3 text-lg" />
//             <p>{vendorDetails.phone_number || "Phone not available"}</p>
//           </div>
//         </div>

//         {/* Business Description */}
//         <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
//           <h2 className="font-bold text-xl mb-3 text-gray-800 flex items-center">
//             <FaInfoCircle className="text-blue-500 mr-2" /> Business Description
//           </h2>
//           <p className="text-gray-700 leading-relaxed text-base">
//             {displayDescription}
//             {needsShowMore && (
//               <span
//                 className="text-blue-600 cursor-pointer ml-1 font-medium hover:underline"
//                 onClick={() => setShowFullDescription(!showFullDescription)}
//               >
//                 {showFullDescription ? "show less" : "show more..."}
//               </span>
//             )}
//           </p>
//         </div>

//         {/* Business Images */}
//         <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
//           <h2 className="font-bold text-xl mb-3 text-gray-800 flex items-center">
//             <FaImage className="text-green-500 mr-2" /> Business Images
//           </h2>
//           {businessImages.length > 0 ? (
//             <div className="flex space-x-4 overflow-x-auto pb-2 custom-scrollbar">
//               {businessImages.map((imgUrl, index) => (
//                 <img
//                   key={index}
//                   src={imgUrl}
//                   alt={`Business Image ${index + 1}`}
//                   className="w-40 h-40 object-cover rounded-lg shadow-sm flex-shrink-0 border border-gray-200"
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
//               <FaImage className="text-4xl mx-auto mb-2 text-gray-400" />
//               <p>No business images uploaded yet.</p>
//               <div className="flex space-x-2 mt-4 justify-center">
//                  {/* Placeholders, can be removed once actual images are available */}
//                 <img
//                   src="https://via.placeholder.com/120x120?text=Store+View+1"
//                   alt="Placeholder Store 1"
//                   className="w-24 h-24 object-cover rounded-lg shadow-sm"
//                 />
//                  <img
//                   src="https://via.placeholder.com/120x120?text=Store+View+2"
//                   alt="Placeholder Store 2"
//                   className="w-24 h-24 object-cover rounded-lg shadow-sm"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Location */}
//         <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
//           <h2 className="font-bold text-xl mb-3 text-gray-800 flex items-center">
//             <FaMapMarkerAlt className="text-red-500 mr-2" /> Location
//           </h2>
//           {fullAddress.trim() !== '' ? (
//             <p className="text-gray-700 leading-relaxed text-base">
//               {fullAddress}
//             </p>
//           ) : (
//             <p className="text-gray-500">Location not available.</p>
//           )}
//         </div>

//         {/* Services Section */}
//         {vendorDetails.services && vendorDetails.services.length > 0 && (
//           <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
//             <h3 className="font-bold text-xl mb-3 text-gray-800 flex items-center">
//               <FaTag className="text-purple-500 mr-2" /> Services Offered
//             </h3>
//             <div className="space-y-4">
//               {vendorDetails.services.map((service, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
//                   <p className="font-semibold text-lg text-gray-900 mb-1">{service.item_name || "Service Name"}</p>
//                   <p className="text-sm text-gray-600 mb-2">{service.item_description || "No description provided."}</p>
//                   <p className="text-md font-bold text-[#FE7A3A]">Price: ₹{service.item_price || "N/A"}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default VendorProfile;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {FaMapMarkerAlt, FaHeart, FaBars } from "react-icons/fa";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaImage,
  FaHeart,
  FaBars,
  FaTag,
} from "react-icons/fa"; // Added more icons

const VendorProfile = () => {
  const { userId } = useParams(); // THIS IS THE VENDOR ID FROM THE URL (e.g., from /vendor/:userId)
  const navigate = useNavigate();
  const [vendorDetails, setVendorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false); // State for "show more"

  useEffect(() => {
    if (!userId) {
      setError("Vendor ID is missing from URL. Cannot fetch profile.");
      setLoading(false);
      return;
    }

    setLoading(true);
    const accessToken = localStorage.getItem("access"); // Get the access token

    // Assuming 'vendor/details/{id}' is the correct endpoint for viewing ANY vendor's details.
    const apiUrl = `https://api.upswap.app/api/vendor/details/${userId}/`;

    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken || ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Authentication required to view this profile.");
          }
          if (res.status === 403) {
            throw new Error("You do not have permission to view this profile.");
          }
          if (res.status === 404) {
            throw new Error("Vendor not found or ID is incorrect.");
          }
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Vendor Profile API Response:", data);
        if (data) {
          setVendorDetails(data);
        } else {
          setError("Vendor details not found or invalid response structure.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vendor details:", err);
        setError(`Failed to load vendor profile: ${err.message}.`);
        toast.error(`Failed to load vendor profile: ${err.message}.`);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 min-h-screen flex flex-col justify-center items-center">
        <ToastContainer position="top-center" autoClose={3000} />
        <h2 className="text-2xl text-red-600 font-semibold mb-4">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-[#FE7A3A] hover:bg-[#FF8C4A] text-white py-2 px-6 rounded-md shadow-md transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!vendorDetails) {
    return (
      <div className="text-center p-4 min-h-screen flex flex-col justify-center items-center">
        <ToastContainer position="top-center" autoClose={3000} />
        <h2 className="text-2xl text-gray-700 font-semibold mb-4">
          No vendor details available.
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-[#FE7A3A] hover:bg-[#FF8C4A] text-white py-2 px-6 rounded-md shadow-md transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  // --- Data preparation for display ---
  const businessDescription =
    vendorDetails.business_description || "No business description provided.";
  const displayDescription = showFullDescription
    ? businessDescription
    : businessDescription.substring(0, 200);
  const needsShowMore = businessDescription.length > 200;

  const address =
    vendorDetails.addresses && vendorDetails.addresses.length > 0
      ? vendorDetails.addresses[0]
      : {};

  const fullAddress = `${address.road_name_area_colony || ""}${
    address.road_name_area_colony && address.city ? ", " : ""
  }${address.city || ""}${address.city && address.state ? ", " : ""}${
    address.state || ""
  }${address.state && address.pincode ? " - " : ""}${
    address.pincode || ""
  }`.trim();

  const businessImages = Array.isArray(vendorDetails.uploaded_images)
    ? vendorDetails.uploaded_images.map((img) => img.compressed)
    : [];

  return (
    // <div className="min-h-screen bg-gray-50 pb-8">
    <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl rounded-md mx-auto bg-gradient-to-b from-orange-400 to-white">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
        <button className="mr-4" onClick={() => navigate("/UpswapVendors")}>
          &#x276E;
        </button>
        <h1 className="text-lg font-semibold">Vendor Profile</h1>
        <div className="flex gap-4">
          <FaHeart
            className="text-xl cursor-pointer"
            onClick={() => navigate("/Favorite")}
          />
          <FaBars className="text-xl" />
        </div>
      </div>

      {/* Profile Pic - Adjusted positioning since header is removed */}
      <div className="flex justify-center pt-8 mb-4">
        {" "}
        {/* Added padding-top to give space at the very top */}
        <img
          src={
            vendorDetails.profile_pic ||
            "https://via.placeholder.com/150?text=Vendor"
          }
          alt={vendorDetails.full_name || "Vendor Profile Picture"}
          className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
        />
      </div>

      <div className="p-4 space-y-5">
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
          <h2 className="font-bold text-xl mb-3 text-gray-800">
            Contact Details
          </h2>
          <div className="flex items-center mb-3 text-gray-700">
            <FaEnvelope className="text-[#FE7A3A] mr-3 text-lg" />
            <p>{vendorDetails.business_email_id || "Email not available"}</p>
          </div>
          <div className="flex items-center text-gray-700">
            <FaPhoneAlt className="text-[#FE7A3A] mr-3 text-lg" />
            <p>{vendorDetails.phone_number || "Phone not available"}</p>
          </div>
        </div>

        {/* Business Description */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
          <h2 className="font-bold text-xl mb-3 text-gray-800 flex items-center">
            <FaInfoCircle className="text-blue-500 mr-2" /> Business Description
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            {displayDescription}
            {needsShowMore && (
              <span
                className="text-blue-600 cursor-pointer ml-1 font-medium hover:underline"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "show less" : "show more..."}
              </span>
            )}
          </p>
        </div>

        {/* Business Images */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
          <h2 className="font-bold text-xl mb-3 text-gray-800 flex items-center">
            <FaImage className="text-green-500 mr-2" /> Business Images
          </h2>
          {businessImages.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto pb-2 custom-scrollbar">
              {businessImages.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Business Image ${index + 1}`}
                  className="w-40 h-40 object-cover rounded-lg shadow-sm flex-shrink-0 border border-gray-200"
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
              <FaImage className="text-4xl mx-auto mb-2 text-gray-400" />
              <p>No business images uploaded yet.</p>
              {/* Optional: Keep placeholders for visual consistency if no images from API */}
              <div className="flex space-x-2 mt-4 justify-center">
                <img
                  src="https://via.placeholder.com/120x120?text=Store+View+1"
                  alt="Placeholder Store 1"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
                <img
                  src="https://via.placeholder.com/120x120?text=Store+View+2"
                  alt="Placeholder Store 2"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
          <h2 className="font-bold text-xl mb-3 text-gray-800 flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" /> Location
          </h2>
          {fullAddress.trim() !== "" ? (
            <p className="text-gray-700 leading-relaxed text-base">
              {fullAddress}
            </p>
          ) : (
            <p className="text-gray-500">Location not available.</p>
          )}
        </div>

        {/* Services Section */}
        {vendorDetails.services && vendorDetails.services.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <h3 className="font-bold text-xl mb-3 text-gray-800 flex items-center">
              <FaTag className="text-purple-500 mr-2" /> Services Offered
            </h3>
            <div className="space-y-4">
              {vendorDetails.services.map((service, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-100 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <p className="font-semibold text-lg text-gray-900 mb-1">
                    {service.item_name || "Service Name"}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {service.item_description || "No description provided."}
                  </p>
                  <p className="text-md font-bold text-[#FE7A3A]">
                    Price: ₹{service.item_price || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProfile;
