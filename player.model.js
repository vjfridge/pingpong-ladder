const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Player = new Schema({
    name: {
        type: String
    },
    rank: {
        type: Number
    },
    points: {
        type: Number
    },
});

module.exports = mongoose.model('Player', Player);