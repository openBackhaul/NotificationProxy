'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');

/**
 * Returns Description of TcpServer
 *
 * url String
 * returns inline_response_200_26
 **/
exports.getTcpServerDescription = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "tcp-server-interface-1-0:description": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns address of the server
 *
 * url String
 * returns inline_response_200_28
 **/
exports.getTcpServerLocalAddress = async function (url) {
  var examples = {};
  examples['application/json'] = {
    "tcp-server-interface-1-0:local-address": {
      "ipv-4-address": "1.1.4.1"
    }
  };
  if (Object.keys(examples).length > 0) {
    return examples[Object.keys(examples)[0]];
  }
}


/**
 * Returns TCP port of the server
 *
 * uuid String
 * returns inline_response_200_29
 **/
exports.getTcpServerLocalPort = async function (url, uuid) {
  var value = await fileOperation.readFromDatabaseAsync(uuid);
  var response = {};
  response['application/json'] = {
    "tcp-server-interface-1-0:local-port": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns Protocol of TcpServer
 *
 * url String
 * returns inline_response_200_27
 **/
exports.getTcpServerLocalProtocol = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "tcp-server-interface-1-0:local-protocol": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}


/**
 * Documents Description of TcpServer
 *
 * url String
 * body Tcpserverinterfaceconfiguration_description_body
 * uuid String
 * no response value expected for this operation
 **/
exports.putTcpServerDescription = async function (url, body, uuid) {
  let isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);
  if (isUpdated) {
    let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
      uuid
    );
    ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
      forwardingAutomationInputList
    );
  }
}

/**
 * Documents address of the server
 *
 * body Tcpserverinterfaceconfiguration_localaddress_body
 * uuid String
 * no response value expected for this operation
 **/
exports.putTcpServerLocalAddress = async function (url, body, uuid) {
  let isUpdated = await tcpServerInterface.setLocalAddressAsync(uuid, body["tcp-server-interface-1-0:local-address"]);
  if (isUpdated) {
    let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
      uuid
    );
    ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
      forwardingAutomationInputList
    );
  }
}

/**
 * Documents TCP port of the server
 *
 * body Tcpserverinterfaceconfiguration_localport_body
 * uuid String
 * no response value expected for this operation
 **/
exports.putTcpServerLocalPort = async function (url, body, uuid) {
  let isUpdated = await tcpServerInterface.setLocalPortAsync(uuid, body["tcp-server-interface-1-0:local-port"]);
  if (isUpdated) {
    let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
      uuid
    );
    ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
      forwardingAutomationInputList
    );
  }
}

/**
 * Documents Protocol of TcpServer
 *
 * url String
 * body Tcpserverinterfaceconfiguration_localprotocol_body
 * uuid String
 * no response value expected for this operation
 **/
exports.putTcpServerLocalProtocol = async function (url, body, uuid) {
  let isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);
  if (isUpdated) {
    let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
      uuid
    );
    ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
      forwardingAutomationInputList
    );
  }
}
