// import React, { useState,useEffect } from "react";
// import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const VendorDocument = () => {
//   const navigate = useNavigate();

//   const [businessDocs, setBusinessDocs] = useState([]);
//   const [businessPhotos, setBusinessPhotos] = useState([]);

//   useEffect(() => {
//     const fetchVendorData = async () => {
//       const vendorId = localStorage.getItem("vendor_id");
//       if (!vendorId) return;

//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const vendorData = response.data;

//         // ✅ Directly set uploaded documents (from the response)
//         if (vendorData.uploaded_business_documents?.length > 0) {
//           setBusinessDocs(vendorData.uploaded_business_documents);
//         }

//         // ✅ Directly set uploaded images (compressed URLs from the response)
//         if (vendorData.uploaded_images?.length > 0) {
//           const photos = vendorData.uploaded_images.map((img) => img.compressed);
//           setBusinessPhotos(photos);
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor document data:", error);
//       }
//     };

//     fetchVendorData();
//   }, []);

//   // Upload Document
//   const uploadDocument = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadDocumentsAPI/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );
//       const fileUrl = response.data; // ?.[0]

//       localStorage.setItem(
//         "uploaded_business_documents1",
//         JSON.stringify(fileUrl)
//       );
//       toast.success("Document uploaded successfully!");
//       console.log("Uploaded Document URL:", fileUrl);
//       return fileUrl;
//     } catch (error) {
//       toast.error("Failed to upload document");
//       return null;
//     }
//   };

//   // Upload Photo
//   const uploadPhoto = async (file) => {
//     const formData = new FormData();
//     formData.append("images", file);
//     formData.append("model_name", "RaiseAnIssueCustomUser");
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

//       const imageUrl = response.data?.data; // ✅ nested path .[0]?.compressed;
//       // console.log("Uploaded Photo URL:", imageUrl);

//       localStorage.setItem("uploaded_images1", JSON.stringify(imageUrl));
//       console.log("Uploaded Photo URL:", imageUrl);
//       toast.success("Photo uploaded successfully!");
//       return imageUrl;
//     } catch (error) {
//       // console.error("Photo upload failed:", error);
//       toast.error("Failed to upload photo");
//       return null;
//     }
//   };

//   // Handle Document Upload
//   const handleDocChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedDocs = await Promise.all(files.map(uploadDocument));
//     const newDocs = [...businessDocs, ...uploadedDocs.filter(Boolean)];
//     setBusinessDocs(newDocs);
//   };

//   const handlePhotoChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedPhotos = await Promise.all(files.map(uploadPhoto));
//     const newPhotos = [
//       ...businessPhotos,
//       ...uploadedPhotos
//         .flat()
//         .filter(Boolean)
//         .map((photo) => photo.compressed),
//     ];

//     setBusinessPhotos(newPhotos);
//   };

//   // Remove Document
//   const removeDocument = (index) => {
//     setBusinessDocs((prevDocs) => prevDocs.filter((_, i) => i !== index));
//   };

//   // Remove Photo
//   const removePhoto = (index) => {
//     setBusinessPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
//   };

//   const handleClose = () => {
//     navigate("/BasicInfo");
//   };

//   const handleNext = () => {
//     if (businessDocs.length === 0) {
//       toast.error("Please upload at least one document.");
//       return;
//     }

//     if (businessPhotos.length === 0) {
//       toast.error("Please upload at least one business photo.");
//       return;
//     }

//     const addressAdded = localStorage.getItem("address_added") === "true";
//     if (!addressAdded) {
//       toast.error("Please add your address before proceeding.");
//       return;
//     }

//     // All checks passed
//     navigate("/BankDetails");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen border-2 bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="relative bg-white rounded-xl w-full max-w-md">
//         <ToastContainer position="top-center" autoClose={3000} />

//         {/* Top-right Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-600 hover:text-[#FE7A3A]"
//         >
//           <FaTimes size={20} />
//         </button>

//         <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//           <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//             Become a Vendor
//           </h2>

//           {/* Document Upload */}
//           <h3 className="text-gray-700 mb-2 font-semibold">
//             Upload Business Documents (PDF, JPEG, PNG)
//           </h3>
//           <label className="flex flex-col items-center border-2 border-dashed border-[#FE7A3A] p-4 w-full rounded-lg cursor-pointer">
//             <FaUpload className="text-orange-500 text-2xl" />
//             <span className="text-orange-500 mt-2 text-sm">Upload</span>
//             <input
//               type="file"
//               accept="application/pdf,image/*"
//               multiple
//               onChange={handleDocChange}
//               hidden
//             />
//           </label>
//           {businessDocs.map((doc, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
//             >
//               <span className="text-gray-600">Document {index + 1}</span>
//               <button
//                 onClick={() => removeDocument(index)}
//                 className="text-[#FE7A3A]"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           ))}

//           {/* Photo Upload */}
//           <h3 className="text-gray-700 mb-2 font-semibold">
//             Upload Business Photos (JPEG, PNG)
//           </h3>
//           <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
//             <FaUpload className="text-[#FE7A3A] text-2xl" />
//             <span className="text-[#FE7A3A] mt-2 text-sm">Upload</span>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handlePhotoChange}
//               hidden
//             />
//           </label>

