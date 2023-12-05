const configConstants = require("./ConfigConstants");
const logger = require('../LoggingService.js').getLogger();

const callbackCounters = [
    {
        'callback': configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_VALUE_CHANGES,
        'counter': 0,
    },
    {
        'callback': configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_CREATIONS,
        'counter': 0,
    },
    {
        'callback': configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_DELETIONS,
        'counter': 0,
    },
    {
        'callback': configConstants.OAM_PATH_DEVICE_ALARMS,
        'counter': 0,
    },
    {
        'callback': configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS,
        'counter': 0,
    },
    {
        'callback': configConstants.OAM_PATH_DEVICE_OBJECT_DELETIONS,
        'counter': 0,
    },
    {
        'callback': configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES,
        'counter': 0,
    },
];

/**
 * Convert a notification from ODL format to REST notification data.
 * ODL=>ONF or IETF=>ONF
 *
 * @param controllerNotification original message from controller which concerns controllers or device events
 * @param notificationType
 * @param controllerName
 * @param controllerRelease
 * @param eventTime
 * @returns converted Notification, notification in ONF-format for subscribers
 */
exports.convertNotification = function (controllerNotification, notificationType, controllerName, controllerRelease, eventTime) {

    let isDeviceTypeNotification = [
        configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES,
        configConstants.OAM_PATH_DEVICE_OBJECT_DELETIONS,
        configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS,
        configConstants.OAM_PATH_DEVICE_ALARMS
    ].includes(notificationType);

    if (isDeviceTypeNotification) {
        return convertDeviceNotification(controllerNotification, controllerName, controllerRelease, notificationType);
    } else {
        return convertControllerNotificationEvent(controllerNotification, controllerName, controllerRelease, eventTime, notificationType);
    }
}

/**
 * Callbacks
 *  SubscriptionCausesNotifyingOfDeviceAlarms
 *  SubscriptionCausesNotifyingOfChangedDeviceAttributeValue
 *  SubscriptionCausesNotifyingOfDeviceObjectCreation
 *  SubscriptionCausesNotifyingOfDeviceObjectDeletion
 *
 * @param controllerNotification
 * @param controllerName
 * @param controllerRelease
 * @param notificationType
 * @return {{[p: string]: {}}}
 */
function convertDeviceNotification(controllerNotification, controllerName, controllerRelease, notificationType) {

    let innerElement = Object.values(controllerNotification["ietf-restconf:notification"])[0];
    let eventType = Object.keys(controllerNotification["ietf-restconf:notification"])[0].split(':')[1];
    let nodeId = controllerNotification['node-id'];

    let resource = null;
    let objectPath = null;
    if (innerElement["resource"]) {
        resource = innerElement["resource"];
    } else if (innerElement["object-path"]) {
        objectPath = innerElement["object-path"];
    }

    let controlConstruct = "network-control-domain=live/control-construct=" + nodeId;

    let outputResourceString = null;
    if (resource) {
        let indexOfFirstColon = resource.indexOf(":");
        outputResourceString =
            resource.slice(0, indexOfFirstColon + 1) + controlConstruct + resource.slice(indexOfFirstColon + 18);
    } else if (objectPath) {
        let indexOfFirstColon = objectPath.indexOf(":");
        outputResourceString =
            objectPath.slice(0, indexOfFirstColon + 1) + controlConstruct + objectPath.slice(indexOfFirstColon + 18);
    }

    let outputInnerElement = {};

    //copy all sub elements to new object
    outputInnerElement = Object.assign(outputInnerElement, innerElement);

    if (outputResourceString) {
        //override "resource" with new string
        outputInnerElement["resource"] = outputResourceString;
        delete outputInnerElement["object-path"]; //not needed when resource is present
    }

    if (notificationType !== configConstants.OAM_PATH_DEVICE_ALARMS) {
        outputInnerElement["counter"] = innerElement["counter"];
    }

    if (notificationType === configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS) {
        if (innerElement["object-type"]) {
            outputInnerElement["object-type"] = innerElement["object-type"];
        } else {
            outputInnerElement["object-type"] = "";
        }
    }

    let innerLabel = "notification-proxy-1-0:" + eventType;
    let resultNotification = {
        [innerLabel]: outputInnerElement
    };

    return resultNotification;
}

function increaseCounter(notificationType) {

    let searchedItem = null;
    for (const callbackCounter of callbackCounters) {
        if (callbackCounter.callback === notificationType) {
            searchedItem = callbackCounter;
            break;
        }
    }

    if (searchedItem) {
        searchedItem.counter = searchedItem.counter + 1;
        return searchedItem.counter;
    } else {
        return -1;
    }
}

