const Schema = require('mongoose').Schema;

module.exports = new Schema({
    name: {type: String, required: true},
    gamesPlayed: {type: Array, required: true}
},
{ versionKey: false });
