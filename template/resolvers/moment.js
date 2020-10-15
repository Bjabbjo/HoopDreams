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
        serialize(value){
            if (moment(value).isValid()){
                const ret = new Date(value);
                //const formattedDate = moment(value).format("llll").locale("is");
                return ret.toISOString()
            }
            return null
        },
        parseValue(value){
            return returnOnError(() => value == null ? null : new Date(value), null);
        },
        parseLiteral(ast){
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10)
            }
            return null
        }
        
    })
}