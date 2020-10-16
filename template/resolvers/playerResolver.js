const db = require("../data/db");

module.exports = {
    queries: {
        allPlayers: (parent, args, context) => { return context.db.Players.find({})},
        player: (parent, args, context) => context.db.Players.findById(args.id),
    },

    mutations: {

        createPlayer: (parent, args, context) => {
            const newPlayer = {
                name: args.input.name,
                playedGames: []
            }
            return context.db.Players.create(newPlayer)
        },

        updatePlayer: (parent, args, context) => {
            const changePlayer = {
                name: args.input.player,
                playedGames: args.input.playedGames
            }
            return context.db.Players.push(changePlayer)
        },

        removePlayer: (parent, args, context) => {
            context.db.PickupGames = context.db.PickupGames.filter(c => x.id != args.id);
            return true
        }
    }
}