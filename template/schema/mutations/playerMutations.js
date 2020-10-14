module.exports = `
    createPlayer(name: String!): Player!
    updatePlayer(id: ID! name: String! playedGames: [String!]!): Player!
`;