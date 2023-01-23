const predictImage = require("../utils/predictImage");

const predictImageController = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const inputs = [{ data: { image: { url: imageUrl } } }];

    const results = await predictImage(inputs);
    return res.json(results);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

module.exports = {
  predictImageController,
};
