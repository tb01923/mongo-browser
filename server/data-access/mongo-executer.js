const {create, env} = require('sanctuary');
const {env: flutureEnv} = require('fluture-sanctuary-types');
const F = require('fluture');
const S = create({checkTypes: false, env: env.concat(flutureEnv)});
const R = require('ramda');
const mongoClient = require('mongodb').MongoClient;

const encaseTest = F.encaseN(mongoClient.connect);

const connect = R.curry((host, database) => encaseTest('mongodb://' + host + ':27017/' + database));

const rejectMongoConnection = (host, database) => (e) => {
    const err = {};
    err.message = e.message;
    err.stack = e.stack;
    err.host = host;
    err.database = database;
    return F.reject(err);
};

const rejectMongoOf = (collection, query, projection) => (e) => {
    const err = {};
    err.message = e.message;
    err.stack = e.stack;
    err.collection = collection;
    err.query = query;
    err.projection = projection;
    return F.reject(err);
};
// named functions conversions into directly called functions
const toArray = R.invoker(0, 'toArray');
const limit = R.invoker(1, 'limit');
const find = R.invoker(1, 'find');
const findOne = R.invoker(1, 'findOne');
const project = R.invoker(1, 'project');
const aggregate = R.invoker(1, 'aggregate');


const executeAction = R.curry((actionFunction, projectFn, collection, query, db) => {
    const getCollection = db.collection(collection);

    const queryPipeline = R.pipe(
        actionFunction(query),
        projectFn,
        toArray);

    return F.tryP(() => queryPipeline(getCollection))
        .chainRej(rejectMongoOf(collection, query));
});

// build functions
const buildFind = executeAction(find, project({ _id: 0}));
const buildFindOne = executeAction(findOne, project({ _id: 0}));
const buildAggregate = executeAction(aggregate, project({ _id: 0}));

const withConnection = function (mongo) {

    const closeCursor = F.tryP(() => mongo.close());

    const executeSingle = runStatement => F.parallel(1, [runStatement(mongo), closeCursor])
        .map(R.head);

    return Object.freeze({executeSingle});
};

module.exports = Object.freeze({
    connect,
    buildAggregate,
    buildFind,
    buildFindOne,
    rejectMongoConnection,
    withConnection
});

