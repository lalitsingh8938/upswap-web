// import Header from "../Dashboard/Header";
// import Sidebar from "../Dashboard/Sidebar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-grow ml-96">
//         <Header />
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;

// import Header from "../Dashboard/Header";
// import Sidebar from "../Dashboard/Sidebar";
// import Discover from "../Dashboard/DiscoverPage";
// import Deals from "../Dashboard/Deals";
// import Footer from "../Dashboard/Footer";
// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Layout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 1024) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="flex">
//       {isSidebarOpen && <Sidebar />}
//       <div
//         className={`flex-grow transition-all duration-300 ${
//           isSidebarOpen ? "ml-[265px]" : "ml-0"
//         }`}
//       >
//         <Header />
//         <Discover />
//         <Deals />
//         <Footer />
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;

// import Header from "../Dashboard/Header";
// import Sidebar from "../Dashboard/Sidebar";
// import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Layout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 1024) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="flex">
//       {isSidebarOpen && <Sidebar />}
//       <div
//         className={`flex-grow transition-all duration-300 ${
//           isSidebarOpen ? "ml-[265px]" : "ml-0"
//         }`}
//       >
//         <Header />
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;

// import Header from "../Dashboard/Header";
// import Discover from "../Dashboard/DiscoverPage";
// import Deals from "../Dashboard/Deals";
// import Activities from "../Dashboard/Activities";
// import Vendor from "../Dashboard/Vendor";
// import Footer from "../Dashboard/Footer";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="flex">
//       <div className="flex-grow ml-0 transition-all duration-300">
//         <Header />
//         <Discover />
//         <Deals />
//         <Activities />
//         <Vendor />
//         <Footer />
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;

import Header from "../Dashboard/Header";
import Footer from "../Dashboard/Footer";
import { Outlet } from "react-router-dom";
// import Sidebar from "../Dashboard/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <Sidebar /> */}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
