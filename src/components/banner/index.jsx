import React from "react";

import "./banner.scss";
const Banner = () => {
  return (
    <div>
      <div className="row banner mx-5">
        <div className="col-3 d-flex align-items-center justify-content-center bao-sticker">
          <div className="sticker1"></div>
        </div>
        <div className="col-6"></div>
        <div className="col-3 d-flex align-items-center justify-content-center bao-sticker">
          <div className="sticker2"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
