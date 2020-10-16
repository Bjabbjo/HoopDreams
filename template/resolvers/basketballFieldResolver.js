const fieldServices = require("../services/basketballFieldService");

module.exports = {
    queries: {
        allBasketballFields: () => { return fieldServices.getAllBasketballFields() },
        basketballField: (parent, args, context) => { return context.db.fieldServices.getBasketballFieldById(args.id) }
    },



};