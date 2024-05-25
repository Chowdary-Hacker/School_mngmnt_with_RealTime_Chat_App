import React, { useState } from 'react';
import '../../../App.css';
import axios from 'axios';

function AdminAssistStaffInfo() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentsFee, setStudentsFee] = useState([]);

  const [newTeacher, setNewTeacher] = useState({ email: '', name: '', classs: '', salary: '' });
  const [newStudent, setNewStudent] = useState({ admissionNumber: '', classs: '', parentEmail: '', studentEmail: '', name: '' });
  const [newStudentFee, setNewStudentFee] = useState({ admissionNumber: '', parentName: '', studentName: '', studentClass: '', paidAmount: '', totalAmount: '' });

  const [editTeacherIndex, setEditTeacherIndex] = useState(null);
  const [editStudentIndex, setEditStudentIndex] = useState(null);
  const [editStudentFeeIndex, setEditStudentFeeIndex] = useState(null);

  const [editTeacherValue, setEditTeacherValue] = useState({});
  const [editStudentValue, setEditStudentValue] = useState({});
  const [editStudentFeeValue, setEditStudentFeeValue] = useState({});

  const handleTeacherInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentFeeInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudentFee((prev) => ({ ...prev, [name]: value }));
  };

  const addTeacher = async () => {
    if (newTeacher.email && newTeacher.name && newTeacher.classs && newTeacher.salary) {
      await axios.post('http://localhost:3333/teacherInfo/reg', newTeacher)
        .then(res => {
          if (res.status === 222) {
            alert("Successfully added.. (:");
            fetchAll();
          } else {
            alert(res.data);
          }
        })
        .catch(e => console.log(e));
      setNewTeacher({ email: '', name: '', classs: '', salary: '' });
    }
  };

  const fetchAll = () => {
    axios.get('http://localhost:3333/teacherInfo')
      .then(res => setTeachers(res.data))
      .catch(e => console.log(e));
  };

  const fetchAllStudents = () => {
    axios.get('http://localhost:3333/studentInfo')
      .then(res => setStudents(res.data))
      .catch(e => console.log(e));
  };

  const fetchAllStudentsFee = () => {
    axios.get('http://localhost:3333/fee')
      .then(res => setStudentsFee(res.data))
      .catch(e => console.log(e));
  };

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
    if (editTeacherValue.email && editTeacherValue.name && editTeacherValue.classs && editTeacherValue.salary) {
      await axios.put('http://localhost:3333/teacherInfo/' + editTeacherValue.email, editTeacherValue)
        .then(res => {
          if (res.status === 222) {
            alert("Successfully edited..");
            fetchAll();
          } else {
            alert("Kindly check the JSON syntax and respective key structure.. (:")
          }
        })
        .catch(e => console.log(e));
      setEditTeacherIndex(null);
      setEditTeacherValue({});
    }
  };

  const addStudent = async () => {
    if (newStudent.admissionNumber && newStudent.classs && newStudent.parentEmail && newStudent.studentEmail && newStudent.name) {
      await axios.post('http://localhost:3333/studentInfo/reg', newStudent)
        .then(res => {
          if (res.status === 222) {
            alert("Successfully added.. (:");
            fetchAllStudents();
          } else {
            alert(res.data);
          }
        })
        .catch(e => console.log(e));
      setNewStudent({ admissionNumber: '', classs: '', parentEmail: '', studentEmail: '', name: '' });
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
    if (editStudentValue.admissionNumber && editStudentValue.classs && editStudentValue.parentEmail && editStudentValue.studentEmail && editStudentValue.name) {
      await axios.put('http://localhost:3333/studentInfo/' + editStudentValue.admissionNumber, editStudentValue)
        .then(res => {
          if (res.status === 222) {
            alert("Successfully edited..");
            fetchAllStudents();
          } else {
            alert("Kindly check the JSON syntax and respective key structure.. (:");
          }
        })
        .catch(e => console.log(e));
      setEditStudentIndex(null);
      setEditStudentValue({});
    }
  };

  const addStudentFee = async () => {
    if (newStudentFee.admissionNumber && newStudentFee.parentName && newStudentFee.studentName && newStudentFee.studentClass && newStudentFee.paidAmount && newStudentFee.totalAmount) {
      await axios.post('http://localhost:3333/fee/basic', newStudentFee)
        .then(res => {
          if (res.status === 222) {
            alert("Successfully added.. (:");
            fetchAllStudentsFee();
          } else {
            alert(res.data);
          }
        })
        .catch(e => console.log(e));
      setNewStudentFee({ admissionNumber: '', parentName: '', studentName: '', studentClass: '', paidAmount: '', totalAmount: '' });
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

  const updateFeeStudent = async () => {
    if (editStudentFeeValue.admissionNumber && editStudentFeeValue.parentName && editStudentFeeValue.studentName && editStudentFeeValue.studentClass && editStudentFeeValue.paidAmount && editStudentFeeValue.totalAmount) {
      await axios.put('http://localhost:3333/fee/' + editStudentFeeValue.admissionNumber, editStudentFeeValue)
        .then(res => {
          if (res.status === 222) {
            alert("Successfully edited..");
            fetchAllStudentsFee();
          } else {
            alert("Kindly check the JSON syntax and respective key structure.. (:");
          }
        })
        .catch(e => console.log(e));
      setEditStudentFeeIndex(null);
      setEditStudentFeeValue({});
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="section">
          <h2>Teachers</h2>
          <div className="input-group">
            <p>Enter teacher details:</p>
            <input
              type="text"
              name="email"
              value={newTeacher.email}
              onChange={handleTeacherInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="name"
              value={newTeacher.name}
              onChange={handleTeacherInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="classs"
              value={newTeacher.classs}
              onChange={handleTeacherInputChange}
              placeholder='Class '
            />
            <input
              type="text"
              name="salary"
              value={newTeacher.salary}
              onChange={handleTeacherInputChange}
              placeholder="Salary"
            />
            <button onClick={addTeacher}>Add Teacher</button>
            <button onClick={fetchAll}>Fetch All</button>
          </div>
          <ul>
            {teachers.map((teacher, index) => (
              <li key={index}>
                {editTeacherIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="email"
                      value={editTeacherValue.email}
                      onChange={(e) => setEditTeacherValue({ ...editTeacherValue, email: e.target.value })}
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      name="name"
                      value={editTeacherValue.name}
                      onChange={(e) => setEditTeacherValue({ ...editTeacherValue, name: e.target.value })}
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      name="classs"
                      value={editTeacherValue.classs}
                      onChange={(e) => setEditTeacherValue({ ...editTeacherValue, classs: e.target.value })}
                      placeholder='Class (e.g. [{"class":"intValue", "subject":["value",]},])'
                    />
                    <input
                      type="text"
                      name="salary"
                      value={editTeacherValue.salary}
                      onChange={(e) => setEditTeacherValue({ ...editTeacherValue, salary: e.target.value })}
                      placeholder="Salary"
                    />
                    <button onClick={updateTeacher}>Update</button>
                  </>
                ) : (
                  <>
                   <span>
        Mail: {teacher.email}<br/>
         Name: {teacher.name}<br/>
        
      </span>
                    <button onClick={() => editTeacher(index)}>Edit</button>
                    <button onClick={() => deleteTeacher(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Students</h2>
          <div className="input-group">
            <p>Enter student details:</p>
            <input
              type="text"
              name="admissionNumber"
              value={newStudent.admissionNumber}
              onChange={handleStudentInputChange}
              placeholder="Admission Number"
            />
            <input
              type="text"
              name="classs"
              value={newStudent.classs}
              onChange={handleStudentInputChange}
              placeholder='Class (e.g. {"class":"value"})'
            />
            <input
              type="text"
              name="parentEmail"
              value={newStudent.parentEmail}
              onChange={handleStudentInputChange}
              placeholder="Parent Email"
            />
            <input
              type="text"
              name="studentEmail"
              value={newStudent.studentEmail}
              onChange={handleStudentInputChange}
              placeholder="Student Email"
            />
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleStudentInputChange}
              placeholder="Name"
            />
            <button onClick={addStudent}>Add Student</button>
            <button onClick={fetchAllStudents}>Fetch All</button>
          </div>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {editStudentIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="admissionNumber"
                      value={editStudentValue.admissionNumber}
                      onChange={(e) => setEditStudentValue({ ...editStudentValue, admissionNumber: e.target.value })}
                      placeholder="Admission Number"
                    />
                    <input
                      type="text"
                      name="classs"
                      value={editStudentValue.classs}
                      onChange={(e) => setEditStudentValue({ ...editStudentValue, classs: e.target.value })}
                      placeholder='Class (e.g. {"class":"value"})'
                    />
                    <input
                      type="text"
                      name="parentEmail"
                      value={editStudentValue.parentEmail}
                      onChange={(e) => setEditStudentValue({ ...editStudentValue, parentEmail: e.target.value })}
                      placeholder="Parent Email"
                    />
                    <input
                      type="text"
                      name="studentEmail"
                      value={editStudentValue.studentEmail}
                      onChange={(e) => setEditStudentValue({ ...editStudentValue, studentEmail: e.target.value })}
                      placeholder="Student Email"
                    />
                    <input
                      type="text"
                      name="name"
                      value={editStudentValue.name}
                      onChange={(e) => setEditStudentValue({ ...editStudentValue, name: e.target.value })}
                      placeholder="Name"
                    />
                    <button onClick={updateStudent}>Update</button>
                  </>
                ) : (
                  <>
                    <span>{JSON.stringify(student)}</span>
                    <button onClick={() => editStudent(index)}>Edit</button>
                    <button onClick={() => deleteStudent(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Students Fee</h2>
          <div className="input-group">
            <p>Enter student fee details:</p>
            <input
              type="text"
              name="admissionNumber"
              value={newStudentFee.admissionNumber}
              onChange={handleStudentFeeInputChange}
              placeholder="Admission Number"
            />
            <input
              type="text"
              name="parentName"
              value={newStudentFee.parentName}
              onChange={handleStudentFeeInputChange}
              placeholder="Parent Name"
            />
            <input
              type="text"
              name="studentName"
              value={newStudentFee.studentName}
              onChange={handleStudentFeeInputChange}
              placeholder="Student Name"
            />
            <input
              type="text"
              name="studentClass"
              value={newStudentFee.studentClass}
              onChange={handleStudentFeeInputChange}
              placeholder='Class (e.g. {"class":"value"})'
            />
            <input
              type="text"
              name="paidAmount"
              value={newStudentFee.paidAmount}
              onChange={handleStudentFeeInputChange}
              placeholder="Paid Amount"
            />
            <input
              type="text"
              name="totalAmount"
              value={newStudentFee.totalAmount}
              onChange={handleStudentFeeInputChange}
              placeholder="Total Amount"
            />
            <button onClick={addStudentFee}>Add Student Fee</button>
            <button onClick={fetchAllStudentsFee}>Fetch All</button>
          </div>
          <ul>
            {studentsFee.map((fee, index) => (
              <li key={index}>
                {editStudentFeeIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="admissionNumber"
                      value={editStudentFeeValue.admissionNumber}
                      onChange={(e) => setEditStudentFeeValue({ ...editStudentFeeValue, admissionNumber: e.target.value })}
                      placeholder="Admission Number"
                    />
                    <input
                      type="text"
                      name="parentName"
                      value={editStudentFeeValue.parentName}
                      onChange={(e) => setEditStudentFeeValue({ ...editStudentFeeValue, parentName: e.target.value })}
                      placeholder="Parent Name"
                    />
                    <input
                      type="text"
                      name="studentName"
                      value={editStudentFeeValue.studentName}
                      onChange={(e) => setEditStudentFeeValue({ ...editStudentFeeValue, studentName: e.target.value })}
                      placeholder="Student Name"
                    />
                    <input
                      type="text"
                      name="studentClass"
                      value={editStudentFeeValue.studentClass}
                      onChange={(e) => setEditStudentFeeValue({ ...editStudentFeeValue, studentClass: e.target.value })}
                      placeholder='Class (e.g. {"class":"value"})'
                    />
                    <input
                      type="text"
                      name="paidAmount"
                      value={editStudentFeeValue.paidAmount}
                      onChange={(e) => setEditStudentFeeValue({ ...editStudentFeeValue, paidAmount: e.target.value })}
                      placeholder="Paid Amount"
                    />
                    <input
                      type="text"
                      name="totalAmount"
                      value={editStudentFeeValue.totalAmount}
                      onChange={(e) => setEditStudentFeeValue({ ...editStudentFeeValue, totalAmount: e.target.value })}
                      placeholder="Total Amount"
                    />
                    <button onClick={updateFeeStudent}>Update</button>
                  </>
                ) : (
                  <>
                    <span>
        Admission Number: {fee.admissionNumber}<br/>
        Parent Name: {fee.parentName}<br/>
        Student Name: {fee.studentName}<br/>
        Student Class: {fee.studentClass}<br/>
        Paid Amount: {fee.paidAmount}<br/>
        Total Amount: {fee.totalAmount}
      </span>
                    <button onClick={() => editStudentFee(index)}>Edit</button>
                    <button onClick={() => deleteStudentFee(index)}>Delete</button>
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