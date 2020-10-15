const basketballFieldResolver = require("./basketballFieldResolver");
const pickupGamesResolver = require("./pickupGamesResolver");
const playerResolver = require("./playerResolver");
const Moment = require("../schema/scalar/index");

module.exports = {
    Query: {
        ...basketballFieldResolver.queries,
        ...pickupGamesResolver.queries,
        ...playerResolver.queries
    },
    Mutation: {

    },
    Scalar: {
        ...Moment
    }
}