
module.exports = {
    queries: {
        allPlayers: (parent, args, context) => { return context.db.Players.find({})},
        player: (parent, args, context) => { 
            const player = context.db.Players.find(x => x.id == args.id)
            console.log(player);
            if (typeof(player.playedGames === undefined)) { player.playedGames = []; }
            return player
        },
    },

    mutations: {
        createPlayer: (parent, args, context) => {
            //const id = args.input.name.toLowerCase().replace(' ','-');
            //const playedGames = [];
            const newPlayer = {
                name: args.input.name,
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