const db = require("../data/db");

module.exports = {
    queries: {
        allBasketballFields: () => db.getAllBasketballFields(),
        basketballField: (id) => db.getBasketballFieldById(id)
    }
    };