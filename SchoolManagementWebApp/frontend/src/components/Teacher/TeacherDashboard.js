import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; import axios from 'axios'; import ChatApp from '../Features/ChatApp';
import ChatIcon from '@mui/icons-material/Chat';
import AcademicsIcon from '@mui/icons-material/School'; import {
  AppBar, Toolbar, Typography, Button, TextField, CircularProgress, Grid, Card, CardContent,
  Snackbar, Alert, IconButton, Paper, Container, Box, Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { blue } from '@mui/material/colors';
function TeacherDashboard(){
   //implement grading system, -- admin, students communication with teacher.
   const [messages, setMessages] = useState([]); const [teacherName, setTeacherName] = useState(); const [teacherMail, setTeacherMail] = useState();
   const [messageInput, setMessageInput] = useState('');
   const nav = useNavigate(); const location = useLocation();
   const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
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
<Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mb: 2}}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight:'bold', textAlign:'left' }}>Teacher Dashboard</Typography>
          <Typography variant="h6" sx={{flexGrow: 1, fontWeight:'bold', textAlign:'center'}}>Welcome {teacherMail} - {teacherName} </Typography>
          <Button sx={{flexGrow: 1, fontWeight:'bold', textAlign:'left', marginRight:'89px'}}  variant="contained"
                color="secondary" startIcon={<AcademicsIcon />} onClick={()=>nav('/Grading', {state:{teacherMail:teacherMail}})}>Assign Grades</Button>

          <IconButton color="inherit" onClick={() => { nav('/TeacherLogin'); }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      </Box>


      <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{width:'98%', marginLeft:'10px'}}>
            <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2, textAlign:'center', marginLeft:'33%'}}>  <ChatIcon sx={{ fontSize: 40, mr: 1 }} />
                  <Typography variant="h6" sx={{color:'blue', fontWeight:'bold', fontFamily:'cursive'}}>Join the conversation with Admin</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
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
         <div className="chat-header" style={{paddingTop:'10px'}}>
       <div style={{paddingTop:'3%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
       <ChatIcon sx={{ fontSize: 40, mr: 1 }} />
       <Typography variant="h6" sx={{color:'blue', fontWeight:'bold', fontFamily:'cursive'}}>Join the conversation with a Teacher or Student</Typography>
       </div>
        <Grid item xs={12} sm={6}>
        <Card variant="outlined" sx={{width:'97%', marginLeft:'29px', marginRight:'10px'}}>
            <CardContent>
         <ChatApp role={teacherMail} check="teacher" checkOpp="student" secMain={teacherName} beg="teacherTeacherChat"/>
         </CardContent>
        </Card>
        </Grid>
        </div> 
       </div>)
}
export default TeacherDashboard;