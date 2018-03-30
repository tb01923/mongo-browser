const { buildFind, buildUpsert } = require('../mongo-executer');


const RETURN_ALL_RECORDS = {} ;
const PROJECT_ALL_FIELDS= {} ;
const NO_LIMIT = 0 ;
const SKIP_ZERO_RECS = 0 ;

const findAllInSomeCollection = () => {
    return buildFind(
        "someCollection",
        RETURN_ALL_RECORDS,
        PROJECT_ALL_FIELDS,
        SKIP_ZERO_RECS,
        NO_LIMIT
    )
}

const findOneInSomeCollection = (a) => {
    const query =  {"a": a} ;

    return buildFind(
        "someCollection",
        query,
        PROJECT_ALL_FIELDS,
        SKIP_ZERO_RECS,
        NO_LIMIT
    )
}

const upsertIntoSomeCollection = value => {
    const query = {"B": value} ;
    const object = {"B": value, "C": value} ;
    return buildUpsert("someCollection", query, object)
}

module.exports = Object.freeze({
    findAllInSomeCollection,
    findOneInSomeCollection,
    upsertIntoSomeCollection
})