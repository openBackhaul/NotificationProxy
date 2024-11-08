'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns the configured life cycle state of the operation
 *
 * url String
 **/
exports.getOperationServerLifeCycleState = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "operation-server-interface-1-0:life-cycle-state": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns key for connecting
 *
 * url String
 **/
exports.getOperationServerOperationKey = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "operation-server-interface-1-0:operation-key": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns operation name
 *
 * url String
 **/
exports.getOperationServerOperationName = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "operation-server-interface-1-0:operation-name": value
  };
  if (Object.keys(response).length > 0) {
    resolve(response[Object.keys(response)[0]]);
  } else {
    resolve();
  }
}

/**
 * Configures life cycle state
 *
 * url String
 * body Operationserverinterfaceconfiguration_lifecyclestate_body
 * uuid String
 * no response value expected for this operation
 **/
exports.putOperationServerLifeCycleState = async function (url, body, uuid) {
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
 * Changes key for connecting
 *
 * body Operationserverinterfaceconfiguration_operationkey_body
 * uuid String
 * no response value expected for this operation
 **/
exports.putOperationServerOperationKey = async function (url, body, uuid) {
  let isUpdated = await operationServerInterface.setOperationKeyAsync(uuid, body["operation-server-interface-1-0:operation-key"]);
  if (isUpdated) {
    let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
      uuid
    );
    ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
      forwardingAutomationInputList
    );
  }
}
