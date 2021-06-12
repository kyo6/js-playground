const express = require('express')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const fse = require('fs-extra')
const path = require('path')
const fs = require('fs')

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const UPLOAD_DIR = path.resolve(__dirname, 'public/upload')

app.get("/data1", function (req, res) {
  setTimeout(() => {
    res.json({ name: "product1", price: 399, count: "50" });
  }, 1000 + Math.random() * 3000)
})

app.get("/data2", function (req, res) {
  setTimeout(() => {
    res.json({ name: "product2", price: 99, count: "5000" });
  }, 1000 + Math.random() * 3000);
 
});

app.post("/upload", function (req, res) {
  const form = new multiparty.Form({ uploadDir: "temp" });
  form.parse(req);
  form.on("file", async (name, chunk) => {
    let chunkDir = `${UPLOAD_DIR}/${chunk.originalFilename.split('.')[0]}`;
    if (!fse.existsSync(chunkDir)) {
      console.log(chunkDir);
      await fse.mkdirs(chunkDir)
    }
    //原文件名.index.ext
    var dPath = path.join(chunkDir, chunk.originalFilename.split('.')[1]);
    await fse.move(chunk.path, dPath, { overwrite: true });
    res.send("文件上传成功");
  });
  
});

app.post('/merge', async function (req, res) {
  let name = req.body.name;
  let fName = name.split('.')[0];

  let chunkDir = path.join(UPLOAD_DIR, fName);
  let chunks = await fse.readdir(chunkDir);
  chunks.sort((a, b) => a - b).map(chunkPath => {
    fs.appendFileSync(
      path.join(UPLOAD_DIR, name),
      fs.readFileSync(`${chunkDir}/${chunkPath}`))
  })
  fse.removeSync(chunkDir);
  res.send({msg:'合并成功', url:`http://localhost:3000/upload/${name}`})
})

app.listen(3000, () => {
  console.log("server listen to 3000")
})

process.on("uncaughtException", function (e) {
  console.log(e);
});