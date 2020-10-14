const playerMutations = require("./playerMutations");
const pickupGameMutations = require("./pickupGameMutations");
module.exports = `
    type Mutation {
        ${playerMutations}
        ${pickupGameMutations}
    }
`;