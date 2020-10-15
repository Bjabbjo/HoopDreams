const basketballFieldResolver = require("./basketballFieldResolver");
const db = require("../data/db");
const pickupGamesResolver = require("./pickupGamesResolver");
const playerResolver = require("./playerResolver");

module.exports = {
    Query: {
        ...basketballFieldResolver.queries,
        ...pickupGamesResolver.queries,
        ...playerResolver.queries
    }
}