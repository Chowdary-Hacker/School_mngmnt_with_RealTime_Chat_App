import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ChatIcon from '@mui/icons-material/Chat';
import AcademicsIcon from '@mui/icons-material/School';
import '../../App.css'; import ChatApp from '../Features/ChatApp';
import {
  AppBar, Toolbar, Typography, Button, TextField, CircularProgress, Grid, Card, CardContent,
  Snackbar, Alert, IconButton, Paper, Container, Box, Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { blue } from '@mui/material/colors';

function StudentDashboard() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const nav = useNavigate();
  const location = useLocation();
  const [admissionNumber, setAdmissionNumber] = useState();
  const [studentName, setStudentName] = useState();
  const [clss, setClss] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  var sessionToken;

  useEffect(() => {
    try {
      setAdmissionNumber(location.state.admissionNumber);
      sessionToken = location.state.sessionToken;
      axios.get("http://localhost:3333/studentLogin/studentDashboard", { headers: { 'x-token': sessionToken } })
        .then(res => {
          if (res.status !== 222) {
            alert('Authentication failed. Please try again later.');
            nav('/studentLogin');
          }
        })
        .catch((e) => console.log(e));
    } catch { }
  }, []);

  useEffect(() => {
    try {
      axios.get("http://localhost:3333/studentInfo/" + admissionNumber + "")
        .then(res => {
          console.log(res.data);
          setStudentName(res.data.name);
          setClss(res.data.class);
        })
        .catch((e) => console.log(e));
    } catch { };
  }, [admissionNumber]);

  const sendMessage = async () => {
    if (messageInput.trim() === '') return;
    try {
      axios.post("http://localhost:3333/chat/adminStudentChat", {
        data: messageInput,
        sender: '' + admissionNumber + '',
        reciever: 'adminAssist',
        studentName: studentName,
        admissionNumber: admissionNumber,
        date: new Date().toLocaleString()
      })
        .then(res => {
          if (res.status !== 222) {
            alert("Network problem! Please check your internet connection and try again.");
          }
        })
        .catch(error => {
          console.error("Error sending message:", error)
        });
    } catch { };
    setMessageInput('');
  };

  const fetchMessages = () => {
    try {
      axios.get("http://localhost:3333/chat/adminStudentChat")
        .then(res => {
          if (res.status === 222) {
            setMessages(res.data)
          }
        })
        .catch(error => {
          console.error("Error fetching messages:", error)
        });
    } catch (e) {
      console.log("" + e + "")
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchMessages();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mb: 2}}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight:'bold', textAlign:'left' }}>Student Dashboard</Typography>
          <Typography variant="h6" sx={{flexGrow: 1, fontWeight:'bold', textAlign:'center'}}>Welcome {studentName} ({admissionNumber})</Typography>
          <Button sx={{flexGrow: 1, fontWeight:'bold', textAlign:'left', marginRight:'89px'}}  variant="contained"
                color="secondary" startIcon={<AcademicsIcon />} onClick={() => nav('/StudentAcademics', { state: { studentName: studentName, admissionNumber: admissionNumber, clss: clss } })}>Academics</Button>

          <IconButton color="inherit" onClick={() => { nav('/StudentLogin'); }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      </Box>

      <Grid container spacing={2} sx={{display:'flex', flexDirection:'column'}}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{width:'200%', marginLeft:'10px'}}>
            <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2, textAlign:'center', marginLeft:'33%'}}>  <ChatIcon sx={{ fontSize: 40, mr: 1 }} />
                  <Typography variant="h6" sx={{color:'blue', fontWeight:'bold', fontFamily:'cursive'}}>Join the conversation with Admin</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                <div className="chat-messages">
                  {messages.map((message) => (
                    message.admissionNumber === admissionNumber &&
                    <div
                      key={message.id}
                      className={`message ${message.sender === admissionNumber ? 'sent' : 'received'}`}
                    >
                      <p>{message.data}</p>
                      <p className="message-meta">{message.date}</p>
                    </div>
                  ))}
                </div>
                <div className="message-input-container">
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" color="primary" fullWidth onClick={sendMessage}>
                        <SendIcon />
                      </Button>
                    </Grid>
                  </Grid>  
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <div style={{width:'97%'}}>
       <div style={{paddingTop:'3%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
       <ChatIcon sx={{ fontSize: 40, mr: 1 }} />
       <Typography variant="h6" sx={{color:'blue', fontWeight:'bold', fontFamily:'cursive'}}>Join the conversation with a Teacher or Student</Typography>
       </div>
        <Grid item xs={12} sm={6}>
        <Card variant="outlined" sx={{width:'200%', marginLeft:'29px', marginRight:'10px'}}>
            <CardContent>

          <ChatApp role={admissionNumber} check="student" checkOpp="teacher" secMain={studentName} beg="studentStudentChat" />
        </CardContent>
        </Card>
        </Grid>
        </div>
      </Grid>
    </div>
  );
}

export default StudentDashboard;

