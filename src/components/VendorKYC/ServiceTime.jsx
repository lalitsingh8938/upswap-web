// import React, { useState } from "react";
// import { FaPlus, FaPen, FaCheck } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";

// const VendorForm = () => {
//   const navigate = useNavigate();
//   const [businessHours, setBusinessHours] = useState([
//     {
//       day: "Sunday",
//       start: "11:00",
//       end: "19:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Monday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Tuesday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Wednesday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Thursday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Friday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Saturday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//   ]);

//   const handleToggle = (index) => {
//     const updated = [...businessHours];
//     updated[index].active = !updated[index].active;
//     setBusinessHours(updated);
//   };

//   const handleEditClick = (index) => {
//     const updated = [...businessHours];
//     updated[index].editing = true;
//     setBusinessHours(updated);
//   };

//   const handleTimeChange = (index, key, value) => {
//     const updated = [...businessHours];
//     updated[index][key] = value;
//     setBusinessHours(updated);
//   };

//   const handleSave = (index) => {
//     const updated = [...businessHours];
//     updated[index].editing = false;
//     setBusinessHours(updated);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-500 to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         {/* <button className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-3 rounded-lg my-4">
//           <FaPlus /> Add services provided by your business
//         </button> */}

//         <div className="bg-orange-500 text-white p-3 rounded-lg text-lg font-semibold flex justify-between my-4">
//           Choose Business Hours <span className="cursor-pointer">▼</span>
//         </div>

//         <div className="bg-white border rounded-lg border-orange-400 rounded-b-lg p-3 my-4">
//           {businessHours.map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col sm:flex-row justify-between items-center py-2 border-b last:border-0 gap-2"
//             >
//               <span className="text-gray-700 font-medium w-[80px]">
//                 {item.day}
//               </span>

//               {item.editing ? (
//                 <div className="flex gap-2 items-center">
//                   <TimePicker
//                     onChange={(value) =>
//                       handleTimeChange(index, "start", value)
//                     }
//                     value={item.start}
//                     disableClock
//                     clearIcon={null}
//                   />
//                   <span className="text-gray-600 text-center ml-5">to</span>
//                   <TimePicker
//                     onChange={(value) => handleTimeChange(index, "end", value)}
//                     value={item.end}
//                     disableClock
//                     clearIcon={null}
//                   />
//                 </div>
//               ) : (
//                 <span className="text-gray-600 w-[150px] text-center">
//                   {item.start} - {item.end}
//                 </span>
//               )}

//               {item.editing ? (
//                 <FaCheck
//                   className="text-green-600 cursor-pointer ml-5"
//                   onClick={() => handleSave(index)}
//                 />
//               ) : (
//                 <FaPen
//                   className="text-gray-500 cursor-pointer mx-2"
//                   onClick={() => handleEditClick(index)}
//                 />
//               )}

//               <label className="relative inline-flex items-center cursor-pointer ml-2">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={item.active}
//                   onChange={() => handleToggle(index)}
//                 />
//                 <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-orange-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
//               </label>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center gap-2 my-4">
//           <input
//             type="checkbox"
//             className="w-5 h-5 border border-orange-500 rounded-md"
//           />
//           <span className="text-gray-600">
//             Share a few details to enhance your Upswap experience
//           </span>
//         </div>

//         <div className="flex justify-between mt-6">
//           <button
//             className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
//             onClick={() => navigate("/BankDetails")}
//           >
//             Back
//           </button>
//           <button
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
//             onClick={() => navigate("/ServiceTime")}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorForm;

// import React, { useState } from "react";
// import { FaPlus, FaPen, FaCheck } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";

// const VendorForm = () => {
//   const navigate = useNavigate();
//   const [businessHours, setBusinessHours] = useState([
//     {
//       day: "Sunday",
//       start: "11:00",
//       end: "19:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Monday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Tuesday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Wednesday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Thursday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Friday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//     {
//       day: "Saturday",
//       start: "10:00",
//       end: "20:00",
//       active: true,
//       editing: false,
//     },
//   ]);

//   const handleToggle = (index) => {
//     const updated = [...businessHours];
//     updated[index].active = !updated[index].active;
//     setBusinessHours(updated);
//   };

//   const handleEditClick = (index) => {
//     const updated = [...businessHours];
//     updated[index].editing = true;
//     setBusinessHours(updated);
//   };

