import React from "react";
import { useNavigate } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        toast.error("Refresh token missing. Logging out...");
        localStorage.clear();
        navigate("/login");
        return;
      }

      const response = await fetch("https://api.upswap.app/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        toast.success("Logout successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Logout failed: ${errorData.message || "Unknown error"}`);
      }

      localStorage.clear();
      navigate("/login");
    } catch (error) {
      toast.error("Error during logout. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center cursor-pointer w-full p-1 h-10 mt-3"
      onClick={handleLogout}
    >
      <CgLogOff className="h-5 w-5 ml-1 text-red-600" />
      <p className="text-black text-sm ml-3">Logout</p>
    </div>
  );
};

export default LogOut;
