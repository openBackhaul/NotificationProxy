const axios = require('axios');
const executionAndTraceService = require("onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService");
const configConstants = require('./ConfigConstants');
const notificationConverter = require("./NotificationConverter");
const forwardingDomain = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain");
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const controlConstruct = require("onf-core-model-ap/applicationPattern/onfModel/models/ControlConstruct");
const tcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');
const notificationStreamManagement = require('./NotificationStreamManagement');
const process = require('process');
const BasicServices = require("onf-core-model-ap-bs/basicServices/BasicServicesService");
const RequestHeader = require("onf-core-model-ap/applicationPattern/rest/client/RequestHeader");
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');

const CONTROLLER_SUB_MODE_CONFIGURATION = "CONFIGURATION";
const CONTROLLER_SUB_MODE_OPERATIONAL = "OPERATIONAL";

let appInformation = null;

/**
 * Query and cache app information from the load file.
 * @returns appInformation with application-name and release-number
 */
async function getAppInformation() {
    if (!appInformation) {
        appInformation = {};

        try {
            appInformation = await BasicServices.informAboutApplication();
        } catch (exception) {
            appInformation["application-name"] = "NotificationProxy";
            appInformation["release-number"] = "1.0.0";
        }
    }

    return appInformation;
}

/**
 * Create a new request header.
 * @returns {RequestHeader}
 */
function createRequestHeader() {
    return new RequestHeader("NotificationProxy", "NotificationProxy", undefined, "1");
}

/**
 * Trigger notification to subscriber with device data
 * @param deviceNotificationType type of device notification
 * @param targetOperationURL target url with endpoint where subscriber expects arrival of notifications
 * @param notificationMessages notifications to send
 * @param operationKey
 */
async function sendMessageToSubscriber(deviceNotificationType, targetOperationURL, operationKey, notificationMessages) {

    //send notification
    console.log("sending subscriber notification to: " + targetOperationURL);

    let appInformation = await getAppInformation();

    let requestHeader = createRequestHeader();

    for (const notificationMessage of notificationMessages) {
        axios.post(targetOperationURL, notificationMessage, {
            // axios.post("http://localhost:1237", notificationMessage, {
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
                console.log("result from axios call: " + response.status);

                executionAndTraceService.recordServiceRequestFromClient(
                    appInformation["application-name"],
                    appInformation["release-number"],
                    requestHeader.xCorrelator,
                    requestHeader.traceIndicator,
                    requestHeader.user,
                    requestHeader.originator,
                    deviceNotificationType, //for example "notifications/device-alarms"
                    response.status,
                    notificationMessage,
                    response.data);
            })
            .catch(e => {
                console.log("error during subscriber-notification for " + deviceNotificationType + ": " + e);

                executionAndTraceService.recordServiceRequestFromClient(
                    appInformation["application-name"],
                    appInformation["release-number"],
                    requestHeader.xCorrelator,
                    requestHeader.traceIndicator,
                    requestHeader.user,
                    requestHeader.originator,
                    deviceNotificationType,
                    responseCodeEnum.code.INTERNAL_SERVER_ERROR,
                    notificationMessage,
                    e);
            });
    }
}

/**
 * @param oamPath path to subscribers for this use case, for example "notifications/device-alarms"
 * @returns list of subscriber objects or empty array
 */
