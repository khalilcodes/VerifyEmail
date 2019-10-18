const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbconnect = require('./dbconnect');
const Users = require('./Model/Users');
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

const port = process.env.PORT || 1234;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", express.static("Views"));

app.post("/", (req,res)=> {
    let transporter = nodemailer.createTransport({
        host: 'mail.khalil.codes',
        port: 465,
        secure: true,
        auth: {
            user: "me@khalil.codes",
            pass: "khalilali123"
        }
    });
    transporter.sendMail({
        from: '"Khalil Ali" <me@khalil.codes>',
        to: `${req.body.email}`,
        subject: 'Test Mail ✔',
        text: '',
        html: `${req.body.password}`
    }).then((info)=>{
        console.log('Message sent: %s', info.messageId);
        res.send({"status" : "successfully sent mail"});
    })
})

app.listen(port, ()=> {
    console.log(`Server started at ${port}`);
})