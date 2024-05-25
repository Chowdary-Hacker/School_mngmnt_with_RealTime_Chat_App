import './App.css';
import StudentEnrollment from './components/Student/StudentEnrollment';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import StudentLogin from './components/Student/StudentLogin';
import RoleSelection from './components/RoleSelection'; import ParentDashboard from './components/Parent/ParentDashboard';
import StudentDashboard from './components/Student/StudentDashboard'; import AdminAssistLogin from './components/Admin/AdminAssist/AdminAssistLogin'
import StudentAcademics from './components/Features/StudentAcademics'; import TeacherLogin from './components/Teacher/TeacherLogin'; import TeacherRegistration from './components/Teacher/TeacherRegistration';
import Mail from './components/Features/Mail'; import ParentLogin from './components/Parent/ParentLogin'; import ParentRegistration from './components/Parent/ParentRegistration';
import AdminLogin from './components/Admin/AdminLogin'; import AdminAssist from './components/Admin/AdminAssist/AdminAssist'; import AdminAssistReg from './components/Admin/AdminAssistReg';
import Admin from './components/Admin/Admin'; import AdminAssistStaffInfo from './components/Admin/AdminAssist/AdminAssistStaffInfo';
import FeeForm from './components/Features/FeeForm'; import ChatApp from './components/Features/ChatApp'; import TeacherDashboard from './components/Teacher/TeacherDashboard'; import Grading from './components/Features/Gradingmngmnt'; import AboutSchool from './components/Features/AboutSchool';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RoleSelection/>} />

    <Route path="/StudentLogin" element={<StudentLogin/>} />
    <Route path="/StudentEnrollment" element={<StudentEnrollment/>} />
    <Route path="/StudentAcademics" element={<StudentAcademics/>} />
    <Route path="/StudentDashboard" element={<StudentDashboard/>}/>

    <Route path="/AdminLogin" element={<AdminLogin/>} />
    <Route path="/Admin" element={<Admin/>} />
    <Route path="/AdminAssist" element={<AdminAssist/>} />
    <Route path="/AdminAssistLogin" element={<AdminAssistLogin/>} />
    <Route path="/AdminAssistReg" element={<AdminAssistReg/>} />
    <Route path="/AdminAssistStaffInfo" element={<AdminAssistStaffInfo/>} />
  
    <Route path="/ParentLogin" element={<ParentLogin/>} />
    <Route path="/ParentRegistration" element={<ParentRegistration/>} />
    <Route path="/ParentDashboard" element={<ParentDashboard/>} />

    <Route path="/TeacherLogin" element={<TeacherLogin/>} />
    <Route path="/TeacherRegistration" element={<TeacherRegistration/>} />
    <Route path="/TeacherDashboard" element={<TeacherDashboard/>}/>

    <Route path="/Mail" element={<Mail/>} />
    <Route path="/FeeForm" element={<FeeForm/>}/>
    <Route path="/ChatApp" element={<ChatApp/>}/>
    <Route path="/Grading" element={<Grading/>}/>
    <Route path="/AboutSchool" element={<AboutSchool/>}/>
      </Routes>
      </Router>
  );
}

export default App;
