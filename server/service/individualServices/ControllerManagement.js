const fileOperation = require("onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver");
const configConstants = require('./ConfigConstants');
const notificationManagement = require("./NotificationManagement");
const logicalTerminationPointServices = require("onf-core-model-ap/applicationPattern/onfModel/services/LogicalTerminationPointServices");
const LogicalTerminationPointConfigurationInput = require("onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationInput");
const TcpObject = require("onf-core-model-ap/applicationPattern/onfModel/services/models/TcpObject");
const forwardingConstruct = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct");
const forwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const individualServicesOperationsMapping = require('./IndividualServicesOperationsMapping');

/**
 * Add a controller which will be source for notifications which can be subscribed to.
 * The same controller can only be registered once.
 *
 * @param inputControllerName name of controller to register
 * @param inputControllerRelease release of controller
 * @param controllerProtocol target url protocol
 * @param controllerAddress address for target url
 * @param controllerPort port for target url
 * @returns {Promise<Boolean|boolean>} indicates if subscriber was added to database
 */
exports.registerController = async function (inputControllerName, inputControllerRelease, controllerProtocol, controllerAddress, controllerPort) {

    try {
        //Creates Tcp-, Http- and OperationClients of additional ODLn from OdlTemplate and adds FcPorts to the FCs of the callbacks section

        let operationNamesByAttributes = new Map();
        //for example "/v1/regard-device-alarms"
        operationNamesByAttributes.set("/v1/add-controller", "/v1/add-controller");

        //todo create from odltemplate?
        //todo create forward operation for 3 notification streams?

        let tcpObjectList = [];
        let tcpObject = new TcpObject(controllerProtocol, controllerAddress, controllerPort);
        tcpObjectList.push(tcpObject);

        let httpClientUuid = await httpClientInterface.getHttpClientUuidExcludingOldReleaseAndNewRelease(
            inputControllerName, inputControllerRelease, "not used"
        );
        let logicalTerminationPointConfigurationInput = new LogicalTerminationPointConfigurationInput(
            httpClientUuid,
            inputControllerName,
            inputControllerRelease,
            tcpObjectList,
            "/v1/add-controller",
            operationNamesByAttributes,
            individualServicesOperationsMapping.individualServicesOperationsMapping
        );
        let ltpConfigurationStatus = await logicalTerminationPointServices.createOrUpdateApplicationLtpsAsync(
            logicalTerminationPointConfigurationInput
        );

        let operationUUID = ltpConfigurationStatus.operationClientConfigurationStatusList[0].uuid;

        //get all forwardConstructs
        let allForwardingConstructs = await forwardingDomain.getForwardingConstructListAsync();

        let allForwardConstructsToUpdateNames = exports.getAllForwardConstructNamesToUpdate();

        //add fcPort for all forwarding constructs that notify subscribers
        for (const allForwardingConstruct of allForwardingConstructs) {
            let nameOfFC = allForwardingConstruct.name[1].value; //TODO filter for "value-name" == "ForwardingName"
            if (allForwardConstructsToUpdateNames.includes(nameOfFC)) {

                let forwardingConstructInstance = await forwardingDomain.getForwardingConstructForTheForwardingNameAsync(
                    nameOfFC);

                //add PORT_DIRECTION_TYPE_INPUT fcPort - information should be received from controller for forwardConstruct
                const newFcPort = {
                    "local-id": "999", //todo how to generate?
                    "port-direction": "core-model-1-4:PORT_DIRECTION_TYPE_INPUT",
                    "logical-termination-point": operationUUID
                };

                // let fcPortExists = forwardingConstruct.isFcPortExists(forwardingConstructInstance, operationUUID);
                //
                // if (!fcPortExists) {
                    let successFc = await forwardingConstruct.addFcPortAsync(forwardingConstructInstance.uuid, newFcPort);
                    if (!successFc) {
                        console.log("addFcPortAsync failed for operationUUID="+operationUUID);
                    }
                // }
            }
        }

        return true;

    } catch (exception) {
        console.log(exception);
        return false;
    }
}


/**
 * Removes a controller.
 *
 * @param inputControllerName name of controller to register
 * @param inputControllerRelease release of controller
 * @param user user header from original subscription request
 * @param originator originator header from original subscription request
 * @param xCorrelator x-correlator header from original subscription request
 * @param traceIndicator trace-indicator header from original subscription request
 * @param customerJourney customer-journey header from original subscription request
 * @returns {Promise<Boolean|boolean>} indicates if subscriber was added to database
 */
exports.deregisterController = async function (inputControllerName, inputControllerRelease,
                                               user, originator, xCorrelator, traceIndicator, customerJourney) {
    return true;
    //TODO only remove one specific controller, not _ALL_ controllers
    // try {
    //     return await fileOperation.deletefromDatabaseAsync(configConstants.OAM_PATH_CONTROLLERS);
    // } catch (exception) {
    //     console.log("error during writing controllers to config.json: " + exception);
    //     return false;
    // }
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

async function checkExistingControllerWithSameTargetPath(controllerAddress) {
    //check if controllerAddress is already contained in an existing entry
    let registeredControllers = await notificationManagement.getActiveSubscribers(configConstants.OAM_PATH_CONTROLLERS);

    let foundEquivalentEntry = false;
    for (let activeController of registeredControllers) {
        if (controllerAddress === activeController.controllerAddress) {
            foundEquivalentEntry = true;
            break;
        }
    }
    return foundEquivalentEntry;
}

exports.getRegisteredControllers = async function () {

    //fetch subscribers from database
    let controllers = await fileOperation.readFromDatabaseAsync(configConstants.OAM_PATH_CONTROLLERS);

    if (controllers) {
        for (let i = 0; i < controllers.length; i++) {
            controllers[i] = JSON.parse(controllers[i])
        }

        return controllers;
    }

    return []; //nothing found
}

//todo move to ConfigConstants.js?
//todo duplicate code
exports.getAllForwardConstructNamesToUpdate = function (){
    return ["SubscriptionCausesNotifyingOfChangedControllerAttributeValue",
        "SubscriptionCausesNotifyingOfControllerObjectCreation",
        "SubscriptionCausesNotifyingOfControllerObjectDeletion",
        "SubscriptionCausesNotifyingOfDeviceAlarms",
        "SubscriptionCausesNotifyingOfChangedDeviceAttributeValue",
        "SubscriptionCausesNotifyingOfDeviceObjectCreation",
        "SubscriptionCausesNotifyingOfDeviceObjectDeletion"
    ];
}