const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const forwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const logicalTerminationPoint = require("onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint");
const forwardingConstruct = require("onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct");
const fileOperation = require("onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver");
const onfPaths = require("onf-core-model-ap/applicationPattern/onfModel/constants/OnfPaths");
const FcPort = require("onf-core-model-ap/applicationPattern/onfModel/models/FcPort");

/**
 * Deletes all fcPorts (for client LTPs) for application with httpClientUUID. Application LTP must be deleted after this
 * @param httpClientUUID
 * @return {Promise<boolean>}
 */
async function deleteAllFcPortsForApplication(httpClientUUID) {
    try {
        let fcPortPairsForApp = await getAllFcPortsForApplication(httpClientUUID);
        for (const fcPortsForAppElement of fcPortPairsForApp) {
            await forwardingConstruct.deleteFcPortAsync(fcPortsForAppElement.forwardingConstruct.uuid, fcPortsForAppElement.fcPort["local-id"]);
        }
    } catch (exception) {
        console.log("cleaning of FcPorts failed for " + httpClientUUID);
        return false;
    }

    return true;
}

async function getAllFcPortsForApplication(httpClientUuid) {
    let resultFcPortPairings = [];

    //get all uuids of operations for this application
    let opLtpUUIDs = await logicalTerminationPoint.getClientLtpListAsync(httpClientUuid);

    for (const opLtpUUID of opLtpUUIDs) {
        let fcPortPairings = await getAllFcPortsForLtpClient(opLtpUUID);
        for (const fcPortPair of fcPortPairings) {
            //check if entry exists already
            let found = false;
            for (const existingFcPort of resultFcPortPairings) {
                if ((existingFcPort["logical-termination-point"] === fcPortPair.fcPort["logical-termination-point"]) &&
                    (existingFcPort["local-id"] === fcPortPair.fcPort["local-id"])) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                resultFcPortPairings.push(fcPortPair);
            }
        }
    }

    return resultFcPortPairings;
}

/**
 * returns all fc ports for ltp uuid as pairs FcPort/ForwardConstruct
 *
 * @param ltpUuid
 * @return {Promise<*[]>}
 */
async function getAllFcPortsForLtpClient(ltpUuid) {

    let resultFcPortsPairList = [];

    let fcPortPairList = await getAllFcPorts();

    for (const fcPortPair of fcPortPairList) {
        let fcPortLogicalTerminationPoint = fcPortPair.fcPort[onfAttributes.FC_PORT.LOGICAL_TERMINATION_POINT];
        //filter by input ltpUuid
        if (fcPortLogicalTerminationPoint === ltpUuid) {
            resultFcPortsPairList.push(fcPortPair);
        }
    }

    return resultFcPortsPairList;
}

/**
 * @return list of FcPort/ForwardConstruct Pairs
 */
async function getAllFcPorts() {
    let resultFcPortPairList = [];

    let forwardingConstructList = await forwardingDomain.getForwardingConstructListAsync();
    for (let forwardingConstruct of forwardingConstructList) {
        let fcPortList = forwardingConstruct[onfAttributes.FORWARDING_CONSTRUCT.FC_PORT];
        for (let fcPort of fcPortList) {
            resultFcPortPairList.push({fcPort, forwardingConstruct});
        }
    }

    return resultFcPortPairList;
}

/**
 *
 * @param logicalTerminationPointOperationName
 * @param applicationHttpClientUuid
 * @return list of operation LTPs for LTP-name and application
 */
async function getLogicalTerminationPointsAsync(logicalTerminationPointOperationName, applicationHttpClientUuid) {

    let logicalTerminationPointList = await fileOperation.readFromDatabaseAsync(
        onfPaths.LOGICAL_TERMINATION_POINT
    );

    let opLTPList = [];
    for (const ltp of logicalTerminationPointList) {
        //filter by application
        if (ltp[onfAttributes.LOGICAL_TERMINATION_POINT.SERVER_LTP].length > 0 &&
            ltp[onfAttributes.LOGICAL_TERMINATION_POINT.SERVER_LTP][0] === applicationHttpClientUuid) {

            //get operation name if existant
            let operationName = recursiveSearchForKey(ltp, onfAttributes.OPERATION_CLIENT.OPERATION_NAME);
            if (operationName === logicalTerminationPointOperationName) {
                opLTPList.push(ltp);
            }
        }

        // ltp[onfAttributes.LOGICAL_TERMINATION_POINT.LAYER_PROTOCOL] in ltp &&
        // ltp[onfAttributes.LOGICAL_TERMINATION_POINT.LAYER_PROTOCOL][onfAttributes.LAYER_PROTOCOL.OPERATION_CLIENT_INTERFACE_PAC] in ltp &&
        // ltp[onfAttributes.LOGICAL_TERMINATION_POINT.LAYER_PROTOCOL][onfAttributes.LAYER_PROTOCOL.OPERATION_CLIENT_INTERFACE_PAC][onfAttributes.OPERATION_CLIENT.CONFIGURATION] in ltp &&
        // ltp[onfAttributes.LOGICAL_TERMINATION_POINT.LAYER_PROTOCOL][onfAttributes.LAYER_PROTOCOL.OPERATION_CLIENT_INTERFACE_PAC][onfAttributes.OPERATION_CLIENT.CONFIGURATION][onfAttributes.OPERATION_CLIENT.OPERATION_NAME] in ltp &&
        // ltp[onfAttributes.LOGICAL_TERMINATION_POINT.LAYER_PROTOCOL][onfAttributes.LAYER_PROTOCOL.OPERATION_CLIENT_INTERFACE_PAC][onfAttributes.OPERATION_CLIENT.CONFIGURATION][onfAttributes.OPERATION_CLIENT.OPERATION_NAME] === logicalTerminationPointOperationName)
        // {
        //      opLTPList.push(ltp);
        // }
    }

    return opLTPList;
}

function recursiveSearchForKey(obj, targetKey) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (key === targetKey) {
                return obj[key];
            }

            if (typeof obj[key] === 'object') {
                // Recursively search through nested objects
                const result = recursiveSearchForKey(obj[key], targetKey);
                if (result !== undefined) {
                    return result; // Return the result if found in the recursion
                }
            }
        }
    }
}

module.exports = {
    deleteAllFcPortsForApplication,
    getLogicalTerminationPointsAsync
}