const openai = require("../config/openai");

const chatbotController = async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });
    res.json(completion.data.choices[0].text);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { chatbotController };
