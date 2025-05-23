// import React, { useState } from "react";
// import { FaPen, FaCheck, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ServiceTime = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(true);
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
//   const handleClose = () => {
//     navigate("/AddService"); // 👈 Navigate to previous page
//   };

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
//     toast.success("Business hours saved locally ✅");
//   };

//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const vendorData = JSON.parse(localStorage.getItem("vendorData"));
//       const address = JSON.parse(localStorage.getItem("address"));
//       const serviceData = JSON.parse(localStorage.getItem("serviceData"));
//       const rawBusinessDocs = JSON.parse(
//         localStorage.getItem("uploaded_business_documents1") || "[]"
//       );
//       // const uploaded_business_documents = rawBusinessDocs;
//       const uploaded_business_documents = rawBusinessDocs.flat();

//       const rawBusinessImages = JSON.parse(
//         localStorage.getItem("uploaded_images1") || "[]"
//       );
//       const uploaded_images = rawBusinessImages.map((imgData) => ({
//         thumbnail: imgData?.thumbnailUrl || "",
//         compressed: imgData?.compressedUrl || "",
//       }));

//       const profilePicUrl = localStorage.getItem("profile_image_url");
//       if (profilePicUrl && !isValidUrl(profilePicUrl)) {
//         toast.warning("Profile image URL is not valid.");
//         return;
//       }
//       const userId = localStorage.getItem("user_id");
//       const bankDetails = {
//         bank_account_number: localStorage.getItem("bank_account_number"),
//         retype_bank_account_number: localStorage.getItem(
//           "retype_bank_account_number"
//         ),
//         bank_name: localStorage.getItem("bank_name"),
//         ifsc_code: localStorage.getItem("ifsc_code"),
//       };
//       const country = localStorage.getItem("country") || "";
//       const country_code = localStorage.getItem("country_code") || "";
//       const dial_code = localStorage.getItem("dial_code") || "";
//       const rawBusinessHours = JSON.parse(
//         localStorage.getItem("businessHours")
//       );
//       const formattedHours = rawBusinessHours
//         .filter((day) => day.active)
//         .map((day) => ({
//           day: day.day,
//           time: formatTimeRange(day.start, day.end),
//         }));
//       const formData = {
//         profile_pic: vendorData?.profile_pic || "",
//         user: userId,
//         country: country,
//         country_code,
//         dial_code,
//         full_name: vendorData?.full_name || "",
//         phone_number: vendorData?.phone_number || "",
//         business_email_id: vendorData?.business_email_id || "",
//         business_establishment_year:
//           vendorData?.business_establishment_year || "",
//         business_description: vendorData?.business_description || "",
//         // uploaded_business_documents: JSON.parse(
//         //   localStorage.getItem("uploaded_business_documents1") || "[]"
//         // ),
//         uploaded_business_documents: uploaded_business_documents,
//         uploaded_images: JSON.parse(
//           localStorage.getItem("uploaded_images1") || "[]"
//         ).map((imgData) => ({
//           thumbnail: imgData?.thumbnailUrl || "",
//           compressed: imgData?.compressedUrl || "",
//         })),
//         same_as_personal_phone_number: true,
//         same_as_personal_email_id: true,
//         addresses: [
//           {
//             house_no_building_name: address?.house_no_building_name || "",
//             road_name_area_colony: address?.road_name_area_colony || "",
//             country: address?.country || "",
//             country_code,
//             dial_code,
//             state: address?.state || "",
//             city: address?.city || "",
//             pincode: address?.pincode || "",
//             latitude: address?.latitude,
//             longitude: address?.longitude,
//           },
//         ],
//         bank_account_number: bankDetails?.bank_account_number || "",
//         retype_bank_account_number:
//           bankDetails?.retype_bank_account_number || "",
//         bank_name: bankDetails?.bank_name || "",
//         ifsc_code: bankDetails?.ifsc_code || "",
//         services: [
//           {
//             service_category: serviceData?.service_category || "",
//             item_name: serviceData?.item_name || "",
//             item_description: serviceData?.item_description || "",
//             item_price: serviceData?.item_price || "",
//           },
//         ],
//         business_hours: formattedHours,
//         latitude: address?.latitude,
//         longitude: address?.longitude,
//       };

