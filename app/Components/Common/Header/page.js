"use client";

import React from "react";
import { FaHome, FaUser, FaBell, FaCog } from "react-icons/fa";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container">
        <a className="navbar-brand" href="#">MyApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#"><FaHome className="me-1" /> Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><FaUser className="me-1" /> Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><FaBell className="me-1" /> Notifications</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><FaCog className="me-1" /> Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
