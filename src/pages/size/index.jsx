import React, { useEffect, useState } from "react";
import "./size.scss";
import { useGlobalDataContext } from "../../hook/globalData";
import sizeServices from "../../services/size";

const Size = () => {
  const [ten_size, setTenSize] = useState("");
  const { setTitle } = useGlobalDataContext();
  const [allSize, setAllSize] = useState([]);
  const [oneSize, setGetOneSize] = useState({});

  useEffect(() => {
    setTitle("Quản Lý Size");
  }, [setTitle]);

  useEffect(() => {
    getAllSize();
  }, []);

  const createSize = async (e) => {
    e.preventDefault();
    try {
      if (ten_size) {
        const res = await sizeServices.create({ ten_size });
        if (res.errorCode === 0) {
          alert(res.message);
          setTenSize(""); // Clear input after submission
          getAllSize(); // Refresh the list
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  const updateSize = async (e) => {
    e.preventDefault();
    try {
      if (ten_size && oneSize.id_size) {
        const res = await sizeServices.edit(oneSize.id_size, { ten_size });
        if (res.errorCode === 0) {
          alert(res.message);
          await getAllSize();
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  const getAllSize = async () => {
    try {
      const res = await sizeServices.getAll();
      if (res.errorCode === 0) {
        console.log(res);
        setAllSize(res.data.sizes);
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  const getOneSize = async (id) => {
    try {
      if (id) {
        const res = await sizeServices.getOne(id);
        if (res.errorCode === 0) {
          setGetOneSize(res.data);
          setTenSize(res.data.ten_size);
        }
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  const handleOpenModal = async (id) => {
    if (id) {
      await getOneSize(id);
    } else {
      setTenSize(""); // Clear input when opening create modal
    }
  };

  return (
    <div>
      <button
        className="add-product"
        data-bs-toggle="modal"
        data-bs-target="#createSizeModal"
        onClick={() => handleOpenModal(null)}
      >
        <i className="fa-solid fa-square-plus"></i>
      </button>

      {/* Create Size Modal */}
      <div
        className="modal fade"
        id="createSizeModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createSizeModalLabel"
        aria-hidden="true"
      >
        <form
          className="modal-dialog modal-dialog-scrollable"
          onSubmit={createSize}
        >
          <div className="modal-content form_add">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="createSizeModalLabel">
                Thêm Size
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
                  value={ten_size}
                  onChange={(e) => setTenSize(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên size"
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

      {/* Size List */}
      <div className="row">
        <div className="t-heard d-flex">
          <div className="field-heard col-md-3">ID</div>
          <div className="field-heard col-md-6">Tên Size</div>
          <div className="field-heard col-md-3">Thao Tác</div>
        </div>
      </div>
      <div className="row">
        {allSize?.map((size, i) => (
          <div className="t-body d-flex" key={size.id_size}>
            <div className="field-body col-md-3">
              <p>{i + 1}</p>
            </div>
            <div className="field-body col-md-6">
              <p>{size.ten_size}</p>
            </div>
            <div className="field-body thaotac col-md-3">
              <button
                className="view"
                data-bs-toggle="modal"
                data-bs-target="#viewSizeModal"
                onClick={() => handleOpenModal(size.id_size)}
              >
                <i className="fa-solid fa-eye"></i>
              </button>
              <button
                className="edit"
                data-bs-toggle="modal"
                data-bs-target="#editSizeModal"
                onClick={() => handleOpenModal(size.id_size)}
              >
                <i className="fa-solid fa-pen-nib"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Size Modal */}
      <div
        className="modal fade"
        id="viewSizeModal"
        tabIndex="-1"
        aria-labelledby="viewSizeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="viewSizeModalLabel">
                Chi Tiết Size
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
                ID: <span>{oneSize.id_size}</span>
              </div>
              <div className="py-2">
                Tên Size: <span>{oneSize.ten_size}</span>
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

      {/* Edit Size Modal */}
      <div
        className="modal fade"
        id="editSizeModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editSizeModalLabel"
        aria-hidden="true"
      >
        <form
          className="modal-dialog modal-dialog-scrollable"
          onSubmit={updateSize}
        >
          <div className="modal-content form_add">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editSizeModalLabel">
                Sửa Size
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
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên size"
                  value={ten_size}
                  onChange={(e) => setTenSize(e.target.value)}
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
  );
};

export default Size;
