const { MongoClient, ServerApiVersion } = require("mongodb");
const { url } = require("./url.js");
const client = new MongoClient(url);
const dbName = "todo_list";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("todo_item");

    let card = {
      focusedCardID: null,
      newInputCard: {
        cardID: null,
        tittle: null,
        text: null,
      },
      nextCardID: "A",
    };

    const insertCard = await col.insertOne(card);
    const theCard = await col.findOne();
    console.log(theCard);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
