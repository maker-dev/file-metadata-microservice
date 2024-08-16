var express = require('express');
var cors = require('cors');
const multer = require("multer");
require('dotenv').config()

//set up multer
const storage = multer.memoryStorage();
const upload  = multer({storage: storage})

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), async (req, res) => {
  const fileInfo = req.file;

  if (!fileInfo) return res.send({error: "upfile is required"});

  res.send({
    name: fileInfo.originalname,
    type: fileInfo.mimetype,
    size: fileInfo.size
  });
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
