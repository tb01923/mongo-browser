"use strict";

const Router = require('koa-router');
const { runSimpleSearch, runAdvancedSearch} = require('./route-handlers/search-route');

module.exports.anonymousRouteMiddleware = function() {

    const rest = new Router();

    // run simple search
    rest.post('/rest/simple/:database/:collection', runSimpleSearch);

    // run advanced search
    rest.post('/rest/advanced/:database/:collection', runAdvancedSearch);

    return rest.middleware();
};

