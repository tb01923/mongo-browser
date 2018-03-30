/**
 * Created by tbrown on 7/17/17.
 */

const S = require('sanctuary')
const R = require('ramda')
const { withConnection } = require('../data-access/mongo-executer');
const {findAllInSomeCollection, findOneInSomeCollection, upsertIntoSomeCollection} = require('../data-access/collections/some-collection')

const readSomeDataBl = (mongo) => {

    const findStatement = findAllInSomeCollection()

    return withConnection(mongo).
        executeSingle(findStatement)
}

const readOneSomeDataBl = (mongo, a) => {

    const findStatement = findOneInSomeCollection(a)

    return withConnection(mongo).
        executeSingle(findStatement)
}

const writeSomeDataBl = (mongo, value) => {

    const upsertStatement = upsertIntoSomeCollection(value)

    return withConnection(mongo).
        executeSingle(upsertStatement)
}

module.exports = Object.freeze({
    readSomeDataBl,
    readOneSomeDataBl,
    writeSomeDataBl

})