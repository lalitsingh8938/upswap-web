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
  const vendorId = localStorage.getItem("vendor_id");
  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get( `https://api.upswap.app/api/vendor/details/${vendorId}`,);
        const data = response.data;
        console.log("Vendor Details:", data);

        if (data) {
          setAccountNumber(data.bank_account_number || "");
          setReAccountNumber(data.retype_bank_account_number || "");
          setBankName(data.bank_name || "");
          setIfscCode(data.ifsc_code || "");
        }
      } catch (error) {
        console.error("Failed to fetch vendor details:", error);
        toast.error("Error fetching vendor details.");
      }
    };

    fetchVendorDetails();
  }, []);


  // Save bank details to localStorage
  const handleSubmit = () => {
    if (!accountNumber.trim()) {
      toast.warn("Please enter your Account Number");
      return;
    }
    if (!reAccountNumber.trim()) {
      toast.warn("Please re-type your Account Number");
      return;
    }
    if (accountNumber !== reAccountNumber) {
      toast.warn("Account numbers do not match.");
      return;
    }
    if (!bankName.trim()) {
      toast.warn("Please enter your Bank Name");
      return;
    }
    if (!ifscCode.trim()) {
      toast.warn("Please enter IFSC Code");
      return;
    }

    localStorage.setItem("bank_account_number", accountNumber);
    localStorage.setItem("retype_bank_account_number", reAccountNumber);
    localStorage.setItem("bank_name", bankName);
    localStorage.setItem("ifsc_code", ifscCode);

    toast.success("Bank details saved successfully!");
  };

  const handleSaveService = () => {
    if (!accountNumber || !reAccountNumber || !bankName || !ifscCode) {
      toast.warn(
        "Please fill all the required bank fields before saving services."
      );
      return;
    }

    if (accountNumber !== reAccountNumber) {
      toast.warn("Account numbers do not match.");
      return;
    }

    toast.success("Service saved successfully!");
    // You can add your save logic here
  };

  const handleNext = () => {
    const bank_account_number = localStorage.getItem("bank_account_number");
    const retype_bank_account_number = localStorage.getItem(
      "retype_bank_account_number"
    );
    const bank_name = localStorage.getItem("bank_name");
    const ifsc_code = localStorage.getItem("ifsc_code");
    const services = localStorage.getItem("services");

    if (
      !bank_account_number ||
      !retype_bank_account_number ||
      !bank_name ||
      !ifsc_code
    ) {
      toast.warn("Please fill and submit your bank details first.");
      return;
    }

    if (bank_account_number !== retype_bank_account_number) {
      toast.warn("Account numbers do not match.");
      return;
    }

    if (!services || JSON.parse(services).length === 0) {
      toast.warn("Please add at least one service before proceeding.");
      return;
    }

    navigate("/ServiceTime");
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
        <input
          type="number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full border p-2 rounded-lg mb-2 text-gray-600"
          placeholder="Enter bank account number"
        />

        <label className="block text-gray-600 mb-1 font-semibold">
          Re-type Account Number
        </label>
        <input
          type="number"
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
          className="w-full bg-[#FE7A3A] text-white p-2 rounded-lg mb-4 hover:bg-[#FE7A3A]"
          onClick={handleSubmit}
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
        <div className="flex justify-between mt-6">
          <button
            className="bg-[#FE7A3A] text-white px-6 py-2 rounded-lg hover:bg-[#FE7A3A]"
            onClick={handleSaveService}
          >
            Save Service
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

export default BankDetails;