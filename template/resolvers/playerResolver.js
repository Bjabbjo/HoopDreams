const db = require("../data/db");

module.exports = {
    queries: {
        allPlayers: () => db.Players.find({}),
        player: (parent, args, context) => db.Players.findById(args.id),
    },

    mutations: {

    }
}