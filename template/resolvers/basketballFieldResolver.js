const db = require("../data/db");

module.exports = {
    queries: {
        allBasketballFields: () => db.BasketballFields.find({}),
        basketballField: (id) => db.BasketballFields.findById(id)
    }
    };