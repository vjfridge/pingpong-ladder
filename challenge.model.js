const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Challenge = new Schema({
    p1_id: {
        type: String
    },
    p2_id: {
        type: String
    },
    winner: {
        type: String
    }
});

module.exports = mongoose.model('Challenge', Challenge);