'use strict';

var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var Core = require('../service/CoreService');

module.exports.getControlConstruct = async function getControlConstruct(req, res, next) {
  try {
    let responseBody = await Core.getControlConstruct(req.url);
    let responseCode = responseCodeEnum.code.OK;
    responseBuilder.buildResponse(res, responseCode, responseBody);
    await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
  } catch (response) {
    let responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    let responseBody = response;
    responseBuilder.buildResponse(res, responseCode, responseBody);
    await oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
  }
};

module.exports.getProfileInstance = function getProfileInstance(req, res, next, uuid) {
  Core.getProfileInstance(req.url)
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

// 4-integrate-logging
// 6-implement-oam-services
