import React from "react";

import "./Footer.css";

const Footer = props => (
  <React.Fragment>
    <span>&copy; 2019 - 2020 by Kadoqu</span>
    <span className="ml-auto">
      Powered by <a href="https://coreui.io/react">CoreUI for React <i className="fa fa-heart"></i></a>
    </span>
  </React.Fragment>
);

export default Footer;