//   const handleTimeChange = (index, key, value) => {
//     const updated = [...businessHours];
//     updated[index][key] = value;
//     setBusinessHours(updated);
//   };

//   const handleSave = (index) => {
//     const updated = [...businessHours];
//     updated[index].editing = false;
//     setBusinessHours(updated);
//   };

//   // ✅ Local storage save handler
//   const handleSaveToLocal = () => {
//     localStorage.setItem("businessHours", JSON.stringify(businessHours));
//     alert("Business hours saved locally ✅");
//   };

//   // ✅ Submit handler
//   // 👇 Final submit handler inside VendorForm (ServiceTime) component
//   const handleSubmit = async () => {
//     try {
//       const vendorData = JSON.parse(localStorage.getItem("vendorData"));
//       const address = JSON.parse(localStorage.getItem("address"));
//       const serviceData = JSON.parse(localStorage.getItem("serviceData"));
//       const businessDocuments = JSON.parse(
//         localStorage.getItem("uploaded_business_documents")
//       );
//       const businessImages = JSON.parse(
//         localStorage.getItem("uploaded_images")
//       );
//       const businessDescription = localStorage.getItem("business_description");

//       const profilePicUrl = localStorage.getItem("profile_image_url"); // From Basic Info
//       const businessHours = JSON.parse(localStorage.getItem("businessHours")); // ✅ correct key // Optional
//       // const userId = localStorage.getItem("user_id"); // You must save this after login/registration
//       // const userId = JSON.parse(localStorage.getItem("userId"));
//       const userId = localStorage.getItem("user_id");

//       const bankDetails = {
//         bank_account_number: localStorage.getItem("bank_account_number"),
//         retype_bank_account_number: localStorage.getItem(
//           "retype_bank_account_number"
//         ),
//         bank_name: localStorage.getItem("bank_name"),
//         ifsc_code: localStorage.getItem("ifsc_code"),
//       };

//       // const country_code = localStorage.getItem("country_code") || "";
//       // const dial_code = localStorage.getItem("dial_code") || "";

//       const payload = {
//         profile_pic: profilePicUrl,
//         user: userId,
//         country_code: localStorage.getItem("country_code"),
//         dial_code: localStorage.getItem("dial_code"),
//         full_name: vendorData?.full_name || "",
//         phone_number: vendorData?.phone_number || "",
//         business_email_id: vendorData?.business_email_id || "",
//         business_establishment_year:
//           vendorData?.business_establishment_year || "", // Default for now
//         business_description: vendorData?.business_description || "",
//         uploaded_business_documents: businessDocuments || [],
//         uploaded_images: businessImages || [],
//         same_as_personal_phone_number: true,
//         same_as_personal_email_id: true,
//         addresses: [address],
//         // country_code: country_code // 👈 FIXED
//         // dial_code: dial_code // 👈 FIXED
//         // country_code: country_code || "",
//         // dial_code: dial_code || "",
//         ...bankDetails,
//         services: [serviceData],
//         business_hours: businessHours || [],
//       };

//       console.log("🚀 Final Payload: ", payload);

//       const response = await fetch(
//         "https://api.upswap.app/api/vendor-kyc/create/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json", // ✅ Correct content type
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//           body: JSON.stringify(payload), // ✅ Send as JSON
//         }
//       );

//       // "application/json",
//       const result = await response.json();

//       if (response.ok) {
//         console.log("✅ KYC Submitted Successfully:", result);
//         alert("KYC Submitted Successfully!");
//       } else {
//         console.error("❌ API Error:", result);
//         alert(`API Error: ${result?.detail || "Something went wrong."}`);
//       }
//     } catch (error) {
//       console.error("❌ LocalStorage/Data Parse Error:", error);
//       alert("Something went wrong while submitting KYC data.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-500 to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
//           Become a Vendor
//         </h2>

//         <div className="bg-orange-500 text-white p-3 rounded-lg text-lg font-semibold flex justify-between my-4">
//           Choose Business Hours <span className="cursor-pointer">▼</span>
//         </div>

//         <div className="bg-white border rounded-lg border-orange-400 p-3 my-4">
//           {businessHours.map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col sm:flex-row justify-between items-center py-2 border-b last:border-0 gap-2"
//             >
//               <span className="text-gray-700 font-medium w-[80px]">
//                 {item.day}
//               </span>

