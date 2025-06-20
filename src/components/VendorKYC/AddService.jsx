// import React, { useState, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const AddService = ({ onClose }) => {
//   const navigate = useNavigate();
//   const [vendorData, setVendorData] = useState(null);

//   const [formData, setFormData] = useState({
//     item_name: "",
//     service_category: "",
//     item_description: "",
//     item_price: "",
//   });
//   const vendorId = localStorage.getItem("vendor_id");
//   useEffect(() => {
//     const fetchVendorDetails = async () => {
//       try {
//         const token = localStorage.getItem("access");
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = response.data;
//         console.log("Fetched vendor details:", data);
//         setVendorData(data);

//         if (data.services && data.services.length > 0) {
//           const service = data.services[0]; // 👈 pick the first service

//           setFormData({
//             item_description: service.item_description || "",
//             item_name: service.item_name || "",
//             item_price: service.item_price || "",
//             service_category: service.service_category || "",
//           });
//         }
//       } catch (error) {
//         console.error("Vendor details fetch error:", error);
//         toast.error("Failed to fetch vendor details");
//       }
//     };

//     fetchVendorDetails();
//   }, [vendorId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddService = () => {
//     localStorage.setItem("serviceData", JSON.stringify(formData));
//     toast.success("Service saved successfully!");
//   };

//   const handleNext = () => {
//     const { item_name, service_category, item_description, item_price } =
//       formData;

//     if (
//       !item_name.trim() ||
//       !service_category.trim() ||
//       !item_description.trim() ||
//       !item_price.trim()
//     ) {
//       toast.warn("Please fill all fields before proceeding.");
//       return;
//     }

//     localStorage.setItem("serviceData", JSON.stringify(formData));
//     navigate("/ServiceTime");
//   };

//   const handleClose = () => {
//     if (onClose) {
//       onClose();
//     } else {
//       navigate("/BankDetails");
//     }
//   };
//   return (
//     <div className="flex justify-center items-center border-2 min-h-screen bg-[#FE7A3A] to-white p-4 rounded-lg">
//       <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         {/* ❌ Cross Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-[#FE7A3A]"
//         >
//           <FaTimes size={20} />
//         </button>

//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Add Service</h2>
//         </div>

//         {/* Input Fields */}
//         <input
//           type="text"
//           name="item_name"
//           value={formData.item_name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Item name"
//         />

//         <select
//           name="service_category"
//           value={formData.service_category}
//           onChange={handleChange}
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

//         <textarea
//           name="item_description"
//           value={formData.item_description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Item description"
//           rows="3"
//         ></textarea>

//         <input
//           type="number"
//           name="item_price"
//           value={formData.item_price}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="₹ Item price"
//         />

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             onClick={handleAddService}
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//           >
//             Add Service
//           </button>
//           <button
//             onClick={handleNext}
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddService;
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddService = ({ onClose }) => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    item_name: "",
    service_category: "",
    item_description: "",
    item_price: "",
  });
  const vendorId = localStorage.getItem("vendor_id");

  useEffect(() => {
    const localServiceData = localStorage.getItem("serviceData");

    if (localServiceData) {
      console.log("Loading service data from localStorage");
      setFormData(JSON.parse(localServiceData));
    } else {
      const fetchVendorDetails = async () => {
        try {
          const token = localStorage.getItem("access");
          const response = await axios.get(
            `https://api.upswap.app/api/vendor/details/${vendorId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = response.data;
          console.log("Fetched vendor details:", data);
          setVendorData(data);

          if (data.services && data.services.length > 0) {
            const service = data.services[0]; // 👈 pick the first service

            setFormData({
              item_description: service.item_description || "",
              item_name: service.item_name || "",
              item_price: service.item_price || "",
              service_category: service.service_category || "",
            });
          }
        } catch (error) {
          console.error("Vendor details fetch error:", error);
          toast.error("Failed to fetch vendor details");
        }
      };

      fetchVendorDetails();
    }
  }, [vendorId]);

  useEffect(() => {
    const { item_name, service_category, item_description, item_price } =
      formData;
    const isValid =
      item_name.trim() !== "" &&
      service_category.trim() !== "" &&
      item_description.trim() !== "" &&
      item_price.trim() !== "";
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!isFormValid) {
      toast.warn("Please fill all fields before proceeding.");
      return;
    }

    localStorage.setItem("serviceData", JSON.stringify(formData));
    navigate("/ServiceTime");
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/BankDetails");
    }
  };

  return (
    // <div className="flex justify-center  items-center border-2 min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
    //  {/* <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl rounded-md mx-auto bg-gradient-to-b from-orange-400 to-white"> */}
    //  <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md justify-center items-center mx-auto">

    <div className="py-8 px-4 sm:px-6 md:px-8 max-w-screen-2xl min-h- rounded-md mx-auto bg-gradient-to-b from-orange-400 to-white">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md justify-center items-center mx-auto">
        {/* <ToastContainer position="top-center" autoClose={3000} /> */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-[#FE7A3A]"
        >
          <FaTimes size={18} />
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Service</h2>
        </div>

        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={(e) => {
            const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
            handleChange({
              target: { name: "item_name", value: onlyLetters },
            });
          }}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Item name"
        />

        <select
          name="service_category"
          value={formData.service_category}
          onChange={handleChange}
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

        <textarea
          name="item_description"
          value={formData.item_description}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Item description"
          rows="3"
        ></textarea>

        <input
          inputMode="numeric"
          pattern="\d*"
          name="item_price"
          value={formData.item_price}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/[^\d]/g, "");
            handleChange({
              target: { name: "item_price", value: onlyNumbers },
            });
          }}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="₹ Item price"
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleNext}
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
            disabled={!isFormValid}
            style={{
              opacity: !isFormValid ? 0.5 : 1,
              cursor: !isFormValid ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddService;
