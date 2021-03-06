require('dotenv').config()
const express = require('express');
const app = express();
const dbconnect = require('./dbconnect');
const Users = require('./Model/Users');
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const randomString = require('randomstring');

const port = process.env.PORT || 1234;

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("Views"));

let transporter = nodemailer.createTransport({
    host: 'mail.khalil.codes',
    port: 465,
    secure: true,
    auth: {
        user: "me@khalil.codes",
        pass: `${process.env.EMAIL_PASS}`
    }
});

app.post("/", (req,res)=> {

    req.checkBody("email", "email required").notEmpty();
    req.checkBody("password", "password required").notEmpty();
    req.checkBody("email", "invalid email").isEmail();

    const error = req.validationErrors();

    if (error) {
        res.json(error);
    } else {
        const token = randomString.generate();
        const user = new Users(req.body);
        user.token = token;
        user.save();

        transporter.sendMail({
            from: '"Khalil Ali" <me@khalil.codes>',
            to: req.body.email,
            subject: 'Verify your email please',
            text: 'Please verify your email',
            html: `<a href="https://khalill.herokuapp.com/verify/${user.token}">Click here to verify your email</a>`
        }).then((info)=>{
            console.log('Message sent: %s', info.messageId)
        }).catch(err => {console.log(err)});
    res.send("check email and console");
    }
})

app.get("/verify/:token", (req,res)=> {
    Users.findOneAndUpdate(
        {token : req.params.token},
        {$set : {active : true}},
        (error,user)=> {
            if (!user) {
                res.json(error);
            } else {
                res.send("successfully activated");
            }
        }
    )
})

app.listen(port, ()=> {
    console.log(`Server started at ${port}`);
})