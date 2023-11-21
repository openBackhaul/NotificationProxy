const notificationConverter = require('./NotificationConverter');
const configConstants = require("./ConfigConstants");

//contains all controller notifications

test('Controller-Configuration: Mount point creation', () => {

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
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "network-topology:node-id",
                "new-value": "513250009",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:sleep-factor",
                "new-value": "2.5",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:max-connection-attempts",
                "new-value": 8,
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:username",
                "new-value": "admin",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:password",
                "new-value": "admin",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:schema-cache-directory",
                "new-value": "siae_alcp2e",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:port",
                "new-value": 33001,
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:reconnect-on-changed-schema",
                "new-value": false,
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:tcp-only",
                "new-value": false,
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:keepalive-delay",
                "new-value": 120,
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:concurrent-rpc-limit",
                "new-value": 0,
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:21:50.526721696Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:host",
                "new-value": "172.28.127.8",
                "counter": -1
            }
        }
    ];

    for (let i = 0; i < 12; i++) {
        expect(output[i].notificationMessage).toStrictEqual(outputExpected[i]);
    }
});

test('Controller-Configuration: Mount point deletion', () => {

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
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-10T11:33:54.374842218Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        }
    ];

    for (let i = 0; i < 11; i++) {
        expect(output[i].notificationMessage).toStrictEqual(outputExpected[i]);
    }
});

test('Controller-Configuration: Configuration changes on Mount point', () => {

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
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.086561862Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:max-connection-attempts",
                "new-value": 7,
                "counter": -1
            }
        }
    ];

    expect(output[0].notificationMessage).toStrictEqual(outputExpected[0]);
});

test('Controller-Operational: Connection status will move into connecting, Session will be deleted.', () => {

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
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.087239632Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:connection-status",
                "new-value": "connecting",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.087239632Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        }
    ];

    expect(output[0].notificationMessage).toStrictEqual(outputExpected[0]);
    expect(output[1].notificationMessage).toStrictEqual(outputExpected[1]);
});

test('Controller-Operational: Mountname, Port, Host, Connecting Status  - All these mandatory attributes will get deleted.', () => {

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
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.097251371Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.097251371Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.097251371Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.097251371Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "counter": -1
            }
        }
    ];

    expect(output[0].notificationMessage).toStrictEqual(outputExpected[0]);
    expect(output[1].notificationMessage).toStrictEqual(outputExpected[1]);
    expect(output[2].notificationMessage).toStrictEqual(outputExpected[2]);
    expect(output[3].notificationMessage).toStrictEqual(outputExpected[3]);
});

test('Controller-Operational: Mountname, Port, Host, Connecting Status  - All these mandatory attributes will get created.', () => {

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
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.097669461Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "network-topology:node-id",
                "new-value": "513250009",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.097669461Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:port",
                "new-value": 33001,
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.097669461Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:connection-status",
                "new-value": "connecting",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.097669461Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:host",
                "new-value": "172.28.127.8",
                "counter": -1
            }
        }
    ];

    expect(output[0].notificationMessage).toStrictEqual(outputExpected[0]);
    expect(output[1].notificationMessage).toStrictEqual(outputExpected[1]);
    expect(output[2].notificationMessage).toStrictEqual(outputExpected[2]);
    expect(output[3].notificationMessage).toStrictEqual(outputExpected[3]);
});

test('Controller-Operational: Connection status will move into Connected, Session will be created.', () => {

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
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.280265086Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:connection-status",
                "new-value": "connected",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.280265086Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:session-id",
                "new-value": 1,
                "counter": -1
            }
        }
    ];

    expect(output[0].notificationMessage).toStrictEqual(outputExpected[0]);
    expect(output[1].notificationMessage).toStrictEqual(outputExpected[1]);
});

test('Controller-Configuration: Connection Status Change', () => {

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
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.280265086Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:connection-status",
                "new-value": "connected",
                "counter": -1
            }
        },
        {
            "notification-proxy-1-0:attribute-value-changed-notification": {
                "timestamp": "2023-07-11T08:38:29.280265086Z",
                "resource": "/core-model-1-4:network-control-domain=live/control-construct=odl-6/logical-termination-point=513250009/layer-protocol=0/mount-point-1-0:mount-point-pac/mount-point-status",
                "attribute-name": "netconf-node-topology:session-id",
                "new-value": 1,
                "counter": -1
            }
        }
    ];

    expect(output[0].notificationMessage).toStrictEqual(outputExpected[0]);
    expect(output[1].notificationMessage).toStrictEqual(outputExpected[1]);
});