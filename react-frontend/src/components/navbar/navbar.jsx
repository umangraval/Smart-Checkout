/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import logo from '../../public/logo.svg'
import './navbar.scss';
import { NavLink } from "react-router-dom";


const Navbar = () => {
    return(
        <div className="Navbar">
            <img className="Navbar--Logo" src={logo} alt="Logo" />
            <div className="Navbar--Links">
                <a href="#" className="Navbar--Link">Home</a>
                <a href="#features" className="Navbar--Link">Features</a>
                <NavLink className="Navbar--Link" to="/login">LogIn</NavLink>
            </div>
        </div>
    )
}

export default Navbar;