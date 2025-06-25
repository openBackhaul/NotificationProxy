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
Release v.1.1.0 introduces integration with a Kafka message broker.  

Notification types:
- *Controller notifications*: handling of Controller notifications has not been changed.
  - Those are not pushed to Kafka, applications interested in receiving those still need to subscribe to NotificationProxy directly. 
  - This decision is based on the fact, that in the future Controller notifications will not be handed over from Controller to NP directly, but will be managed by future app ControllerDomainManager.
- *Device change and alarm notifications*: handling of device change notifications has changed - those are now pushed to Kafka.
- *Proprietary notifications*: those are not received and managed by NotificationProxy and, thus, out of scope.

Kafka sends all ONF TR-532 device change notifications to Kafka topic *all_notifications* after bringing them into the required format (in regards to the included resource path).  
Sorting the notifications into separate topics (e.g. *device_change_notifications* and *device_alarm_notifications*) on Kafka, from where consumers then can pull them, will not be done by the NotificationProxy but by other means (e.g. a KafkaStreams application).  

Details on changes can be seen in issue collection [NP v1.1.0_spec](https://github.com/openBackhaul/NotificationProxy/milestone/3).  
Any findings during implementer review or still open issues will be handled in issue collection [NP v1.1.1_spec](https://github.com/openBackhaul/NotificationProxy/milestone/7).  

#### v1.0.2
The v1.0.2 release adds the following specification changes:

- update the specification to use the new ApplicationPattern release 2.1.2
- operation client update for MWDI to the latest MWDI spec version 1.2.0  

There were no additions or changes to individual services or other bug fixes.

### Comments
./.
