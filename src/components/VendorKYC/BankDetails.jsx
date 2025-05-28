// import { FaPlus } from "react-icons/fa";
// import { FaTimes } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const BankDetails = () => {
//   const navigate = useNavigate();

//   const [accountNumber, setAccountNumber] = useState("");
//   const [reAccountNumber, setReAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const vendorId = localStorage.getItem("vendor_id");
//   useEffect(() => {
//     const fetchVendorDetails = async () => {
//       try {
//         const response = await axios.get( `https://api.upswap.app/api/vendor/details/${vendorId}`,);
//         const data = response.data;
//         console.log("Vendor Details:", data);

//         if (data) {
//           setAccountNumber(data.bank_account_number || "");
//           setReAccountNumber(data.retype_bank_account_number || "");
//           setBankName(data.bank_name || "");
//           setIfscCode(data.ifsc_code || "");
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor details:", error);
//         toast.error("Error fetching vendor details.");
//       }
//     };

//     fetchVendorDetails();
//   }, []);

//   // Save bank details to localStorage
//   const handleSubmit = () => {
//     if (!accountNumber.trim()) {
//       toast.warn("Please enter your Account Number");
//       return;
//     }
//     if (!reAccountNumber.trim()) {
//       toast.warn("Please re-type your Account Number");
//       return;
//     }
//     if (accountNumber !== reAccountNumber) {
//       toast.warn("Account numbers do not match.");
//       return;
//     }
//     if (!bankName.trim()) {
//       toast.warn("Please enter your Bank Name");
//       return;
//     }
//     if (!ifscCode.trim()) {
//       toast.warn("Please enter IFSC Code");
//       return;
//     }

//     localStorage.setItem("bank_account_number", accountNumber);
//     localStorage.setItem("retype_bank_account_number", reAccountNumber);
//     localStorage.setItem("bank_name", bankName);
//     localStorage.setItem("ifsc_code", ifscCode);

//     toast.success("Bank details saved successfully!");
//   };

//   const handleSaveService = () => {
//     if (!accountNumber || !reAccountNumber || !bankName || !ifscCode) {
//       toast.warn(
//         "Please fill all the required bank fields before saving services."
//       );
//       return;
//     }

//     if (accountNumber !== reAccountNumber) {
//       toast.warn("Account numbers do not match.");
//       return;
//     }

//     toast.success("Service saved successfully!");
//     // You can add your save logic here
//   };

//   const handleNext = () => {
//     const bank_account_number = localStorage.getItem("bank_account_number");
//     const retype_bank_account_number = localStorage.getItem(
//       "retype_bank_account_number"
//     );
//     const bank_name = localStorage.getItem("bank_name");
//     const ifsc_code = localStorage.getItem("ifsc_code");
//     const services = localStorage.getItem("services");

//     if (
//       !bank_account_number ||
//       !retype_bank_account_number ||
//       !bank_name ||
//       !ifsc_code
//     ) {
//       toast.warn("Please fill and submit your bank details first.");
//       return;
//     }

//     if (bank_account_number !== retype_bank_account_number) {
//       toast.warn("Account numbers do not match.");
//       return;
//     }

//     if (!services || JSON.parse(services).length === 0) {
//       toast.warn("Please add at least one service before proceeding.");
//       return;
//     }

//     navigate("/ServiceTime");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-[#FE7A3A] border-2 to-white p-4 rounded-lg">
//       <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <button
//           className="absolute top-2 right-3 text-gray-600 hover:text-[#FE7A3A]"
//           onClick={() => navigate("/VendorDocument")}
//         >
//           <FaTimes size={20} />
//         </button>
//         <div className="relative bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex justify-center items-center">
//           <h2 className="text-xl font-semibold">Become a Vendor</h2>
//         </div>
//         <h3 className="text-gray-700 mb-2 font-semibold mt-4">Bank details</h3>

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Account Number
//         </label>
//         <input
//           type="number"
//           value={accountNumber}
//           onChange={(e) => setAccountNumber(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Enter bank account number"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Re-type Account Number
//         </label>
//         <input
//           type="number"
//           value={reAccountNumber}
//           onChange={(e) => setReAccountNumber(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Confirm account number"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Bank Name
//         </label>
//         <input
//           type="text"
//           value={bankName}
//           onChange={(e) => setBankName(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Bank name"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           IFSC Code
//         </label>
//         <input
//           type="text"
//           value={ifscCode}
//           onChange={(e) => setIfscCode(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-4 text-gray-600"
//           placeholder="Enter your bank IFSC code"
//         />

