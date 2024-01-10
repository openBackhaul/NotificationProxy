'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns the Datatype of the Field
 *
 * url String
 **/
exports.getGenericResponseProfileDatatype = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "response-profile-1-0:datatype": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns the Description of the Field
 *
 * url String
 **/
exports.getGenericResponseProfileDescription = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "response-profile-1-0:description": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns the name of the Field
 *
 * url String
 **/
exports.getGenericResponseProfileFieldName = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "response-profile-1-0:field-name": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns the name of the Operation
 *
 * url String
 **/
exports.getGenericResponseProfileOperationName = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "response-profile-1-0:operation-name": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns the Value of the Field
 *
 * url String
 **/
exports.getGenericResponseProfileValue = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "response-profile-1-0:value": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Configures the Value of the Field
 *
 * url String
 * body Responseprofileconfiguration_value_body
 * uuid String
 * no response value expected for this operation
 **/
exports.putGenericResponseProfileValue = async function (url, body, uuid) {
  await fileOperation.writeToDatabaseAsync(url, body, false);
}
