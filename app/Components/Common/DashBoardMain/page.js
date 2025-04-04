'use client';

import React, { useState } from 'react';
import Sidebar from '../SideBar/page';
import Header from '../Header/page';
import Dashboard from '../Dashboard/page';
import styles from './DashboardMain.module.css'; // Import CSS module

function DashboardMain() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
  
      case 'registerPatient':
        return <div>Register Patient Page</div>;
  
      case 'patientDetails':
        return <div>Patient Details Page</div>;
  
      case 'appointments':
        return <div>Appointments Page</div>;
  
      case 'addStaff':
        return <div>Add Staff Page</div>;
  
      case 'staffDirectory':
        return <div>Staff Directory Page</div>;
  
      case 'billing':
        return <div>Billing Page</div>;
  
      case 'medicalRecords':
        return <div>Medical Records Page</div>;
  
      case 'reports':
        return <div>Reports Page</div>;
  
      case 'settings':
        return <div>Settings Content</div>;
  
      default:
        return <Dashboard />;
    }
  };
  

  return (
    <div className={`d-flex ${styles.dashboardWrapper}`}>
      <Sidebar setActiveComponent={setActiveComponent} />

      <div className={`flex-grow-1 ${styles.mainContent}`}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        <div className={styles.pageContent}>
          {renderContent()}
        </div>
      </div>

    </div>
  );
}

export default DashboardMain;
