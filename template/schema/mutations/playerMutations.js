module.exports = `
    createPlayer(input: PlayerInput!): Player!
    updatePlayer(id: ID! name: String! playedGames: [String!]!): Player!
`;