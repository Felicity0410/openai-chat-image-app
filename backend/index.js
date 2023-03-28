const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})

app.post("/gpt", async (req, res) => {
    let prompt = req.body.prompt;
    let response = await promptAI(prompt)
    res.send(response)
})

app.post("/dalle", async (req, res) => {
    let prompt = req.body.prompt;
    let response = await promptDALLE(prompt)
    res.send(response)
})

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let promptAI = async (prompt) => {
const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages:[
    {role: "system", content: "You are a helpful assistant"},
    {role: "user", content: prompt},
],
});
    return response.data.choices[0].message.content
}

let promptDALLE = async (prompt) => {
    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      image_url = response.data.data[0].url;
      return image_url
}
