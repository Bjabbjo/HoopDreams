const request = require('request');

const getAllBasketballFields = async() => {
    const result = await new Promise(function(res, rej) {
        request("https://basketball-fields.herokuapp.com/api/basketball-fields", function(error, response, body) {
            if(error) {return rej(error)}
            res(body)
        });
    })
    console.log(result);
    return JSON.parse(result)
}

const getBasketballFieldById = async id => {
    const result = await new Promise(function(res, rej) {
        request("https://basketball-fields.herokuapp.com/api/basketball-fields/" + id, function(error, response, body) {
            if(error) {return rej(error)}
            res(body)
        });
    })
    return JSON.parse(result)
}

module.exports = {
    getAllBasketballFields,
    getBasketballFieldById
}