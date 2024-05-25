import React, { useState } from 'react';
import '../Student/StudentEnrollment.css'; // Import CSS file for styling
import {useNavigate, useLocation,  Link} from 'react-router-dom';
import axios from 'axios';
const AdminAssistReg = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate(); const location = useLocation(); var sessionToken;
  try{
    if(location.state.sessionToken!==null){sessionToken = location.state.sessionToken;}else{alert("Session expired kindly login again ! (:"); nav('/adminLogin')}
    } catch(e){alert("session expired (:"); nav('/AdminLogin')}

  const handleAdmissionNumberChange = (event) => {
    setAdmissionNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3333/adminAssistLogin/reg", {userName:admissionNumber, password:password})
    .then(res=>res.status)
    .then(res=>{if(res===222){alert("successfully Registered"); nav('/Admin', {state:{sessionToken:sessionToken}})}else if(res.status===211){alert("Already record exist with this username .. (:");} else{alert("Authentication has been failed.. Try again (:")}});
  };

  return (
    <div className='regis'>  <div className="registration-container">
      <h2>Admin Assist Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="admissionNumber">UserName:</label>
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
      </div>
    </div>
  );
};

export default AdminAssistReg;
