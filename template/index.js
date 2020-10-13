const { ApolloServer } = require('apollo-server');

// documentation: https://basketball-fields.herokuapp.com/docs
const url = "https://basketball-fields.herokuapp.com/"

const server = new ApolloServer({
    /*
        Add typeDefs
        Add resolvers
    */
});

server.listen()
    .then(({ url }) => console.log(`GraphQL Service is running on ${ url }`));
