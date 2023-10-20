'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns application name
 *
 * url String
 * returns inline_response_200_19
 **/
exports.getHttpServerApplicationName = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "http-server-interface-1-0:application-name": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns application purpose
 *
 * url String
 * returns inline_response_200_21
 **/
exports.getHttpServerApplicationPurpose = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "http-server-interface-1-0:application-purpose": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns update period
 *
 * url String
 * returns inline_response_200_22
 **/
exports.getHttpServerDataUpdatePeriode = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "http-server-interface-1-0:data-update-period": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns owner email address
 *
 * url String
 * returns inline_response_200_24
 **/
exports.getHttpServerOwnerEmailAddress = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "http-server-interface-1-0:owner-email-address": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns owner name
 *
 * url String
 * returns inline_response_200_23
 **/
exports.getHttpServerOwnerName = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "http-server-interface-1-0:owner-name": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns list of releases
 *
 * url String
 * returns inline_response_200_25
 **/
exports.getHttpServerReleaseList = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "http-server-interface-1-0:release-list": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns release number
 *
 * url String
 * returns inline_response_200_20
 **/
exports.getHttpServerReleaseNumber = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "http-server-interface-1-0:release-number": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}
