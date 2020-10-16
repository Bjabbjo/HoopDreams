
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
        player: (parent, args, context) => { 
            var player = context.db.Players.findById(args.id);
            return player
        },
    },

    mutations: {
        createPlayer: (parent, args, context) => {
            var newPlayer = {
                name: args.input.name,
                playedGames: [ ]
            };
            return context.db.Players.create(newPlayer);
            
        }

        // updatePlayer: (parent, args, context) => {
        //     const changePlayer = {
        //         name = args.input.player,
        //         playedGames = args.input.playedGames
        //     }
        //     return context.db.Players.push(changePlayer)
        // },

        // removePlayer: (parent, args, context) => {
        //     context.db.PickupGames = context.db.PickupGames.filter(c => x.id != args.id);
        //     return true
        // }
    }
}