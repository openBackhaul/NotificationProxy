const axios = require('axios');
const notificationManagement = require('./NotificationManagement');
const executionAndTraceService = require("onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService");
const logger = require('../LoggingService.js').getLogger();
const responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');

exports.startPostRequest = async function (targetUrl, payload, operationName, operationKey) {

    let requestHeader = notificationManagement.createRequestHeader();
    let appInformation = notificationManagement.getAppInformation();

    return await axios.post(targetUrl, payload, {
        headers: {
            'x-correlator': requestHeader.xCorrelator,
            'trace-indicator': requestHeader.traceIndicator,
            'user': requestHeader.user,
            'originator': requestHeader.originator,
            'customer-journey': requestHeader.customerJourney,
            'operation-key': operationKey
        }
    })
        .then((response) => {
            logger.debug(operationName + " success. result from axios call: " + response.status);

            executionAndTraceService.recordServiceRequestFromClient(
                appInformation["application-name"],
                appInformation["release-number"],
                requestHeader.xCorrelator,
                requestHeader.traceIndicator,
                requestHeader.user,
                requestHeader.originator,
                operationName,
                response.status,
                payload,
                response.data);

            return true;
        })
        .catch(e => {
            logger.error(e, "error during " + operationName);

            executionAndTraceService.recordServiceRequestFromClient(
                appInformation["application-name"],
                appInformation["release-number"],
                requestHeader.xCorrelator,
                requestHeader.traceIndicator,
                requestHeader.user,
                requestHeader.originator,
                operationName,
                responseCodeEnum.code.INTERNAL_SERVER_ERROR,
                payload,
                e);

            return false;
        });
}