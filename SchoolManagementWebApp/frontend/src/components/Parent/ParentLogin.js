import { useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
function ParentLogin(){
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const nav = useNavigate();
    const handleAdmissionNumberChange = (event) => {
      setAdmissionNumber(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      let vaf=true;
    await axios.get("http://localhost:3333/studentInfo/"+admissionNumber).then(res=>{if(res.data===null){vaf = false; alert("You have not been enrolled in school database, contact with admin assistant to get enrolled in (:"); nav("/")}}).catch(e=>console.log(e));
   vaf && await axios.post("http://localhost:3333/parentLogin",{admissionNumber:admissionNumber, password:password}).then(res=>{if(res.status===222){setToken(res.data.token); return res;}}).then(res => axios.get("http://localhost:3333/parentLogin/parentDashboard",{headers:{'x-token':res.data.token}}).then(res=>{if(res.status===222){nav('/ParentDashboard', {state:{sessionToken:res.data, admissionNumber:admissionNumber}});}})).catch(e=>{alert("Failed due to bad network Please try again later.. (:");});
         };

    /*  const Shradd = () => {
        axios.get("http://localhost:3333/parentLogin/parentDashboard",{headers:{'x-token':token}}).then(res=>{if(res.status===222){nav('/ParentDashboard', {state:{sessionToken:token, admissionNumber:admissionNumber}});}}).catch();

      } */
  
    return (
      <div className='regis'>  <div className="registration-container">
        <h2>Parent Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <div className="login-link">
        <p>Not registered ?<Link to="/ParentRegistration">Register here</Link></p>
        <p>Want to go our School home page ?<Link to="/"> Home </Link></p>
      </div>
      </div> </div>
    );
}
export default ParentLogin;