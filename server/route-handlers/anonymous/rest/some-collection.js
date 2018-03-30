const {handleResult} = require('../../result-handler')
const {readSomeDataBl, writeSomeDataBl, readOneSomeDataBl} = require('../../../business-logic/some-collection')

const getAllSomeData = async function(ctx){

    const mongo = ctx.mongo ;

    await readSomeDataBl(mongo)
        .promise()
        .then(handleResult(ctx))
}

const getOneSomeData = async function(ctx){

    const mongo = ctx.mongo ;
    const someA = parseInt(ctx.params.someA) ;

    await readOneSomeDataBl(mongo, someA)
        .promise()
        .then(handleResult(ctx))
}

const postSomeData = async function(ctx){

    const mongo = ctx.mongo ;

    const valueToInsert = ctx.params.insertMe ;

    await writeSomeDataBl(mongo, valueToInsert)
        .promise()
        .then(handleResult(ctx)) ;
}

module.exports = Object.freeze({

    getAllSomeData,
    getOneSomeData,
    postSomeData

})