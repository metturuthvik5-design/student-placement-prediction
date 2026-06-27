require("dotenv").config();

const { MongoClient } = require("mongodb");

(async () => {
  try {
    console.log("Connecting...");
    console.log(process.env.MONGO_URI);

    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    console.log("✅ CONNECTED!");

    await client.close();
  } catch (e) {
    console.log("ERROR:");
    console.log(e);
  }
})();