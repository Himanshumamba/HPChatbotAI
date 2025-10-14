import axios from 'axios';

export const generateText = async (prompt: string) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) throw new Error("OpenAI API key missing!");

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    { model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }], max_tokens: 600 },
    { headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" } }
  );

  return res.data.choices[0].message.content;
};
