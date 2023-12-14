const notificationConverter = require('../NotificationConverter');
const configConstants = require("../ConfigConstants");

//contains all controller notifications

test('Controller-Configuration: Mount point creation', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [{
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-TBD-params-xml-ns-yang-network-topology:node-id",
                    "data": {"network-topology:node-id": "513250009"},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:sleep-factor",
                    "data": {"netconf-node-topology:sleep-factor": "2.5"},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:max-connection-attempts",
                    "data": {"netconf-node-topology:max-connection-attempts": 8},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:credentials/urn-opendaylight-netconf-node-topology:username",
                    "data": {"netconf-node-topology:username": "admin"},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:credentials/urn-opendaylight-netconf-node-topology:password",
                    "data": {"netconf-node-topology:password": "admin"},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:schema-cache-directory",
                    "data": {"netconf-node-topology:schema-cache-directory": "siae_alcp2e"},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:port",
                    "data": {"netconf-node-topology:port": 33001},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:reconnect-on-changed-schema",
                    "data": {"netconf-node-topology:reconnect-on-changed-schema": false},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:tcp-only",
                    "data": {"netconf-node-topology:tcp-only": false},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:keepalive-delay",
                    "data": {"netconf-node-topology:keepalive-delay": 120},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:concurrent-rpc-limit",
                    "data": {"netconf-node-topology:concurrent-rpc-limit": 0},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:host",
                    "data": {"netconf-node-topology:host": "172.28.127.8"},
                    "operation": "created"
                }]
            }, "event-time": "2023-07-11T08:21:50.526721696Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/node-id",
                    "object-type": "node-id"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 2,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/sleep-factor",
                    "object-type": "sleep-factor"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 3,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/max-connection-attempts",
                    "object-type": "max-connection-attempts"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 4,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/username",
                    "object-type": "username"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 5,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/password",
                    "object-type": "password"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 6,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/schema-cache-directory",
                    "object-type": "schema-cache-directory"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 7,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/port",
                    "object-type": "port"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 8,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/reconnect-on-changed-schema",
                    "object-type": "reconnect-on-changed-schema"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 9,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/tcp-only",
                    "object-type": "tcp-only"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 10,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/keepalive-delay",
                    "object-type": "keepalive-delay"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 11,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/concurrent-rpc-limit",
                    "object-type": "concurrent-rpc-limit"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 12,
                    "timestamp": "2023-07-11T08:21:50.526721696Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/host",
                    "object-type": "host"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Configuration: Mount point deletion', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [{
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-TBD-params-xml-ns-yang-network-topology:node-id",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:sleep-factor",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:max-connection-attempts",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:credentials/urn-opendaylight-netconf-node-topology:username",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:credentials/urn-opendaylight-netconf-node-topology:password",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:schema-cache-directory",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:port",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:reconnect-on-changed-schema",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:tcp-only",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:keepalive-delay",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:host",
                    "operation": "deleted"
                }]
            }, "event-time": "2023-07-10T11:33:54.374842218Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/node-id"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 2,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/sleep-factor"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 3,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/max-connection-attempts"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 4,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/username"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 5,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/password"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 6,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/schema-cache-directory"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 7,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/port"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 8,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/reconnect-on-changed-schema"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 9,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/tcp-only"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 10,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/keepalive-delay"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 11,
                    "timestamp": "2023-07-10T11:33:54.374842218Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/host"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Configuration: Configuration changes on Mount point', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [{
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:max-connection-attempts",
                    "data": {"netconf-node-topology:max-connection-attempts": 7},
                    "operation": "updated"
                }]
            }, "event-time": "2023-07-11T08:38:29.086561862Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.086561862Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "max-connection-attempts",
                    "new-value": "7"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Operational: Connection status will move into connecting, Session will be deleted.', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [{
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:connection-status",
                    "data": {"netconf-node-topology:connection-status": "connecting"},
                    "operation": "updated"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:session-id",
                    "operation": "deleted"
                }]
            }, "event-time": "2023-07-11T08:38:29.087239632Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.087239632Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "connection-status",
                    "new-value": "connecting"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.087239632Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/session-id"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Operational: Mountname, Port, Host, Connecting Status  - All these mandatory attributes will get deleted.', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [{
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-TBD-params-xml-ns-yang-network-topology:node-id",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:port",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:connection-status",
                    "operation": "deleted"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:host",
                    "operation": "deleted"
                }]
            }, "event-time": "2023-07-11T08:38:29.097251371Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.097251371Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/node-id"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 2,
                    "timestamp": "2023-07-11T08:38:29.097251371Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/port"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 3,
                    "timestamp": "2023-07-11T08:38:29.097251371Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/connection-status"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 4,
                    "timestamp": "2023-07-11T08:38:29.097251371Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/host"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Operational: Mountname, Port, Host, Connecting Status  - All these mandatory attributes will get created.', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [{
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-TBD-params-xml-ns-yang-network-topology:node-id",
                    "data": {"network-topology:node-id": "513250009"},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:port",
                    "data": {"netconf-node-topology:port": 33001},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:connection-status",
                    "data": {"netconf-node-topology:connection-status": "connecting"},
                    "operation": "created"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:host",
                    "data": {"netconf-node-topology:host": "172.28.127.8"},
                    "operation": "created"
                }]
            }, "event-time": "2023-07-11T08:38:29.097669461Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.097669461Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/node-id",
                    "object-type": "node-id"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 2,
                    "timestamp": "2023-07-11T08:38:29.097669461Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/port",
                    "object-type": "port"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 3,
                    "timestamp": "2023-07-11T08:38:29.097669461Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/connection-status",
                    "object-type": "connection-status"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 4,
                    "timestamp": "2023-07-11T08:38:29.097669461Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/host",
                    "object-type": "host"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Operational: Connection status will move into Connected, Session will be created.', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [{
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:connection-status",
                    "data": {"netconf-node-topology:connection-status": "connected"},
                    "operation": "updated"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:session-id",
                    "data": {"netconf-node-topology:session-id": 1},
                    "operation": "created"
                }]
            }, "event-time": "2023-07-11T08:38:29.280265086Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.280265086Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "connection-status",
                    "new-value": "connected"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.280265086Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/session-id",
                    "object-type": "session-id"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Configuration: Connection Status Change', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [{
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:connection-status",
                    "data": {"netconf-node-topology:connection-status": "connected"},
                    "operation": "updated"
                }, {
                    "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513250009']/urn-opendaylight-netconf-node-topology:session-id",
                    "data": {"netconf-node-topology:session-id": 1},
                    "operation": "created"
                }]
            }, "event-time": "2023-07-11T08:38:29.280265086Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.280265086Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "connection-status",
                    "new-value": "connected"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 1,
                    "timestamp": "2023-07-11T08:38:29.280265086Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/session-id",
                    "object-type": "session-id"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Configuration: testset2 1', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:topology-id",
                        "data": {
                            "network-topology:topology-id": "topology-netconf"
                        },
                        "operation": "updated"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:sleep-factor",
                        "data": {
                            "netconf-node-topology:sleep-factor": "2.2"
                        },
                        "operation": "updated"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-TBD-params-xml-ns-yang-network-topology:node-id",
                        "data": {
                            "network-topology:node-id": "CO13305"
                        },
                        "operation": "updated"
                    }
                ]
            },
            "event-time": "2023-11-29T06:18:33.73139812Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 1,
                    "timestamp": "2023-11-29T06:18:33.73139812Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=unknown/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "topology-id",
                    "new-value": "topology-netconf"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 2,
                    "timestamp": "2023-11-29T06:18:33.73139812Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "sleep-factor",
                    "new-value": "2.2"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 3,
                    "timestamp": "2023-11-29T06:18:33.73139812Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "node-id",
                    "new-value": "CO13305"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Operation: testset2 2', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:connection-status",
                        "data": {
                            "netconf-node-topology:connection-status": "connecting"
                        },
                        "operation": "updated"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:session-id",
                        "operation": "deleted"
                    }
                ]
            },
            "event-time": "2023-11-29T06:18:33.7357697Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 1,
                    "timestamp": "2023-11-29T06:18:33.7357697Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "connection-status",
                    "new-value": "connecting"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 1,
                    "timestamp": "2023-11-29T06:18:33.7357697Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/session-id"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Operation: testset2 3', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-TBD-params-xml-ns-yang-network-topology:node-id",
                        "operation": "deleted"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:port",
                        "operation": "deleted"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:connection-status",
                        "operation": "deleted"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:host",
                        "operation": "deleted"
                    }
                ]
            },
            "event-time": "2023-11-29T06:18:33.75184699Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 1,
                    "timestamp": "2023-11-29T06:18:33.75184699Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/node-id"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 2,
                    "timestamp": "2023-11-29T06:18:33.75184699Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/port"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 3,
                    "timestamp": "2023-11-29T06:18:33.75184699Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/connection-status"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 4,
                    "timestamp": "2023-11-29T06:18:33.75184699Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/host"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Operation: testset2 4', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-TBD-params-xml-ns-yang-network-topology:node-id",
                        "data": {
                            "network-topology:node-id": "CO13305"
                        },
                        "operation": "created"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:port",
                        "data": {
                            "netconf-node-topology:port": 33009
                        },
                        "operation": "created"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:connection-status",
                        "data": {
                            "netconf-node-topology:connection-status": "connecting"
                        },
                        "operation": "created"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:host",
                        "data": {
                            "netconf-node-topology:host": "172.28.127.8"
                        },
                        "operation": "created"
                    }
                ]
            },
            "event-time": "2023-11-29T06:18:33.75953913Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 1,
                    "timestamp": "2023-11-29T06:18:33.75953913Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/node-id",
                    "object-type": "node-id"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 2,
                    "timestamp": "2023-11-29T06:18:33.75953913Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/port",
                    "object-type": "port"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 3,
                    "timestamp": "2023-11-29T06:18:33.75953913Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/connection-status",
                    "object-type": "connection-status"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 4,
                    "timestamp": "2023-11-29T06:18:33.75953913Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/host",
                    "object-type": "host"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('Controller-Operation: testset2 5', () => {

    notificationConverter.resetAllCounters();

    let input = {
        "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
            "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                "data-change-event": [
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:connection-status",
                        "data": {
                            "netconf-node-topology:connection-status": "connected"
                        },
                        "operation": "updated"
                    },
                    {
                        "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='CO13305']/urn-opendaylight-netconf-node-topology:session-id",
                        "data": {
                            "netconf-node-topology:session-id": 2
                        },
                        "operation": "created"
                    }
                ]
            },
            "event-time": "2023-11-29T06:18:33.955056128Z"
        }
    };

    let output = notificationConverter.convertControllerNotification(input, "odl-6", "2.0.1");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 1,
                    "timestamp": "2023-11-29T06:18:33.955056128Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "connection-status",
                    "new-value": "connected"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-creations",
            "notificationMessage": {
                "notification-proxy-1-0:object-creation-notification": {
                    "counter": 1,
                    "timestamp": "2023-11-29T06:18:33.955056128Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=CO13305/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/session-id",
                    "object-type": "session-id"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});

