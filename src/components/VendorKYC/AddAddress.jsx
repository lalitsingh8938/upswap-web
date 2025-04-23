import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
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
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [location, setLocation] = useState("");

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value);
      setStateOptions(
        states.map((state) => ({
          value: state.isoCode,
          label: state.name,
        }))
      );
      setFormData((prev) => ({
        ...prev,
        country: selectedCountry.label,
        state: "",
        city: "",
      }));
      setSelectedState(null);
      setSelectedCity(null);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cities = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      );
      setCityOptions(
        cities.map((city) => ({
          value: city.name,
          label: city.name,
        }))
      );
      setFormData((prev) => ({
        ...prev,
        state: selectedState.label,
        city: "",
      }));
      setSelectedCity(null);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity) {
      setFormData((prev) => ({
        ...prev,
        city: selectedCity.label,
      }));
    }
  }, [selectedCity]);

  useEffect(() => {
    const storedCountry = localStorage.getItem("country");
    if (storedCountry) {
      setFormData((prev) => ({ ...prev, country: storedCountry }));
    }
  }, []);

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
          setCoordinates({
            lat: lat,
            lng: lng,
          });

          // ✅ Save coordinates to localStorage
          localStorage.setItem("latitude", lat);
          localStorage.setItem("longitude", lng);

          // console.log("Coordinates fetched:", { lat, lng }); // Debugging line
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

  // const handleAddAddress = () => {
  //   localStorage.setItem("address", JSON.stringify(formData));
  // };

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

    // console.log("Saved address with coordinates:", fullAddress);

    // ✅ Save full address with lat/lng and full address string
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

    // Check if any field is empty
    if (
      !house_no_building_name ||
      !road_name_area_colony ||
      !country ||
      !state ||
      !city ||
      !pincode
    ) {
      toast.warn(
        "Please fill all the fields before proceeding to the next step."
      );
      return; // Stop navigation
    }

    // Save data and navigate
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

        {/* Header */}
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

        {/* Input Fields */}
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

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
            onClick={handleAddAddress}
          >
            Save Address
          </button>
          <button
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
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
