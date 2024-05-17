import React, { useState } from 'react';
import '../../../App.css';
import axios from 'axios';
function AdminAssistStaffInfo() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentsFee, setStudentsFee] = useState([]);
  const [newTeacher, setNewTeacher] = useState();
  const [newStudent, setNewStudent] = useState();
  const [newStudentFee, setNewStudentFee] = useState();
  const [editTeacherIndex, setEditTeacherIndex] = useState(null);
  const [editStudentIndex, setEditStudentIndex] = useState(null);
  const [editStudentFeeIndex, setEditStudentFeeIndex] = useState(null);
  const [editTeacherValue, setEditTeacherValue] = useState();
  const [editStudentValue, setEditStudentValue] = useState();
  const [editStudentFeeValue, setEditStudentFeeValue] = useState();

  const addTeacher = async () => {
    if (newTeacher.trim() !== '') {
     await axios.post('http://localhost:3333/teacherInfo/reg',JSON.parse(newTeacher)).then(res=>{if(res.status===222){alert("successfully added.. (:")}else {alert(res.data)}}).catch(e=>console.log(e));;
     // setTeachers([...teachers, newTeacher]);
      setNewTeacher('');
    }
  };

  const fetchAll = () => {
    axios.get('http://localhost:3333/teacherInfo').then(res=>setTeachers(res.data)).catch(e=>console.log(e));
  }

  const fetchAllStudents = () => {
    axios.get('http://localhost:3333/studentInfo').then(res=>setStudents(res.data)).catch(e=>console.log(e));
  }
  const fetchAllStudentsFee = () => {
    axios.get('http://localhost:3333/fee').then(res=>setStudentsFee(res.data)).catch(e=>console.log(e));
  }

  const deleteTeacher = (index) => {
    const updatedTeachers = [...teachers];
    updatedTeachers.splice(index, 1);
    setTeachers(updatedTeachers);
  };

  const editTeacher = (index) => {
    setEditTeacherIndex(index);
    setEditTeacherValue(teachers[index]);
  };

  const updateTeacher = async () => {
    if (editTeacherValue.trim() !== '') {
      //const updatedTeachers = [...teachers];
      //updatedTeachers[editTeacherIndex] = editTeacherValue;
      //setTeachers(updatedTeachers);
      //setEditTeacherIndex(null);
      await axios.put('http://localhost:3333/teacherInfo/'+editTeacherValue.email+'',JSON.parse(editTeacherValue)).then(res=>{if(res.status===222){alert("sucessfully edited..")}else{alert("Kindly Once check the json syntax and respective key structure.. (:")}}).catch()
      await fetchAll();
      setEditTeacherValue('');
    }
  };

  const addStudent = async () => {
    if (newStudent.trim() !== '') {
      await axios.post('http://localhost:3333/studentInfo/reg',JSON.parse(newStudent)).then(res=>{if(res.status===222){alert("successfully added.. (:")} else {alert(res.data)} }).catch(e=>console.log(e));
      setNewStudent('');
    }
  };

  const deleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const editStudent = (index) => {
    setEditStudentIndex(index);
    setEditStudentValue(students[index]);
  };

  const updateStudent = async () => {
    if (editStudentValue.trim() !== '') {
      await axios.put('http://localhost:3333/studentInfo/'+editStudentValue.admissionNumber+'',JSON.parse(editStudentValue)).then(res=>{if(res.status===222){alert("sucessfully edited..")}else{alert("Kindly Once check the json syntax and respective key structure.. (:")}}).catch()
      await fetchAllStudents();
      setEditStudentValue('');
    }
  };

  const addStudentFee = async () => {
    if (newStudentFee.trim() !== '') {
      await axios.post('http://localhost:3333/fee/basic',JSON.parse(newStudentFee)).then(res=>{if(res.status===222){alert("successfully added.. (:")}else {alert(res.data)}}).catch(e=>console.log(e));;
      setNewStudentFee('');
    }
  };

  const deleteStudentFee = (index) => {
    const updatedStudentsFee = [...studentsFee];
    updatedStudentsFee.splice(index, 1);
    setStudentsFee(updatedStudentsFee);
  };

  const editStudentFee = (index) => {
    setEditStudentFeeIndex(index);
    setEditStudentFeeValue(studentsFee[index]);
  };

  const updateFeeStudent = async () => { };
  {/*  if (editStudentFeeValue.trim() !== '') {
      await axios.put('http://localhost:3333/fee/'+editStudentValue.admissionNumber+'',JSON.parse(editStudentValue)).then(res=>{if(res.status===222){alert("sucessfully edited..")}else{alert("Kindly Once check the json syntax and respective key structure.. (:")}}).catch()
      await fetchAllStudents();
      setEditStudentValue('');
    }
  };*/}

 
  return (
    <div className="app">
      <div className="container">
        <div className="section">
          <h2>Teachers</h2>
          <div className="input-group">
          Enter teacher details in json/object format :
            <input
              type="text"
              value={newTeacher}
              onChange={(e) => { setNewTeacher(e.target.value)}}
              placeholder='{"email":"uniqueValue", "name":"value", "classs":[{"class":"intValue", "subject":["value",]},], "salary":"intValue"}'
              />
            <button onClick={addTeacher}>Add Teacher</button>
            <button onClick={fetchAll}>Fetch All</button> 
          </div>
          <ul>
            { Object.entries(teachers).map(([index, teacher]) => (
              <li key={index}>
                {editTeacherIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editTeacherValue}
                      placeholder='{"email":"uniqueValue", "name":"value", "classs":[{"class":"intValue", "subject":["value",]},], "salary":"intValue"}'
                      onChange={(e) => setEditTeacherValue(e.target.value)}
                    />
                    <button onClick={updateTeacher}>Update</button>
                  </>
                ) : (
                  <>
                    {JSON.stringify(teacher)}
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => editTeacher(index)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>"</button>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => deleteTeacher(index)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h2>Students</h2>
          Enter Students details in JSON/Object format to enroll in : 
          <div className="input-group">
            <input
              type="text"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
              placeholder='{"admissionNumber":"value", "classs":"intValue", "parentEmail":"value", "studentEmail":"value", "name":"val"}'
            />
            <button onClick={addStudent}>Add Student</button>
            <button onClick={fetchAllStudents}>Fetch All</button> 
          </div>
          <ul>
            {Object.entries(students).map(([index, student]) => (
              <li key={index}>
                {editStudentIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editStudentValue}
                      placeholder='{"admissionNumber":"value", "classs":"intValue", "parentEmail":"value", "studentEmail":"value"}'
                      onChange={(e) => setEditStudentValue(e.target.value)}
                    />
                    <button onClick={updateStudent}>Update</button>
                  </>
                ) : (
                  <>
                    {JSON.stringify(student)}
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => editStudent(index)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>"</button>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => deleteStudent(index)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h2>Students fee allotment Section</h2>
          Enter fee details in JSON/Object format to enroll in : 
          <div className="input-group">
            <input
              type="text"
              value={newStudentFee}
              onChange={(e) => setNewStudentFee(e.target.value)}
              placeholder='{"admissionNumber":"","parentName":"","studentName":"","studentClass":"int", "paidAmount":"int", "totalAmount":"int"}'
            />
            <button onClick={addStudentFee}>Add Student Fee</button>
            <button onClick={fetchAllStudentsFee}>Fetch All</button> 
          </div>
          <ul>
            {Object.entries(studentsFee).map(([index, student]) => (
              <li key={index}>
                {editStudentFeeIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editStudentFeeValue}
                      placeholder='{"admissionNumber":"value", "parentName":"String", "studentName":"String", "studentClass":"intValue", "paidAmount":"intValue", "totalAmount":"intValue"}'
                      onChange={(e) => setEditStudentFeeValue(e.target.value)}
                    />
                    <button onClick={updateFeeStudent}>Update</button>
                  </>
                ) : (
                  <>
                    {JSON.stringify(student)}
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => editStudentFee(index)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>"</button>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => deleteStudentFee(index)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminAssistStaffInfo;
