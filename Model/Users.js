const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name : {
        type : String,
        required : true,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    pwd : {
        type : String,
        required : true,
    },
    active : {
        type : Boolean,
        default : false
    },
    token : {
        type : String
    }
})

module.exports = mongoose.model("User", usersSchema, "emailVerifications" );