const basketballFieldStatus = require('../../schema/enums/basketballFieldStatus');
const basketballField = require('../../schema/types/basketballField');

const Schema = require('mongoose').Schema;

module.exports = new Schema({
    name: {type: String, required: true},
    capacity : {type: Number, required: true},
    yearOfCreation: {type: Date, required: true},
    pickupGames: {type: Array, required: true},
    status: {type: String, required: true}
});
