'use strict';
const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');


/**
 * Returns client id (Identifier of the application)
 *
 * url String 
 * returns inline_response_200_45
 **/
exports.getKafkaClientClientId = function (url) {
  return new Promise(async function (resolve, reject) {
    var value = await fileOperation.readFromDatabaseAsync(url);
    var response = {};
    response['application/json'] = {
      "kafka-client-interface-1-0:client-id": value
    };
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    }
  });
}


/**
 * Returns life cycle state of the connection towards Kafka
 *
 * url String 
 * returns inline_response_200_48
 **/
exports.getKafkaClientLifeCycleState = function (url) {
  return new Promise(async function (resolve, reject) {
    var value = await fileOperation.readFromDatabaseAsync(url);
    var response = {};
    response['application/json'] = {
      "kafka-client-interface-1-0:life-cycle-state": value
    };
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    }
  });
}


/**
 * Returns operational state of the connection towards Kafka
 *
 * url String 
 * returns inline_response_200_47
 **/
exports.getKafkaClientOperationalState = function (url) {
  return new Promise(async function (resolve, reject) {
    var value = await fileOperation.readFromDatabaseAsync(url);
    var response = {};
    response['application/json'] = {
      "kafka-client-interface-1-0:operational-state": value
    };
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    }
  });
}


/**
 * Returns topic name
 *
 * url String 
 * returns inline_response_200_44
 **/
exports.getKafkaClientTopicName = function (url) {
  return new Promise(async function (resolve, reject) {
    var value = await fileOperation.readFromDatabaseAsync(url);
    var response = {};
    response['application/json'] = {
      "kafka-client-interface-1-0:topic-name": value
    };
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    }
  });
}


/**
 * Configures client id
 *
 * url String
 * body Kafkaclientinterfaceconfiguration_clientId_body
 * no response value expected for this operation
 **/
exports.putKafkaClientClientId = async function (url, body) {
    await fileOperation.writeToDatabaseAsync(url, body, false);
}


/**
 * Configures topic name
 *
 * url String
 * body Kafkaclientinterfaceconfiguration_topicName_body
 * no response value expected for this operation
 **/
exports.putKafkaClientTopicName = async function (url, body) {
    await fileOperation.writeToDatabaseAsync(url, body, false);
}

