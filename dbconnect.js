const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khalil:khalil@kb-jgdlm.gcp.mongodb.net/kb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        throw err;
    } else {
        console.log("Successfully connected to database");
    }
});