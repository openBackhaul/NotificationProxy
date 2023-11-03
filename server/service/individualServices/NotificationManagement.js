const fileOperation = require("onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver");
const axios = require('axios');
const executionAndTraceService = require("onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService");
const configConstants = require('./ConfigConstants');
const controllerManagement = require("./ControllerManagement");
const WebSocket = require('ws');
const notificationConverter = require("./NotificationConverter");
// const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const ForwardingDomain = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain");
const logicalTerminationPointServiceOfUtility = require('onf-core-model-ap-bs/basicServices/utility/LogicalTerminationPoint');
const forwardingDomain = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain");
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
// const operationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const controlConstruct = require("onf-core-model-ap/applicationPattern/onfModel/models/ControlConstruct");
const tcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');
const forwardingConstruct = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct");

const NP_SERVER_APP_NAME = "NotificationProxy";
const NP_SERVER_APP_RELEASE_NUMBER = "1.0.0"; //todo get from config?

/**
 * Trigger notification to subscriber with device data
 * @param deviceNotificationType type of device notification
 * @param targetOperationURL target url with endpoint where subscriber expects arrival of notifications
 * @param notificationMessage notification to send
 * @param xCorrelator header field from original subscription request
 * @param traceIndicator header field from original subscription request
 * @param userName header field from original subscription request
 * @param originator header field from original subscription request
 * @param customerJourney header field from original subscription request
 */
async function sendMessageToSubscriber(deviceNotificationType, targetOperationURL, notificationMessage,
                                       xCorrelator, traceIndicator, userName, originator, customerJourney) {

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
    console.log("trying to send notification to: " + targetOperationURL);

    axios.post(targetOperationURL, notificationMessage, {
    // axios.post("http://localhost:1237", notificationMessage, {
        headers: customHeaders
    })
        .then((response) => {
            console.log("result from axios call: " + response.status);

            executionAndTraceService.recordServiceRequestFromClient(
                NP_SERVER_APP_NAME,
                NP_SERVER_APP_RELEASE_NUMBER,
                xCorrelator,
                traceIndicator,
                userName,
                originator,
                deviceNotificationType, //for example "notifications/device-alarms"
                response.status,
                notificationMessage,
                response.data);
        })
        .catch(e => {
            console.log("error during axios call: " + e);

            executionAndTraceService.recordServiceRequestFromClient(
                NP_SERVER_APP_NAME,
                NP_SERVER_APP_RELEASE_NUMBER,
                xCorrelator,
                traceIndicator,
                userName,
                originator,
                deviceNotificationType,
                e.status,
                notificationMessage,
                e.data);
        });
}

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

/**
 * @param oamPath path to subscribers for this use case, for example "notifications/device-alarms"
 * @returns list of subscriber objects or empty array
 */
exports.getActiveSubscribers = async function (oamPath) {

    let allForwardingConstructs = await forwardingDomain.getForwardingConstructListAsync();

    let callbackFilterName = getForwardingName(oamPath);

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
                    let subscriberDataWrapper = {
                        "targetOperationURL" : targetOperationUrl,
                    }
                    subscribersForOamPath.push(subscriberDataWrapper);
                }
            }

            break;
        }
    }

    console.log(subscribersForOamPath);

    return subscribersForOamPath;
}

/**
 * Start controller subscribing chain to receive notifications from streams.
 *
 * @param registeredController
 * @param controllerSubscriptionMode
 * @returns {Promise<void>}
 */
async function registerControllerCallbackChain(registeredController, controllerSubscriptionMode) {

    let controllerAddress = buildControllerTargetPath(registeredController.protocol, registeredController.address, registeredController.port);

    //step 1
    let streamNameForSubscription = await createControllerConfigurationStream(
        controllerAddress,
        controllerSubscriptionMode);

    if (!streamNameForSubscription) {
        throw new Error('registerControllerCallbackChain: createControllerConfigurationStream failed');
    }

    //step 2
    let streamLocation = await subscribeToControllerConfigurationStream(
        controllerAddress,
        streamNameForSubscription,
    );

    if (!streamLocation) {
        throw new Error('registerControllerCallbackChain: subscribeToControllerConfigurationStream failed');
    }

    //step 3
    let subscribeSuccess = await listenToControllerNotifications(
        streamLocation);

    console.log("controller stream establishing success: " + subscribeSuccess);
}

