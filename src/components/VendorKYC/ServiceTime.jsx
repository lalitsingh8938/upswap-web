import React, { useState } from "react";
import { FaPlus, FaPen, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const VendorForm = () => {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-500 to-white p-4 rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white bg-orange-500 py-3 rounded-lg">
          Become a Vendor
        </h2>

        {/* <button className="flex items-center gap-2 w-full border-2 border-orange-400 text-orange-500 p-3 rounded-lg my-4">
          <FaPlus /> Add services provided by your business
        </button> */}

        <div className="bg-orange-500 text-white p-3 rounded-lg text-lg font-semibold flex justify-between my-4">
          Choose Business Hours <span className="cursor-pointer">▼</span>
        </div>

        <div className="bg-white border rounded-lg border-orange-400 rounded-b-lg p-3 my-4">
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
                    onChange={(value) => handleTimeChange(index, "end", value)}
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
                <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-orange-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:left-1 after:top-1 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
              </label>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 my-4">
          <input
            type="checkbox"
            className="w-5 h-5 border border-orange-500 rounded-md"
          />
          <span className="text-gray-600">
            Share a few details to enhance your Upswap experience
          </span>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigate("/BankDetails")}
          >
            Back
          </button>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            onClick={() => navigate("/ServiceTime")}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
