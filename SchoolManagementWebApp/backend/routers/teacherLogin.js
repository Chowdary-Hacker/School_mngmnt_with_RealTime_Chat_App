const express = require("express")
const teacherLoginModel = require("../models/teacherLogin");
const jwt = require("jsonwebtoken")
const middleware = require('../middleware');
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req,res)=>{
    const { userName, password } = req.body;
    try {
        const result = await teacherLoginModel.findOne({ userName:userName });
        if (result) {
            const matched = await bcrypt.compare(password, result.password);
            let payload = {user:{id : result.id}}
            if (matched) {
                jwt.sign(payload,"jwtSecret",{expiresIn:1800000},(err,token)=>{
                    if(err){res.status(200).json();}else{return res.status(222).json(token)}
                })
            } else {
                res.status(200).json("Incorrect Credentials..");
            }
        } else {
            console.log('No document found');
            res.status(200).json("o document found");
        }
    } catch (error) {
        console.error(error);
        res.status(200).json();
    }
});

router.post("/reg",async (req,res)=>{
   let {userName,password} = req.body;
    try{
        const resultt = await teacherLoginModel.findOne({ userName:userName });
        if (resultt) {res.status(211).json("Record has already been exists")}
        let encr = await bcrypt.hash(password,10);
        let add = teacherLoginModel({userName:userName, password:encr});
       add.save();
        res.status(222).json();
        }
        catch(e){
            res.status(200).json("Something went wrong..");
            console.log(e);
        }
});

router.get("/teacherDashboard", middleware, async (req,res)=>{
    try{
        let exist = await teacherLoginModel.findById(req.user.id);
        if(!exist){return res.status(200).json()} res.status(222).json();
   }
   catch(e){
       console.log(e); return res.status(200).json();
   }});
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