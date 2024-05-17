import React, { useState, useEffect } from 'react';
import '../../App.css'; import ChatApp from '../Features/ChatApp'; import axios from 'axios';
import { useNavigate, useLocation} from 'react-router-dom';
function StudentDashboard(){
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState(''); 
    const nav = useNavigate(); const location = useLocation(); const [admissionNumber, setAdmissionNumber] = useState(); const [studentName, setStudentName] = useState(); const [clss, setClss] = useState(); 
 var sessionToken;
    // Function to simulate sending a message
    useEffect(()=>{
      try{
        setAdmissionNumber(location.state.admissionNumber); sessionToken = location.state.sessionToken;
      axios.get("http://localhost:3333/studentLogin/studentDashboard",{headers:{'x-token':sessionToken}}).then(res=>{if(res.status!==222){alert('authentication failed try again later (: ');nav('/studentLogin');}}).catch((e)=>{console.log(e);});
      }catch{} },[]);
      useEffect(()=>{
        try{axios.get("http://localhost:3333/studentInfo/"+admissionNumber+"").then(res=>{console.log(res.data);setStudentName(res.data.name); setClss(res.data.class)}).catch((e)=>console.log(e));
    } catch{};
    },[admissionNumber]);
    const sendMessage = async () => {
        if (messageInput.trim() === '') return;
        try{axios.post("http://localhost:3333/chat/adminStudentChat",{data:messageInput, sender:''+admissionNumber+'', reciever:'adminAssist', studentName:studentName , admissionNumber:admissionNumber, date:new Date().toLocaleString()}).then(res=>{if(res.status!==222){alert("Network problem! Once check internet connection and try again!!(: ")}}).catch(error => {console.error("Error fetching messages:", error)})}catch{}; 
        setMessageInput('');
    };
  
    // Function to fetch messages from API
    const fetchMessages = () => {
      try{
        axios.get("http://localhost:3333/chat/adminStudentChat")
        .then(res=>{if(res.status===222){setMessages(res.data)}}).catch(error => {console.error("Error fetching messages:", error)});
      } catch(e){console.log(""+e+"")}
    };

    useEffect(() => {
      const interval = setInterval(async () => {
       await fetchMessages();
      }, 5000); 
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="app">
         <div style={{display:'flex', justifyContent:'space-evenly'}}>
         <div>   <h1> Chat with Admin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome {admissionNumber} - {studentName} </h1> </div> <div style={{display:'flex', alignSelf:'center'}}> <button onClick={()=>nav('/StudentAcademics', {state:{studentName:studentName, admissionNumber:admissionNumber, clss:clss}})} className="button">Academics</button> </div> <div style={{alignSelf:'center'}}><button onClick={()=>nav("/StudentLogin")}>Logout</button></div></div>

        <div className="chat-container">
          {/* Chat Application */console.log(studentName)}
          <div className="chat-app">
            {/* Chat messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                message.admissionNumber===admissionNumber ?
                (<div
                  key={message.id}
                  className={`message ${message.sender === admissionNumber ? 'sent' : 'received'}`}
                >
                  {message.data}    <div className="message-meta">{message.date}</div>
                </div>):null
              ))}
            </div>
            <div className="message-input-container">
            <input
              type="text"
              className="message-input"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            /></div>
          {/* Arrow icon for sending message */}
          <div className="send-arrow"><button onClick={sendMessage}>
          ➡️</button>
          </div>
        </div>
      </div>
         
        <ChatApp role={admissionNumber} check="student" checkOpp="teacher" secMain={studentName} beg="studentStudentChat"/>
                    
        </div>)
}
export default StudentDashboard ;