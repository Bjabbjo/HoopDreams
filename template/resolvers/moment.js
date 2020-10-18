const {GraphQLScalarType, Kind} = require("graphql");
const moment = require("moment");

module.exports = {
    Moment: new GraphQLScalarType({
        name: "Moment",
        description: "Moment Scalar Type",
        serialize(value){
            moment.locale("is");

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
            console.log(value)
            moment.locale("is");

            var thing;
            if (typeof(value) == "string") { thing = new Date(value)}
            else { thing = value }

            const tmp = thing.toISOString()
            const time = moment(tmp, "YYYY-MM-DDThh:mm:ss")

            if (time.isValid()){
                return time.format("llll");
            }
            return null
            
        },
        parseLiteral(ast){
            if (ast.kind === Kind.STRING) {
                return moment(ast.value)
            }
            return null
        }
        
    })
}