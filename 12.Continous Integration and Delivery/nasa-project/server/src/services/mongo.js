const mongoose = require('mongoose');

require('dotenv').config(); // This is in order to be able to run the test

const MONGO_URL = process.env.MONGO_URL;

// event listeners
mongoose.connection.once('open', ()=>{
    console.log('Mongo Connection ready!');
});
mongoose.connection.on('error', (err)=>{
    console.log(err);
});

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}