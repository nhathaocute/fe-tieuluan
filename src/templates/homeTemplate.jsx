import React from "react";
import Header from "../layouts/header/header";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/footer/footer";
const HomeTemplate = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeTemplate;
