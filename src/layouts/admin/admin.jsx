import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./admin.scss";
import Logo from "../../components/logo";
import { useGlobalDataContext } from "../../hook/globalData";

const Admin = () => {
  const location = useLocation();
  const { title } = useGlobalDataContext();
  return (
    <div className="row reset-css-row">
      <div className="col-md-2 reset-css-admin">
        <div className="left-admin">
          <Logo />
          <nav>
            <Link
              to="/admin"
              className={`item-nav-admin ${
                location.pathname === "/admin" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-list"></i>
              <p>Quản Lý Loại</p>
            </Link>
            <Link
              to="/adminproduct"
              className={`item-nav-admin ${
                location.pathname === "/adminproduct" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-list"></i>
              <p>Quản Lý Sản Phẩm</p>
            </Link>
            <Link
              to="/size"
              className={`item-nav-admin ${
                location.pathname === "/size" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-list"></i>
              <p>Quản Lý Size</p>
            </Link>
          </nav>
        </div>
      </div>
      <div className="col-md-10 reset-css-admin">
        <div className="body-admin">
          <div className="container py-4">
            <div className="row">
              <div className="col-md-12">
                <h4>Xin chào Admin</h4>
                <div className="title-admin d-flex justify-content-between">
                  <h2>Chào mừng đến với milk tea Admin!</h2>
                  <h1>{title ?? "admin"}</h1>
                </div>
              </div>
            </div>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
