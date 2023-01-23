const { config } = require("dotenv");
const express = require("express");
const {
  predictImageController,
} = require("./controllers/predictImageController");
config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/", predictImageController);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
