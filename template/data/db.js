const mongoose = require('mongoose');

const basketballFieldSchema = require("./schemas/basketballField");
const pickupGamesSchema = require("./schemas/pickupGame");
const playerSchema = require("./schemas/player");

const connection = mongoose.createConnection('mongodb+srv://BasicUser:VEFT_Pass@items.mnlf6.mongodb.net/HoopDreams', { 
        useNewUrlParser: true,
        useUnifiedTopology: true    
    });

const basketballFields = connection.model('BasketballFields', basketballFieldSchema, 'BasketballFields');
const pickupGames = connection.model('pickupGames', pickupGamesSchema, 'pickupGames');
const Players = connection.model('Players', playerSchema, 'Players');

console.log(Players.toString());

module.exports = {
    connection,
    basketballFields,
    pickupGames,
    Players
}