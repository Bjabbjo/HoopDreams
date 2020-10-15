const fieldServices = require("../services/basketballFieldService");

module.exports = {
    queries: {
        allBasketballFields: () => { return fieldServices.getAllBasketballFields() },
        basketballField: (parent, args, context) => { return fieldServices.getBasketballFieldById(args.id) }
    },

    mutations: {

    }

};