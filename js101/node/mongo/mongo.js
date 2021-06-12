const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://dufu:dufu%230902@cluster0.7j2kq.gcp.mongodb.net/test?retryWrites=true&w=majority";

async function testConnect() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();
    const collection = client.db("test").collection("devices");
    const res = await collection.insertOne({ deviceId: 1, name: "一号设备" });
    client.close();
  } catch (err) {
    console.log("连接失败:", err);
  }
}


async function getAllCmdName() {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const cmd = client.db("test").collection("cmd");
  res = await cmd.find({}, { projection: { _id: 0, name: 1 } }).toArray();
  client.close();
  return res;
}

async function getDocByName(name) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const cmd = client.db("test").collection("cmd");
  res = await cmd.findOne({ name });
  client.close();
  return res;
}

async function test() {
  console.log("测试查询所有数据");
  var res1 = await getAllCmdName();
  console.log(res1);
  console.log("测试根据名称查询");
  var res2 = await getDocByName("ls");
  console.log(res2);
}

module.exports = { getAllCmdName, getDocByName };
