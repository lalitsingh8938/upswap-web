import React, { useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostDeal = () => {
  const [dealTitle, setDealTitle] = useState("");
  const [dealDescription, setDealDescription] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("images", file);
    formData.append("model_name", "CreateDeal");

    try {
      const response = await axios.post(
        "https://api.upswap.app/api/UploadImagesAPI/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      const data = response.data;

      if (
        response.status === 201 &&
        data?.data?.[0]?.thumbnail &&
        data?.data?.[0]?.compressed
      ) {
        toast.success("Image uploaded successfully!");
        return {
          thumbnail: data.data[0].thumbnail,
          compressed: data.data[0].compressed,
        };
      } else {
        toast.error("Image upload failed.");
        return null;
      }
    } catch (err) {
      toast.error("Something went wrong while uploading.");
      return null;
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];
    const previewArray = [];

    setIsUploading(true);

    for (const file of files) {
      const urls = await uploadImage(file);
      if (urls) {
        uploadedUrls.push(urls);
        previewArray.push(URL.createObjectURL(file));
      }
    }

    const updatedUrls = [...imageUrls, ...uploadedUrls];
    const updatedPreviews = [...imagePreviews, ...previewArray];

    setImageUrls(updatedUrls);
    setImagePreviews(updatedPreviews);

    localStorage.setItem("uploaded_deal_images", JSON.stringify(updatedUrls));

    setIsUploading(false);
  };

  const removePhoto = (index) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageUrls(updatedUrls);
    setImagePreviews(updatedPreviews);

    localStorage.setItem("uploaded_deal_images", JSON.stringify(updatedUrls));
  };

  const handleNext = () => {
    if (!dealTitle.trim()) {
      toast.error("Please enter a deal title.");
      return;
    }
    if (!selectedService.trim()) {
      toast.error("Please enter a deal Services.");
      return;
    }

    if (!dealDescription.trim()) {
      toast.error("Please enter a deal description.");
      return;
    }

    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image before proceeding.");
      return;
    }

    localStorage.setItem("deal_title", dealTitle);
    localStorage.setItem("deal_description", dealDescription);
    localStorage.setItem("deal_service", selectedService);

    navigate("/PostDealNext");
  };

  const handleClose = () => {
    navigate("/Deals", { replace: true });
  };

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-[#FE7A3A] p-6 border-2 rounded-lg">
    <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto flex flex-col items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="relative bg-gradient-to-b from-orange-100 to-white rounded-xl p-6 shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
          Post a Deal
        </h2>

        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#FE7A3A]"
          type="button"
        >
          <FaTimes size={18} />
        </button>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Deal title
          </label>
          <input
            type="text"
            value={dealTitle}
            onChange={(e) => setDealTitle(e.target.value)}
            placeholder="Deal title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <select
          name="service_category"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full border p-2 rounded-lg mb-4 bg-white"
        >
          <option value="">Choose Item Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Consultants">Consultants</option>
          <option value="Estate Agents">Estate Agents</option>
          <option value="Rent & Hire">Rent & Hire</option>
          <option value="Dentist">Dentist</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Food">Food</option>
          <option value="Bakery">Bakery</option>
          <option value="Groceries">Groceries</option>
          <option value="Others">Others</option>
        </select>

        {/* Deal Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Deal description
          </label>
          <textarea
            value={dealDescription}
            onChange={(e) => setDealDescription(e.target.value)}
            placeholder="Enter description"
            rows="4"
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Upload Image */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#FE7A3A] p-4 rounded-lg cursor-pointer">
          <FaUpload className="text-[#FE7A3A] text-2xl" />
          <span className="text-[#FE7A3A] mt-2 text-sm">
            {isUploading ? "Uploading..." : "Upload Deal Images"}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>

        {imagePreviews.length > 0 && (
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-3 gap-8">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 flex justify-center items-center"
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-0 right-0 bg-white p-1 rounded-full shadow text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <button
          className="mt-6 w-full bg-[#FE7A3A] text-white py-2 rounded-lg"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostDeal;

// import React, { useState, useEffect } from "react";
// import { FaTimes, FaUpload } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PostDeal = () => {
//   const [dealTitle, setDealTitle] = useState("");
//   const [dealDescription, setDealDescription] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [imageUrls, setImageUrls] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [kycStatus, setKycStatus] = useState(null); // State to store KYC status
//   const [isLoadingKyc, setIsLoadingKyc] = useState(true); // State for loading KYC status
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkKycStatus = async () => {
//       setIsLoadingKyc(true);
//       const vendorId = localStorage.getItem("vendor_id"); // Corrected to vendor_id
//       const accessToken = localStorage.getItem("access");
//       console.log("Fetching KYC status...");
//       console.log("Vendor ID from localStorage:", vendorId);
//       console.log("Access Token from localStorage:", accessToken ? "Present" : "Missing");

//       if (!vendorId || !accessToken) {
//         toast.error("Authentication details missing. Please log in again.");
//         setKycStatus("unauthenticated"); // Set a distinct status for missing credentials
//         setIsLoadingKyc(false);
//         // Optional: Redirect to login page if credentials are missing
//         // navigate("/login");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/status/${vendorId}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         console.log("KYC API Full Response:", response);
//         console.log("KYC API Response Data:", response.data);

//         if (response.status === 200 && response.data) {
//           // *** CRITICAL STEP: Normalize the status string for reliable comparison ***
//           // Ensure your API actually returns a 'status' field directly in response.data
//           const fetchedStatus = response.data.status;
//           const normalizedStatus = fetchedStatus
//             ? String(fetchedStatus).toLowerCase().trim()
//             : null;

//           console.log("Raw Fetched KYC Status:", fetchedStatus);
//           console.log("Normalized KYC Status (for comparison):", normalizedStatus);

//           setKycStatus(normalizedStatus);
//         } else {
//           console.error("KYC Check Error: API responded with non-200 status or empty data.", response);
//           toast.error("Failed to fetch KYC status. Please try again.");
//           setKycStatus("error"); // Indicate an error state
//         }
//       } catch (error) {
//         console.error("KYC Check Network/API Call Error:", error);
//         if (error.response) {
//             console.error("Error Response Data:", error.response.data);
//             console.error("Error Response Status:", error.response.status);
//             toast.error(`Error ${error.response.status}: Failed to get KYC status. Check vendor ID or token.`);
//         } else if (error.request) {
//             console.error("Error Request:", error.request);
//             toast.error("No response received from KYC server. Check your internet connection.");
//         } else {
//             toast.error("An unknown error occurred while fetching KYC status.");
//         }
//         setKycStatus("error"); // Indicate an error state
//       } finally {
//         setIsLoadingKyc(false);
//       }
//     };

//     checkKycStatus();
//   }, []); // Empty dependency array means this runs once on mount

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("images", file);
//     formData.append("model_name", "CreateDeal");

//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadImagesAPI/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       const data = response.data;

//       if (
//         response.status === 201 &&
//         data?.data?.[0]?.thumbnail &&
//         data?.data?.[0]?.compressed
//       ) {
//         toast.success("Image uploaded successfully!");
//         return {
//           thumbnail: data.data[0].thumbnail,
//           compressed: data.data[0].compressed,
//         };
//       } else {
//         toast.error("Image upload failed.");
//         return null;
//       }
//     } catch (err) {
//       console.error("Image upload error:", err);
//       toast.error("Something went wrong while uploading the image.");
//       return null;
//     }
//   };

//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedUrls = [];
//     const previewArray = [];

//     setIsUploading(true);

//     for (const file of files) {
//       const urls = await uploadImage(file);
//       if (urls) {
//         uploadedUrls.push(urls);
//         previewArray.push(URL.createObjectURL(file));
//       }
//     }

//     const updatedUrls = [...imageUrls, ...uploadedUrls];
//     const updatedPreviews = [...imagePreviews, ...previewArray];

//     setImageUrls(updatedUrls);
//     setImagePreviews(updatedPreviews);

//     localStorage.setItem("uploaded_deal_images", JSON.stringify(updatedUrls));

//     setIsUploading(false);
//   };

//   const removePhoto = (index) => {
//     const updatedUrls = imageUrls.filter((_, i) => i !== index);
//     const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

//     setImageUrls(updatedUrls);
//     setImagePreviews(updatedPreviews);

//     localStorage.setItem("uploaded_deal_images", JSON.stringify(updatedUrls));
//   };

//   const handleNext = () => {
//     // Crucial check: Prevent proceeding if KYC is not approved
//     if (kycStatus !== "approved") {
//       toast.error(`Your KYC status is '${kycStatus || 'unknown'}'. It must be 'approved' to post a deal.`);
//       return;
//     }

//     if (!dealTitle.trim()) {
//       toast.error("Please enter a deal title.");
//       return;
//     }
//     if (!selectedService.trim()) {
//       toast.error("Please select a deal service category.");
//       return;
//     }

//     if (!dealDescription.trim()) {
//       toast.error("Please enter a deal description.");
//       return;
//     }

//     if (imageUrls.length === 0) {
//       toast.error("Please upload at least one image before proceeding.");
//       return;
//     }

//     localStorage.setItem("deal_title", dealTitle);
//     localStorage.setItem("deal_description", dealDescription);
//     localStorage.setItem("deal_service", selectedService);

//     navigate("/PostDealNext");
//   };

//   const handleClose = () => {
//     navigate("/DealsPage", { replace: true });
//   };

//   // Display loading state while KYC status is being fetched
//   if (isLoadingKyc) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FE7A3A] p-6">
//         <p className="text-white text-lg font-bold">Loading KYC status...</p>
//       </div>
//     );
//   }

//   // If KYC is not approved, display a message and a button to complete KYC
//   if (kycStatus !== "Approved") {
//     const displayStatus = kycStatus === "pending"
//       ? "pending approval"
//       : kycStatus === "rejected"
//       ? "rejected"
//       : kycStatus === "unauthenticated"
//       ? "missing credentials"
//       : "not completed or encountered an error";

//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#FE7A3A] p-6 border-2 rounded-lg">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <div className="relative bg-gradient-to-b from-orange-100 to-white rounded-xl p-6 shadow-md max-w-md w-full text-center">
//           <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
//             Post a Deal
//           </h2>
//           <button
//             onClick={handleClose}
//             className="absolute top-2 right-2 text-gray-500 hover:text-[#FE7A3A]"
//             type="button"
//           >
//             <FaTimes size={20} />
//           </button>
//           <p className="text-red-600 font-bold mb-4">
//             Your KYC is currently **{displayStatus}**. You cannot post a deal until your KYC is verified and approved.
//           </p>
//           <button
//             className="mt-4 w-full bg-[#FE7A3A] text-white py-2 rounded-lg"
//             onClick={() => navigate("/Basicinfo")} // Ensure this path is correct for your KYC upload/completion page
//           >
//             Complete KYC
//           </button>
//           <button
//             className="mt-2 w-full bg-gray-400 text-white py-2 rounded-lg"
//             onClick={handleClose}
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Render the deal posting form if KYC is approved
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#FE7A3A] p-6 border-2 rounded-lg">
//       <ToastContainer position="top-center" autoClose={3000} />

//       <div className="relative bg-gradient-to-b from-orange-100 to-white rounded-xl p-6 shadow-md max-w-md w-full">
//         <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg mb-4">
//           Post a Deal
//         </h2>

//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-[#FE7A3A]"
//           type="button"
//         >
//           <FaTimes size={20} />
//         </button>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Deal title
//           </label>
//           <input
//             type="text"
//             value={dealTitle}
//             onChange={(e) => setDealTitle(e.target.value)}
//             placeholder="Deal title"
//             className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//           />
//         </div>

//         <select
//           name="service_category"
//           value={selectedService}
//           onChange={(e) => setSelectedService(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-4 bg-white"
//         >
//           <option value="">Choose Item Category</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Clothing">Clothing</option>
//           <option value="Furniture">Furniture</option>
//           <option value="Restaurants">Restaurants</option>
//           <option value="Consultants">Consultants</option>
//           <option value="Estate Agents">Estate Agents</option>
//           <option value="Rent & Hire">Rent & Hire</option>
//           <option value="Dentist">Dentist</option>
//           <option value="Personal Care">Personal Care</option>
//           <option value="Food">Food</option>
//           <option value="Bakery">Bakery</option>
//           <option value="Groceries">Groceries</option>
//           <option value="Others">Others</option>
//         </select>

//         {/* Deal Description */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">
//             Deal description
//           </label>
//           <textarea
//             value={dealDescription}
//             onChange={(e) => setDealDescription(e.target.value)}
//             placeholder="Enter description"
//             rows="4"
//             className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
//           ></textarea>
//         </div>

//         {/* Upload Image */}
//         <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#FE7A3A] p-4 rounded-lg cursor-pointer">
//           <FaUpload className="text-[#FE7A3A] text-2xl" />
//           <span className="text-[#FE7A3A] mt-2 text-sm">
//             {isUploading ? "Uploading..." : "Upload Deal Images"}
//           </span>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             hidden
//             onChange={handleFileChange}
//             disabled={isUploading}
//           />
//         </label>

//         {imagePreviews.length > 0 && (
//           <div className="flex justify-center mt-4">
//             <div className="grid grid-cols-3 gap-8">
//               {imagePreviews.map((preview, index) => (
//                 <div
//                   key={index}
//                   className="relative w-24 h-24 flex justify-center items-center"
//                 >
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   <button
//                     onClick={() => removePhoto(index)}
//                     className="absolute top-0 right-0 bg-white p-1 rounded-full shadow text-red-500"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Footer Buttons */}
//         <button
//           className="mt-6 w-full bg-[#FE7A3A] text-white py-2 rounded-lg"
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostDeal;
