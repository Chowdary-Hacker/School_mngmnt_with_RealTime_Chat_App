import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, Legend, ArcElement, Tooltip } from 'chart.js';
import {
  AppBar, Toolbar, Typography, Button, TextField, CircularProgress, Grid, Card, CardContent,
  Snackbar, Alert, IconButton, Paper, Container, Box
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { blue } from '@mui/material/colors';

Chart.register(Legend, ArcElement, Tooltip);

function ParentDashboard() {
  const [messages, setMessages] = useState([{ data: "Hlo", sender: "parent", date: '2024 10:00' }, { data: "Its Mohan", sender: "admin", date: '2024 10:00' }]);
  const [warning, setWarning] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [fee, setFee] = useState(0);
  const [data, setData] = useState({ labels: ['Pending fee', 'Paid fee'], datasets: [{ label: "Fee status", data: [], backgroundColor: ['blue', 'yellow'] }] });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const location = useLocation();
  let sessionToken;
  let admissionNumber;

  if (location.state.sessionToken !== null) {
    sessionToken = location.state.sessionToken;
    admissionNumber = location.state.admissionNumber;
  } else {
    alert("Session expired kindly login again ! (:"); navigate('/ParentLogin')
  }

  const sendMessage = () => {
    if (messageInput.trim() === '') return;
    try {
      axios.post("http://localhost:3333/chat/adminParentChat", { data: messageInput, sender: 'parent', receiver: 'adminAssist', parentName: fee.parentName, childAdmissionNumber: admissionNumber, date: new Date().toLocaleString() })
        .then(res => {
          if (res.status !== 222) { alert("Network problem! Once check internet connection and try again!!(: ") }
        })
        .catch(error => {
          console.error("Error fetching messages:", error)
        });
      setMessageInput('');
    } catch (e) { console.log("" + e + ""); }
  };

  const fetchMessages = () => {
    try {
      axios.get("http://localhost:3333/chat/adminParentChat")
        .then(res => {
          if (res.status !== 222) { setWarning(true) }
          return res;
        }).then(res => setMessages(res.data))
        .catch(error => {
          console.error("Error fetching messages:", error)
        });
    } catch (e) { console.log("" + e + "") }
  };

  useEffect(() => {
    axios.get(`http://localhost:3333/fee/${admissionNumber}`).then(res => {
      if (fee.data !== res.data) { setFee(res.data) }
      if (res.data === null) { alert("You are not enrolled in our school database, kindly connect with Admin (Admin assistant) (:"); navigate('/ParentLogin'); }
    }).catch(e => console.log(e));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchMessages();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        data: [fee.totalAmount - fee.paidAmount, fee.paidAmount],
      }],
      labels: ['Pending fee', 'Paid fee']
    }));
  }, [fee]);

  useEffect(() => {
    axios.get("http://localhost:3333/parentLogin/parentDashboard", { headers: { 'x-token': sessionToken } })
      .then(res => {
        if (res.status !== 222) { alert('authentication failed try again later (: '); navigate('/ParentLogin'); }
      }).catch((e) => { console.log(e); });
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight:'bold' }}  >
            Parent Dashboard &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Welcome {fee.parentName} -- {fee.studentName}'s Parent
          </Typography>
          <IconButton color="inherit" onClick={() => { sessionToken = null; navigate('/ParentLogin'); }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{color:'blue', fontWeight:'bold', fontFamily:'cursive'}}>
                  Chat with Admin
                </Typography>
                <Paper sx={{ p: 2, height: '400px', overflow: 'auto' }}>
                  <Box sx={{ mb: 2, height: '75%', overflowY: 'auto' }}>
                  {messages.map((message) => (
  message.childAdmissionNumber === fee.admissionNumber &&
  <div
  key={message.id}
  className={`message ${message.sender === 'parent' ? 'sent' : 'received'}`}
>
  {message.data}    <div className="message-meta">{message.date}</div>
</div>
))}
                  </Box>
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
                </Paper>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
              <Typography variant="h6" gutterBottom sx={{color:'red', fontWeight:'bold', fontFamily:'cursive'}}>
                  Pending Fee: ₹{fee.totalAmount - fee.paidAmount} Rupees
                </Typography>
                <Typography variant="h6" gutterBottom sx={{color:'blue', fontWeight:'bold', fontFamily:'cursive'}}>
                  Fee Status :
                </Typography>
                <Box sx={{ textAlign: 'center', height:'409px' }}>
                  <Pie data={data} options={{ maintainAspectRatio: false, height:'100%'}} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => { navigate('/FeeForm', { state: { feees: fee.totalAmount - fee.paidAmount, admissionNumber: admissionNumber, studentName: fee.studentName } }) }}
              >
                Pay Fee/Download Receipts
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => { navigate('/StudentAcademics', { state: { studentName: fee.parentName + " garu! parent of " + fee.studentName, admissionNumber: admissionNumber, clss: fee.studentClass } }) }}
              >
                Your Child's Academic Score
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ParentDashboard;
