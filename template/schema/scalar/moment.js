const {GraphQLScalarType, Kind} = require("graphql");
const moment = require("moment");
moment.locale("is");

module.exports = {
    Moment: new GraphQLScalarType({
        name: "Moment",
        description: "Moment Scalar Type",

        parseValue(value){
            return new Date(value)
        },
        parseLiteral(ast){
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10)
            }
            return null
        },
        serialize(value){
            if (moment(value).isValid()){
                const date = new Date(value)
                const formattedDate = moment(date).format('llll');

                return formattedDate.toISOString()
            }
        }
    })
}