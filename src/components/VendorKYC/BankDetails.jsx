// import React, { useState } from "react";
// import { FaPlus, FaPen } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const BankDetails = () => {
//     const navigate = useNavigate(); // Initialize navigate
//   const [businessHours, setBusinessHours] = useState([
//     { day: "Sunday", time: "11:00 AM - 7:00 PM", active: true },
//     { day: "Monday", time: "10:00 AM - 8:00 PM", active: true },
//   ]);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//       <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
//           Become a Vendor
//         </h2>
//         {/* Bank Details Section */}
//         <h3 className="text-gray-700 mb-2 font-semibold mt-4">Bank details</h3>
//         <label className="block text-gray-600 mb-1 font-semibold">Account Number</label>
//         <input type="text" className="w-full border p-2 rounded-lg mb-2 text-gray-600" placeholder="Enter bank account number" />

//         <label className="block text-gray-600 mb-1 font-semibold">Re-type Account Number</label>
//         <input type="text" className="w-full border p-2 rounded-lg mb-2 text-gray-600" placeholder="Confirm account number" />

//         <label className="block text-gray-600 mb-1 font-semibold">Bank Name</label>
//         <input type="text" className="w-full border p-2 rounded-lg mb-2 text-gray-600" placeholder="Bank name" />

//         <label className="block text-gray-600 mb-1 font-semibold">IFSC Code</label>
//         <input type="text" className="w-full border p-2 rounded-lg mb-4 text-gray-600" placeholder="Enter your bank IFSC code" />

//         <button className="w-full bg-orange-500 text-white p-2 rounded-lg mb-4 hover:bg-orange-600">
//           Add Bank Account
//         </button>

//         <div className="flex justify-between mt-6">
//           <button
//             className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
//             onClick={() => navigate("/VendorDocument")} // Replace with actual previous page route
//           >
//             Back
//           </button>
//           <button
//             className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
//             onClick={() => navigate("/ServiceTime")} // Replace with actual next page route
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankDetails;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BankDetails = () => {
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [reAccountNumber, setReAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  // Save data to localStorage on submit
  const handleSubmit = () => {
    if (
      accountNumber &&
      reAccountNumber &&
      accountNumber === reAccountNumber &&
      bankName &&
      ifscCode
    ) {
      localStorage.setItem("bank_account_number", accountNumber);
      localStorage.setItem("retype_bank_account_number", reAccountNumber);
      localStorage.setItem("bank_name", bankName);
      localStorage.setItem("ifsc_code", ifscCode);

      toast.success("Bank details saved successfully!");
    } else {
      toast.warn(
        "Please fill all fields correctly and make sure account numbers match."
      );
    }
  };

  // Navigate only if data is already saved
  const handleNext = () => {
    const isDataSaved =
      localStorage.getItem("bank_account_number") &&
      localStorage.getItem("retype_bank_account_number") &&
      localStorage.getItem("bank_name") &&
      localStorage.getItem("ifsc_code");

    if (isDataSaved) {
      navigate("/ServiceTime");
    } else {
      toast.warn("Please submit your bank details first before proceeding.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-400 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
          Become a Vendor
        </h2>

        <h3 className="text-gray-700 mb-2 font-semibold mt-4">Bank details</h3>

        <label className="block text-gray-600 mb-1 font-semibold">
          Account Number
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full border p-2 rounded-lg mb-2 text-gray-600"
          placeholder="Enter bank account number"
        />

        <label className="block text-gray-600 mb-1 font-semibold">
          Re-type Account Number
        </label>
        <input
          type="text"
          value={reAccountNumber}
          onChange={(e) => setReAccountNumber(e.target.value)}
          className="w-full border p-2 rounded-lg mb-2 text-gray-600"
          placeholder="Confirm account number"
        />

        <label className="block text-gray-600 mb-1 font-semibold">
          Bank Name
        </label>
        <input
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full border p-2 rounded-lg mb-2 text-gray-600"
          placeholder="Bank name"
        />

        <label className="block text-gray-600 mb-1 font-semibold">
          IFSC Code
        </label>
        <input
          type="text"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          className="w-full border p-2 rounded-lg mb-4 text-gray-600"
          placeholder="Enter your bank IFSC code"
        />

        {/* Submit Button */}
        <button
          className="w-full bg-orange-500 text-white p-2 rounded-lg mb-4 hover:bg-orange-600"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigate("/VendorDocument")}
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

export default BankDetails;

{
  /* Add Services Section */
}
{
  /* <button className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-3 rounded-lg mb-4">
          <FaPlus /> Add services provided by your business
        </button> */
}

{
  /* Business Hours Section */
}
{
  /* <div className="bg-orange-500 text-white p-3 rounded-t-lg text-lg font-semibold cursor-pointer">
          Choose Business Hours
        </div>
        <div className="bg-white border border-orange-400 rounded-b-lg p-3">
          {businessHours.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
              <span className="text-gray-700 font-medium">{item.day}</span>
              <span className="text-gray-600">{item.time}</span>
              <FaPen className="text-gray-500 cursor-pointer" />
              <label className="switch">
                <input type="checkbox" checked={item.active} readOnly />
                <span className="slider round"></span>
              </label>
            </div>
          ))}
        </div> */
}
