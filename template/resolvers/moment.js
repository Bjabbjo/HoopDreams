const {GraphQLScalarType, Kind} = require("graphql");
const moment = require("moment");

module.exports = {
    Moment: new GraphQLScalarType({
        name: "Moment",
        description: "Moment Scalar Type",
        serialize(value){
            moment.locale("is");

            var thing;
            if (typeof(value) == "string") { thing = new Date(value) }
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

            const tmp = thing.toISOString()
            const time = moment(tmp, "YYYY-MM-DDThh:mm:ss")

            if (time.isValid()){
                return time.format("llll");
            }
            return null
            
        },
        parseLiteral(ast){
            moment.locale("is");
            if (ast.kind === Kind.STRING) {
                const time = moment(ast.value)
                if (time.isValid()) { return time.format("llll") }
            }
            return null
        }
        
    })
}