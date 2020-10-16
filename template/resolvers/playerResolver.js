const { concatenateTypeDefs } = require("apollo-server");
const { Players } = require("../data/db");
const { match } = require("../schema");

module.exports = {
    Player: {
        playedGames: (parent, arguments, context) => {
            const games = [];
            console.log(parent);
            console.log(context.db.Players);
            for (match in parent.playedGames) {
                const obj = context.db.pickupGames.findById(match);
                games.push(obj);
            }
            return games;
        }
    },

    queries: {
        allPlayers: (parent, args, context) => { return context.db.Players.find({})},
        player: (parent, args, context) => { 
            const player = context.db.Players.findById(args.id);
            return player
        },
    },

    mutations: {
        createPlayer: (parent, args, context) => {
            const newPlayer = {
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