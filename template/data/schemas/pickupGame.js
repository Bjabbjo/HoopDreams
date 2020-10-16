const Schema = require('mongoose').Schema;

module.exports = new Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    location: {type: String, required: true},
    registeredPlayers: {type: Array, default: [ ], required: true},
    host: {type: String, required: true}
},
{ versionKey: false });
