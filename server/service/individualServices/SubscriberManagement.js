const fileOperation = require("onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver");
const notificationManagement = require('./NotificationManagement');

/**
 * Checks if any subscribers with the same target Operation url is found which indicates the same subscriber
 * @param oamPath config path for usecase
 * @param targetOperationUrl url
 * @returns {Promise<boolean>} true if subscriber is found in existing entries
 */
async function checkExistingSubscriberWithSameOperationUrl(oamPath, targetOperationUrl) {
    //check if targetOperationUrl is already contained in an existing entry
    let activeSubscribers = await notificationManagement.getActiveSubscribers(oamPath);

    let foundTargetOperationUrlInExistingSubscribers = false;
    for (let activeSubscriber of activeSubscribers) {
        if (targetOperationUrl === activeSubscriber.targetOperationURL) {
            foundTargetOperationUrlInExistingSubscribers = true;
            break;
        }
    }
    return foundTargetOperationUrlInExistingSubscribers;
}

/**
 * Add a subscriber for device notifications unless the subscriber is already registered for this type of notification
 * @param body  body of service call
 * @param oamPath path to identify use case, for example "notifications/device-alarms"
 * @param user user header from original subscription request
 * @param originator originator header from original subscription request
 * @param xCorrelator x-correlator header from original subscription request
 * @param traceIndicator trace-indicator header from original subscription request
 * @param customerJourney customer-journey header from original subscription request
 * @returns {Promise<Boolean|boolean>} indicates if subscriber was added to database
 */
exports.addDeviceSubscriber = async function (body, oamPath, user, originator, xCorrelator, traceIndicator, customerJourney) {

    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let targetOperationUrl = buildDeviceSubscriberOperationPath(body);

    let foundTargetOperationUrlInExistingSubscribers = await checkExistingSubscriberWithSameOperationUrl(oamPath, targetOperationUrl);

    if (foundTargetOperationUrlInExistingSubscribers === false) {
        //build db entity
        let subscriberEntry = {
            applicationName: subscribingApplicationName,
            applicationRelease: subscribingApplicationRelease,
            targetOperationURL: targetOperationUrl,
            headerUser : user,
            headerOriginator : originator,
            headerXCorrelator: xCorrelator,
            headerTraceIndicator: traceIndicator,
            headerCustomerJourney: customerJourney,
        };

        const subscriberEntryJSONString = JSON.stringify(subscriberEntry);

        //add entry to subscriber list - isAList param always adds current entry to list
        try {
            return await fileOperation.writeToDatabaseAsync(oamPath, subscriberEntryJSONString, true);
        } catch (exception) {
            console.log("error during writing subscribers to config.json: " + exception);
            return false;
        }
    } else {
        console.log("subscriber already subscribed");
        return false;
    }
}

/**
 * Remove a new notification subscription.
 */
function removeDeviceSubscriber(subscriber, oamPath) {

}

/**
 * Builds operation path which is called when a notification is sent to subscribers
 * @param body
 * @returns {string}
 */
function buildDeviceSubscriberOperationPath(body) {

    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    let addressPart;
    if (subscribingApplicationAddress["domain-name"]) {
        addressPart = subscribingApplicationAddress["domain-name"];
    } else {
        //todo handle ipv6?
        addressPart = subscribingApplicationAddress["ip-address"]["ipv-4-address"];
    }

    return subscribingApplicationProtocol
        + "://" + addressPart
        + ":" + subscribingApplicationPort
        + notificationsReceivingOperation;
}
