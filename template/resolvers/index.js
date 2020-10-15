const basketballFieldResolver = require("./basketballFieldResolver");
const pickupGamesResolver = require("./pickupGamesResolver");
const playerResolver = require("./playerResolver");

module.exports = {
    Query: {
        ...basketballFieldResolver.queries,
        ...pickupGamesResolver.queries,
        ...playerResolver.queries
    },
    Mutation: {

    }
}