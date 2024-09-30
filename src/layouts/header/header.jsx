import React, { useEffect, useState } from "react";
import "./header.scss";
import Logo from "../../components/logo";
import Menu from "../../components/menu";
import Search from "../../components/search";
import { useGlobalDataContext } from "../../hook/globalData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoginSelector } from "../../store/selectors";
import { logoutUser } from "../../store/actions";

const Header = () => {
  const { title } = useGlobalDataContext();
  const isLogin = useSelector(isLoginSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/"); // Điều hướng về trang chủ
  };

  useEffect(() => {
    const handleShown = () => {
      const items = document.querySelectorAll(".list-menu");
      items.forEach((item, index) => {
        item.style.animation = `slideIn 0.5s ease forwards`;
        item.style.animationDelay = `${index * 0.2}s`;
      });
    };

    const handleHidden = () => {
      const items = document.querySelectorAll(".list-menu");
      items.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(-20px)";
        item.style.animation = "";
      });
    };

    const offcanvasElement = document.getElementById("offcanvasExample");
    offcanvasElement.addEventListener("shown.bs.offcanvas", handleShown);
    offcanvasElement.addEventListener("hidden.bs.offcanvas", handleHidden);

    return () => {
      offcanvasElement.removeEventListener("shown.bs.offcanvas", handleShown);
      offcanvasElement.removeEventListener("hidden.bs.offcanvas", handleHidden);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "auto"; // Đảm bảo cuộn trang được kích hoạt
  }, []);

  return (
    <div>
      <header className="header">
        <div className="row mx-0">
          <div className="col-3 d-flex align-items-center justify-content-center">
            <Logo />
          </div>
          <div className="col-6">
            <h1 className="text-center text-shine">
              <span className="shine-effect">
                {title ?? "Dinh Dưỡng Từ Tôi"}
              </span>
            </h1>
            <Search />
          </div>
          <div className="col-3 menu-home">
            <Menu />
          </div>
        </div>
      </header>
      <div
        className="offcanvas offcanvas-end style-menu"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header header-menu">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="dropdown">
            {isLogin ? (
              <>
                <div className="list-menu">
                  <span>Thông tin tài khoản</span>
                </div>
                <div className="list-menu">
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              </>
            ) : (
              <>
                <div className="list-menu">
                  <Link to="/login" className="link-item">
                    Đăng nhập
                  </Link>
                </div>
                <div className="list-menu">
                  <Link to="/register" className="link-item">
                    Đăng ký
                  </Link>
                </div>
              </>
            )}
            <div className="list-menu">
              <a className="link-item">Sản phẩm</a>
            </div>
            <div className="list-menu">
              <a className="link-item">Liên hệ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
