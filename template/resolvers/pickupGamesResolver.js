const db = require("../data/db");

module.exports = 
{
    queries: {
        allPickupGames: () => db.PickupGames.find({}),
        pickupGame: (parent, args) => db.PickupGames.findById(args.id),
    },

    mutations: {

    }
};