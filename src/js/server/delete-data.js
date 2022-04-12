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

    // 이하 두 줄이 데이터 삭제방법! 쿼리날려서 삭제하시면 됩니다!
    const query = { deletedCard: 1 };
    const result = await col.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
