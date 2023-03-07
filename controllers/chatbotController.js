const openai = require("../config/openai");

const chatbotController = async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    res.json(completion.data.choices[0].message.content);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { chatbotController };
