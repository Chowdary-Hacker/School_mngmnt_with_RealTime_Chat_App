import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {Chart, Legend, ArcElement, Tooltip} from 'chart.js';
function ParentDashboard(){
    const [messages, setMessages] = useState([{data:"Hlo", sender:"parent", date:'2024 10:00'},{data:"Its Mohan", sender:"admin", date:'2024 10:00'}]);
    const [warning, setWarning] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const [fee, setFee] = useState(0);
    const [data, setData] = useState({labels:['Pending fee', 'Paid fee'], datasets:[{label:"Fee status", data:[], backgroundColor:['blue', 'yellow']}]});
    const nav = useNavigate(); const location = useLocation();
    var sessionToken; var admissionNumber;
    Chart.register(Legend, ArcElement, Tooltip);
    // Function to simulate sending a message
    if(location.state.sessionToken!==null){sessionToken = location.state.sessionToken; admissionNumber = location.state.admissionNumber}else{alert("Session expired kindly login again ! (:"); nav('/ParentLogin')}

    const sendMessage = () => {
        if (messageInput.trim() === '') return;
    try{axios.post("http://localhost:3333/chat/adminParentChat",{data:messageInput, sender:'parent', reciever:'adminAssist', parentName:fee.parentName, childAdmissionNumber:admissionNumber, date:new Date().toLocaleString()}).then(res=>{if(res.status!==222){alert("Network problem! Once check internet connection and try again!!(: ")}}).catch(error => {console.error("Error fetching messages:", error)});
        setMessageInput('');} catch(e){console.log(""+e+"");}
    };
  
    // Function to fetch messages from API
    const fetchMessages = () => {
      try{
      axios.get("http://localhost:3333/chat/adminParentChat")
      .then(res=>{if(res.status!==222){setWarning(true)} return res;}).then(res=>setMessages(res.data)).catch(error => {console.error("Error fetching messages:", error)});
    } catch(e){console.log(""+e+"")}
    };

    useEffect(()=>{
      axios.get("http://localhost:3333/fee/"+admissionNumber+"").then(res=>{if(fee.data!==res.data){setFee(res.data)} if(res.data===null){alert("You are not enrolled in our school database, kindly connect with Admin (Admin assistant) (:"); nav('/ParentLogin');}}).catch(e=>console.log(e));    
      console.log(JSON.stringify(fee));
    },[]);
  
    useEffect(() => {
      const interval = setInterval(async () => {
       await fetchMessages();
      /* try{
         if(location.state.fees!==null && location.state.fees!==fee){setFee(location.state.fees);}
       }catch(e){} */
      }, 5000); 
      return () => clearInterval(interval);
    }, []);
    
    useEffect( ()=>{
      setData(prevData => ({
        ...prevData,
        datasets: [{
          ...prevData.datasets[0], 
          data: [fee.totalAmount-fee.paidAmount, fee.paidAmount], 
        }],
        labels: ['Pending fee', 'Paid fee'] 
      }));   
    },[fee])

    useEffect(()=>{
          axios.get("http://localhost:3333/parentLogin/parentDashboard",{headers:{'x-token':sessionToken}}).then(res=>{if(res.status!==222){alert('authentication failed try again later (: ');nav('/ParentLogin');}}).catch((e)=>{console.log(e);});
    },[]);
  
    return (
      <div className="app">
        <h1> Chat with Admin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome {fee.parentName} -- {fee.studentName} 's parent &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pending Fee : {fee.totalAmount-fee.paidAmount}</h1>
        <div className="chat-container">
          {/* Chat Application */}
          <div className="chat-app">
            {/* Chat messages */}
            <div className="chat-messages">

              {messages.map((message) => (  message.childAdmissionNumber===fee.admissionNumber &&
                <div
                  key={message.id}
                  className={`message ${message.sender === 'parent' ? 'sent' : 'received'}`}
                >
                  {message.data}    <div className="message-meta">{message.date}</div>
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
            /></div>
          {/* Arrow icon for sending message */}
          <div className="send-arrow"><button onClick={sendMessage}>
          ➡️</button>
          </div>
        </div>
      </div>
          <div className="button-container">
            {/* Two buttons  display pending fee*/}     
            {warning && <p> Failed Loading messages try check internet connection (:</p>}      
            <button onClick={()=>{nav('/FeeForm',{state:{feees:fee.totalAmount-fee.paidAmount, admissionNumber:admissionNumber, studentName:fee.studentName}})}} className="button">Pay fee/download fee-paid reciepts</button>
            <button onClick={()=>{nav('/StudentAcademics',{state:{studentName:fee.parentName+" garu! parent of "+fee.studentName, admissionNumber:admissionNumber, clss:fee.studentClass}})}} className="button">Your Child's Academic Score</button>
          </div>
          <div><Pie data={data} height="512px" width="512px" options={{ maintainAspectRatio: false }} /></div>
          <button onClick={()=>{sessionToken=null; nav('/ParentLogin');}}>Logout</button>
        </div>)
}
export default ParentDashboard ;