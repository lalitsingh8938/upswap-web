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
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PersonalAccount() {
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchUserData(userId);
    }
  }, []); // Empty dependency array ensures this runs only once after initial render

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `https://api.upswap.app/api/customuser/details/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      // console.log("User data fetched:", response.data); // Log the fetched data
      if (response.data) {
        setName(response.data.name || "User Name"); // Set name, default to "User Name" if not available
        setProfilePic(response.data.profile_pic || "/default-avatar.png"); // Set profile picture, default if not available
      } else {
        console.error("User data not found in the API response");
        setError("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data.");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="bg-[#FE7A3A] h-screen p-4 rounded-lg border-2">
      <div className="flex items-center text-white text-lg font-semibold pb-4">
        <button className="mr-4" onClick={() => navigate("/DealsPage")}>
          &#x276E;
        </button>
        My Personal Account
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 relative">
            <img
              src={profilePic || "/default-avatar.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full border border-gray-300 object-cover"
            />

            {/* File Input */}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div>
              <p className="font-bold text-black">{name}</p>{" "}
              {/* Display the fetched name */}
              <p className="text-orange-500 text-sm font-semibold">
                0.0/5 ⭐⭐⭐⭐⭐
              </p>
            </div>

            {/* Pencil Icon Button */}
            {/* <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-300"
            >
              <Pencil size={12} className="text-gray-500" />
            </button> */}
          </div>
          {/* Edit Profile Button */}
          <button
            className="text-gray-500 flex items-center gap-1"
            onClick={() => navigate("/UserProfile")}
            // onClick={triggerFileInput}
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
    </div>
  );
}
