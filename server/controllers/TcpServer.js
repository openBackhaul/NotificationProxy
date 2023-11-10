'use strict';

var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var TcpServer = require('../service/TcpServerService');

module.exports.getTcpServerDescription = function getTcpServerDescription(req, res, next, uuid) {
  TcpServer.getTcpServerDescription(req.url)
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

module.exports.getTcpServerLocalAddress = function getTcpServerLocalAddress(req, res, next, uuid) {
  TcpServer.getTcpServerLocalAddress(req.url)
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

module.exports.getTcpServerLocalPort = function getTcpServerLocalPort(req, res, next, uuid) {
  TcpServer.getTcpServerLocalPort(req.url)
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

module.exports.getTcpServerLocalProtocol = function getTcpServerLocalProtocol(req, res, next, uuid) {
  TcpServer.getTcpServerLocalProtocol(req.url)
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

module.exports.putTcpServerDescription = function putTcpServerDescription(req, res, next, body, uuid) {
  TcpServer.putTcpServerDescription(req.url, body, uuid)
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

module.exports.putTcpServerLocalAddress = function putTcpServerLocalAddress(req, res, next, body, uuid) {
  TcpServer.putTcpServerLocalAddress(req.url, body, uuid)
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

module.exports.putTcpServerLocalPort = function putTcpServerLocalPort(req, res, next, body, uuid) {
  TcpServer.putTcpServerLocalPort(req.url, body, uuid)
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

module.exports.putTcpServerLocalProtocol = function putTcpServerLocalProtocol(req, res, next, body, uuid) {
  TcpServer.putTcpServerLocalProtocol(req.url, body, uuid)
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
