const { kafka } = require("./connect");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//creating producer

const init = async () => {
  const producer = kafka.producer();
  console.log("Connecting producer");
  await producer.connect();
  console.log("Producer connected");

  console.log("Producing message");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    //input: tony South
    const [riderName, location] = line.split(" ");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          key: "rider-id1",
          partition: location.toLowerCase() === "north" ? 0 : 1,
          value: JSON.stringify({
            name: riderName,
            location: location,
            id: "rider-id1",
            location: "gurgaon",
          }),
        },
      ],
    });
  }).on("close", async () => {
    console.log("Disconnecting producer...");
    await producer.disconnect();
    console.log("Producer disconnected");
  });
};

init();
