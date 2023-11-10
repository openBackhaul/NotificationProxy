const configConstants = require('./ConfigConstants');
const logicalTerminationPointServices = require("onf-core-model-ap/applicationPattern/onfModel/services/LogicalTerminationPointServices");
const LogicalTerminationPointConfigurationInput = require("onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationInput");
const TcpObject = require("onf-core-model-ap/applicationPattern/onfModel/services/models/TcpObject");
const forwardingConstruct = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct");
const forwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const individualServicesOperationsMapping = require('./IndividualServicesOperationsMapping');
const notificationStreamManagement = require('./NotificationStreamManagement');
const fcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const controlConstructUtils = require('./ControlConstructUtil');

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

        let allForwardConstructsToUpdateNames = configConstants.getAllForwardConstructNamesToUpdate();

        //add fcPort for all forwarding constructs that notify subscribers
        for (const allForwardingConstruct of allForwardingConstructs) {
            for (const fcConstructName of allForwardingConstruct.name) {
                if (fcConstructName["value-name"] === "ForwardingName") {
                    let nameOfFC = fcConstructName.value;
                    if (allForwardConstructsToUpdateNames.includes(nameOfFC)) {

                        let forwardingConstructInstance = await forwardingDomain.getForwardingConstructForTheForwardingNameAsync(
                            nameOfFC);

                        let nextFcPortLocalId = fcPort.generateNextLocalId(forwardingConstructInstance);

                        //add PORT_DIRECTION_TYPE_INPUT fcPort - information should be received from controller for forwardConstruct
                        const newFcPort = {
                            "local-id": nextFcPortLocalId,
                            "port-direction": "core-model-1-4:PORT_DIRECTION_TYPE_INPUT",
                            "logical-termination-point": operationUUID
                        };

                        let fcPortExists = forwardingConstruct.isFcPortExists(forwardingConstructInstance, operationUUID);

                        if (fcPortExists === false) {
                            let successFc = await forwardingConstruct.addFcPortAsync(forwardingConstructInstance.uuid, newFcPort);
                            if (!successFc) {
                                console.log("addFcPortAsync failed for operationUUID=" + operationUUID);
                            }
                        }
                    }
                }
            }
        }

        return true;

        // let inputControllerAddress = buildControllerTargetPath(controllerProtocol, controllerAddress, controllerPort);
        //
        // let foundControllerAddressInExistingControllers = await checkExistingControllerWithSameTargetPath(inputControllerAddress);
        //
        // if (foundControllerAddressInExistingControllers === false) {
        //     //build db entity
        //     let controllerEntry = {
        //         controllerName: inputControllerName,
        //         controllerRelease: inputControllerRelease,
        //         controllerAddress: inputControllerAddress,
        //         headerUser: user,
        //         headerOriginator: originator,
        //         headerXCorrelator: xCorrelator,
        //         headerTraceIndicator: traceIndicator,
        //         headerCustomerJourney: customerJourney,
        //     };
        //
        //     const controllerEntryJSONString = JSON.stringify(controllerEntry);
        //
        //     //add entry to controller list - isAList param always adds current entry to list
        //     try {
        //         return await fileOperation.writeToDatabaseAsync(configConstants.OAM_PATH_CONTROLLERS, controllerEntryJSONString, true);
        //     } catch (exception) {
        //         console.log("error during writing controllers to config.json: " + exception);
        //         return false;
        //     }
        // } else {
        //     console.log("controller already registered");
        //     return true;
        // }

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
 */
exports.deregisterController = async function (inputControllerName, inputControllerRelease) {
    try {
        //find controller
        let httpClientUuid = await httpClientInterface.getHttpClientUuidExcludingOldReleaseAndNewRelease(
            inputControllerName, inputControllerRelease, "not used"
        );

        if (httpClientUuid) {
            //stop active notification handling streams for this application
            await notificationStreamManagement.removeAllStreamsForController(inputControllerName, inputControllerRelease);

            //remove all FcPorts still in database for this application
            let success = await controlConstructUtils.deleteAllFcPortsForApplication(httpClientUuid);

            if (!success) {
                throw new Error("FcPort cleaning failed");
            }

            //delete all linked LTPs from config
            await logicalTerminationPointServices.deleteApplicationLtpsAsync(httpClientUuid);
        }

        return true;
    } catch (exception) {
        console.log("deregisterController failed: " + exception + " with name " + inputControllerName);
        return false;
    }
}

// async function checkExistingControllerWithSameTargetPath(controllerAddress) {
//     //check if controllerAddress is already contained in an existing entry
//     let registeredControllers = await notificationManagement.getActiveSubscribers(configConstants.OAM_PATH_CONTROLLERS);
//
//     let foundEquivalentEntry = false;
//     for (let activeController of registeredControllers) {
//         if (controllerAddress === activeController.controllerAddress) {
//             foundEquivalentEntry = true;
//             break;
//         }
//     }
//     return foundEquivalentEntry;
// }