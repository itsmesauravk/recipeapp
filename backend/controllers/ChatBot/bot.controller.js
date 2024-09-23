const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.BOT_API_KEY ;

const chatbot = async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message not provided" });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userMessage);
    const botReply = result.response.text();  

    // Get the generated text from the response
    const botMessage = botReply || 'Sorry, I could not generate a response.';

    // Respond with the generated content
    return res.status(200).json({ message: botMessage });
  } catch (error) {
    console.error("Error generating content:", error);
    return res.status(500).json({ error: "Failed to generate content" });
  }
};

module.exports = chatbot;
