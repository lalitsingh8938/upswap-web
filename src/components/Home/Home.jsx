import React from "react";
import Discover from "../Dashboard/DiscoverPage";
import Deals from "../Dashboard/Deals";
import Activities from "../Dashboard/Activities";
import Vendor from "../Dashboard/Vendor";
import Header from "../Dashboard/Header";
import Footer from "../Dashboard/Footer";

const Home = () => {
  return (
    <>
      <Discover />
      <Deals />
      <Activities />
      <Vendor />
    </>
  );
};

export default Home;
