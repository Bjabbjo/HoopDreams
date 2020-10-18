const { ApolloServer, extendResolversFromInterfaces } = require('apollo-server');
const typeDefs = require("./schema"); // routes to index.js by default
const resolvers = require("./resolvers"); // Setup later (resolvers)

const database = require("./data/db");
const basketballFieldService = require('./services/basketballFieldService');
//const errors = require("errors");
const { formatError } = require('graphql');
const e = require("./errors");

const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: () => {
        return { 
            db: database,
            fieldServices: basketballFieldService
         }
    },

    formatError: (err) => {
        if (err.message.startsWith("Cast to ObjectId failed for value") |
            err.message.startsWith("NOT FOUND")) {
            return new e.NotFoundError;
        }
        else if (err.message.startsWith("OVERLAP")) {
            return new e.PickupGameOverlapError;
        }
        else if (err.message.startsWith("FIELD CLOSED")) {
            return new e.BasketballFieldClosedError;
        }
        return err;
    }
});

server
    .listen() // Default port 4000 (http://localhost:4000)
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));
