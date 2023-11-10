'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns entire data tree
 *
 * returns inline_response_200_4
 **/
exports.getControlConstruct = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync("core-model-1-4:control-construct");
  var response = {};
  response['application/json'] = {
    "core-model-1-4:control-construct": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}

/**
 * Returns entire instance of Profile
 *
 * url String
 * returns inline_response_200_5
 **/
exports.getProfileInstance = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  var response = {};
  response['application/json'] = {
    "core-model-1-4:profile": value
  };
  if (Object.keys(response).length > 0) {
    return response[Object.keys(response)[0]];
  }
}
