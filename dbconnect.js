const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kb', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) console.log("something wrong with db");
    console.log("Successfully connected to database");
});