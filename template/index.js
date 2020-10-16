const { ApolloServer } = require('apollo-server');
const typeDefs = require("./schema"); // routes to index.js by default
const resolvers = require("./resolvers"); // Setup later (resolvers)

const database = require("./data/db");

const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: () => {
        return { db: database }
    }
});

server
    .listen() // Default port 4000 (http://localhost:4000)
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));
