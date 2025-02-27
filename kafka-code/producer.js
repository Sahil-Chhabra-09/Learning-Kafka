const { kafka } = require("./connect");

//creating producer

const init = async () => {
  const producer = kafka.producer();
  console.log("Connecting producer");
  await producer.connect();
  console.log("Producer connected");

  console.log("Producing message");
  await producer.send({
    topic: "rider-updates",
    messages: [
      {
        key: "rider-id1",
        partition: 0,
        value: JSON.stringify({
          name: "tony",
          location: "left restaurant",
          id: "rider-id1",
          location: "gurgaon",
        }),
      },
    ],
  });
  console.log("Disconnecting producer...");
  await producer.disconnect();
  console.log("Producer disconnected");
};

init();
