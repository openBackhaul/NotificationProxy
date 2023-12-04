const notificationManagement = require("./NotificationManagement");
const controllerManagement = require("./ControllerManagement");
const configConstants = require("./ConfigConstants");
const controlConstructUtils = require("./ControlConstructUtil");
const TcpObject = require("onf-core-model-ap/applicationPattern/onfModel/services/models/TcpObject");
const LogicalTerminationPointConfigurationInput = require("onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationInput");
const logicalTerminationPointServices = require("onf-core-model-ap/applicationPattern/onfModel/services/LogicalTerminationPointServices");
const restClient = require('./RestClient');
const individualServicesOperationsMapping = require('./IndividualServicesOperationsMapping');

async function addControllersToNewRelease(appAddress, appPort) {
    //PromptForBequeathingDataCausesControllerClientsBeingTransferredToNR

    //get all controllers
    let uniqueControllerUUIDs = await controllerManagement.findRelevantControllers();
    let dataForControllers = await controllerManagement.fetchControllerData(uniqueControllerUUIDs);
    for (const dataForController of dataForControllers) {
        //start add-controller call for all registered controllers

        let notificationMessage = {
            "controller-name": dataForController.name,
            "controller-release": dataForController.release,
            "controller-protocol": dataForController.protocol,
            "controller-address": dataForController.address,
            "controller-port": dataForController.port
        };

        let targetAddControllerURL = notificationManagement.buildControllerTargetPath("http", appAddress, appPort) + configConstants.OAM_PATH_ADD_CONTROLLERS;
        restClient.startPostRequest(targetAddControllerURL, notificationMessage, configConstants.OAM_PATH_ADD_CONTROLLERS);
    }
}

async function addSubscribersToNewRelease(appAddress, appPort) {

    let subscriberNotificationTypes = [
        configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_VALUE_CHANGES,
        configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_CREATIONS,
        configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_OBJECT_DELETIONS,
        configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES,
        configConstants.OAM_PATH_DEVICE_OBJECT_DELETIONS,
        configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS,
        configConstants.OAM_PATH_DEVICE_ALARMS
    ];

    for (const subscriberNotificationType of subscriberNotificationTypes) {
        let activeSubscribers = await notificationManagement.getActiveSubscribers(subscriberNotificationType);

        for (const activeSubscriber of activeSubscribers) {

            let notificationMessage = {
                "subscribing-application-name": activeSubscriber.name,
                "subscribing-application-release": activeSubscriber.release,
                "subscribing-application-protocol": activeSubscriber.protocol,
                "subscribing-application-address": activeSubscriber.address,
                "subscribing-application-port": activeSubscriber.port,
                "notifications-receiving-operation": activeSubscriber.operationName
            };

            let targetNewReleaseURL = notificationManagement.buildControllerTargetPath("http", appAddress, appPort) + subscriberNotificationType;
            restClient.startPostRequest(targetNewReleaseURL, notificationMessage, subscriberNotificationType);
        }
    }
}

function triggerListenToControllersOnNewRelease(appAddress, appPort) {
    //PromptForBequeathingDataCausesNRbeingRequestedToListenToControllers

    let targetListenToControllerURL = notificationManagement.buildControllerTargetPath("http", appAddress, appPort) + configConstants.OAM_PATH_LISTEN_TO_CONTROLLERS;
    restClient.startPostRequest(targetListenToControllerURL, null, configConstants.OAM_PATH_LISTEN_TO_CONTROLLERS);
}

async function broadcastInfoAboutServerReplacement(appInformation, appName, appRelease, appAddress, appPort) {
    //PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement

    let targetAddressWrapperServerReplacement = await controlConstructUtils.getForwardingConstructOutputOperationData("PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement");

    let serverReplacementMessage = {
        "current-application-name": appInformation["application-name"],
        "current-release-number": appInformation["release-number"],
        "future-application-name": appName,
        "future-release-number": appRelease,
        "future-protocol": "HTTP",
        "future-address": appAddress,
        "future-port": appPort
    };

    let targetAppUrlServerReplacement = notificationManagement.buildControllerTargetPath(targetAddressWrapperServerReplacement.protocol, targetAddressWrapperServerReplacement.address, targetAddressWrapperServerReplacement.port) + targetAddressWrapperServerReplacement.operationName;
    restClient.startPostRequest(targetAppUrlServerReplacement, serverReplacementMessage, targetAddressWrapperServerReplacement.operationName);
}

async function triggerDeregisterOfOldRelease(appInformation) {
    //PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease

    let targetAddressWrapperDeregister = await controlConstructUtils.getForwardingConstructOutputOperationData("PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease");

    let deregisterNotification = {
        "application-name": appInformation["application-name"],
        "release-number": appInformation["release-number"]
    };

    let targetDeregisterApplicationURL = notificationManagement.buildControllerTargetPath(targetAddressWrapperDeregister.protocol, targetAddressWrapperDeregister.address, targetAddressWrapperDeregister.port) + targetAddressWrapperDeregister.operationName;
    restClient.startPostRequest(targetDeregisterApplicationURL, deregisterNotification, targetAddressWrapperDeregister.operationName);
}

async function broadcastOfBackwardCompatibleOperationUpdates() {
    //PromptingNewReleaseForUpdatingServerCausesRequestForBroadcastingInfoAboutBackwardCompatibleUpdateOfOperation
}

exports.handleRequest = async function (body, requestUrl) {

    let appName = body["new-application-name"];
    let appRelease = body["new-application-release"];
    let appAddress = body["new-application-address"];
    let appPort = body["new-application-port"];

    await addNewReleaseInfoToConfig(appName, appRelease, appAddress, appPort, requestUrl);

    let appInformation = notificationManagement.getAppInformation();

    await addControllersToNewRelease(appAddress, appPort);

    await addSubscribersToNewRelease(appAddress, appPort);

    triggerListenToControllersOnNewRelease(appAddress, appPort);

    await broadcastInfoAboutServerReplacement(appInformation, appName, appRelease, appAddress, appPort);

    await triggerDeregisterOfOldRelease(appInformation);

    await broadcastOfBackwardCompatibleOperationUpdates();

    //todo handle errors - when any one fails - stop executing the others
}

async function addNewReleaseInfoToConfig(appName, appRelease, appAddress, appPort, requestUrl) {

    //update name, release, address and port of "NewRelease"
    let newReleaseHttpAndTcpUUID = await controlConstructUtils.getHttpAndTcpUUIDForNewRelease();
    let newReleaseHttpUUID = newReleaseHttpAndTcpUUID["httpClientUuid"];

    let operationNamesByAttributes = new Map();

    let tcpServerList = [new TcpObject("HTTP", appAddress, appPort)];

    let ltpConfigurationInput = new LogicalTerminationPointConfigurationInput(
        newReleaseHttpUUID,
        appName,
        appRelease,
        tcpServerList,
        requestUrl,
        operationNamesByAttributes,
        individualServicesOperationsMapping.individualServicesOperationsMapping
    );
    await logicalTerminationPointServices.createOrUpdateApplicationLtpsAsync(
        ltpConfigurationInput, false
    );
}