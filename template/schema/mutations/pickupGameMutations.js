module.exports = `
    createPickupGame(input: PickupGameInput!): PickupGame
    removePickupGame(id: ID!): Boolean!
    addPlayerToPickupGame(playerId: ID!, pickupGameId: ID!): Boolean!
    removePlayerFromPickupGame(playerId: ID!, pickupGameId: ID!): Boolean!
`;