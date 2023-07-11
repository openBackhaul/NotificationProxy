# NotificationProxy - NP

### Location
The NotificationProxy would be part of the HighPerformanceNetworkInterface.

### Description
The NotificationProxy opens the necessary permanent HTTP connections for receiving notifications of all connected devices and allows subscribing for specific kinds of notifications.  

It is translating between the event stream based method for forwarding notifications applied by OpenDaylight and the webhook based method applied in the MW SDN application layer.  

### Relevance
The NotificationProxy significantly reduces the implementation efforts of every application that requires receiving notifications.
This includes not just Closed-Loop-Automation applications, but also very fundamental Inventories.

### Resources
- [Specification](./spec/)
- [TestSuite](./testing/)
- [Implementation](./server/)

### Comments
This application will be specified during [training for ApplicationOwners](https://gist.github.com/openBackhaul/5aabdbc90257b83b9fe7fc4da059d3cd).
