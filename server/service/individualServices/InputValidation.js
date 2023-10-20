/**
 * Check for valid input data for subscribing a device notification.
 * @param body request body
 * @returns true if all mandatory parameters are present
 */
exports.validateDeviceSubscriberInput = function (body)
{
    let validInput;

    let subscribingApplicationName = body["subscribing-application-name"];
    let subscribingApplicationRelease = body["subscribing-application-release"];
    let subscribingApplicationProtocol = body["subscribing-application-protocol"];
    let subscribingApplicationAddress = body["subscribing-application-address"];
    let subscribingApplicationPort = body["subscribing-application-port"];
    let notificationsReceivingOperation = body["notifications-receiving-operation"];

    if (subscribingApplicationName && subscribingApplicationRelease && subscribingApplicationProtocol
        && (subscribingApplicationAddress["ip-address"] || subscribingApplicationAddress["domain-name"])
        && subscribingApplicationPort && notificationsReceivingOperation) {
        validInput = true;
    } else {
        validInput = false;
    }

    return validInput;
}
