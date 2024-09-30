import React, { useEffect, useState } from "react";
import "./adminProduct.scss";
import sanPhamServices from "./../../services/sanpham";
import loaiServices from "../../services/loai";
import spham from "../../assets/img/1.png";
import { Link } from "react-router-dom";
import { useGlobalDataContext } from "../../hook/globalData";

const AdminProduct = () => {
  const { setTitle } = useGlobalDataContext();
  const [ten_SP, setTenSP] = useState("");

  const [mo_ta, setMoTa] = useState("");
  const [link_hinh, setLinkHinh] = useState("");
  const [id_loai, setIDLoai] = useState("");
  const [allType, setAllType] = useState([]);
  const [allSP, setAllSP] = useState([]);
  const [oneSP, setGetOneSP] = useState([]);
  useEffect(() => {
    getAllSP();
  }, []);
  useEffect(() => {
    setTitle("Quản Lý Sản Phẩm");
  }, [setTitle]);
  const createSP = async (e) => {
    e.preventDefault();
    try {
      if (ten_SP && mo_ta && link_hinh && id_loai) {
        const res = await sanPhamServices.create({
          ten_SP,
          mo_ta,
          link_hinh,
          id_loai,
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

  const updateSP = async (e) => {
    e.preventDefault();
    try {
      if (ten_SP && mo_ta && link_hinh && id_loai && oneSP) {
        const res = await sanPhamServices.edit(oneSP.id_SP, {
          ten_SP,
          mo_ta,
          link_hinh,
          id_loai,
        });
        if (res.errorCode === 0) {
          alert(res.message);
          await getAllSP();
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  const getAllSP = async () => {
    try {
      const res = await sanPhamServices.getAll();
      console.log(res);
      if (res.errorCode === 0) {
        setAllSP(res.data.sanphams);
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  const getOneSP = async (id) => {
    try {
      if (id) {
        const res = await sanPhamServices.getOne(id);
        if (res.errorCode === 0) {
          setGetOneSP(res.data);
          setTenSP(res.data?.ten_SP);
          setMoTa(res.data?.mo_ta);
          setLinkHinh(res.data?.link_hinh);
          setIDLoai(res.data?.id_loai);
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };
  const handelOpenModal = async (id) => {
    setTenSP("");
    await getOneSP(id);
  };
  const resetInputs = () => {
    setTenSP("");
    setMoTa("");
    setLinkHinh("");
    setIDLoai("");
  };
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await loaiServices.getAll();
        if (res.errorCode === 0) {
          setAllType(res.data.loais); // Lưu danh sách loại vào state
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
        type="button"
        className="add-product"
        data-bs-toggle="modal"
        data-bs-target="#bookModal"
      >
        <i className="fa-solid fa-square-plus"></i>
      </button>

      <div
        className="modal fade"
        id="bookModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="bookModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <form
            className="modal-content form_add"
            onSubmit={(e) => createSP(e)}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="bookModalLabel">
                hhh
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
                  value={ten_SP}
                  onChange={(e) => setTenSP(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên sản phẩm"
                />
                <select
                  value={id_loai}
                  onChange={(e) => setIDLoai(e.target.value)}
                  className="form-select"
                >
                  <option value="">Chọn loại</option>
                  {allType.map((type) => (
                    <option key={type.id_loai} value={type.id_loai}>
                      {type.ten_loai}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bao_input_add d-flex">
                <div className="input-group input_box">
                  <span
                    className="input-group-text input-add"
                    id="addon-wrapping"
                  >
                    <i className="fa-solid fa-image"></i>
                  </span>
                  <input
                    value={link_hinh}
                    onChange={(e) => setLinkHinh(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Hình ảnh"
                  />
                </div>
                <div className="input-group input_box">
                  <span
                    className="input-group-text input-add"
                    id="addon-wrapping"
                  >
                    <i className="fa-regular fa-calendar-days"></i>
                  </span>
                  <input
                    value={mo_ta}
                    onChange={(e) => setMoTa(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Nhập mô tả"
                  />
                </div>
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
                them
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="t-heard d-flex">
          <div className="field-heard col-md-2">id</div>
          <div className="field-heard col-md-4">Tên san pham</div>
          <div className="field-heard col-md-1">Hình Ảnh</div>
          <div className="field-heard col-md-2">Loại</div>
          <div className="field-heard col-md-3">Thao Tác</div>
        </div>
      </div>
      <div className="row">
        <div className="t-body-product" data-toggle="tooltip">
          {allSP?.map((product, i) => (
            <div className="t-body d-flex" key={product.id_SP}>
              <div className="field-body col-md-2">
                <p>{i + 1}</p>
              </div>
              <div className="field-body col-md-4">
                <p>{product.ten_SP}</p>
              </div>
              <div className="field-body col-md-1">
                <img className="img-product" src={spham} alt="" />
              </div>

              <div className="field-body col-md-2">
                <p>{product.loai.ten_loai}</p>
              </div>
              {/* <div className="field-body col-md-1">
                <p>{product.id_SP}</p>
              </div>
              <div className="field-body col-md-1">
                <p>{product.id_SP}</p>
              </div> */}

              <div className="field-body col-md-3">
                <button
                  className="view"
                  data-bs-toggle="modal"
                  data-bs-target="#xem"
                  onClick={() => handelOpenModal(product.id_SP)}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
                {product.id_SP && (
                  <Link to={`/sizeproduct/${product.id_SP}`}>
                    <button className="size">
                      <i className="fa-solid fa-plus-minus"></i>
                    </button>
                  </Link>
                )}
                <button
                  className="edit"
                  data-bs-toggle="modal"
                  data-bs-target="#sua"
                  onClick={() => handelOpenModal(product.id_SP)}
                >
                  <i className="fa-solid fa-pen-nib"></i>
                </button>
                <button
                  type="button"
                  className="delete"
                  data-bs-toggle="modal"
                  data-bs-target="#delete"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
          <div
            className="modal fade"
            id="sua"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="bookModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <form
                className="modal-content form_add"
                onSubmit={(e) => updateSP(e)}
              >
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="bookModalLabel">
                    sua
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
                      placeholder="Nhập tên sản phẩm"
                      value={ten_SP}
                      onChange={(e) => setTenSP(e.target.value)}
                    />
                    <select
                      value={id_loai}
                      onChange={(e) => setIDLoai(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Chọn loại</option>
                      {allType.map((type) => (
                        <option key={type.id_loai} value={type.id_loai}>
                          {type.ten_loai}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bao_input_add d-flex">
                    <div className="input-group input_box">
                      <span
                        className="input-group-text input-add"
                        id="addon-wrapping"
                      >
                        <i className="fa-solid fa-image"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Hình ảnh"
                        value={link_hinh}
                        onChange={(e) => setTenSP(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="bao_input_add d-flex">
                    <div className="input-group input_box">
                      <span
                        className="input-group-text input-add"
                        id="addon-wrapping"
                      >
                        <i className="fa-regular fa-calendar-days"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập mô tả"
                        value={mo_ta}
                        onChange={(e) => setTenSP(e.target.value)}
                      />
                    </div>
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
                    sua
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            class="modal fade"
            id="xem"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Chi tiết sản phẩm
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body body-view">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="img-left">
                        <img class="img-product" src={spham} alt="" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="py-2">
                        id:
                        <span>{oneSP && oneSP.id_SP}</span>
                      </div>
                      <div class="py-2">
                        Tên sách:
                        <span>{oneSP && oneSP.ten_SP}</span>
                      </div>

                      <div class="py-2">
                        Loại:
                        <span>{oneSP && oneSP.loai?.ten_loai}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="delete"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Xóa Sản Phẩm
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn_accept"
                    data-bs-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button type="button" class=" btn btn_close ">
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
