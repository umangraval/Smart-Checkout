import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faBox,
  faBoxes,
  faMoneyCheckAlt,
  faUser,
  faDoorOpen,
  faBars,
  faCloud,
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
        <FontAwesomeIcon icon={faCloud} /> Mall Nuages
      </h1>
      <FontAwesomeIcon icon={faBars} className="Hamburger" />
      <NavLink className="Navlink" activeClassName="currNav" to="/dashboard">
        <FontAwesomeIcon icon={faHome} /> Overview
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/analytics">
        <FontAwesomeIcon icon={faChartLine} /> Analytics
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/products">
        <FontAwesomeIcon icon={faBox} /> Products
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/categories">
        <FontAwesomeIcon icon={faBoxes} /> Categories
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/transactions">
        <FontAwesomeIcon icon={faMoneyCheckAlt} /> Transactions
      </NavLink>
      <NavLink className="Navlink" activeClassName="currNav" to="/profile">
        <FontAwesomeIcon icon={faUser} /> Profile
      </NavLink>
      <NavLink
        className="Navlink"
        activeClassName="currNav"
        onClick={() => localStorage.removeItem("JWToken")}
        to="/login"
      >
        <FontAwesomeIcon icon={faDoorOpen} /> Logout
      </NavLink>
    </div>
  );
}
