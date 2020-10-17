const mongoose = require('mongoose');

const pickupGamesSchema = require("./schemas/pickupGame");
const playerSchema = require("./schemas/player");

const connection = mongoose.createConnection('mongodb+srv://BasicUser:VEFT_Pass@items.kfw9r.mongodb.net/DreamHoop?retryWrites=true&w=majority', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

//const BasketballFields = connection.model('BasketballFields', basketballFieldSchema, 'BasketballFields');
const PickupGames = connection.model('PickupGames', pickupGamesSchema, 'PickupGames');
const Players = connection.model('Players', playerSchema, 'Players');

module.exports = {
    connection,
    PickupGames,
    Players
}