//               {item.editing ? (
//                 <div className="flex gap-2 items-center">
//                   <TimePicker
//                     onChange={(value) =>
//                       handleTimeChange(index, "start", value)
//                     }
//                     value={item.start}
//                     disableClock
//                     clearIcon={null}
//                   />
//                   <span className="text-gray-600 text-center ml-5">to</span>
//                   <TimePicker
//                     onChange={(value) => handleTimeChange(index, "end", value)}
//                     value={item.end}
//                     disableClock
//                     clearIcon={null}
//                   />
//                 </div>
//               ) : (
//                 <span className="text-gray-600 w-[150px] text-center">
//                   {item.start} - {item.end}
//                 </span>
//               )}

//               {item.editing ? (
//                 <FaCheck
//                   className="text-green-600 cursor-pointer ml-5"
//                   onClick={() => handleSave(index)}
//                 />
//               ) : (
//                 <FaPen
//                   className="text-gray-500 cursor-pointer mx-2"
//                   onClick={() => handleEditClick(index)}
//                 />
//               )}

//               <label className="relative inline-flex items-center cursor-pointer ml-2">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={item.active}
//                   onChange={() => handleToggle(index)}
//                 />
//                 <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-orange-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
//               </label>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center gap-2 my-4">
//           <input
//             type="checkbox"
//             className="w-5 h-5 border border-orange-500 rounded-md"
//           />
//           <span className="text-gray-600">
//             Share a few details to enhance your Upswap experience
//           </span>
//         </div>

//         {/* ✅ Three Buttons */}
//         <div className="flex justify-between mt-6 gap-2">
//           <button
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full"
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </button>

//           <button
//             className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 w-full"
//             onClick={handleSaveToLocal}
//           >
//             Save Data
//           </button>

//           <button
//             className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-full"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorForm;

// import React, { useState } from "react";
// import { FaPlus, FaPen, FaCheck } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";

// const ServiceTime = () => {
//   const navigate = useNavigate();
//   const [businessHours, setBusinessHours] = useState([
//     { day: "Sunday", start: "11:00", end: "19:00", active: true, editing: false },
//     { day: "Monday", start: "10:00", end: "20:00", active: true, editing: false },
//     { day: "Tuesday", start: "10:00", end: "20:00", active: true, editing: false },
//     { day: "Wednesday", start: "10:00", end: "20:00", active: true, editing: false },
//     { day: "Thursday", start: "10:00", end: "20:00", active: true, editing: false },
//     { day: "Friday", start: "10:00", end: "20:00", active: true, editing: false },
//     { day: "Saturday", start: "10:00", end: "20:00", active: true, editing: false },
//   ]);

//   const handleToggle = (index) => {
//     const updated = [...businessHours];
//     updated[index].active = !updated[index].active;
//     setBusinessHours(updated);
//   };

//   const handleEditClick = (index) => {
//     const updated = [...businessHours];
//     updated[index].editing = true;
//     setBusinessHours(updated);
//   };

//   const handleTimeChange = (index, key, value) => {
//     const updated = [...businessHours];
//     updated[index][key] = value;
//     setBusinessHours(updated);
//   };

//   const handleSave = (index) => {
//     const updated = [...businessHours];
//     updated[index].editing = false;
//     setBusinessHours(updated);
//   };

//   const handleSaveToLocal = () => {
//     localStorage.setItem("businessHours", JSON.stringify(businessHours));
//     alert("Business hours saved locally ✅");
//   };

//   const handleSubmit = async () => {
//     try {
//       const vendorData = JSON.parse(localStorage.getItem("vendorData"));
//       const address = JSON.parse(localStorage.getItem("address"));
//       const serviceData = JSON.parse(localStorage.getItem("serviceData"));

//       const rawBusinessDocs = JSON.parse(localStorage.getItem("uploaded_business_documents") || "[]");
//       const businessDocuments = rawBusinessDocs.map((doc) => {
//         if (typeof doc === "string") {
//           return {
//             document_url: doc,
//             document_type: "Business Document",
//           };
//         }
//         return doc; // If already object, keep it as is
//       });

//       const rawBusinessImages = JSON.parse(localStorage.getItem("uploaded_images") || "[]");
//       const businessImages = rawBusinessImages.map((img) => {
//         if (typeof img === "string") {
//           return {
//             image_url: img,
//             image_type: "Business Image",
//           };
//         }
//         return img;
//       });

