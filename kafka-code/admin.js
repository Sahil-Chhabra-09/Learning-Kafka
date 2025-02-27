const { kafka } = require("./connect");

//creation of topics

const init = async () => {
  const admin = kafka.admin();
  console.log("Admin Connecting");
  await admin.connect();
  console.log("Admin connected");

  console.log("Creating topic 'rider-updates'");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic 'rider-updates' created");

  console.log("Disconnecting Admin...");
  await admin.disconnect();
  console.log("Admin disconnected");
};

init();
