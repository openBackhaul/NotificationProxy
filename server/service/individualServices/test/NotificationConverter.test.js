const notificationConverter = require('../NotificationConverter');
const configConstants = require("../ConfigConstants");

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
                    "problem-severity": "alarms-1-0:SEVERITY_AND_CLEARED_TYPE_MAJOR",
                    "timestamp": "2023-07-11T08:45:02.000Z"
                }
            }
        };


    let output = notificationConverter.convertNotification(input, configConstants.OAM_PATH_DEVICE_ALARMS, null, null);

    let outputExpected =
        {
            "notification-proxy-1-0:alarm-event-notification": {
                "alarm-event-sequence-number": 1,
                "timestamp": "2023-07-11T08:45:02.000Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=513250009/logical-termination-point=LTP-MWPS-TTP-RADIO-1A/layer-protocol=LP-MWPS-TTP-RADIO-1A/air-interface-2-0:air-interface-pac",
                "alarm-type-id": "siae-alarms-1-0:radioEquipLinkTelemetryFailAlarm",
                "alarm-type-qualifier": "",
                "problem-severity": "major",
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
                                "connection-status": "connecting"
                            }
                        }
                    ]
                }
            }
        };

    let output = notificationConverter.convertControllerNotification(input, "odl-5", "1.0.2");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:21:50.526Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-5/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/connection-status",
                    "object-type": "connection-status"
                }
            }
        }
    ];

    expect(output[0].notificationMessage).toStrictEqual(outputExpected[0].notificationMessage);
});

