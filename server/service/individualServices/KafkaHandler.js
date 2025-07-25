const LayerProtocol = require('onf-core-model-ap/applicationPattern/onfModel/models/LayerProtocol');
const controlConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ControlConstruct');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const kafka = require("onf-core-model-ap/applicationPattern/services/KafkaProducerService");
const TcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');


exports.connectToKafka = async function () {
    try {
        let ltpForKafkaClient = await exports.getKafkaClient();
        let clientId = await exports.getKafkaClientId(ltpForKafkaClient);
        let brokerList = [].concat(await exports.getBrokerForKafka(ltpForKafkaClient));
        await kafka.connect(clientId, brokerList);
    } catch(error) {
        console.log("Error in connection to kafka");
        console.log(error);
    }
}

exports.getBrokerForKafka = async function(kafkaClientLtp) {
    try {
        let broker = "";
        let kafkaHttpClientLtpUuid = kafkaClientLtp[onfAttributes.LOGICAL_TERMINATION_POINT.SERVER_LTP][0];
        let kafkaHttpClientLtp = await controlConstruct.getLogicalTerminationPointAsync(kafkaHttpClientLtpUuid);
        let kafkaTcpClientLtpUuid = kafkaHttpClientLtp[onfAttributes.LOGICAL_TERMINATION_POINT.SERVER_LTP][0];
        let remoteAddress = await TcpClientInterface.getRemoteAddressAsync(kafkaTcpClientLtpUuid);
        let address = "";
        if(remoteAddress.hasOwnProperty(onfAttributes.TCP_CLIENT.IP_ADDRESS)) {
            address = remoteAddress[onfAttributes.TCP_CLIENT.IP_ADDRESS][onfAttributes.TCP_CLIENT.IPV_4_ADDRESS];
        } else if(remoteAddress.hasOwnProperty(onfAttributes.TCP_CLIENT.DOMAIN_NAME)) {
            address = remoteAddress[onfAttributes.TCP_CLIENT.DOMAIN_NAME];
        }
        let remotePort = await TcpClientInterface.getRemotePortAsync(kafkaTcpClientLtpUuid);
        broker = address + ":" + remotePort;
        return broker;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.getKafkaClient = async function() {
    try {
        let ltpListForKafkaClient = await controlConstruct.getLogicalTerminationPointListAsync(LayerProtocol.layerProtocolNameEnum.KAFKA_CLIENT);
        let ltpForKafkaClient = ltpListForKafkaClient[0];
        return ltpForKafkaClient;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

exports.getKafkaClientId = async function(kafkaClientLtp) {
    try {
        let kafkaConfig = kafkaClientLtp[onfAttributes.LOGICAL_TERMINATION_POINT.LAYER_PROTOCOL][0][onfAttributes.LAYER_PROTOCOL.KAFKA_CLIENT_INTERFACE_PAC][onfAttributes.KAFKA_CLIENT.CONFIGURATION];
        let clientId = kafkaConfig[onfAttributes.KAFKA_CLIENT.CLIENT_ID];
        return clientId;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

exports.getKafkaTopicName = async function(kafkaClientLtp) {
    try {
        let kafkaConfig = kafkaClientLtp[onfAttributes.LOGICAL_TERMINATION_POINT.LAYER_PROTOCOL][0][onfAttributes.LAYER_PROTOCOL.KAFKA_CLIENT_INTERFACE_PAC][onfAttributes.KAFKA_CLIENT.CONFIGURATION];
        let topicName = kafkaConfig[onfAttributes.KAFKA_CLIENT.TOPIC_NAME];
        return topicName;
    } catch (error) {
        console.log(error);y
        return undefined;
    }
}

