'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var appCommons = require('onf-core-model-ap/applicationPattern/commons/AppCommons');

const logger = require('./service/LoggingService.js').getLogger();
let kafkaConnection = require('./service/individualServices/KafkaHandler');

var serverPort = 4025;

// uncomment if you do not want to validate security e.g. operation-key, basic auth, etc
//appCommons.openApiValidatorOptions.validateSecurity = false;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
    openApiValidator: appCommons.openApiValidatorOptions
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

appCommons.setupExpressApp(app);


// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    logger.info('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    logger.info('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

global.databasePath = './database/config.json'

// 1-integrate-loadfile
// 3-integrate-authorization

// perform application registration
//appCommons.performApplicationRegistration();

//initiate connection to kafka broker
kafkaConnection.connectToKafka();
