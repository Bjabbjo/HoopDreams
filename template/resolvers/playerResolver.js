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

        updatePlayer: (parent, args, context) => {
            var player = context.db.Players.findById(args.id);
            if (args.name != player.name) {  context.db.Players.findOneAndUpdate({ _id: args.id }, { name: args.name })}
            if (args.playedGames != player.playedGames) { context.db.Players.findOneAndUpdate({ _id: args.id }, { playedGames: args.playedGames })}
            return context.db.Players.findById(args.id);
        },

        // removePlayer: (parent, args, context) => {
        //     context.db.PickupGames = context.db.PickupGames.filter(c => x.id != args.id);
        //     return true
        // }
    }
}