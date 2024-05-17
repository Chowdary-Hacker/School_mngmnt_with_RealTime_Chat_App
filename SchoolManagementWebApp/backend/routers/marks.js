const express = require("express")
const marksModel = require("../models/marks");
const timeTableModel = require("../models/timeTable");
const syllabusModel = require("../models/syllabus.js");
const batchModel = require("../models/batch.js"); 
const e = require("cors");
const router = express.Router();

router.post("/batch", async(req, res)=>{
try{
     let exist = await batchModel.find();
     if(exist.length>0){ let shr = await batchModel.findOneAndUpdate(
      {batch:exist.batch},
      {batch:(parseInt(exist.batch)+1).toString},
      { new: true }
           )  ; res.status(222).json(exist);
      }
      else{let add = batchModel({batch:"1"}); await add.save(); res.status(222).json(add);}  
}catch(e){console.log(e); res.status(200).json(e)}
})

router.get("/batch", async(req, res)=>{
  try{let exist = await batchModel.find();
     if(exist){res.status(222).json(exist)}else{res.status(200).json()}
  } catch(e){console.log(e); res.status(200).json()}
})

 router.post("/", async (req,res)=>{
     try{
        let {clss, marks, examType, subject, batch} = req.body;
        classs = parseInt(clss)
     let studentsList = await  marksModel.findOne({batch:batch});
     if(studentsList)
        {
            try{ 
            if(studentsList[examType][subject]===undefined || studentsList[examType][subject]===null || studentsList[examType][subject].length<1)
                { 
                  studentsList[examType][subject] = marks;
                  let uut = await marksModel.findOneAndUpdate(
        { class:classs }, 
        { $set: studentsList},
        { new: true }) ; console.log(uut)} 
        else{res.status(222).json("Marks has already been alloted if you want to edit it, you require admin approval to edit !!")}}catch(e){let uut = await marksModel.findOneAndUpdate(
            { class:classs }, 
            {$set: studentsList},
            { new: true }) ;console.log(e) }  }
     else{let add = await marksModel({class:classs, batch:batch, [examType]:{[subject]:marks}}); add.save(); res.status(222).json("sucessfully added (:");}
     res.status(222).json("successfully added (:");} catch(e){console.log(e); res.status(200).json()}
 });

router.get("/:batch",async(req, res)=>{
  let batch = req.params.batch;
 try{
   let ret = await marksModel.findOne({batch:batch});
   res.status(222).json(ret);
 }catch(e){res.status(222).json(e)}
});

router.post("/timeTable", async(req, res)=>{
let {clss, monday, tuesday, wednesday, thursday, friday, saturday} = req.body;
try{
  let classs = parseInt(clss);
let exist = await  timeTableModel.findOne({class:classs});
if(exist){
  let s = await  timeTableModel.findOneAndDelete({class:classs});
}
let add = await timeTableModel({class:classs, monday:monday, tuesday:tuesday, wednesday:wednesday, thursday:thursday, friday:friday, saturday:saturday});
add.save();
res.status(222).json();
}
catch(e){
  res.status(200).json(console.log(e));
}
});

router.get("/timeTable/:clss", async(req, res)=>{
let clss = req.params.clss;
try{
  let classs = parseInt(clss);
let ret = await timeTableModel.findOne({class:classs})
res.status(222).json(ret);
}catch(e){res.status(200).json(e)}
})

router.post("/syllabus", async(req, res)=>{
  let {clss, telugu, hindi, english, mathematics, science, social} = req.body;
  try{
    let classs = parseInt(clss);
    let exist = await  syllabusModel.findOne({class:classs});
    if(exist){
      let s = await  syllabusModel.findOneAndDelete({class:classs});
    }
    let add = await syllabusModel({class:classs, telugu:telugu, hindi:hindi, english:english, mathematics:mathematics, science:science, social:social});
    add.save();
    res.status(222).json();
  }
  catch(e){
    res.status(200).json(console.log(e));
  }
});

router.get("/syllabus/:clss", async(req, res)=>{
    let clss = req.params.clss;
    try{
      let classs = parseInt(clss);
      let ret = await syllabusModel.findOne({class:classs})
      res.status(222).json(ret);
    }
    catch(e){res.status(200).json(e)}
})
 module.exports = router