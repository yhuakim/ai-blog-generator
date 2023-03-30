// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const text = req.body
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "assistant", content: "You are a technical writer, that writes concise and factual blog articles" },
      { role: "user", content: `write an article for the topic: ${text} in markdown format with a total of ${1000} words` },
    ],
    temperature: 0,
    // max_tokens: 7,
  });
  console.log(text);
  // let data = JSON.stringify(response)
  // console.log(response);
  res.status(200).json(response.data.choices[0].message?.content)
}