/**
 * conversion of controller notifications
 *  callbacks
 *      SubscriptionCausesNotifyingOfChangedControllerAttributeValue
 *      SubscriptionCausesNotifyingOfControllerObjectCreation
 *      SubscriptionCausesNotifyingOfControllerObjectDeletion
 *
 * fields:
 *  counter
 *      Continuous count of all requests sent by this callback
 *
 *  timestamp
 *      event-time from incoming controller notification
 *
 *  resource
 *      path to the target attribute
 *
 *
 * !changed-value!
 *  attribute-name
 *      name of the concerned attribute
 *
 *  new-value
 *      new value of the attribute
 *
 *
 *  !object-creation!
 *  object-type
 *      name of the new object
 *
 * @param controllerEvent
 * @param controllerName
 * @param controllerRelease
 * @param eventTime
 * @param notificationType
 * @return {{[p: string]: {}}}
 */
function convertControllerNotificationEvent(controllerEvent, controllerName, controllerRelease, eventTime, notificationType) {

    let controllerID = controllerName;
    let path = controllerEvent["path"];
    let nodeIDStartIndex = path.indexOf("node-id");
    let nodeID = path.substring(nodeIDStartIndex + 9, nodeIDStartIndex + 18);

    let dataKey = null;
    let dataValue = null;
    if (controllerEvent["data"]) {
        dataKey = Object.keys(controllerEvent["data"])[0];
        dataValue = Object.values(controllerEvent["data"])[0];
        //if object stringify it
        if (typeof dataValue === 'object') {
            dataValue = JSON.stringify(dataValue);
        } else if (typeof dataValue !== 'string' && !(dataValue instanceof String)) {
            dataValue = String(dataValue);
        }
        dataKey = dataKey.substring(dataKey.lastIndexOf(":") + 1, dataKey.length);
    }

    let controllerTargetPath = null;
    let headerKey = null;

    switch (notificationType) {
        case configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_VALUE_CHANGES:
            controllerTargetPath = "/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration";
            headerKey = "notification-proxy-1-0:attribute-value-changed-notification";
            break;
        case configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_CREATIONS:
            controllerTargetPath = "/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration" + "/" + dataKey;
            headerKey = "notification-proxy-1-0:object-creation-notification";
            break;
        case configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_DELETIONS:
            let lastPartOfPath = path.substring(path.lastIndexOf(":") + 1, path.length);
            controllerTargetPath = "/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration" + "/" + lastPartOfPath;
            headerKey = "notification-proxy-1-0:object-deletion-notification";
            break;
    }

    //build result
    let resourceString = "/core-model-1-4:network-control-domain=live/control-construct=" + controllerID
        + "/logical-termination-point=" + nodeID + controllerTargetPath;

    // let sequenceCounter = notificationStreamManagement.increaseCounter(controllerName, controllerRelease, notificationStreamManagement.STREAM_TYPE_DEVICE);
    let sequenceCounter = increaseCounter(notificationType);

    let innerOutputElement;
    if (dataKey) {
        if (notificationType === configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_CREATIONS) {
            innerOutputElement = {
                "counter": sequenceCounter,
                "timestamp": eventTime,
                "resource": resourceString,
                "object-type": dataKey
            };
        } else {
            innerOutputElement = {
                "counter": sequenceCounter,
                "timestamp": eventTime,
                "resource": resourceString,
                "attribute-name": dataKey,
                "new-value": dataValue
            };
        }
    } else {
        innerOutputElement = {
            "counter": sequenceCounter,
            "timestamp": eventTime,
            "resource": resourceString
        };
    }

    let convertedNotificationWrapper = {
        [headerKey]: innerOutputElement
    };

    return convertedNotificationWrapper;
}

/**
 * produces list of outbound notifications for input notifications with x events
 *
 * @param notification incoming notification as json object
 * @param controllerName
 * @param controllerRelease
 * @return list of notifications to send
 */
exports.convertControllerNotification = function (notification, controllerName, controllerRelease) {
    let notificationsToSend = [];

    if (notification["urn-ietf-params-xml-ns-netconf-notification-1.0:notification"]) {
        let events = notification["urn-ietf-params-xml-ns-netconf-notification-1.0:notification"]["urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification"]["data-change-event"];
        let eventTime = notification["urn-ietf-params-xml-ns-netconf-notification-1.0:notification"]["event-time"];

        for (const event of events) {
            let inboundNotificationType = event["operation"];

            let subscriberNotificationType;
            switch (inboundNotificationType) {
                case "created":
                    subscriberNotificationType = configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_CREATIONS;
                    break;
                case "updated":
                    subscriberNotificationType = configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_VALUE_CHANGES;
                    break;
                case "deleted":
                    subscriberNotificationType = configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_DELETIONS;
                    break;
                default:
                    logger.warn("notificationType unknown: " + inboundNotificationType);
                    break;
            }

            if (subscriberNotificationType) {
                //build one notification for all subscribers
                let notificationMessage = exports.convertNotification(event, subscriberNotificationType, controllerName, controllerRelease, eventTime);

                if (notificationMessage) {
                    let outboundNotification = {
                        "subscriberNotificationType": subscriberNotificationType,
                        "notificationMessage": notificationMessage
                    };

                    notificationsToSend.push(outboundNotification);
                }
            }
        }
    }

    return notificationsToSend;
}

exports.resetAllCounters = function () {
    for (const callbackCounter of callbackCounters) {
        callbackCounter.counter = 0;
    }
}