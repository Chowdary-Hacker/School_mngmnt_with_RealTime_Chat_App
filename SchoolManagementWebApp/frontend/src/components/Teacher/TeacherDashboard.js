import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; import axios from 'axios'; import ChatApp from '../Features/ChatApp';
function TeacherDashboard(){
   //implement grading system, -- admin, students communication with teacher.
   const [messages, setMessages] = useState([]); const [teacherName, setTeacherName] = useState(); const [teacherMail, setTeacherMail] = useState();
   const [messageInput, setMessageInput] = useState('');
   const nav = useNavigate(); const location = useLocation();
var sessionToken;
   useEffect(()=>{
    try{
      setTeacherMail(location.state.teacherMail); sessionToken = location.state.sessionToken;
    axios.get("http://localhost:3333/teacherLogin/teacherDashboard",{headers:{'x-token':sessionToken}}).then(res=>{if(res.status!==222){alert('authentication failed try again later (: ');nav('/teacherLogin');}}).catch((e)=>{console.log(e);});
    }catch{} },[]);
    useEffect(()=>{
      try{axios.get("http://localhost:3333/teacherInfo/"+teacherMail+"").then(res=>{console.log(res.data);setTeacherName(res.data.name)}).catch((e)=>console.log(e));
  } catch{};
  },[teacherMail]);

   // Function to simulate sending a message
   const sendMessage = () => {
       if (messageInput.trim() === '') return;
       try{axios.post("http://localhost:3333/chat/adminTeacherChat",{data:messageInput, sender:''+teacherMail+'', reciever:'adminAssist', teacherName:teacherName , teacherMail:teacherMail, date:new Date().toLocaleString()}).then(res=>{if(res.status!==222){alert("Network problem! Once check internet connection and try again!!(: ")}}).catch(error => {console.error("Error fetching messages:", error)})}catch{}; 
       setMessageInput('');
   };
 
   // Function to fetch messages from API
   const fetchMessages = () => {
    try{
      axios.get("http://localhost:3333/chat/adminTeacherChat")
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
     <div> <h1> Chat with Admin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome {teacherMail} - {teacherName} </h1> </div> <div style={{display:'flex', alignSelf:'center'}}>
           <button onClick={()=>nav('/Grading', {state:{teacherMail:teacherMail}})} className="button">Grading</button>
         </div> <div style={{alignSelf:'center'}}><button onClick={()=>nav("/TeacherLogin")}>Logout</button></div>
     </div>
       <div className="chat-container">
         {/* Chat Application */}
         <div className="chat-app">
           {/* Chat messages */}
           <div className="chat-messages">
             {messages.map((message) => (
               message.teacherMail===teacherMail ?
               (<div
                 key={message.id}
                 className={`message ${message.sender !== 'adminAssist' ? 'sent' : 'received'}`}
               >
                 {message.data} <div className="message-meta">{message.date}</div>
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
         <div className="chat-header">
         <ChatApp role={teacherMail} check="teacher" checkOpp="student" secMain={teacherName} beg="teacherTeacherChat"/>
        </div> 
       </div>)
}
export default TeacherDashboard;