const basketballFieldResolver = require("./basketballFieldResolver");
const pickupGamesResolver = require("./pickupGamesResolver");
const playerResolver = require("./playerResolver");
const moment = require("./moment");

module.exports = {
    Query: {
        ...basketballFieldResolver.queries,
        ...pickupGamesResolver.queries,
        ...playerResolver.queries
    },
    Mutation: {
        ...playerResolver.mutations

    },
    Moment: {
        ...moment
    }
}