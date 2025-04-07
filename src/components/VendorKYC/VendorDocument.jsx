import React, { useState } from "react";
import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorDocument = () => {
  const navigate = useNavigate();
  const [businessDescription, setBusinessDescription] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [businessDocs, setBusinessDocs] = useState([]);
  const [businessPhotos, setBusinessPhotos] = useState([]);

  // Upload Document
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
      const fileUrl = response.data;   // ?.[0]
      // console.log("Uploaded Document URL:", fileUrl);
      localStorage.setItem("uploaded_business_documents1", JSON.stringify(fileUrl));
      return fileUrl;
    } catch (error) {
      console.error("Document upload failed:", error);
      alert("Failed to upload document");
      return null;
    }
  };
  

  // Upload Photo
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
      
      const imageUrl = response.data?.data // ✅ nested path .[0]?.compressed;
      // console.log("Uploaded Image URL:", imageUrl);
      localStorage.setItem("uploaded_images1", JSON.stringify(imageUrl));
      return imageUrl;
    } catch (error) {
      console.error("Photo upload failed:", error);
      alert("Failed to upload photo");
      return null;
    }
  };

  // Handle Document Upload
  const handleDocChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedDocs = await Promise.all(files.map(uploadDocument));
    const newDocs = [...businessDocs, ...uploadedDocs.filter(Boolean)];
    setBusinessDocs(newDocs);
    // localStorage.setItem(
    //   "uploaded_business_documents",
    //   JSON.stringify(newDocs)
    // );
  };

  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedPhotos = await Promise.all(files.map(uploadPhoto));
    const newPhotos = [...businessPhotos, ...uploadedPhotos.filter(Boolean)];
    setBusinessPhotos(newPhotos);
    // localStorage.setItem("uploaded_images", JSON.stringify(newPhotos));
  };

  // Remove Document
  const removeDocument = (index) => {
    setBusinessDocs((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };

  // Remove Photo
  const removePhoto = (index) => {
    setBusinessPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    localStorage.setItem("business_description", businessDescription);
    // localStorage.setItem("bank_account_number", accountNumber);
    navigate("/BankDetails");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
          Become a Vendor
        </h2>

        <label className="block text-gray-700 mb-1 mt-2 font-semibold">
          Business Description
        </label>
        <textarea
          className="w-full border p-2 rounded-lg mb-4 text-gray-600"
          placeholder="Enter your business description"
          rows="3"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
        ></textarea>

        <h3 className="text-gray-700 mb-2 font-semibold">
          Upload Business Documents
        </h3>
        <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
          <FaUpload className="text-orange-500 text-2xl" />
          <span className="text-orange-500 mt-2 text-sm">Upload</span>
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
              className="text-red-500"
            >
              <FaTimes />
            </button>
          </div>
        ))}

        <h3 className="text-gray-700 mb-2 font-semibold">
          Upload Business Photos
        </h3>
        <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
          <FaUpload className="text-orange-500 text-2xl" />
          <span className="text-orange-500 mt-2 text-sm">Upload</span>
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
          <div className="grid grid-cols-3 gap-2 mb-4">
            {businessPhotos.map((photo, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={photo}
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
          className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-2 rounded-lg mt-4"
          onClick={() => navigate("/AddAddress")}
        >
          <FaPlus /> Add Address
        </button>

        {/* <h3 className="text-gray-700 mt-4 mb-2 font-semibold">Bank Details</h3>
        <label className="block text-gray-700 mb-1 font-semibold">
          Account Number
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded-lg text-gray-600"
          placeholder="Enter bank account number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        /> */}

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigate("/BasicInfo")}
          >
            Back
          </button>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDocument;






// import React, { useState, useEffect } from "react";
// import { FaUpload, FaPlus, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const VendorDocument = () => {
//   const navigate = useNavigate();
//   const [businessDescription, setBusinessDescription] = useState("");
//   const [businessDocs, setBusinessDocs] = useState([]);
//   const [businessPhotos, setBusinessPhotos] = useState([]);

//   const handleNext = () => {
//     // Optionally save description
//     localStorage.setItem("business_description", businessDescription);
  
//     // Check for validations if needed (optional)
//     if (!businessDescription || businessDocs.length === 0 || businessPhotos.length === 0) {
//       alert("Please fill all the required fields and upload at least one document and one photo.");
//       return;
//     }
  
//     navigate("/AddAddress");
//   };
  

//   useEffect(() => {
//     const savedDocs = JSON.parse(localStorage.getItem("uploaded_business_documents")) || [];
//     const savedPhotos = JSON.parse(localStorage.getItem("uploaded_images")) || [];
//     setBusinessDocs(savedDocs);
//     setBusinessPhotos(savedPhotos);
//   }, []);

//   const uploadFile = async (file, isDocument = true) => {
//     const formData = new FormData();
//     formData.append(isDocument ? "file" : "images", file);
//     if (!isDocument) {
//       formData.append("model_name", "RaiseAnIssueCustomUser");
//     }

//     try {
//       const response = await axios.post(
//         isDocument
//           ? "https://api.upswap.app/api/UploadDocumentsAPI/"
//           : "https://api.upswap.app/api/UploadImagesAPI/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//         }
//       );

//       const fileUrl = isDocument
//         ? response.data?.[0]
//         : response.data?.data?.[0]?.compressed;

//       if (!fileUrl || !fileUrl.startsWith("http")) {
//         throw new Error("Invalid file URL received from backend.");
//       }

//       return fileUrl;
//     } catch (error) {
//       console.error(`${isDocument ? "Document" : "Photo"} upload failed:`, error);
//       alert(`Failed to upload ${isDocument ? "document" : "photo"}`);
//       return null;
//     }
//   };

//   const handleFileChange = async (e, isDocument = true) => {
//     const files = Array.from(e.target.files);
//     const uploadedFiles = await Promise.all(files.map(file => uploadFile(file, isDocument)));

//     if (isDocument) {
//       const newDocs = uploadedFiles
//         .filter(Boolean)
//         .map(url => ({ document_url: url, document_type: "Business Document" }));
//       const updatedDocs = [...businessDocs, ...newDocs];
//       setBusinessDocs(updatedDocs);
//       localStorage.setItem("uploaded_business_documents", JSON.stringify(updatedDocs));
//     } else {
//       const newPhotos = uploadedFiles.filter(Boolean);
//       const updatedPhotos = [...businessPhotos, ...newPhotos];
//       setBusinessPhotos(updatedPhotos);
//       localStorage.setItem("uploaded_images", JSON.stringify(updatedPhotos));
//     }
//   };

//   const removeFile = (index, isDocument = true) => {
//     if (isDocument) {
//       const updatedDocs = businessDocs.filter((_, i) => i !== index);
//       setBusinessDocs(updatedDocs);
//       localStorage.setItem("uploaded_business_documents", JSON.stringify(updatedDocs));
//     } else {
//       const updatedPhotos = businessPhotos.filter((_, i) => i !== index);
//       setBusinessPhotos(updatedPhotos);
//       localStorage.setItem("uploaded_images", JSON.stringify(updatedPhotos));
//     }
//   };


//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         <label className="block text-gray-700 mb-1 mt-2 font-semibold">
//           Business Description
//         </label>
//         <textarea
//           className="w-full border p-2 rounded-lg mb-4 text-gray-600"
//           placeholder="Enter your business description"
//           rows="3"
//           value={businessDescription}
//           onChange={(e) => setBusinessDescription(e.target.value)}
//         ></textarea>

//         <h3 className="text-gray-700 mb-2 font-semibold">
//           Upload Business Documents
//         </h3>
//         <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
//           <FaUpload className="text-orange-500 text-2xl" />
//           <span className="text-orange-500 mt-2 text-sm">Upload</span>
//           <input
//             type="file"
//             accept="application/pdf,image/*"
//             multiple
//             onChange={(e) => handleFileChange(e, true)}
//             hidden
//           />
//         </label>
//         {businessDocs.map((doc, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2"
//           >
//             <span className="text-gray-600">
//               {doc.document_type || `Document ${index + 1}`}
//             </span>
//             <button
//               onClick={() => removeFile(index, true)}
//               className="text-red-500"
//             >
//               <FaTimes />
//             </button>
//           </div>
//         ))}


// <h3 className="text-gray-700 mb-2 font-semibold">
//           Upload Business Photos
//         </h3>
//         <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
//           <FaUpload className="text-orange-500 text-2xl" />
//           <span className="text-orange-500 mt-2 text-sm">Upload</span>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={(e) => handleFileChange(e, false)}
//             hidden
//           />
//         </label>

//         {businessPhotos.length > 0 && (
//           <div className="grid grid-cols-3 gap-2 mb-4">
//             {businessPhotos.map((photo, index) => (
//               <div
//                 key={index}
//                 className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
//               >
//                 <img
//                   src={photo}
//                   alt="Uploaded"
//                   className="w-full h-full object-cover"
//                 />
//                 <button
//                   onClick={() => removeFile(index, false)}
//                   className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-2 rounded-lg mt-4"
//           onClick={() => navigate("/AddAddress")}
//         >
//           <FaPlus /> Add Address
//         </button>

//         <div className="flex justify-between mt-6">
//           <button
//             className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
//             onClick={() => navigate("/BasicInfo")}
//           >
//             Back
//           </button>
//           <button
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
//             onClick={handleNext}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDocument;

















// // ✅ Full updated VendorDocument.jsx
// import React, { useState, useEffect } from "react";
// import { FaUpload, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const VendorDocument = () => {
//   const navigate = useNavigate();
//   const [businessDescription, setBusinessDescription] = useState("");
//   const [businessDocs, setBusinessDocs] = useState([]);
//   const [businessPhotos, setBusinessPhotos] = useState([]);

//   useEffect(() => {
//     setBusinessDocs(JSON.parse(localStorage.getItem("uploaded_business_documents")) || []);
//     setBusinessPhotos(JSON.parse(localStorage.getItem("uploaded_images")) || []);
//     setBusinessDescription(localStorage.getItem("business_description") || "");
//   }, []);

//   const uploadFile = async (file, isDocument = true) => {
//     const formData = new FormData();
//     formData.append(isDocument ? "file" : "images", file);

//     if (!isDocument) {
//       formData.append("model_name", "RaiseAnIssueCustomUser");
//     }

//     try {
//       const url = isDocument
//         ? "https://api.upswap.app/api/UploadDocumentsAPI/"
//         : "https://api.upswap.app/api/UploadImagesAPI/";

//       const res = await axios.post(url, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//         },
//       });

//       return isDocument ? res.data?.[0] : res.data?.data?.[0]?.compressed;
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert(`Failed to upload ${isDocument ? "document" : "photo"}`);
//       return null;
//     }
//   };

//   const handleFileChange = async (e, isDocument = true) => {
//     const files = Array.from(e.target.files);
//     const uploadedFiles = await Promise.all(files.map(file => uploadFile(file, isDocument)));

//     if (isDocument) {
//       const newDocs = uploadedFiles
//         .filter(Boolean)
//         .map(url => ({ document_url: url, document_type: "Business Document" }));
//       const updatedDocs = [...businessDocs, ...newDocs];
//       setBusinessDocs(updatedDocs);
//       localStorage.setItem("uploaded_business_documents", JSON.stringify(updatedDocs));
//       console.log("Documents:", updatedDocs);
//     } else {
//       const newPhotos = uploadedFiles.filter(Boolean);
//       const updatedPhotos = [...businessPhotos, ...newPhotos];
//       setBusinessPhotos(updatedPhotos);
//       localStorage.setItem("uploaded_images", JSON.stringify(updatedPhotos));
//     }
//   };

//   const removeFile = (index, isDocument = true) => {
//     if (isDocument) {
//       const updated = businessDocs.filter((_, i) => i !== index);
//       setBusinessDocs(updated);
//       localStorage.setItem("uploaded_business_documents", JSON.stringify(updated));
//     } else {
//       const updated = businessPhotos.filter((_, i) => i !== index);
//       setBusinessPhotos(updated);
//       localStorage.setItem("uploaded_images", JSON.stringify(updated));
//     }
//   };

//   const handleNext = () => {
//     if (!businessDescription.trim()) {
//       alert("Please enter a business description.");
//       return;
//     }
//     if (businessDocs.length === 0) {
//       alert("Please upload at least one business document.");
//       return;
//     }
//     if (businessPhotos.length === 0) {
//       alert("Please upload at least one business photo.");
//       return;
//     }

//     localStorage.setItem("business_description", businessDescription);
//     navigate("/AddAddress");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         <label className="block text-gray-700 mt-4 font-semibold">Business Description</label>
//         <textarea
//           className="w-full border p-2 rounded-lg mb-4 text-gray-600"
//           placeholder="Enter your business description"
//           rows="3"
//           value={businessDescription}
//           onChange={(e) => setBusinessDescription(e.target.value)}
//         />

//         <h3 className="text-gray-700 mb-2 font-semibold">Upload Business Documents</h3>
//         <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
//           <FaUpload className="text-orange-500 text-2xl" />
//           <span className="text-orange-500 mt-2 text-sm">Upload</span>
//           <input
//             type="file"
//             accept="application/pdf,image/*"
//             multiple
//             onChange={(e) => handleFileChange(e, true)}
//             hidden
//           />
//         </label>
//         {businessDocs.map((doc, index) => (
//           <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md mt-2">
//             <span className="text-gray-600">{doc.document_type || `Document ${index + 1}`}</span>
//             <button onClick={() => removeFile(index, true)} className="text-red-500">
//               <FaTimes />
//             </button>
//           </div>
//         ))}

//         <h3 className="text-gray-700 mt-4 mb-2 font-semibold">Upload Business Photos</h3>
//         <label className="flex flex-col items-center border-2 border-dashed border-orange-400 p-4 w-full rounded-lg cursor-pointer">
//           <FaUpload className="text-orange-500 text-2xl" />
//           <span className="text-orange-500 mt-2 text-sm">Upload</span>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={(e) => handleFileChange(e, false)}
//             hidden
//           />
//         </label>

//         {businessPhotos.length > 0 && (
//           <div className="grid grid-cols-3 gap-2 mt-2">
//             {businessPhotos.map((url, i) => (
//               <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
//                 <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
//                 <button
//                   onClick={() => removeFile(i, false)}
//                   className="absolute top-1 right-1 bg-white p-1 rounded-full shadow text-red-500"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="flex justify-between mt-6">
//           <button className="bg-gray-500 text-white px-6 py-2 rounded-lg" onClick={() => navigate("/BasicInfo")}>
//             Back
//           </button>
//           <button className="bg-orange-500 text-white px-6 py-2 rounded-lg" onClick={handleNext}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDocument;
