// import { Pencil } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PersonalAccount() {
//   const [profilePic, setProfilePic] = useState("bhagwan.jpg");
//   const navigate = useNavigate();

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfilePic(imageUrl);
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById("fileInput").click();
//   };

//   return (
//     <div className="bg-[#FE7A3A] h-screen p-4 rounded-lg border-2">
//       <div className="flex items-center text-white text-lg font-semibold pb-4">
//         <button
//           className="mr-4"
//           onClick={() => navigate("/DealsPage")}
//         >
//           &#x276E;
//         </button>
//         My Personal Account
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3 relative">
//             <img
//               src={profilePic}
//               alt="Profile"
//               className="w-12 h-12 rounded-full border border-gray-300"
//             />

//             {/* File Input */}
//             <input
//               type="file"
//               id="fileInput"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />

//             <div>
//               <p className="font-bold text-black">FOOD HUB</p>
//               <p className="text-orange-500 text-sm font-semibold">
//                 0.0/5 ⭐⭐⭐⭐⭐
//               </p>
//             </div>

//             {/* Pencil Icon Button */}
//             {/* <button
//               onClick={triggerFileInput}
//               className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-300"
//             >
//               <Pencil size={12} className="text-gray-500" />
//             </button> */}
//           </div>
//           {/* Edit Profile Button */}
//           <button
//             className="text-gray-500 flex items-center gap-1"
//             onClick={() => navigate("/UserProfile")}
//             // onClick={triggerFileInput}
//           >
//             <Pencil size={16} /> Edit Profile
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4 mt-4 flex items-center gap-3">
//         <span className="text-[#FE7A3A] text-xl">🛒</span>
//         <div>
//           <p className="text-[#FE7A3A] font-semibold">My Orders</p>
//           <p className="text-gray-500 text-sm">See your last order details</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { Pencil } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function PersonalAccount() {
//   const [profilePic, setProfilePic] = useState("");
//   const [name, setName] = useState("");
//   // const [error, setError] = useState(null); // Commented out, so ESLint won't warn about this either if unused
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem("user_id");
//     if (userId) {
//       fetchUserData(userId);
//     }
//   }, []); // Empty dependency array ensures this runs only once after initial render

//   const fetchUserData = async (userId) => {
//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/customuser/details/${userId}/`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       // console.log("User data fetched:", response.data); // Log the fetched data
//       if (response.data) {
//         setName(response.data.name || "User Name"); // Set name, default to "User Name" if not available
//         setProfilePic(response.data.profile_pic || "/default-avatar.png"); // Set profile picture, default if not available
//       } else {
//         console.error("User data not found in the API response");
//         // setError("Failed to fetch user data.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       // setError("Failed to fetch user data.");
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfilePic(imageUrl);
//     }
//   };

//   // -------------------------------------------------------------------
//   // SUGGESTION: Removed 'triggerFileInput' as it was not being used.
//   // The 'Edit Profile' button navigates to '/UserProfile', suggesting
//   // that profile picture updates are handled on that separate page.
//   // If you later decide to allow direct profile picture changes from this page,
//   // you can re-add this function and the corresponding button.
//   // -------------------------------------------------------------------
//   // const triggerFileInput = () => {
//   //   document.getElementById("fileInput").click();
//   // };

//   return (
//     <div className="bg-[#FE7A3A] h-screen p-4 rounded-lg border-2">
//       <div className="flex items-center text-white text-lg font-semibold pb-4">
//         <button className="mr-4" onClick={() => navigate("/DealsPage")}>
//           &#x276E;
//         </button>
//         My Personal Account
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3 relative">
//             <img
//               src={profilePic || "/default-avatar.png"}
//               alt="Profile avatar" // Improved alt text for accessibility
//               className="w-12 h-12 rounded-full border border-gray-300 object-cover"
//             />

//             {/* File Input - This input is still here if needed by handleImageChange, 
//                         but it won't be triggered by the removed 'triggerFileInput' function */}
//             <input
//               type="file"
//               id="fileInput"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />

//             <div>
//               <p className="font-bold text-black">{name}</p>{" "}
//               {/* Display the fetched name */}
//               <p className="text-orange-500 text-sm font-semibold">
//                 0.0/5 ⭐⭐⭐⭐⭐
//               </p>
//             </div>

