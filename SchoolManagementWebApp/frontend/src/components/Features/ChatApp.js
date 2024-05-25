import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleSelection = (props) => {
  const [selectedRole, setSelectedRole] = useState(props.beg); // Default role
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [keyy, setKeyy] = useState(); const [role, setRole] = useState(props.role);
  const [chatInfo, setChatInfo] = useState({});
  var uniqueMembersMap = {}; 
  useEffect(() => {
    const interval = setInterval(async () => {  console.log("selectedRole - "+selectedRole);
      await axios.get('http://localhost:3333/chat/'+selectedRole+'').then(res=>setMembers(res.data)).catch(e=>{alert("failed loading.. try again (:")});      
      return () => clearInterval(interval); 
    }, 6000); 
     return () => clearInterval(interval);
  }, [selectedRole]);

  useEffect(()=>{
    members.forEach(member => {
      if (selectedRole === 'adminParentChat') {
        let uniqueKey = member.childAdmissionNumber;
        if(uniqueMembersMap[uniqueKey]){
          uniqueMembersMap[uniqueKey].data.push({edata:member.data, edate:member.date, sender:member.sender})}
           else{uniqueMembersMap[uniqueKey] = { name: {parentName:member.parentName, childAdmissionNumber: member.childAdmissionNumber}, data:[{edata:member.data, edate:member.date, sender:member.sender}] };
          } }
       else if(selectedRole === 'adminTeacherChat'){
        let uniqueKey = member.teacherMail;
        if(uniqueMembersMap[uniqueKey]){
          uniqueMembersMap[uniqueKey].data.push({edata:member.data, edate:member.date, sender:member.sender})}
           else{uniqueMembersMap[uniqueKey] = { name: {teacherName:member.teacherName, teacherMail:member.teacherMail}, data:[{edata:member.data, edate:member.date, sender:member.sender}] };
          } }
          else if(selectedRole === 'adminStudentChat'){
            let uniqueKey = member.admissionNumber;
            if(uniqueMembersMap[uniqueKey]){
              uniqueMembersMap[uniqueKey].data.push({edata:member.data, edate:member.date, sender:member.sender})}
               else{uniqueMembersMap[uniqueKey] = { name: {studentName:member.studentName, admissionNumber:member.admissionNumber}, data:[{edata:member.data, edate:member.date, sender:member.sender}] };
              } }

              else if(selectedRole === 'studentStudentChat'){
                let uniqueKey = member.reciever;
                if(uniqueMembersMap[uniqueKey]){
                  uniqueMembersMap[uniqueKey].data.push({edata:member.data, edate:member.date, sender:member.sender})}
                   else{uniqueMembersMap[uniqueKey] = { name: {studentName:(props.role===member.receiverAdmissionNumber?member.senderStudentName:member.receiverStudentName), admissionNumber:(props.role===member.receiverAdmissionNumber?member.sender:member.receiverAdmissionNumber)}, data:[{edata:member.data, edate:member.date, sender:member.sender}] };
                  } }
                  else if(selectedRole === 'studentTeacherChat'){
                    if(props.check==='student'){let uniqueKey = member.reciever;
                    if(uniqueMembersMap[uniqueKey]){
                      uniqueMembersMap[uniqueKey].data.push({edata:member.data, edate:member.date, sender:member.sender})}
                       else{uniqueMembersMap[uniqueKey] = { name: {Name:member.teacherName, id:member.teacherMail}, data:[{edata:member.data, edate:member.date, sender:member.sender}] };
                      } }else{let uniqueKey = member.reciever;
                        if(uniqueMembersMap[uniqueKey]){
                          uniqueMembersMap[uniqueKey].data.push({edata:member.data, edate:member.date, sender:member.sender})}
                           else{uniqueMembersMap[uniqueKey] = { name: {Name:member.studentName, id:member.studentAdmissionNumber}, data:[{edata:member.data, edate:member.date, sender:member.sender}] };
                        }}}
                      else if(selectedRole === 'teacherTeacherChat'){
                        let uniqueKey = member.reciever;
                        if(uniqueMembersMap[uniqueKey]){
                          uniqueMembersMap[uniqueKey].data.push({edata:member.data, edate:member.date, sender:member.sender})}
                           else{uniqueMembersMap[uniqueKey] = { name: {TeacherName:props.role===member.receiverTeacherMail?member.senderTeacherName:member.receiverTeacherName, TeacherMail:props.role===member.receiverTeacherMail?member.sender:member.receiverTeacherMail}, data:[{edata:member.data, edate:member.date, sender:member.sender}] };
                          } }

              else if(selectedRole === 'adminAdminChat'){
                let uniqueKey = member.adminAssistName;
                if(uniqueMembersMap[uniqueKey]){
                  uniqueMembersMap[uniqueKey].data.push({edata:member.data, edate:member.date, sender:member.sender})}
                   else{uniqueMembersMap[uniqueKey] = { name: {adminAssistName:'adminAssist'}, data:[{edata:member.data, edate:member.date, sender:member.sender}] };
                  } }})
                  setChatInfo(uniqueMembersMap);
  },[members])

useEffect(()=>{
setSelectedMember(chatInfo[keyy]);
},[chatInfo])

  const sendMessage = () => {
    if (messageInput.trim() === '') return;
  try{axios.post("http://localhost:3333/chat/"+selectedRole+"",{data:messageInput, sender:props.role,   
  ...(selectedRole === 'adminParentChat' && { reciever:selectedRole, parentName: selectedMember.name.parentName, childAdmissionNumber: selectedMember.name.childAdmissionNumber }),
  ...(selectedRole === 'adminTeacherChat' && { reciever:selectedRole, teacherName: selectedMember.name.teacherName, teacherMail: selectedMember.name.teacherMail }),
  ...(selectedRole === 'adminStudentChat' && { reciever:selectedRole, studentName: selectedMember.name.studentName, admissionNumber: selectedMember.name.admissionNumber }),
  ...(selectedRole === 'studentStudentChat' && { reciever:selectedRole+(props.role.localeCompare(selectedMember.name.admissionNumber)<0?props.role+selectedMember.name.admissionNumber:selectedMember.name.admissionNumber+props.role), senderStudentName:props.secMain, receiverStudentName: selectedMember.name.studentName, receiverAdmissionNumber: selectedMember.name.admissionNumber }),
  ...(selectedRole === 'teacherTeacherChat' && {reciever:selectedRole+(props.role.localeCompare(selectedMember.name.TeacherMail)<0?props.role+selectedMember.name.TeacherMail:selectedMember.name.TeacherMail+props.role), senderTeacherName:props.secMain, receiverTeacherName: selectedMember.name.TeacherName, receiverTeacherMail: selectedMember.name.TeacherMail }),
  ...(selectedRole === 'studentTeacherChat' && {reciever:''+selectedRole+''+(props.check==='student'?props.role:selectedMember.name.id)+''+(props.check==='student'?(selectedMember.name.id):(props.role)), studentName:props.check==='student'?props.secMain:selectedMember.name.Name,
    teacherName:props.check==='student'?selectedMember.name.Name:props.secMain,
    teacherMail:props.check==='student'?selectedMember.name.id:props.role,
    studentAdmissionNumber:props.check==='student'?props.role:selectedMember.name.id}),
  ...(selectedRole === 'adminAdminChat' && {reciever:selectedRole, adminAssistName: selectedMember.name.adminAssistName }), date:new Date().toLocaleString()}).then(res=>{if(res.status!==222){alert("Network problem! Once check internet connection and try again!!(: ")}}).catch(error => {console.error("Error fetching messages:", error)});
    setMessageInput('');} catch(e){console.log(""+e+"");}
  };
  const handleRoleChange = async (event) => {
   await setSelectedRole(event.target.value);
  //  axios.get('http://localhost:3333/chat/'+event.target.value+'').then(res=>setMembers(res.data)).catch(e=>{alert("failed loading.. try again (:")});
  };

  const handleMemberClick = (key, member) => {
    setSelectedMember(member);
    setKeyy(key);
  };
const [freshName, setFreshName] = useState(); const [freshSec,setFreshSec] = useState();
const freshSend = () => {
  if (messageInput.trim() === '') return;  console.log("frseh Name - ",freshName);
  try{axios.post("http://localhost:3333/chat/"+selectedRole+"",{data:messageInput, sender:props.role,    
  ...(selectedRole === 'adminParentChat' && { reciever:selectedRole, parentName: freshName, childAdmissionNumber: freshSec }),
  ...(selectedRole === 'adminTeacherChat' && {reciever:selectedRole, teacherName: freshName, teacherMail: freshSec }),
  ...(selectedRole === 'adminStudentChat' && {reciever:selectedRole, studentName: freshName, admissionNumber: freshSec }),
  ...(selectedRole === 'studentStudentChat' && {reciever:selectedRole+(props.role.localeCompare(freshSec)<0?props.role+freshSec:freshSec+props.role), senderStudentName:props.secMain, receiverStudentName: freshName, receiverAdmissionNumber: freshSec }),
  ...(selectedRole === 'teacherTeacherChat' && {reciever:selectedRole+(props.role.localeCompare(freshSec)<0?props.role+freshSec:freshSec+props.role), senderTeacherName:props.secMain, receiverTeacherName: freshName, receiverTeacherMail: freshSec }),
  ...(selectedRole === 'studentTeacherChat' && props.check==='student' && {reciever:selectedRole+props.role+freshSec, studentName:props.secMain,
    teacherName:freshName,
    teacherMail:freshSec,
    studentAdmissionNumber:props.role,}),
    ...(selectedRole === 'studentTeacherChat' && props.check==='teacher' && {reciever:selectedRole+freshSec+props.role, studentName:freshName,
      teacherName:props.secMain,
      teacherMail:props.role,
      studentAdmissionNumber:freshSec,}),
  ...(selectedRole === 'adminAdminChat' && { adminAssistName: freshName }), date:new Date().toLocaleString()}).then(res=>{if(res.status!==222){alert("Network problem! Once check internet connection and try again!!(: ")}}).catch(error => {console.error("Error fetching messages:", error)});
    setMessageInput(''); setVisibility(false);} catch(e){console.log(""+e+"");}
 }
 let placeholderText = ()=>{if(selectedRole==='adminParentChat'){return 'Enter Parent name'} else if(selectedRole==='adminTeacherChat'){return 'Enter Teacher name'} else if(selectedRole==='adminStudentChat'){return 'Enter Student name'} else if(selectedRole==='adminAdminChat'){return 'Enter Your name to send to Main admin'} else if(selectedRole==='studentStudentChat'){return 'Enter Student Name'} else if(selectedRole==='teacherTeacherChat'){return 'Enter Recipient Teacher name'} else if(selectedRole==='studentTeacherChat'){return 'Enter Reciepient '+props.checkOpp+' Name'}}
let placeholderr = ()=>{if(selectedRole==='adminParentChat'){return 'Enter child Admission Number'} else if(selectedRole==='adminTeacherChat'){return 'Enter Teacher Mail Id which is unique for every..'} else if(selectedRole==='adminStudentChat'){return 'Enter Admission Number'}  else if(selectedRole==='studentStudentChat'){return 'Enter Recepient Student Admission Number'} else if(selectedRole==='teacherTeacherChat'){return 'Enter Recipient Teacher Mail'} else if(selectedRole==='studentTeacherChat'){return 'Enter Recepient '+props.checkOpp+' id'} }
  const addRecipient = () => {
    setVisibility(true);
    alert("working..")
  }
  return (
    <div >
      <label htmlFor="role">Select Recipient role :</label>
      <select id="role" value={selectedRole} onChange={handleRoleChange}>
      {props.check==='adminAssist' ? <><option value="adminStudentChat">Admin - Student</option>
        <option value="adminParentChat">Admin - Parent</option>
        <option value="adminAdminChat">Admin</option>
        <option value="adminTeacherChat">Admin - Teacher</option></>:null}
      {props.check==='teacher'? <><option value="studentTeacherChat">Student - Teacher</option>
        <option value="teacherTeacherChat">Teacher - Teacher</option> </>:null}
      {props.check==='student'? <><option value="studentStudentChat">Student - Student</option>
      <option value="studentTeacherChat">Student - Teacher</option> </>:null}
      </select>
       {visibility ? <div> <input type='text' placeholder='Enter text' value={messageInput} onChange={(e)=>{setMessageInput(e.target.value)}}/>
    <input type='text' placeholder= {placeholderText()} value={freshName} onChange={(e)=>setFreshName(e.target.value)}/>
    <input type='text' placeholder= {placeholderr()} value={freshSec} onChange={(e)=>setFreshSec(e.target.value)}/>
    <button onClick={freshSend}>send</button>
    </div> : <></>}
    <div className="App">
      <div>
        <h2 style={{color:'blue'}}>List of members in {selectedRole} </h2>
        <ul>

  { 
Object.entries(chatInfo).map(([key, value]) => (
  <div key={key}> {console.log("chATINFO - ",value)}
  {((selectedRole === 'adminParentChat' ) ||
        (selectedRole === 'adminTeacherChat') ||
        (selectedRole === 'adminStudentChat' && role==='adminAssist' ) ||
        (selectedRole === 'studentStudentChat' && (selectedRole+(props.role.localeCompare(value.name.admissionNumber)<0?props.role+value.name.admissionNumber:value.name.admissionNumber+props.role))===key ) ||
        (selectedRole === 'studentTeacherChat' && (selectedRole+(props.check==='student'?props.role+value.name.id:value.name.id+props.role))===key ) ||
        (selectedRole === 'teacherTeacherChat' && (selectedRole+(props.role.localeCompare(value.name.TeacherMail)<0?props.role+value.name.TeacherMail:value.name.TeacherMail+props.role))===key ) ||
        (selectedRole === 'admin') ||
        (selectedRole === 'adminAdminChat'))  

                                &&
       
  <button onClick={() => handleMemberClick(key, value)} > 

        {selectedRole === 'adminParentChat' && `${value.name.parentName}, ${value.name.childAdmissionNumber}` }
        {selectedRole === 'adminTeacherChat' && <> {value.name.teacherName} -- {value.name.teacherMail} </>}
        {selectedRole === 'adminStudentChat' && role==='adminAssist' && `${value.name.studentName}, ${value.name.admissionNumber} `}
        {selectedRole === 'studentStudentChat' && `${value.name.studentName}, ${value.name.admissionNumber} `}
        {selectedRole === 'studentTeacherChat' && `${value.name.Name}, ${value.name.id} `}
        {selectedRole === 'teacherTeacherChat' && `${value.name.TeacherName}, ${value.name.TeacherMail} `}
        {selectedRole === 'admin' && 'admin' }
        {selectedRole === 'adminAdminChat' && `${value.name.adminAssistName} `}
       
</button> }{console.log((selectedRole+(props.check==='student'?props.role+value.name.id:value.name.id+props.role)===key))}
  </div>
))}
{<button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={addRecipient}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg></button>
}


        </ul>
      </div>

      {selectedMember && (
        <div className='app'>
          <h2 style={{color:'green'}}>Chat with {JSON.stringify(selectedMember.name).split('"')[3]}({JSON.stringify(selectedMember.name).split('"')[7]}) in {selectedRole}</h2>
          <div className="chat-container">
         
          <div className="chat-app">
   
            <div className="chat-messages">
              {selectedMember.data.map((message) => (
                <div
                  key={message.edate}
                  className={`message ${message.sender === props.role ? 'sent' : 'received'}`}
                  >
                  {message.edata}    <div className="message-meta">{message.edate}</div>
                </div> 
              ))}
            </div>
            <div className="message-input-container">
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            </div>
       
          <div className="send-arrow"><button onClick={sendMessage}>
          ➡️</button>
          </div>
        </div>
      </div>
        </div> 
      )}</div>
    </div>
  );
};

export default RoleSelection;
