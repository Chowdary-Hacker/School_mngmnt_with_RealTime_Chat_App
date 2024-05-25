import React, { useEffect } from 'react';
import '../../App.css'; import { useState } from 'react'; import {useLocation, useNavigate} from 'react-router-dom';
import { Pie } from 'react-chartjs-2'; import axios from 'axios';
import {Chart, Legend, ArcElement, Tooltip} from 'chart.js';
import {
  AppBar, Toolbar, Typography, Button, TextField, CircularProgress, Grid, Card, CardContent,
  Snackbar, Alert, IconButton, Paper, Container, Box
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { blue } from '@mui/material/colors';

function StudentAcademics() {
  Chart.register(Legend, ArcElement, Tooltip);
  const [studentDetails, setStudentDetails] = useState(); const nav = useNavigate(); const location = useLocation(); const [marks, setMarks] = useState(); const [timeTable, setTimeTable] = useState(); const [syllabus, setSyllabus] = useState(); const [fa1, setfa1] = useState(); const [fa2, setfa2] = useState(); const [fa3, setfa3] = useState(); const [fa4, setfa4] = useState(); const [maxfa1, setmaxfa1] = useState(); const [maxfa2, setmaxfa2] = useState(); const [maxfa3, setmaxfa3] = useState(); const [maxfa4, setmaxfa4] = useState(); const [showButton, setShowButton] = useState(); const [batch, setBatch] = useState(); const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
 useEffect(()=>{
try{
   axios.get("http://localhost:3333/marks/batch").then(res=>{setBatch(res.data[0].batch);console.log(res.data[0].batch)}).catch(e=>console.log(e));
   setStudentDetails({studentName:location.state.studentName, clss:location.state.clss, admissionNumber:location.state.admissionNumber});
}catch(e){console.log(e)}
  },[location.state])

  useEffect(()=>{
    if (studentDetails) {
    axios.get("http://localhost:3333/marks/timeTable/"+studentDetails.clss).then(res=>{if(res.status===222){setTimeTable(res.data)}else(alert('something went wrong..'))}).catch(e=>console.log(e));
    axios.get("http://localhost:3333/marks/syllabus/"+studentDetails.clss).then(res=>{if(res.status===222){setSyllabus(res.data)}else(alert('something went wrong..'))}).catch(e=>console.log(e));
    axios.get("http://localhost:3333/marks/"+batch+studentDetails.clss).then(res=>{if(res.status===222){setMarks(res.data)}else(alert('something went wrong..'))}).catch(e=>console.log(e));
    }
    },[studentDetails, batch]);

    useEffect(() => {
      if (marks) {
        const keys = Object.keys(marks.fa1); var keee = ["telugu","telugu","telugu","telugu"]; 
        for(let i=0; i<6; i++){
          if(marks.fa1[keys[i]].length>0){keee[0] = keys[i]}
          if(marks.fa2[keys[i]].length>0){keee[1] = keys[i]}
          if(marks.fa3[keys[i]].length>0){keee[2] = keys[i]}
          if(marks.fa4[keys[i]].length>0){keee[3] = keys[i]}
        }
        const indices = [
          marks.fa1[keee[0]].findIndex(sh => sh.admissionNumber === studentDetails.admissionNumber),
          marks.fa2[keee[1]].findIndex(sh => sh.admissionNumber === studentDetails.admissionNumber),
          marks.fa3[keee[2]].findIndex(sh => sh.admissionNumber === studentDetails.admissionNumber),
          marks.fa4[keee[3]].findIndex(sh => sh.admissionNumber === studentDetails.admissionNumber)
        ];
  try{
        setfa1({
          labels: ['Telugu', 'Hindi', 'English', 'Mathematics', 'Science', 'Social'],
          data: [marks.fa1.telugu[indices[0]]?.marks, marks.fa1.hindi[indices[0]]?.marks, marks.fa1.english[indices[0]]?.marks, marks.fa1.mathematics[indices[0]]?.marks, marks.fa1.science[indices[0]]?.marks, marks.fa1.social[indices[0]]?.marks]
        });  setmaxfa1([marks.fa1.telugu[indices[0]]?.MaximumMark, marks.fa1.hindi[indices[0]]?.MaximumMark, marks.fa1.english[indices[0]]?.MaximumMark, marks.fa1.mathematics[indices[0]]?.MaximumMark, marks.fa1.science[indices[0]]?.MaximumMark, marks.fa1.social[indices[0]]?.MaximumMark]);
        setfa2({
          labels: ['Telugu', 'Hindi', 'English', 'Mathematics', 'Science', 'Social'],
          data: [marks.fa2.telugu[indices[1]]?.marks, marks.fa2.hindi[indices[1]]?.marks, marks.fa2.english[indices[1]]?.marks, marks.fa2.mathematics[indices[1]]?.marks, marks.fa2.science[indices[1]]?.marks, marks.fa2.social[indices[1]]?.marks]
        }); setmaxfa2([marks.fa2.telugu[indices[0]]?.MaximumMark, marks.fa2.hindi[indices[0]]?.MaximumMark, marks.fa2.english[indices[0]]?.MaximumMark, marks.fa2.mathematics[indices[0]]?.MaximumMark, marks.fa2.science[indices[0]]?.MaximumMark, marks.fa2.social[indices[0]]?.MaximumMark]);
        setfa3({
          labels: ['Telugu', 'Hindi', 'English', 'Mathematics', 'Science', 'Social'],
          data: [marks.fa3.telugu[indices[2]]?.marks, marks.fa3.hindi[indices[2]]?.marks, marks.fa3.english[indices[2]]?.marks, marks.fa3.mathematics[indices[2]]?.marks, marks.fa3.science[indices[2]]?.marks, marks.fa3.social[indices[2]]?.marks]
        });  setmaxfa3([marks.fa3.telugu[indices[0]]?.MaximumMark, marks.fa3.hindi[indices[0]]?.MaximumMark, marks.fa3.english[indices[0]]?.MaximumMark, marks.fa3.mathematics[indices[0]]?.MaximumMark, marks.fa3.science[indices[0]]?.MaximumMark, marks.fa3.social[indices[0]]?.MaximumMark]);
        setfa4({
          labels: ['Telugu', 'Hindi', 'English', 'Mathematics', 'Science', 'Social'],
          data: [marks.fa4.telugu[indices[3]]?.marks, marks.fa4.hindi[indices[3]]?.marks, marks.fa4.english[indices[3]]?.marks, marks.fa4.mathematics[indices[3]]?.marks, marks.fa4.science[indices[3]]?.marks, marks.fa4.social[indices[3]]?.marks]
        }); setmaxfa4([marks.fa4.telugu[indices[0]]?.MaximumMark, marks.fa4.hindi[indices[0]]?.MaximumMark, marks.fa4.english[indices[0]]?.MaximumMark, marks.fa4.mathematics[indices[0]]?.MaximumMark, marks.fa4.science[indices[0]]?.MaximumMark, marks.fa4.social[indices[0]]?.MaximumMark]);
      
            const examTypes = ['fa1', 'fa2', 'fa3', 'fa4'];
            const subjects = ['telugu', 'hindi', 'english', 'mathematics', 'science', 'social'];
            let allExamTypesDefined = true;
            let allSubjectsAbove50 = true;
      
            for (let examType of examTypes) {
              if (!marks[examType]) {
                allExamTypesDefined = false;
                break;
              }
              for (let subject of subjects) {
                if (!marks[examType][subject] || marks[examType][subject].length === 0) {
                  allExamTypesDefined = false;
                  break;
                }
                const studentMarks = marks[examType][subject][0]?.marks; // Assuming the first student's marks are to be checked
                if (parseInt(studentMarks) <= 50) {
                  allSubjectsAbove50 = false;
                }
              }
            }
      
            if (allExamTypesDefined && allSubjectsAbove50) {
              setShowButton(true);
            } else {
              setShowButton(false);
            }
      }catch(e){console.log(e)}
      }
    }, [marks, studentDetails]);

const promote = () =>{
const som =window.confirm("If you click ok/confirm, you further cant see your score so better to take snap shot of you score"); if(som){
  axios.put("http://localhost:3333/studentInfo/reset/"+studentDetails.admissionNumber).then(res=>{if(res.status!==222){alert("failed1")}}).catch(e=>console.log(e));
  axios.put("http://localhost:3333/fee/"+studentDetails.admissionNumber).then(res=>{if(res.status!==222){alert("failed2")}}).catch(e=>console.log(e));
} 
}

  const createPieData = (data, maxdata) => ({
    labels: data.labels.map((label, index) => `${label}: ${data.data[index]}/${maxdata[index]}`),
    datasets: [
      {
        data: data.data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });
  const calculateStatistics = (data, maxdata) => { console.log(JSON.stringify(data)+" - "+JSON.stringify(maxdata) )
    const total = data.data.reduce((acc, val) => acc + (parseInt(val) || 0), 0);
    const maxTotal = maxdata.reduce((acc, val) => acc + (parseInt(val) || 0), 0); // Assuming each subject is out of 100 marks
    const percentage = (total / maxTotal) * 100;
    let feedback = '';

    if (percentage >= 90) feedback = 'Excellent 𝒢𝓇𝒶𝒹𝑒 - A+';
    else if (percentage >= 75) feedback = 'Good 𝒢𝓇𝒶𝒹𝑒 - B';
    else if (percentage >= 50) feedback = 'Average 𝒢𝓇𝒶𝒹𝑒 - C';
    else feedback = 'Needs Improvement 𝒢𝓇𝒶𝒹𝑒 - F(failed)';

    return { total, maxTotal, percentage, feedback };
  };
  const PieChart = ({keyy, data, maxdata}) => { 
    const { total, maxTotal, percentage, feedback } = calculateStatistics(data, maxdata);

    return (
      <div className='chart-container'>
        <Pie data={createPieData(data, maxdata)}/>
        <div style={{display:'flex', justifyContent:'space-around'}}>
         <div> <h4>{keyy} : </h4> </div>
         <div> <p style={{color:'green'}}>Total Marks: {total},   Max Total: {maxTotal}</p>
          <p style={{color:'green'}}>Percentage: {percentage.toFixed(2)}%,    Feedback: {feedback}</p>
          </div>  </div>
      </div>
    );
  };

  
  const App = () => { console.log("fa-3 : "+JSON.stringify(fa3)+" fa2: "+JSON.stringify(fa2));
    const charts = [
      (fa1?.data[0] || fa1?.data[1] || fa1?.data[2] || fa1?.data[3] || fa1?.data[4] || fa1?.data[5]) && <PieChart key="fa1" data={fa1} keyy="FA1" maxdata={maxfa1}/>,
      (fa2?.data[0] || fa2?.data[1] || fa2?.data[2] || fa2?.data[3] || fa2?.data[4] || fa2?.data[5]) && <PieChart key="fa2" data={fa2} keyy="FA2" maxdata={maxfa2}/>,
      (fa3?.data[0] || fa3?.data[1] || fa3?.data[2] || fa3?.data[3] || fa3?.data[4] || fa3?.data[5]) && <PieChart key="fa3" data={fa3} keyy="FA3" maxdata={maxfa3}/>,
      (fa4?.data[0] || fa4?.data[1] || fa4?.data[2] || fa4?.data[3] || fa4?.data[4] || fa4?.data[5]) && <PieChart key="fa4" data={fa4} keyy="FA4" maxdata={maxfa4}/>,
    ].filter(Boolean);
  return (
    
    // Sample data
   
    
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems:'baseline' }}>
          {charts.map((chart, index) => (
            <div
              key={index}
              style={{
                flex: charts.length === 1 || charts.length === 3 ? '1 1 31%' : '1 1 31%',
                display: 'flex',
                justifyContent: 'center',
                margin: '10px',
              }}
            >
              {chart}
            </div>
          ))}
        </div>
      );
    };
  
return(
<div>
<Container maxWidth="lg">
<AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight:'bold', textAlign:'center', fontFamily:'cursive' }}  >
          Hello {studentDetails && studentDetails.studentName} (:          </Typography>
          <IconButton color="inherit" onClick={() => {nav('/'); }}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
<div> <h2>Academic Performance Tracking</h2>
   <App/>
  </div>  {showButton && <div style={{display:'flex', paddingTop:'11%', justifyContent:'center'}}><button onClick={promote}>Promote to {studentDetails && parseInt(studentDetails.clss)+1}</button></div> }
  <div style={{display:'flex', paddingTop:'9%', justifyContent:'space-evenly'}}>
  {timeTable &&  <div>
    <section className="section">
          <h2>Class Schedules</h2>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>09:00 AM - 10:00 AM</th>
                <th>10:15 AM - 11:15 AM</th>
                <th>11:15 AM - 12:15 AM</th>
                <th>01:00 PM - 02:30 PM</th>
                <th>02:45 PM - 04:15 PM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday</td>
                <td>{timeTable.monday[0]}</td>
                <td>{timeTable.monday[1]}</td>
                <td>{timeTable.monday[2]}</td>
                <td>{timeTable.monday[3]}</td>
                <td>{timeTable.monday[4]}</td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td>{timeTable.tuesday[0]}</td>
                <td>{timeTable.tuesday[1]}</td>
                <td>{timeTable.tuesday[2]}</td>
                <td>{timeTable.tuesday[3]}</td>
                <td>{timeTable.tuesday[4]}</td>
              </tr>
              <tr>
                <td>Wednesday</td>
                <td>{timeTable.wednesday[0]}</td>
                <td>{timeTable.wednesday[1]}</td>
                <td>{timeTable.wednesday[2]}</td>
                <td>{timeTable.wednesday[3]}</td>
                <td>{timeTable.wednesday[4]}</td>
              </tr>
              <tr>
                <td>Thursday</td>
                <td>{timeTable.thursday[0]}</td>
                <td>{timeTable.thursday[1]}</td>
                <td>{timeTable.thursday[2]}</td>
                <td>{timeTable.thursday[3]}</td>
                <td>{timeTable.thursday[4]}</td>
              </tr>
              <tr>
                <td>Friday</td>
                <td>{timeTable.friday[0]}</td>
                <td>{timeTable.friday[1]}</td>
                <td>{timeTable.friday[2]}</td>
                <td>{timeTable.friday[3]}</td>
                <td>{timeTable.friday[4]}</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>{timeTable.saturday[0]}</td>
                <td>{timeTable.saturday[1]}</td>
                <td>{timeTable.saturday[2]}</td>
                <td>{timeTable.saturday[3]}</td>
                <td>{timeTable.saturday[4]}</td>
              </tr>
            </tbody>
          </table>
        </section>
    </div> }
  {syllabus &&  <div>
      <section className="section">
        <h2>Syllabi</h2>
       <table className="table">
        <thead style={{backgroundColor:'grey'}}>
          <tr>
            <td>Subject</td>
            <td>Syllabus</td>
          </tr>
        </thead>
        <tbody>
         <tr>
          <td>Telugu</td>
          <td>{syllabus.telugu}</td>
         </tr>
         <tr>
          <td>Hindi</td>
          <td>{syllabus.hindi}</td>
         </tr>
         <tr>
          <td>English</td>
          <td>{syllabus.english}</td>
         </tr>
         <tr>
          <td>Mathematics</td>
          <td>{syllabus.mathematics}</td>
         </tr>
         <tr>
          <td>Science</td>
          <td>{syllabus.science}</td>
         </tr>
         <tr>
          <td>Social Studies</td>
          <td>{syllabus.social}</td>
         </tr>
        </tbody>
       </table>
      </section>
    </div> }
  </div>
  </Container>
</div>
  );
}

export default StudentAcademics;
