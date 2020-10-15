const enums     = require("./enums");
const inputs    = require("./inputs");
const mutations = require("./mutations");
const queries   = require("./queries");
const types     = require("./types");
const scalar    = require("./scalar");

module.exports = `
    ${enums}
    ${inputs}
    ${mutations}
    ${queries}
    ${types}
    ${scalar}
`;


// ``