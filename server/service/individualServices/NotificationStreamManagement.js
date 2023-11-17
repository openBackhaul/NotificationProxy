const EventSource = require('eventsource');
const process = require('process');
const http = require('http');

const controllerNotificationStreams = [];

const STREAM_TYPE_CONFIGURATION = "CONFIGURATION";
const STREAM_TYPE_OPERATIONAL = "OPERATIONAL";
const STREAM_TYPE_DEVICE = "DEVICE";

function addStreamItem(registeredController, eventSource, streamType) {

    let key = registeredController.name + "-" + registeredController.release + '-' + streamType;

    let notificationStreamItem = {
        'controllerKey': key,
        'eventSource': eventSource
    }

    controllerNotificationStreams.push(notificationStreamItem);

    let logString = "";
    for (const controllerNotificationStream of controllerNotificationStreams) {
        logString += controllerNotificationStream.controllerKey + ",";
    }

    console.log("notification streams after adding: " + logString);
}

/**
 *
 * @param applicationName
 * @param applicationRelease
 * @param streamType CONFIGURATION, OPERATIONAL or DEVICE
 * @return {Promise<void>}
 */
async function removeStreamItem(applicationName, applicationRelease, streamType) {

    let key = applicationName + "-" + applicationRelease + "-" + streamType;

    //get by key
    let openStreamEventSource = null;
    for (const controllerNotificationStreamItem of controllerNotificationStreams) {
        if (controllerNotificationStreamItem.controllerKey === key) {
            openStreamEventSource = controllerNotificationStreamItem.eventSource;
            break;
        }
    }

    if (openStreamEventSource) {
        //kill open streams
        await openStreamEventSource.close();

        //remove from managed list
        removeItemAll(controllerNotificationStreams, openStreamEventSource);
    }

    console.log("removed stream item for " + key);
}

async function removeAllStreamsForController(applicationName, applicationRelease) {

    await removeStreamItem(applicationName, applicationRelease, STREAM_TYPE_CONFIGURATION);
    await removeStreamItem(applicationName, applicationRelease, STREAM_TYPE_OPERATIONAL);
    await removeStreamItem(applicationName, applicationRelease, STREAM_TYPE_DEVICE);
}

async function startStream(controllerTargetUrl, registeredController, handleFunction, streamType, user, password) {

    // controllerTargetUrl = "http://localhost:1500"; //local test

    let base64encodedData = Buffer.from(user + ':' + password).toString('base64');

    console.log("starting eventsource " + controllerTargetUrl);

    const eventSource = new EventSource(controllerTargetUrl, {
        withCredentials: true,
        headers: {
            'Authorization': 'Basic ' + base64encodedData,
        }
    });

    eventSource.onopen = (event) => {
        console.log("listening to stream for notifications: " + controllerTargetUrl);
    };

    eventSource.onmessage = (event) => {
        console.log("received event: " + event.data);
        handleFunction(event.data);
    };

    eventSource.onerror = (err) => {
        console.error("EventSource failed: ", err);
    };

    eventSource.onclose = (event) => {
        console.error("EventSource closed");
    };

    //add to global list of open eventSources
    addStreamItem(registeredController, eventSource, streamType);
}

function checkIfStreamIsActive(registeredController, streamType) {

    let key = registeredController.name + "-" + registeredController.release + "-" + streamType;

    for (const controllerNotificationStream of controllerNotificationStreams) {
        if (controllerNotificationStream.controllerKey === key) {
            return true;
        }
    }

    return false;
}

/**
 * remove all instances of value from array
 * @param array
 * @param value
 * @return modified array
 */
function removeItemAll(array, value) {
    let i = 0;
    while (i < array.length) {
        if (array[i] === value) {
            array.splice(i, 1);
        } else {
            ++i;
        }
    }
    return array;
}

module.exports = {
    STREAM_TYPE_CONFIGURATION,
    STREAM_TYPE_OPERATIONAL,
    STREAM_TYPE_DEVICE,

    startStream,
    removeAllStreamsForController,
    checkIfStreamIsActive
}