//           {/* Photo Preview */}
//           {businessPhotos.length > 0 && (
//             <div className="grid grid-cols-3 gap-2 mb-4 mt-4">
//               {businessPhotos.map((photo, index) => (
//                 <div
//                   key={index}
//                   className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
//                 >
//                   <img
//                     src={photo}
//                     alt="Uploaded"
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     onClick={() => removePhoto(index)}
//                     className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Add Address */}
//           <button
//             className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-2 rounded-lg mt-4"
//             onClick={() => navigate("/AddAddress")}
//           >
//             <FaPlus /> Add Address
//           </button>

//           {/* Footer Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//               onClick={() => {
//                 if (businessDocs.length === 0) {
//                   toast.warn(
//                     "Please upload at least one document before saving."
//                   );
//                   return;
//                 }

//                 if (businessPhotos.length === 0) {
//                   toast.warn(
//                     "Please upload at least one business photo before saving."
//                   );
//                   return;
//                 }

//                 toast.success("Data saved locally!");
//               }}
//             >
//               Save Data
//             </button>

//             <button
//               className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//               onClick={handleNext}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDocument;

// import { useState, useEffect } from "react";
// import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const VendorDocument = () => {
//   const navigate = useNavigate();

//   const [businessDocs, setBusinessDocs] = useState([]);
//   const [businessPhotos, setBusinessPhotos] = useState([]);

//   useEffect(() => {
//     const fetchVendorData = async () => {
//       const vendorId = localStorage.getItem("vendor_id");
//       if (!vendorId) return;

//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const vendorData = response.data;

//         // ✅ Directly set uploaded documents (from the response)
//         if (vendorData.uploaded_business_documents?.length > 0) {
//           setBusinessDocs(vendorData.uploaded_business_documents);
//         }

//         // ✅ Directly set uploaded images (compressed URLs from the response)
//         if (vendorData.uploaded_images?.length > 0) {
//           const photos = vendorData.uploaded_images.map(
//             (img) => img.compressed
//           );
//           setBusinessPhotos(photos);
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor document data:", error);
//       }
//     };

//     fetchVendorData();

//     // Load existing URLs from local storage on component mount
//     const storedDocs = localStorage.getItem("uploaded_business_documents1");
//     if (storedDocs) {
//       setBusinessDocs(JSON.parse(storedDocs));
//     }
//     const storedPhotos = localStorage.getItem("uploaded_images1");
//     if (storedPhotos) {
//       setBusinessPhotos(JSON.parse(storedPhotos));
//     }
//   }, []);

//   // Upload Document
//   const uploadDocument = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadDocumentsAPI/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );
//       const fileUrl = response.data; // ?.[0]
//       console.log("Uploaded Document URL:", fileUrl);
//       toast.success("Document uploaded successfully!");
//       return fileUrl;
//     } catch (error) {
//       toast.error("Failed to upload document");
//       return null;
//     }
//   };

//   // Upload Photo
//   const uploadPhoto = async (file) => {
//     const formData = new FormData();
//     formData.append("images", file);
//     formData.append("model_name", "RaiseAnIssueCustomUser");
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

//       const imageUrl = response.data?.data; // ✅ nested path .[0]?.compressed;
//       console.log("Uploaded Photo URL:", imageUrl);
//       toast.success("Photo uploaded successfully!");
//       return imageUrl;
//     } catch (error) {
//       toast.error("Failed to upload photo");
//       return null;
//     }
//   };

//   // Handle Document Upload
//   const handleDocChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedDocs = await Promise.all(files.map(uploadDocument));
//     const validDocs = uploadedDocs.filter(Boolean);
//     setBusinessDocs((prevDocs) => [...prevDocs, ...validDocs]);
//     localStorage.setItem(
//       "uploaded_business_documents1",
//       JSON.stringify([...businessDocs, ...validDocs])
//     );
//   };

//   const handlePhotoChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedPhotos = await Promise.all(files.map(uploadPhoto));
//     const validPhotos = uploadedPhotos
//       .filter(Boolean)
//       .flat()
//       .map((photo) => photo?.compressed);
//     setBusinessPhotos((prevPhotos) => [...prevPhotos, ...validPhotos]);
//     localStorage.setItem(
//       "uploaded_images1",
//       JSON.stringify([...businessPhotos, ...validPhotos])
//     );
//   };

//   // Remove Document
//   const removeDocument = (index) => {
//     const updatedDocs = businessDocs.filter((_, i) => i !== index);
//     setBusinessDocs(updatedDocs);
//     localStorage.setItem(
//       "uploaded_business_documents1",
//       JSON.stringify(updatedDocs)
//     );
//   };

//   // Remove Photo
//   const removePhoto = (index) => {
//     const updatedPhotos = businessPhotos.filter((_, i) => i !== index);
//     setBusinessPhotos(updatedPhotos);
//     localStorage.setItem("uploaded_images1", JSON.stringify(updatedPhotos));
//   };

//   const handleClose = () => {
//     navigate("/BasicInfo");
//   };

//   const handleNext = () => {
//     if (businessDocs.length === 0) {
//       toast.error("Please upload at least one document.");
//       return;
//     }

//     if (businessPhotos.length === 0) {
//       toast.error("Please upload at least one business photo.");
//       return;
//     }

