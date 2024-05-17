import React, { useState } from 'react';
import '../../Student/StudentEnrollment.css'; // Import CSS file for styling
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; import { Link } from 'react-router-dom';
const AdminAssistLogin = () => {
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
   axios.post("http://localhost:3333/adminAssistLogin/", {userName:admissionNumber, password:password})
   .then(res=>{if(res.status===222){nav('/AdminAssist', {state:{sessionToken:res.data.token, userName:admissionNumber}});}else if(res.status===211){alert("Credentials not found .. (:");}else{alert("Authentication has been failed.. Try again (:")}});
  };

  return (
    <div className='regis'><div className="registration-container">
      <h2>Admin Assistant login</h2>
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
        <button type="submit">Login</button>
      </form>
      <div className="login-link">
      <p>Want to go home ?<Link to="/">Home</Link></p>
        <p>Want to change password ?<Link to="/Mail">Reset Password</Link></p>
      </div>
    </div> </div>
  );
};

export default AdminAssistLogin;
