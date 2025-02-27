const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["10.15.18.161:9092"],
});

module.exports = { kafka };