exports.getActiveSubscribers = async function (oamPath) {

    let allForwardingConstructs = await forwardingDomain.getForwardingConstructListAsync();

    let callbackFilterName = configConstants.getForwardingName(oamPath);

    let subscribersForOamPath = [];

    //add fcPort for all forwarding constructs that notify subscribers
    for (const allForwardingConstruct of allForwardingConstructs) {
        let nameOfFC = allForwardingConstruct.name[1].value;
        if (callbackFilterName === nameOfFC) {

            let forwardingConstructInstance = await forwardingDomain.getForwardingConstructForTheForwardingNameAsync(
                nameOfFC);

            for (const singleFcPort of forwardingConstructInstance['fc-port']) {
                if (FcPort.portDirectionEnum.OUTPUT === singleFcPort['port-direction']) {

                    //get http, tcp and operationName of subscriber
                    let operationLTP = await controlConstruct.getLogicalTerminationPointAsync(singleFcPort['logical-termination-point']);
                    let httpUUID = operationLTP['server-ltp'][0];
                    let httpLTP = await controlConstruct.getLogicalTerminationPointAsync(httpUUID);
                    let tcpUUID = httpLTP['server-ltp'][0];
                    let tcpLTP = await controlConstruct.getLogicalTerminationPointAsync(tcpUUID);

                    let enumProtocol = tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-protocol'];
                    let stringProtocol = tcpClientInterface.getProtocolFromProtocolEnum(enumProtocol)[0];

                    let operation = operationLTP['layer-protocol'][0]['operation-client-interface-1-0:operation-client-interface-pac']['operation-client-interface-configuration']['operation-name'];
                    let port = tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-port'];
                    let address = tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-address'];

                    let targetOperationUrl = buildDeviceSubscriberOperationPath(stringProtocol, address, port, operation);
                    let operationKey = operationLTP['layer-protocol'][0]['operation-client-interface-1-0:operation-client-interface-pac']['operation-client-interface-configuration']['operation-key'];

                    let subscriberDataWrapper = {
                        "targetOperationURL": targetOperationUrl,
                        "operationKey": operationKey
                    }
                    subscribersForOamPath.push(subscriberDataWrapper);
                }
            }

            break;
        }
    }

    return subscribersForOamPath;

    // try {
    //     // getOutputFcPortAsync();
    //
    //     let forwardingName = "SubscriptionCausesNotifyingOfDeviceAlarms";
    //     let forwardingConstruct = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(
    //         forwardingName);
    //
    //     //SoftwareUpgrade.getFcPortOutputLogicalTerminationPointList()
    //
    //
    //     let applicationList = await logicalTerminationPointServiceOfUtility.getAllApplicationList(forwardingName);
    //
    //     console.log(applicationList);
    //
    // } catch (exception) {
    //     console.log(exception);
    // }

    // let httpClientUuid2 = await httpClientInterface.getHttpClientUuidExcludingOldReleaseAndNewRelease(subscribingApplicationName, subscribingApplicationRelease, "not used");
    // let operationClientUUID = await operationClientInterface.getOperationClientUuidAsync(httpClientUuid2, operationName);
    // console.log(operationClientUUID);


    //fetch subscribers from database
    // let dbSubscribersArray = await fileOperation.readFromDatabaseAsync(oamPath);
    //
    // if (dbSubscribersArray) {
    //     for (let i = 0; i < dbSubscribersArray.length; i++) {
    //         dbSubscribersArray[i] = JSON.parse(dbSubscribersArray[i])
    //     }
    //
    //     return dbSubscribersArray;
    // }
    //
    // return []; //nothing found
}

/**
 * Start controller subscribing chain to receive notifications from streams.
 *
 * @param registeredController
 * @param controllerSubscriptionMode
 * @returns {Promise<void>}
 */
async function registerControllerCallbackChain(registeredController, controllerSubscriptionMode) {

    let streamType;
    if (controllerSubscriptionMode === CONTROLLER_SUB_MODE_OPERATIONAL) {
        streamType = notificationStreamManagement.STREAM_TYPE_OPERATIONAL;
    } else {
        streamType = notificationStreamManagement.STREAM_TYPE_CONFIGURATION;
    }
    let streamActive = notificationStreamManagement.checkIfStreamIsActive(registeredController, streamType);

    if (streamActive === false) {
        let controllerAddress = buildControllerTargetPath(
            registeredController.protocol,
            registeredController.address,
            registeredController.port
        );

        console.log("starting controller stream step1: " + registeredController.name + " " + controllerSubscriptionMode);

        let user = process.env['CONTROLLER_USER'];
        let password = process.env['CONTROLLER_PASSWORD'];

        //step 1
        let streamNameForSubscription = await createControllerNotificationStream(
            controllerAddress,
            registeredController.operationKey,
            controllerSubscriptionMode,
            user, password
        );

        if (!streamNameForSubscription) {
            throw new Error('registerControllerCallbackChain: createControllerNotificationStream failed');
        }

        console.log("starting controller stream step2: " + registeredController.name + " " + controllerSubscriptionMode);

        //step 2
        let streamLocation = await subscribeToControllerNotificationStream(
            controllerAddress,
            registeredController.operationKey,
            streamNameForSubscription,
            user, password
        );

        if (!streamLocation) {
            throw new Error('registerControllerCallbackChain: subscribeToControllerNotificationStream failed');
        }

        try {
            //step 3
            await listenToControllerNotifications(
                streamLocation,
                registeredController,
                controllerSubscriptionMode,
                user, password);

            console.log("controller stream established");
        } catch (exception) {
            console.log("controller stream establishing failed");
            throw new Error('registerControllerCallbackChain: listenToControllerNotifications failed');
        }
    } else {
        console.log("controller stream for " + registeredController.name + " already active");
    }
}