//       const profilePicUrl = localStorage.getItem("profile_image_url");
//       const userId = localStorage.getItem("user_id");

//       const bankDetails = {
//         bank_account_number: localStorage.getItem("bank_account_number"),
//         retype_bank_account_number: localStorage.getItem("retype_bank_account_number"),
//         bank_name: localStorage.getItem("bank_name"),
//         ifsc_code: localStorage.getItem("ifsc_code"),
//       };

//       const country_code = localStorage.getItem("country_code") || "";
//       const dial_code = localStorage.getItem("dial_code") || "";

//       const rawBusinessHours = JSON.parse(localStorage.getItem("businessHours"));
//       const formattedHours = rawBusinessHours
//         .filter((day) => day.active)
//         .map((day) => ({
//           day: day.day,
//           time: formatTimeRange(day.start, day.end),
//         }));

//       const payload = {
//         profile_pic: profilePicUrl,
//         user: userId,
//         country_code,
//         dial_code,
//         full_name: vendorData?.full_name || "",
//         phone_number: vendorData?.phone_number || "",
//         business_email_id: vendorData?.business_email_id || "",
//         business_establishment_year: vendorData?.business_establishment_year || "",
//         business_description: vendorData?.business_description || "",
//         uploaded_business_documents: businessDocuments,
//         uploaded_images: businessImages,
//         same_as_personal_phone_number: true,
//         same_as_personal_email_id: true,
//         addresses: [address],
//         ...bankDetails,
//         services: [serviceData],
//         business_hours: formattedHours,
//       };

//       console.log("🚀 Final Payload:", payload);
//       console.log("businessDocuments", businessDocuments);
//       console.log("businessImages", businessImages);

//       const response = await fetch("https://api.upswap.app/api/vendor-kyc/create/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("access")}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("✅ KYC Submitted Successfully:", result);
//         alert("KYC Submitted Successfully!");
//         navigate("/success"); // Optional redirect
//       } else {
//         console.error("❌ API Error:", result);
//         alert(`API Error: ${result?.detail || "Something went wrong."}`);
//       }
//     } catch (error) {
//       console.error("❌ Submission Error:", error);
//       alert("Something went wrong while submitting KYC data.");
//     }
//   };
//     const formatTimeRange = (start, end) => {
//     const to12hr = (time) => {
//       const [h, m] = time.split(":");
//       const hour = parseInt(h);
//       const suffix = hour >= 12 ? "PM" : "AM";
//       const hr12 = hour % 12 || 12;
//       return `${hr12}:${m} ${suffix}`;
//     };
//     return `${to12hr(start)} - ${to12hr(end)}`;
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Set Business Hours</h2>
//       <ul>
//         {businessHours.map((item, index) => (
//           <li key={item.day} className="mb-4 border-b pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-2">
//               <button onClick={() => handleToggle(index)} className={`px-2 py-1 rounded ${item.active ? "bg-green-500 text-white" : "bg-gray-300"}`}>
//                 {item.active ? "Open" : "Closed"}
//               </button>
//               <span className="font-semibold">{item.day}</span>
//             </div>

//             <div className="flex items-center gap-2 mt-2 sm:mt-0">
//               {item.editing ? (
//                 <>
//                   <TimePicker value={item.start} onChange={(value) => handleTimeChange(index, "start", value)} />
//                   <TimePicker value={item.end} onChange={(value) => handleTimeChange(index, "end", value)} />
//                   <button onClick={() => handleSave(index)} className="text-green-600"><FaCheck /></button>
//                 </>
//               ) : (
//                 <>
//                   <span>{item.start} - {item.end}</span>
//                   <button onClick={() => handleEditClick(index)} className="text-blue-600"><FaPen /></button>
//                 </>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="flex gap-4 mt-6">
//         <button onClick={handleSaveToLocal} className="bg-blue-600 text-white px-4 py-2 rounded">Save to Local</button>
//         <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
//       </div>
//     </div>
//   );
// };

// export default ServiceTime;