//             {/* Pencil Icon Button - This was previously commented out.
//                         It's kept commented as 'triggerFileInput' is removed. */}
//             {/* <button
//               onClick={triggerFileInput}
//               className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-300"
//             >
//               <Pencil size={12} className="text-gray-500" />
//             </button> */}
//           </div>
//           {/* Edit Profile Button - This correctly navigates to UserProfile */}
//           <button
//             className="text-gray-500 flex items-center gap-1"
//             onClick={() => navigate("/UserProfile")}
//           >
//             <Pencil size={16} /> Edit Profile
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4 mt-4 flex items-center gap-3">
//         <span className="text-[#FE7A3A] text-xl">🛒</span>
//         <div>
//           <p className="text-[#FE7A3A] font-semibold">My Orders</p>
//           <p className="text-gray-500 text-sm">See your last order details</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Pencil } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import LogOut from "./Authentication/LogOut";

export default function PersonalAccount() {
  const [profilePic, setProfilePic] = useState("/default-avatar.png");
  const [name, setName] = useState("Guest User");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Function to fetch user data with error handling and loading state
  const fetchUserData = useCallback(async (userId) => {
    setIsLoading(true); // Data fetching start hote hi loading true karein
    setError(null); // Clear previous errors
    try {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        toast.error("Please log in to view your profile.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `https://api.upswap.app/api/customuser/details/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setName(response.data.name || "User Name");
        setProfilePic(response.data.profile_pic || "/default-avatar.png");
      } else {
        console.warn("User data not found in API response for user ID:", userId);
        setError("User profile data incomplete.");
        toast.warn("Could not load complete profile data.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          toast.error("Session expired or unauthorized. Please log in again.");
          localStorage.removeItem("access");
          localStorage.removeItem("user_id");
          navigate("/login");
        } else if (err.response.status === 404) {
          toast.error("Profile not found.");
          setError("Profile not found.");
        } else {
          toast.error(err.response.data.message || "Failed to fetch profile.");
          setError(err.response.data.message || "Failed to fetch profile.");
        }
      } else if (err.request) {
        toast.error("Network error. Please check your internet connection.");
        setError("Network error. Could not connect to the server.");
      } else {
        toast.error("An unexpected error occurred.");
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false); // Data fetching complete hone par loading false karein
    }
  }, [navigate]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchUserData(userId);
    } else {
      toast.info("No user ID found. Please log in.");
      navigate("/login");
    }
  }, [fetchUserData, navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPEG, PNG, or GIF images are allowed.");
        return;
      }
      if (file.size > maxSize) {
        toast.error("Image size should not exceed 2MB.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
      // Logic for uploading image to server can be added here if needed for direct update
    }
  };

  // --- Loading Spinner and Error Display ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white-300 border-white"></div>
          <p className="text-white text-lg mt-4">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white flex flex-col items-center justify-center text-white text-xl p-4">
        <p className="text-red-300">Error: {error}</p>
        <button
          onClick={() => {
            const userId = localStorage.getItem("user_id");
            if (userId) {
              fetchUserData(userId); // Retry fetching data
            } else {
              navigate("/"); // Go to login if no user ID
            }
          }}
          className="mt-4 px-4 py-2 bg-white text-[#FE7A3A] rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }
  // --- End Loading Spinner and Error Display ---

  return (
    // <div className="bg-[#FE7A3A] h-screen p-4 rounded-lg border-2">
    <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl rounded-md mx-auto bg-gradient-to-b from-orange-400 to-white">
      <div className="flex items-center text-white text-lg font-semibold pb-4">
        <button className="mr-4" onClick={() => navigate("/Home")}>
          &#x276E;
        </button>
        My Personal Account
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 relative">
            <img
              src={profilePic}
              alt={`${name}'s profile avatar`}
              className="w-12 h-12 rounded-full border border-gray-300 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />

            <input
              type="file"
              id="fileInput"
              accept="image/jpeg, image/png, image/gif"
              className="hidden"
              onChange={handleImageChange}
            />

            <div>
              <p className="font-bold text-black">{name}</p>
              <p className="text-orange-500 text-sm font-semibold">
                0.0/5 ⭐⭐⭐⭐⭐
              </p>
            </div>
          </div>
          <button
            className="text-gray-500 flex items-center gap-1"
            onClick={() => navigate("/UserProfile")}
          >
            <Pencil size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 mt-4 flex items-center gap-3">
        <span className="text-[#FE7A3A] text-xl">🛒</span>
        <div>
          <p className="text-[#FE7A3A] font-semibold">My Orders</p>
          <p className="text-gray-500 text-sm">See your last order details</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 mt-4 flex items-center gap-3 cursor-pointer"
           onClick={() => {
            localStorage.clear();
            //  localStorage.removeItem("access");
            //  localStorage.removeItem("user_id");
             toast.info("Logged out successfully!");
             navigate("/login");
           }}>
        <span className="text-red-500 text-xl">➡️</span>
         {/* <LogOut /> */}
        <div>
          <p className="text-red-500 font-semibold">Logout</p>
          <p className="text-gray-500 text-sm">Sign out from your account</p>
        </div>
      </div>
    </div>
  );
}

