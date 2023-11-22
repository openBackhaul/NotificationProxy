const notificationStreamManagement = require('./NotificationStreamManagement');
const EventSource = require('eventsource');

test('Adding and removal from managed stream list', async () => {

    notificationStreamManagement.addStreamItem("example", "4.5.2", new EventSource("https://example.com"), notificationStreamManagement.STREAM_TYPE_DEVICE);
    let element = notificationStreamManagement.retrieveElement("example", "4.5.2", notificationStreamManagement.STREAM_TYPE_DEVICE);

    expect(element).toBeDefined();

    let element2 = notificationStreamManagement.retrieveElement("somethingElse", "4.5.2", notificationStreamManagement.STREAM_TYPE_DEVICE);

    expect(element2).toBeNull();

    notificationStreamManagement.addStreamItem("example2", "1.5.12", new EventSource("https://example.com"), notificationStreamManagement.STREAM_TYPE_CONFIGURATION);

    await notificationStreamManagement.removeAllStreamsForController("example", "4.5.2");

    element = notificationStreamManagement.retrieveElement("example", "4.5.2", notificationStreamManagement.STREAM_TYPE_DEVICE);

    expect(element).toBeNull();

    //check count of list
    let elements = notificationStreamManagement.getAllElements();

    expect(elements.length).toBe(1);

    //close or jest thread will wait
    notificationStreamManagement.removeAllStreamsForController("example", "4.5.2");
    notificationStreamManagement.removeAllStreamsForController("example2", "1.5.12");
});

test('Managing counters for notifications', () => {

    notificationStreamManagement.addStreamItem("odl1", "1.0.0", new EventSource("https://example.com"), notificationStreamManagement.STREAM_TYPE_DEVICE);
    notificationStreamManagement.addStreamItem("odl1", "1.0.0", new EventSource("https://example.com"), notificationStreamManagement.STREAM_TYPE_OPERATIONAL);

    notificationStreamManagement.increaseCounter("odl1", "1.0.0", notificationStreamManagement.STREAM_TYPE_DEVICE);
    notificationStreamManagement.increaseCounter("odl1", "1.0.0", notificationStreamManagement.STREAM_TYPE_DEVICE);
    notificationStreamManagement.increaseCounter("odl1", "1.0.0", notificationStreamManagement.STREAM_TYPE_DEVICE);
    notificationStreamManagement.increaseCounter("odl1", "1.0.0", notificationStreamManagement.STREAM_TYPE_OPERATIONAL);

    let element1 = notificationStreamManagement.retrieveElement("odl1", "1.0.0", notificationStreamManagement.STREAM_TYPE_DEVICE);
    expect(element1.counter).toBe(3);

    let element2 = notificationStreamManagement.retrieveElement("odl1", "1.0.0", notificationStreamManagement.STREAM_TYPE_OPERATIONAL);
    expect(element2.counter).toBe(1);

    //close or jest thread will wait
    notificationStreamManagement.removeAllStreamsForController("odl1", "1.0.0");
});