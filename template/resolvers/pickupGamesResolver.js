const moment = require("moment");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = 
{
    PickupGame: {
        location: (parent, args, context) => {
            const id = parent.location;
            return context.fieldServices.getBasketballFieldById(id);
        },
        registeredPlayers: (parent, args, context) => {
            var p = [];
            for (i in parent.registeredPlayers) {
                var thing = context.db.Players.findById(parent.registeredPlayers[i]);
                p.push(thing);
            }
            return p;
        },
        host: (parent, args, context) => {
            const id = parent.host;
            return context.db.Players.findById(id);
        }
    },

    queries: {
        allPickupGames: (parent, args, context) => { return context.db.PickupGames.find({}) },
        pickupGame: (parent, args, context) => { return context.db.PickupGames.findById(args.id) }
    },

    mutations: {
        createPickupGame: async(parent, args, context) => { 
            /*  (x) Pickup games cannot be added to a basketball field which has a status of closed
                (x) Pickup games cannot overlap if they are being played in the same basketball field
                (x) Players which are registered as hosts to pickup games should automatically be added as a
                    registered player
                (x) Pickup games cannot be created with start and end date that has already passed
                (x) Pickup games that have an end date which comes before the start date cannot be created
                (x) Pickup games can be at max 2 hours, but a minimum of 5 minutes
            */
            if (! await context.db.Players.exists({ _id: args.input.hostId })) { return new Error("NOT FOUND"); }

            const field = await context.fieldServices.getBasketballFieldById(args.input.basketballFieldId);
            if (field.status == "CLOSED"){
                return new Error("FIELD CLOSED")
            }
            else {
                const start = args.input.start;
                const end = args.input.end;

                for (game in context.db.pickupGames) {
                    if (game.start < start && game.end > start) { return new Error("OVERLAP") }
                }

                if (start > end) { return new Error("OVERLAP") }           // start is before end
                if (start.add(5, 'minute') > end )     { return new Error("OVERLAP") } // game is less than 5 minutes
                if (start.add(2, 'hours') < end )      { return new Error("OVERLAP") }  // game is more than 2 hours
                if (moment() > end & moment() > start) { return new Error("OVERLAP") }  // start and endis in the past
                
                const hostObject = await context.db.Players.findById(args.input.hostId);
                let hostObjectId = new ObjectId(hostObject._id);
                const newPickupGame = {
                    start: args.input.start,
                    end: args.input.start,
                    location: args.input.basketballFieldId,
                    registeredPlayers: [hostObjectId],
                    host: hostObjectId
                }
                const newGame = await context.db.PickupGames.create(newPickupGame);
                
                hostObject.playedGames.push(newGame._id);
                await context.db.Players.updateOne({ _id: hostObject._id }, { playedGames: hostObject.playedGames });

                return newGame

            }
        },
        
        removePickupGame: async(parent, args, context) => {
            if (! await context.db.PickupGames.exists({ _id: args.id })) { return new Error("NOT FOUND") }

            const game = await context.db.PickupGames.findById( args.id );
            const players = game.registeredPlayers;

            // removes the game from played Games in players
            for (p in players) {
                var tmp = await context.db.Players.findById(players[p]);
                var playedGames = tmp.playedGames;
                playedGames = playedGames.filter(function(item){ return item != args.id });
                await context.db.Players.updateOne({ _id: players[p] }, { playedGames: playedGames });
            }

            await context.db.PickupGames.deleteOne({ _id: args.id }).exec();
            return true
        },
        
        addPlayerToPickupGame:  async(parent, args, context) => { 
            /*  (x) Players cannot be added to pickup games that have already passed
                (x) Players cannot be added to pickup games, if the maximum capacity has been reached for
                    that basketball field
                (x) Players cannot be registered more than once to the same pickup game
                (x) Players cannot be registered to two pickup games that overlap
            */      
           const playerId = args.input.playerId;
           const gameId = args.input.pickupGameId

           if (! await context.db.Players.exists({ _id: playerId }) || ! await context.db.PickupGames.exists({ _id: gameId }) ) { return new Error("NOT FOUND"); } 
            
            const player = await context.db.Players.findOne({ _id: playerId });
            const game = await context.db.PickupGames.findOne({ _id: gameId });

            console.log(playerId, "is in", game.registeredPlayers, ":", game.registeredPlayers.includes(playerId));

            if (game.end < moment()) { return new Error("PASSED") }
            if (game.registeredPlayers.length == game.location.capacity) { return new Error("EXCEED") }
            if (game.registeredPlayers.includes(playerId)) { return new Error("REGISTER") }
            
            for (pg in context.db.pickupGames) {
                if (pg._id != game._id) {
                    if (pg.registeredPlayers.includes(playerId)) {
                        if (pg.start.isBetween(game.start, game.end) || pg.end.isBetween(game.start, game.end)) { 
                            return new Error("REGISTER") 
                        }
                    }
                }
            }

            player.playedGames.push(game._id);
            game.registeredPlayers.push(player._id);

            await context.db.Players.updateOne({ _id: playerId }, { playedGames: player.playedGames }).exec();
            await context.db.PickupGames.updateOne({ _id: gameId }, { registeredPlayers: game.registeredPlayers }).exec();

            return true
        },

        removePlayerFromPickupGame: async(parent, args, context) => { 
            /*  • Players cannot be removed from pickup games that have already passed
                • If a player which is a host in a pickup game is deleted, the first (in alphabetical order)
                  registered player should be assigned as the new host or if the pickup game has no
                  registered players the pickup game should be marked as deleted
                • Players cannot be removed from a pickup game they are not currently registered in
            */
            const playerId = args.input.playerId
            const gameId = args.input.pickupGameId

            const player = await context.db.Players.findById(playerId);
            const game = await context.db.PickupGames.findById(gameId);

            if (!game.registeredPlayers.includes(playerId)) { return new Error("REGISTER") } 
            if (game.end < moment()) { return new Error("PASSED") }
            
            // remove player from registered players
            const playerArr = game.registeredPlayers.filter(function(item){return item != playerId});
            await context.db.PickupGames.updateOne({_id: gameId}, { registeredPlayers: playerArr }, function(err, data){}).exec();

            // remove game from played games
            const gameArr = player.playedGames.filter(function(item){return item != gameId});
            await context.db.Players.updateOne({_id: playerId}, { playedGames: gameArr }, function(err, data){} ).exec();


            if (game.host == playerId) {
                if (playerArr.length == 0) { 
                    await removePickupGame(parent, { id: game._id }, context); 
                    return new Error("LAST PLAYER");
                }
                else {
                    var names = [];
                    
                    // Get names and id's of all registered players, other than our player
                    for (p in playerArr) {
                        if (playerArr[p] != player._id) {

                            const regPlayers = playerArr;
                            const player = await context.db.Players.findById(regPlayers[p]);
                            names.push( { pName: player.name, pId: player._id } )
                        }
                    }
                    
                    // sort names
                    names.sort(function(a, b) {
                        if (a.pName < b.pName)      { return -1 }
                        else if (a.pName > b.pName) { return 1  }
                        return 0;
                    });
                    
                    // set new host id
                    await context.db.PickupGames.updateOne({ _id: game._id }, { host: names[0].pId })
                }                

            }
            return true 
        }
    }
};