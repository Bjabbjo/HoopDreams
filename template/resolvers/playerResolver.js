const db = require("../data/db");

module.exports = {
    queries: {
        allPlayers: (parent, args, context) => { return context.db.Players.find({})},
        player: (parent, args, context) => context.db.Players.findById(args.id),
    },

    mutations: {
        /*createPlayer,
        updatePlayer,
        removePlayer*/
    }
}