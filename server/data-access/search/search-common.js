const R = require('ramda');
const {create, env} = require('sanctuary');
const {env: flutureEnv} = require('fluture-sanctuary-types');
const S = create({checkTypes: false, env: env.concat(flutureEnv)});

const {
    buildFind,
    buildFindOne,
    buildAggregate,
    withConnection,
    connect,
    rejectMongoConnection
} = require('../mongo-executer');


const runFindQuery = (collection, query) => buildFind(collection, query);

const runFindOneQuery = (collection, query) => buildFindOne(collection, query);

const runAggQuery = (collection, query) => buildAggregate(collection, query);

const executeMongoProcess = (host, database, statement) => {
    const rejectConn = rejectMongoConnection(host, database);

    return connect(host, database)
        .chain(mongo => withConnection(mongo).executeSingle(statement))
        .chainRej(rejectConn)
        .fold(S.Left, S.Right);
};


module.exports = Object.freeze({
    runFindQuery,
    runFindOneQuery,
    runAggQuery,
    executeMongoProcess
});
