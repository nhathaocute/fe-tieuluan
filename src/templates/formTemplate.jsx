import React from "react";
import Header from "../layouts/header/header";
import { Outlet } from "react-router-dom";
const FormTemplate = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default FormTemplate;
