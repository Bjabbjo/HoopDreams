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
            if (typeof(args.name) != "undefined") { 
                await context.db.Players.findOneAndUpdate({ _id: args.id }, { name: args.name }).exec();
            }
            if (typeof(args.playedGames) != "undefined") {
                await context.db.Players.findOneAndUpdate({ _id: args.id },{ playedGames: args.playedGames }).exec()
            }
            return await context.db.Players.findById(args.id);
        },

        removePlayer: async(parent, args, context) => {
            await context.db.Players.findOneAndDelete({ _id: args.id }).exec();
            return true
        }
    }
}