//     const addressAdded = localStorage.getItem("address_added") === "true";
//     if (!addressAdded) {
//       toast.error("Please add your address before proceeding.");
//       return;
//     }

//     // All checks passed
//     navigate("/BankDetails");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen border-2 bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="relative bg-white rounded-xl w-full max-w-md">
//         <ToastContainer position="top-center" autoClose={3000} />

//         {/* Top-right Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-600 hover:text-[#FE7A3A]"
//         >
//           <FaTimes size={20} />
//         </button>

//         <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//           <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//             Become a Vendor
//           </h2>

//           {/* Document Upload */}
//           <h3 className="text-gray-700 mb-2 font-semibold">
//             Upload Business Documents (PDF, JPEG, PNG)
//           </h3>
//           <label className="flex flex-col items-center border-2 border-dashed border-[#FE7A3A] p-4 w-full rounded-lg cursor-pointer">
//             <FaUpload className="text-orange-500 text-2xl" />
//             <span className="text-orange-500 mt-2 text-sm">Upload</span>
//             <input
//               type="file"
//               accept="application/pdf,image/*"
//               multiple
//               onChange={handleDocChange}
//               hidden
//             />
//           </label>
//           {businessDocs.map((doc, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
//             >
//               <span className="text-gray-600">Document {index + 1}</span>
//               <button
//                 onClick={() => removeDocument(index)}
//                 className="text-[#FE7A3A]"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           ))}

//           {/* Photo Upload */}
//           <h3 className="text-gray-700 mb-2 font-semibold">
//             Upload Business Photos (JPEG, PNG)
//           </h3>
//           <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
//             <FaUpload className="text-[#FE7A3A] text-2xl" />
//             <span className="text-[#FE7A3A] mt-2 text-sm">Upload</span>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handlePhotoChange}
//               hidden
//             />
//           </label>

//           {/* Photo Preview */}
//           {businessPhotos.length > 0 && (
//             <div className="grid grid-cols-3 gap-2 mb-4 mt-4">
//               {businessPhotos.map((photo, index) => (
//                 <div
//                   key={index}
//                   className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
//                 >
//                   <img
//                     src={photo}
//                     alt="Uploaded"
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     onClick={() => removePhoto(index)}
//                     className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Add Address */}
//           <button
//             className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-2 rounded-lg mt-4"
//             onClick={() => navigate("/AddAddress")}
//           >
//             <FaPlus /> Add Address
//           </button>

//           {/* Footer Buttons */}
//           <div className="flex justify-between mt-6">
//             {/* <button
//               className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//               onClick={() => {
//                 if (businessDocs.length === 0) {
//                   toast.warn(
//                     "Please upload at least one document before saving."
//                   );
//                   return;
//                 }

//                 if (businessPhotos.length === 0) {
//                   toast.warn(
//                     "Please upload at least one business photo before saving."
//                   );
//                   return;
//                 }

//                 toast.success("Data saved locally!");
//               }}
//             >
//               Save Data
//             </button> */}
//             <button
//               className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//               onClick={() => {
//                 if (businessDocs.length === 0) {
//                   toast.warn(
//                     "Please upload at least one document before saving."
//                   );
//                   return;
//                 }

//                 if (businessPhotos.length === 0) {
//                   toast.warn(
//                     "Please upload at least one business photo before saving."
//                   );
//                   return;
//                 }

//                 // ✅ यहाँ डेटा को लोकल स्टोरेज में सेव करें
//                 localStorage.setItem(
//                   "vendor_business_documents",
//                   JSON.stringify(businessDocs)
//                 );
//                 localStorage.setItem(
//                   "vendor_business_photos",
//                   JSON.stringify(businessPhotos)
//                 );

//                 toast.success("Data saved locally!");
//               }}
//             >
//               Save Data
//             </button>

//             <button
//               className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//               onClick={handleNext}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDocument;

// import { useState, useEffect } from "react";
// import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const VendorDocument = () => {
//   const navigate = useNavigate();

//   const [businessDocs, setBusinessDocs] = useState([]);
//   const [businessPhotos, setBusinessPhotos] = useState([]);

//   useEffect(() => {
//   const fetchVendorData = async () => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/vendor/details/${vendorId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       const vendorData = response.data;

//       if (vendorData.uploaded_business_documents?.length > 0) {
//         setBusinessDocs(vendorData.uploaded_business_documents);
//       }

//       if (vendorData.uploaded_images?.length > 0) {
//         const photos = vendorData.uploaded_images.map((img) => ({
//           thumbnailUrl: img?.thumbnail, // ✅ थंबनेल URL को स्टोर करें
//           compressedUrl: img?.compressed, // ✅ कंप्रेस्ड URL को स्टोर करें
//         }));
//         setBusinessPhotos(photos);
//       }
//     } catch (error) {
//       console.error("Failed to fetch vendor document data:", error);
//     }
//   };

//   fetchVendorData();

//   // Load existing URLs from local storage on component mount
//   const storedDocs = localStorage.getItem("uploaded_business_documents1");
//   if (storedDocs) {
//     setBusinessDocs(JSON.parse(storedDocs));
//   }
//   const storedPhotos = localStorage.getItem("uploaded_images1");
//   if (storedPhotos) {
//     setBusinessPhotos(JSON.parse(storedPhotos));
//   }
// }, []);

