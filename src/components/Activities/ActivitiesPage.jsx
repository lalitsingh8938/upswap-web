import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "https://api.upswap.app/api/activities/lists/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        console.log("API Response:", response.data);

        const activitiesData = response.data.data || response.data || [];
        setActivities(activitiesData);
        setLoading(false);

        if (activitiesData.length === 0) {
          toast.info("No activities available");
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError(err.message);
        toast.error("Failed to load activities");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE7A3A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No activities available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-around bg-white py-2">
        <button
          className="text-gray-400 px-4 py-2"
          onClick={() => navigate("/DealsPage")}
        >
          Deals
        </button>
        <button className="text-gray-400 px-4 py-2 border-[#FE7A3A] border-b-2">
          Activities
        </button>
      </div>

      {/* Search */}
      <div className="p-4 flex gap-2">
        <div className="flex-1 bg-white p-2 rounded-lg flex items-center gap-2 shadow">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search title, category, vendor..."
            className="w-full outline-none"
          />
        </div>
        <button className="bg-white p-2 rounded-lg shadow">
          <FaMapMarkerAlt className="text-[#FE7A3A]" />
        </button>
      </div>

      {/* Activities List */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.activity_id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Activity Images */}
              <div className="overflow-hidden object-cover rounded-lg">
                <img
                  src={
                    activity.uploaded_images?.length > 0
                      ? activity.uploaded_images[0]
                      : "duplicate.png"
                  }
                  alt={activity.activity_title || "Activity image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "upswapfeatures.png";
                  }}
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {activity.activity_title || "Untitled Activity"}
                  </h2>
                  <span className="bg-[#FE7A3A] text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {activity.activity_category?.actv_category ||
                      "Uncategorized"}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">📍</span>
                    <span>{activity.location || "Location not specified"}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">👥</span>
                    <span>
                      {activity.user_participation ? "Open" : "Closed"}
                      {activity.maximum_participants > 0 &&
                        ` (Max ${activity.maximum_participants})`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">⏰</span>
                    <span>
                      {activity.infinite_time
                        ? "Ongoing"
                        : `${activity.start_date || ""} to ${
                            activity.end_date || ""
                          }`}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button className="mt-3 px-4 py-2 bg-[#FE7A3A] text-white rounded-md hover:bg-[#e4672a]">
                    View Details
                  </button>
                  <span className="text-xs text-gray-500">
                    {activity.start_date
                      ? new Date(activity.start_date).toLocaleDateString()
                      : "Date not available"}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            className="fixed bottom-20 right-5 bg-[#FE7A3A] text-white p-3 rounded-full shadow-lg"
            onClick={() => navigate("/PostActivities")}
          >
            <FaPlus className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesList;
