import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeTemplate from "../templates/homeTemplate";
import FormTemplate from "../templates/formTemplate";
import Home from "../pages/home";
import Dangnhap from "../pages/dangnhap";
import Dangky from "../pages/dangnhap/dangky";
import AdminTemplate from "../templates/adminTemplate";
import AdminPage from "../pages/admin";
import AdminProduct from "../pages/adminProduct";
import SizePrice from "../pages/sizeProduct";
import Size from "../pages/size";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/" element={<FormTemplate />}>
          <Route path="/login" element={<Dangnhap />} />
          <Route path="/register" element={<Dangky />} />
        </Route>
        <Route path="/" element={<AdminTemplate />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adminproduct" element={<AdminProduct />} />
          <Route path="/sizeproduct/:id" element={<SizePrice />} />
          <Route path="/size" element={<Size />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