async function registerDeviceCallbackChain(registeredController) {

    console.log("starting controller device stream: " + registeredController.name);

    let streamActive = notificationStreamManagement.checkIfStreamIsActive(registeredController, notificationStreamManagement.STREAM_TYPE_DEVICE);

    if (streamActive === false) {
        let controllerAddress = buildControllerTargetPath(registeredController.protocol, registeredController.address, registeredController.port);

        //todo get path from config json operation?
        let controllerTargetUrl = controllerAddress + "/rests/notif/device?notificationType=device";
        let user = process.env['DEVICE_USER'];
        let password = process.env['DEVICE_PASSWORD'];

        await notificationStreamManagement.startStream(controllerTargetUrl, registeredController, handleDeviceNotification,
            notificationStreamManagement.STREAM_TYPE_DEVICE, user, password);
    } else {
        console.log("device stream for " + registeredController.name + " already active");
    }
}

async function buildControllerDataWrapper(uniqueControllerUUID) {
    let operationLTP = await controlConstruct.getLogicalTerminationPointAsync(uniqueControllerUUID);
    let httpUUID = operationLTP['server-ltp'][0];
    let httpLTP = await controlConstruct.getLogicalTerminationPointAsync(httpUUID);
    let tcpUUID = httpLTP['server-ltp'][0];
    let tcpLTP = await controlConstruct.getLogicalTerminationPointAsync(tcpUUID);

    let enumProtocol = tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-protocol'];

    let stringProtocol = tcpClientInterface.getProtocolFromProtocolEnum(enumProtocol)[0];

    let operationKey = operationLTP['layer-protocol'][0]['operation-client-interface-1-0:operation-client-interface-pac']['operation-client-interface-configuration']['operation-key'];

    let controllerDataWrapper = {
        "name": httpLTP['layer-protocol'][0]['http-client-interface-1-0:http-client-interface-pac']['http-client-interface-configuration']['application-name'],
        "release": httpLTP['layer-protocol'][0]['http-client-interface-1-0:http-client-interface-pac']['http-client-interface-configuration']['release-number'],
        "port": tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-port'],
        "address": tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-address'],
        "protocol": stringProtocol,
        "operationKey": operationKey
    }
    return controllerDataWrapper;
}

/**
 * Start callback chain to subscribe to controller configurations, controller operations and device notifications
 *
 * PromptForListenToControllersCausesSubscribingForControllerConfigurationNotifications
 * PromptForListenToControllersCausesSubscribingForControllerOperationNotifications
 * PromptForListenToControllersCausesSubscribingForDeviceNotifications
 */
