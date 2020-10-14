const basketballField = require("../schema/types/basketballField");
const pickupGame = require("../schema/types/pickupGame");
const player = require("../schema/types/player");

const db = require("../data/db");

module.exports = {
    Query: {
        allBasketballFields: () => [],
        allPickupGames: () => [],
        allPlayers: () => db.Players,
        basketballField: () => ({}),
        pickupGame: () => ({}),
        player: () => ({})
    }
}