const { kafka } = require("./connect");

const init = async () => {
  const consumer = kafka.consumer({ groupId: "user-1" });
  console.log("Consumer connecting");
  await consumer.connect();
  console.log("Consumer connected");

  console.log("Subscribing to 'rider-updates'");
  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });
  console.log("Subscribed to 'rider-updates'");

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
        topic: topic,
        partition: partition,
      });
    },
  });
};

init();
