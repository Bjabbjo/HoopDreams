module.exports = `
    createPickupGame(input: PickupGameInput!): PickupGame
    removePickupGame(id: ID!): Boolean!
    addPlayerToPickupGame(input: SignupPlayerInput!): Boolean!
    removePlayerFromPickupGame(input: SignupPlayerInput!): Boolean!
`;