test('zia test issue #62', () => {

    let input =
        {
            "urn-ietf-params-xml-ns-netconf-notification-1.0:notification": {
                "urn-opendaylight-params-xml-ns-yang-controller-md-sal-remote:data-changed-notification": {
                    "data-change-event": [
                        {
                            "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513559991A']/urn-opendaylight-netconf-node-topology:connection-status",
                            "data": {
                                "netconf-node-topology:connection-status": "connecting"
                            },
                            "operation": "updated"
                        },
                        {
                            "path": "/urn-TBD-params-xml-ns-yang-network-topology:network-topology/urn-TBD-params-xml-ns-yang-network-topology:topology/urn-TBD-params-xml-ns-yang-network-topology:topology[urn-TBD-params-xml-ns-yang-network-topology:topology-id='topology-netconf']/urn-TBD-params-xml-ns-yang-network-topology:node/urn-TBD-params-xml-ns-yang-network-topology:node[urn-TBD-params-xml-ns-yang-network-topology:node-id='513559991A']/urn-opendaylight-netconf-node-topology:session-id",
                            "operation": "deleted"
                        }
                    ]
                },
                "event-time": "2023-12-14T07:28:58.668165416Z"
            }
        };

    let output = notificationConverter.convertControllerNotification(input, "OpenDayLight1", "1.2.3");

    let outputExpected = [
        {
            "subscriberNotificationType": "/v1/notify-controller-attribute-value-changes",
            "notificationMessage": {
                "notification-proxy-1-0:attribute-value-changed-notification": {
                    "counter": 2,
                    "timestamp": "2023-12-14T07:28:58.668165416Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=OpenDayLight1/logical-termination-point=513559991A/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration",
                    "attribute-name": "connection-status",
                    "new-value": "connecting"
                }
            }
        },
        {
            "subscriberNotificationType": "/v1/notify-controller-object-deletions",
            "notificationMessage": {
                "notification-proxy-1-0:object-deletion-notification": {
                    "counter": 1,
                    "timestamp": "2023-12-14T07:28:58.668165416Z",
                    "resource": "/core-model-1-4:network-control-domain=live/control-construct=OpenDayLight1/logical-termination-point=513559991A/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-configuration/session-id"
                }
            }
        }
    ];

    expect(output).toStrictEqual(outputExpected);
});
