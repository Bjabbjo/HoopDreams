const mongoose = require('mongoose');

const basketballFieldSchema = require("./schemas/basketballField");
const pickupGamesSchema = require("./schemas/pickupGame");
const playerSchema = require("./schemas/player");

const connection = mongoose.createConnection('mongodb+srv://BasicUser:VEFT_Pass@items.mnlf6.mongodb.net/HoopDreams', { 
        useNewUrlParser: true,
        useUnifiedTopology: true    
    });

const BasketballFields = connection.model('BasketballFields', basketballFieldSchema, 'BasketballFields');
const PickupGames = connection.model('PickupGames', pickupGamesSchema, 'PickupGames');
const Players = connection.model('Players', playerSchema, 'Players');

module.exports = {
    connection,
    BasketballFields,
    PickupGames,
    Players
}