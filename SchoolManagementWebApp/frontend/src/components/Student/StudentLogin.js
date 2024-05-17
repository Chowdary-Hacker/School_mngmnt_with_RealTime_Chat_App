import React, { useState } from 'react';
import './StudentEnrollment.css'; // Import CSS file for styling
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
const StudentLogin = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const handleAdmissionNumberChange = (event) => {
    setAdmissionNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform form validation and submit data to backend here
    console.log('Submitting form:', { admissionNumber, password });let vaf=true;
    await axios.get("http://localhost:3333/studentInfo/"+admissionNumber).then(res=>{if(res.data===null){vaf = false; alert("You have not been enrolled in school database, contact with admin assistant to get enrolled in (:"); nav("/")}}).catch(e=>console.log(e));
   vaf && await axios.post("http://localhost:3333/studentLogin",{admissionNumber:admissionNumber, password:password}).then(res=>{if(res.status===222){axios.get("http://localhost:3333/studentLogin/studentDashboard",{headers:{'x-token':res.data}}).then(ress=>{if(ress.status===222){console.log(ress);nav('/StudentDashboard', {state:{sessionToken:res.data, admissionNumber:admissionNumber, studentName:''}});}})}else{alert(res.data)}}).catch(e=>{alert("Failed due to bad network Please try again later.. (:");});

  };

  return (
    <div className='regis'>  <div className="registration-container">
      <h2>Student Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <div className="login-link">
      <p>Want to go home ?<Link to="/">Home</Link></p>
      <p>Want to Register ?<Link to="/StudentEnrollment">Register</Link></p>
        <p>Want to change password ?<Link to="/Mail">Reset Password</Link></p>
      </div> </div>
    </div>
  );
};

export default StudentLogin;