//   // Upload Document
//   const uploadDocument = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadDocumentsAPI/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );
//       const fileUrl = response.data; // ?.[0]
//       console.log("Uploaded Document URL:", fileUrl);
//       toast.success("Document uploaded successfully!");
//       return fileUrl;
//     } catch (error) {
//       toast.error("Failed to upload document");
//       return null;
//     }
//   };

//   // Upload Photo
//   const uploadPhoto = async (file) => {
//     const formData = new FormData();
//     formData.append("images", file);
//     formData.append("model_name", "RaiseAnIssueCustomUser");
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

//       const imageData = response.data?.data?.[0];

//       if (imageData) {
//         const thumbnailUrl = imageData?.thumbnail;
//         const compressedUrl = imageData?.compressed;
//         console.log("Uploaded Photo Response:", imageData);
//         toast.success("Photo uploaded successfully!");
//         return { thumbnailUrl, compressedUrl }; // दोनों URLs के साथ एक ऑब्जेक्ट लौटाएं
//       } else {
//         toast.error("Failed to upload photo or retrieve URLs");
//         return null;
//       }
//     } catch (error) {
//       toast.error("Failed to upload photo");
//       return null;
//     }
//   };

//   // Handle Document Upload
//   const handleDocChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedDocs = await Promise.all(files.map(uploadDocument));
//     const validDocs = uploadedDocs.filter(Boolean).flat(); // ✅ .flat() यहाँ होना चाहिए
//     setBusinessDocs((prevDocs) => [...prevDocs, ...validDocs]);
//     localStorage.setItem(
//       "uploaded_business_documents1",
//       JSON.stringify([...businessDocs, ...validDocs])
//     );
//     console.log(
//       "Local Storage after doc upload:",
//       localStorage.getItem("uploaded_business_documents1")
//     );
//   };

//   const handlePhotoChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedPhotos = await Promise.all(files.map(uploadPhoto));
//     const validPhotos = uploadedPhotos
//       .filter(Boolean)
//       .flat()
//       .map((photo) => ({
//         thumbnailUrl: photo?.thumbnailUrl,
//         compressedUrl: photo?.compressedUrl,
//       }));
//     setBusinessPhotos((prevPhotos) => [...prevPhotos, ...validPhotos]);
//     localStorage.setItem(
//       "uploaded_images1",
//       JSON.stringify([...businessPhotos, ...validPhotos]) // ऑब्जेक्ट्स का ऐरे सेव करें
//     );
//     console.log(
//       "Local Storage after photo upload:",
//       localStorage.getItem("uploaded_images1")
//     );
//   };

//   // Remove Document
//   const removeDocument = (index) => {
//     const updatedDocs = businessDocs.filter((_, i) => i !== index);
//     setBusinessDocs(updatedDocs);
//     localStorage.setItem(
//       "uploaded_business_documents1",
//       JSON.stringify(updatedDocs)
//     );
//   };

//   // Remove Photo
//   const removePhoto = (index) => {
//     const updatedPhotos = businessPhotos.filter((_, i) => i !== index);
//     setBusinessPhotos(updatedPhotos);
//     localStorage.setItem("uploaded_images1", JSON.stringify(updatedPhotos));
//   };

//   useEffect(() => {
//     localStorage.setItem(
//       "uploaded_business_documents1",
//       JSON.stringify(businessDocs)
//     );
//   }, [businessDocs]);

//   useEffect(() => {
//     localStorage.setItem("uploaded_images1", JSON.stringify(businessPhotos));
//   }, [businessPhotos]);

//   const handleClose = () => {
//     navigate("/BasicInfo");
//   };

//   const handleNext = () => {
//     if (businessDocs.length === 0) {
//       toast.error("Please upload at least one document.");
//       return;
//     }

//     if (businessPhotos.length === 0) {
//       toast.error("Please upload at least one business photo.");
//       return;
//     }

//     const addressAdded = localStorage.getItem("address_added") === "true";
//     if (!addressAdded) {
//       toast.error("Please add your address before proceeding.");
//       return;
//     }

//     // All checks passed
//     navigate("/BankDetails");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen border-2 bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="relative bg-white rounded-xl w-full max-w-md">
//         <ToastContainer position="top-center" autoClose={3000} />

//         {/* Top-right Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-600 hover:text-[#FE7A3A]"
//         >
//           <FaTimes size={20} />
//         </button>

//         <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//           <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//             Become a Vendor
//           </h2>

//           {/* Document Upload */}
//           <h3 className="text-gray-700 mb-2 font-semibold">
//             Upload Business Documents (PDF, JPEG, PNG)
//           </h3>
//           <label className="flex flex-col items-center border-2 border-dashed border-[#FE7A3A] p-4 w-full rounded-lg cursor-pointer">
//             <FaUpload className="text-orange-500 text-2xl" />
//             <span className="text-orange-500 mt-2 text-sm">Upload</span>
//             <input
//               type="file"
//               accept="application/pdf,image/*"
//               multiple
//               onChange={handleDocChange}
//               hidden
//             />
//           </label>
//           {businessDocs.map((doc, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
//             >
//               <span className="text-gray-600">Document {index + 1}</span>
//               <button
//                 onClick={() => removeDocument(index)}
//                 className="text-[#FE7A3A]"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           ))}