async function registerDeviceCallbackChain(registeredController) {

    let controllerAddress = buildControllerTargetPath(registeredController.protocol, registeredController.address, registeredController.port);

    let controllerTargetUrl = controllerAddress + "/rests/notif/device?notificationType=device";

    let webSocket = new WebSocket(controllerTargetUrl);
    // let webSocket = new WebSocket("http://localhost:1236"); //local testing
    webSocket.on('open', function () {
        console.log('websocket starting listening to stream on ' + controllerTargetUrl)
    });
    webSocket.on('message', function (message) {
        handleDeviceNotification(message);
    });
    webSocket.on('error', function (e) {
        //todo handle error
        console.log('websocket error' + e);
    });
    webSocket.on('close', function () {
        //todo handle closing of stream - retry connection?
        console.log("stream closed");
    });

    //wait for connection
    await new Promise(resolve => webSocket.once('open', resolve()));
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

    let forwardConstructsToStartStreamsFor = controllerManagement.getAllForwardConstructNamesToUpdate();

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

    let uniqueControllerUUIDs = [...new Set(relevantControllersUUIDList)]

    console.log(uniqueControllerUUIDs);

    let controllers = [];
    for (const uniqueControllerUUID of uniqueControllerUUIDs) {
        let operationLTP = await controlConstruct.getLogicalTerminationPointAsync(uniqueControllerUUID);
        let httpUUID = operationLTP['server-ltp'][0];
        let httpLTP = await controlConstruct.getLogicalTerminationPointAsync(httpUUID);
        let tcpUUID = httpLTP['server-ltp'][0];
        let tcpLTP = await controlConstruct.getLogicalTerminationPointAsync(tcpUUID);

        let enumProtocol = tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-protocol'];

        let stringProtocol = tcpClientInterface.getProtocolFromProtocolEnum(enumProtocol)[0];

        // if ()
        let controllerDataWrapper = {
            // "name": httpLTP['layer-protocol'][0]['http-client-interface-1-0:http-client-interface-pac']['http-client-interface-configuration']['application-name'],
            // "release": httpLTP['layer-protocol'][0]['http-client-interface-1-0:http-client-interface-pac']['http-client-interface-configuration']['release-number'],
            "port": tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-port'],
            "address": tcpLTP['layer-protocol'][0]['tcp-client-interface-1-0:tcp-client-interface-pac']['tcp-client-interface-configuration']['remote-address'],
            "protocol": stringProtocol
        }
        controllers.push(controllerDataWrapper);
    }


    let success = true;

    //get all registered controllers
    // let registeredControllers = await controllerManagement.getRegisteredControllers();

    //init callback chain for each controller and register async notification handlers
    for (const registeredController of controllers) {
        //start registering for controller subscriptions (config, operation) and devices in parallel
        let promiseConfig = registerControllerCallbackChain(registeredController, "CONFIGURATION");
        let promiseOperational = registerControllerCallbackChain(registeredController, "OPERATIONAL");
        let promiseDevice = registerDeviceCallbackChain(registeredController);

        try {
            await promiseConfig;
        } catch (exception) {
            console.log("error during registering CONFIGURATION callback: " + exception);
            success = false;
        }

        try {
            await promiseOperational;
        } catch (exception) {
            console.log("error during registering OPERATIONAL callback: " + exception);
            success = false;
        }

        try {
            await promiseDevice;
        } catch (exception) {
            console.log("error during registering DEVICE callback: " + exception);
            success = false;
        }
    }

    if (!success) {
        //todo shutdown all created streams
    }

    return success;
}


//todo duplicate code
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
 * @param controllerAddress
 * @param user original registration header username
 * @param originator original registration header originator
 * @param xCorrelator original registration header correlator
 * @param traceIndicator original registration header trace-indicator
 * @param controllerSubscriptionMode CONFIGURATION or OPERATIONAL
 * @return string: URL for subscription or null
 */
