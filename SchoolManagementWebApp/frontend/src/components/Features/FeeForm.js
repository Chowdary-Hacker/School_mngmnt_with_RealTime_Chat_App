/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
const FeeForm = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [er, seter] = useState(true);
  const [admissionNumber, setAdmissionNumber] = useState(); 
  const [studentName, setStudentName] = useState(); 
  const [pdfPaths, setPdfPaths] = useState();  
  const [fee, setFee] = useState();
  const [payingAmount, setPayingAmount] = useState();
  const [loading, setLoading] = useState(null); 
var sh;
  const handleChange = (event) => {
    const intValue = parseInt(event.target.value);
    setPayingAmount(intValue);
  };
  useEffect(()=>{
    try{
        setAdmissionNumber(location.state.admissionNumber);
        setStudentName(location.state.studentName);
       // setFee(location.state.feees);
        seter(false);
      } catch(e){alert("Your session has been expired! kindly login again.. (:"); nav('/');}
  },[]);

  useEffect(()=>{
      axios.get("http://localhost:3333/fee/"+admissionNumber).then(res=>{if(res.status===222){console.log("called");setFee(res.data.totalAmount-res.data.paidAmount)}}).catch(e=>console.log(e));
      console.log("called");
  },[admissionNumber])

  const fetchReceipts = () => {
    try {
      axios.get('http://localhost:3333/fee/receipts/'+admissionNumber+'').then(response =>
      {setPdfPaths(response.data.files)}).catch();
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  }
  const load = () => {
    process();
  };

  const process = () => {
    try{ console.log(loading);
    axios.put("http://localhost:3333/fee/paying/"+admissionNumber+"",{payingAmount:payingAmount, date:new Date().toLocaleString()}).then(res=>{setFee(res.data)}).catch((e)=>console.log(e));
    } catch(e){console.log("try-catch",e)}
    const interval = setInterval(() => {
      sh = 2; setLoading(false);
      //just to see running img for some more time.. i've been making little bit delay here (:
     }, 3000); 
     return () => clearInterval(interval);
    
  }

  const downloadReceipt = async (fileName) => {
    try {
      // Make a GET request to download the receipt file
      const response = await axios.get(`http://localhost:3333/fee/download/${admissionNumber}/${fileName}`, {
        responseType: 'blob'
      });

      // Create a temporary URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };


  return (
   <div>
   
   {er ? (
  <h1></h1>
) : (
  <>
    <h1>Pending fee: {fee}</h1>
    <p>Student Name: {studentName}</p>
    <p>Student Admission Number: {admissionNumber}</p>
  </>
)}    
    <div>
      <h1>PDF Receipts</h1>
      <button onClick={fetchReceipts}>Fetch Receipts</button>
    </div>
    
     { pdfPaths && <div> <h2>List of Receipts</h2>
      <ul>
        {pdfPaths.map((fileName, index) => (
          <li key={index}>
            <button onClick={() => downloadReceipt(fileName)}>{fileName}</button>
          </li>
        ))}
      </ul> </div>  } 
    
    <input type='text' placeholder='Enter Amount' onChange={handleChange}/>
    <button onClick={()=>{setLoading(true); load()}}>Pay</button>{loading?( <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDAzZXkxNm85OTU5d3M3N2xkajg1OTlxYnZ5eGxkb2Vzb28wcGlodyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sux3kje9eOx1e/giphy.gif" alt="Running" />):(<p></p>)}
   </div>
  );
};

export default FeeForm;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Button, TextField, CircularProgress, List, ListItem, ListItemText, 
  Container, Grid, Paper, Card, CardContent, Snackbar, Alert
} from '@mui/material';

const FeeForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [pdfPaths, setPdfPaths] = useState([]);
  const [fee, setFee] = useState(null);
  const [payingAmount, setPayingAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    try {
      const state = location.state;
      if (state && state.admissionNumber && state.studentName) {
        setAdmissionNumber(state.admissionNumber);
        setStudentName(state.studentName);
        setError(false);
      } else {
        throw new Error("Invalid state");
      }
    } catch (e) {
      setSnackbarMessage("Your session has expired! Please login again.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      navigate('/');
    }
  }, [location, navigate]);

  useEffect(() => {
    if (admissionNumber) {
      console.log(`Fetching fee details for admission number: ${admissionNumber}`);
      axios.get(`http://localhost:3333/fee/${admissionNumber}`)
        .then(res => {
          if (res.status === 222) {
            setFee(res.data.totalAmount - res.data.paidAmount);
          } else {
            console.error(`Unexpected response status: ${res.status}`);
          }
        })
        .catch(e => {
          console.error('Error fetching fee details:', e);
          setSnackbarMessage('Error fetching fee details. Please try again.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    }
  }, [admissionNumber]);

  const fetchReceipts = () => {
    axios.get(`http://localhost:3333/fee/receipts/${admissionNumber}`)
      .then(response => {
        setPdfPaths(response.data.files);
      })
      .catch(error => {
        console.error('Error fetching receipts:', error);
        setSnackbarMessage('Error fetching receipts. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const processPayment = () => {
    setLoading(true);
    axios.put(`http://localhost:3333/fee/paying/${admissionNumber}`, { payingAmount, date:new Date().toLocaleString('en-GB') })
      .then(res => {
        setFee(res.data);
        setLoading(false);
        setSnackbarMessage('Payment successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error processing payment:', error);
        setLoading(false);
        setSnackbarMessage('Payment failed. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const downloadReceipt = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:3333/fee/download/${admissionNumber}/${fileName}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Fee Payment System
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ mt: 4 }} >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {error ? (
                <Typography variant="h5" color="error">Session Expired. Please login again.</Typography>
              ) : (
                <>
                  <Typography variant="h4" gutterBottom>
                    Pending Fee: {fee !== null ? fee : <CircularProgress size={24} />}
                  </Typography>
                  <Typography variant="h6">Student Name: {studentName}</Typography>
                  <Typography variant="h6">Student Admission Number: {admissionNumber}</Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={fetchReceipts} 
            sx={{ mb: 2 }}
          >
            Fetch Receipts
          </Button>
        </Grid>

        {pdfPaths.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">List of Receipts</Typography>
              <List>
                {pdfPaths.map((fileName, index) => (
                  <ListItem key={index} sx={{ mb: 1 }}>
                    <ListItemText>
                      <Button variant="outlined" onClick={() => downloadReceipt(fileName)}>
                        {fileName}
                      </Button>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <TextField
            label="Enter Amount"
            variant="outlined"
            type="number"
            fullWidth
            onChange={(e) => setPayingAmount(parseInt(e.target.value))}
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            color="secondary" 
            fullWidth
            onClick={processPayment} 
            disabled={loading}
          >
            Pay
          </Button>
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              <CircularProgress />
            </div>
          )}
        </Grid>
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FeeForm;