exports.triggerListenToControllerCallbackChain = async function () {

    let allForwardingConstructs = await forwardingDomain.getForwardingConstructListAsync();

    let forwardConstructsToStartStreamsFor = configConstants.getAllForwardConstructNamesToUpdate();

    let relevantControllersUUIDList = [];

    //add fcPort for all forwarding constructs that notify subscribers
    for (const allForwardingConstruct of allForwardingConstructs) {
        let nameOfFC = allForwardingConstruct.name[1].value;
        if (forwardConstructsToStartStreamsFor.includes(nameOfFC)) {
            for (const singleFcPort of allForwardingConstruct["fc-port"]) {
                if (FcPort.portDirectionEnum.INPUT === singleFcPort['port-direction']) {
                    relevantControllersUUIDList.push(singleFcPort['logical-termination-point']);
                }
            }
        }
    }

    let uniqueControllerUUIDs = [...new Set(relevantControllersUUIDList)];

    let controllers = [];
    for (const uniqueControllerUUID of uniqueControllerUUIDs) {
        let controllerDataWrapper = await buildControllerDataWrapper(uniqueControllerUUID);

        //prevent duplicate controllers
        let found = false;
        for (const controllerDataWrapperElement of controllers) {
            if (controllerDataWrapperElement.name === controllerDataWrapper.name &&
                controllerDataWrapperElement.release === controllerDataWrapper.release) {
                found = true;
            }
        }

        if (found === false) {
            controllers.push(controllerDataWrapper);
        }
    }

    let success = true;

    //init callback chain for each controller and register async notification handlers
    for (const registeredController of controllers) {
        console.log("starting establishment of streams for controller: " + registeredController.name);

        //start registering for controller subscriptions (config, operation) and devices in parallel
        let promiseConfig = registerControllerCallbackChain(registeredController, CONTROLLER_SUB_MODE_CONFIGURATION);
        let promiseOperational = registerControllerCallbackChain(registeredController, CONTROLLER_SUB_MODE_OPERATIONAL);
        let promiseDevice = registerDeviceCallbackChain(registeredController);

        try {
            await promiseConfig;
        } catch (exception) {
            console.log("error during registering CONFIGURATION callback: " + exception);
            success = false;
        }

        if (success) {
            try {
                await promiseOperational;
            } catch (exception) {
                console.log("error during registering OPERATIONAL callback: " + exception);
                success = false;
            }
        }

        if (success) {
            try {
                await promiseDevice;
            } catch (exception) {
                console.log("error during registering DEVICE callback: " + exception);
                success = false;
            }
        }

        if (!success) {
            //shutdown all created streams for this controller
            await notificationStreamManagement.removeAllStreamsForController(registeredController.name, registeredController.release);
            console.log("removed streams for controller " + registeredController.name);
        }
    }

    //todo handle fail of any single controller

    return success;
}


function buildControllerTargetPath(controllerProtocol, controllerAddress, controllerPort) {

    let addressPart;
    if (controllerAddress["domain-name"]) {
        addressPart = controllerAddress["domain-name"];
    } else {
        addressPart = controllerAddress["ip-address"]["ipv-4-address"];
    }

    return controllerProtocol
        + "://" + addressPart
        + ":" + controllerPort;
}

/**
 * Callback PromptForListenToControllersCausesSubscribingForControllerConfigurationNotifications – STEP1
 * Request stream-name for configuration subscriptions from controller
 *
 * @param controllerAddress base controller address, {protocol}://{url}:{port}
 * @param operationKey
 * @param controllerSubscriptionMode CONFIGURATION or OPERATIONAL
 * @param user controller login account
 * @param password controller login password
 * @return string: URL for subscription or null
 */
async function createControllerNotificationStream(controllerAddress, operationKey,
                                                  // user, originator, xCorrelator, traceIndicator,
                                                  controllerSubscriptionMode,
                                                  user, password) {

    //todo get path from config json operation?
    //for example http://{odlAddress}:{odlPort}/rests/operations/sal-remote:create-data-change-event-subscription
    let controllerTargetUrl = controllerAddress + "/rests/operations/sal-remote:create-data-change-event-subscription";

    let payload;
    if (controllerSubscriptionMode === CONTROLLER_SUB_MODE_CONFIGURATION) {
        payload = {
            "input": {
                "path": "/network-topology:network-topology",
                "sal-remote-augment:datastore": "CONFIGURATION",
                "sal-remote-augment:scope": "SUBTREE",
                "sal-remote-augment:notification-output-type": "JSON"
            }
        };
    } else {
        //OPERATIONAL
        payload = {
            "input": {
                "path": "/network-topology:network-topology",
                "sal-remote-augment:datastore": "OPERATIONAL",
                "sal-remote-augment:scope": "SUBTREE",
                "sal-remote-augment:notification-output-type": "JSON"
            }
        };
    }


    console.log("creating controller configuration stream on controller: " + controllerTargetUrl);

    let base64encodedData = Buffer.from(user + ':' + password).toString('base64');

    let appInformation = await getAppInformation();

    let requestHeader = createRequestHeader();

    //return streamName from post call
    // return await axios.post("http://localhost:1234", payload, {
    return await axios.post(controllerTargetUrl, payload, {
        headers: {
            'x-correlator': requestHeader.xCorrelator,
            'trace-indicator': requestHeader.traceIndicator,
            'user': requestHeader.user,
            'originator': requestHeader.originator,
            'customer-journey': requestHeader.customerJourney,
            'Authorization': 'Basic ' + base64encodedData
            // 'operation-key': operationKey,
        }
    })
        .then((response) => {
            console.log("result from axios call: " + response.status);

            executionAndTraceService.recordServiceRequestFromClient(
                appInformation["application-name"],
                appInformation["release-number"],
                requestHeader.xCorrelator,
                requestHeader.traceIndicator,
                requestHeader.user,
                requestHeader.originator,
                "SubscribeToControllerNotificationsStep1",
                response.status,
                payload,
                response.data);

            try {
                // for example "{\"sal-remote:output\": {\"stream-name\": \"data-change-event-subscription/network-topology:network-topology/datastore=CONFIGURATION/scope=SUBTREE/JSON\"} }"
                return response.data["sal-remote:output"]["stream-name"];
            } catch (e) {
                console.log("Getting stream-name from payload failed: " + e);
                return null;
            }
        })
        .catch(e => {
            console.log("error during axios call: " + e);
            executionAndTraceService.recordServiceRequestFromClient(
                appInformation["application-name"],
                appInformation["release-number"],
                requestHeader.xCorrelator,
                requestHeader.traceIndicator,
                requestHeader.user,
                requestHeader.originator,
                "SubscribeToControllerNotificationsStep1",
                responseCodeEnum.code.INTERNAL_SERVER_ERROR,
                payload,
                e);

            return null;
        });
}