test('Convert controller configuration event notification (real data)', () => {

    let input =
        {
            "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
                "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                    "data-change-event": [
                        {
                            "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology",
                            "data": {
                                "network-topology:network-topology": {
                                    "topology": [
                                        {
                                            "topology-id": "topology-netconf",
                                            "node": [
                                                {
                                                    "node-id": "CO02060",
                                                    "netconf-node-topology:port": 17833,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 240,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513559991A",
                                                    "netconf-node-topology:port": 8303,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 64,
                                                    "netconf-node-topology:unavailable-capabilities": {
                                                        "unavailable-capability": [
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui"
                                                            }
                                                        ]
                                                    },
                                                    "netconf-node-topology:host": "172.28.127.7",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "http://tail-f.com/ns/netconf/extensions",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513559991B",
                                                    "netconf-node-topology:port": 8304,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 58,
                                                    "netconf-node-topology:unavailable-capabilities": {
                                                        "unavailable-capability": [
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui"
                                                            }
                                                        ]
                                                    },
                                                    "netconf-node-topology:host": "172.28.127.7",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "http://tail-f.com/ns/netconf/extensions",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250010",
                                                    "netconf-node-topology:port": 8301,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 64,
                                                    "netconf-node-topology:unavailable-capabilities": {
                                                        "unavailable-capability": [
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui"
                                                            }
                                                        ]
                                                    },
                                                    "netconf-node-topology:host": "172.28.127.7",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "http://tail-f.com/ns/netconf/extensions",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250012",
                                                    "netconf-node-topology:port": 830,
                                                    "netconf-node-topology:connection-status": "unable-to-connect",
                                                    "netconf-node-topology:connected-message": "Maximum reconnection attempts reached",
                                                    "netconf-node-topology:host": "172.29.147.236"
                                                },
                                                {
                                                    "node-id": "513250011",
                                                    "netconf-node-topology:port": 8302,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 50,
                                                    "netconf-node-topology:unavailable-capabilities": {
                                                        "unavailable-capability": [
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui"
                                                            }
                                                        ]
                                                    },
                                                    "netconf-node-topology:host": "172.28.127.7",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "http://tail-f.com/ns/netconf/extensions",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250005",
                                                    "netconf-node-topology:port": 17831,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 238,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250004",
                                                    "netconf-node-topology:port": 17830,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 244,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250007",
                                                    "netconf-node-topology:port": 33004,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 1,
                                                    "netconf-node-topology:host": "172.28.127.8",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:url:1.0?scheme=file",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=ec12080590f85b20417420ac7066def2e6e51539",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:partial-lock:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250006",
                                                    "netconf-node-topology:port": 33003,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 2,
                                                    "netconf-node-topology:host": "172.28.127.8",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:url:1.0?scheme=file",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=ec12080590f85b20417420ac7066def2e6e51539",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:partial-lock:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250009",
                                                    "netconf-node-topology:port": 33001,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 1,
                                                    "netconf-node-topology:host": "172.28.127.8",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:url:1.0?scheme=file",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:partial-lock:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=3e5d6ead2b8a84ee21a9c521547c9747fe40f3c5",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250008",
                                                    "netconf-node-topology:port": 33002,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 3,
                                                    "netconf-node-topology:host": "172.28.127.8",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:url:1.0?scheme=file",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:partial-lock:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=3e5d6ead2b8a84ee21a9c521547c9747fe40f3c5",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO17691",
                                                    "netconf-node-topology:port": 17835,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 245,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO17692",
                                                    "netconf-node-topology:port": 17836,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 239,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO12126",
                                                    "netconf-node-topology:port": 33007,
                                                    "netconf-node-topology:connection-status": "unable-to-connect",
                                                    "netconf-node-topology:connected-message": "Maximum reconnection attempts reached",
                                                    "netconf-node-topology:host": "172.28.127.8"
                                                },
                                                {
                                                    "node-id": "CO17693",
                                                    "netconf-node-topology:port": 17837,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 243,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO15338",
                                                    "netconf-node-topology:port": 8305,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 63,
                                                    "netconf-node-topology:unavailable-capabilities": {
                                                        "unavailable-capability": [
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui"
                                                            }
                                                        ]
                                                    },
                                                    "netconf-node-topology:host": "172.28.127.7",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "http://tail-f.com/ns/netconf/extensions",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO17694",
                                                    "netconf-node-topology:port": 17838,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 236,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO15337",
                                                    "netconf-node-topology:port": 8306,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 64,
                                                    "netconf-node-topology:unavailable-capabilities": {
                                                        "unavailable-capability": [
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker"
                                                            },
                                                            {
                                                                "failure-reason": "unable-to-resolve",
                                                                "capability": "(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui"
                                                            }
                                                        ]
                                                    },
                                                    "netconf-node-topology:host": "172.28.127.7",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "http://tail-f.com/ns/netconf/extensions",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO17695",
                                                    "netconf-node-topology:port": 17839,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 237,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO15951",
                                                    "netconf-node-topology:port": 33008,
                                                    "netconf-node-topology:connection-status": "connecting",
                                                    "netconf-node-topology:host": "172.28.127.8"
                                                },
                                                {
                                                    "node-id": "CO12124",
                                                    "netconf-node-topology:port": 33005,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 3,
                                                    "netconf-node-topology:host": "172.28.127.8",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=451416cead8436c64e7bf18b409ce5b324eca80e",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:url:1.0?scheme=file",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:partial-lock:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO15950",
                                                    "netconf-node-topology:port": 33006,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 4,
                                                    "netconf-node-topology:host": "172.28.127.8",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=451416cead8436c64e7bf18b409ce5b324eca80e",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:url:1.0?scheme=file",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:partial-lock:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO17690",
                                                    "netconf-node-topology:port": 17834,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 242,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO02059",
                                                    "netconf-node-topology:port": 17832,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 241,
                                                    "netconf-node-topology:host": "172.28.127.9",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:exi:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:netconf:notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0",
                                                                "capability-origin": "device-advertised"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "513250013",
                                                    "netconf-node-topology:port": 830,
                                                    "netconf-node-topology:connection-status": "unable-to-connect",
                                                    "netconf-node-topology:connected-message": "Maximum reconnection attempts reached",
                                                    "netconf-node-topology:host": "172.29.147.237"
                                                },
                                                {
                                                    "node-id": "CO13305",
                                                    "netconf-node-topology:port": 33009,
                                                    "netconf-node-topology:connection-status": "connected",
                                                    "netconf-node-topology:session-id": 3,
                                                    "netconf-node-topology:host": "172.28.127.8",
                                                    "netconf-node-topology:available-capabilities": {
                                                        "available-capability": [
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:url:1.0?scheme=file",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:notification:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=ec12080590f85b20417420ac7066def2e6e51539",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:partial-lock:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:validate:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:base:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:candidate:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:interleave:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:rollback-on-error:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:xpath:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.1",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:confirmed-commit:1.0",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0"
                                                            },
                                                            {
                                                                "capability": "(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0"
                                                            },
                                                            {
                                                                "capability": "(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults",
                                                                "capability-origin": "device-advertised"
                                                            },
                                                            {
                                                                "capability": "(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "node-id": "CO13306",
                                                    "netconf-node-topology:port": 33010,
                                                    "netconf-node-topology:connection-status": "connecting",
                                                    "netconf-node-topology:host": "172.28.127.8"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            "operation": "updated"
                        }
                    ]
                },
                "event-time": "2023-11-09T18:21:12.427941449Z"
            }
        };

    let output = notificationConverter.convertControllerNotification(input, "odl-5", "1.0.2");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 1,
                    "timestamp": "2023-11-09T18:21:12.427941449Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-5/logical-termination-point=unknown/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "network-topology",
                    "new-value": "{\"topology\":[{\"topology-id\":\"topology-netconf\",\"node\":[{\"node-id\":\"CO02060\",\"netconf-node-topology:port\":17833,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":240,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"513559991A\",\"netconf-node-topology:port\":8303,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":64,\"netconf-node-topology:unavailable-capabilities\":{\"unavailable-capability\":[{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui\"}]},\"netconf-node-topology:host\":\"172.28.127.7\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"http://tail-f.com/ns/netconf/extensions\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300\"},{\"capability\":\"(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"513559991B\",\"netconf-node-topology:port\":8304,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":58,\"netconf-node-topology:unavailable-capabilities\":{\"unavailable-capability\":[{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui\"}]},\"netconf-node-topology:host\":\"172.28.127.7\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"http://tail-f.com/ns/netconf/extensions\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300\"},{\"capability\":\"(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"513250010\",\"netconf-node-topology:port\":8301,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":64,\"netconf-node-topology:unavailable-capabilities\":{\"unavailable-capability\":[{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui\"}]},\"netconf-node-topology:host\":\"172.28.127.7\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"http://tail-f.com/ns/netconf/extensions\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300\"},{\"capability\":\"(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"513250012\",\"netconf-node-topology:port\":830,\"netconf-node-topology:connection-status\":\"unable-to-connect\",\"netconf-node-topology:connected-message\":\"Maximum reconnection attempts reached\",\"netconf-node-topology:host\":\"172.29.147.236\"},{\"node-id\":\"513250011\",\"netconf-node-topology:port\":8302,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":50,\"netconf-node-topology:unavailable-capabilities\":{\"unavailable-capability\":[{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui\"}]},\"netconf-node-topology:host\":\"172.28.127.7\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"http://tail-f.com/ns/netconf/extensions\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300\"},{\"capability\":\"(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"513250005\",\"netconf-node-topology:port\":17831,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":238,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"513250004\",\"netconf-node-topology:port\":17830,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":244,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"513250007\",\"netconf-node-topology:port\":33004,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":1,\"netconf-node-topology:host\":\"172.28.127.8\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:url:1.0?scheme=file\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=ec12080590f85b20417420ac7066def2e6e51539\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:partial-lock:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"513250006\",\"netconf-node-topology:port\":33003,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":2,\"netconf-node-topology:host\":\"172.28.127.8\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:url:1.0?scheme=file\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=ec12080590f85b20417420ac7066def2e6e51539\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:partial-lock:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"513250009\",\"netconf-node-topology:port\":33001,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":1,\"netconf-node-topology:host\":\"172.28.127.8\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:url:1.0?scheme=file\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:partial-lock:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=3e5d6ead2b8a84ee21a9c521547c9747fe40f3c5\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"513250008\",\"netconf-node-topology:port\":33002,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":3,\"netconf-node-topology:host\":\"172.28.127.8\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:url:1.0?scheme=file\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:partial-lock:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=3e5d6ead2b8a84ee21a9c521547c9747fe40f3c5\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"CO17691\",\"netconf-node-topology:port\":17835,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":245,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"CO17692\",\"netconf-node-topology:port\":17836,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":239,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"CO12126\",\"netconf-node-topology:port\":33007,\"netconf-node-topology:connection-status\":\"unable-to-connect\",\"netconf-node-topology:connected-message\":\"Maximum reconnection attempts reached\",\"netconf-node-topology:host\":\"172.28.127.8\"},{\"node-id\":\"CO17693\",\"netconf-node-topology:port\":17837,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":243,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"CO15338\",\"netconf-node-topology:port\":8305,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":63,\"netconf-node-topology:unavailable-capabilities\":{\"unavailable-capability\":[{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui\"}]},\"netconf-node-topology:host\":\"172.28.127.7\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"http://tail-f.com/ns/netconf/extensions\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300\"},{\"capability\":\"(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"CO17694\",\"netconf-node-topology:port\":17838,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":236,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"CO15337\",\"netconf-node-topology:port\":8306,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":64,\"netconf-node-topology:unavailable-capabilities\":{\"unavailable-capability\":[{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/aaa/1.1?revision=2015-06-16)tailf-aaa\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/yang/netconf-monitoring?revision=2016-11-24)tailf-netconf-monitoring\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/kicker?revision=2017-03-16)tailf-kicker\"},{\"failure-reason\":\"unable-to-resolve\",\"capability\":\"(http://tail-f.com/ns/webui?revision=2013-03-07)tailf-webui\"}]},\"netconf-node-topology:host\":\"172.28.127.7\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"http://tail-f.com/ns/netconf/extensions\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=report-all\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=62c7de51c9757335a320323e9ac46704\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:lldp-1-0?revision=2023-05-24)lldp-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(urn:onf:yang:equipment-augment-1-0?revision=2023-05-16)equipment-augment-1-0\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-restconf-monitoring?revision=2016-08-15)ietf-restconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2012-02-22)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2023-09-07)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6300?revision=2023-07-05)alarms-ext-ericsson-ml6300\"},{\"capability\":\"(http://tail-f.com/yang/acm?revision=2013-03-07)tailf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/common-monitoring?revision=2013-06-14)tailf-common-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://tail-f.com/yang/confd-monitoring?revision=2013-06-14)tailf-confd-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-ml6600?revision=2022-03-18)alarms-ext-ericsson-ml6600\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(http://ericsson.com/yang/extensions/onf/alarms-ext-ericsson-mltn?revision=2022-03-22)alarms-ext-ericsson-mltn\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"CO17695\",\"netconf-node-topology:port\":17839,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":237,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"CO15951\",\"netconf-node-topology:port\":33008,\"netconf-node-topology:connection-status\":\"connecting\",\"netconf-node-topology:host\":\"172.28.127.8\"},{\"node-id\":\"CO12124\",\"netconf-node-topology:port\":33005,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":3,\"netconf-node-topology:host\":\"172.28.127.8\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=451416cead8436c64e7bf18b409ce5b324eca80e\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:url:1.0?scheme=file\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:partial-lock:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"CO15950\",\"netconf-node-topology:port\":33006,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":4,\"netconf-node-topology:host\":\"172.28.127.8\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=451416cead8436c64e7bf18b409ce5b324eca80e\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:url:1.0?scheme=file\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:partial-lock:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"CO17690\",\"netconf-node-topology:port\":17834,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":242,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"CO02059\",\"netconf-node-topology:port\":17832,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":241,\"netconf-node-topology:host\":\"172.28.127.9\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:exi:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:netconf:notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-netconf&revision=2011-06-01\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:xml:ns:yang:ietf-inet-types&revision=2013-07-15\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2023-05-24)ltp-augment-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2023-07-26)core-model-1-4\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2023-06-08)alarms-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:synchronization-1-0?revision=2023-06-20)synchronization-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ip-interface-1-0?revision=2022-03-30)ip-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:l-3vpn-profile-1-0?revision=2022-03-30)l-3vpn-profile-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\",\"capability-origin\":\"device-advertised\"}]}},{\"node-id\":\"513250013\",\"netconf-node-topology:port\":830,\"netconf-node-topology:connection-status\":\"unable-to-connect\",\"netconf-node-topology:connected-message\":\"Maximum reconnection attempts reached\",\"netconf-node-topology:host\":\"172.29.147.237\"},{\"node-id\":\"CO13305\",\"netconf-node-topology:port\":33009,\"netconf-node-topology:connection-status\":\"connected\",\"netconf-node-topology:session-id\":3,\"netconf-node-topology:host\":\"172.28.127.8\",\"netconf-node-topology:available-capabilities\":{\"available-capability\":[{\"capability\":\"urn:ietf:params:netconf:capability:url:1.0?scheme=file\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:notification:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:yang-library:1.0?revision=2016-06-21&module-set-id=ec12080590f85b20417420ac7066def2e6e51539\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:partial-lock:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:validate:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:base:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:candidate:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:interleave:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:rollback-on-error:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:xpath:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.1\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:confirmed-commit:1.0\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"urn:ietf:params:netconf:capability:with-defaults:1.0?basic-mode=explicit&also-supported=trim,report-all,report-all-tagged\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ltp-augment-1-0?revision=2020-08-26)ltp-augment-1-0\"},{\"capability\":\"(urn:onf:yang:backup-and-restore-1-0?revision=2022-03-29)backup-and-restore-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:partial-lock:1.0?revision=2009-10-19)ietf-netconf-partial-lock\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-library?revision=2016-06-21)ietf-yang-library\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:mac-fd-1-0?revision=2022-03-28)mac-fd-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-types?revision=2012-06-01)yuma-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:tdm-container-2-0?revision=2022-03-24)tdm-container-2-0\"},{\"capability\":\"(urn:onf:yang:alarms-1-0?revision=2022-03-02)alarms-1-0\"},{\"capability\":\"(urn:onf:yang:hybrid-mw-structure-2-0?revision=2022-03-15)hybrid-mw-structure-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-proc?revision=2012-10-10)yuma-proc\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:iana-crypt-hash?revision=2014-08-06)iana-crypt-hash\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:base:1.0?revision=2011-06-01)ietf-netconf\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-inet-types?revision=2013-07-15)ietf-inet-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:scheduler-profile-1-0?revision=2022-03-31)scheduler-profile-1-0\"},{\"capability\":\"(urn:onf:yang:mac-interface-1-0?revision=2022-03-25)mac-interface-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-time-filter?revision=2012-11-15)yuma-time-filter\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:core-model-1-4?revision=2019-11-27)core-model-1-4\"},{\"capability\":\"(urn:onf:yang:wred-profile-1-0?revision=2022-03-30)wred-profile-1-0\"},{\"capability\":\"(urn:onf:yang:vlan-fd-1-0?revision=2022-04-07)vlan-fd-1-0\"},{\"capability\":\"(urn:onf:yang:pure-ethernet-structure-2-0?revision=2022-03-24)pure-ethernet-structure-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-yang-types?revision=2013-07-15)ietf-yang-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-acm?revision=2018-02-14)ietf-netconf-acm\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-fc-1-0?revision=2022-04-07)vlan-fc-1-0\"},{\"capability\":\"(urn:onf:yang:wire-interface-2-0?revision=2022-04-06)wire-interface-2-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-mysession?revision=2010-05-10)yuma-mysession\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-mysession-cache?revision=2018-11-12)yuma123-mysession-cache\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:netmod:notification?revision=2008-07-14)nc-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:policing-profile-1-0?revision=2022-03-31)policing-profile-1-0\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-app-common?revision=2012-08-16)yuma-app-common\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-netconf-types?revision=2017-06-23)yuma123-netconf-types\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:vlan-interface-1-0?revision=2022-04-07)vlan-interface-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-system?revision=2014-08-06)ietf-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:firmware-1-0?revision=2021-04-01)firmware-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-monitoring?revision=2010-10-04)ietf-netconf-monitoring\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-notifications?revision=2012-02-06)ietf-netconf-notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:air-interface-2-0?revision=2022-03-28)air-interface-2-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:netconf:notification:1.0?revision=2008-07-14)notifications\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:co-channel-profile-1-0?revision=2020-01-27)co-channel-profile-1-0\"},{\"capability\":\"(urn:onf:yang:siae-alarms-1-0?revision=2022-05-09)siae-alarms-1-0\"},{\"capability\":\"(http://yuma123.org/ns/yuma123-system?revision=2017-03-26)yuma123-system\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(http://netconfcentral.org/ns/yuma-ncx?revision=2012-01-13)yuma-ncx\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:qos-profile-1-0?revision=2022-04-05)qos-profile-1-0\"},{\"capability\":\"(urn:ietf:params:xml:ns:yang:ietf-netconf-with-defaults?revision=2011-06-01)ietf-netconf-with-defaults\",\"capability-origin\":\"device-advertised\"},{\"capability\":\"(urn:onf:yang:ethernet-container-2-0?revision=2022-04-05)ethernet-container-2-0\"}]}},{\"node-id\":\"CO13306\",\"netconf-node-topology:port\":33010,\"netconf-node-topology:connection-status\":\"connecting\",\"netconf-node-topology:host\":\"172.28.127.8\"}]}]}"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});
