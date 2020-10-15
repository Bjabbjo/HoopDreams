const mongoose = require('mongoose');
const request = require('request');

const basketballFieldSchema = require("./schemas/basketballField");
const pickupGamesSchema = require("./schemas/pickupGame");
const playerSchema = require("./schemas/player");

const connection = mongoose.createConnection('mongodb+srv://BasicUser:VEFT_Pass@items.mnlf6.mongodb.net/HoopDreams', { 
        useNewUrlParser: true,
        useUnifiedTopology: true    
    });

//const BasketballFields = connection.model('BasketballFields', basketballFieldSchema, 'BasketballFields');
const PickupGames = connection.model('PickupGames', pickupGamesSchema, 'PickupGames');
const Players = connection.model('Players', playerSchema, 'Players');



const getAllBasketballFields = async() => {
    const result = await new Promise(function(res, rej) {
        request("https://basketball-fields.herokuapp.com/api/basketball-fields", function(error, response, body) {
            if(error) {return rej(error)}
            res(body)
        });
    })
    return JSON.parse(result)
}

const getBasketballFieldById = async id => {
    console.log(id);
    const result = await new Promise(function(res, rej) {
        request("https://basketball-fields.herokuapp.com/api/basketball-fields/" + id, function(error, response, body) {
            if(error) {return rej(error)}
            res(body)
        });
    })
    return JSON.parse(result)
}


module.exports = {
    connection,
    getAllBasketballFields,
    getBasketballFieldById,
    PickupGames,
    Players
}