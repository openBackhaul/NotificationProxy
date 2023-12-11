'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns the reference on the consequent operation
 *
 * url String
 * returns inline_response_200_10
 **/
exports.getActionProfileConsequentOperationReference = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "action-profile-1-0:consequent-operation-reference" : value
  };
  if (Object.keys(response).length > 0) {
    resolve(response[Object.keys(response)[0]]);
  } else {
    resolve();
  }
}

/**
 * Returns whether to be presented in new browser window
 *
 * url String
 * returns inline_response_200_9
 **/
exports.getActionProfileDisplayInNewBrowserWindow = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "action-profile-1-0:display-in-new-browser-window": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns the list of input values
 *
 * url String
 * returns inline_response_200_8
 **/
exports.getActionProfileInputValueListt = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "action-profile-1-0:input-value-list": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns the Label of the Action
 *
 * url String
 * returns inline_response_200_7
 **/
exports.getActionProfileLabel = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "action-profile-1-0:label": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns the name of the Operation
 *
 * url String
 * returns inline_response_200_6
 **/
exports.getActionProfileOperationName = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "action-profile-1-0:operation-name": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Configures the reference on the consequent operation
 *
 * url String
 * body Actionprofileconfiguration_consequentoperationreference_body
 * no response value expected for this operation
 **/
exports.putActionProfileConsequentOperationReference = async function (url, body) {
  await fileOperation.writeToDatabaseAsync(url, body, false);
}
