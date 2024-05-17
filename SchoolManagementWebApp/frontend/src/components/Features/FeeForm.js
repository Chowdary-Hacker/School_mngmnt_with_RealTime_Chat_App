import React, { useState, useEffect } from 'react';
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
