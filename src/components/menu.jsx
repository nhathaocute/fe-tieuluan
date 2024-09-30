import React from "react";

const Menu = () => {
  return (
    <div>
      <a
        className="btn menu-canvas"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <i className="fa-regular fa-rectangle-list"></i>
        <span className="mx-1">menu</span>
      </a>
    </div>
  );
};

export default Menu;
