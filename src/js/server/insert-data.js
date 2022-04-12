const { MongoClient, ServerApiVersion } = require("mongodb");
const url =
  "mongodb+srv://second_user:12345678a@sample0.fawpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "todo_list";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("todo_item");

    // 카드 입력
    const card = {
      focusedCardID: null,
      newInputCard: {
        tittle: "3",
        text: "3",
      },
    };
    const insertCard = await col.insertOne(card);
    // const theCard = await col.findOne();

    // console.log(card); // 입력된 카드 내용
    // console.log(card._id); // 카드 ObjectId
    // console.log(col);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
