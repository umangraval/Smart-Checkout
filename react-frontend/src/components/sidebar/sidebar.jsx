import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBox,
  faBoxes,
  faMoneyCheckAlt,
  faUser,
  faDoorOpen,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.scss";

export default function sidebar() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showsidebar, setShowsidebar] = useState(false);

  return (
    <div
      className={showsidebar ? "sidebar" : "sidebarvis"}
      onClick={() => setShowsidebar(!showsidebar)}
    >
      <h1 className="header">
        <img src='./rlogo.png' alt="Logo" />
        {/* <FontAwesomeIcon icon={faCloud} />  */}
        {/* Smart Checkout */}
      </h1>
      <FontAwesomeIcon icon={faBars} className="Hamburger" />
      {/* <NavLink className="Navlink" activeClassName="currNav" to="/dashboard">
        <FontAwesomeIcon icon={faHome} /> Overview
      </NavLink> */}
      <NavLink className="Navlink" activeClassName="currNav" to="/analytics">
        <FontAwesomeIcon className="Navlogo" icon={faChartLine} /> Analytics
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/products">
        <FontAwesomeIcon className="Navlogo" icon={faBox} /> Products
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/categories">
        <FontAwesomeIcon className="Navlogo" icon={faBoxes} /> Categories
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/predictions">
        <FontAwesomeIcon className="Navlogo" icon={faChartLine} /> Predictions
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/transactions">
        <FontAwesomeIcon className="Navlogo" icon={faMoneyCheckAlt} /> Transactions
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/profile">
        <FontAwesomeIcon className="Navlogo" icon={faUser} /> Profile
      </NavLink>
      <NavLink
        className="Navlink"
        activeClassName="currNav"
        onClick={() => localStorage.removeItem("JWToken")}
        to="/login"
      >
        <FontAwesomeIcon className="Navlogo" icon={faDoorOpen} /> Logout
      </NavLink>
    </div>
  );
}
