import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Common/Layout";
import Register from "./components/Authentication/Register";
import MainMenu from "./components/MainMenu";
import UpswapFeatures from "./components/UpswapFeatures";
import MyActivities from "./components/MyActivities";
import AllMyDeals from "./components/AllMyDeals";
import LiveMyDeals from "./components/LiveMyDeals";
import MyPersonalAccount from "./components/MyPersonalAccount";
import UpswapVendors from "./components/UpswapVendors";
import Activities from "./components/Activities";
import DealsPage from "./components/DealsPage";
import Header from "./components/Dashboard/Header";
import { ToastContainer } from "react-toastify";
import Login from "./components/Authentication/Login";
import VerifyOtp from "./components/Authentication/VerifyOtp";
import VerifyOtpForgotPassword from "./components/Authentication/VerifyOtpForgotPassword";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BasicInfo from "./components/VendorKYC/BasicInfo";
import VendorDocument from "./components/VendorKYC/VendorDocument";
import BankDetails from "./components/VendorKYC/BankDetails";
import ServiceTime from "./components/VendorKYC/ServiceTime";

function App() {
  return (
    <GoogleOAuthProvider clientId="241793290888-p8ba5p5ucgn1f5mj8un3h71u6a52chkg.apps.googleusercontent.com">
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/VerifyOtp" element={<VerifyOtp />} />
          <Route
            path="/VerifyOtpForgotPassword"
            element={<VerifyOtpForgotPassword />}
          />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />

          {/* Layout ke andar saare routes */}
          <Route path="/*" element={<Layout />}>
            <Route path="MainMenu" element={<MainMenu />} />
            <Route path="UpswapFeatures" element={<UpswapFeatures />} />
            <Route path="MyActivities" element={<MyActivities />} />
            <Route path="AllMyDeals" element={<AllMyDeals />} />
            <Route path="LiveMyDeals" element={<LiveMyDeals />} />
            <Route path="MyPersonalAccount" element={<MyPersonalAccount />} />
            <Route path="UpswapVendors" element={<UpswapVendors />} />
            <Route path="Activities" element={<Activities />} />
            <Route path="DealsPage" element={<DealsPage />} />
            <Route path="Header" element={<Header />} />
            <Route path="BasicInfo" element={<BasicInfo />} />
            <Route path="VendorDocument" element={<VendorDocument />} />
            <Route path="BankDetails" element={<BankDetails />} />
            <Route path="ServiceTime" element={<ServiceTime />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
