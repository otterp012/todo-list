const { MongoClient, ServerApiVersion } = require("mongodb");
const { url } = require("./url.js");
// 1번째 방법
// const client = new MongoClient(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// client.connect((err) => {
//   const collection = client.db("todo_list").collection("todo_item");
//   client.close();
// });

// 2번째 방법
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
