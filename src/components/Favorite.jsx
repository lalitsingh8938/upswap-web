// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";

// const FavoritesList = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await fetch("https://api.upswap.app/api/favorite-vendors/lists/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           toast.error(data.message || "Failed to fetch favorites");
//         } else {
//           setFavorites(data?.vendors || []);
//         }
//       } catch (error) {
//         toast.error("Error fetching favorites");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   return (
//     <div className="p-4">
//       <ToastContainer />
//       <h1 className="text-xl font-bold mb-4">My Favorite Vendors</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : favorites.length === 0 ? (
//         <p>No favorites yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {favorites.map((vendor) => (
//             <div key={vendor.vendor_id} className="p-4 shadow rounded border">
//               <h2 className="font-semibold">{vendor.full_name}</h2>
//               <p>{vendor.services[0]?.item_description || "No description"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FavoritesList;

// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MdLocationOn } from "react-icons/md";

// const FavoritesList = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await fetch(
//           "https://api.upswap.app/api/favorite-vendors/lists/",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           toast.error(data.message || "Failed to fetch favorites");
//         } else {
//           setFavorites(data?.vendors || []);
//         }
//       } catch (error) {
//         toast.error("Error fetching favorites");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   if (loading) return <p className="p-6 text-center">Loading favorites...</p>;

//   return (
//     <div className="p-6">
//       <ToastContainer />
//       {favorites.length === 0 ? (
//         <p>No favorite vendors found.</p>
//       ) : (
//         favorites.map((vendor, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded shadow-md mb-6"
//           >
//             {/* Column 1: Profile & Contact */}
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={vendor.profile_pic || "https://via.placeholder.com/100"}
//                 alt={vendor.full_name}
//                 className="w-24 h-24 rounded-full object-cover mb-3"
//               />
//               <h2 className="text-xl font-semibold">{vendor.full_name}</h2>
//               <div className="text-sm text-gray-600 mt-2">
//                 <p><span className="font-semibold">Email:</span> {vendor.business_email_id}</p>
//                 <p><span className="font-semibold">Phone:</span> {vendor.phone_number}</p>
//               </div>
//             </div>

//             {/* Column 2: Services */}
//             <div>
//               <h3 className="font-semibold mb-2">Services:</h3>
//               <ul className="space-y-2">
//                 {vendor.services.map((service) => (
//                   <li key={service.uuid}>
//                     <strong>{service.item_name}</strong> ({service.service_category}) - ₹{service.item_price}
//                     <p className="text-sm text-gray-500">{service.item_description}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 3: Address */}
//             <div>
//               <h3 className="font-semibold mb-2">Addresses:</h3>
//               <ul className="space-y-2">
//                 {vendor.addresses.map((address) => (
//                   <li key={address.uuid}>
//                     <p className="flex items-start gap-1 text-gray-700">
//                       <MdLocationOn className="text-red-500 mt-1" />
//                       <span>
//                         {address.house_no_building_name}, {address.road_name_area_colony},<br />
//                         {address.city}, {address.state} - {address.pincode}
//                       </span>
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default FavoritesList;

// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MdLocationOn } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";

// const FavoritesList = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await fetch(
//           "https://api.upswap.app/api/favorite-vendors/lists/",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           toast.error(data.message || "Failed to fetch favorites");
//         } else {
//           setFavorites(data?.vendors || []);
//         }
//       } catch (error) {
//         toast.error("Error fetching favorites");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   const handleUnfavorite = async (vendorId) => {
//     try {
//       const response = await fetch(
//         `https://api.upswap.app/api/vendors/${vendorId}/favorite/`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         toast.error("Failed to remove from favorites");
//         return;
//       }

//       setFavorites((prev) => prev.filter((vendor) => vendor.id !== vendorId));
//       toast.success("Removed from favorites");
//     } catch (error) {
//       toast.error("Error unfavoriting vendor");
//       console.error(error);
//     }
//   };

//   if (loading) return <p className="p-6 text-center">Loading favorites...</p>;

//   return (
//     <div className="p-6">
//       <ToastContainer />
//       {favorites.length === 0 ? (
//         <p>No favorite vendors found.</p>
//       ) : (
//         favorites.map((vendor, index) => (
//           <div
//             key={index}
//             className="relative grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded shadow-md mb-6"
//           >
//             {/* ❌ Cross Icon Button */}
//             <button
//               onClick={() => handleUnfavorite(vendor.id)}
//               className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//               title="Remove from favorites"
//             >
//               <RxCross2 size={20} />
//             </button>

