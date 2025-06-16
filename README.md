# NotificationProxy - NP

### Location
The NotificationProxy is part of the HighPerformanceNetworkInterface.

### Description
The NotificationProxy allows subscribing for DeviceNotifications and ControllerNotifications according to the ONF TR-532 definitions.  

It encapsulates all necessary formats and communication required for that. This includes:  
- It opens the necessary permanent HTTP connections for receiving notifications of all controllers.  
- It opens the necessary permanent HTTP connections for receiving notifications of all mounted devices.  
- Wherever required, it is translating notification formats (e.g. ODL=>ONF or IETF=>ONF).  
- It translates the event stream based method for forwarding notifications applied by OpenDaylight to the webhook based method applied in the MW SDN application layer.  
- It removes duplicates potentially caused by the controller architecture.  

### Relevance
The NotificationProxy significantly reduces the implementation efforts of every application that requires receiving notifications.
This includes not just Closed-Loop-Automation applications, but also very fundamental Inventories.

### Resources
- [Specification](./spec/)
- [TestSuite](./testing/)
- [Implementation](./server/)

### Configuration
In order to configure the SDN controller login, you have to edit these lines in the .env file of your docker-compose workspace.
There are two basic auth logins for controller notifications resp. device notifications:

CONTROLLER_USER=xxx
CONTROLLER_PASSWORD=xxx

DEVICE_USER=xxx
DEVICE_PASSWORD=xxx

### Latest Updates  

#### v1.1.0
Release v.1.1.0 introduces the integration with a Kafka message broker.  

MWDI subscribing to NotificationProxy (NP) directly, which lead to NP pushing notifications to MWDI, showed that there were major performance issues due to how notifications were transferred to MWDI (for each notification a new session has to be opened, if the MWDI *regard*-services are called).  
To improve performance, NP will act as producer to Kafka, i.e. it will send the notifications (after bringing them into the correct format) to Kafka.  
- *All* notifications are sent to topic *all_notifications* (i.e. both proper notifications and proprietary notifications)
- Kafka will sort the notifications from *all_notifications* topic into separate Kafka topics, from where consumers (e.g. MWDI) can pull them

#### v1.0.2
The v1.0.2 release adds the following specification changes:

- update the specification to use the new ApplicationPattern release 2.1.2
- operation client update for MWDI to the latest MWDI spec version 1.2.0  

There were no additions or changes to individual services or other bug fixes.

### Comments
./.
