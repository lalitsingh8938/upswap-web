// import React, { useState, useEffect, useMemo } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Country, State, City } from "country-state-city";
// import Select from "react-select";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// const AddAddress = ({ onClose }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     house_no_building_name: "",
//     road_name_area_colony: "",
//     state: "",
//     city: "",
//     pincode: "",
//     country: "",
//   });

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const [stateOptions, setStateOptions] = useState([]);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [coordinates, setCoordinates] = useState(null);
//   const [location, setLocation] = useState("");

//   // const countryOptions = Country.getAllCountries().map((country) => ({
//   //   value: country.isoCode,
//   //   label: country.name,
//   // }));
//   const countryOptions = useMemo(() => {
//     return Country.getAllCountries().map((country) => ({
//       value: country.isoCode,
//       label: country.name,
//     }));
//   }, []);

//   useEffect(() => {
//     const vendorId = localStorage.getItem("vendorId");
//     if (vendorId) {
//       axios
//         .get(`https://api.upswap.app/api/vendor/details/${vendorId}`)
//         .then((response) => {
//           const vendorData = response.data;
//           const addressData = vendorData.addresses?.[0]; // optional chaining for safety

//           if (addressData) {
//             setFormData({
//               house_no_building_name: addressData.addresses.house_no_building_name || "",
//               road_name_area_colony: addressData.addresses.road_name_area_colony || "",
//               pincode: addressData.pincode || "",
//               country: addressData.country || "",
//               state: addressData.state || "",
//               city: addressData.city || "",
//             });

//             // Country, state, city select setup
//             const country = countryOptions.find(
//               (c) => c.label === addressData.country
//             );
//             if (country) {
//               setSelectedCountry(country);
//               const state = State.getStatesOfCountry(country.value).find(
//                 (s) => s.name === addressData.state
//               );
//               if (state) {
//                 setSelectedState({ value: state.isoCode, label: state.name });

