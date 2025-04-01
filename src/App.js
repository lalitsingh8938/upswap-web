import './App.css';
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
import ForgotPassword from './components/Authentication/ForgotPassword';

function App() {
  return (
    <Router>
       {/* <ToastContainer /> */}
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
        {/* SignUp ko alag rakhna */}
        <Route path="/" element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="VerifyOtp" element={<VerifyOtp />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />
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
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
