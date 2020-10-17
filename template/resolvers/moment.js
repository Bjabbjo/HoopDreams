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
            const tmp = value.toISOString()
            const time = moment(tmp, "YYYY-MM-DDThh:mm:ss")
            if (time.isValid()) { 
                moment.locale("is")
                return time.format("llll"); 
            }
            return null;
        },
        parseValue(value){
            const time = moment(value.toString(), "YYYY-MM-DD")
            if (time.isValid()){
                moment.locale("is");
                return time.format("llll");
            }
            return null
            
        },
        parseLiteral(ast){
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10)
            }
            return null
        }
        
    })
}