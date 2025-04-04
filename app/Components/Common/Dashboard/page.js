import React from 'react';
import {
  FaArrowDown,
  FaArrowUp,
  FaHospitalUser,
  FaUserPlus,
  FaBed,
  FaUserDoctor,
  FaBell
} from 'react-icons/fa6';
import style from './Dashboard.module.css';

const patientData = [
  { name: 'John Doe', age: 32, gender: 'Male', reason: 'Fever', time: '10:30 AM', doctor: 'Dr. Smith' },
  { name: 'Jane Smith', age: 28, gender: 'Female', reason: 'Checkup', time: '11:00 AM', doctor: 'Dr. Adams' },
  { name: 'Bob Johnson', age: 45, gender: 'Male', reason: 'Fracture', time: '11:45 AM', doctor: 'Dr. Lee' },
];

const appointments = [
  { patient: 'Emma Brown', time: '12:30 PM', doctor: 'Dr. Stone' },
  { patient: 'Liam White', time: '1:00 PM', doctor: 'Dr. Kim' },
  { patient: 'Olivia Green', time: '1:30 PM', doctor: 'Dr. Davis' },
];

const notices = [
  'COVID-19 precautions must be followed.',
  'Ward A is under maintenance till Friday.',
  'New ICU beds arriving this weekend.',
];

function Dashboard() {
  return (
    <div className={`container mt-4 ${style.scrollcontainer}`}>
      <h2 className={`${style.heading} mb-4`}>Hospital Dashboard</h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className={`card text-center p-3 shadow-sm ${style.customCard}`}>
            <FaArrowDown size={30} className={`mb-2 ${style.icon}`} />
            <h5>Incoming Patients</h5>
            <p>50 Today</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card text-center p-3 shadow-sm ${style.customCard}`}>
            <FaArrowUp size={30} className={`mb-2 ${style.icon}`} />
            <h5>Outgoing Patients</h5>
            <p>35 Discharged</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card text-center p-3 shadow-sm ${style.customCard}`}>
            <FaHospitalUser size={30} className={`mb-2 ${style.icon}`} />
            <h5>Admitted Patients</h5>
            <p>120 In Ward</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`card text-center p-3 shadow-sm ${style.customCard}`}>
            <FaUserPlus size={30} className={`mb-2 ${style.icon}`} />
            <h5>New Patients</h5>
            <p>12 Registered</p>
          </div>
        </div>
      </div>

      {/* Hospital Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className={`card text-center p-3 shadow-sm ${style.customCard}`}>
            <FaBed size={30} className={`mb-2 ${style.icon}`} />
            <h5>Bed Availability</h5>
            <p>42 Beds Available</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className={`card text-center p-3 shadow-sm ${style.customCard}`}>
            <FaUserDoctor size={30} className={`mb-2 ${style.icon}`} />
            <h5>Doctors on Duty</h5>
            <p>18 Doctors Today</p>
          </div>
        </div>
      </div>

      {/* Incoming Patients Table */}
      <div className="mb-5">
        <h4 className={style.subheading}>Incoming Patients</h4>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Reason</th>
              <th>Arrival Time</th>
              <th>Doctor</th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.reason}</td>
                <td>{patient.time}</td>
                <td>{patient.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-5">
        <h4 className={style.subheading}>Todays Appointments</h4>
        <ul className="list-group">
          {appointments.map((a, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              {a.patient} with {a.doctor}
              <span className="badge bg-primary rounded-pill">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notices/Alerts */}
      <div className="mb-5">
        <h4 className={style.subheading}><FaBell className="me-2" />Notices</h4>
        <ul className="list-group">
          {notices.map((n, i) => (
            <li key={i} className="list-group-item">{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
