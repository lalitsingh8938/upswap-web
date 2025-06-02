import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "./AuthContext";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google Login Failed: No credential received.");
        return;
      }

      const decodedToken = jwtDecode(credentialResponse.credential);

      const payload = {
        social_id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        type: "Google",
      };

      const response = await axios.post(
        "https://api.upswap.app/api/social-login/",
        payload
      );

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("social_id", response.data.user.social_id);
        console.log("sessionid", response.data.sessionid);
        localStorage.setItem("phone_number", response.data.user.phone_number);
        console.log("phone_number", response.data.user.phone_number);
        console.log("social_id", response.data.user.social_id);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("sessionid", response.data.sessionid);
        localStorage.setItem("email", response.data.user.email);
        
        localStorage.setItem("username", response.data.user.username);

        login();
        toast.success("Google Login Successful!");
        navigate("/Home");
      } else {
        toast.error("Login successful but token missing.");
      }
    } catch (error) {
      toast.error("Google Login Failed.");
      console.error(
        "Google Login Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => toast.error("Google Login Failed")}
    />
  );
};

export default SocialLogin;
