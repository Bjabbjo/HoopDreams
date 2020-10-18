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
            if (! await context.db.Players.exists(args.id) ) { return new Error("NOT FOUND"); }
            if (typeof(args.name) != "undefined") { 
                await context.db.Players.findOneAndUpdate({ _id: args.id }, { name: args.name }).exec();
            }
            if (typeof(args.playedGames) != "undefined") {
                await context.db.Players.findOneAndUpdate({ _id: args.id },{ playedGames: args.playedGames }).exec()
            }
            return await context.db.Players.findById(args.id);
        },

        removePlayer: async(parent, args, context) => {
            if (! await context.db.Players.exists({ _id: args.id })) { return new Error("NOT FOUND") }

            const player = await context.db.Players.findById(args.id);
            const games = player.playedGames;

            var hostInGames = [];
            for (g in games) {
                var tmp = await context.db.PickupGames.findById(games[g]);
                if (tmp.host == args.id) { hostInGames.push(tmp) }
                var regPlayers = tmp.registeredPlayers;
                regPlayers = regPlayers.filter(function(item){ return item != args.id });
                await context.db.PickupGames.updateOne({ _id: games[g] }, { registeredPlayers: regPlayers });
            }

            for (g in hostInGames) {
                var names = [];
                var game = hostInGames[g];
                
                for (p in game.registeredPlayers) {
                    if (game.registeredPlayers[p] != player._id)
                    {
                        const tmpPlayers = game.registeredPlayers;
                        const player = await context.db.Players.findById(tmpPlayers[p]);
                        pName = player.name;
                        pId = player._id;
                        names.push( { pName: pId } )
                    }
                }

                names.sort(function(a, b){
                    if (a.pName < b.pName)      { return -1 }
                    else if (a.pName > b.pName) {return 1}
                    return 0;
                });

                await context.db.PickupGames.updateOne({ _id: game._id }, { host: names[0].id })
            }

            await context.db.Players.findOneAndDelete({ _id: args.id }).exec();
            return true
        }
    }
}