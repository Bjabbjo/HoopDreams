//const db = require("../data/db");

module.exports = 
{
    queries: {
        allPickupGames: (parent, args, context) => { return context.db.PickupGames.find({}) },
        pickupGame: (parent, args, context) => { return context.db.PickupGames.findById(args.id) }
    },

    mutations: {
        /*createPickupGame: (parent, args, context) => { 
            /*  • Pickup games cannot be added to a basketball field which has a status of closed
                • Pickup games cannot overlap if they are being played in the same basketball field
                • Players which are registered as hosts to pickup games should automatically be added as a
                  registered player
                • Pickup games cannot be created with start and end date that has already passed
                • Pickup games that have an end date which comes before the start date cannot be created
                • Pickup games can be at max 2 hours, but a minimum of 5 minutes
             

            const newPickupGame = {
                start = args.input.start,
                end = args.input.start,
                location = args.input.location,
                registeredPlayers = args.input.registeredPlayers,
                host = args.input.host
            }
            return context.db.PickupGames.push(newPickupGame)
            return true
        },
        removePickupGame: (parent, args, context) => {
            //context.db.PickupGames = context.db.PickupGames.filter(c => x.id != args.id);
            return true
        },
        addPlayerToPickupGame: (parent, args, context) => { 
            /*  • Players cannot be added to pickup games that have already passed
                • Players cannot be added to pickup games, if the maximum capacity has been reached for
                  that basketball field
                • Players cannot be registered more than once to the same pickup game
                • Players cannot be registered to two pickup games that overlap
                
             
            return true 
        },
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