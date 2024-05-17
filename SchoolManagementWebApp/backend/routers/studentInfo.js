const express = require("express")
const studentInfoModel = require("../models/studentInfo");
const jwt = require("jsonwebtoken")
const middleware = require('../middleware');
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/reg",async (req,res)=>{
   let {admissionNumber,classs, parentEmail, studentEmail, marks, name} = req.body;
    function parseIntegers(obj) {
        for (let key in obj) {
          if (typeof obj[key] === 'object') {
            obj[key] = parseIntegers(obj[key]);
          }
            obj[key] = parseInt(obj[key]);
          }
        return obj;
      }
      let {claas, mark} = {claas:parseInt(classs), mark:parseIntegers(marks)};
      
    try{
        const resultt = await studentInfoModel.findOne({ admissionNumber:admissionNumber });
        if (resultt) {res.status(211).json("Record has already exist, if you want to edit it, edit it after clicking fetchAll button and finding the appropriate record")}
        let add = studentInfoModel({admissionNumber:admissionNumber, class:claas, parentEmail:parentEmail, studentEmail:studentEmail, marks:mark, name:name});
       add.save();
        res.status(222).json();
        }
        catch(e){
            res.status(200).json("Incorrect format, try again..");
            console.log(e);
        }
});


router.get("/",async (req,res)=>{
    try{
    let studentsList = await  studentInfoModel.find();
    res.status(222).json(studentsList);} catch(e){res.status(200).json()}
});
router.get("/:admissionNumber",async (req,res)=>{
  try{ let admissionNumber = req.params.admissionNumber;
  let studentsList = await  studentInfoModel.findOne({admissionNumber:admissionNumber});
  res.status(222).json(studentsList);} catch(e){res.status(200).json()}
});

router.put("/:admissionNumber",async (req,res)=>{
    let {classs, parentEmail, studentEmail, marks, name} = req.body;
    let admissionNumber = req.params.admissionNumber;
   try{ function parseIntegers(obj) {
        for (let key in obj) {
          if (typeof obj[key] === 'object') {
            obj[key] = parseIntegers(obj[key]);
          }
            obj[key] = parseInt(obj[key]);
          }
        return obj;
      }
      let {claas, mark} = {claas:parseInt(classs), mark:parseIntegers(marks)};
    
    let student = await  studentInfoModel.findOneAndUpdate(
        { admissionNumber: admissionNumber }, 
        { class:claas, parentEmail:parentEmail, studentEmail:studentEmail, marks:mark, name:name },
        { new: true });
    res.status(222).json(student);}catch(e){res.status(200).json("Incorrect Format")}
});

router.put("/reset/:admissionNumber",async(req, res)=>{
  let admissionNumber = req.params.admissionNumber;
  try{
     let exist = await studentInfoModel.findOne({admissionNumber:admissionNumber});
     exist.class = exist.class+1;
     await studentInfoModel.findOneAndUpdate(
      {admissionNumber:admissionNumber},
      {$set: exist}
     ); res.status(222).json();
  }catch(e){console.log(e)}
})
/*
router.post("/",(req,res)=>{
    let {name,email,age} = req.body;
    let student =  studentModel({name,email,age});
    student.save();// insert the document the database
    res.json(student);
});

router.get("/",async (req,res)=>{
    let studentsList = await  studentModel.find();
    res.json(studentsList);
});

router.put("/:id",async (req,res)=>{
    let {name,email,age} = req.body;
    let id = req.params.id;
    let student = await  studentModel.findByIdAndUpdate(id,{name,age,email},{new:false});
    res.json(student);
});

router.delete("/:id",async (req,res)=>{
    let s = await  studentModel.findByIdAndDelete(req.params.id);
    if(s != null) res.json(s);
    else res.status(404).send("No such student found");
})
*/
module.exports = router