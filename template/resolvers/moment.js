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
            moment.locale("is")
            console.log("date", value)
            var thing;
            if (typeof(value) == "string") { thing = new Date(value)}
            else { thing = value }
            const tmp = thing.toISOString()
            const time = moment(tmp, "YYYY-MM-DDThh:mm:ss")
            if (time.isValid()) { 
                var ret = time.format("llll"); 
                return ret;
            }
            return null;
        },
        parseValue(value){
            moment.locale("is");

            var thing;
            if (typeof(value) == "string") { thing = new Date(value)}
            else { thing = value }
            const time = moment(value.toISOString(), "YYYY-MM-DDThh:mm:ss")
            if (time.isValid()){
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