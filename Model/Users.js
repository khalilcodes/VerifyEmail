const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    pwd : {
        type : String
    },
    verified : {
        type : false
    }
})

module.exports = mongoose.model("User", usersSchema, "emailVerification" );