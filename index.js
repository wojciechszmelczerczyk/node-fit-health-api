const express = require("express");
const multer = require("multer");
const upload = multer();

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.API_KEY}`);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const predictImage = function (inputs) {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "aaa03c23b3724a16a56b629203edc62c",
        inputs,
      },
      metadata,
      (err, response) => {
        if (err) {
          reject("Error: " + err);
          return;
        }
        console.log(response.status.code);
        if (response.status.code !== 10000) {
          console.log(response.status.description);
          reject(
            "Received failed status: " +
              response.status.description +
              "\n" +
              response.status.details
          );
          return;
        }
        let results = [];
        console.log("Predicted concepts, with confidence values:");
        for (const c of response.outputs[0].data.concepts) {
          console.log(c.name + ": " + c.value);
          results.push({ name: c.name, value: c.value });
        }
        resolve(results);
      }
    );
  });
};

app.post("/", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const inputs = [{ data: { image: { url: imageUrl } } }];

    const results = await predictImage(inputs);
    return res.json(results);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