//           {/* Photo Upload */}
//           <h3 className="text-gray-700 mb-2 font-semibold">
//             Upload Business Photos (JPEG, PNG)
//           </h3>
//           <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
//             <FaUpload className="text-[#FE7A3A] text-2xl" />
//             <span className="text-[#FE7A3A] mt-2 text-sm">Upload</span>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handlePhotoChange}
//               hidden
//             />
//           </label>

//           {/* Photo Preview */}
//           {businessPhotos.length > 0 && (
//             <div className="grid grid-cols-3 gap-2 mb-4 mt-4">
//               {businessPhotos.map((photo, index) => (
//                 <div
//                   key={index}
//                   className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
//                 >
//                   <img
//                     // src={photo}
//                      src={photo.compressedUrl}
//                     alt="Uploaded"
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     onClick={() => removePhoto(index)}
//                     className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Add Address */}
//           <button
//             className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-2 rounded-lg mt-4"
//             onClick={() => navigate("/AddAddress")}
//           >
//             <FaPlus /> Add Address
//           </button>

//           {/* Footer Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//               onClick={() => {
//                 if (businessDocs.length === 0) {
//                   toast.warn(
//                     "Please upload at least one document before saving."
//                   );
//                   return;
//                 }

//                 if (businessPhotos.length === 0) {
//                   toast.warn(
//                     "Please upload at least one business photo before saving."
//                   );
//                   return;
//                 }

//                 toast.success("Data saved locally!");
//               }}
//             >
//               Save Data
//             </button>

//             <button
//               className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//               onClick={handleNext}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDocument;

// import { useState, useEffect } from "react";
// import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const VendorDocument = () => {
//   const navigate = useNavigate();

//   const [businessDocs, setBusinessDocs] = useState([]);
//   const [businessPhotos, setBusinessPhotos] = useState([]);
//   const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
//   const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

//   useEffect(() => {
//     const fetchVendorData = async () => {
//       const vendorId = localStorage.getItem("vendor_id");
//       if (!vendorId) return;

//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("access")}`,
//             },
//           }
//         );

//         const vendorData = response.data;

//         if (vendorData.uploaded_business_documents?.length > 0) {
//           setBusinessDocs(vendorData.uploaded_business_documents);
//           setIsDocumentUploaded(true);
//         }

//         if (vendorData.uploaded_images?.length > 0) {
//           const photos = vendorData.uploaded_images.map((img) => ({
//             thumbnailUrl: img?.thumbnail, // ✅ थंबनेल URL को स्टोर करें
//             compressedUrl: img?.compressed, // ✅ कंप्रेस्ड URL को स्टोर करें
//           }));
//           setBusinessPhotos(photos);
//           setIsPhotoUploaded(true);
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor document data:", error);
//       }
//     };

//     fetchVendorData();

//     // Load existing URLs from local storage on component mount
//     const storedDocs = localStorage.getItem("uploaded_business_documents1");
//     if (storedDocs) {
//       setBusinessDocs(JSON.parse(storedDocs));
//       setIsDocumentUploaded(JSON.parse(storedDocs).length > 0);
//     }
//     const storedPhotos = localStorage.getItem("uploaded_images1");
//     if (storedPhotos) {
//       setBusinessPhotos(JSON.parse(storedPhotos));
//       setIsPhotoUploaded(JSON.parse(storedPhotos).length > 0);
//     }
//   }, []);

//   // Upload Document
//   const uploadDocument = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       const response = await axios.post(
//         "https://api.upswap.app/api/UploadDocumentsAPI/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );
//       const fileUrl = response.data; // ?.[0]
//       console.log("Uploaded Document URL:", fileUrl);
//       toast.success("Document uploaded successfully!");
//       return fileUrl;
//     } catch (error) {
//       toast.error("Failed to upload document");
//       return null;
//     }
//   };

//   // Upload Photo
//   const uploadPhoto = async (file) => {
//     const formData = new FormData();
//     formData.append("images", file);
//     formData.append("model_name", "RaiseAnIssueCustomUser");
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

//       // const imageData = response.data?.data?.[0];
//       const imageData = {};
//       if (imageData) {
//         const thumbnailUrl = imageData?.thumbnail;
//         const compressedUrl = imageData?.compressed;
//         console.log("Uploaded Photo Response:", imageData);
//         toast.success("Photo uploaded successfully!");
//         return { thumbnailUrl, compressedUrl }; // दोनों URLs के साथ एक ऑब्जेक्ट लौटाएं
//       } else {
//         toast.error("Failed to upload photo or retrieve URLs");
//         return null;
//       }
//       // To Do
//       // if (response.status === 200 && response.data?.data?.[0]) {
//       //   const imageData = response.data.data[0];
//       //   const thumbnailUrl = imageData?.thumbnail;
//       //   const compressedUrl = imageData?.compressed;
//       //   console.log("Uploaded Photo Response:", imageData);
//       //   toast.success("Photo uploaded successfully!");
//       //   return { thumbnailUrl, compressedUrl };
//       // } else {
//       //   toast.error("Failed to upload photo or retrieve URLs");
//       //   return null;
//       // }
//     } catch (error) {
//       toast.error("Failed to upload photo");
//       return null;
//     }
//   };

