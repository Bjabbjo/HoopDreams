//const db = require("../data/db");

module.exports = 
{
    queries: {
        allPickupGames: (parent, args, context) => { return context.db.PickupGames.find({}) },
        pickupGame: (parent, args, context) => { return context.db.PickupGames.findById(args.id) }
    },

    mutations: {
        /*createPickupGame,
        removePickupGame,
        addPlayerToPickupGame,
        removePlayerFromPickupGame*/
    }
};