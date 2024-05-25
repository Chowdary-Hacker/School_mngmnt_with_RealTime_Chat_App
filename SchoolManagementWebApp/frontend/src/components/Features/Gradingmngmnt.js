import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel, IconButton, 
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Container,
  Paper,
  Box, TableContainer,
  CssBaseline,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

function Grading() {
  const [selectedOption, setSelectedOption] = useState('');
  const [teacherMail, setTeacherMail] = useState('');
  const [data, setData] = useState(null);
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [studentInfo, setStudentInfo] = useState([]);
  const [selectedMain, setSelectedMain] = useState(null);
  const [marks, setMarks] = useState({});
  const [maximumMark, setMaximumMark] = useState('');
  const [batch, setBatch] = useState('');
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    setTeacherMail(location.state.teacherMail);
    axios.get("http://localhost:3333/studentInfo")
      .then(res => { setStudentInfo(res.data); })
      .catch(e => { console.log(e) });
  }, [location.state.teacherMail]);

  useEffect(() => {
    if (teacherMail) {
      axios.get(`http://localhost:3333/teacherInfo/${teacherMail}`)
        .then(res => { setData(res.data); })
        .catch(e => { console.log(e) });
      axios.get("http://localhost:3333/marks/batch")
        .then(res => { setBatch(res.data[0].batch); })
        .catch(e => console.log(e));
    }
  }, [teacherMail]);

  const handleMarksChange = (admissionNumber, name, mark) => {
    setMarks(prevMarks => {
      const updated = { ...prevMarks };
      updated[selectedOption] = {
        ...(prevMarks[selectedOption] || {}),
        [selectedSubject]: [
          ...(prevMarks[selectedOption]?.[selectedSubject] || []),
        ],
      };
      const index = updated[selectedOption][selectedSubject].findIndex(student => student.admissionNumber === admissionNumber);
      if (index >= 0) {
        updated[selectedOption][selectedSubject][index] = { admissionNumber, studentName: name, MaximumMark: maximumMark, marks: mark };
      } else {
        updated[selectedOption][selectedSubject].push({ admissionNumber, studentName: name, MaximumMark: maximumMark, marks: mark });
      }
      return updated;
    });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:3333/marks", {
      batch: batch + selectedMain.class,
      clss: selectedMain.class,
      examType: selectedOption,
      subject: selectedSubject,
      marks: marks[selectedOption][selectedSubject]
    })
      .then(res => { alert(res.data); })
      .catch(e => console.log(e));
  };

  const handleMemberClick = (arr, obj) => {
    setSelectedClass(arr);
    setSelectedMain(obj);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Grading System
          </Typography>
          <Typography variant="h4" align="center" gutterBottom sx={{marginRight:'20%'}}>
            Welcome {data && data.name}, for assigning marks
          </Typography>
          <IconButton color="inherit" onClick={() => { nav('/TeacherLogin'); }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
            <FormControl variant="outlined" style={{ minWidth: 200 }}>
              <InputLabel>Select an exam type</InputLabel>
              <Select value={selectedOption} onChange={handleChange} label="Select an exam type">
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="fa1">FA1</MenuItem>
                <MenuItem value="fa2">FA2</MenuItem>
                <MenuItem value="fa3">FA3</MenuItem>
                <MenuItem value="fa4">FA4</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {selectedOption && data && (
            <Box display="flex" justifyContent="center" mb={3}>
              {data.class.map(obj => (
                <Button key={obj.class} variant="contained" color="primary" onClick={() => handleMemberClick(obj.subject, obj)} style={{ margin: '0 1rem' }}>
                  {obj.class}
                </Button>
              ))}
            </Box>
          )}
          {selectedClass.length > 0 && (
            <Box display="flex" justifyContent="center" mb={3}>
              {selectedClass.map(str => (
                <Button key={str} variant="contained" color="secondary" onClick={() => setSelectedSubject(str)} style={{ margin: '0 1rem' }}>
                  {str}
                </Button>
              ))}
            </Box>
          )}
          {selectedSubject && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Admission Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Marks</TableCell>
                    <TableCell>
                      Maximum Mark for this subject
                      <TextField type="number" onChange={e => setMaximumMark(e.target.value)} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentInfo.map(student => (
                    parseInt(student.class) === parseInt(selectedMain.class) && (
                      <TableRow key={student.admissionNumber}>
                        <TableCell>{student.admissionNumber}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <TextField type="number" onChange={e => handleMarksChange(student.admissionNumber, student.name, e.target.value)} />
                        </TableCell>
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedSubject && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Button variant="contained" color="success" onClick={handleSubmit}>Submit Marks</Button>
            </Box>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Grading;
