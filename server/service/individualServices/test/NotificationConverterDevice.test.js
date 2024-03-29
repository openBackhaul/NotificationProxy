const notificationConverter = require('../NotificationConverter');
const configConstants = require("../ConfigConstants");

//contains all device notifications

test('Device-Notification: Attribute Value change notification:', () => {

    let input = {
        "ietf-restconf:notification": {
            "notifications-1-0:attribute-value-changed-notification": {
                "new-value": "true",
                "attribute-name": "adaptive-modulation-is-on",
                "timestamp": "2023-11-21T04:28:14.0+00:00",
                "counter": 5,
                "object-path": "/core-model-1-4:control-construct/logical-termination-point[uuid='LTP-MWPS-TTP-ODU-A']/layer-protocol[local-id='LP-MWPS-TTP-ODU-A']/air-interface-2-0:air-interface-pac/air-interface-configuration"
            }
        }, "event-time": "2023-11-21T04:28:14Z", "node-id": "513250006"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES, "odl-7", "2.0.1");

    let outputExpected =
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "new-value": "true",
                "attribute-name": "adaptive-modulation-is-on",
                "timestamp": "2023-11-21T04:28:14.0+00:00",
                "counter": 5,
                "object-path": "/core-model-1-4:network-control-domain=live/control-construct=513250006/logical-termination-point=LTP-MWPS-TTP-ODU-A/layer-protocol=LP-MWPS-TTP-ODU-A/air-interface-2-0:air-interface-pac/air-interface-configuration"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: Object Creation notification:', () => {

    let input = {
        "ietf-restconf:notification": {
            "notifications-1-0:object-creation-notification": {
                "timestamp": "2023-11-21T04:30:18.0+00:00",
                "counter": 1,
                "object-path": "/core-model-1-4:control-construct/forwarding-domain[uuid='VLAN-FD']/fc[uuid='VLAN-3321']"
            }
        }, "event-time": "2023-11-21T04:30:18Z", "node-id": "513250009"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS, "odl-7", "2.0.1");

    let outputExpected =
        {
            "notification-proxy-1-0:object-creation-notification": {
                "timestamp": "2023-11-21T04:30:18.0+00:00",
                "counter": 1,
                "object-path": "/core-model-1-4:network-control-domain=live/control-construct=513250009/forwarding-domain=VLAN-FD/fc=VLAN-3321",
            }
        };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: Object Deletion notification', () => {

    let input = {
        "ietf-restconf:notification": {
            "notifications-1-0:object-deletion-notification": {
                "timestamp": "2023-11-21T04:32:24.0+00:00",
                "counter": 1,
                "object-path": "/core-model-1-4:control-construct/forwarding-domain[uuid='VLAN-FD']/fc[uuid='VLAN-3321']"
            }
        }, "event-time": "2023-11-21T04:32:24Z", "node-id": "513250009"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_OBJECT_DELETIONS, "odl-7", "2.0.1");

    let outputExpected =
        {
            "notification-proxy-1-0:object-deletion-notification": {
                "timestamp": "2023-11-21T04:32:24.0+00:00",
                "counter": 1,
                "object-path": "/core-model-1-4:network-control-domain=live/control-construct=513250009/forwarding-domain=VLAN-FD/fc=VLAN-3321"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: Alarm notification', () => {

    let input = {
        "ietf-restconf:notification": {
            "alarms-1-0:alarm-event-notification": {
                "alarm-event-sequence-number": 68,
                "problem-severity": "alarms-1-0:SEVERITY_AND_CLEARED_TYPE_CRITICAL",
                "timestamp": "2023-11-21T06:27:13+01:00",
                "resource": "/core-model-1-4:control-construct/logical-termination-point[uuid='ETY-86.1.1']",
                "alarm-type-qualifier": "",
                "alarm-type-id": "alarms-ext-ericsson-ml6300:ALARM_TYPE_ID_linkDown"
            }
        }, "event-time": "2023-11-21T05:27:13.715Z", "node-id": "513559991A"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ALARMS, "odl-7", "2.0.1");

    let outputExpected = {
        "notification-proxy-1-0:alarm-event-notification": {
            "alarm-event-sequence-number": 68,
            "problem-severity": "critical",
            "timestamp": "2023-11-21T06:27:13+01:00",
            "resource": "/core-model-1-4:network-control-domain=live/control-construct=513559991A/logical-termination-point=ETY-86.1.1",
            "alarm-type-qualifier": "",
            "alarm-type-id": "alarms-ext-ericsson-ml6300:ALARM_TYPE_ID_linkDown",
        }
    };

    expect(output).toStrictEqual(outputExpected);
});

// test('Device-Notification: testset3 Device-Attribute value change', () => {
//
//     let input = {
//         "ietf-restconf:notification": {
//             "air-interface-2-0:attribute-value-changed-notification": {
//                 "new-value": "true",
//                 "timestamp": "2023-11-29T10:30:31+01:00",
//                 "attribute-name": "adaptive-modulation-is-on",
//                 "object-id-ref": "LTP-MWPS-TTP-5-1",
//                 "counter": 25
//             }
//         },
//         "event-time": "2023-11-29T09:30:31.435Z",
//         "node-id": "513250004"
//     };
//
//     let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES, "odl-7", "2.0.1");
//
//     let outputExpected = {
//         "notification-proxy-1-0:attribute-value-changed-notification": {
//             "new-value": "true",
//             "timestamp": "2023-11-29T10:30:31+01:00",
//             "attribute-name": "adaptive-modulation-is-on",
//             "counter": 25,
//             "resource": "/core-model-1-4:network-control-domain=live/control-construct=513250004/logical-termination-point=LTP-MWPS-TTP-5-1",
//         }
//     };
//
//     expect(output).toStrictEqual(outputExpected);
// });

test('Device-Notification: testset3 Device-Object deletion change', () => {

    let input = {
        "ietf-restconf:notification": {
            "notifications-1-0:object-deletion-notification": {
                "timestamp": "2023-11-29T09:30:56.0+00:00",
                "counter": 2,
                "object-path": "/core-model-1-4:control-construct/forwarding-domain[uuid='VLAN-FD']/fc[uuid='VLAN-201']"
            }
        },
        "event-time": "2023-11-29T09:30:56Z",
        "node-id": "513250007"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_OBJECT_DELETIONS, "odl-7", "2.0.1");

    let outputExpected = {
        "notification-proxy-1-0:object-deletion-notification": {
            "timestamp": "2023-11-29T09:30:56.0+00:00",
            "counter": 2,
            "object-path": "/core-model-1-4:network-control-domain=live/control-construct=513250007/forwarding-domain=VLAN-FD/fc=VLAN-201"
        }
    };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: testset3 Device-Object creation change', () => {

    let input = {
        "ietf-restconf:notification": {
            "notifications-1-0:object-creation-notification": {
                "timestamp": "2023-11-29T09:31:01.0+00:00",

                "counter": 3,
                "object-path": "/core-model-1-4:control-construct/forwarding-domain[uuid='VLAN-FD']/fc[uuid='VLAN-221']"
            }
        },
        "event-time": "2023-11-29T09:31:01Z",
        "node-id": "513250007"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS, "odl-7", "2.0.1");

    let outputExpected = {
        "notification-proxy-1-0:object-creation-notification": {
            "timestamp": "2023-11-29T09:31:01.0+00:00",
            "counter": 3,
            "object-path": "/core-model-1-4:network-control-domain=live/control-construct=513250007/forwarding-domain=VLAN-FD/fc=VLAN-221"
        }
    };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: Hypothetical - Object Creation notification with object-type', () => {

    let input = {
        "ietf-restconf:notification": {
            "notifications-1-0:object-creation-notification": {
                "timestamp": "2023-11-21T04:30:18.0+00:00",
                "counter": 1,
                "object-path": "/core-model-1-4:control-construct/forwarding-domain[uuid='VLAN-FD']/fc[uuid='VLAN-3321']",
                "object-type": "device-type-3"
            }
        }, "event-time": "2023-11-21T04:30:18Z", "node-id": "513250009"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_OBJECT_CREATIONS, "odl-7", "2.0.1");

    let outputExpected =
        {
            "notification-proxy-1-0:object-creation-notification": {
                "timestamp": "2023-11-21T04:30:18.0+00:00",
                "counter": 1,
                "object-path": "/core-model-1-4:network-control-domain=live/control-construct=513250009/forwarding-domain=VLAN-FD/fc=VLAN-3321"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: Alarm from Test lab', () => {

    let input = {
        "ietf-restconf:notification": {
            "alarms-1-0:alarm-event-notification": {
                "alarm-type-id": "alarms-1-0:ALARM_TYPE_ID_TYPE_IFPORT_OBJ",
                "resource": "/core-model-1-4:control-construct/logical-termination-point[uuid='LTP-MWPS-TTP-1-1']",
                "problem-severity": "alarms-1-0:SEVERITY_AND_CLEARED_TYPE_MINOR",
                "alarm-type-qualifier": "MW_BER_SD/12871-110-1-1",
                "alarm-event-sequence-number": 23,
                "timestamp": "2023-12-18T15:52:41+00:00"
            }
        }, "event-time": "2023-12-18T16:52:44.936Z", "node-id": "CO17692"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ALARMS, "odl-7", "2.0.1");

    let outputExpected =
        {
            "notification-proxy-1-0:alarm-event-notification": {
                "alarm-type-id": "alarms-1-0:ALARM_TYPE_ID_TYPE_IFPORT_OBJ",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=CO17692/logical-termination-point=LTP-MWPS-TTP-1-1",
                "problem-severity": "minor",
                "alarm-type-qualifier": "MW_BER_SD/12871-110-1-1",
                "alarm-event-sequence-number": 23,
                "timestamp": "2023-12-18T15:52:41+00:00"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: Alarm from Test lab (2)', () => {

    let input = {
        "ietf-restconf:notification": {
            "alarms-1-0:alarm-event-notification": {
                "alarm-type-id": "alarms-1-0:ALARM_TYPE_ID_TYPE_IFPORT_OBJ",
                "resource": "/core-model-1-4:control-construct/logical-termination-point[uuid='LTP-MWPS-TTP-1-1']",
                "problem-severity": "alarms-1-0:SEVERITY_AND_CLEARED_TYPE_CLEARED",
                "alarm-type-qualifier": "MW_BER_SD/12871-110-1-1",
                "alarm-event-sequence-number": 68,
                "timestamp": "2023-12-19T15:36:27+00:00"
            }
        }, "event-time": "2023-12-19T16:36:37.923Z", "node-id": "CO17692"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ALARMS, "odl-7", "2.0.1");

    let outputExpected =
        {
            "notification-proxy-1-0:alarm-event-notification": {
                "alarm-type-id": "alarms-1-0:ALARM_TYPE_ID_TYPE_IFPORT_OBJ",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=CO17692/logical-termination-point=LTP-MWPS-TTP-1-1",
                "problem-severity": "cleared",
                "alarm-type-qualifier": "MW_BER_SD/12871-110-1-1",
                "alarm-event-sequence-number": 68,
                "timestamp": "2023-12-19T15:36:27+00:00"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: issue #73', () => {

    let input = {
        "ietf-restconf:notification": {
            "alarms-1-0:alarm-event-notification": {
                "alarm-event-sequence-number": 21,
                "problem-severity": "alarms-1-0:SEVERITY_AND_CLEARED_TYPE_CLEARED",
                "timestamp": "2024-02-14T10:49:19.0+00:00",
                "resource": "/core-model-1-4:control-construct/logical-termination-point[uuid='LTP-MWPS-TTP-RADIO-1A']/layer-protocol[local-id='LP-MWPS-TTP-RADIO-1A']/air-interface-2-0:air-interface-pac",
                "alarm-type-qualifier": "",
                "alarm-type-id": "siae-alarms-1-0:radioBranchTxPowerAlarm"
            }
        }, "event-time": "2024-02-14T10:49:21Z", "node-id": "513250009"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ALARMS, "odl-7", "2.0.1");

    let outputExpected =
        {
            "notification-proxy-1-0:alarm-event-notification": {
                "alarm-event-sequence-number": 21,
                "timestamp": "2024-02-14T10:49:19.0+00:00",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=513250009/logical-termination-point=LTP-MWPS-TTP-RADIO-1A/layer-protocol=LP-MWPS-TTP-RADIO-1A/air-interface-2-0:air-interface-pac",
                "alarm-type-id": "siae-alarms-1-0:radioBranchTxPowerAlarm",
                "alarm-type-qualifier": "",
                "problem-severity": "cleared"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});

test('Device-Notification: issue #74', () => {

    let input = {
        "ietf-restconf:notification": {
            "alarms-1-0:alarm-event-notification": {
                "alarm-type-id": "alarms-1-0:ALARM_TYPE_ID_TYPE_NE_OBJ",
                "resource": "/core-model-1-4:control-construct/equipment[uuid='HUAWEI-EQUIPMENT-1']",
                "problem-severity": "alarms-1-0:SEVERITY_AND_CLEARED_TYPE_MAJOR",
                "alarm-type-qualifier": "DCNSIZE_OVER/13110-20/FFFFFFFFFF",
                "alarm-event-sequence-number": 1723,
                "timestamp": "2024-02-14T08:54:14+00:00"
            }
        }, "event-time": "2024-02-14T10:01:36.737Z", "node-id": "CO17695"
    };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ALARMS, "odl-7", "2.0.1");

    let outputExpected =
        {
            "notification-proxy-1-0:alarm-event-notification": {
                "alarm-event-sequence-number": 1723,
                "timestamp": "2024-02-14T08:54:14+00:00",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=CO17695/equipment=HUAWEI-EQUIPMENT-1",
                "alarm-type-id": "alarms-1-0:ALARM_TYPE_ID_TYPE_NE_OBJ",
                "alarm-type-qualifier": "DCNSIZE_OVER/13110-20/FFFFFFFFFF",
                "problem-severity": "major"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});