//   // Handle Document Upload
//   const handleDocChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedDocs = await Promise.all(files.map(uploadDocument));
//     const validDocs = uploadedDocs.filter(Boolean).flat(); // ✅ .flat() यहाँ होना चाहिए
//     setBusinessDocs((prevDocs) => [...prevDocs, ...validDocs]);
//     localStorage.setItem(
//       "uploaded_business_documents1",
//       JSON.stringify([...businessDocs, ...validDocs])
//     );
//     setIsDocumentUploaded(true);
//     console.log(
//       "Local Storage after doc upload:",
//       localStorage.getItem("uploaded_business_documents1")
//     );
//   };

//   const handlePhotoChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedPhotos = await Promise.all(files.map(uploadPhoto));
//     const validPhotos = uploadedPhotos
//       .filter(Boolean)
//       .flat()
//       .map((photo) => ({
//         thumbnailUrl: photo?.thumbnailUrl,
//         compressedUrl: photo?.compressedUrl,
//       }));
//     setBusinessPhotos((prevPhotos) => [...prevPhotos, ...validPhotos]);
//     localStorage.setItem(
//       "uploaded_images1",
//       JSON.stringify([...businessPhotos, ...validPhotos]) // ऑब्जेक्ट्स का ऐरे सेव करें
//     );
//     setIsPhotoUploaded(true);
//     console.log(
//       "Local Storage after photo upload:",
//       localStorage.getItem("uploaded_images1")
//     );
//   };

//   // Remove Document
//   const removeDocument = (index) => {
//     const updatedDocs = businessDocs.filter((_, i) => i !== index);
//     setBusinessDocs(updatedDocs);
//     localStorage.setItem(
//       "uploaded_business_documents1",
//       JSON.stringify(updatedDocs)
//     );
//     setIsDocumentUploaded(updatedDocs.length > 0);
//   };

//   // Remove Photo
//   const removePhoto = (index) => {
//     const updatedPhotos = businessPhotos.filter((_, i) => i !== index);
//     setBusinessPhotos(updatedPhotos);
//     localStorage.setItem("uploaded_images1", JSON.stringify(updatedPhotos));
//     setIsPhotoUploaded(updatedPhotos.length > 0);
//   };

//   useEffect(() => {
//     localStorage.setItem(
//       "uploaded_business_documents1",
//       JSON.stringify(businessDocs)
//     );
//   }, [businessDocs]);

//   useEffect(() => {
//     localStorage.setItem("uploaded_images1", JSON.stringify(businessPhotos));
//   }, [businessPhotos]);

//   const handleClose = () => {
//     navigate("/BasicInfo");
//   };

//   const handleNext = () => {
//     if (!isDocumentUploaded) {
//       toast.error("Please upload at least one document.");
//       return;
//     }

//     if (!isPhotoUploaded) {
//       toast.error("Please upload at least one business photo.");
//       return;
//     }

//     const addressAdded = localStorage.getItem("address_added") === "true";
//     if (!addressAdded) {
//       toast.error("Please add your address before proceeding.");
//       return;
//     }

//     // Save data to local storage before navigating
//     toast.success("Data saved locally!");
//     navigate("/BankDetails");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen border-2 bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="relative bg-white rounded-xl w-full max-w-md">
//         <ToastContainer position="top-center" autoClose={3000} />

//         {/* Top-right Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-600 hover:text-[#FE7A3A]"
//         >
//           <FaTimes size={20} />
//         </button>

//         <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//           <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//             Become a Vendor
//           </h2>

//           {/* Document Upload */}
//           <h3 className="text-gray-700 mb-2 font-semibold">
//             Upload Business Documents (PDF, JPEG, PNG)
//           </h3>
//           <label className="flex flex-col items-center border-2 border-dashed border-[#FE7A3A] p-4 w-full rounded-lg cursor-pointer">
//             <FaUpload className="text-orange-500 text-2xl" />
//             <span className="text-orange-500 mt-2 text-sm">Upload</span>
//             <input
//               type="file"
//               accept="application/pdf,image/*"
//               multiple
//               onChange={handleDocChange}
//               hidden
//             />
//           </label>
//           {businessDocs.map((doc, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
//             >
//               <span className="text-gray-600">Document {index + 1}</span>
//               <button
//                 onClick={() => removeDocument(index)}
//                 className="text-[#FE7A3A]"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           ))}

//           {/* Photo Upload */}
//           <h3 className="text-gray-700 mb-2 font-semibold">
//             Upload Business Photos (JPEG, PNG)
//           </h3>
//           <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
//             <FaUpload className="text-[#FE7A3A] text-2xl" />
//             <span className="text-[#FE7A3A] mt-2 text-sm">Upload</span>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handlePhotoChange}
//               hidden
//             />
//           </label>

//           {/* Photo Preview */}
//           {businessPhotos.length > 0 && (
//             <div className="grid grid-cols-3 gap-2 mb-4 mt-4">
//               {businessPhotos.map((photo, index) => (
//                 <div
//                   key={index}
//                   className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
//                 >
//                   <img
//                     // src={photo}
//                     src={photo.compressedUrl}
//                     alt="Uploaded"
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     onClick={() => removePhoto(index)}
//                     className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Add Address */}
//           <button
//             className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-2 rounded-lg mt-4"
//             onClick={() => navigate("/AddAddress")}
//           >
//             <FaPlus /> Add Address
//           </button>

