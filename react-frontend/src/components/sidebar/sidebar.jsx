import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.scss";

export default function sidebar() {
  return (
    <div className="sidebar App-sidebar">
      <div className="header">DASHBOARD</div>
      <NavLink className="Navlink" to="/dashboard">
        <FontAwesomeIcon icon={faHome} /> Overview
      </NavLink>
      <NavLink className="Navlink" to="/analytics">
        <FontAwesomeIcon icon={faChartLine} /> Analytics
      </NavLink>
      <NavLink className="Navlink" to="/products">
        <FontAwesomeIcon icon={faBox} /> Products
      </NavLink>
      <NavLink className="Navlink" to="/categories">
        <FontAwesomeIcon icon={faBoxes} /> Categories
      </NavLink>
      <NavLink className="Navlink" to="/transactions">
        <FontAwesomeIcon icon={faMoneyCheckAlt} /> Transactions
      </NavLink>
      <NavLink className="Navlink" to="/profile">
        <FontAwesomeIcon icon={faUser} /> Profile
      </NavLink>
      <NavLink
        className="Navlink"
        onClick={() => localStorage.removeItem("JWToken")}
        to="/login"
      >
        <FontAwesomeIcon icon={faDoorOpen} /> Logout
      </NavLink>
    </div>
  );
}
