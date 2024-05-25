const express = require("express")
const teacherInfoModel = require("../models/teacherInfo");
const jwt = require("jsonwebtoken")
const middleware = require('../middleware');
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/reg",async (req,res)=>{
    let {email, name, classs, salary} = req.body;
       let {salaryy} = {salaryy:parseInt(salary)};
       
     try{
         const resultt = await teacherInfoModel.findOne({ email:email });
         if (resultt) {res.status(211).json("Already record has exist")}
         let add = teacherInfoModel({email:email, name:name, class:classs, salary:salaryy});
        add.save();
         res.status(222).json();
         }
         catch(e){
             res.status(200).json("Incorrect JSON fromat");
             console.log(e);
         }
 });
 
 
 router.get("/",async (req,res)=>{
     try{
     let studentsList = await  teacherInfoModel.find();
     res.status(222).json(studentsList);} catch(e){res.status(200).json()}
 });

 router.get("/:teacherMail",async (req,res)=>{
    try{
        let teacherMail = req.params.teacherMail ;
    let studentsList = await  teacherInfoModel.findOne({email:teacherMail});
    res.status(222).json(studentsList);} catch(e){res.status(200).json()}
});
 
 router.put("/:email",async (req,res)=>{
     let {name, classs, salary} = req.body;
     let email = req.params.email;
    try{   let {salaryy} = {salary:parseInt(salary)};
     
     let student = await  teacherInfoModel.findOneAndUpdate(
         { email:email }, 
         { name:name, class:classs, salary:salaryy },
         { new: true });
     res.status(222).json(student);} catch(e){res.status(200).json("Incorrect Format")}
 });
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