async function createControllerConfigurationStream(controllerAddress,
                                                   // user, originator, xCorrelator, traceIndicator,
                                                   controllerSubscriptionMode) {

    //for example http://{odlAddress}:{odlPort}/rests/operations/sal-remote:create-data-change-event-subscription
    let controllerTargetUrl = controllerAddress + "/rests/operations/sal-remote:create-data-change-event-subscription";

    let payload;
    if (controllerSubscriptionMode === "CONFIGURATION") {
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

    //return streamName from post call
    // return await axios.post("http://localhost:1234", payload, {})
    return await axios.post(controllerTargetUrl, payload, {})
        .then((response) => {
            console.log("result from axios call: " + response.status);

            executionAndTraceService.recordServiceRequestFromClient(
                NP_SERVER_APP_NAME,
                NP_SERVER_APP_RELEASE_NUMBER,
                "", //xCorrelator,
                "", //traceIndicator,
                "", //user,
                "", //originator,
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
                NP_SERVER_APP_NAME,
                NP_SERVER_APP_RELEASE_NUMBER,
                "", //xCorrelator,
                "", //traceIndicator,
                "", //user,
                "", //originator,
                "SubscribeToControllerNotificationsStep1",
                e.status,
                payload,
                e.data);

            return null;
        });
}

/**
 * @param controllerAddress
 * @param streamNameForSubscription
 * @param userName original registration header username
 * @param originator original registration header originator
 * @param xCorrelator original registration header correlator
 * @param traceIndicator original registration header trace-indicator
 * @returns string URL for stream-location or null
 */
async function subscribeToControllerConfigurationStream(
    controllerAddress,
    streamNameForSubscription
    // userName, originator, xCorrelator, traceIndicator
) {

    //for example http://{odlAddress}:{odlPort}/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/{stream-name}
    let controllerTargetUrl =
        controllerAddress + "/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/" + streamNameForSubscription;

    console.log("subscribing to change-event stream of controller with path: " + controllerTargetUrl);

    //return streamLocation from get call
    return await axios.get(controllerTargetUrl, {})
        // return await axios.get("http://localhost:1235" + "/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/" + streamNameForSubscription, {}) //local testing
        .then((response) => {
            console.log("result from axios call: " + response.status);

            executionAndTraceService.recordServiceRequestFromClient(
                NP_SERVER_APP_NAME,
                NP_SERVER_APP_RELEASE_NUMBER,
                "", //xCorrelator,
                "", //traceIndicator,
                "", //userName,
                "", //originator,
                "SubscribeToControllerNotificationsStep2",
                response.status,
                null,
                response.data);

            //todo result in response header field "Location" instead of body?

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
                NP_SERVER_APP_NAME,
                NP_SERVER_APP_RELEASE_NUMBER,
                "", //xCorrelator,
                "", //traceIndicator,
                "", //userName,
                "", //originator,
                "SubscribeToControllerNotificationsStep2",
                e.status,
                null,
                e.data);

            return null;
        });
}


/**
 * Handle inbound controller notification - message about status of controllers
 *
 * @param message inbound notification
 */
function handleControllerNotification(message) {
    let notificationString = message.toString();
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
            notifyAllSubscribers(subscriberNotificationType, notification);
        }
    }
}


/**
 *  Start listening to registered stream for notifications from controllers.
 *
 * Callbacks:
 * PromptForListenToControllersCausesSubscribingForControllerConfigurationNotifications – STEP3
 * PromptForListenToControllersCausesSubscribingForControllerOperationNotifications – STEP3
 *
 * @param userName original registration header username
 * @param originator original registration header originator
 * @param xCorrelator original registration header correlator
 * @param traceIndicator original registration header trace-indicator
 * @param streamLocation stream location URL returned in step 2
 */
async function listenToControllerNotifications(
    // userName, originator, xCorrelator, traceIndicator,
    streamLocation
) {

    console.log("listening to stream for notifications about controller events: " + streamLocation);

    let webSocket = new WebSocket(streamLocation);
    // let webSocket = new WebSocket("http://localhost:1236"); //local testing
    webSocket.on('open', function () {
        console.log('websocket starting listening to stream on ' + streamLocation)
    });
    webSocket.on('message', function (message) {
        handleControllerNotification(message);
    });
    webSocket.on('error', function (e) {
        //todo handle error
        console.log('websocket error' + e);
    });
    webSocket.on('close', function () {
        //todo handle closing of stream - retry connection?
        console.log("stream closed");
    });

    //wait for connection
    await new Promise(resolve => webSocket.once('open', resolve()));
}

/**
 * Handle inbound controller notification - message about status of device
 *
 * @param message inbound notification
 */
function handleDeviceNotification(message) {
    let notificationString = message.toString();
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
            notifyAllSubscribers(subscriberNotificationType, notification);
        }
    }
}

/**
 * Notify subscribers of any NP subscription service of a new controller-notification
 *
 * @param deviceNotificationType type of subscription
 * @param controllerNotification inbound notification from controller
 */
async function notifyAllSubscribers(deviceNotificationType, controllerNotification) {
    let activeSubscribers = await exports.getActiveSubscribers(deviceNotificationType);

    if (activeSubscribers.length > 0) {
        console.log("starting notification of " + activeSubscribers.length + " subscribers of '" + deviceNotificationType + "'");

        //build one notification for all subscribers
        let notificationMessage = notificationConverter.convertNotification(controllerNotification, deviceNotificationType);

        //todo check duplicate notifications

        for (let subscriber of activeSubscribers) {
            sendMessageToSubscriber(deviceNotificationType, subscriber.targetOperationURL, notificationMessage,
                // subscriber.headerXCorrelator,
                // subscriber.headerTraceIndicator,
                // subscriber.headerUser,
                // subscriber.headerOriginator,
                // subscriber.headerCustomerJourney
            );
        }
    }
}


//todo duplicate code
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