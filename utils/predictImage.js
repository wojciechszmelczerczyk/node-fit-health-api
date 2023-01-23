const { config } = require("dotenv");
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

config();

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();

metadata.set("authorization", `Key ${process.env.API_KEY}`);

const predictImage = function (inputs) {
  return new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "food-item-recognition",
        inputs,
      },
      metadata,
      (err, response) => {
        if (err) {
          reject("Error: " + err);
          return;
        }
        if (response.status.code !== 10000) {
          reject(
            "Received failed status: " +
              response.status.description +
              "\n" +
              response.status.details
          );
          return;
        }
        let results = [];
        for (const c of response.outputs[0].data.concepts) {
          results.push({ name: c.name, value: c.value });
        }
        resolve(results);
      }
    );
  });
};

module.exports = predictImage;
