import React, { useEffect, useState } from 'react';
import { useLocation} from 'react-router-dom'; import axios from 'axios'; import { useNavigate } from 'react-router-dom';
function Grading() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [teacherMail, setTeacherMail] = useState(); const [data, setData] = useState(); const [selectedClass, setSelectedClass] = useState(); const [selectedSubject, setSelectedSubject] = useState(); const [studentInfo, setStudentInfo] = useState(); const [selectedMain, setSelectedMain] = useState(); const [marks, setMarks] = useState({}); const [maximumMark, setMaximumMark] = useState(); const [batch, setBatch] = useState();
  const location = useLocation(); const nav = useNavigate();
  useEffect(()=>{
    try{
      setTeacherMail(location.state.teacherMail);
      axios.get("http://localhost:3333/studentInfo").then(res=>{setStudentInfo(res.data)}).catch((e)=>{console.log(e)})
    }catch{}
  },[])
  useEffect(()=>{
    try{
        axios.get("http://localhost:3333/teacherInfo/"+teacherMail).then(res=>{setData(res.data); console.log("14",res.data)}).catch(e=>{console.log(e)});
        axios.get("http://localhost:3333/marks/batch").then(res=>{setBatch(res.data[0].batch)}).catch(e=>console.log(e));
    }catch{}
  },[teacherMail])

  const handleMarksChange = (admissionNumber, name, mark) => {
    setMarks(prevMarks => {
      var updated = {...prevMarks};
      updated[selectedOption] = {
        ...(prevMarks[selectedOption] || {}),
        [selectedSubject]: [
         ...(prevMarks[selectedOption]?.[selectedSubject] || []), ]
    }
    let index = updated[selectedOption][selectedSubject].findIndex(student => student.admissionNumber === admissionNumber);
    if(index >= 0){
     updated[selectedOption][selectedSubject][index] = {admissionNumber:admissionNumber, studentName:name, MaximumMark:maximumMark, marks:mark};
    } else{updated[selectedOption][selectedSubject].push({admissionNumber:admissionNumber, studentName:name, MaximumMark:maximumMark, marks:mark});
  }
    return updated;
  });console.log(marks)}

  const handleSubmit = () => {
    axios.post("http://localhost:3333/marks",{batch:batch+selectedMain.class ,clss:selectedMain.class, examType:selectedOption, subject:selectedSubject, marks:marks[selectedOption][selectedSubject]}).then(res => {alert(res.data)}).catch(e=>console.log(e));                   
  }

  const handleMemberClick = (arr, obj) => {
    setSelectedClass(arr); setSelectedMain(obj);
  };
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>   <span style={{color: 'red', textAlign:'center'}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮  {data && data.name}, 𝓽𝓸 𝓪𝓼𝓼𝓲𝓰𝓷 𝓶𝓪𝓻𝓴𝓼 (:</span>
    <div style={{display:'flex'}}><div style={{textAlign:'center', width:'80%'}}>
      <label>Select an exam type to enter marks for students : </label>
      <select onChange={handleChange}>
        <option value="">Select</option>
        <option value="fa1">fa1</option>
        <option value="fa2">fa2</option>
        <option value="fa3">fa3</option>
        <option value="fa4">fa4</option>
      </select>
    </div> <div style={{alignSelf:'center'}}><button onClick={()=>{nav('/TeacherLogin')}}>Logout</button></div> </div>
    𝓢𝓮𝓵𝓮𝓬𝓽 𝓽𝓱𝓮 𝓬𝓵𝓪𝓼𝓼 : {selectedMain && selectedMain.class+"    𝓪𝓷𝓭 𝓼𝓾𝓫𝓳𝓮𝓬𝓽 : "+selectedSubject} 
    <div style={{display:'flex'}}>
<div> 
        {selectedOption && data && ( 
data.class.map(obj =>(
<div>
    <button onClick={()=>handleMemberClick(obj.subject, obj)}>{obj.class}</button>
    </div>
))
)}
</div> 

<div>
    {selectedClass && (
        selectedClass.map(str =>(<div><button onClick={()=>setSelectedSubject(str)}>
        {str} </button></div>))
        )}
</div>

<div>
  {selectedSubject && 
<table>
        <thead>
          <tr>
            <th>Admission Number</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Maximum Mark for this subject : <input type="number"  onChange={e => setMaximumMark(e.target.value)} />
</th>
          </tr>
        </thead>
        <tbody>
          {selectedSubject && studentInfo.map(student => ( parseInt(student.class)===parseInt(selectedMain.class) &&
            <tr key={student.admissionNumber}>
              <td>{student.admissionNumber}</td>
              <td>{student.name}</td>
              <td>
                <input 
                  type="number" 
                  onChange={e => {handleMarksChange(student.admissionNumber, student.name, e.target.value)}} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> }
</div>
    </div>
    <div style={{textAlign:'center'}} onClick={handleSubmit}>{selectedSubject && <button>Submit Marks</button>}</div>
</div>
  );
}

export default Grading;
