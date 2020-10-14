const { ApolloServer } = require('apollo-server');
const typeDefs = require("./schema"); // routes to index.js by default
const resolvers = require("./resolvers"); // Setup later (resolvers)

// documentation: https://basketball-fields.herokuapp.com/docs
const url = "https://basketball-fields.herokuapp.com/"

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server
    .listen() // Default port 4000 (http://localhost:4000)
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));
