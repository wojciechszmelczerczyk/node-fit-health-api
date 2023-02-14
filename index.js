const { config } = require("dotenv");
const express = require("express");
var cors = require("cors");
const { chatbotController } = require("./controllers/chatbotController");

config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/message", chatbotController);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
