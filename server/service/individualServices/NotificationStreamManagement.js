const EventSource = require('eventsource');
const process = require('process');
const http = require('http');

const controllerNotificationStreams = [];

const STREAM_TYPE_CONFIGURATION = "CONFIGURATION";
const STREAM_TYPE_OPERATIONAL = "OPERATIONAL";
const STREAM_TYPE_DEVICE = "DEVICE";

/**
 *
 * @param name
 * @param release
 * @param eventSource object to manage SSE stream with
 * @param streamType type of stream - DEVICE, OPERATIONAL or CONFIGURATION
 */
function addStreamItem(name, release, eventSource, streamType) {

    let key = name + "-" + release + '-' + streamType;

    let notificationStreamItem = {
        'controllerKey': key,
        'eventSource': eventSource,
        'counter' : 0,
    }

    controllerNotificationStreams.push(notificationStreamItem);

    let logString = "";
    for (const controllerNotificationStream of controllerNotificationStreams) {
        logString += controllerNotificationStream.controllerKey + ", ";
    }

    console.log("notification streams after adding: " + logString);
}

/**
 * increase call counter for stream.
 * @param name
 * @param release
 * @param streamType
 * @return counter number or -1 when stream not found
 */
function increaseCounter(name, release, streamType) {

    //get by key
    let element = retrieveElement(name, release, streamType);
    if (element) {
        element.counter = element.counter + 1;
        return element.counter;
    } else {
        console.log("no stream found to increase counter for: " + name);
        return -1;
    }
}

/**
 * search established streams for element with name, release and streamType
 *
 * @param name  controller name
 * @param release controller release
 * @param streamType DEVICE, CONFIGURATION or OPERATIONAL
 * @return stream wrapper or null
 */
function retrieveElement(name, release, streamType) {

    let key = name + "-" + release + "-" + streamType;

    let searchedItem = null;
    for (const controllerNotificationStreamItem of controllerNotificationStreams) {
        if (controllerNotificationStreamItem.controllerKey === key) {
            searchedItem = controllerNotificationStreamItem;
            break;
        }
    }
    return searchedItem;
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
    let element = retrieveElement(applicationName, applicationRelease, streamType);

    if (element) {
        try {
            //kill open streams
            await element.eventSource.close();

            //remove from managed list
            for (let i = controllerNotificationStreams.length - 1; i >= 0; i--) {
                if (controllerNotificationStreams[i].controllerKey === key) {
                    controllerNotificationStreams.splice(i, 1);
                    console.log("removed stream item for " + key);
                }
            }
        } catch (e) {
            console.log("EventSource for " + key + " could not be closed");
        }
    }
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
        handleFunction(event.data, registeredController.name, registeredController.release);
    };

    eventSource.onerror = (err) => {
        console.error("EventSource failed: ", err);
    };

    eventSource.onclose = (event) => {
        console.error("EventSource closed");
    };

    //add to global list of open eventSources
    addStreamItem(registeredController.name, registeredController.release, eventSource, streamType);
}

/**
 * @param registeredController
 * @param streamType
 * @return {boolean}
 */
function checkIfStreamIsActive(registeredController, streamType) {

    let element = retrieveElement(registeredController.name, registeredController.release, streamType);

    //true if element exists
    return !!element;
}

function getAllElements() {
    return Array.from(controllerNotificationStreams);
}

module.exports = {
    STREAM_TYPE_CONFIGURATION,
    STREAM_TYPE_OPERATIONAL,
    STREAM_TYPE_DEVICE,

    startStream,
    removeAllStreamsForController,
    checkIfStreamIsActive,
    increaseCounter,
    addStreamItem,
    retrieveElement,
    getAllElements
}
