# NotificationProxy - NP

### Location
The NotificationProxy would be part of the HighPerformanceNetworkInterface.

### Description
Problems:
- Tons of connections to be maintained: If an application would like to receive notifications from the devices, it would have to establish permanent HTTP connections to the ODL. This connections would relate to an individual device. (If no grouping feature would be added to the ODL), the application would need to open and maintain approximately 40,000 permanent HTTP connections to receive notifications from all devices.  
- No filtering: On the other hand, an individual application usually just requires a subset of notifications (e.g. related with the AirInterface, or related with HW temperature, or related with frame loss), but not all kinds of notifications provided by a device.
- Missed notifications: Existing solution just forwards received notifications as a stream. If the connection to the device would have been down in past, notifications missed during that period would never reach the application layer.

Proposed solution:
- Adding a NotificationProxy application between the actual consumers of notifications and ODL.  
- Clients at its SBI: The NotificationProxy application shall maintain the approximately 40,000 permanent HTTP connections (if no grouping feature would be added to the ODL) and receive all notifications.  
- Servers at its NBI: The NotificationProxy application shall allow subscribing for specific kinds of notifications.  
- The NotificationProxy shall also transfer between the event stream based method for forwarding notifications applied by ODL and the webhook based method generally applied in the application layer.
- (If no such function would be added to the ODL) The NotificationProxy shall permanently track the sequence number of the notifications sent by a device and request for re-sending notifications in case of gaps in the received sequence numbers (passing the request for re-sending past notifications might require an additional feature in ODL).

### Relevance
The NotificationProxy significantly reduces the implementation efforts of every application that requires receiving notifications.
This includes not just Closed-Loop-Automation applications, but also very fundamental Inventories.

### Resources
- [Specification](./spec/)
- [TestSuite](./testing/)
- [Implementation](./server/)

### Comments
This application will be specified during [training for ApplicationOwners](https://gist.github.com/openBackhaul/5aabdbc90257b83b9fe7fc4da059d3cd).
