const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Challenge = new Schema({
    p1Name: {
        type: String
    },
    p2Name: {
        type: String
    },
    winner: {
        type: String
    }
});

module.exports = mongoose.model('Challenge', Challenge);