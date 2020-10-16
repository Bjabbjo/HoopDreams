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
            return value.getTime();
        },
        parseValue(value){
            //return returnOnError(() => value == null ? null : moment(value), null);
            moment.locale("is");
            moment.format("llll");
            try {
                if (value != null & moment(value).isValid()){
                    const a = moment(value);
                    return a.toISOString()
                }
                return null
            }
            catch(e){
                throw e
            }
        },
        parseLiteral(ast){
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10)
            }
            return null
        }
        
    })
}