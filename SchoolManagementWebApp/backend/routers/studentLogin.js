const express = require("express")
const studentLoginModel = require("../models/studentLogin");
const jwt = require("jsonwebtoken")
const middleware = require('../middleware');
const bcrypt = require("bcrypt");
const router = express.Router();
router.post("/", async (req,res)=>{
    const { admissionNumber, password } = req.body;
    try {
        const result = await studentLoginModel.findOne({ admissionNumber:admissionNumber });
        if (result) {
            const matched = await bcrypt.compare(password, result.password);
            let payload = {user:{id : result.id}}
            if (matched) {
                jwt.sign(payload,"jwtSecret",{expiresIn:1800000},(err,token)=>{
                    if(err){res.status(200).json();}else{return res.status(222).json(token)}
                })
            } else {
                res.status(200).json("Incorrect credentials");
            }
        } else {
            console.log('No document found');
            res.status(200).json("No document found");
        }
    } catch (error) {
        console.error(error);
        res.status(200).json();
    }
});

router.post("/reg",async (req,res)=>{
   let {admissionNumber,password} = req.body;
    try{
        const resultt = await studentLoginModel.findOne({ admissionNumber:admissionNumber });
        if (resultt) {res.status(211).json("Record has already exists")}
        let encr = await bcrypt.hash(password,10);
        let add = studentLoginModel({admissionNumber:admissionNumber, password:encr});
       add.save();
        res.status(222).json("Sucessfully registered");
        }
        catch(e){
            res.status(200).json("something went wrong..");
            console.log(e);
        }
});

router.get("/studentDashboard", middleware, async (req,res)=>{
    console.log("calling..")
    try{
        let exist = await studentLoginModel.findById(req.user.id);
        if(!exist){return res.status(200).json("not exist")} res.status(222).json(exist);
   }
   catch(e){
       console.log("dekho"+e); return res.status(200).json("some error");
   }
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