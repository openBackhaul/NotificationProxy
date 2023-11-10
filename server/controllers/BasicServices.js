//@ts-check
'use strict';

var BasicServices = require('onf-core-model-ap-bs/basicServices/BasicServicesService');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var RestResponseHeader = require('onf-core-model-ap/applicationPattern/rest/server/ResponseHeader');
var RestResponseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var ExecutionAndTraceService = require('onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService');

const NEW_RELEASE_FORWARDING_NAME = 'PromptForBequeathingDataCausesTransferOfListOfApplications';

module.exports.embedYourself = async function embedYourself(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.embedYourself(body, user, xCorrelator, traceIndicator, customerJourney, req.url);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.endSubscription = async function endSubscription(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.endSubscription(body, user, xCorrelator, traceIndicator, customerJourney, req.url);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.informAboutApplication = async function informAboutApplication(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.informAboutApplication();
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.informAboutApplicationInGenericRepresentation = async function informAboutApplicationInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.informAboutApplicationInGenericRepresentation(req.url);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.informAboutReleaseHistory = async function informAboutReleaseHistory(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.informAboutReleaseHistory();
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.informAboutReleaseHistoryInGenericRepresentation = async function informAboutReleaseHistoryInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.informAboutReleaseHistoryInGenericRepresentation(req.url);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.inquireOamRequestApprovals = async function inquireOamRequestApprovals(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.inquireOamRequestApprovals(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.listLtpsAndFcs = async function listLtpsAndFcs(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.listLtpsAndFcs();
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.redirectOamRequestInformation = async function redirectOamRequestInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.redirectOamRequestInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.redirectServiceRequestInformation = async function redirectServiceRequestInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.redirectServiceRequestInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.redirectTopologyChangeInformation = async function redirectTopologyChangeInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.redirectTopologyChangeInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.registerYourself = async function registerYourself(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  //todo use of check?
  if (Object.keys(req.body).length === 0) {
    body = req.body;
    user = req.headers["user"];
    originator = req.headers["originator"];
    xCorrelator = req.headers["x-correlator"];
    traceIndicator = req.headers["trace-indicator"];
    customerJourney = req.headers["customer-journey"];
  }
  try {
    responseBodyToDocument = await BasicServices.registerYourself(body, user, xCorrelator, traceIndicator, customerJourney, req.url);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.startApplicationInGenericRepresentation = async function startApplicationInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.startApplicationInGenericRepresentation(req.url);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.updateClient = async function updateClient(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.updateClient(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.updateOperationClient = async function updateOperationClient(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.updateOperationClient(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.updateOperationKey = async function updateOperationKey(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  try {
    responseBodyToDocument = await BasicServices.updateOperationKey(body);
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    RestResponseBuilder.buildResponse(res, responseCode, responseBodyToDocument, responseHeader);
  } catch (responseBody) {
    let responseHeader = await RestResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = RestResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  }
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};