//           {/* Footer Buttons */}
//           <div className="flex justify-end mt-6">
//             <button
//               className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//               onClick={handleNext}
//               disabled={!isDocumentUploaded || !isPhotoUploaded}
//               style={{
//                 opacity: !isDocumentUploaded || !isPhotoUploaded ? 0.5 : 1,
//                 cursor:
//                   !isDocumentUploaded || !isPhotoUploaded
//                     ? "not-allowed"
//                     : "pointer",
//               }}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDocument;

import { useState, useEffect } from "react";
import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

const VendorDocument = () => {
  const navigate = useNavigate();

  const [businessDocs, setBusinessDocs] = useState([]);
  const [businessPhotos, setBusinessPhotos] = useState([]);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  const [isUploadingDoc, setIsUploadingDoc] = useState(false); // 🌀 doc uploading state
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false); // 🌀 photo uploading state

 useEffect(() => {
  const fetchFromLocalOrAPI = async () => {
    const storedDocs = localStorage.getItem("uploaded_business_documents1");
    const storedPhotos = localStorage.getItem("uploaded_images1");

    let hasLocalDocs = false;
    let hasLocalPhotos = false;

    if (storedDocs) {
      const parsedDocs = JSON.parse(storedDocs);
      if (parsedDocs.length > 0) {
        setBusinessDocs(parsedDocs);
        setIsDocumentUploaded(true);
        hasLocalDocs = true;
      }
    }

    if (storedPhotos) {
      const parsedPhotos = JSON.parse(storedPhotos);
      if (parsedPhotos.length > 0) {
        setBusinessPhotos(parsedPhotos);
        setIsPhotoUploaded(true);
        hasLocalPhotos = true;
      }
    }

    // If local data missing, fetch from API
    if (!hasLocalDocs || !hasLocalPhotos) {
      const vendorId = localStorage.getItem("vendor_id");
      if (!vendorId) return;

      try {
        const response = await axios.get(
          `https://api.upswap.app/api/vendor/details/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        const vendorData = response.data;

        if (!hasLocalDocs && vendorData.uploaded_business_documents?.length > 0) {
          setBusinessDocs(vendorData.uploaded_business_documents);
          localStorage.setItem(
            "uploaded_business_documents1",
            JSON.stringify(vendorData.uploaded_business_documents)
          );
          setIsDocumentUploaded(true);
        }

        if (vendorData.uploaded_images?.length > 0) {
  const photos = vendorData.uploaded_images.map((img) => {
    if (typeof img === "string") {
      // API returned plain URL string
      return {
        compressedUrl: img,
      };
    } else {
      // API returned object with keys
      return {
        thumbnailUrl: img?.thumbnail || img?.compressed || img?.url,
        compressedUrl: img?.compressed || img?.thumbnail || img?.url,
      };
    }
  });
  setBusinessPhotos(photos);
  localStorage.setItem("uploaded_images1", JSON.stringify(photos));
  setIsPhotoUploaded(true);
}

      } catch (error) {
        console.error("Failed to fetch vendor document data:", error);
      }
    }
  };

  fetchFromLocalOrAPI();
}, []);

// useEffect(() => {
//   const fetchVendorData = async () => {
//     const vendorId = localStorage.getItem("vendor_id");
//     if (!vendorId) return;

//     try {
//       const response = await axios.get(
//         `https://api.upswap.app/api/vendor/details/${vendorId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       const vendorData = response.data;

//       if (vendorData.uploaded_business_documents?.length > 0) {
//         setBusinessDocs(vendorData.uploaded_business_documents);
//         localStorage.setItem(
//           "uploaded_business_documents1",
//           JSON.stringify(vendorData.uploaded_business_documents)
//         );
//         setIsDocumentUploaded(true);
//       }

//       if (vendorData.uploaded_images?.length > 0) {
//         const photos = vendorData.uploaded_images.map((img) => ({
//           thumbnailUrl: img?.thumbnail,
//           compressedUrl: img?.compressed,
//         }));
//         setBusinessPhotos(photos);
//         localStorage.setItem("uploaded_images1", JSON.stringify(photos));
//         setIsPhotoUploaded(true);
//       }
//     } catch (error) {
//       console.error("Failed to fetch vendor document data:", error);

//       // Fallback: load from localStorage if API fails
//       const storedDocs = localStorage.getItem("uploaded_business_documents1");
//       if (storedDocs) {
//         setBusinessDocs(JSON.parse(storedDocs));
//         setIsDocumentUploaded(JSON.parse(storedDocs).length > 0);
//       }
//       const storedPhotos = localStorage.getItem("uploaded_images1");
//       if (storedPhotos) {
//         setBusinessPhotos(JSON.parse(storedPhotos));
//         setIsPhotoUploaded(JSON.parse(storedPhotos).length > 0);
//       }
//     }
//   };

//   fetchVendorData();
// }, []);

  const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "https://api.upswap.app/api/UploadDocumentsAPI/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      toast.success("Document uploaded successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to upload document");
      return null;
    }
  };

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("images", file);
    formData.append("model_name", "RaiseAnIssueCustomUser");
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

      const imageData = response.data?.data?.[0];
      if (imageData) {
        toast.success("Photo uploaded successfully!");
        return {
          thumbnailUrl: imageData?.thumbnail,
          compressedUrl: imageData?.compressed,
        };
      } else {
        toast.error("Failed to upload photo or retrieve URLs");
        return null;
      }
    } catch (error) {
      toast.error("Failed to upload photo");
      return null;
    }
  };

  const handleDocChange = async (e) => {
    setIsUploadingDoc(true); // 🌀 Start spinner
    const files = Array.from(e.target.files);
    const uploadedDocs = await Promise.all(files.map(uploadDocument));
    const validDocs = uploadedDocs.filter(Boolean).flat();
    setBusinessDocs((prevDocs) => [...prevDocs, ...validDocs]);
    localStorage.setItem(
      "uploaded_business_documents1",
      JSON.stringify([...businessDocs, ...validDocs])
    );
    setIsDocumentUploaded(true);
    setIsUploadingDoc(false); // 🌀 Stop spinner
  };

  const handlePhotoChange = async (e) => {
    setIsUploadingPhoto(true); // 🌀 Start spinner
    const files = Array.from(e.target.files);
    const uploadedPhotos = await Promise.all(files.map(uploadPhoto));
    const validPhotos = uploadedPhotos.filter(Boolean);
    setBusinessPhotos((prevPhotos) => [...prevPhotos, ...validPhotos]);
    localStorage.setItem(
      "uploaded_images1",
      JSON.stringify([...businessPhotos, ...validPhotos])
    );
    setIsPhotoUploaded(true);
    setIsUploadingPhoto(false); // 🌀 Stop spinner
  };

  const removeDocument = (index) => {
    const updatedDocs = businessDocs.filter((_, i) => i !== index);
    setBusinessDocs(updatedDocs);
    localStorage.setItem(
      "uploaded_business_documents1",
      JSON.stringify(updatedDocs)
    );
    setIsDocumentUploaded(updatedDocs.length > 0);
  };

  const removePhoto = (index) => {
    const updatedPhotos = businessPhotos.filter((_, i) => i !== index);
    setBusinessPhotos(updatedPhotos);
    localStorage.setItem("uploaded_images1", JSON.stringify(updatedPhotos));
    setIsPhotoUploaded(updatedPhotos.length > 0);
  };

  const handleClose = () => {
    navigate("/BasicInfo");
  };

  const handleNext = () => {
    if (!isDocumentUploaded) {
      toast.error("Please upload at least one document.");
      return;
    }
    if (!isPhotoUploaded) {
      toast.error("Please upload at least one business photo.");
      return;
    }
    const addressAdded = localStorage.getItem("address_added") === "true";
    if (!addressAdded) {
      toast.error("Please add your address before proceeding.");
      return;
    }
    toast.success("Data saved locally!");
    navigate("/BankDetails");
  };

  return (
    // <div className="relative flex justify-center items-center min-h-screen border-2 bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
       <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl rounded-md mx-auto bg-gradient-to-b from-orange-400 to-white">
      <div className="relative bg-white rounded-xl w-full max-w-md justify-center items-center mx-auto">
        <ToastContainer position="top-center" autoClose={3000} />

        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-[#FE7A3A]"
        >
          <FaTimes size={18} />
        </button>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
            Become a Vendor
          </h2>

          {/* Document Upload */}
          <h3 className="text-gray-700 mb-2 font-semibold">
            Upload Business Documents (PDF, JPEG, PNG)
          </h3>
          <label className="flex flex-col items-center border-2 border-dashed border-[#FE7A3A] p-4 w-full rounded-lg cursor-pointer">
            {isUploadingDoc ? (
              <FaSpinner className="animate-spin text-orange-500 text-2xl" />
            ) : (
              <>
                <FaUpload className="text-orange-500 text-2xl" />
                <span className="text-orange-500 mt-2 text-sm">Upload</span>
              </>
            )}
            <input
              type="file"
              accept="application/pdf,image/*"
              multiple
              onChange={handleDocChange}
              hidden
            />
          </label>
          {businessDocs.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
            >
              <span className="text-gray-600">Document {index + 1}</span>
              <button
                onClick={() => removeDocument(index)}
                className="text-[#FE7A3A]"
              >
                <FaTimes />
              </button>
            </div>
          ))}

          {/* Photo Upload */}
          <h3 className="text-gray-700 mb-2 font-semibold">
            Upload Business Photos (JPEG, PNG)
          </h3>
          <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
            {isUploadingPhoto ? (
              <FaSpinner className="animate-spin text-[#FE7A3A] text-2xl" />
            ) : (
              <>
                <FaUpload className="text-[#FE7A3A] text-2xl" />
                <span className="text-[#FE7A3A] mt-2 text-sm">Upload</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              hidden
            />
          </label>

          {/* Photo Preview */}
          {businessPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4 mt-4">
              {businessPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={photo.compressedUrl}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-2 rounded-lg mt-4"
            onClick={() => navigate("/AddAddress")}
          >
            <FaPlus /> Add Address
          </button>

          <div className="flex justify-end mt-6">
            <button
              className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
              onClick={handleNext}
              disabled={!isDocumentUploaded || !isPhotoUploaded}
              style={{
                opacity: !isDocumentUploaded || !isPhotoUploaded ? 0.5 : 1,
                cursor:
                  !isDocumentUploaded || !isPhotoUploaded
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDocument;
