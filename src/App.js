import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Authentication/AuthContext";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Layout from "./components/Common/Layout";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleMapComponent from "./components/GoogleMapComponent";
import "./api/interceptors";

// Authentication Components
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import SocialLogin from "./components/Authentication/SocialLogin";
import VerifyOtp from "./components/Authentication/VerifyOtp";
import VerifyOtpForgotPassword from "./components/Authentication/VerifyOtpForgotPassword";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";

// Main Components
import MainMenu from "./components/MainMenu";
import UpswapFeatures from "./components/UpswapFeatures";
import MyActivities from "./components/Activities/MyActivities";
import MyPersonalAccount from "./components/MyPersonalAccount";
import UserProfile from "./components/UserProfile";
import UpswapVendors from "./components/UpswapVendors";
// import Activities from "./components/Activities";
import DealsPage from "./components/DealsPage";
import Header from "./components/Dashboard/Header";

// Vendor KYC Components
import BasicInfo from "./components/VendorKYC/BasicInfo";
import VendorDocument from "./components/VendorKYC/VendorDocument";
import BankDetails from "./components/VendorKYC/BankDetails";
import ServiceTime from "./components/VendorKYC/ServiceTime";
import AddAddress from "./components/VendorKYC/AddAddress";
import AddService from "./components/VendorKYC/AddService";

// Deals Components
import PostDeal from "./components/Deals/PostDeal";
import PostDealNext from "./components/Deals/PostDealNext";
import MyDeals from "./components/Deals/MyDeals";
import DealDetails from "./components/DealDetails";

import Favorite from "./components/Favorite";
import Unfavorite from "./components/Unfavorite";
import VendorProfile from "./components/VendorProfile";

// Activities Components
import PostActivities from "./components/Activities/PostActivities";
import PostActivitiesnext from "./components/Activities/PostActivitiesnext";
import ActivitiesPage from "./components/Activities/ActivitiesPage";
import ActivitiesDetails from "./components/Activities/ActivitiesDetails";

// Chatting Components

import ChatRoom from "./components/Activities/ChatRoom";

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="241793290888-p8ba5p5ucgn1f5mj8un3h71u6a52chkg.apps.googleusercontent.com">
        {/* <GoogleMapComponent /> */}
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
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SocialLogin" element={<SocialLogin />} />
            <Route path="/VerifyOtp" element={<VerifyOtp />} />
            <Route
              path="/VerifyOtpForgotPassword"
              element={<VerifyOtpForgotPassword />}
            />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                {/* Main Routes */}
                <Route path="MainMenu" element={<MainMenu />} />
                <Route path="UpswapFeatures" element={<UpswapFeatures />} />
                <Route path="MyActivities" element={<MyActivities />} />
                <Route
                  path="MyPersonalAccount"
                  element={<MyPersonalAccount />}
                />
                <Route path="UserProfile" element={<UserProfile />} />
                <Route path="UpswapVendors" element={<UpswapVendors />} />
                {/* <Route path="Activities" element={<Activities />} /> */}
                <Route path="DealsPage" element={<DealsPage />} />
                <Route path="Header" element={<Header />} />

                {/* Vendor KYC Routes */}
                <Route path="BasicInfo" element={<BasicInfo />} />
                <Route path="VendorDocument" element={<VendorDocument />} />
                <Route path="BankDetails" element={<BankDetails />} />
                <Route path="ServiceTime" element={<ServiceTime />} />
                <Route path="AddAddress" element={<AddAddress />} />
                <Route path="AddService" element={<AddService />} />

                {/* Deals Routes */}
                <Route path="PostDeal" element={<PostDeal />} />
                <Route path="PostDealNext" element={<PostDealNext />} />
                <Route
                  path="DealDetails/:deal_uuid"
                  element={<DealDetails />}
                />
                <Route path="/DealsPage" element={<DealsPage />} />
                <Route path="MyDeals" element={<MyDeals />}></Route>
                <Route path="/MyDeals/live" element={<MyDeals type="live" />} />
                <Route
                  path="/MyDeals/scheduled"
                  element={<MyDeals type="scheduled" />}
                />
                <Route
                  path="/MyDeals/history"
                  element={<MyDeals type="history" />}
                />
                <Route path="/MyDeals/all" element={<MyDeals type="all" />} />

                {/* Activities Routes */}
                <Route path="PostActivities" element={<PostActivities />} />
                <Route
                  path="PostActivitiesnext"
                  element={<PostActivitiesnext />}
                />
                <Route path="ActivitiesPage" element={<ActivitiesPage />} />
                <Route path="MyActivities" element={<MyActivities />} />
                {/* <Route
                  path="PostedActivities"
                  element={<MyActivities type="PostedActivities" />}
                /> */}
                {/* MyActivities Routes */}
                <Route path="/MyActivities/All" element={<MyActivities />} />
                <Route path="/MyActivities/Live" element={<MyActivities />} />
                <Route
                  path="/MyActivities/Participation"
                  element={<MyActivities />}
                />
                <Route
                  path="/MyActivities/History"
                  element={<MyActivities />}
                />
                <Route path="/MyActivities/:type" element={<MyActivities />} />

                <Route
                  path="/ActivitiesDetails/:activityId"
                  element={<ActivitiesDetails />}
                />
                
                <Route path="ChatRoom" element={<ChatRoom />} />
                <Route
                  path="/chat/:activityId/:chatroomId"
                  element={<ChatRoom />}
                />

                <Route path="Favorite" element={<Favorite />} />
                <Route path="Unfavorite" element={<Unfavorite />} />
                {/* <Route path="Vendors" element={<Vendors />} /> */}
                <Route path="/vendor/:userId" element={<VendorProfile />} />
                <Route
                  path="/VendorProfile/:vendorId"
                  element={<VendorProfile />}
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
