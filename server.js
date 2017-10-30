'use strict';

// Enable requiring modules relative to server directory
require('app-module-path').addPath(__dirname + '/server');
require('app-module-path').addPath(__dirname);

const
  cluster = require('cluster'),
  koa = require('koa'),
  serveStatic = require('koa-static'),
  bodyParser = require('koa-bodyparser'),
  output = require('./server/middleware/output-filters'),
  ErrorHandler = require('middleware/http-error-handler'),
  path = require('path');


const bootstrapServer = async function (config) {

  const routes = require('routes/routes');
  const app = new koa();

  if (config.debug) {
    app.use(output.responseTimer);
    //app.use(output.memoryUsage);
  }

  // server build folder
  app.use(serveStatic('./build'));

  // Parse request bodies as JSON
  app.use(bodyParser());

  // Force all valid requests to respond appropriately
  app.use(output.jsonAcceptNullBody);

  // Print JSON output with optional pretty-printing, and pipe streams into response output
  app.use(output.jsonStreamer({pretty: config.debug}));

  // Catch errors and respect response codes from HttpErrors
  app.use(ErrorHandler.middleware({debug: config.debug, pretty: config.debug}));

  // Add routing to request handlers
  app.use(routes.anonymousRouteMiddleware());

  app.listen(config.port);

  console.log(`listening on port ${config.port}`);
};


/**
 * startServer
 * Bootstrap the application.
 *
 * @param config
 * @return Promise
 */
module.exports.startServer = async function (config) {
  await bootstrapServer(config).catch(ex => console.error(ex.stack || ex));
};
