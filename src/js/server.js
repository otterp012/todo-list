const { MongoClient, ServerApiVersion } = require('mongodb');
const url =
  'mongodb+srv://otter0:a123456@cluster0.xxyzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'todo_list';

// promise
const findDBList = async (serchInfor) => {
  let result;
  await client.connect();
  console.log('Connected correctly to server');
  const db = client.db(dbName);
  const col = db.collection('todo_item');

  result = await col.find({}).toArray();

  client.close();
  return result;
};

// promise
const InsertDBList = async () => {
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection('todo_item');
  const card = {
    focusedCardID: null,
    newInputCard: {
      tittle: '3',
      text: '3',
    },
  };
  const result = await col.insertOne(card);
  await client.close();
};

// 웹팩이랑 오류나서 실제로 적용하진 못했습니다.
