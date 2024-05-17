import React, { useState } from 'react';
import '../Student/StudentEnrollment.css'; // Import CSS file for styling
import {useNavigate, Link} from 'react-router-dom'; import axios from 'axios';
const TeacherRegistration = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const handleAdmissionNumberChange = (event) => {
    setAdmissionNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3333/teacherLogin/reg",{userName:admissionNumber, password:password}).then(res=>{if(res.status===222){alert("You have been registered successfully (:")}else if(res.status===211){alert("Already registered before itself")}else{alert(res.data)}}).catch(e=>console.log(e));

  };

  return (
    <div className='regis'>  <div className="registration-container">
      <h2>Teacher Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
        </div>
        <div className="form-group">
          <label htmlFor="admissionNumber">Username(mail id):</label>
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
      <p>Want to go home ?<Link to="/">Home</Link></p>
      <p>Already Registered ?<Link to="/TeacherLogin">Login</Link></p>
        <p>Want to change password ?<Link to="/Mail">Reset Password</Link></p>
      </div>
    </div> </div>
  );
};

export default TeacherRegistration;
