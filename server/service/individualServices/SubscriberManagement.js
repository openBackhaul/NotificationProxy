const individualServicesOperationsMapping = require('./IndividualServicesOperationsMapping');
const TcpObject = require("onf-core-model-ap/applicationPattern/onfModel/services/models/TcpObject");
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const LogicalTerminationPointConfigurationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationInput');
const logicalTerminationPointServices = require('onf-core-model-ap/applicationPattern/onfModel/services/LogicalTerminationPointServices');
const forwardingDomain = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain");
const forwardingConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct');
const configConstants = require('./ConfigConstants');
const fcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const logger = require('../LoggingService.js').getLogger();

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

        let forwardingName = configConstants.getForwardingName(requestUrl);

        let forwardingConstructInstance = await forwardingDomain.getForwardingConstructForTheForwardingNameAsync(
            forwardingName);

        let fcPortExists = forwardingConstruct.isFcPortExists(forwardingConstructInstance, operationUUID);

        if (fcPortExists === false) {
            let nextFcPortLocalId = fcPort.generateNextLocalId(forwardingConstructInstance);

            //add PORT_DIRECTION_TYPE_OUTPUT fcPort - information should be forwarded to subscriber for forwardConstruct
            const newFcPort = {
                "local-id": nextFcPortLocalId,
                "port-direction": "core-model-1-4:PORT_DIRECTION_TYPE_OUTPUT",
                "logical-termination-point": operationUUID
            };

            await forwardingConstruct.addFcPortAsync(forwardingConstructInstance.uuid, newFcPort);
        }

        return true;
    } catch (exception) {
        logger.error(exception, "error adding subscriber to config");
        return false;
    }
}