/**
 * @param controllerAddress
 * @param operationKey
 * @param streamNameForSubscription
 * @param user controller login account
 * @param password controller login password
 * @returns string URL for stream-location or null
 */
async function subscribeToControllerNotificationStream(
    controllerAddress,
    operationKey,
    streamNameForSubscription,
    user,
    password
    // userName, originator, xCorrelator, traceIndicator
) {

    //todo get path from config json operation?
    //for example http://{odlAddress}:{odlPort}/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/{stream-name}
    let controllerTargetUrl =
        controllerAddress + "/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/" + streamNameForSubscription;

    console.log("subscribing to change-event stream of controller with path: " + controllerTargetUrl);

    let base64encodedData = Buffer.from(user + ':' + password).toString('base64');

    let appInformation = await getAppInformation();

    let requestHeader = createRequestHeader();

    //return streamLocation from get call
    // return await axios.get("http://localhost:1235" + "/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/" + streamNameForSubscription, { //local testing
    return await axios.get(controllerTargetUrl, {
        headers: {
            'x-correlator': requestHeader.xCorrelator,
            'trace-indicator': requestHeader.traceIndicator,
            'user': requestHeader.user,
            'originator': requestHeader.originator,
            'customer-journey': requestHeader.customerJourney,
            'Authorization': 'Basic ' + base64encodedData
        }
    })
        .then((response) => {
            console.log("result from axios call: " + response.status);

            executionAndTraceService.recordServiceRequestFromClient(
                appInformation["application-name"],
                appInformation["release-number"],
                requestHeader.xCorrelator,
                requestHeader.traceIndicator,
                requestHeader.user,
                requestHeader.originator,
                "SubscribeToControllerNotificationsStep2",
                response.status,
                null,
                response.data);

            try {
                // for example "{subscribe-to-notification:location": "/rests/notif/data-change-event-subscription/network-topology:network-topology/datastore=CONFIGURATION/scope=SUBTREE/JSON"}"
                return response.data["subscribe-to-notification:location"];
            } catch (e) {
                console.log("Getting stream-name from payload failed: " + e);
                return null;
            }
        })
        .catch(e => {
            console.log("error during axios call: " + e);
            executionAndTraceService.recordServiceRequestFromClient(
                appInformation["application-name"],
                appInformation["release-number"],
                requestHeader.xCorrelator,
                requestHeader.traceIndicator,
                requestHeader.user,
                requestHeader.originator,
                "SubscribeToControllerNotificationsStep2",
                responseCodeEnum.code.INTERNAL_SERVER_ERROR,
                null,
                e);

            return null;
        });
}


/**
 * Handle inbound controller notification - message about status of controllers
 *
 * @param message inbound notification
 * @param controllerName
 * @param controllerRelease
 */
