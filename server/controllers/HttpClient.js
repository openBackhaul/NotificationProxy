'use strict';

var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var HttpClient = require('../service/HttpClientService');

module.exports.getHttpClientApplicationName = function getHttpClientApplicationName(req, res, next, uuid) {
  HttpClient.getHttpClientApplicationName(req.url)
    .then(async function (response) {
      let responseCode = responseCodeEnum.code.OK;
      let responseBody = response;
      responseBuilder.buildResponse(res, responseCode, responseBody);
      await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
    })
    .catch(async function (response) {
      let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      let responseBody = response;
      responseBuilder.buildResponse(res, responseCode, responseBody);
      await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
    });
};

module.exports.getHttpClientReleaseNumber = function getHttpClientReleaseNumber(req, res, next, uuid) {
  HttpClient.getHttpClientReleaseNumber(req.url)
    .then(async function (response) {
      let responseCode = responseCodeEnum.code.OK;
      let responseBody = response;
      responseBuilder.buildResponse(res, responseCode, responseBody);
      await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
    })
    .catch(async function (response) {
      let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      let responseBody = response;
      responseBuilder.buildResponse(res, responseCode, responseBody);
      await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
    });
};

module.exports.putHttpClientApplicationName = function putHttpClientApplicationName(req, res, next, body, uuid) {
  HttpClient.putHttpClientApplicationName(req.url, body, uuid)
    .then(async function (response) {
      let responseCode = responseCodeEnum.code.NO_CONTENT;
      let responseBody = response;
      responseBuilder.buildResponse(res, responseCode, responseBody);
      await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
    })
    .catch(async function (response) {
      let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      let responseBody = response;
      responseBuilder.buildResponse(res, responseCode, responseBody);
      await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
    });
};

module.exports.putHttpClientReleaseNumber = function putHttpClientReleaseNumber(req, res, next, body, uuid) {
  HttpClient.putHttpClientReleaseNumber(req.url, body, uuid)
    .then(async function (response) {
      let responseCode = responseCodeEnum.code.NO_CONTENT;
      let responseBody = response;
      responseBuilder.buildResponse(res, responseCode, responseBody);
      await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
    })
    .catch(async function (response) {
      let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      let responseBody = response;
      responseBuilder.buildResponse(res, responseCode, responseBody);
      await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
    });
};

// 4-integrate-logging
// 6-implement-oam-services
