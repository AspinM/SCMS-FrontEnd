'use client';

import React, { useState } from 'react';
import Sidebar from '../SideBar/page';
import Header from '../Header/page';
import Dashboard from '../Dashboard/page';

function DashboardMain() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <div className="p-4">Profile Content</div>;
      case 'settings':
        return <div className="p-4">Settings Content</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="flex-grow-1">
        <Header />
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
}

export default DashboardMain;
