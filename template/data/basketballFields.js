
const globalTryCatch = async cb => {
    try {
        return await cb();
    } catch(err) {
        return err;
    }
}

const getAllBasketballFields = async () => {
    return await globalTryCatch(async () => 
    {
        let result = [];
        await request({
            uri: "https://basketball-fields.herokuapp.com/",
            method: "GET"
        })
        .then(body => {
            result = JSON.parse(body);
        })
        return result;
    });
}

const getBasketballFieldById = async (id) => {
    return await globalTryCatch(async () => 
    {
        let result = [];
        await request({
            uri: "https://basketball-fields.herokuapp.com/" + toString(id),
            method: "GET"
        })
        .then(body => {
            result = JSON.parse(body);
        })
        return result;
    });
}

module.exports = {
    getAllBasketballFields,
    getBasketballFieldById
}