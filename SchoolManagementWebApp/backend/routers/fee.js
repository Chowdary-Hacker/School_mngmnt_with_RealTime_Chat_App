const express = require("express")
const feeModel = require("../models/fee");
const pdfkit = require('pdfkit');
const fs = require('fs'); const path = require('path');
const pdfDocument = new pdfkit;
const router = express.Router();


router.post("/basic",async (req,res)=>{
    let {admissionNumber, parentName, studentName, studentClass, paidAmount, totalAmount, paymentDetails} = req.body;
    try{  let exist = await feeModel.findOne({admissionNumber:admissionNumber});
    if(!exist){
    let {StudentClass, PaidAmount, TotalAmount} ={
        StudentClass: parseInt(studentClass),
        PaidAmount: parseInt(paidAmount),
        TotalAmount: parseInt(totalAmount)
      };
    
    let student = await feeModel({admissionNumber:admissionNumber, parentName:parentName, studentName:studentName, studentClass:StudentClass, paidAmount:PaidAmount, totalAmount:TotalAmount, paymentDetails:paymentDetails});
        student.save();
    res.status(222).json("Sucessfully added");}else{res.status(200).json("Alraedy exists")}} catch(e){res.status(200).json("Incorrect Format")}
});

router.get("/",async (req,res)=>{
  try{
  let studentsList = await  feeModel.find();
  res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

router.get("/:admissionNumber",async (req,res)=>{
    try{
    let admissionNumber = req.params.admissionNumber;
    let studentsList = await  feeModel.findOne({ admissionNumber:admissionNumber });
    res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

router.put("/setFromDate",async (req,res)=>{
  try{
      let admissionNumber = 'fromDate';
      let {date} = req.body;
      let studentsList = await  feeModel.findOneAndUpdate(
          { admissionNumber: admissionNumber }, 
          { fromDate:date}, 
          { new: true } 
        );
      res.status(222).json(studentsList);}catch(e){res.status(200).json("hlo")}
});

router.put("/:admissionNumber",async (req,res)=>{
    try{
        let admissionNumber = req.params.admissionNumber;
        let studentsList = await  feeModel.findOne(
            { admissionNumber: admissionNumber }
          );
          studentsList.studentClass = studentsList.studentClass+1;
          studentsList.totalAmount = studentsList.totalAmount+21000;
          await feeModel.findOneAndUpdate({admissionNumber:admissionNumber},
            {$set:studentsList}
          );
        res.status(222).json(studentsList);}catch(e){res.status(200).json()}
});

router.put("/paying/:admissionNumber", async (req, res) => {
    try {
        let admissionNumber = req.params.admissionNumber;
        let { payingAmount, date } = req.body;
        let { PayingAmount } = {
            PayingAmount: parseInt(payingAmount),
        };
        let shr = await feeModel.findOne({ admissionNumber: admissionNumber });
        const paidAmount = PayingAmount + shr.paidAmount;
        const totalAmount = shr.totalAmount;
        let studentsList = await feeModel.findOneAndUpdate(
            { admissionNumber: admissionNumber },
            {
                $set: { paidAmount: paidAmount },
                $push: { paymentDetails: { paidAmount: PayingAmount, date: date } }
            },
            { new: true }
        );
        const pending = totalAmount - studentsList.paidAmount;

        const directory = path.join(__dirname, '../reciepts', admissionNumber);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const filePath = path.join(directory, `${date.replace(/[-:/ ,.]/g, '')}.pdf`);
        const pdfDocument = new pdfkit();
        pdfDocument.pipe(fs.createWriteStream(filePath));
        pdfDocument.image('./backgroundimg.png', {
            align: 'center',
            valign: 'center'
        });
        pdfDocument.fontSize(24)
            .fillColor('black')
            .text('Fee receipt',{align:'center'})
            .text(`Student Name: ${studentsList.studentName}`)
            .text(`Admission Number: ${admissionNumber}`)
            .text(`Studying Class : ${studentsList.studentClass}`)
            .text(`Date of payment : ${date}`)
            .text(`Amount paid : ${payingAmount}`)
            .text(`Total fee : ${studentsList.totalAmount}`);
        pdfDocument.end();
        console.log(date);
        res.status(222).json(pending);
    } catch (e) {
        console.log(e);
        res.status(200).json();
    }
});

// Route to list receipts for a specific admission number
router.get("/receipts/:admissionNumber", (req, res) => {
  try {
    const admissionNumber = req.params.admissionNumber;
    const directoryPath = path.join('./reciepts', admissionNumber);
    
    // Read the contents of the directory
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      // Send the list of files as a JSON response
      res.json({ files });
    });
  } catch (error) {
    console.error("Error listing receipts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to download a specific receipt
router.get("/download/:admissionNumber/:fileName", (req, res) => {
  try {
    const admissionNumber = req.params.admissionNumber;
    const fileName = req.params.fileName;
    const filePath = path.join('./reciepts', admissionNumber, fileName);
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set appropriate headers for downloading a file
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      
      // Stream the file to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (error) {
    console.error("Error downloading receipt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router ;