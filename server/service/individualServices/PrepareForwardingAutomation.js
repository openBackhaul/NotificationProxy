const prepareALTForwardingAutomation = require('onf-core-model-ap-bs/basicServices/services/PrepareALTForwardingAutomation');

/**
 * Return current runtime data to shut down the MS in preparation for an upgrade.
 * @param logicalTerminationPointconfigurationStatus
 * @returns {Promise<unknown>}
 */
exports.bequeathYourDataAndDie = function (logicalTerminationPointconfigurationStatus) {
  return new Promise(async function (resolve, reject) {
    let forwardingConstructAutomationList = [];
    try {
      /***********************************************************************************
       * forwardings for application layer topology
       ************************************************************************************/
      let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputAsync(
        logicalTerminationPointconfigurationStatus,
        undefined
      );

      if (applicationLayerTopologyForwardingInputList) {
        for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
          let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
          forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
        }
      }

      resolve(forwardingConstructAutomationList);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Process OAM layer request.
 * @param uuid
 * @returns {Promise<unknown>}
 * @constructor
 */
exports.OAMLayerRequest = function (uuid) {
  return new Promise(async function (resolve, reject) {
    let forwardingConstructAutomationList = [];
    try {

      /***********************************************************************************
       * forwardings for application layer topology
       ************************************************************************************/
      let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputForOamRequestAsync(
        uuid
      );

      if (applicationLayerTopologyForwardingInputList) {
        for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
          let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
          forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
        }
      }

      resolve(forwardingConstructAutomationList);
    } catch (error) {
      reject(error);
    }
  });
}
