import React, { useEffect, useState } from "react";
import spham from "../../assets/img/1.png";
import { Button } from "antd";
import "./card.scss";
import sanPhamServices from "../../services/sanpham";

const Card = () => {
  const [allSP, setAllSP] = useState([]);
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
  useEffect(() => {
    getAllSP();
  }, []);
  return (
    <div className="row">
      {allSP?.map((product) => (
        <div className="col-3">
          <div className="card-all-product">
            <div class="group-img-product">
              <img className="card-img-top" src={spham} alt="My Image" />
              <div class="new">new</div>
              <div class="view-details">
                <i class="fa-solid fa-eye"></i>
              </div>
            </div>
            <div class="group-content-product">
              <h3 class="title-product">{product.ten_SP}</h3>
              <div class="price-product">Giá: 100000 VNĐ</div>

              <Button
                className="button-addcard"
                color="primary"
                variant="outlined"
              >
                <i class="fa-solid fa-cart-plus"></i>
              </Button>

              <Button className="button-addheart" type="text" danger>
                <i class="fa-regular fa-heart"></i>
              </Button>
              <Button
                className="button-info"
                color="primary"
                variant="outlined"
              >
                <i class="fa-solid fa-circle-info"></i>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
