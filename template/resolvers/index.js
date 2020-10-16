const basketballFieldResolver = require("./basketballFieldResolver");
const pickupGamesResolver = require("./pickupGamesResolver");
const playerResolver = require("./playerResolver");
const moment = require("./moment");
const playerMutations = require("../schema/mutations/playerMutations");
const pickupGameMutations = require("../schema/mutations/pickupGameMutations");

module.exports = {
    Query: {
        ...basketballFieldResolver.queries,
        ...pickupGamesResolver.queries,
        ...playerResolver.queries
    },
    Mutation: {
        ...playerResolver.Mutation,
        ...pickupGamesResolver.Mutation
    },
    Moment: {
        ...moment
    }
}