
module.exports = 
{
    queries: {
        allPickupGames: (parent, args, context) => { return context.db.PickupGames.find({}) },
        pickupGame: (parent, args, context) => { return context.db.PickupGames.findById(args.id) }
    },

    mutations: {
        createPickupGame: (parent, args, context) => { 
            /*  (x) Pickup games cannot be added to a basketball field which has a status of closed
                (x) Pickup games cannot overlap if they are being played in the same basketball field
                (x) Players which are registered as hosts to pickup games should automatically be added as a
                    registered player
                (x) Pickup games cannot be created with start and end date that has already passed
                (x) Pickup games that have an end date which comes before the start date cannot be created
                (x) Pickup games can be at max 2 hours, but a minimum of 5 minutes
            */

            const field = context.fieldService.getBasketballFieldById(args.location);
            console.log(field.status);
            if (field.status == "CLOSED"){
                return false
            }
            else {
                const start = args.input.start;
                const end = args.input.end;

                for (game in context.db.pickupGames) {
                    if (game.start < start && game.end > start) { return false }
                }

                if (start > end) { return false }                       // start is before end
                if (start.add(5, 'minute') > end )     { return false } // game is less than 5 minutes
                if (start.add(2, 'hours') < end )      { return false } // game is more than 2 hours
                if (moment() > end & moment() > start) { return false } // start and endis in the past
                
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
        
        removePickupGame: (parent, args, context) => {
            context.db.PickupGames = context.db.PickupGames.find(x => x.id == args.id).remove().exec();
            return true
        },
        
        addPlayerToPickupGame: (parent, args, context) => { 
            /*  (x) Players cannot be added to pickup games that have already passed
                (x) Players cannot be added to pickup games, if the maximum capacity has been reached for
                    that basketball field
                (x) Players cannot be registered more than once to the same pickup game
                (x) Players cannot be registered to two pickup games that overlap
            */      
            var player;
            var game;
            try {
                player = context.db.Players.find(x => x.id == args.input.playerId);
                game = context.db.PickupGames.find(y => y.id == args.pickupGameId);
            } catch {
                return false;
            }
            if (game.end < moment()) { return false }
            if (game.registeredPlayers.length == game.location.capacity) { return false }
            if (game.registeredPlayers.includes(player)) { return false }
            
            for (pg in context.db.pickupGames) {
                if (pg != game) {
                    if (pg.registeredPlayers.includes(player)) {
                        if (pg.start.isBetween(game.start, game.end) || pg.end.isBetween(game.start, game.end)) { return false }
                    }
                }
            }

            game.registeredPlayers.add(player);
            player.playedGames.add(game);
            return true
        },
        /*
        removePlayerFromPickupGame: (parent, args, context => { 
            /*  • Players cannot be removed from pickup games that have already passed
                • If a player which is a host in a pickup game is deleted, the first (in alphabetical order)
                  registered player should be assigned as the new host or if the pickup game has no
                  registered players the pickup game should be marked as deleted
                • Players cannot be removed from a pickup game they are not currently registered in
             
            return true 
        }) */
    }
};