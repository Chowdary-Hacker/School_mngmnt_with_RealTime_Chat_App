import { Link} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
function ParentRegistration(){
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
      axios.post("http://localhost:3333/parentLogin/reg",{admissionNumber:admissionNumber, password:password}).then(res=>{if(res.status===222){alert("registered successfully..")} else if(res.status===211){alert("Already Registered")}else{alert("failed! try again later..")}}).catch();

    };
  
    return (
      <div className='regis'>  <div className="registration-container">
        <h2>Parent Registration</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="admissionNumber">Child's admission number:</label>
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
        <p>Already enrolled as a parent ?<Link to="/ParentLogin">Login</Link></p>
        <p>Want to visit home page ? <Link to="/">Home</Link></p>
      </div> </div>
      </div>
    );
}
export default ParentRegistration;