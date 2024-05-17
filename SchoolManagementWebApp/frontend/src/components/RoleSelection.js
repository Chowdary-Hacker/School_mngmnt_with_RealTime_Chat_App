/* import { useNavigate } from 'react-router-dom';
const RoleSelection = () => {
 const nav = useNavigate();
  return (
    <div className="role-selection-container">
      <h2>Select Your Role</h2>

       <div> <button
         
          style={{ width: '50%' }}
          onClick={() => nav('/ParentLogin')}
        > 
          Parent  
           </button> </div>
           <div> <button
          style={{ width: '50%' }}
          onClick={() => nav('/StudentLogin')}
        >
          Student
        </button> </div>
        <div>   <button
          className="role-button"
          style={{ width: '50%' }}
          onClick={() => nav('/AdminLogin')}
        >
          Admin
        </button> </div>
        <div>    <button
          className="role-button"
          style={{ width: '50%' }}
          onClick={() => nav('/TeacherLogin')}
        >
          Teacher
        </button> </div>
  
           <div> <button
          style={{ width: '50%' }}
          onClick={() => nav('/AboutSchool')}
        > About school </button> </div>
    </div>
  );
};

export default RoleSelection; */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const RoleSelection = () => {
  const nav = useNavigate();
  return (
    <div className="role-selection-container">
      <h1 style={{color:'yellow'}}>Welcome (:</h1>
      <h2 style={{color:'brown'}}>Select Your Role</h2>
      <button
        className="role-button"
        onClick={() => nav('/ParentLogin')}
      >
        Parent
      </button>
      <button
        className="role-button"
        onClick={() => nav('/StudentLogin')}
      >
        Student
      </button>
      <button
        className="role-button"
        onClick={() => nav('/AdminLogin')}
      >
        Admin
      </button>
      <button
        className="role-button"
        onClick={() => nav('/TeacherLogin')}
      >
        Teacher
      </button>
      <button
        className="role-button"
        onClick={() => nav('/AboutSchool')}
      >
        About School
      </button>
    </div>
  );
};

export default RoleSelection;
