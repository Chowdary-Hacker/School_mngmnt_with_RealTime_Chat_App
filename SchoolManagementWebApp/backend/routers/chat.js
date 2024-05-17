const express = require("express")
const adminTeacherChatModel = require("../models/adminTeacherChat");
const adminStudentChatModel = require("../models/adminStudentChat");
const studentTeacherChatModel = require("../models/studentTeacherChat");
const adminParentChatModel = require("../models/adminParentChat");
const adminAdminChatModel = require("../models/adminAdminChat");
const teacherTeacherChatModel = require("../models/teacherTeacherChat");
const studentStudentChatModel = require("../models/studentStudentChat");

const router = express.Router();

router.post("/adminParentChat",async (req,res)=>{
    let {data, sender, reciever, parentName, childAdmissionNumber, date} = req.body;
      try{
    let student = await adminParentChatModel({data:data, sender:sender, reciever:reciever, parentName:parentName, childAdmissionNumber:childAdmissionNumber, date:date});
        student.save();
    res.status(222).json();}catch(e){res.status(200).json()}
});

router.get("/adminParentChat",async (req,res)=>{
    try{
    let studentsList = await  adminParentChatModel.find();
    res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});
//--------------------------------------------------------------------
router.post("/adminStudentChat",async (req,res)=>{
  let {data, sender, reciever, admissionNumber, studentName, date} = req.body;
    try{
  let student = await adminStudentChatModel({data:data, sender:sender, reciever:reciever, admissionNumber:admissionNumber, studentName:studentName, date:date});
      student.save();
  res.status(222).json();}catch(e){res.status(200).json()}
});

router.get("/adminStudentChat",async (req,res)=>{
  try{
  let studentsList = await  adminStudentChatModel.find();
  res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

//------------------------------------------------------------------------

router.post("/adminTeacherChat",async (req,res)=>{
  let {data, sender, reciever, teacherName, teacherMail, date} = req.body;
    try{
  let student = await adminTeacherChatModel({data:data, sender:sender, reciever:reciever, teacherName:teacherName, teacherMail:teacherMail, date:date});
      student.save();
  res.status(222).json();}catch(e){res.status(200).json()}
});

router.get("/adminTeacherChat",async (req,res)=>{
  try{
  let studentsList = await  adminTeacherChatModel.find();
  res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

//----------------------------------------------------------------------------

router.post("/adminAdminChat",async (req,res)=>{
  let {data, sender, reciever, adminAssistName, date} = req.body;
    try{
  let student = await adminAdminChatModel({data:data, sender:sender, reciever:reciever, adminAssistName:adminAssistName, date:date});
      student.save();
  res.status(222).json();}catch(e){res.status(200).json()}
});

router.get("/adminAdminChat",async (req,res)=>{
  try{
  let studentsList = await  adminAdminChatModel.find();
  res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

//---------------------------------------------------------------------------------

router.post("/studentTeacherChat",async (req,res)=>{
  let {data, sender, reciever, studentName,
    teacherName,
    teacherMail,
    studentAdmissionNumber, date} = req.body;
    try{
  let student = await studentTeacherChatModel({data:data, sender:sender, reciever:reciever, studentName:studentName,
    teacherName:teacherName,
    teacherMail:teacherMail,
    studentAdmissionNumber:studentAdmissionNumber, date:date});
      student.save();
  res.status(222).json();}catch(e){res.status(200).json()}
});

router.get("/studentTeacherChat",async (req,res)=>{
  try{
  let studentsList = await  studentTeacherChatModel.find();
  res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

router.post("/studentStudentChat",async (req,res)=>{
  let {data, sender, reciever, senderStudentName, receiverStudentName, receiverAdmissionNumber, date} = req.body;
    try{
  let student = await studentStudentChatModel({data:data, sender:sender, senderStudentName:senderStudentName, reciever:reciever, receiverStudentName:receiverStudentName, receiverAdmissionNumber:receiverAdmissionNumber, date:date});
      student.save();
  res.status(222).json(student);}catch(e){res.status(200).json()}
});

router.get("/studentStudentChat",async (req,res)=>{
  try{
  let studentsList = await  studentStudentChatModel.find();
  res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

router.post("/teacherTeacherChat",async (req,res)=>{
  let {data, sender, reciever, senderTeacherName, receiverTeacherName, receiverTeacherMail, date} = req.body;
    try{
  let student = await teacherTeacherChatModel({data:data, sender:sender, reciever:reciever, senderTeacherName:senderTeacherName, receiverTeacherName:receiverTeacherName, receiverTeacherMail:receiverTeacherMail, date:date});
      student.save();
  res.status(222).json();}catch(e){res.status(200).json()}
});

router.get("/teacherTeacherChat",async (req,res)=>{
  try{
  let studentsList = await  teacherTeacherChatModel.find();
  res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});
//----------------------------------------------------------------------------

/*
router.get("/:admissionNumber",async (req,res)=>{
    try{
    let admissionNumber = req.params.admissionNumber;
    let studentsList = await  feeModel.findOne({ admissionNumber:admissionNumber });
    res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

router.put("/:admissionNumber",async (req,res)=>{
    try{
        let admissionNumber = req.params.admissionNumber;
        let {parentName, studentName, studentClass, totalAmount} = req.body();
        let {StudentClass, TotalAmount} ={
            StudentClass: parseInt(studentClass),
            TotalAmount: parseInt(totalAmount)
          };
        let studentsList = await  feeModel.findOneAndUpdate(
            { admissionNumber: admissionNumber }, 
            { parentName:parentName, studentName:studentName, studentClass:StudentClass, totalAmount:TotalAmount }, 
            { new: true } 
          );
        res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});
*/
module.exports = router