const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to database'))
        .catch(error => console.log('Connection failed', error))
}

module.exports = connectToDB;