//                 const city = City.getCitiesOfState(country.value, state.isoCode).find(
//                   (c) => c.name === addressData.city
//                 );
//                 if (city) {
//                   setSelectedCity({ value: city.name, label: city.name });
//                 }
//               }
//             }
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching vendor details", error);
//           toast.error("Failed to fetch vendor details.");
//         });
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       const states = State.getStatesOfCountry(selectedCountry.value);
//       setStateOptions(
//         states.map((state) => ({
//           value: state.isoCode,
//           label: state.name,
//         }))
//       );
//       setFormData((prev) => ({
//         ...prev,
//         country: selectedCountry.label,
//         state: "",
//         city: "",
//       }));
//       setSelectedState(null);
//       setSelectedCity(null);
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedCountry && selectedState) {
//       const cities = City.getCitiesOfState(
//         selectedCountry.value,
//         selectedState.value
//       );
//       setCityOptions(
//         cities.map((city) => ({
//           value: city.name,
//           label: city.name,
//         }))
//       );
//       setFormData((prev) => ({
//         ...prev,
//         state: selectedState.label,
//         city: "",
//       }));
//       setSelectedCity(null);
//     }
//   }, [selectedState]);

//   useEffect(() => {
//     if (selectedCity) {
//       setFormData((prev) => ({
//         ...prev,
//         city: selectedCity.label,
//       }));
//     }
//   }, [selectedCity]);

//   useEffect(() => {
//     const storedCountry = localStorage.getItem("country");
//     if (storedCountry) {
//       setFormData((prev) => ({ ...prev, country: storedCountry }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLocationChange = (e) => {
//     const selected = e.target.value;
//     setLocation(selected);

//     if (selected === "live" && "geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = parseFloat(position.coords.latitude.toFixed(6));
//           const lng = parseFloat(position.coords.longitude.toFixed(6));
//           setCoordinates({
//             lat: lat,
//             lng: lng,
//           });

//           // ✅ Save coordinates to localStorage
//           localStorage.setItem("latitude", lat);
//           localStorage.setItem("longitude", lng);

//           // console.log("Coordinates fetched:", { lat, lng }); // Debugging line
//         },
//         () => {
//           toast.warning(
//             "Unable to fetch location. Please allow location access."
//           );
//         }
//       );
//     } else {
//       setCoordinates(null);
//     }
//   };

//   // const handleAddAddress = () => {
//   //   localStorage.setItem("address", JSON.stringify(formData));
//   // };

//   const handleAddAddress = () => {
//     const {
//       house_no_building_name,
//       road_name_area_colony,
//       country,
//       state,
//       city,
//       pincode,
//     } = formData;

//     if (
//       !house_no_building_name ||
//       !road_name_area_colony ||
//       !country ||
//       !state ||
//       !city ||
//       !pincode
//     ) {
//       toast.warn("Please fill all the fields before saving the address.");
//       return;
//     }
//     const fullAddress = {
//       ...formData,
//       latitude: coordinates?.lat || "",
//       longitude: coordinates?.lng || "",
//       address_name: `${house_no_building_name}, ${road_name_area_colony}, ${city}, ${state}, ${country}, ${pincode}`,
//     };

//     // console.log("Saved address with coordinates:", fullAddress);

//     // ✅ Save full address with lat/lng and full address string
//     localStorage.setItem("address", JSON.stringify(fullAddress));
//     localStorage.setItem("country", country);

//     toast.success("Address saved successfully!");
//   };

//   const handleNext = () => {
//     const {
//       house_no_building_name,
//       road_name_area_colony,
//       country,
//       state,
//       city,
//       pincode,
//     } = formData;

//     // Check if any field is empty
//     if (
//       !house_no_building_name ||
//       !road_name_area_colony ||
//       !country ||
//       !state ||
//       !city ||
//       !pincode
//     ) {
//       toast.warn(
//         "Please fill all the fields before proceeding to the next step."
//       );
//       return; // Stop navigation
//     }

//     // Save data and navigate
//     if (onClose) onClose();
//     navigate("/BankDetails");
//   };

//   const handleClose = () => {
//     navigate("/VendorDocument");
//     if (onClose) onClose();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen border-2 bg-gradient-to-b bg-[#FE7A3A] to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
//         <ToastContainer position="top-center" autoClose={3000} />

//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Add Address Info</h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-600 hover:text-[#FE7A3A] absolute top-4 right-4"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <select
//           className="w-full border p-2 rounded-lg mb-3"
//           value={location}
//           onChange={handleLocationChange}
//         >
//           <option value="">Select Location Type</option>
//           <option value="live">Use Current Location</option>
//         </select>

//         {/* Input Fields */}
//         <input
//           type="text"
//           name="house_no_building_name"
//           value={formData.house_no_building_name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter house no. , building name"
//         />

//         <input
//           type="text"
//           name="road_name_area_colony"
//           value={formData.road_name_area_colony}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter road name, area, colony"
//         />

//         <Select
//           options={countryOptions}
//           value={selectedCountry}
//           onChange={(value) => setSelectedCountry(value)}
//           placeholder="Select Country"
//           className="w-full rounded-lg mb-3"
//         />

//         <Select
//           options={stateOptions}
//           value={selectedState}
//           onChange={(value) => setSelectedState(value)}
//           placeholder="Select State"
//           isDisabled={!selectedCountry}
//           className="w-full rounded-lg mb-3"
//         />

//         <Select
//           options={cityOptions}
//           value={selectedCity}
//           onChange={(value) => setSelectedCity(value)}
//           placeholder="Select City"
//           isDisabled={!selectedState}
//           className="w-full rounded-lg mb-3"
//         />

//         <input
//           type="number"
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter pincode"
//         />

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//             onClick={handleAddAddress}
//           >
//             Save Address
//           </button>
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//             onClick={handleNext}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAddress;

// import React, { useState, useEffect, useMemo } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Country, State, City } from "country-state-city";
// import Select from "react-select";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// const AddAddress = ({ onClose }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     house_no_building_name: "",
//     road_name_area_colony: "",
//     state: "",
//     city: "",
//     pincode: "",
//     country: "",
//     latitude: "",
//     longitude: "",
//   });

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const [stateOptions, setStateOptions] = useState([]);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [coordinates, setCoordinates] = useState(null);
//   const [location, setLocation] = useState("");

//   const countryOptions = useMemo(() => {
//     return Country.getAllCountries().map((country) => ({
//       value: country.isoCode,
//       label: country.name,
//     }));
//   }, []);

//   // Fetch and pre-fill vendor details
//   useEffect(() => {
//     if (countryOptions.length === 0) return;

//     const fetchVendorDetails = async () => {
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

//         const addressData = response.data.addresses?.[0];
//         console.log("Address Data:", addressData); // Debugging line

//         if (addressData) {
//           setFormData({
//             house_no_building_name: addressData.house_no_building_name || "",
//             road_name_area_colony: addressData.road_name_area_colony || "",
//             pincode: addressData.pincode || "",
//             country: addressData.country || "",
//             state: addressData.state || "",
//             city: addressData.city || "",
//             latitude: addressData.latitude || "",
//             longitude: addressData.longitude || "",
//           });

//           const selectedCountryObj = countryOptions.find(
//             (c) => c.label === addressData.country
//           );
//           if (selectedCountryObj) {
//             setSelectedCountry(selectedCountryObj);
//             const states = State.getStatesOfCountry(selectedCountryObj.value);
//             const stateOptionsMapped = states.map((s) => ({
//               value: s.isoCode,
//               label: s.name,
//             }));
//             setStateOptions(stateOptionsMapped);
          
//             const selectedStateObj = stateOptionsMapped.find(
//               (s) => s.label.toLowerCase() === addressData.state.toLowerCase()
//             );
//             if (selectedStateObj) {
//               setSelectedState(selectedStateObj);
//               const cities = City.getCitiesOfState(
//                 selectedCountryObj.value,
//                 selectedStateObj.value
//               );
//               const cityOptionsMapped = cities.map((c) => ({
//                 value: c.name,
//                 label: c.name,
//               }));
//               setCityOptions(cityOptionsMapped);
          
//               const selectedCityObj = cityOptionsMapped.find(
//                 (c) => c.label.toLowerCase() === addressData.city.toLowerCase()
//               );
//               if (selectedCityObj) {
//                 setSelectedCity(selectedCityObj);
//               }
//             }
//           }
          
          
//         }
//       } catch (error) {
//         console.error("Error fetching vendor details", error);
//       }
//     };

//     fetchVendorDetails();
//   }, [countryOptions]);

//   // Update state options when country changes
//   useEffect(() => {
//     if (selectedCountry) {
//       const states = State.getStatesOfCountry(selectedCountry.value);
//       setStateOptions(states.map((s) => ({ value: s.isoCode, label: s.name })));
//       setSelectedState(null);
//       setSelectedCity(null);
//       setCityOptions([]);
//       setFormData((prev) => ({
//         ...prev,
//         country: selectedCountry.label,
//         state: "",
//         city: "",
//       }));
//     }
//   }, [selectedCountry]);

//   // Update city options when state changes
//   useEffect(() => {
//     if (selectedState && selectedCountry) {
//       const cities = City.getCitiesOfState(
//         selectedCountry.value,
//         selectedState.value
//       );
//       setCityOptions(cities.map((c) => ({ value: c.name, label: c.name })));
//       setSelectedCity(null);
//       setFormData((prev) => ({
//         ...prev,
//         state: selectedState.label,
//         city: "",
//       }));
//     }
//   }, [selectedState]);

//   // Update city in formData when selectedCity changes
//   useEffect(() => {
//     if (selectedCity) {
//       setFormData((prev) => ({
//         ...prev,
//         city: selectedCity.label,
//       }));
//     }
//   }, [selectedCity]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLocationChange = (e) => {
//     const selected = e.target.value;
//     setLocation(selected);

//     if (selected === "live" && "geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = parseFloat(position.coords.latitude.toFixed(6));
//           const lng = parseFloat(position.coords.longitude.toFixed(6));
//           setCoordinates({ lat, lng });
//           localStorage.setItem("latitude", lat);
//           localStorage.setItem("longitude", lng);
//         },
//         () => {
//           toast.warning(
//             "Unable to fetch location. Please allow location access."
//           );
//         }
//       );
//     } else {
//       setCoordinates(null);
//     }
//   };

//   const handleAddAddress = () => {
//     const {
//       house_no_building_name,
//       road_name_area_colony,
//       country,
//       state,
//       city,
//       pincode,
//     } = formData;

//     if (
//       !house_no_building_name ||
//       !road_name_area_colony ||
//       !country ||
//       !state ||
//       !city ||
//       !pincode
//     ) {
//       toast.warn("Please fill all the fields before saving the address.");
//       return;
//     }

//     const fullAddress = {
//       ...formData,
//       latitude: coordinates?.lat || "",
//       longitude: coordinates?.lng || "",
//       address_name: `${house_no_building_name}, ${road_name_area_colony}, ${city}, ${state}, ${country}, ${pincode}`,
//     };

//     localStorage.setItem("address", JSON.stringify(fullAddress));
//     localStorage.setItem("country", country);
//     toast.success("Address saved successfully!");
//   };

//   const handleNext = () => {
//     const {
//       house_no_building_name,
//       road_name_area_colony,
//       country,
//       state,
//       city,
//       pincode,
//     } = formData;

//     if (
//       !house_no_building_name ||
//       !road_name_area_colony ||
//       !country ||
//       !state ||
//       !city ||
//       !pincode
//     ) {
//       toast.warn(
//         "Please fill all the fields before proceeding to the next step."
//       );
//       return;
//     }

//     if (onClose) onClose();
//     navigate("/BankDetails");
//   };

//   const handleClose = () => {
//     navigate("/VendorDocument");
//     if (onClose) onClose();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen border-2 bg-gradient-to-b bg-[#FE7A3A] to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Add Address Info</h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-600 hover:text-[#FE7A3A] absolute top-4 right-4"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <select
//           className="w-full border p-2 rounded-lg mb-3"
//           value={location}
//           onChange={handleLocationChange}
//         >
//           <option value="">Select Location Type</option>
//           <option value="live">Use Current Location</option>
//         </select>

//         <input
//           type="text"
//           name="house_no_building_name"
//           value={formData.house_no_building_name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter house no. , building name"
//         />
//         <input
//           type="text"
//           name="road_name_area_colony"
//           value={formData.road_name_area_colony}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter road name, area, colony"
//         />

//         <Select
//           options={countryOptions}
//           value={selectedCountry}
//           onChange={(value) => setSelectedCountry(value)}
//           placeholder="Select Country"
//           className="w-full rounded-lg mb-3"
//         />
//         <Select
//           options={stateOptions}
//           value={selectedState}
//           onChange={(value) => setSelectedState(value)}
//           placeholder="Select State"
//           isDisabled={!selectedCountry}
//           className="w-full rounded-lg mb-3"
//         />
//         <Select
//           options={cityOptions}
//           value={selectedCity}
//           onChange={(value) => setSelectedCity(value)}
//           placeholder="Select City"
//           isDisabled={!selectedState}
//           className="w-full rounded-lg mb-3"
//         />

//         <input
//           type="number"
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter pincode"
//         />

//         <div className="flex justify-between mt-6">
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#e76a2f]"
//             onClick={handleAddAddress}
//           >
//             Save Address
//           </button>
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#e76a2f]"
//             onClick={handleNext}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAddress;

// import React, { useState, useEffect, useMemo } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Country, State, City } from "country-state-city";
// import Select from "react-select";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";

// const AddAddress = ({ onClose }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     house_no_building_name: "",
//     road_name_area_colony: "",
//     state: "",
//     city: "",
//     pincode: "",
//     country: "",
//     latitude: "",
//     longitude: "",
//   });

//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);

//   const [stateOptions, setStateOptions] = useState([]);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [coordinates, setCoordinates] = useState(null);
//   const [location, setLocation] = useState("");

//   const countryOptions = useMemo(() => {
//     return Country.getAllCountries().map((country) => ({
//       value: country.isoCode,
//       label: country.name,
//     }));
//   }, []);

//   // Fetch and pre-fill vendor details
//   useEffect(() => {
//     if (countryOptions.length === 0) return;

//     const fetchVendorDetails = async () => {
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

//         const addressData = response.data.addresses?.[0];
//         console.log("Address Data:", addressData); // Debugging line

//         if (addressData) {
//           setFormData({
//             house_no_building_name: addressData.house_no_building_name || "",
//             road_name_area_colony: addressData.road_name_area_colony || "",
//             pincode: addressData.pincode || "",
//             country: addressData.country || "",
//             state: addressData.state || "",
//             city: addressData.city || "",
//             latitude: addressData.latitude || "",
//             longitude: addressData.longitude || "",
//           });

//           const selectedCountryObj = countryOptions.find(
//             (c) => c.label === addressData.country
//           );
//           if (selectedCountryObj) {
//             setSelectedCountry(selectedCountryObj);
//             const states = State.getStatesOfCountry(selectedCountryObj.value);
//             const stateOptionsMapped = states.map((s) => ({
//               value: s.isoCode,
//               label: s.name,
//             }));
//             setStateOptions(stateOptionsMapped);
          
//             const selectedStateObj = stateOptionsMapped.find(
//               (s) => s.label.toLowerCase() === addressData.state.toLowerCase()
//             );
//             if (selectedStateObj) {
//               setSelectedState(selectedStateObj);
//               const cities = City.getCitiesOfState(
//                 selectedCountryObj.value,
//                 selectedStateObj.value
//               );
//               const cityOptionsMapped = cities.map((c) => ({
//                 value: c.name,
//                 label: c.name,
//               }));
//               setCityOptions(cityOptionsMapped);
          
//               const selectedCityObj = cityOptionsMapped.find(
//                 (c) => c.label.toLowerCase() === addressData.city.toLowerCase()
//               );
//               if (selectedCityObj) {
//                 setSelectedCity(selectedCityObj);
//               }
//             }
//           }
          
          
//         }
//       } catch (error) {
//         console.error("Error fetching vendor details", error);
//       }
//     };

//     fetchVendorDetails();
//   }, [countryOptions]);

//   // Update state options when country changes
//   useEffect(() => {
//     if (selectedCountry) {
//       const states = State.getStatesOfCountry(selectedCountry.value);
//       setStateOptions(states.map((s) => ({ value: s.isoCode, label: s.name })));
//       setSelectedState(null);
//       setSelectedCity(null);
//       setCityOptions([]);
//       setFormData((prev) => ({
//         ...prev,
//         country: selectedCountry.label,
//         state: "",
//         city: "",
//       }));
//     }
//   }, [selectedCountry]);

//   // Update city options when state changes
//   useEffect(() => {
//     if (selectedState && selectedCountry) {
//       const cities = City.getCitiesOfState(
//         selectedCountry.value,
//         selectedState.value
//       );
//       setCityOptions(cities.map((c) => ({ value: c.name, label: c.name })));
//       setSelectedCity(null);
//       setFormData((prev) => ({
//         ...prev,
//         state: selectedState.label,
//         city: "",
//       }));
//     }
//   }, [selectedState]);

//   // Update city in formData when selectedCity changes
//   useEffect(() => {
//     if (selectedCity) {
//       setFormData((prev) => ({
//         ...prev,
//         city: selectedCity.label,
//       }));
//     }
//   }, [selectedCity]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLocationChange = (e) => {
//     const selected = e.target.value;
//     setLocation(selected);

//     if (selected === "live" && "geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = parseFloat(position.coords.latitude.toFixed(6));
//           const lng = parseFloat(position.coords.longitude.toFixed(6));
//           setCoordinates({ lat, lng });
//           localStorage.setItem("latitude", lat);
//           localStorage.setItem("longitude", lng);
//         },
//         () => {
//           toast.warning(
//             "Unable to fetch location. Please allow location access."
//           );
//         }
//       );
//     } else {
//       setCoordinates(null);
//     }
//   };

//   const handleAddAddress = () => {
//     const {
//       house_no_building_name,
//       road_name_area_colony,
//       country,
//       state,
//       city,
//       pincode,
//     } = formData;

//     if (
//       !house_no_building_name ||
//       !road_name_area_colony ||
//       !country ||
//       !state ||
//       !city ||
//       !pincode
//     ) {
//       toast.warn("Please fill all the fields before saving the address.");
//       return;
//     }

//     const fullAddress = {
//       ...formData,
//       latitude: coordinates?.lat || "",
//       longitude: coordinates?.lng || "",
//       address_name: `${house_no_building_name}, ${road_name_area_colony}, ${city}, ${state}, ${country}, ${pincode}`,
//     };

//     localStorage.setItem("address", JSON.stringify(fullAddress));
//     localStorage.setItem("country", country);
//     toast.success("Address saved successfully!");
//   };

//   const handleNext = () => {
//     const {
//       house_no_building_name,
//       road_name_area_colony,
//       country,
//       state,
//       city,
//       pincode,
//     } = formData;

//     if (
//       !house_no_building_name ||
//       !road_name_area_colony ||
//       !country ||
//       !state ||
//       !city ||
//       !pincode
//     ) {
//       toast.warn(
//         "Please fill all the fields before proceeding to the next step."
//       );
//       return;
//     }

//     if (onClose) onClose();
//     navigate("/BankDetails");
//   };

//   const handleClose = () => {
//     navigate("/VendorDocument");
//     if (onClose) onClose();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen border-2 bg-gradient-to-b bg-[#FE7A3A] to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
//         <ToastContainer position="top-center" autoClose={3000} />
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Add Address Info</h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-600 hover:text-[#FE7A3A] absolute top-4 right-4"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <select
//           className="w-full border p-2 rounded-lg mb-3"
//           value={location}
//           onChange={handleLocationChange}
//         >
//           <option value="">Select Location Type</option>
//           <option value="live">Use Current Location</option>
//         </select>

//         <input
//           type="text"
//           name="house_no_building_name"
//           value={formData.house_no_building_name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter house no. , building name"
//         />
//         <input
//           type="text"
//           name="road_name_area_colony"
//           value={formData.road_name_area_colony}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter road name, area, colony"
//         />

//         <Select
//           options={countryOptions}
//           value={selectedCountry}
//           onChange={(value) => setSelectedCountry(value)}
//           placeholder="Select Country"
//           className="w-full rounded-lg mb-3"
//         />
//         <Select
//           options={stateOptions}
//           value={selectedState}
//           onChange={(value) => setSelectedState(value)}
//           placeholder="Select State"
//           isDisabled={!selectedCountry}
//           className="w-full rounded-lg mb-3"
//         />
//         <Select
//           options={cityOptions}
//           value={selectedCity}
//           onChange={(value) => setSelectedCity(value)}
//           placeholder="Select City"
//           isDisabled={!selectedState}
//           className="w-full rounded-lg mb-3"
//         />

//         <input
//           type="number"
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           className="w-full border p-2 rounded-lg mb-3"
//           placeholder="Enter pincode"
//         />

//         <div className="flex justify-between mt-6">
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#e76a2f]"
//             onClick={handleAddAddress}
//           >
//             Save Address
//           </button>
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#e76a2f]"
//             onClick={handleNext}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAddress;


import React, { useState, useEffect, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddAddress = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    house_no_building_name: "",
    road_name_area_colony: "",
    state: "",
    city: "",
    pincode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [location, setLocation] = useState("");

  const countryOptions = useMemo(() => {
    return Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
  }, []);

  // Fetch and pre-fill vendor details
  useEffect(() => {
    if (countryOptions.length === 0) return;

    const fetchVendorDetails = async () => {
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

        const addressData = response.data.addresses?.[0];
        console.log("Address Data:", addressData); // Debugging line

        if (addressData) {
          setFormData({
            house_no_building_name: addressData.house_no_building_name || "",
            road_name_area_colony: addressData.road_name_area_colony || "",
            pincode: addressData.pincode || "",
            country: addressData.country || "",
            state: addressData.state || "",
            city: addressData.city || "",
            latitude: addressData.latitude || "",
            longitude: addressData.longitude || "",
          });

          const selectedCountryObj = countryOptions.find(
            (c) => c.label === addressData.country
          );
          if (selectedCountryObj) {
            setSelectedCountry(selectedCountryObj);
            const states = State.getStatesOfCountry(selectedCountryObj.value);
            const stateOptionsMapped = states.map((s) => ({
              value: s.isoCode,
              label: s.name,
            }));
            setStateOptions(stateOptionsMapped);

            const selectedStateObj = stateOptionsMapped.find(
              (s) => s.label.toLowerCase() === addressData.state.toLowerCase()
            );
            if (selectedStateObj) {
              setSelectedState(selectedStateObj);
              const cities = City.getCitiesOfState(
                selectedCountryObj.value,
                selectedStateObj.value
              );
              const cityOptionsMapped = cities.map((c) => ({
                value: c.name,
                label: c.name,
              }));
              setCityOptions(cityOptionsMapped);

              const selectedCityObj = cityOptionsMapped.find(
                (c) => c.label.toLowerCase() === addressData.city.toLowerCase()
              );
              if (selectedCityObj) {
                setSelectedCity(selectedCityObj);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching vendor details", error);
      }
    };

    fetchVendorDetails();
  }, [countryOptions]);

  // Update state options when country changes
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value);
      setStateOptions(states.map((s) => ({ value: s.isoCode, label: s.name })));
      setSelectedState(null);
      setSelectedCity(null);
      setCityOptions([]);
      setFormData((prev) => ({
        ...prev,
        country: selectedCountry.label,
        state: "",
        city: "",
      }));
    }
  }, [selectedCountry]);

  // Update city options when state changes
  useEffect(() => {
    if (selectedState && selectedCountry) {
      const cities = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      );
      setCityOptions(cities.map((c) => ({ value: c.name, label: c.name })));
      setSelectedCity(null);
      setFormData((prev) => ({
        ...prev,
        state: selectedState.label,
        city: "",
      }));
    }
  }, [selectedState]);

  // Update city in formData when selectedCity changes
  useEffect(() => {
    if (selectedCity) {
      setFormData((prev) => ({
        ...prev,
        city: selectedCity.label,
      }));
    }
  }, [selectedCity]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    const selected = e.target.value;
    setLocation(selected);

    if (selected === "live" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(6));
          const lng = parseFloat(position.coords.longitude.toFixed(6));
          setCoordinates({ lat, lng });
          localStorage.setItem("latitude", lat);
          localStorage.setItem("longitude", lng);
        },
        () => {
          toast.warning(
            "Unable to fetch location. Please allow location access."
          );
        }
      );
    } else {
      setCoordinates(null);
    }
  };

  const handleAddAddress = () => {
    const {
      house_no_building_name,
      road_name_area_colony,
      country,
      state,
      city,
      pincode,
    } = formData;

    if (
      !house_no_building_name ||
      !road_name_area_colony ||
      !country ||
      !state ||
      !city ||
      !pincode
    ) {
      toast.warn("Please fill all the fields before saving the address.");
      return;
    }

    const fullAddress = {
      ...formData,
      latitude: coordinates?.lat || "",
      longitude: coordinates?.lng || "",
      address_name: `${house_no_building_name}, ${road_name_area_colony}, ${city}, ${state}, ${country}, ${pincode}`,
    };

    localStorage.setItem("address", JSON.stringify(fullAddress));
    localStorage.setItem("country", country);
    toast.success("Address saved successfully!");
  };

  const handleNext = () => {
    const {
      house_no_building_name,
      road_name_area_colony,
      country,
      state,
      city,
      pincode,
    } = formData;

    if (
      !house_no_building_name ||
      !road_name_area_colony ||
      !selectedCountry || // Check if selectedCountry is not null
      !selectedState ||   // Check if selectedState is not null
      !selectedCity ||    // Check if selectedCity is not null
      !pincode
    ) {
      toast.warn(
        "Please fill all the fields including Country, State, and City before proceeding to the next step."
      );
      return;
    }

    if (onClose) onClose();
    navigate("/BankDetails");
  };

  const handleClose = () => {
    navigate("/VendorDocument");
    if (onClose) onClose();
  };

  return (
    <div className="flex justify-center items-center min-h-screen border-2 bg-gradient-to-b bg-[#FE7A3A] to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Address Info</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-[#FE7A3A] absolute top-4 right-4"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <select
          className="w-full border p-2 rounded-lg mb-3"
          value={location}
          onChange={handleLocationChange}
        >
          <option value="">Select Location Type</option>
          <option value="live">Use Current Location</option>
        </select>

        <input
          type="text"
          name="house_no_building_name"
          value={formData.house_no_building_name}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter house no. , building name"
        />
        <input
          type="text"
          name="road_name_area_colony"
          value={formData.road_name_area_colony}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter road name, area, colony"
        />

        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={(value) => setSelectedCountry(value)}
          placeholder="Select Country"
          className="w-full rounded-lg mb-3"
        />
        <Select
          options={stateOptions}
          value={selectedState}
          onChange={(value) => setSelectedState(value)}
          placeholder="Select State"
          isDisabled={!selectedCountry}
          className="w-full rounded-lg mb-3"
        />
        <Select
          options={cityOptions}
          value={selectedCity}
          onChange={(value) => setSelectedCity(value)}
          placeholder="Select City"
          isDisabled={!selectedState}
          className="w-full rounded-lg mb-3"
        />

        <input
          type="number"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mb-3"
          placeholder="Enter pincode"
        />

        <div className="flex justify-between mt-6">
          <button
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#e76a2f]"
            onClick={handleAddAddress}
          >
            Save Address
          </button>
          <button
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#e76a2f]"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;