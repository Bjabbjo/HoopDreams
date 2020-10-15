const {GraphQLScalarType, Kind} = require("graphql");
const moment = require("moment");

const returnOnError = (operation, alternative) => {
    try {
      return operation();
    } catch (e) {
      return alternative;
    }
}

module.exports = {
    Moment: new GraphQLScalarType({
        name: "Moment",
        description: "Moment Scalar Type",


        parseValue(value){
            return returnOnError(() => value == null ? null : new Date(value), null);
        },
        parseLiteral(ast){
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10)
            }
            return null
        },
        serialize(value){
            if (moment(value).isValid()){
                const formattedDate = moment(value).format("llll").locale("is");
                return formattedDate.toISOString()
            }
            return null
        }
    })
}