//       const response = await fetch(
//         "https://api.upswap.app/api/vendor-kyc/create/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access")}`,
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         toast.success("KYC Submitted Successfully!");
//         if (result?.vendor_kyc) {
//           localStorage.setItem("vendor_id", result.vendor_kyc.vendor_id);
//         }
//         localStorage.removeItem("vendorData");
//         localStorage.removeItem("address");
//         localStorage.removeItem("serviceData");
//         localStorage.removeItem("uploaded_business_documents1");
//         localStorage.removeItem("uploaded_images1");
//         localStorage.removeItem("bank_account_number");
//         localStorage.removeItem("retype_bank_account_number");
//         localStorage.removeItem("bank_name");
//         localStorage.removeItem("ifsc_code");
//         localStorage.removeItem("businessHours");
//         localStorage.removeItem("profile_image_url");
//         localStorage.removeItem("country");
//         localStorage.removeItem("country_code");
//         localStorage.removeItem("dial_code");
//         localStorage.removeItem("address_added");
//         localStorage.removeItem("latitude");
//         localStorage.removeItem("longitude")
//         navigate("/DealsPage"); // Optional redirect
//       } else {
//         console.error("❌ API Error:", result);
//         toast.warn(
//           `API Error: ${result?.message?.[0] || "Something went wrong."}`
//         );
//       }
//     } catch (error) {
//       console.error("❌ Submission Error:", error);
//       toast.warn("Something went wrong while submitting KYC data.");
//     }
//   };

