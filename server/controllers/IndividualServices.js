'use strict';

var executionAndTraceService = require('onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService');
var IndividualServices = require('../service/IndividualServicesService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var restResponseHeader = require('onf-core-model-ap/applicationPattern/rest/server/ResponseHeader');

module.exports.addController = function addController(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.addController(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.bequeathYourDataAndDie = function bequeathYourDataAndDie(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.bequeathYourDataAndDie(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.listenToControllers = function listenToControllers(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.listenToControllers(req.url, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.notifyControllerAttributeValueChanges = function notifyControllerAttributeValueChanges(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.notifyControllerAttributeValueChanges(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.notifyControllerObjectCreations = function notifyControllerObjectCreations(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.notifyControllerObjectCreations(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.notifyControllerObjectDeletions = function notifyControllerObjectDeletions(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.notifyControllerObjectDeletions(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.notifyDeviceAlarms = function notifyDeviceAlarms(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.notifyDeviceAlarms(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.notifyDeviceAttributeValueChanges = function notifyDeviceAttributeValueChanges(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.notifyDeviceAttributeValueChanges(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.notifyDeviceObjectCreations = function notifyDeviceObjectCreations(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.notifyDeviceObjectCreations(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.notifyDeviceObjectDeletions = function notifyDeviceObjectDeletions(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.notifyDeviceObjectDeletions(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

module.exports.removeController = function removeController(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let startTime = process.hrtime();

    IndividualServices.removeController(req.url, body, user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (response) {
            let responseCode = responseCodeEnum.code.NO_CONTENT;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        })
        .catch(async function (response) {
            let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
            let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
            let responseBody = response;
            responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
            executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBody);
        });
};

// 4-integrate-logging

// 7-implement-individual-services
