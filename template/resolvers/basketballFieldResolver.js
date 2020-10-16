const fieldServices = require("../services/basketballFieldService");

module.exports = {
    queries: {
        allBasketballFields: (parent, args, context) => { return context.fieldServices.getAllBasketballFields() },
        basketballField: (parent, args, context) => { return context.fieldServices.getBasketballFieldById(args.id) }
    },

};