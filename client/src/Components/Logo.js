import React from "react";
import "./logo.css";
import logo from "../assets/logo.png";

function Logo() {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
        {<img src={logo} alt="Inventory Manager" />}
        {<span>Dorchester Inventory Manager</span>}
      </a>
    </div>
  );
}

export default Logo;
