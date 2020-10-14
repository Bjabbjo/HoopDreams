const {GraphQLScalarType, Kind} = require("graphql");
const moment = require("moment");
moment.locale("is");
moment.format("llll");

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
                const formattedDate = moment(value);
                return formattedDate.toISOString()
            }
            return null
        }
    })
}