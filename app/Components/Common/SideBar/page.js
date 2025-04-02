'use client';

import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

function Sidebar({ setActiveComponent }) {
  return (
    <div className="d-flex flex-column p-3 bg-dark text-white vh-100" style={{ width: '250px' }}>
      <h4 className="mb-4">MyApp</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button className="btn text-white w-100 text-start" onClick={() => setActiveComponent('dashboard')}>
            <FaHome className="me-2" /> Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button className="btn text-white w-100 text-start" onClick={() => setActiveComponent('profile')}>
            <FaUser className="me-2" /> Profile
          </button>
        </li>
        <li className="nav-item mb-2">
          <button className="btn text-white w-100 text-start" onClick={() => setActiveComponent('settings')}>
            <FaCog className="me-2" /> Settings
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
