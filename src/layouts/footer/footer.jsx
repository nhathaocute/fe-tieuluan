import React from "react";
import "./footer.scss";
import Logo from "../../components/logo";
const Footer = () => {
  return (
    <footer>
      <div class="body-footer">
        <div className="container">
          <div class="row">
            <div class="col-3">
              <Logo />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
