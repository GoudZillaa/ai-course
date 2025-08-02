import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config(); // Load .env variables

const token = process.env.OPENAI_API_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function main() {
  const client = new OpenAI({ baseURL: endpoint });
  const prompt = `
I want to learn "javascript" from scratch. 
1. Break it into a structured course using the 80/20 rule.
2. List 3-5 essential concepts to start with.
3. For each, provide a beginner-friendly explanation.
4. For each, give me a short YouTube search query to find relevant videos.

Format the output as JSON like this:
{
  "courseTitle": "",
  "coreConcepts": [
    {
      "title": "",
      "explanation": "",
      "videoSearchQuery": ""
    }
  ]
}
  `;

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 1.0,
    top_p: 1.0,
    model: model
  });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
