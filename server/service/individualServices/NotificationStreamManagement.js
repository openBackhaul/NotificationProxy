const http = require('http');
const EventSource = require('eventsource');
const process = require('process');

const controllerNotificationStreams = [];

function addStreamItem(registeredController, webSocket, streamType) {

    let key = registeredController.name + "-" + registeredController.release + '-' + streamType;

    let notificationStreamItem = {
        'controllerKey': key,
        'websocket': webSocket
    }

    controllerNotificationStreams.push(notificationStreamItem);

    let logString = "";
    for (const controllerNotificationStream of controllerNotificationStreams) {
        logString += controllerNotificationStream.controllerKey + ",";
    }

    console.log("notification streams after adding: " + logString);
}

const STREAM_TYPE_CONFIGURATION = "CONFIGURATION";
const STREAM_TYPE_OPERATIONAL = "OPERATIONAL";
const STREAM_TYPE_DEVICE = "DEVICE";

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
    let openStreamWebsocket = null;
    for (const controllerNotificationStreamItem of controllerNotificationStreams) {
        if (controllerNotificationStreamItem.controllerKey === key) {
            openStreamWebsocket = controllerNotificationStreamItem.websocket;
            break;
        }
    }

    if (openStreamWebsocket) {
        //kill open streams
        await openStreamWebsocket.close();

        //remove from managed list
        removeItemAll(controllerNotificationStreams, openStreamWebsocket);
    }

    console.log("removed stream item for " + key);
}

async function removeAllStreamsForController(applicationName, applicationRelease) {

    await removeStreamItem(applicationName, applicationRelease, STREAM_TYPE_CONFIGURATION);
    await removeStreamItem(applicationName, applicationRelease, STREAM_TYPE_OPERATIONAL);
    await removeStreamItem(applicationName, applicationRelease, STREAM_TYPE_DEVICE);
}

async function startStream(controllerTargetUrl, registeredController, handleFunction, streamType) {

    // controllerTargetUrl = "http://localhost:1500"; //local test

    let user = process.env['CONTROLLER_USER'];
    let password = process.env['CONTROLLER_PASSWORD'];
    let base64encodedData = Buffer.from(user + ':' + password).toString('base64');

    console.log("starting eventsource " + controllerTargetUrl);

    const evtSource = new EventSource(controllerTargetUrl, {
        withCredentials: true,
        headers: {
            'Authorization': 'Basic ' + base64encodedData,
        }
    });

    evtSource.onopen = (event) => {
        console.log("listening to stream for notifications: " + controllerTargetUrl);
    };

    evtSource.onmessage = (event) => {
        console.log("received event: " + event.data);
        handleFunction(event.data);
    };

    evtSource.onerror = (err) => {
        console.error("EventSource failed: ", err);
    };

    evtSource.onclose = (event) => {
        console.error("EventSource closed");
    };


    //todo closing

    // evtSource.close();


    //todo reenable when it is clear how we proceed
    //add to global list of open webSockets
    // addStreamItem(registeredController, webSocket, streamType);
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


/// MOCK FOR TEXTSTREAM ///

// const server = http.createServer((req, res) => {
//     // Set the content type to text/event-stream for Server-Sent Events (SSE)
//
//     console.log(req.headers);
//
//     res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//     });
//
//     // Function to send data as a text stream
//     const sendTextStream = (data) => {
//         res.write(`data: ${data}\n\n`);
//     };
//
//     // Send a message every second (for example purposes)
//     const intervalId = setInterval(() => {
//         sendTextStream('This is a message from the server');
//     }, 1000);
//
//     // Close the connection after 10 seconds (for example purposes)
//     // setTimeout(() => {
//     //     clearInterval(intervalId);
//     //     res.end();
//     // }, 60000);
//
//     // Handle client disconnect
//     req.on('close', () => {
//         clearInterval(intervalId);
//         res.end();
//     });
// });
//
// const PORT = 1500;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

/// MOCK FOR TEXTSTREAM END ///
