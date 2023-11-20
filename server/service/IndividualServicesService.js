'use strict';

const inputValidation = require('./individualServices/InputValidation');
const subscriberManagement = require('./individualServices/SubscriberManagement');
const controllerManagement = require('./individualServices/ControllerManagement');
const notificationManagement = require('./individualServices/NotificationManagement');

/**
 * Creates Tcp-, Http- and OperationClients of additional ODLn from OdlTemplate and adds FcPorts to the FCs of the callbacks section
 *
 * body V1_addcontroller_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.addController = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let controllerName = body["controller-name"];
    let controllerRelease = body["controller-release"];
    let controllerProtocol = body["controller-protocol"];
    let controllerAddress = body["controller-address"];
    let controllerPort = body["controller-port"];

    let validInput = inputValidation.validateControllerRegisterInput(controllerName, controllerRelease, controllerProtocol, controllerAddress, controllerPort);

    if (validInput) {
        let success = await controllerManagement.registerController(
            controllerName, controllerRelease, controllerProtocol, controllerAddress, controllerPort,
            user, originator, xCorrelator, traceIndicator, customerJourney);

        if (!success) {
            throw new Error('addController: registerController failed');
        }
    } else {
        throw new Error('addController: invalid input data');
    }
}


/**
 * Initiates process of embedding a new release
 *
 * body V1_bequeathyourdataanddie_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.bequeathYourDataAndDie = function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(function (resolve, reject) {
        resolve();
    });
}


/**
 * Establishes event streams for controller and device notifications at all ODLn by initiating the callbacks defined by /v1/add-controller
 *
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.listenToControllers = async function (requestUrl, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let success = await notificationManagement.triggerListenToControllerCallbackChain();

    if (!success) {
        throw new Error('listenToControllers: triggerListenToControllerCallbackChain failed');
    }
}


/**
 * Offers subscription for notifications about changes of attributes at the controllers
 *
 * body V1_notifycontrollerattributevaluechanges_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.notifyControllerAttributeValueChanges = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    let validInput = inputValidation.validateSubscriberInput(
        subscribingApplicationName,
        subscribingApplicationRelease,
        subscribingApplicationProtocol,
        subscribingApplicationAddress,
        subscribingApplicationPort,
        notificationsReceivingOperation
    );

    if (validInput) {
        let success = await subscriberManagement.addSubscriberToConfig(requestUrl, subscribingApplicationName, subscribingApplicationRelease, subscribingApplicationProtocol,
            subscribingApplicationAddress, subscribingApplicationPort, notificationsReceivingOperation);

        if (!success) {
            throw new Error('notifyControllerAttributeValueChanges: addSubscriber failed');
        }
    } else {
        throw new Error('notifyControllerAttributeValueChanges: invalid input data');
    }
}


/**
 * Offers subscription for notifications about object creations at the controllers
 *
 * body V1_notifycontrollerobjectcreations_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.notifyControllerObjectCreations = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    let validInput = inputValidation.validateSubscriberInput(
        subscribingApplicationName,
        subscribingApplicationRelease,
        subscribingApplicationProtocol,
        subscribingApplicationAddress,
        subscribingApplicationPort,
        notificationsReceivingOperation
    );

    if (validInput) {
        let success = await subscriberManagement.addSubscriberToConfig(requestUrl, subscribingApplicationName, subscribingApplicationRelease, subscribingApplicationProtocol,
            subscribingApplicationAddress, subscribingApplicationPort, notificationsReceivingOperation);

        if (!success) {
            throw new Error('notifyControllerObjectCreations: addSubscriber failed');
        }
    } else {
        throw new Error('notifyControllerObjectCreations: invalid input data');
    }
}


/**
 * Offers subscription for notifications about object deletions at the controllers
 *
 * body V1_notifycontrollerobjectdeletions_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.notifyControllerObjectDeletions = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    let validInput = inputValidation.validateSubscriberInput(
        subscribingApplicationName,
        subscribingApplicationRelease,
        subscribingApplicationProtocol,
        subscribingApplicationAddress,
        subscribingApplicationPort,
        notificationsReceivingOperation
    );

    if (validInput) {
        let success = await subscriberManagement.addSubscriberToConfig(requestUrl, subscribingApplicationName, subscribingApplicationRelease, subscribingApplicationProtocol,
            subscribingApplicationAddress, subscribingApplicationPort, notificationsReceivingOperation);

        if (!success) {
            throw new Error('notifyControllerObjectCreations: addSubscriber failed');
        }
    } else {
        throw new Error('notifyControllerObjectDeletions: invalid input data');
    }
}

/**
 * Offers subscription for notifications about alarms at the devices
 *
 * body V1_notifydevicealarms_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.notifyDeviceAlarms = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    let validInput = inputValidation.validateSubscriberInput(
        subscribingApplicationName,
        subscribingApplicationRelease,
        subscribingApplicationProtocol,
        subscribingApplicationAddress,
        subscribingApplicationPort,
        notificationsReceivingOperation
    );

    if (validInput) {
        let success = await subscriberManagement.addSubscriberToConfig(requestUrl, subscribingApplicationName, subscribingApplicationRelease, subscribingApplicationProtocol,
            subscribingApplicationAddress, subscribingApplicationPort, notificationsReceivingOperation);

        if (!success) {
            throw new Error('notifyDeviceAlarms: addSubscriber failed');
        }
    } else {
        throw new Error('notifyDeviceAlarms: invalid input data');
    }
}

/**
 * Offers subscription for notifications about changes of attributes at the devices
 *
 * body V1_notifydeviceattributevaluechanges_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.notifyDeviceAttributeValueChanges = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    let validInput = inputValidation.validateSubscriberInput(
        subscribingApplicationName,
        subscribingApplicationRelease,
        subscribingApplicationProtocol,
        subscribingApplicationAddress,
        subscribingApplicationPort,
        notificationsReceivingOperation
    );

    if (validInput) {
        let success = await subscriberManagement.addSubscriberToConfig(requestUrl, subscribingApplicationName, subscribingApplicationRelease, subscribingApplicationProtocol,
            subscribingApplicationAddress, subscribingApplicationPort, notificationsReceivingOperation);

        if (!success) {
            throw new Error('notifyDeviceAttributeValueChanges: addSubscriber failed');
        }
    } else {
        throw new Error('notifyDeviceAttributeValueChanges: invalid input data');
    }
}

/**
 * Offers subscription for notifications about object creations at the devices
 *
 * body V1_notifydeviceobjectcreations_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.notifyDeviceObjectCreations = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    let validInput = inputValidation.validateSubscriberInput(
        subscribingApplicationName,
        subscribingApplicationRelease,
        subscribingApplicationProtocol,
        subscribingApplicationAddress,
        subscribingApplicationPort,
        notificationsReceivingOperation
    );

    if (validInput) {
        let success = await subscriberManagement.addSubscriberToConfig(requestUrl, subscribingApplicationName, subscribingApplicationRelease, subscribingApplicationProtocol,
            subscribingApplicationAddress, subscribingApplicationPort, notificationsReceivingOperation);

        if (!success) {
            throw new Error('notifyDeviceObjectCreations: addSubscriber failed');
        }
    } else {
        throw new Error('notifyDeviceObjectCreations: invalid input data');
    }
}

/**
 * Offers subscription for notifications about object deletions at the devices
 *
 * body V1_notifydeviceobjectdeletions_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.notifyDeviceObjectDeletions = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    let validInput = inputValidation.validateSubscriberInput(
        subscribingApplicationName,
        subscribingApplicationRelease,
        subscribingApplicationProtocol,
        subscribingApplicationAddress,
        subscribingApplicationPort,
        notificationsReceivingOperation
    );

    if (validInput) {
        let success = await subscriberManagement.addSubscriberToConfig(requestUrl, subscribingApplicationName, subscribingApplicationRelease, subscribingApplicationProtocol,
            subscribingApplicationAddress, subscribingApplicationPort, notificationsReceivingOperation);

        if (!success) {
            throw new Error('notifyDeviceObjectDeletions: addSubscriber failed');
        }
    } else {
        throw new Error('notifyDeviceObjectDeletions: invalid input data');
    }
}


/**
 * Removes FcPorts from FCs of the callbacks at /v1/add-controller and deletes Operation-, Http- and TcpClients of ODLn
 *
 * body V1_removecontroller_body
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]'
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.removeController = async function (requestUrl, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
    let controllerName = body["controller-name"];
    let controllerRelease = body["controller-release"];

    let validInput = inputValidation.validateControllerDeRegisterInput(controllerName, controllerRelease);

    if (validInput) {
        let success = await controllerManagement.deregisterController(controllerName, controllerRelease);

        if (!success) {
            throw new Error('removeController: deregisterController failed');
        }
    } else {
        throw new Error('removeController: invalid input data');
    }
}
