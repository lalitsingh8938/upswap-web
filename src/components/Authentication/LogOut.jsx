// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { CgLogOff } from "react-icons/cg";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const LogOut = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const accessToken = localStorage.getItem("access");
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (!refreshToken) {
//         toast.error("Refresh token missing. Logging out...");
//         // localStorage.clear();
//         navigate("/login");
//         return;
//       }

//       const response = await fetch("https://api.upswap.app/api/logout/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ refresh_token: refreshToken }),
//       });

//       if (response.ok) {
//         toast.success("Logout successfully!");
//       } else {
//         const errorData = await response.json();
//         toast.error(`Logout failed: ${errorData.message || "Unknown error"}`);
//       }

//       localStorage.clear();
//       navigate("/login");
//     } catch (error) {
//       toast.error("Error during logout. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="flex items-center cursor-pointer w-full p-1 h-10 mt-3"
//       onClick={handleLogout}
//     >
//       <CgLogOff className="h-5 w-5 ml-1 text-red-600" />
//       <p className="text-black text-sm ml-3">Logout</p>
//     </div>
//   );
// };

// export default LogOut;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CgLogOff } from "react-icons/cg";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment } from "react";

// const LogOut = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       const accessToken = localStorage.getItem("access");
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (!refreshToken) {
//         toast.error("Refresh token missing. Logging out...");
//         localStorage.clear();
//         navigate("/login");
//         return;
//       }

//       const response = await fetch("https://api.upswap.app/api/logout/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ refresh_token: refreshToken }),
//       });

//       if (response.ok) {
//         toast.success("Logout successfully!");
//       } else {
//         const errorData = await response.json();
//         toast.error(`Logout failed: ${errorData.message || "Unknown error"}`);
//       }

//       localStorage.clear();
//       navigate("/login");
//     } catch (error) {
//       toast.error("Error during logout. Please try again.");
//     }
//   };

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   return (
//     <>
//       <div
//         className="flex items-center cursor-pointer w-full p-1 h-10 mt-3"
//         onClick={openModal}
//       >
//         <CgLogOff className="h-5 w-5 ml-1 text-red-600" />
//         <p className="text-red-500 text-sm hover:bg-red-100 px-2 py-2 rounded-lg">
//           Logout
//         </p>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Confirm Logout
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       Are you sure you want to logout?
//                     </p>
//                   </div>

//                   <div className="mt-4 flex justify-end space-x-3">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
//                       onClick={closeModal}
//                     >
//                       No, Cancel
//                     </button>
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
//                       onClick={() => {
//                         handleLogout();
//                         closeModal();
//                       }}
//                     >
//                       Yes, Logout
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default LogOut;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const LogOut = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        toast.error("Refresh token missing. Logging out...");
        // If no refresh token, we can't make API call. Clear local storage and navigate.
        localStorage.clear(); // Safely clear all user-related data
        navigate("/login");
        return;
      }

      // Make API call to invalidate the refresh token on the server
      const response = await fetch("https://api.upswap.app/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Send access token if required by backend for logout
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        toast.success("Logout successfully!");
      } else {
        const errorData = await response.json();
        console.error("Logout API error:", errorData); // Log error for debugging
        toast.error(`Logout failed: ${errorData.detail || errorData.message || "Unknown error"}`);
        // Even if API fails, for security, we should clear local storage client-side.
        // However, a failed API call might mean the server session is still active.
        // You might want to handle this more gracefully, e.g., prompt user to retry.
      }

      // Always clear client-side storage after attempting logout API call
      // This ensures the user is logged out on the client even if server interaction fails for some reason.
      localStorage.clear(); // Clear all items
      // Alternatively, if you only want to remove specific items:
      // localStorage.removeItem("access");
      // localStorage.removeItem("refresh_token");
      // localStorage.removeItem("user_id");
      // localStorage.removeItem("vendor_id"); // If you store vendor_id
      // localStorage.removeItem("vendorData"); // If you store vendorData
      // localStorage.removeItem("profile_image_url"); // If you store profile_image_url

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error); // Log network or unexpected errors
      toast.error("Error during logout. Please try again.");
      // In case of a network error, still try to clear client-side storage
      localStorage.clear();
      navigate("/login");
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="flex items-center cursor-pointer w-full p-1 h-10 mt-3"
        onClick={openModal}
      >
        <CgLogOff className="h-5 w-5 ml-1 text-red-600" />
        <p className="text-red-500 text-sm hover:bg-red-100 px-2 py-2 rounded-lg">
          Logout
        </p>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Logout
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to logout?
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      No, Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleLogout();
                        closeModal(); // Close modal after initiating logout
                      }}
                    >
                      Yes, Logout
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LogOut;