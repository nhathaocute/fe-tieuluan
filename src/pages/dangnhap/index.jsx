import React, { useEffect, useState } from "react";
import "./dangnhap.scss";
import { useGlobalDataContext } from "../../hook/globalData";
import userServices from "../../services/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions";

const Dangnhap = () => {
  const dispatch = useDispatch();
  const { setTitle } = useGlobalDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("ĐĂNG NHẬP");
  }, [setTitle]);

  const [SDT, setSDT] = useState("");
  const [password, setPassword] = useState("");
  const [SDTError, setSDTError] = useState("");

  const validateSDT = (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      setSDTError("Số điện thoại hoặc mật khẩu không đúng!");
    } else {
      setSDTError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (SDTError) {
      alert("Vui lòng nhập số điện thoại hợp lệ!");
      return;
    }
    try {
      if (SDT && password) {
        const res = await userServices.login({
          password,
          SDT,
        });
        if (res.errorCode === 0) {
          alert(res.message);
          dispatch(loginUser(res.data));
          localStorage.setItem("isLoggedIn", "true");
          navigate("/"); // Điều hướng về trang chủ
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div className="body">
      <div className="container login-form">
        <form onSubmit={handleSubmit} className="form-login">
          <div className="mb-3">
            <label htmlFor="exampleInputSDT1" className="form-label">
              SDT
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dangnhap;
