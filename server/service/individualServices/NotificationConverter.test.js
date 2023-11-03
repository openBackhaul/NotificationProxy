const notificationConverter = require('./NotificationConverter');
const configConstants = require("./ConfigConstants");

test('Convert alarm device data notification', () => {

    let input =
        {
            "node-id": "513250009",
            "event-time": "2023-08-08T08:27:23.623Z",
            "ietf-restconf:notification": {
                "alarms-1-0:alarm-event-notification": {
                    "alarm-event-sequence-number": 1,
                    "alarm-type-id": "siae-alarms-1-0:radioEquipLinkTelemetryFailAlarm",
                    "alarm-type-qualifier": "",
                    "resource": "/core-model-1-4:control-construct/logical-termination-point=LTP-MWPS-TTP-RADIO-1A/layer-protocol=LP-MWPS-TTP-RADIO-1A/air-interface-2-0:air-interface-pac",
                    "problem-severity": "major",
                    "timestamp": "2023-07-11T08:45:02.000Z"
                }
            }
        };


    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ALARMS);

    let outputExpected =
        {
            "notification-proxy-1-0:alarm-event-notification": {
                "alarm-event-sequence-number": 1,
                "timestamp": "2023-07-11T08:45:02.000Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=513250009/logical-termination-point=LTP-MWPS-TTP-RADIO-1A/layer-protocol=LP-MWPS-TTP-RADIO-1A/air-interface-2-0:air-interface-pac",
                "alarm-type-id": "siae-alarms-1-0:radioEquipLinkTelemetryFailAlarm",
                "alarm-type-qualifier": "",
                "problem-severity": "major"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});

test('Convert attr value change device notification', () => {

    let input =
        {
            "node-id": "513250009",
            "event-time": "2023-08-08T08:27:23.623Z",
            "ietf-restconf:notification": {
                "alarms-1-0:attribute-value-changed-notification": {
                    "attribute-name": "performance-monitoring-is-on",
                    "counter": 32,
                    "new-value": "true",
                    "timestamp": "2010-11-20T13:00:00.000Z",
                    "resource": "/core-model-1-4:control-construct/logical-termination-point=RF-2146697857/layer-protocol=2146697857/air-interface-2-0:air-interface-pac/air-interface-configuration"
                }
            }
        }

    ;


    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ATTR_VALUE_CHANGES);

    let outputExpected =
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "counter": 32,
                "timestamp": "2010-11-20T13:00:00.000Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=513250009/logical-termination-point=RF-2146697857/layer-protocol=2146697857/air-interface-2-0:air-interface-pac/air-interface-configuration",
                "attribute-name": "performance-monitoring-is-on",
                "new-value": "true"
            }
        };

    expect(output).toStrictEqual(outputExpected);
});


test('Convert controller configuration event notification', () => {

    let input =
        {
            "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
                "controller-id": "odl-1",
                "event-time": "2023-07-11T08:21:50.526Z",
                "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                    "data-change-event": [
                        {
                            "store": "config",
                            "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id=\"topology-netconf\"]/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id=\"513250009\"]/urn-TBD-params-xml-ns-yang-network-topology:node-id",
                            "operation": "created",
                            "data": {
                                "network-topology:node-id": "513250009"
                            }
                        }
                    ]
                }
            }
        };

    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_CONTROLLER_ATTRIBUTE_VALUE_CHANGES);

    let outputExpected = {
        "notification-proxy-1-0:attribute-value-changed-notification": {
            "counter": 32,
            "timestamp": "2023-07-11T07:21:50.000Z",
            "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-1/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
            "attribute-name": "connection-status",
            "new-value": "connecting"
        }
    };

    expect(output).toStrictEqual(outputExpected);
});