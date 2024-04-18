import React, { useState } from "react";
import { MdDashboard, MdInventory2 } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ children }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const toggle = () => SetIsOpen(!isOpen);
  const menuItem = [
    {
      name: "Dashboard",
      path: "/Dashboard",
      icon: <MdDashboard />,
    },
    {
      name: "Inventory",
      path: "/Inventory",
      icon: <MdInventory2 />,
    },
    {
      name: "Reports",
      path: "/Reports",
      icon: <TbReportSearch />,
    },
    {
      name: "Transactions",
      path: "/Transactions",
      icon: <GrTransaction />,
    },
    {
      name: "Profile",
      path: "/Profile",
      icon: <FaUserAlt />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="navbar">
        <div className="top-section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Welcome 😊! {/**get name from the user */}
          </h1>
          <div style={{ marginLeft: isOpen ? "5px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon"> {item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Navbar;
