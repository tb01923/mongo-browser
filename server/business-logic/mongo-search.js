const {create, env} = require('sanctuary');
const {env: flutureEnv} = require('fluture-sanctuary-types');
const S = create({checkTypes: false, env: env.concat(flutureEnv)});
const R = require('ramda');

const { flattenObj  } = require('./fp-helpers');

const { runFindQuery, runAggQuery, executeMongoProcess} = require('../data-access/search/search-common');


const mongoSimpleSearch = (host, database, collection, query) => {

    const buildStatement = runFindQuery(collection, query);

    return executeMongoProcess(host, database, buildStatement)
        .map(S.map(R.map(flattenObj)));
};


const mongoAdvancedSearch = (host, database, collection, query) => {

    const buildStatement = runAggQuery(collection, query);

    return executeMongoProcess(host, database, buildStatement);
};


module.exports = Object.freeze({
    mongoSimpleSearch,
    mongoAdvancedSearch
});
