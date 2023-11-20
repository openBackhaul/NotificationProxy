module.exports.individualServicesOperationsMapping =
    {
        //derived from config json
        "NotificationProxyOperation": {
            "/rests/operations/sal-remote:create-data-change-event-subscription": {
                "api-segment": "is",
                "sequence": "000"
            },
            "/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/data-change-event-subscription/network-topology:network-topology/datastore=CONFIGURATION/scope=SUBTREE/JSON?changed-leaf-nodes-only=true": {
                "api-segment": "is",
                "sequence": "001"
            },
            "/rests/notif/data-change-event-subscription/network-topology:network-topology/datastore=CONFIGURATION/scope=SUBTREE/JSON": {
                "api-segment": "is",
                "sequence": "002"
            },
            "/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/data-change-event-subscription/network-topology:network-topology/datastore=OPERATIONAL/scope=SUBTREE/JSON?changed-leaf-nodes-only=true": {
                "api-segment": "is",
                "sequence": "003"
            },
            "/rests/notif/data-change-event-subscription/network-topology:network-topology/datastore=OPERATIONAL/scope=SUBTREE/JSON": {
                "api-segment": "is",
                "sequence": "004"
            },
            "/rests/notif/device?notificationType=device": {
                "api-segment": "is",
                "sequence": "005"
            },
        },

        //np actions
        "/v1/add-controller": {
            "/v1/add-controller": {
                "api-segment": "is",
                "sequence": "000"
            },
        },
        "/v1/listen-to-controller": {
            "/v1/listen-to-controller": {
                "api-segment": "is",
                "sequence": "001"
            },
        },
        "/v1/remove-controller": {
            "/v1/remove-controller": {
                "api-segment": "is",
                "sequence": "002"
            },
        },

        "/v1/notify-controller-attribute-value-changes": {
            "/v1/notify-controller-attribute-value-changes": {
                "api-segment": "is",
                "sequence": "011"
            },
        },
        "/v1/notify-controller-object-creations": {
            "/v1/notify-controller-object-creations": {
                "api-segment": "is",
                "sequence": "012"
            },
        },
        "/v1/notify-controller-object-deletions": {
            "/v1/notify-controller-object-deletions": {
                "api-segment": "is",
                "sequence": "013"
            },
        },
        "/v1/notify-device-alarms": {
            "/v1/notify-device-alarms": {
                "api-segment": "is",
                "sequence": "020"
            },
        },
        "/v1/notify-device-attribute-value-changes": {
            "/v1/notify-device-attribute-value-changes": {
                "api-segment": "is",
                "sequence": "021"
            },
        },
        "/v1/notify-device-object-creations": {
            "/v1/notify-device-object-creations": {
                "api-segment": "is",
                "sequence": "022"
            },
        },
        "/v1/notify-device-object-deletions": {
            "/v1/notify-device-object-deletions": {
                "api-segment": "is",
                "sequence": "023"
            },
        },

        //external callback functions
        "/v1/regard-controller-attribute-value-change": {
            "/v1/regard-controller-attribute-value-change": {
                "api-segment": "is",
                "sequence": "111"
            },
        },
        "/v1/regard-controller-object-creation": {
            "/v1/regard-controller-object-creation": {
                "api-segment": "is",
                "sequence": "112"
            },
        },
        "/v1/regard-controller-object-deletion": {
            "/v1/regard-controller-object-deletion": {
                "api-segment": "is",
                "sequence": "113"
            },
        },
        "/v1/regard-device-alarm": {
            "/v1/regard-device-alarm": {
                "api-segment": "is",
                "sequence": "120"
            },
        },
        "/v1/regard-device-attribute-value-change": {
            "/v1/regard-device-attribute-value-change": {
                "api-segment": "is",
                "sequence": "121"
            },
        },
        "/v1/regard-device-object-creation": {
            "/v1/regard-device-object-creation": {
                "api-segment": "is",
                "sequence": "122"
            },
        },
        "/v1/regard-device-object-deletion": {
            "/v1/regard-device-object-deletion": {
                "api-segment": "is",
                "sequence": "123"
            },
        },
    }