function handleControllerNotification(message, controllerName, controllerRelease) {
    let notificationString = message.toString();
    try {
        let notification = JSON.parse(notificationString);

        if (notification["urn-ietf-params-xml-ns-netconf-notification-1.0:notification"]) {
            let inboundNotificationType = notification["urn-ietf-params-xml-ns-netconf-notification-1.0:notification"]["urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification"]["data-change-event"][0]["operation"];

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
                    console.log("notificationType unknown: " + inboundNotificationType);
                    break;
            }

            if (subscriberNotificationType) {
                notifyAllSubscribers(subscriberNotificationType, notification, controllerName, controllerRelease);
            }
        }
    } catch (exception) {
        console.log("count not parse notification - not json: '" + notificationString + "'")
    }
}


/**
 *  Start listening to registered stream for notifications from controllers.
 *
 * Callbacks:
 * PromptForListenToControllersCausesSubscribingForControllerConfigurationNotifications – STEP3
 * PromptForListenToControllersCausesSubscribingForControllerOperationNotifications – STEP3
 *
 * @param streamLocation stream location URL returned in step 2
 * @param registeredController
 * @param controllerSubscriptionMode
 * @param user
 * @param password
 */
async function listenToControllerNotifications(streamLocation, registeredController, controllerSubscriptionMode, user, password) {

    let streamType;
    if (controllerSubscriptionMode === CONTROLLER_SUB_MODE_CONFIGURATION) {
        streamType = notificationStreamManagement.STREAM_TYPE_CONFIGURATION;
    } else {
        streamType = notificationStreamManagement.STREAM_TYPE_OPERATIONAL;
    }

    await notificationStreamManagement.startStream(streamLocation, registeredController, handleControllerNotification,
        streamType, user, password);
}

/**
 * Handle inbound controller notification - message about status of device
 *
 * @param message inbound notification
 * @param controllerName
 * @param controllerRelease
 */
function handleDeviceNotification(message, controllerName, controllerRelease) {
    let notificationString = message.toString();
    try {
        let notification = JSON.parse(notificationString);

        if (notification["ietf-restconf:notification"]) {
            //get first key of sub-object
            let inboundNotificationTypeRaw = Object.keys(notification["ietf-restconf:notification"])[0];

            let subscriberNotificationType = null;
            if (inboundNotificationTypeRaw.includes("alarm-event-notification")) {
                subscriberNotificationType = configConstants.OAM_PATH_DEVICE_ALARMS;
            } else if (inboundNotificationTypeRaw.includes("attribute-value-changed-notification")) {
                subscriberNotificationType = configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES;
            } else if (inboundNotificationTypeRaw.includes("object-creation-notification")) {
                subscriberNotificationType = configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS;
            } else if (inboundNotificationTypeRaw.includes("object-deletion-notification")) {
                subscriberNotificationType = configConstants.OAM_PATH_DEVICE_OBJECT_DELETIONS;
            } else {
                console.log("notificationType unknown: " + inboundNotificationTypeRaw);
            }

            if (subscriberNotificationType) {
                notifyAllSubscribers(subscriberNotificationType, notification, controllerName, controllerRelease);
            }
        }
    } catch (exception) {
        console.log("count not parse notification - not json: '" + notificationString + "'")
    }
}

/**
 * Notify subscribers of any NP subscription service of a new controller-notification
 *
 * @param deviceNotificationType type of subscription
 * @param controllerNotification inbound notification from controller
 * @param controllerName
 * @param controllerRelease
 */
async function notifyAllSubscribers(deviceNotificationType, controllerNotification, controllerName, controllerRelease) {
    let activeSubscribers = await exports.getActiveSubscribers(deviceNotificationType);

    if (activeSubscribers.length > 0) {
        console.log("starting notification of " + activeSubscribers.length + " subscribers of '" + deviceNotificationType + "'");

        //build one notification for all subscribers
        let notificationMessages = notificationConverter.convertNotification(controllerNotification, deviceNotificationType, controllerName, controllerRelease);

        //todo check duplicate notifications

        for (let subscriber of activeSubscribers) {
            sendMessageToSubscriber(deviceNotificationType, subscriber.targetOperationURL, subscriber.operationKey, notificationMessages);
        }
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
