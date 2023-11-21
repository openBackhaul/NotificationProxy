const configConstants = require("./ConfigConstants");
const notificationStreamManagement = require('./NotificationStreamManagement');

/**
 * Convert a notification from ODL format to REST notification data.
 * ODL=>ONF or IETF=>ONF
 *
 * @param controllerNotification original message from controller which concerns controllers or device events
 * @param notificationType
 * @param controllerName
 * @param controllerRelease
 * @returns list of convertedNotifications, notification in ONF-format for subscribers
 */
exports.convertNotification = function (controllerNotification, notificationType, controllerName, controllerRelease) {

    let isDeviceTypeNotification = [
        configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES,
        configConstants.OAM_PATH_DEVICE_OBJECT_DELETIONS,
        configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS,
        configConstants.OAM_PATH_DEVICE_ALARMS
    ].includes(notificationType);

    if (isDeviceTypeNotification) {
        return [convertDeviceNotification(controllerNotification, controllerName, controllerRelease)];
    } else {
        return convertControllerNotification(controllerNotification, notificationType, controllerName, controllerRelease);
    }
}

function convertDeviceNotification(controllerNotification, controllerName, controllerRelease) {

    let innerElement = Object.values(controllerNotification["ietf-restconf:notification"])[0];
    let eventType = Object.keys(controllerNotification["ietf-restconf:notification"])[0].split(':')[1];
    let nodeId = controllerNotification['node-id'];

    let resource = null;
    if (innerElement["resource"]) {
        resource = innerElement["resource"];
    }

    let controlConstruct = "network-control-domain=live/control-construct=" + nodeId;

    let outputResourceString = null;
    if (resource) {
        let indexOfFirstColon = resource.indexOf(":");
        outputResourceString =
            resource.slice(0, indexOfFirstColon + 1) + controlConstruct + resource.slice(indexOfFirstColon + 18);
    }

    let outputInnerElement = {};

    //copy all sub elements to new object
    outputInnerElement = Object.assign(outputInnerElement, innerElement);

    if (outputResourceString) {
        //override "resource" with new string
        outputInnerElement["resource"] = outputResourceString;
    }

    let sequenceCounter = notificationStreamManagement.increaseCounter(controllerName, controllerRelease, notificationStreamManagement.STREAM_TYPE_DEVICE);
    outputInnerElement["counter"] = sequenceCounter;

    let innerLabel = "notification-proxy-1-0:" + eventType;
    let resultNotification = {
        [innerLabel] : outputInnerElement
    };

    return resultNotification;
}

/**
 *
 * @param controllerNotification
 * @param notificationType
 * @param controllerName
 * @param controllerRelease
 * @return list of converted notifications
 */
function convertControllerNotification(controllerNotification, notificationType, controllerName, controllerRelease) {

    let convertedNotificationWrapperList = [];

    let innerElement = controllerNotification["urn-ietf-params-xml-ns-netconf-notification-1.0:notification"];
    let dataChangeEventArray = innerElement["urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification"]["data-change-event"];
    for (const dataChangeEventArrayElement of dataChangeEventArray) {
        let controllerID;
        if (controllerID) {
            controllerID = innerElement["controller-id"];
        } else {
            controllerID = controllerName;
        }
        let path = dataChangeEventArrayElement["path"];
        let nodeIDStartIndex = path.indexOf("node-id");
        let nodeID = path.substring(nodeIDStartIndex + 9, nodeIDStartIndex + 18);
        let eventTime = innerElement["event-time"];

        let dataKey = null;
        let dataValue = null;
        if (dataChangeEventArrayElement["data"]) {
            dataKey = Object.keys(dataChangeEventArrayElement["data"])[0];
            dataValue = Object.values(dataChangeEventArrayElement["data"])[0];
        }

        //build result
        let resourceString = "/core-model-1-4:network-control-domain=live/control-construct=" + controllerID
            + "/logical-termination-point=" + nodeID + "/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status";

        let sequenceCounter = notificationStreamManagement.increaseCounter(controllerName, controllerRelease, notificationStreamManagement.STREAM_TYPE_DEVICE);

        let innerOutputElement;
        if (dataKey) {
            innerOutputElement = {
                "counter" : sequenceCounter,
                "timestamp" : eventTime,
                "resource" : resourceString,
                "attribute-name" : dataKey,
                "new-value" : dataValue,
            };
        } else {
            innerOutputElement = {
                "counter" : sequenceCounter,
                "timestamp" : eventTime,
                "resource" : resourceString
            };
        }

        let convertedNotificationWrapper = {
            "notification-proxy-1-0:attribute-value-changed-notification": innerOutputElement
        };

        convertedNotificationWrapperList.push(convertedNotificationWrapper);
    }


    return convertedNotificationWrapperList;
}