//   const formatTimeRange = (start, end) => {
//     const to12hr = (time) => {
//       const [h, m] = time.split(":");
//       const hour = parseInt(h);
//       const suffix = hour >= 12 ? "PM" : "AM";
//       const hr12 = hour % 12 || 12;
//       return `${hr12}:${m} ${suffix}`;
//     };
//     return `${to12hr(start)} - ${to12hr(end)}`;
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen border-2 bg-[#FE7A3A] to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <div className="bg-white p-1 rounded-xl w-full max-w-md relative">
//           {/* Close Button Outside the Top-Right of Heading */}
//           <button
//             onClick={handleClose}
//             className="absolute -top-4 -right-4 bg-white text-gray-600 rounded-full hover:text-[#FE7A3A] z-10"
//           >
//             <FaTimes size={20} />
//           </button>

//           <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
//             Become a Vendor
//           </h2>
//         </div>

//         <div
//           className="bg-orange-500 text-white p-3 rounded-lg text-lg font-semibold flex justify-between my-4 cursor-pointer"
//           onClick={toggleDropdown}
//         >
//           Choose Business Hours{" "}
//           <span className={`cursor-pointer ${isOpen ? "rotate-180" : ""}`}>
//             ▼
//           </span>
//         </div>

//         {isOpen && (
//           <div className="bg-white border rounded-lg border-[#FE7A3A] p-3 my-4">
//             {businessHours.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col sm:flex-row justify-between items-center py-2 border-b last:border-0 gap-2"
//               >
//                 <span className="text-gray-700 font-medium w-[80px]">
//                   {item.day}
//                 </span>

//                 {item.editing ? (
//                   <div className="flex gap-2 items-center">
//                     <TimePicker
//                       onChange={(value) =>
//                         handleTimeChange(index, "start", value)
//                       }
//                       value={item.start}
//                       disableClock
//                       clearIcon={null}
//                     />
//                     <span className="text-gray-600 text-center ml-5">to</span>
//                     <TimePicker
//                       onChange={(value) =>
//                         handleTimeChange(index, "end", value)
//                       }
//                       value={item.end}
//                       disableClock
//                       clearIcon={null}
//                     />
//                   </div>
//                 ) : (
//                   <span className="text-gray-600 w-[150px] text-center">
//                     {item.start} - {item.end}
//                   </span>
//                 )}

//                 {item.editing ? (
//                   <FaCheck
//                     className="text-green-600 cursor-pointer ml-5"
//                     onClick={() => handleSave(index)}
//                   />
//                 ) : (
//                   <FaPen
//                     className="text-gray-500 cursor-pointer mx-2"
//                     onClick={() => handleEditClick(index)}
//                   />
//                 )}

//                 <label className="relative inline-flex items-center cursor-pointer ml-2">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={item.active}
//                     onChange={() => handleToggle(index)}
//                   />
//                   <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-[#FE7A3A] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
//                 </label>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="flex items-center gap-2 my-4">
//           <input
//             type="checkbox"
//             className="w-5 h-5 border border[#FE7A3A] rounded-md"
//           />
//           <span className="text-gray-600">
//             Share a few details to enhance your Upswap experience
//           </span>
//         </div>

//         {/* ✅ Three Buttons */}
//         <div className="flex justify-between mt-6 gap-2">
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//             onClick={handleSaveToLocal}
//           >
//             Save Data
//           </button>

//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </div>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// };

// export default ServiceTime;
import React, { useState, useEffect } from "react";
import { FaPen, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceTime = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
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
  const [isBusinessHoursValid, setIsBusinessHoursValid] = useState(true); // Assume valid initially
  const handleClose = () => {
    navigate("/AddService"); // 👈 Navigate to previous page
  };

  useEffect(() => {
    // Basic validation: Check if at least one day is active
    const isAnyDayActive = businessHours.some((day) => day.active);
    setIsBusinessHoursValid(isAnyDayActive);
  }, [businessHours]);

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

  const saveBusinessHoursToLocal = () => {
    localStorage.setItem("businessHours", JSON.stringify(businessHours));
    // toast.success("Business hours saved locally ✅");
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
    saveBusinessHoursToLocal(); // Save to local storage first

    if (!isBusinessHoursValid) {
      toast.warn("Please select at least one day for your business hours.");
      return;
    }

    try {
      const vendorData = JSON.parse(localStorage.getItem("vendorData"));
      const fulladdress = JSON.parse(localStorage.getItem("address"));
      console.log("Address:", fulladdress);
      const serviceData = JSON.parse(localStorage.getItem("serviceData"));
      const rawBusinessDocs = JSON.parse(
        localStorage.getItem("uploaded_business_documents1") || "[]"
      );
      const uploaded_business_documents = rawBusinessDocs.flat();

      const rawBusinessImages = JSON.parse(
        localStorage.getItem("uploaded_images1") || "[]"
      );
      const uploaded_images = rawBusinessImages.map((imgData) => ({
        thumbnail: imgData?.thumbnailUrl || "",
        compressed: imgData?.compressedUrl || "",
      }));

      const profilePicUrl = localStorage.getItem("profile_image_url");
      if (profilePicUrl && !isValidUrl(profilePicUrl)) {
        toast.warning("Profile image URL is not valid.");
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
      // const country = localStorage.getItem("country") || "";
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
        profile_pic: vendorData?.profile_pic || "",
        user: userId,
        // country: country,
        country_code,
        dial_code,
        full_name: vendorData?.full_name || "",
        phone_number: vendorData?.phone_number || "",
        business_email_id: vendorData?.business_email_id || "",
        business_establishment_year:
          vendorData?.business_establishment_year || "",
        business_description: vendorData?.business_description || "",
        uploaded_business_documents: uploaded_business_documents,
        uploaded_images: JSON.parse(
          localStorage.getItem("uploaded_images1") || "[]"
        ).map((imgData) => ({
          thumbnail: imgData?.thumbnailUrl || "",
          compressed: imgData?.compressedUrl || "",
        })),
        same_as_personal_phone_number: true,
        same_as_personal_email_id: true,
        addresses: [
          {
            house_no_building_name: fulladdress?.house_no_building_name || "",
            road_name_area_colony: fulladdress?.road_name_area_colony || "",
            country: fulladdress?.country || "",
            
            state: fulladdress?.state || "",
            city: fulladdress?.city || "",
            pincode: fulladdress?.pincode || "",
            latitude: fulladdress?.latitude,
            longitude: fulladdress?.longitude,
          },
        ],
        bank_account_number: bankDetails?.bank_account_number || "",
        retype_bank_account_number:
          bankDetails?.retype_bank_account_number || "",
        bank_name: bankDetails?.bank_name || "",
        ifsc_code: bankDetails?.ifsc_code || "",
        services: [
          {
            service_category: serviceData?.service_category || "",
            item_name: serviceData?.item_name || "",
            item_description: serviceData?.item_description || "",
            item_price: serviceData?.item_price || "",
          },
        ],
        business_hours: formattedHours,
        latitude: fulladdress?.latitude,
        longitude: fulladdress?.longitude,
      };

      const response = await fetch(
        "https://api.upswap.app/api/vendor-kyc/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("KYC Submitted Successfully!");
        if (result?.vendor_kyc) {
          localStorage.setItem("vendor_id", result.vendor_kyc.vendor_id);
        }
        localStorage.removeItem("vendorData");
        localStorage.removeItem("address");
        localStorage.removeItem("serviceData");
        localStorage.removeItem("uploaded_business_documents1");
        localStorage.removeItem("uploaded_images1");
        localStorage.removeItem("bank_account_number");
        localStorage.removeItem("retype_bank_account_number");
        localStorage.removeItem("bank_name");
        localStorage.removeItem("ifsc_code");
        localStorage.removeItem("businessHours");
        localStorage.removeItem("profile_image_url");
        localStorage.removeItem("country");
        localStorage.removeItem("country_code");
        localStorage.removeItem("dial_code");
        localStorage.removeItem("address_added");
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");
        navigate("/DealsPage"); // Optional redirect
      } else {
        console.error("❌ API Error:", result);
        toast.warn(
          `API Error: ${result?.message?.[0] || "Something went wrong."}`
        );
      }
    } catch (error) {
      console.error("❌ Submission Error:", error);
      toast.warn("Something went wrong while submitting KYC data.");
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center min-h-screen border-2 bg-[#FE7A3A] to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="bg-white p-1 rounded-xl w-full max-w-md relative">
          {/* Close Button Outside the Top-Right of Heading */}
          <button
            onClick={handleClose}
            className="absolute -top-4 -right-4 bg-white text-gray-600 rounded-full hover:text-[#FE7A3A] z-10"
          >
            <FaTimes size={20} />
          </button>

          <h2 className="text-xl font-semibold text-center text-white bg-[#FE7A3A] py-3 rounded-lg">
            Become a Vendor
          </h2>
        </div>

        <div
          className="bg-orange-500 text-white p-3 rounded-lg text-lg font-semibold flex justify-between my-4 cursor-pointer"
          onClick={toggleDropdown}
        >
          Choose Business Hours{" "}
          <span className={`cursor-pointer ${isOpen ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>

        {isOpen && (
          <div className="bg-white border rounded-lg border-[#FE7A3A] p-3 my-4">
            {businessHours.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-center py-2 border-b last:border-0 gap-2"
              >
                <span className="text-gray-700 font-medium w-[80px]">
                  {item.day}
                </span>

                {item.editing ? (
                  <div className="flex gap-2 items-center">
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(index, "start", value)
                      }
                      value={item.start}
                      disableClock
                      clearIcon={null}
                    />
                    <span className="text-gray-600 text-center ml-5">to</span>
                    <TimePicker
                      onChange={(value) =>
                        handleTimeChange(index, "end", value)
                      }
                      value={item.end}
                      disableClock
                      clearIcon={null}
                    />
                  </div>
                ) : (
                  <span className="text-gray-600 w-[150px] text-center">
                    {item.start} - {item.end}
                  </span>
                )}

                {item.editing ? (
                  <FaCheck
                    className="text-green-600 cursor-pointer ml-5"
                    onClick={() => handleSave(index)}
                  />
                ) : (
                  <FaPen
                    className="text-gray-500 cursor-pointer mx-2"
                    onClick={() => handleEditClick(index)}
                  />
                )}

                <label className="relative inline-flex items-center cursor-pointer ml-2">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.active}
                    onChange={() => handleToggle(index)}
                  />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-[#FE7A3A] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 my-4">
          <input
            type="checkbox"
            className="w-5 h-5 border border[#FE7A3A] rounded-md"
          />
          <span className="text-gray-600">
            Share a few details to enhance your Upswap experience
          </span>
        </div>

        {/* ✅ Three Buttons */}
        <div className="flex justify-end mt-6 gap-2">
          <button
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
            onClick={handleSubmit}
            disabled={!isBusinessHoursValid}
            style={{
              opacity: !isBusinessHoursValid ? 0.5 : 1,
              cursor: !isBusinessHoursValid ? "not-allowed" : "pointer",
            }}
          >
            Submit
          </button>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ServiceTime;
