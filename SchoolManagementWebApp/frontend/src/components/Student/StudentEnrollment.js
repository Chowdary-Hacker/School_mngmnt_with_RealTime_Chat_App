import React, { useState } from 'react';
import './StudentEnrollment.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios';
const StudentEnrollment = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleAdmissionNumberChange = (event) => {
    setAdmissionNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform form validation and submit data to backend here
    console.log('Submitting form:', { admissionNumber, password });
    axios.post("http://localhost:3333/studentLogin/reg",{admissionNumber:admissionNumber, password:password}).then(res=>alert(res.data)).catch(e=>console.log(e));
  };

  return (
    <div className='regis'>  <div className="registration-container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="admissionNumber">Admission Number:</label>
          <input
            type="text"
            id="admissionNumber"
            value={admissionNumber}
            onChange={handleAdmissionNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="login-link">
        <p>Already have an account? <Link to="/StudentLogin">Login here</Link></p>
        <p>Want to go home ?<Link to="/">Home</Link></p>
      </div> </div>
    </div>
  );
};

export default StudentEnrollment;
