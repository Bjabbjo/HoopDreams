const db = require("../data/db");

module.exports = 
{
    queries: {
        allPickupGames: () => db.PickupGames.find({}),
        pickupGame: (id) => db.PickupGames.findById(id),
    }
};