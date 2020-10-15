const db = require("../data/db");

module.exports = {
    queries: {
        allPlayers: () => db.Players.find({}),
        player: (id) => db.Players.findById(id)
    }
}