//         {/* Submit Button */}
//         <button
//           className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mb-4 hover:bg-[#FE7A3A]"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Add Services Section
//         </label>
//         <button
//           className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-3 rounded-lg mb-4"
//           onClick={() => navigate("/AddService")}
//         >
//           <FaPlus /> Add services provided by your business
//         </button>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between mt-6">
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//             onClick={handleSaveService}
//           >
//             Save Service
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

// export default BankDetails;
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BankDetails = () => {
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [reAccountNumber, setReAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [isBankDetailsValid, setIsBankDetailsValid] = useState(false);
  const [hasSubmittedBankDetails, setHasSubmittedBankDetails] = useState(false); // New state to track submission
  const vendorId = localStorage.getItem("vendor_id");

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.upswap.app/api/vendor/details/${vendorId}`
        );
        const data = response.data;
        console.log("Vendor Details:", data);

        if (data) {
          setAccountNumber(data.bank_account_number || "");
          setReAccountNumber(data.retype_bank_account_number || "");
          setBankName(data.bank_name || "");
          setIfscCode(data.ifsc_code || "");
          if (data.bank_account_number) {
            setHasSubmittedBankDetails(true); // Consider as submitted if data exists on load
          }
        }
      } catch (error) {
        console.error("Failed to fetch vendor details:", error);
        toast.error("Error fetching vendor details.");
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  useEffect(() => {
    // Check if all bank details fields are filled and if account numbers match
    const isValid =
      accountNumber.trim() !== "" &&
      reAccountNumber.trim() !== "" &&
      bankName.trim() !== "" &&
      ifscCode.trim() !== "" &&
      accountNumber === reAccountNumber;
    setIsBankDetailsValid(isValid);
  }, [accountNumber, reAccountNumber, bankName, ifscCode]);

  // Save bank details to localStorage and mark as submitted
  const saveBankDetails = () => {
    localStorage.setItem("bank_account_number", accountNumber);
    localStorage.setItem("retype_bank_account_number", reAccountNumber);
    localStorage.setItem("bank_name", bankName);
    localStorage.setItem("ifsc_code", ifscCode);
    toast.success("Bank details submitted successfully!");
    setHasSubmittedBankDetails(true); // Mark as submitted after saving
  };

  const handleNext = () => {
    if (!hasSubmittedBankDetails) {
      toast.warn("Please submit your bank details before proceeding.");
      return;
    }

    toast.success("You can now add the services your business provides!"); // Show toast message
    navigate("/AddService");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#FE7A3A] border-2 to-white p-4 rounded-lg">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-[#FE7A3A]"
          onClick={() => navigate("/VendorDocument")}
        >
          <FaTimes size={20} />
        </button>
        <div className="relative bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex justify-center items-center">
          <h2 className="text-xl font-semibold">Become a Vendor</h2>
        </div>
        <h3 className="text-gray-700 mb-2 font-semibold mt-4">Bank details</h3>

        <label className="block text-gray-600 mb-1 font-semibold">
          Account Number
        </label>
        {/* <input
          // type="number"
           inputMode="numeric"
            pattern="\d*"
            name="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full border p-2 rounded-lg mb-2 text-gray-600"
          placeholder="Enter bank account number"
        /> */}
       
         <input
          inputMode="numeric"
          pattern="\d*"
          name="accountNumber"
          value={accountNumber}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, ""); // Remove all non-digits
            setAccountNumber(onlyNumbers);
          }}
          className="w-full border p-2 rounded-lg mb-2 text-gray-600"
          placeholder="Enter bank account number"
        />

        <label className="block text-gray-600 mb-1 font-semibold">Re-type Account Number</label>
         <input
          inputMode="numeric"
          pattern="\d*"
          value={reAccountNumber}
          onChange={(e) => setReAccountNumber(e.target.value.replace(/\D/g, ""))}
          className={`w-full border p-2 rounded-lg mb-2 ${
            accountNumber !== reAccountNumber && reAccountNumber ? "border-red-500" : ""
          } text-gray-600`}
          placeholder="Confirm account number"
        />
        {accountNumber !== reAccountNumber && reAccountNumber && (
          <p className="text-red-500 text-sm mb-2">Account numbers do not match.</p>
         )}

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

         <label className="block text-gray-600 mb-1 font-semibold">IFSC Code</label>
         <input
          type="text"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
          className="w-full border p-2 rounded-lg mb-4 text-gray-600"
          placeholder="Enter your bank IFSC code"
          maxLength={11}
        />

        {/* Submit Button - Now saves data and enables next if valid */}
        <button
          className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mb-4 hover:bg-[#FE7A3A]"
          onClick={saveBankDetails}
          disabled={!isBankDetailsValid}
          style={{
            opacity: !isBankDetailsValid ? 0.5 : 1,
            cursor: !isBankDetailsValid ? "not-allowed" : "pointer",
          }}
        >
          Submit
        </button>

        <label className="block text-gray-600 mb-1 font-semibold">
          Add Services Section
        </label>
        <button
          className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-3 rounded-lg mb-4"
          onClick={() => navigate("/AddService")}
        >
          <FaPlus /> Add services provided by your business
        </button>

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
            onClick={handleNext}
            disabled={!hasSubmittedBankDetails} // Disable based on submission status
            style={{
              opacity: !hasSubmittedBankDetails ? 0.5 : 1,
              cursor: !hasSubmittedBankDetails ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
// import React, { useState, useEffect } from "react";
// import { FaPlus, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const BankDetails = () => {
//   const navigate = useNavigate();
//   const vendorId = localStorage.getItem("vendor_id");

//   const [accountNumber, setAccountNumber] = useState("");
//   const [reAccountNumber, setReAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSubmittedBankDetails, setHasSubmittedBankDetails] = useState(false);

//   useEffect(() => {
//     const fetchVendorDetails = async () => {
//       setIsLoading(true);
//       try {
//         // const response = await axios.get(`https://api.upswap.app/api/vendor/details/${vendorId}`);
       
//        const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`,
         
//         ); const data = response.data;

//         if (data) {
//           setAccountNumber(data.bank_account_number || "");
//           setReAccountNumber(data.retype_bank_account_number || "");
//           setBankName(data.bank_name || "");
//           setIfscCode(data.ifsc_code || "");
//           if (data.bank_account_number) {
//             setHasSubmittedBankDetails(true);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor details:", error);
//         toast.error("Error fetching vendor details.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (vendorId) fetchVendorDetails();
//   }, [vendorId]);

//   const isFormValid =
//     accountNumber.trim() !== "" &&
//     reAccountNumber.trim() !== "" &&
//     bankName.trim() !== "" &&
//     ifscCode.trim() !== "" &&
//     accountNumber === reAccountNumber;

//   const saveBankDetails = async () => {
//     if (!isFormValid) {
//       toast.warn("Please fill all fields correctly.");
//       return;
//     }

//     try {
//       localStorage.setItem("bank_account_number", accountNumber);
//       localStorage.setItem("retype_bank_account_number", reAccountNumber);
//       localStorage.setItem("bank_name", bankName);
//       localStorage.setItem("ifsc_code", ifscCode);
//       toast.success("Bank details submitted successfully!");
//       setHasSubmittedBankDetails(true);
//     } catch (error) {
//       console.error("Failed to save bank details:", error);
//       toast.error("Error saving bank details.");
//     }
//   };

//   const handleNext = () => {
//     if (!hasSubmittedBankDetails) {
//       toast.warn("Please submit your bank details before proceeding.");
//       return;
//     }
//     navigate("/AddService");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-[#FE7A3A] p-4">
//       <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <button
//           className="absolute top-2 right-3 text-gray-600 hover:text-[#FE7A3A]"
//           onClick={() => navigate("/VendorDocument")}
//         >
//           <FaTimes size={20} />
//         </button>
//         <div className="bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex justify-center items-center">
//           <h2 className="text-xl font-semibold">Become a Vendor</h2>
//         </div>

//         <h3 className="text-gray-700 mb-4 font-semibold mt-4">Bank Details</h3>

//         <label className="block text-gray-600 mb-1 font-semibold">Account Number</label>
//         <input
//           inputMode="numeric"
//           pattern="\d*"
//           value={accountNumber}
//           onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Enter bank account number"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">Re-type Account Number</label>
//         <input
//           inputMode="numeric"
//           pattern="\d*"
//           value={reAccountNumber}
//           onChange={(e) => setReAccountNumber(e.target.value.replace(/\D/g, ""))}
//           className={`w-full border p-2 rounded-lg mb-2 ${
//             accountNumber !== reAccountNumber && reAccountNumber ? "border-red-500" : ""
//           } text-gray-600`}
//           placeholder="Confirm account number"
//         />
//         {accountNumber !== reAccountNumber && reAccountNumber && (
//           <p className="text-red-500 text-sm mb-2">Account numbers do not match.</p>
//         )}

//         <label className="block text-gray-600 mb-1 font-semibold">Bank Name</label>
//         <input
//           type="text"
//           value={bankName}
//           onChange={(e) => setBankName(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Bank name"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">IFSC Code</label>
//         <input
//           type="text"
//           value={ifscCode}
//           onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
//           className="w-full border p-2 rounded-lg mb-4 text-gray-600"
//           placeholder="Enter your bank IFSC code"
//           maxLength={11}
//         />

//         <button
//           className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mb-4 hover:bg-opacity-90 transition"
//           onClick={saveBankDetails}
//           disabled={!isFormValid}
//           style={{
//             opacity: !isFormValid ? 0.6 : 1,
//             cursor: !isFormValid ? "not-allowed" : "pointer",
//           }}
//         >
//           {isLoading ? "Submitting..." : "Submit"}
//         </button>

//         <label className="block text-gray-600 mb-1 font-semibold">Add Services Section</label>
//         <button
//           className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-3 rounded-lg mb-4 hover:bg-orange-100 transition"
//           onClick={() => navigate("/AddService")}
//         >
//           <FaPlus /> Add services provided by your business
//         </button>

//         <div className="flex justify-end mt-6">
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
//             onClick={handleNext}
//             disabled={!hasSubmittedBankDetails}
//             style={{
//               opacity: !hasSubmittedBankDetails ? 0.6 : 1,
//               cursor: !hasSubmittedBankDetails ? "not-allowed" : "pointer",
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankDetails;

// import { FaPlus } from "react-icons/fa";
// import { FaTimes } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const BankDetails = () => {
//   const navigate = useNavigate();

//   const [accountNumber, setAccountNumber] = useState("");
//   const [reAccountNumber, setReAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [isBankDetailsValid, setIsBankDetailsValid] = useState(false);
//   const [hasSubmittedBankDetails, setHasSubmittedBankDetails] = useState(false); // New state to track submission
//   const vendorId = localStorage.getItem("vendor_id");

//   useEffect(() => {
//     const fetchVendorDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`
//         );
//         const data = response.data;
//         console.log("Vendor Details:", data);

//         if (data) {
//           setAccountNumber(data.bank_account_number || "");
//           setReAccountNumber(data.retype_bank_account_number || "");
//           setBankName(data.bank_name || "");
//           setIfscCode(data.ifsc_code || "");
//           if (data.bank_account_number) {
//             setHasSubmittedBankDetails(true); // Consider as submitted if data exists on load
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor details:", error);
//         toast.error("Error fetching vendor details.");
//       }
//     };

//     fetchVendorDetails();
//   }, [vendorId]);

//   useEffect(() => {
//     // Check if all bank details fields are filled and if account numbers match
//     const isValid =
//       accountNumber.trim() !== "" &&
//       reAccountNumber.trim() !== "" &&
//       bankName.trim() !== "" &&
//       ifscCode.trim() !== "" &&
//       accountNumber === reAccountNumber;
//     setIsBankDetailsValid(isValid);
//   }, [accountNumber, reAccountNumber, bankName, ifscCode]);

//   // Save bank details to localStorage and mark as submitted
//   const saveBankDetails = () => {
//     localStorage.setItem("bank_account_number", accountNumber);
//     localStorage.setItem("retype_bank_account_number", reAccountNumber);
//     localStorage.setItem("bank_name", bankName);
//     localStorage.setItem("ifsc_code", ifscCode);
//     toast.success("Bank details submitted successfully!");
//     setHasSubmittedBankDetails(true); // Mark as submitted after saving
//   };

//   const handleNext = () => {
//     if (!hasSubmittedBankDetails) {
//       toast.warn("Please submit your bank details before proceeding.");
//       return;
//     }

//     toast.success("You can now add the services your business provides!"); // Show toast message
//     navigate("/AddService");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-[#FE7A3A] border-2 to-white p-4 rounded-lg">
//       <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <button
//           className="absolute top-2 right-3 text-gray-600 hover:text-[#FE7A3A]"
//           onClick={() => navigate("/VendorDocument")}
//         >
//           <FaTimes size={20} />
//         </button>
//         <div className="relative bg-[#FE7A3A] text-white py-3 px-4 rounded-lg flex justify-center items-center">
//           <h2 className="text-xl font-semibold">Become a Vendor</h2>
//         </div>
//         <h3 className="text-gray-700 mb-2 font-semibold mt-4">Bank details</h3>

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Account Number
//         </label>
//         {/* <input
//           // type="number"
//            inputMode="numeric"
//             pattern="\d*"
//             name="accountNumber"
//           value={accountNumber}
//           onChange={(e) => setAccountNumber(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Enter bank account number"
//         /> */}
//         <input
//           inputMode="numeric"
//           pattern="\d*"
//           name="accountNumber"
//           value={accountNumber}
//           onChange={(e) => {
//             const onlyNumbers = e.target.value.replace(/\D/g, ""); // Remove all non-digits
//             setAccountNumber(onlyNumbers);
//           }}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Enter bank account number"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Re-type Account Number
//         </label>
//         <input
//           // type="number"
//            inputMode="numeric"
//           pattern="\d*"
//           value={reAccountNumber}
//           onChange={(e) =>{
//             const onlyNumbers = e.target.value.replace(/\D/g, "");
//            setReAccountNumber(onlyNumbers);}}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Confirm account number"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Bank Name
//         </label>
//         <input
//           type="text"
//           value={bankName}
//           onChange={(e) => setBankName(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-2 text-gray-600"
//           placeholder="Bank name"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           IFSC Code
//         </label>
//         <input
//           type="text"
//           value={ifscCode}
//           onChange={(e) => setIfscCode(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-4 text-gray-600"
//           placeholder="Enter your bank IFSC code"
//         />

//         {/* Submit Button - Now saves data and enables next if valid */}
//         <button
//           className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mb-4 hover:bg-[#FE7A3A]"
//           onClick={saveBankDetails}
//           disabled={!isBankDetailsValid}
//           style={{
//             opacity: !isBankDetailsValid ? 0.5 : 1,
//             cursor: !isBankDetailsValid ? "not-allowed" : "pointer",
//           }}
//         >
//           Submit
//         </button>

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Add Services Section
//         </label>
//         <button
//           className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-3 rounded-lg mb-4"
//           onClick={() => navigate("/AddService")}
//         >
//           <FaPlus /> Add services provided by your business
//         </button>

//         {/* Navigation Buttons */}
//         <div className="flex justify-end mt-6">
//           <button
//             className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
//             onClick={handleNext}
//             disabled={!hasSubmittedBankDetails} // Disable based on submission status
//             style={{
//               opacity: !hasSubmittedBankDetails ? 0.5 : 1,
//               cursor: !hasSubmittedBankDetails ? "not-allowed" : "pointer",
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankDetails;

// import { FaPlus, FaTimes } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const BankDetails = () => {
//   const navigate = useNavigate();

//   const [accountNumber, setAccountNumber] = useState("");
//   const [reAccountNumber, setReAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [hasSubmittedBankDetails, setHasSubmittedBankDetails] = useState(false);

//   const vendorId = localStorage.getItem("vendor_id");

//   useEffect(() => {
//     const fetchVendorDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.upswap.app/api/vendor/details/${vendorId}`
//         );
//         const data = response.data;
//         if (data) {
//           setAccountNumber(data.bank_account_number || "");
//           setReAccountNumber(data.retype_bank_account_number || "");
//           setBankName(data.bank_name || "");
//           setIfscCode(data.ifsc_code || "");
//           if (data.bank_account_number) {
//             setHasSubmittedBankDetails(true);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch vendor details:", error);
//         toast.error("Error fetching vendor details.");
//       }
//     };

//     fetchVendorDetails();
//   }, [vendorId]);

//   const isBankDetailsValid =
//     accountNumber.trim() !== "" &&
//     reAccountNumber.trim() !== "" &&
//     bankName.trim() !== "" &&
//     ifscCode.trim() !== "" &&
//     accountNumber === reAccountNumber &&
//     accountNumber.length >= 6 &&
//     /^[A-Za-z]{4}\d{7}$/.test(ifscCode); // Basic IFSC pattern: 4 letters + 7 digits

//   const saveBankDetails = async () => {
//     if (!isBankDetailsValid) {
//       toast.warn("Please fill valid bank details before submitting.");
//       return;
//     }

//     try {
//       localStorage.setItem("bank_account_number", accountNumber);
//       localStorage.setItem("retype_bank_account_number", reAccountNumber);
//       localStorage.setItem("bank_name", bankName);
//       localStorage.setItem("ifsc_code", ifscCode);

//       toast.success("Bank details submitted successfully!");
//       setHasSubmittedBankDetails(true);
//     } catch (error) {
//       console.error("Error saving bank details:", error);
//       toast.error("Failed to save bank details.");
//     }
//   };

//   const handleNext = () => {
//     if (!hasSubmittedBankDetails) {
//       toast.warn("Please submit your bank details before proceeding.");
//       return;
//     }

//     toast.success("You can now add the services your business provides!");
//     navigate("/AddService");
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-[#FE7A3A] p-4">
//       <ToastContainer />
//       <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//         <button
//           className="absolute top-2 right-3 text-gray-600 hover:text-[#FE7A3A]"
//           onClick={() => navigate("/VendorDocument")}
//         >
//           <FaTimes size={20} />
//         </button>

//         <div className="bg-[#FE7A3A] text-white py-3 px-4 rounded-lg text-center mb-4">
//           <h2 className="text-xl font-semibold">Become a Vendor</h2>
//         </div>

//         <h3 className="text-gray-700 mb-4 font-semibold">Bank Details</h3>

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Account Number
//         </label>
//         <input
//           inputMode="numeric"
//           pattern="\d*"
//           value={accountNumber}
//           onChange={(e) =>
//             setAccountNumber(e.target.value.replace(/\D/g, ""))
//           }
//           className="w-full border p-2 rounded-lg mb-3 text-gray-700"
//           placeholder="Enter bank account number"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Re-type Account Number
//         </label>
//         <input
//           inputMode="numeric"
//           pattern="\d*"
//           value={reAccountNumber}
//           onChange={(e) =>
//             setReAccountNumber(e.target.value.replace(/\D/g, ""))
//           }
//           className="w-full border p-2 rounded-lg mb-3 text-gray-700"
//           placeholder="Confirm account number"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Bank Name
//         </label>
//         <input
//           type="text"
//           value={bankName}
//           onChange={(e) => setBankName(e.target.value)}
//           className="w-full border p-2 rounded-lg mb-3 text-gray-700"
//           placeholder="Bank name"
//         />

//         <label className="block text-gray-600 mb-1 font-semibold">
//           IFSC Code
//         </label>
//         <input
//           type="text"
//           value={ifscCode}
//           onChange={(e) =>
//             setIfscCode(e.target.value.toUpperCase().trim())
//           }
//           className="w-full border p-2 rounded-lg mb-4 text-gray-700"
//           placeholder="Enter IFSC code (e.g., HDFC0001234)"
//         />

//         <button
//           className={`w-full p-2 rounded-lg mb-4 ${
//             isBankDetailsValid
//               ? "bg-[#FE7A3A] text-white hover:bg-[#e96a2a]"
//               : "bg-gray-300 text-gray-600 cursor-not-allowed"
//           }`}
//           onClick={saveBankDetails}
//           disabled={!isBankDetailsValid}
//         >
//           Submit
//         </button>

//         <label className="block text-gray-600 mb-1 font-semibold">
//           Add Services Section
//         </label>
//         <button
//           className="flex items-center gap-2 w-full border-2 border-[#FE7A3A] text-[#FE7A3A] p-3 rounded-lg mb-4 hover:bg-[#FE7A3A] hover:text-white transition"
//           onClick={() => navigate("/AddService")}
//         >
//           <FaPlus /> Add services provided by your business
//         </button>

//         <div className="flex justify-end mt-6">
//           <button
//             className={`px-6 py-2 rounded-lg ${
//               hasSubmittedBankDetails
//                 ? "bg-[#FE7A3A] text-white hover:bg-[#e96a2a]"
//                 : "bg-gray-300 text-gray-600 cursor-not-allowed"
//             }`}
//             onClick={handleNext}
//             disabled={!hasSubmittedBankDetails}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankDetails;
