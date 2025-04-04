'use client';

import React, { useState } from 'react';
import {
  FaHome,
  FaUser,
  FaUserPlus,
  FaUsers,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaFileMedical,
  FaChartBar,
  FaCog,
  FaBars,
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

function Sidebar({ setActiveComponent }) {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('dashboard');

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (component) => {
    setActiveComponent(component);
    setActive(component);
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : styles.expanded}`}>
      <div className={styles['toggle-btn']}>
        {!collapsed && <h4 className="mb-0">HospitalApp</h4>}
        <FaBars role="button" onClick={toggleSidebar} />
      </div>

      <ul className="nav flex-column px-2 mt-4">
        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'dashboard' ? styles.active : ''}`}
            onClick={() => handleClick('dashboard')}
          >
            <FaHome />
            {!collapsed && <span>Dashboard</span>}
          </button>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'registerPatient' ? styles.active : ''}`}
            onClick={() => handleClick('registerPatient')}
          >
            <FaUserPlus />
            {!collapsed && <span>Register Patient</span>}
          </button>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'patientDetails' ? styles.active : ''}`}
            onClick={() => handleClick('patientDetails')}
          >
            <FaUser />
            {!collapsed && <span>Patient Details</span>}
          </button>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'appointments' ? styles.active : ''}`}
            onClick={() => handleClick('appointments')}
          >
            <FaCalendarCheck />
            {!collapsed && <span>Appointments</span>}
          </button>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'addStaff' ? styles.active : ''}`}
            onClick={() => handleClick('addStaff')}
          >
            <FaUserPlus />
            {!collapsed && <span>Add Staff</span>}
          </button>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'staffDirectory' ? styles.active : ''}`}
            onClick={() => handleClick('staffDirectory')}
          >
            <FaUsers />
            {!collapsed && <span>Staff Directory</span>}
          </button>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'billing' ? styles.active : ''}`}
            onClick={() => handleClick('billing')}
          >
            <FaFileInvoiceDollar />
            {!collapsed && <span>Billing</span>}
          </button>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'medicalRecords' ? styles.active : ''}`}
            onClick={() => handleClick('medicalRecords')}
          >
            <FaFileMedical />
            {!collapsed && <span>Medical Records</span>}
          </button>
        </li>

        <li className="nav-item mb-2">
          <button
            className={`${styles['nav-item-btn']} ${active === 'reports' ? styles.active : ''}`}
            onClick={() => handleClick('reports')}
          >
            <FaChartBar />
            {!collapsed && <span>Reports</span>}
          </button>
        </li>

        <li className="nav-item mb-2 mt-3">
          <button
            className={`${styles['nav-item-btn']} ${active === 'settings' ? styles.active : ''}`}
            onClick={() => handleClick('settings')}
          >
            <FaCog />
            {!collapsed && <span>Settings</span>}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
