// // src/components/UnfavoriteButton.jsx
// import { RxCross2 } from "react-icons/rx";
// import { toast } from "react-toastify";

// const UnfavoriteButton = ({ vendorId, onUnfavorite }) => {
//         // const vendorId = vendor.vendor_id;
//     const userId = localStorage.getItem("vendor_id");
//   const handleUnfavorite = async () => {
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

//       toast.success("Removed from favorites");
//       onUnfavorite(vendorId); // Parent ko notify karo
//     } catch (error) {
//       toast.error("Error unfavoriting vendor");
//       console.error(error);
//     }
//   };

//   return (
//     <button
//       onClick={handleUnfavorite}
//       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//       title="Remove from favorites"
//     >
//       <RxCross2 size={20} />
//     </button>
//   );
// };

// export default UnfavoriteButton;
// src/components/UnfavoriteButton.jsx

// src/components/UnfavoriteButton.jsx
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const UnfavoriteButton = ({ vendorId, onUnfavorite }) => {
  const handleUnfavorite = async () => {
    const storedVendorId = localStorage.getItem("vendor_id");

    // Fallback: use prop if local doesn't exist
    const VendorId = storedVendorId || vendorId;

    try {
      const response = await fetch(
        `https://api.upswap.app/api/vendors/${VendorId}/favorite/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Failed to remove from favorites");
        return;
      }

      toast.success("Removed from favorites");
      onUnfavorite(VendorId); // update parent
    } catch (error) {
      toast.error("Error unfavoriting vendor");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleUnfavorite}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      title="Remove from favorites"
    >
      <RxCross2 size={20} />
    </button>
  );
};

export default UnfavoriteButton;
