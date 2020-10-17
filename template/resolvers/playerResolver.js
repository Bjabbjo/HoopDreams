const player = require("../schema/types/player");

module.exports = {
    Player: {
        playedGames: (parent, args, context) => {
            var games = [];
            for (i in parent.playedGames) {
                var thing = context.db.PickupGames.findById(parent.playedGames[i]);
                games.push(thing);
            }
            return games;
        }
    },

    queries: {
        allPlayers: (parent, args, context) => {return context.db.Players.find({})},
        player: (parent, args, context) => { return context.db.Players.findById(args.id); },
    },

    mutations: {
        createPlayer: (parent, args, context) => {
            var newPlayer = {
                name: args.input.name,
                playedGames: [ ]
            };
            return context.db.Players.create(newPlayer);
            
        },

        updatePlayer: async(parent, args, context) => {
            var player = await context.db.Players.findById(args.id);
            if (args.name != player.name) { context.db.Players.update({ _id: args.id }, { $set: { name: args.name }})}
            if (args.playedGames != player.playedGames) { context.db.Players.update({ _id: args.id }, { $set: { playedGames: args.playedGames }})}
            return await context.db.Players.findById(args.id);
        },

        removePlayer: async(parent, args, context) => {
            await context.db.PickupGames.delete_one({ _id: args.id });
            return true
        }
    }
}