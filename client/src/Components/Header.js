import React from "react";
import "./Header.css";
import Logo from "./Logo";
import Search from "./Search";

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/*{logo}*/}
      <Logo />
      {/*{searchbar}*/}
      <Search />
      {/*{nav}*/}
    </header>
  );
}

export default Header;
