import React from 'react';
import { FaUser, FaChartBar, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa6';

function Dashboard() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      
      <div className="row">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <FaUser size={30} className="mb-2" />
            <h5>Users</h5>
            <p>1,200</p>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <FaChartBar size={30} className="mb-2" />
            <h5>Analytics</h5>
            <p>15,000 Views</p>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <FaClipboardList size={30} className="mb-2" />
            <h5>Tasks</h5>
            <p>75 Pending</p>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <FaMoneyBillWave size={30} className="mb-2" />
            <h5>Revenue</h5>
            <p>$45,000</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4>Recent Activities</h4>
        <ul className="list-group">
          <li className="list-group-item">User John Doe registered.</li>
          <li className="list-group-item">New order placed by Jane Smith.</li>
          <li className="list-group-item">Revenue increased by 10% this month.</li>
          <li className="list-group-item">System maintenance scheduled for next Sunday.</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
