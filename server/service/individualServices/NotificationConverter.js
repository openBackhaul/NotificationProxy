const configConstants = require("./ConfigConstants");

/**
 * Convert a notification from ODL format to REST notification data.
 * ODL=>ONF or IETF=>ONF
 *
 * @param controllerNotification original message from controller which concerns controllers or device events
 * @param notificationType
 * @returns convertedNotification notification in ONF-format for subscribers
 */
exports.convertNotification = function (controllerNotification, notificationType) {

    let isDeviceTypeNotification = [
        configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES,
        configConstants.OAM_PATH_DEVICE_OBJECT_DELETIONS,
        configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS,
        configConstants.OAM_PATH_DEVICE_ALARMS
    ].includes(notificationType);

    if (isDeviceTypeNotification) {
        return convertDeviceNotification(controllerNotification);
    } else {
        return convertControllerNotification(controllerNotification, notificationType);
    }
}

function convertDeviceNotification(controllerNotification) {

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

    let innerLabel = "notification-proxy-1-0:" + eventType;
    let resultNotification = {
        [innerLabel] : outputInnerElement
    };

    return resultNotification;
}

function convertControllerNotification(controllerNotification, notificationType) {

    //todo implement

    let message;

    switch (notificationType) {
        case configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_VALUE_CHANGES:
            message = {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 32,
                    "timestamp": "2023-07-11T07:21:50.000Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-1/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                    "attribute-name": "connection-status",
                    "new-value": "connecting"
                }
            };
            break;
        case configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_CREATIONS:
            message = {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 32,
                    "timestamp": "2023-07-11T07:21:50.000Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-1/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/node-id",
                    "object-type": "node-id"
                }
            };
            break;
        case configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_DELETIONS:
            message = {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 13,
                    "timestamp": "2023-07-11T07:21:50.000Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-1/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/node-id"
                }
            };
            break;
        default:
            message = null;
            break;
    }

    return message;
}