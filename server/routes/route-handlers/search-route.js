const { mongoSimpleSearch, mongoAdvancedSearch  } = require('../../business-logic/mongo-search');
const { handleResult  } = require('./result-handler');


const runSimpleSearch = async (ctx) => {
    // get body
    const body = ctx.request.body;

    // get collection from url path
    const database = ctx.params.database;
    const collection = ctx.params.collection;
    // get remaining parameters from body. Not exposing in the url nor query string
    const host = body.host;
    const query = body.mongoQuery;

    // await promise-based response from lazy request
    await mongoSimpleSearch(host, database, collection, query)
        .promise()
        .then(handleResult(ctx));
};


const runAdvancedSearch = async (ctx) => {
    // get body
    const body = ctx.request.body;

    // get collection from url path
    const database = ctx.params.database;
    const collection = ctx.params.collection;
    // get remaining parameters from body. Not exposing in the url nor query string
    const host = body.host;
    const query = body.mongoQuery;

    // await promise-based response from lazy request
    await mongoAdvancedSearch(host, database, collection, query)
        .promise()
        .then(handleResult(ctx));
};


module.exports = Object.freeze({
    runSimpleSearch,
    runAdvancedSearch
});
