import { useNavigate, useLocation } from "react-router-dom";
import React, {useState, useEffect } from "react";
import {Bar, Pie} from "react-chartjs-2";
import axios from 'axios';
import {Chart, LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip, ArcElement } from "chart.js";
Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip, ArcElement);
function Admin(){
    const [impData, setImpData] = useState(); 
    const [date, setDate] = useState(); const [toDate, setToDate] = useState(new Date()); const [fee, setFee] = useState(); const [day_labels, setDayLabels] = useState(['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th','31st(Optional)','Total Amount']); const [month_labels, setMonthLabels] = useState({labels:['January','February','March','April','May','June','July','August','September','October','November','December'], datasets:[{label:"Fee Analytics Month wise", data:[1,2], backgroundColor:['red','blue','green','pink','grey','skin','yellow','orange','purple','indigo','lime','teal']}]});
    const nav = useNavigate(); const location = useLocation(); var sessionToken, userName;
    try{
    if(location.state.sessionToken!==null){sessionToken = location.state.sessionToken; userName = location.state.userName;}else{alert("Session expired kindly login again ! (:"); nav('/adminLogin')}
    } catch(e){}
    const [selectedMonth, setSelectedMonth] = useState(parseInt(new Date().toISOString().split('-')[1]));
    const [month, setMonth] = useState(month_labels.labels[selectedMonth-1]); const [day_data, setDayData] = useState({labels:day_labels, datasets:[{label:'Amount of fee collected day wise in the month of : 👇 ',data:[1,2,3,4,5,6,7,8,9,10,11,12,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], backgroundColor:'yellow'}]});
    const day_options={
        plugins:{legend:{position:'bottom'},title:{display:true, text:""}}
    };
    const handleLabelClick = (event, item) => {
      if (item.length > 0) {
        const label = month_labels.labels[item[0].index];
        setSelectedMonth(item[0].index+1); setMonth(label); console.log(label);
      }
    };
    const month_options={
        plugins:{legend:{position:'bottom'},title:{display:true, text:""}}
    };
    useEffect(()=>{
        axios.get("http://localhost:3333/adminLogin/admin",{headers:{'x-token':sessionToken}}).then(res=>{if(res.status!==222){alert('authentication failed try again later (: ');nav('/adminLogin');}}).catch((e)=>{console.log(e);});
  },[sessionToken]);
  useEffect(()=>{
    axios.get("http://localhost:3333/fee").then(res=>{if(res.status!==222){alert('financial reports not loaded login after some time (: ');nav('/adminLogin');}else{ setFee(()=>res.data)}}).catch((e)=>{console.log(e);});
},[]);

function setDataaa(fee) {
  let arr = [[],[],[],[],[],[],[],[],[],[],[],[]];
    let currentDate = fee[0].fromDate ; let partsbe = currentDate.split(/[\/\s,:]+/); 
  //let currentDate = new Date("2024-01-01"); 
  if(fee!==undefined && fee.length>0){
       for(let i in fee){
       for(let j in fee[i].paymentDetails){ 
            let parts = fee[i].paymentDetails[j].date.split(/[\/\s,:]+/);
                if(parseInt(parts[2])<parseInt(partsbe[2])?false:(parseInt(parts[2])>parseInt(partsbe[2])?true:(parseInt(parts[1])<parseInt(parts[1])?false:(parseInt(parts[1])>parseInt(parts[1])?true:(parseInt(parts[0])<parseInt(parts[0])?false:true)))))
               {let obj=fee[i].paymentDetails[j]; 
              let date = parseInt(parts[0]); let month = parseInt(parts[1]); let year = parseInt(parts[2]); 
               arr[month-1][date-1] = (arr[month-1][date-1]===undefined?parseInt(obj.paidAmount):arr[month-1][date-1]+parseInt(obj.paidAmount)); (arr[month-1][31]===undefined ? arr[month-1][31]=obj.paidAmount : arr[month-1][31] += obj.paidAmount)}
       }
       }; console.log("arr - ",arr);
       setImpData(arr); } else{console.log("else stmnt");}
}

useEffect(()=>{
   if(fee){setDate(fee[0].fromDate);
  //setDate(new Date("2024-01-01")); 
 setDataaa(fee);}
},[fee])

useEffect( ()=>{
    if(impData!==undefined){ console.log("no need"+JSON.stringify(impData))
    setMonthLabels(prevData => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0], 
        data: [1,2,3,impData[3][31],impData[4][31],impData[5][31],impData[6][31],impData[7][31],impData[8][31],impData[9][31],impData[10][31],impData[11][31]],
        ...prevData.datasets[2]
      }]
    })); }
  },[impData])

  const promote = () =>{
    const userConfirmed = window.confirm("Are you sure that you want to reset the details and promote the passed students to the next class and start the new academic year ?");
    if (userConfirmed) {
      axios.post("http://localhost:3333/marks/batch").then(res=>{if(res.status===222){alert("successfully reset")}});    
    } else {
      alert('You clicked Cancel');
    }
  }

useEffect(()=>{
    if(impData!==undefined){console.log("imp"+JSON.stringify(impData))
    setDayData(prevData => ({
        ...prevData,
        datasets: [{
          ...prevData.datasets[0],
         // data: [1,2,3,4,5,6,7,8,9,10,11,11,13,14,12,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11], 
          data: impData[selectedMonth-1],
          //data: impData[0],
          ...prevData.datasets[2]
        }]
      }));}
},[impData, selectedMonth])

const setFromDate = (async ()=>{
 await axios.put("http://localhost:3333/fee/setFromDate",{date:new Date().toLocaleString()}).then(res=>{if(res.status===222){setDate(new Date().toLocaleString())}})
})

   return(
    <div className="app">
        {sessionToken? (<>Welcome {userName} (:</>) : <p></p>}
        <div><h3>KEEP RESET the graph FOR EVERY NEW FINANCIAL/ACADEMIC YEAR and THIS ANALYTICS SHOWING FROM {date && date}</h3>     
             <Bar options={day_options} data={day_data}/> {month}
        </div>

        <div> <Pie data={month_labels} height="512px" width="512px" options={{ maintainAspectRatio: false, month_options, onClick: handleLabelClick }} /> </div>

        <div><button onClick={()=>{let sh = window.confirm("This action wont delete the previous data but doesn't show you anymore.."); if(sh){setFromDate()}}}>Reset the fee analytics starting from now</button><br></br><button onClick={promote}>Promote all passed students (:</button><br></br><button onClick={()=>nav('/AdminAssistReg', {state:{sessionToken:sessionToken}})}>Create Admin assistant </button><br></br><button onClick={()=>{nav("/AdminLogin")}}>Logout</button></div>
    </div>
        );}
   
export default Admin;