//             {/* Column 1: Profile & Contact */}
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={vendor.profile_pic || "https://via.placeholder.com/100"}
//                 alt={vendor.full_name}
//                 className="w-24 h-24 rounded-full object-cover mb-3"
//               />
//               <h2 className="text-xl font-semibold">{vendor.full_name}</h2>
//               <div className="text-sm text-gray-600 mt-2">
//                 <p><span className="font-semibold">Email:</span> {vendor.business_email_id}</p>
//                 <p><span className="font-semibold">Phone:</span> {vendor.phone_number}</p>
//               </div>
//             </div>

//             {/* Column 2: Services */}
//             <div>
//               <h3 className="font-semibold mb-2">Services:</h3>
//               <ul className="space-y-2">
//                 {vendor.services.map((service) => (
//                   <li key={service.uuid}>
//                     <strong>{service.item_name}</strong> ({service.service_category}) - ₹{service.item_price}
//                     <p className="text-sm text-gray-500">{service.item_description}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 3: Address */}
//             <div>
//               <h3 className="font-semibold mb-2">Addresses:</h3>
//               <ul className="space-y-2">
//                 {vendor.addresses.map((address) => (
//                   <li key={address.uuid}>
//                     <p className="flex items-start gap-1 text-gray-700">
//                       <MdLocationOn className="text-red-500 mt-1" />
//                       <span>
//                         {address.house_no_building_name}, {address.road_name_area_colony},<br />
//                         {address.city}, {address.state} - {address.pincode}
//                       </span>
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default FavoritesList;

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdLocationOn } from "react-icons/md";
import Unfavorite from "./Unfavorite"; // 👈 import karo
import { useNavigate } from "react-router-dom";
import { FaHeart, FaBars } from "react-icons/fa";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          "https://api.upswap.app/api/favorite-vendors/lists/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Failed to fetch favorites");
        } else {
          setFavorites(data?.vendors || []);
        }
      } catch (error) {
        toast.error("Error fetching favorites");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Vendor remove karne ke baad local state update
  const removeVendorFromList = (vendorId) => {
    setFavorites((prev) => prev.filter((vendor) => vendor.id !== vendorId));
  };

  if (loading) return <p className="p-6 text-center">Loading favorites...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between bg-gradient-to-r border-2 bg-[#FE7A3A] text-white p-4 rounded-lg">
        <button className="text-xl" onClick={() => navigate("/UpswapVendors")}>
          &#8592;
        </button>
        <h1 className="text-lg font-semibold">Favorite Vendors</h1>
        <div className="flex gap-4">
          {/* <FaHeart className="text-xl" /> */}
          {/* <FaHeart */}
          <FaHeart
            className="text-xl cursor-pointer text-red-500"
            onClick={() => navigate("/Favorite")}
          />

          <FaBars className="text-xl" />
        </div>
      </div>
      <ToastContainer />
      {favorites.length === 0 ? (
        // <p>No favorite vendors found.</p>
        <div className="flex flex-col items-center justify-center h-96">
          <button
            onClick={() => navigate("/Favorite")}
            className="flex items-center gap-2 px-4 mt-2 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]"
          >
            <span data-an>No favorite vendors found</span>
          </button>
        </div>
      ) : (
        favorites.map((vendor, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded shadow-md mb-6"
          >
            {/* UnfavoriteButton component use kiya */}
            <Unfavorite
              vendorId={vendor.vendor_id}
              onUnfavorite={removeVendorFromList}
            />

            {/* Vendor Info */}
            <div className="flex flex-col items-center text-center">
              <img
                src={vendor.profile_pic || "https://via.placeholder.com/100"}
                alt={vendor.full_name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h2 className="text-xl font-semibold">{vendor.full_name}</h2>
              <div className="text-sm text-gray-600 mt-2">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {vendor.business_email_id}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {vendor.phone_number}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Services:</h3>
              <ul className="space-y-2">
                {vendor.services.map((service) => (
                  <li key={service.uuid}>
                    <strong>{service.item_name}</strong> (
                    {service.service_category}) - ₹{service.item_price}
                    <p className="text-sm text-gray-500">
                      {service.item_description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Addresses:</h3>
              <ul className="space-y-2">
                {vendor.addresses.map((address) => (
                  <li key={address.uuid}>
                    <p className="flex items-start gap-1 text-gray-700">
                      <MdLocationOn className="text-red-500 mt-1" />
                      <span>
                        {address.house_no_building_name},{" "}
                        {address.road_name_area_colony},<br />
                        {address.city}, {address.state} - {address.pincode}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
