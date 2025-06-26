const { Kafka } = require("kafkajs");
const process = require('process');
const logger = require("../LoggingService.js").getLogger();

const clientId = "notification-proxy";
const brokers = [process.env['KAFKA_BROKER'] || "localhost:9092"]; // Default to localhost if not set
let producer = null;

exports.connect = async function () {
    const kafka = new Kafka({
        clientId,
        brokers,
    });
    producer = kafka.producer();
    await producer.connect();
    logger.info(`Kafka producer connected to brokers: ${brokers.join(", ")}`);
};

exports.sendMessage = async function (topic, message) {
    if (!producer) {
        logger.error("Kafka producer is not connected. Call connect() first.");
        return;
    }
    try {
        await producer.send({
            topic: topic,
            messages: [
                {
                    value: JSON.stringify(message),
                },
            ],
        });
        logger.info(`Message sent to topic ${topic}: ${JSON.stringify(message)}`);
    } catch (error) {
        logger.error(`Error sending message to topic ${topic}: ${error}`);
    }
};