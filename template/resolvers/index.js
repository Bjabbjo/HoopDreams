const basketballField = require("../schema/types/basketballField");
const pickupGame = require("../schema/types/pickupGame");
const player = require("../schema/types/player");

const db = require("../data/db");

module.exports = {
    Query: {
        allBasketballFields: () => db.BasketballFields.find({}),
        allPickupGames: () => db.PickupGames.find({}),
        allPlayers: () => db.Players.find({}),
        basketballField: (id) => db.BasketballFields.findById(id),
        pickupGame: (id) => db.PickupGames.findById(id),
        player: (id) => db.Players.findById(id)
    }
}