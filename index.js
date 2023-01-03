const express = require("express");
const multer = require("multer");
const upload = multer();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/upload", upload.single("plant"), (req, res) => {
  const image = req.file.buffer.toString("base64");

  res.send("work");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
