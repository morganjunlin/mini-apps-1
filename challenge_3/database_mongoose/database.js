const mongoose = require('mongoose');

// set database connection link
let mongoDB = 'mongodb://localhost/challenge_3'
mongoose.connect(mongoDB, {useNewUrlParser: true});

// establish database connection
let db = mongoose.connection;
db.once('open', () => console.log('Database connected!'));
db.on('error', console.error.bind(console, 'connection error:'));
