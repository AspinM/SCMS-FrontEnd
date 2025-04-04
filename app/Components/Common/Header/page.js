"use client";

import React, { useState, useEffect } from "react";
import { FaHome, FaUser, FaBell, FaCog, FaBars } from "react-icons/fa";
import styles from "./HeaderStyle.module.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.dropdown}`) && !e.target.closest(`.${styles.toggleBtn}`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className={styles.navbar}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className={styles.brand}>MyApp</span>

        {/* Toggle Button */}
        <button
          className={`d-md-none ${styles.toggleBtn}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        {/* Normal Menu for Desktop */}
        <ul className={`mb-0 d-none d-md-flex ${styles.navList}`}>
          <li className="nav-item">
            <a className={styles.navLink} href="#"><FaHome className="me-2" />Home</a>
          </li>
          <li className="nav-item">
            <a className={styles.navLink} href="#"><FaUser className="me-2" />Profile</a>
          </li>
          <li className="nav-item">
            <a className={styles.navLink} href="#"><FaBell className="me-2" />Notifications</a>
          </li>
          <li className="nav-item">
            <a className={styles.navLink} href="#"><FaCog className="me-2" />Settings</a>
          </li>
        </ul>
      </div>

      {/* Dropdown Menu on Small Screens */}
      {isOpen && (
        <div className={styles.dropdown}>
          <a className={styles.dropdownLink} href="#"><FaHome className="me-2" />Home</a>
          <a className={styles.dropdownLink} href="#"><FaUser className="me-2" />Profile</a>
          <a className={styles.dropdownLink} href="#"><FaBell className="me-2" />Notifications</a>
          <a className={styles.dropdownLink} href="#"><FaCog className="me-2" />Settings</a>
        </div>
      )}
    </nav>
  );
}

export default Header;
