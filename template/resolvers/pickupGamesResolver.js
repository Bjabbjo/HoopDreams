const moment = require("moment");

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

            const field = context.fieldServices.getBasketballFieldById(args.location);
            if (field.status == "CLOSED"){
                return new Error("FIELD CLOSED")
            }
            else {
                const start = args.input.start;
                const end = args.input.end;

                for (game in context.db.pickupGames) {
                    if (game.start < start && game.end > start) { return new Error("OVERLAP") }
                }

                if (start > end) { return new Error("Start time must be at least 5 minutes before End time") }                       // start is before end
                if (start.add(5, 'minute') > end )     { return new Error("Game length must be longer than 5 minutes") } // game is less than 5 minutes
                if (start.add(2, 'hours') < end )      { return new Error("Game length must be shorter than 2 hours") } // game is more than 2 hours
                if (moment() > end & moment() > start) { return new Error("Start and End times can't be in the past") } // start and endis in the past
                
                const host = context.db.Players.find(x => x.id == id);
                const newPickupGame = {
                    start: args.input.start,
                    end: args.input.start,
                    location: args.input.location,
                    registeredPlayers: [host],
                    host: args.input.host
                }

                return context.db.PickupGames.create(newPickupGame)
            }
        },
        
        removePickupGame: async(parent, args, context) => {
            context.db.PickupGames = context.db.PickupGames.findOneAndDelete({ _id: args.id }).exec();
            return true
        },
        
        addPlayerToPickupGame:  async(parent, args, context) => { 
            /*  (x) Players cannot be added to pickup games that have already passed
                (x) Players cannot be added to pickup games, if the maximum capacity has been reached for
                    that basketball field
                (x) Players cannot be registered more than once to the same pickup game
                (x) Players cannot be registered to two pickup games that overlap
            */      
            var player;
            var game;
            await context.db.Players.findById(args.playerId, function(err, x) { player = x; });
            await context.db.PickupGames.findById(args.pickupGameId, function(err, x) { game = x; });

            if (game.end < moment()) { return new Error("Game has passed") }
            if (game.registeredPlayers.length == game.location.capacity) { return new Error("Maximum amount of players") }
            if (game.registeredPlayers.includes(player)) { return new Error("Player already listed") }
            
            for (pg in context.db.pickupGames) {
                if (pg != game) {
                    if (pg.registeredPlayers.includes(player)) {
                        if (pg.start.isBetween(game.start, game.end) || pg.end.isBetween(game.start, game.end)) { return false }
                    }
                }
            }
            
            await context.db.Players.findOneAndUpdate({ _id: args.playerId },  { playedGames: player.playedGames }).exec();
            await context.db.PickupGames.findOneAndUpdate({ _id: args.pickupGameId },{ registeredPlayers: game.registeredPlayers }).exec();

            return true
        },
        /*
        removePlayerFromPickupGame: async(parent, args, context => { 
            /*  • Players cannot be removed from pickup games that have already passed
                • If a player which is a host in a pickup game is deleted, the first (in alphabetical order)
                  registered player should be assigned as the new host or if the pickup game has no
                  registered players the pickup game should be marked as deleted
                • Players cannot be removed from a pickup game they are not currently registered in
             
            return true 
        }) */
    }
};