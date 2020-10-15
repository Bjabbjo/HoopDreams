module.exports = `
    type Query {
        allBasketballFields: [BasketballField!]!
        allPickupGames: [PickupGame!]!
        allPlayers: [Player!]!
        basketballField(id: String!): BasketballField!
        pickupGame(id: Int!): PickupGame!
        player(id: Int!): Player!
    }
`;