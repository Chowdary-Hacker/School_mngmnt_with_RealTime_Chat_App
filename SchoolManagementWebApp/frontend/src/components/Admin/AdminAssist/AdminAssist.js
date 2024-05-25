import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatApp from '../../Features/ChatApp';
import axios from 'axios'; import AdminAssistStaffInfo from '../AdminAssist/AdminAssistStaffInfo'
import FeeForm from '../../Features/FeeForm';
const AdminAssist = () => {
  var sessionToken, userName, parentName, admissionNumber;
  const [messages, setMessages] = useState([{data:"Hlo", sender:"parent", date:'2024 10:00', parentName:'SomeswaraRao', childAdmissionNumber:'123'},{data:"Its Mohan", sender:"admin", date:'2024 10:00', parentName:'', childAdmissionNumber:''}]);
  const [warning, setWarning] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [newSyllabus, setNewSyllabus] = useState(); const [newTimeTable, setNewTimeTable] = useState();
const nav = useNavigate(); const location = useLocation();
try{if(location.state.sessionToken!==null){ sessionToken = location.state.sessionToken; userName = location.state.userName;}else{alert("Session expired kindly login again ! (:"); nav('/adminAssistLogin')}
} catch(e){}

  useEffect(()=>{
    axios.get("http://localhost:3333/adminAssistLogin/adminAssist",{headers:{'x-token':sessionToken}}).then(res=>{if(res.status!==222){alert('authentication failed try again later (: ');nav('/adminAssistLogin');}}).catch((e)=>{console.log(e);});
},[]);

const addTimeTable = async () => {
  if (newTimeTable.trim() !== '') {
   await axios.post('http://localhost:3333/marks/timeTable',JSON.parse(newTimeTable)).then(res=>{if(res.status===222){alert("successfully added.. (:")}else{alert("failed try after some time (:")}}).catch(e=>console.log(e));;
    setNewTimeTable('');
  }
};

const addSyllabus = async () => { 
  if (newSyllabus.trim() !== '') {
   await axios.post('http://localhost:3333/marks/syllabus',JSON.parse(newSyllabus)).then(res=>{if(res.status===222){alert("successfully added.. (:")}else{alert("failed try after some time (:")}}).catch(e=>console.log(e));;
    setNewSyllabus('');
  }
};

  return (
 <div className="app">
       {sessionToken? (<>Welcome {userName} (:</>) : <p></p>}
        <div className="chat-header">
      <ChatApp role="adminAssist" check="adminAssist" secMain="adminAssist" beg="adminTeacherChat"/> </div>
      {warning && <p> Failed Loading messages try check internet connection (:</p>} 
      
      <div>
      <AdminAssistStaffInfo/>
      </div>
      <div>
          <div className="input-group"> <h2>Time Table</h2>
          Enter 𝓣𝓘𝓜𝓔 𝓣𝓐𝓑𝓛𝓔 details in json/object format :
            <input
              type="text"
              onChange={(e) => { setNewTimeTable(e.target.value)}}
              placeholder='{"clss":"intValue", "monday":["sub1", "sub2", "sub3", "sub4", "sub5"], "tuesday":["sub1", "sub2", "sub3", "sub4", "sub5"], "wednesday":["sub1", "sub2", "sub3", "sub4", "sub5"], "thursday":["sub1", "sub2", "sub3", "sub4", "sub5"], "friday":["sub1", "sub2", "sub3", "sub4", "sub5"], "saturday":["sub1", "sub2", "sub3", "sub4", "sub5"]}'
            />
            <button onClick={addTimeTable}>Add Time Table Shedule</button> 
          </div>
          <div style={{paddingTop:'6%'}} className="input-group"> <h2>Syllabus</h2>
          Enter 𝓢𝓨𝓛𝓛𝓐𝓑𝓤𝓢 details in json/object format :
            <input
              type="text"
              onChange={(e) => { setNewSyllabus(e.target.value)}}
              placeholder='{"clss":"intValue", "telugu":"information", "hindi":"information", "english":"information", "mathematics":"information", "science":"information", "social":"information" }'
            />
            <button onClick={addSyllabus}>Add Syllabus</button> 
          </div>
      </div>
      <button onClick={()=>{nav("/")}}>Logout</button>
    </div>
  
  );
};

export default AdminAssist;
