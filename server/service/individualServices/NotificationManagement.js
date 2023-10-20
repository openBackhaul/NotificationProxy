const fileOperation = require("onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver");
const axios = require('axios');
const executionAndTraceService = require("onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService");

const NP_SERVER_APP_NAME = "NotificationProxy";
const NP_SERVER_APP_RELEASE_NUMBER = "0.1";
const NP_DEVICE_ALARM_OPERATION_NAME = "notifyDeviceAlarmSubscriber";

///// MOCK START

//todo remove mock when notification handle logic is in place

const customWaitMs = ms => new Promise(resolve => setTimeout(resolve, ms))

//mock background process for sending notifications in regular intervals
new Promise(async (resolve, reject) => {
    //run indefinitely
    for (; ;) {
        await customWaitMs(10000);

        let notificationSendingEnabled = await fileOperation.readFromDatabaseAsync("notifications/background-notification-job-enabled");
        if (notificationSendingEnabled) {
            console.log("check for active subscribers");

            let activeSubscribers = await exports.getActiveSubscribers("notifications/device-alarms");

            let notificationMessage = null;
            if (activeSubscribers.length > 0) {
                //build one notification for all subscribers
                notificationMessage = buildSubscriberNotification();
            }

            for (let i = 0; i < activeSubscribers.length; i++) {
                let subscriber = activeSubscribers[i];
                sendAlarmMessageToSubscriber(subscriber.targetOperationURL, notificationMessage,
                    subscriber.headerXCorrelator, subscriber.headerTraceIndicator, subscriber.headerUser, subscriber.headerOriginator, subscriber.headerCustomerJourney);
            }
        }
    }
});

//// MOCK END

function checkApplicableNotifications() {
    //todo filter notifications by use case
}

function openNotificationStream(url) {
    //todo open stream and handle notifications from controller
}

/**
 * Trigger notification to subscriber with alarm data
 * @param targetOperationURL target url with endpoint where subscriber expects arrival of notifications
 * @param notificationMessage notification to send
 * @param xCorrelator header field from original subscription request
 * @param traceIndicator header field from original subscription request
 * @param userName header field from original subscription request
 * @param originator header field from original subscription request
 */
function sendAlarmMessageToSubscriber(targetOperationURL, notificationMessage, xCorrelator, traceIndicator, userName, originator, customerJourney) {
    //todo handle all notification-types?

    //add standard headers
    const customHeaders = {
        'Content-Type': 'application/json',
        'user': userName,
        'originator': originator,
        'x-correlator': xCorrelator,
        'trace-indicator': traceIndicator,
        'customer-journey': customerJourney,
    }

    //send notification
    console.log("trying to send alarm notification to: " + targetOperationURL);
    axios.post(targetOperationURL, notificationMessage, {
        headers: customHeaders
    })
        .then((response) => {
            console.log("result from axios call: " + response.status);

            executionAndTraceService.recordServiceRequestFromClient(
                NP_SERVER_APP_NAME, NP_SERVER_APP_RELEASE_NUMBER,
                xCorrelator, traceIndicator, userName, originator,
                NP_DEVICE_ALARM_OPERATION_NAME, response.status, notificationMessage, response.data);
        }).catch(e => console.log("error during axios call: " + e));

    console.log("device alarm sent");
}

/**
 * @param oamPath path to subscribers for this use case, for example "notifications/device-alarms"
 * @returns list of subscriber objects or empty array
 */
exports.getActiveSubscribers = async function (oamPath) {

    //fetch subscribers from database
    let dbSubscribersArray = await fileOperation.readFromDatabaseAsync(oamPath);

    if (dbSubscribersArray) {
        for (let i = 0; i < dbSubscribersArray.length; i++) {
            dbSubscribersArray[i] = JSON.parse(dbSubscribersArray[i])
        }

        return dbSubscribersArray;
    }

    return []; //nothing found
}

function buildSubscriberNotification() {
    //todo build real notification data from controller notifications
    return {
        "notification-proxy-1-0:alarm-event-notification": {
            "alarm-event-sequence-number": 1,
            "timestamp": "2023-10-18T07:45:02.000Z",
            "resource": "/core-model-1-4:network-control-domain=live/control-construct=513250009/logical-termination-point=LTP-MWPS-TTP-RADIO-1A/layer-protocol=LP-MWPS-TTP-RADIO-1A/air-interface-2-0:air-interface-pac",
            "alarm-type-id": "siae-alarms-1-0:radioEquipLinkTelemetryFailAlarm",
            "alarm-type-qualifier": "",
            "problem-severity": "major"
        }
    };
}
