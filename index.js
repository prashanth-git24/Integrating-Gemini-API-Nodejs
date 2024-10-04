const { GoogleGenerativeAI } =  require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const express= require('express');
const app = express();
const port = process.env.PORT;
app.use(express.json());
const generate = async (question) => {
    try {
      const prompt = question;
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
    error
    }
  };

  app.post('/api/content', async (req, res) => {
  try {
    const data =req.body.question;
    const result = await generate(data);
    res.send({
      "result":result
    })
  } catch (error) {
   res.send("error"+error);
  }
});
// generate();
app.listen(port,()=>{
  console.log(`Server running on port ${port}`);
});