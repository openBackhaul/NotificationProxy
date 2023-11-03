const fileOperation = require("onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver");
const notificationManagement = require('./NotificationManagement');
const individualServicesOperationsMapping = require('./IndividualServicesOperationsMapping');
const TcpObject = require("onf-core-model-ap/applicationPattern/onfModel/services/models/TcpObject");
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const LogicalTerminationPointConfigurationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationInput');
const logicalTerminationPointServices = require('onf-core-model-ap/applicationPattern/onfModel/services/LogicalTerminationPointServices');
const forwardingDomain = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain");
const forwardingConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct');

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

 * @param subscribingApplicationName name of application
 * @param subscribingApplicationRelease release of application
 * @param subscribingApplicationProtocol protocol of target address
 * @param subscribingApplicationAddress target address container
 * @param subscribingApplicationPort target address port
 * @param notificationsReceivingOperation target receiving operation url part
 * @param oamPath path to identify use case, for example "notifications/device-alarms"
 * @param user user header from original subscription request
 * @param originator originator header from original subscription request
 * @param xCorrelator x-correlator header from original subscription request
 * @param traceIndicator trace-indicator header from original subscription request
 * @param customerJourney customer-journey header from original subscription request
 * @returns {Promise<Boolean|boolean>} indicates if subscriber was added to database
 */
exports.addSubscriber = async function (subscribingApplicationName,
                                        subscribingApplicationRelease,
                                        subscribingApplicationProtocol,
                                        subscribingApplicationAddress,
                                        subscribingApplicationPort,
                                        notificationsReceivingOperation,
                                        oamPath,
                                        user,
                                        originator,
                                        xCorrelator,
                                        traceIndicator,
                                        customerJourney) {

    let targetOperationUrl = buildDeviceSubscriberOperationPath(
        subscribingApplicationProtocol,
        subscribingApplicationAddress,
        subscribingApplicationPort,
        notificationsReceivingOperation
    );

    let foundTargetOperationUrlInExistingSubscribers = await checkExistingSubscriberWithSameOperationUrl(oamPath, targetOperationUrl);

    if (foundTargetOperationUrlInExistingSubscribers === false) {
        //build db entity
        let subscriberEntry = {
            applicationName: subscribingApplicationName,
            applicationRelease: subscribingApplicationRelease,
            targetOperationURL: targetOperationUrl,
            headerUser: user,
            headerOriginator: originator,
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
        return true;
    }
}

/**
 * Builds operation path which is called when a notification is sent to subscribers
 * @returns {string} target url for callbacks provided by subscriber
 * @param subscribingApplicationProtocol protocol of application
 * @param subscribingApplicationAddress address of application
 * @param subscribingApplicationPort application port
 * @param notificationsReceivingOperation target url operation part
 */
function buildDeviceSubscriberOperationPath(subscribingApplicationProtocol,
                                            subscribingApplicationAddress,
                                            subscribingApplicationPort,
                                            notificationsReceivingOperation) {

    let addressPart;
    if (subscribingApplicationAddress["domain-name"]) {
        addressPart = subscribingApplicationAddress["domain-name"];
    } else {
        addressPart = subscribingApplicationAddress["ip-address"]["ipv-4-address"];
    }

    return subscribingApplicationProtocol
        + "://" + addressPart
        + ":" + subscribingApplicationPort
        + notificationsReceivingOperation;
}

//todo duplicate code
function getForwardingName(requestUrl) {
    switch (requestUrl) {
        case "/v1/notify-controller-attribute-value-changes":
            return "SubscriptionCausesNotifyingOfChangedControllerAttributeValue";
        case "/v1/notify-controller-object-creations":
            return "SubscriptionCausesNotifyingOfControllerObjectCreation";
        case "/v1/notify-controller-object-deletions":
            return "SubscriptionCausesNotifyingOfControllerObjectDeletion";
        case "/v1/notify-device-alarms":
            return "SubscriptionCausesNotifyingOfDeviceAlarms";
        case "/v1/notify-device-attribute-value-changes":
            return "SubscriptionCausesNotifyingOfChangedDeviceAttributeValue";
        case "/v1/notify-device-object-creations":
            return "SubscriptionCausesNotifyingOfDeviceObjectCreation";
        case "/v1/notify-device-object-deletions":
            return "SubscriptionCausesNotifyingOfDeviceObjectDeletion";
    }

    return null;
}

exports.addSubscriberToConfig = async function (requestUrl, subscribingApplicationName, subscribingApplicationRelease, subscribingApplicationProtocol,
                                                subscribingApplicationAddress, subscribingApplicationPort, notificationsReceivingOperation) {


    let operationNamesByAttributes = new Map();
    //for example "/v1/regard-device-alarms"
    operationNamesByAttributes.set(notificationsReceivingOperation, notificationsReceivingOperation);
    // operationNamesByAttributes.set(requestUrl, requestUrl);

    let tcpObjectList = [];
    let tcpObject = new TcpObject(subscribingApplicationProtocol, subscribingApplicationAddress, subscribingApplicationPort);
    tcpObjectList.push(tcpObject);

    let httpClientUuid = await httpClientInterface.getHttpClientUuidExcludingOldReleaseAndNewRelease(
        subscribingApplicationName, subscribingApplicationRelease, "not used"
    );
    let logicalTerminationPointConfigurationInput = new LogicalTerminationPointConfigurationInput(
        httpClientUuid,
        subscribingApplicationName,
        subscribingApplicationRelease,
        tcpObjectList,
        notificationsReceivingOperation, //requestUrl
        operationNamesByAttributes,
        individualServicesOperationsMapping.individualServicesOperationsMapping
    );

    //add forwardingConstructs fcPorts
    try {
        let ltpConfigurationStatus = await logicalTerminationPointServices.createOrUpdateApplicationLtpsAsync(
            logicalTerminationPointConfigurationInput
        );

        let operationUUID = ltpConfigurationStatus.operationClientConfigurationStatusList[0].uuid;

        //todo get by requestUrl or operationName from config
        let forwardingName = getForwardingName(requestUrl);

        let forwardingConstructInstance = await forwardingDomain.getForwardingConstructForTheForwardingNameAsync(
            forwardingName);

        //add PORT_DIRECTION_TYPE_OUTPUT fcPort - information should be forwarded to subscriber for forwardConstruct
        const newFcPort = {
            "local-id": "999", //todo how to generate?
            "port-direction": "core-model-1-4:PORT_DIRECTION_TYPE_OUTPUT",
            "logical-termination-point": operationUUID
        };

        
        await forwardingConstruct.addFcPortAsync(forwardingConstructInstance.uuid, newFcPort);

        return true;
    } catch (exception) {
        console.log(exception);
        return false;
    }
}