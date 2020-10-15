const db = require("../data/db");
const mutations = require("../schema/mutations");

module.exports = {
    queries: {
        allBasketballFields: () => db.getAllBasketballFields(),
        basketballField: (parent, args) => { return db.getBasketballFieldById(args.id) }
    }
    };