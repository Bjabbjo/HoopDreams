const db = require("../data/db");
const mutations = require("../schema/mutations");

module.exports = {
    queries: {
        allBasketballFields: () => { return db.getAllBasketballFields() },
        basketballField: (parent, args) => { return db.getBasketballFieldById(args.id) }
    },

    mutations: {

    }

};