import React, { useState } from "react";
import { FaPlus, FaPen, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const ServiceTime = () => {
  const navigate = useNavigate();
  const [businessHours, setBusinessHours] = useState([
    {
      day: "Sunday",
      start: "11:00",
      end: "19:00",
      active: true,
      editing: false,
    },
    {
      day: "Monday",
      start: "10:00",
      end: "20:00",
      active: true,
      editing: false,
    },
    {
      day: "Tuesday",
      start: "10:00",
      end: "20:00",
      active: true,
      editing: false,
    },
    {
      day: "Wednesday",
      start: "10:00",
      end: "20:00",
      active: true,
      editing: false,
    },
    {
      day: "Thursday",
      start: "10:00",
      end: "20:00",
      active: true,
      editing: false,
    },
    {
      day: "Friday",
      start: "10:00",
      end: "20:00",
      active: true,
      editing: false,
    },
    {
      day: "Saturday",
      start: "10:00",
      end: "20:00",
      active: true,
      editing: false,
    },
  ]);

  const handleToggle = (index) => {
    const updated = [...businessHours];
    updated[index].active = !updated[index].active;
    setBusinessHours(updated);
  };

  const handleEditClick = (index) => {
    const updated = [...businessHours];
    updated[index].editing = true;
    setBusinessHours(updated);
  };

  const handleTimeChange = (index, key, value) => {
    const updated = [...businessHours];
    updated[index][key] = value;
    setBusinessHours(updated);
  };

  const handleSave = (index) => {
    const updated = [...businessHours];
    updated[index].editing = false;
    setBusinessHours(updated);
  };

  const handleSaveToLocal = () => {
    localStorage.setItem("businessHours", JSON.stringify(businessHours));
    alert("Business hours saved locally ✅");
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const vendorData = JSON.parse(localStorage.getItem("vendorData"));
      const address = JSON.parse(localStorage.getItem("address"));
      const serviceData = JSON.parse(localStorage.getItem("serviceData"));

      const rawBusinessDocs = JSON.parse(
        localStorage.getItem("uploaded_business_documents") || "[]"
      );
      const businessDocuments = rawBusinessDocs.map((doc) =>
        typeof doc === "string" && isValidUrl(doc)
          ? { document_url: doc, document_type: "Business Document" }
          : doc
      );

      const rawBusinessImages = JSON.parse(
        localStorage.getItem("uploaded_images") || "[]"
      );
      const businessImages = rawBusinessImages.map((img) =>
        typeof img === "string" && isValidUrl(img)
          ? { image_url: img, image_type: "Business Image" }
          : img
      );

      const profilePicUrl = localStorage.getItem("profile_image_url");
      if (profilePicUrl && !isValidUrl(profilePicUrl)) {
        alert("Profile image URL is not valid.");
        return;
      }

      const userId = localStorage.getItem("user_id");

      const bankDetails = {
        bank_account_number: localStorage.getItem("bank_account_number"),
        retype_bank_account_number: localStorage.getItem(
          "retype_bank_account_number"
        ),
        bank_name: localStorage.getItem("bank_name"),
        ifsc_code: localStorage.getItem("ifsc_code"),
      };

      const country_code = localStorage.getItem("country_code") || "";
      const dial_code = localStorage.getItem("dial_code") || "";

      const rawBusinessHours = JSON.parse(
        localStorage.getItem("businessHours")
      );
      const formattedHours = rawBusinessHours
        .filter((day) => day.active)
        .map((day) => ({
          day: day.day,
          time: formatTimeRange(day.start, day.end),
        }));

      const formData = {
        profile_pic: profilePicUrl,
        user: userId,
        full_name: vendorData?.full_name || "",
        phone_number: vendorData?.phone_number || "",
        business_email_id: "",
        business_establishment_year: 2020,
        business_description: "Everything is fine.",
        uploaded_business_documents: JSON.parse(localStorage.getItem("uploaded_business_documents1")),  // businessDocuments?.map(
          // (url) => url.document_url
        // ),
        uploaded_images: JSON.parse(localStorage.getItem("uploaded_images1")), // businessImages?.map((url) => url.image_url),
        // [
        //   businessImages,
        //   {
        //     thumbnail:
        //       "https://upswap-assets.b-cdn.net/vendor_kyc/thumbnail_asset_53fc1ef0-cec4-43a1-ae33-65c19c485124.webp",
        //     compressed:
        //       "https://upswap-assets.b-cdn.net/vendor_kyc/asset_53fc1ef0-cec4-43a1-ae33-65c19c485124.webp",
        //   },
        // ],
        same_as_personal_phone_number: true,
        same_as_personal_email_id: true,
        addresses: [
          {
            house_no_building_name: address?.house_no_building_name || "",
            road_name_area_colony: address?.road_name_area_colony || "",
            country_code,
            dial_code,
            state: address?.state || "",
            city: address?.city || "",
            pincode: "360578",
            latitude: "21.63366",
            longitude: "69.627973",
          },
          {
            house_no_building_name: "402/2",
            road_name_area_colony: "Mathura-Vrindavan",
            country: "India",
            state: "Uttar Pradesh",
            city: "Agra",
            pincode: "281122",
            latitude: "28.06081",
            longitude: "76.59947",
          },
        ],
        country_code: "IN",
        dial_code: "+91",
        bank_account_number: "12345678901",
        retype_bank_account_number: "12345678901",
        bank_name: "HDFC",
        ifsc_code: "HDFC0000001",
        services: [
          {
            service_category: "Others",
            item_name: "Drawing Class",
            item_description: "All types of drawings.",
            item_price: "500",
          },
          {
            service_category: "Consultants",
            item_name: "Consulting",
            item_description: "Consulting",
            item_price: "500",
          },
        ],
        business_hours: [
          { day: "Sunday", time: "11:00 AM - 7:00 PM" },
          { day: "Monday", time: "10:00 AM - 8:00 PM" },
          { day: "Tuesday", time: "10:00 AM - 8:00 PM" },
          { day: "Wednesday", time: "10:00 AM - 8:00 PM" },
          { day: "Thursday", time: "10:00 AM - 8:00 PM" },
          { day: "Friday", time: "10:00 AM - 8:00 PM" },
          { day: "Saturday", time: "10:00 AM - 8:00 PM" },
        ],
      };

      const payload = {
        profile_pic: profilePicUrl,
        user: userId,
        country_code,
        dial_code,
        full_name: vendorData?.full_name || "",
        phone_number: vendorData?.phone_number || "",
        business_email_id: vendorData?.business_email_id || "",
        business_establishment_year:
          vendorData?.business_establishment_year || "",
        business_description: vendorData?.business_description || "",
        uploaded_business_documents: JSON.parse(localStorage.getItem("uploaded_business_documents1")),
        uploaded_images: JSON.parse(localStorage.getItem("uploaded_images1")),
        same_as_personal_phone_number: true,
        same_as_personal_email_id: true,
        addresses: [address],
        ...bankDetails,
        services: [serviceData],
        business_hours: formattedHours,
      };

      console.log("🚀 Final Payload:", payload);

      const response = await fetch(
        "https://api.upswap.app/api/vendor-kyc/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("✅ KYC Submitted Successfully:", result);
        alert("KYC Submitted Successfully!");
        navigate("/success");
      } else {
        console.error("❌ API Error:", result);
        alert(`API Error: ${result?.message?.[0] || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("❌ Submission Error:", error);
      alert("Something went wrong while submitting KYC data.");
    }
  };

  const formatTimeRange = (start, end) => {
    const to12hr = (time) => {
      const [h, m] = time.split(":");
      const hour = parseInt(h);
      const suffix = hour >= 12 ? "PM" : "AM";
      const hr12 = hour % 12 || 12;
      return `${hr12}:${m} ${suffix}`;
    };
    return `${to12hr(start)} - ${to12hr(end)}`;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Set Business Hours</h2>
      <ul>
        {businessHours.map((item, index) => (
          <li
            key={item.day}
            className="mb-4 border-b pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(index)}
                className={`px-2 py-1 rounded ${
                  item.active ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
              >
                {item.active ? "Open" : "Closed"}
              </button>
              <span className="font-semibold">{item.day}</span>
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {item.editing ? (
                <>
                  <TimePicker
                    value={item.start}
                    onChange={(value) =>
                      handleTimeChange(index, "start", value)
                    }
                  />
                  <TimePicker
                    value={item.end}
                    onChange={(value) => handleTimeChange(index, "end", value)}
                  />
                  <button
                    onClick={() => handleSave(index)}
                    className="text-green-600"
                  >
                    <FaCheck />
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {item.start} - {item.end}
                  </span>
                  <button
                    onClick={() => handleEditClick(index)}
                    className="text-blue-600"
                  >
                    <FaPen />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSaveToLocal}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save to Local
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ServiceTime;
