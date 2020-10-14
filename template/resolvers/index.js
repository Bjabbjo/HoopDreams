const basketballField = require("../schema/types/basketballField");
const pickupGame = require("../schema/types/pickupGame");
const player = require("../schema/types/player");

const db = require("../data/db");

module.exports = {
    Query: {
        allBasketballFields: () => db.BasketballFields.find({}),
        allPickupGames: () => db.PickupGames.find({}),
        allPlayers: () => db.Players.find({}),
        basketballField: () => ({}),
        pickupGame: () => ({}),
        player: () => ({})
    }
}