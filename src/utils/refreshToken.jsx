import axios from "axios";

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh_token");

  try {
    const response = await axios.post("https://api.upswap.app/api/token/refresh/", {
      refresh: refresh,
    });

    const newAccess = response.data.access;
    localStorage.setItem("access", newAccess);

    return newAccess;
  } catch (error) {
    console.error("Refresh token failed:", error.response?.data || error.message);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"; // optional: force logout
    return null;
  }
};
