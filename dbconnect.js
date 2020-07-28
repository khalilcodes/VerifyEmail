require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_DB}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        throw err;
    } else {
        console.log("Successfully connected to database");
    }
});