import React, { useState, useEffect } from "react";
import "./dangnhap.scss";
import userServices from "../../services/user";
import { useGlobalDataContext } from "../../hook/globalData";
import { message } from "antd";

const Dangky = () => {
  const { setTitle } = useGlobalDataContext();
  useEffect(() => {
    setTitle("ĐĂNG KÝ");
  }, [setTitle]);
  const [messageApi, contextHolder] = message.useMessage();
  const [ten_user, setTenUser] = useState("");
  const [email, setEmail] = useState("");
  const [SDT, setSDT] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [SDTError, setSDTError] = useState("");

  const validateSDT = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      setSDTError("Số điện thoại không hợp lệ");
    } else {
      setSDTError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      messageApi.open({
        type: "error",
        content: "Mật khẩu nhập lại chưa giống!",
      });
      return;
    }
    if (SDTError) {
      messageApi.open({
        type: "error",
        content: "Vui lòng nhập số điện thoại hợp lệ!",
      });
      return;
    }
    try {
      if (ten_user && email && SDT && password) {
        const res = await userServices.register({
          ten_user,
          email,
          SDT,
          password,
        });
        if (res.errorCode === 0) {
          messageApi.open({
            type: "success",
            content: "đăng ký thành công!",
          });
        }
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "số điện thoại đăng ký đã tồn tại!",
      });
    }
  };

  return (
    <div className="body">
      {contextHolder}
      <div className="container login-form">
        <form onSubmit={handleSubmit} className="form-login">
          <div className="mb-3">
            <label htmlFor="exampleInputTenUser1" className="form-label">
              Nhập tên của bạn
            </label>
            <input
              value={ten_user}
              onChange={(e) => setTenUser(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputTenUser1"
              aria-describedby="tenUserHelp"
            />
            <div id="tenUserHelp" className="form-text">
              Nickname
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nhập địa chỉ email của bạn
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              Địa chỉ email liên hệ
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputSDT1" className="form-label">
              Số điện thoại
            </label>
            <input
              value={SDT}
              onChange={(e) => {
                setSDT(e.target.value);
                validateSDT(e.target.value);
              }}
              type="text"
              className={`form-control ${SDTError ? "is-invalid" : ""}`}
              id="exampleInputSDT1"
              aria-describedby="SDTHelp"
            />
            <div
              id="SDTHelp"
              className={`form-text ${SDTError ? "text-danger" : ""}`}
            >
              {SDTError || "We'll never share your SDT with anyone else."}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Nhập mật khẩu
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputConfirmPassword1"
              className="form-label"
            >
              Nhập lại mật khẩu
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputConfirmPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dangky;
