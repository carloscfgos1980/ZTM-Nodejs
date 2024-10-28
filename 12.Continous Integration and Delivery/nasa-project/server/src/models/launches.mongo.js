const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber:{
        type: Number,
        required: true
    },
    launchDate:{
        type: Date,
        required: true
    },
    mission:{
        type: String,
        required: true
    },
    rocket:{
        type: String,
        required: true
    },
    target:{
        type: String,
    },
    customers:[String],
    upcoming:{
        type:Boolean,
        requited: true
    },
    success:{
        type:Boolean,
        requited: true,
        default: true
    }
});

// Model connects launches schema with launches collections
module.exports = mongoose.model('Launch', launchesSchema);