import React, { useEffect, useState } from "react";
import "./adminType.scss";
import loaiServices from "../../services/loai";
import { useGlobalDataContext } from "../../hook/globalData";

const AdminPage = () => {
  const [ten_loai, setTenLoai] = useState("");
  const { setTitle } = useGlobalDataContext();
  const [allType, setAllType] = useState([]);
  const [oneType, setGetOneType] = useState([]);
  useEffect(() => {
    getAllType();
  }, []);
  useEffect(() => {
    setTitle("Quản Lý Loại");
  }, [setTitle]);

  const createType = async (e) => {
    e.preventDefault();
    try {
      if (ten_loai) {
        const res = await loaiServices.create({
          ten_loai,
        });
        if (res.errorCode === 0) {
          alert(res.message);
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };
  const updateType = async (e) => {
    e.preventDefault();
    try {
      if (ten_loai && oneType) {
        const res = await loaiServices.edit(oneType.id_loai, {
          ten_loai,
        });
        if (res.errorCode === 0) {
          alert(res.message);
          await getAllType();
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  const getAllType = async () => {
    try {
      const res = await loaiServices.getAll();
      if (res.errorCode === 0) {
        setAllType(res.data.loais);
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };
  const getOneType = async (id) => {
    try {
      if (id) {
        const res = await loaiServices.getOne(id);
        if (res.errorCode === 0) {
          setGetOneType(res.data);
          setTenLoai(res.data?.ten_loai);
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };
  const handelOpenModal = async (id) => {
    setTenLoai("");
    await getOneType(id);
  };

  return (
    <div>
      <button
        className="add-product"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <i className="fa-solid fa-square-plus"></i>
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <form
          className="modal-dialog modal-dialog-scrollable"
          onSubmit={(e) => createType(e)}
        >
          <div className="modal-content form_add">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Thêm Loại
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group input_box">
                <span className="input-group-text input-add" id="basic-addon1">
                  <i className="fa-solid fa-file-signature"></i>
                </span>
                <input
                  value={ten_loai}
                  onChange={(e) => setTenLoai(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên loại"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn_close"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="submit" className="btn btn_accept">
                Thêm
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="t-heard d-flex">
          <div className="field-heard col-md-3">id</div>
          <div className="field-heard col-md-6">Tên loại</div>
          <div className="field-heard col-md-3">Thao tác</div>
        </div>
      </div>
      <div className="row">
        <div
          className="t-body-product"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {allType?.map((type, i) => (
            <div className="t-body d-flex" key={type.id_loai}>
              <div className="field-body col-md-3">
                <p>{i + 1}</p>
              </div>
              <div className="field-body col-md-6">
                <p>{type.ten_loai}</p>
              </div>
              <div className="field-body thaotac col-md-3">
                <button
                  className="view"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handelOpenModal(type.id_loai)}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
                <button
                  className="delete"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop1"
                  onClick={() => handelOpenModal(type.id_loai)}
                >
                  <i className="fa-solid fa-pen-nib"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Chi tiết loại
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body body-view">
                <div className="py-2">
                  id: <span>{oneType && oneType.id_loai}</span>
                </div>
                <div className="py-2">
                  Tên loại: <span>{oneType && oneType.ten_loai}</span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="staticBackdrop1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <form
            className="modal-dialog modal-dialog-scrollable"
            onSubmit={(e) => updateType(e)}
          >
            <div className="modal-content form_add">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Sửa loại
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group input_box">
                  <span
                    className="input-group-text input-add"
                    id="basic-addon1"
                  >
                    <i className="fa-solid fa-file-signature"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên loại"
                    value={ten_loai}
                    onChange={(e) => setTenLoai(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn_close"
                  data-bs-dismiss="modal"
                >
                  Đóng
                </button>
                <button type="submit" className="btn btn_accept">
                  Sửa
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
