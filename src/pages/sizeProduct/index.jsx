import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalDataContext } from "../../hook/globalData";
import "./sizeProduct.scss";
import sizeServices from "../../services/size";
import sizeProductServices from "../../services/gia";

const SizePrice = () => {
  const { setTitle } = useGlobalDataContext();
  const { id } = useParams(); // Get the product ID from URL
  const [gia, setGia] = useState("");
  const [so_luong, setSoLuong] = useState("");
  const [allSize, setAllSize] = useState([]);
  const [id_size, setIDsize] = useState("");

  useEffect(() => {
    setTitle("Quản Lý Giá Theo Size");
    // Fetch sizes for the product if needed
  }, [setTitle, id]);
  const createGia = async (e) => {
    e.preventDefault();
    try {
      if (gia && so_luong && id && id_size) {
        const res = await sizeProductServices.create({
          gia,
          so_luong,
          id_SP: id,
          id_size,
        });
        if (res.errorCode === 0) {
          alert(res.message);
          resetInputs();
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  const resetInputs = () => {
    setSoLuong("");
    setGia("");
    setIDsize("");
  };
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await sizeServices.getAll();
        if (res.errorCode === 0) {
          setAllSize(res.data.sizes); // Lưu danh sách loại vào state
        }
      } catch (err) {
        alert(err?.response?.data?.message);
      }
    };
    fetchTypes(); // Gọi hàm để lấy loại khi component mount
  }, []);
  return (
    <div>
      <button
        className="add-product"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <i className="fa-solid fa-square-plus"></i>
      </button>
      <p>Thêm giá cho sản phẩm: {id}</p> {/* Display the product ID */}
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
          onSubmit={(e) => createGia(e)}
        >
          <div className="modal-content form_add">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Thêm giá size
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

                <select
                  value={id_size}
                  onChange={(e) => setIDsize(e.target.value)}
                  className="form-select"
                >
                  <option value="">Chọn size</option>
                  {allSize.map((size) => (
                    <option key={size.id_size} value={size.id_size}>
                      {size.ten_size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group input_box">
                <span className="input-group-text input-add" id="basic-addon1">
                  <i className="fa-solid fa-dong-sign"></i>
                </span>
                <input
                  value={gia}
                  onChange={(e) => setGia(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Nhập giá size"
                />
              </div>
              <div className="input-group input_box">
                <span className="input-group-text input-add" id="basic-addon1">
                  <i className="fa-solid fa-layer-group"></i>
                </span>
                <input
                  value={so_luong}
                  onChange={(e) => setSoLuong(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Nhập số lượng theo size"
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
          <div className="field-heard col-md-3">Tên size</div>
          <div className="field-heard col-md-3">giá</div>
          <div className="field-heard col-md-3">số lượng</div>
          <div className="field-heard col-md-3">thao tác</div>
        </div>
      </div>
      <div className="row">
        <div
          className="t-body-product"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {/* {allType?.map((type) => ( */}
          <div className="t-body d-flex">
            <div className="field-body col-md-3">
              <p>ten</p>
            </div>
            <div className="field-body col-md-3">
              <p>gia</p>
            </div>
            <div className="field-body col-md-3">
              <p>sl</p>
            </div>
            <div className="field-body thaotac col-md-3">
              <button
                className="view"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa-solid fa-eye"></i>
              </button>
              <button
                className="delete"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop1"
              >
                <i className="fa-solid fa-pen-nib"></i>
              </button>
            </div>
          </div>
          {/* ))} */}
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
                  {/* id: <span>{oneType && oneType.id_loai}</span> */}
                </div>
                <div className="py-2">
                  {/* Tên loại: <span>{oneType && oneType.ten_loai}</span> */}
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
            // onSubmit={(e) => updateType(e)}
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
                    // value={ten_loai}
                    // onChange={(e) => setTenLoai(e.target.value)}
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

export default SizePrice;
