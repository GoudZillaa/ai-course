import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();


const client = new OpenAI({ baseURL: "https://models.github.ai/inference", apiKey: process.env.OPENAI_API_KEY });
const model = "gpt-4o";

router.post("/core", async (req, res) => {
  const { topic } = req.body;

  const prompt = `
I want to learn "${topic}" from scratch. 
1. Break it into a structured course using the 80/20 rule.
2. List 3-5 essential concepts that make up the core 20%.
3. For each, provide a beginner-friendly explanation.
4. For each, give a short YouTube search query to find relevant videos.

Respond ONLY with valid JSON in this format:
{
  "courseTitle": "",
  "coreConcepts": [
    {
      "title": "",
      "explanation": "",
      "videoSearchQuery": ""
    }
  ]
}`;

  try {
    const apiToken = process.env.OPENAI_API_KEY || process.env.GITHUB_TOKEN;
    if (!apiToken) {
      throw new Error("Missing API Token (OPENAI_API_KEY or GITHUB_TOKEN) in environment");
    }

    const client = new OpenAI({ baseURL: "https://models.github.ai/inference", apiKey: apiToken });
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful course planner. Your response must be valid JSON only. Do not include markdown formatting." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      model: model
    });

    let result = response.choices[0].message.content.trim();
    
    // Attempt robust JSON extraction
    try {
      // Find the first '{' and last '}'
      const firstBrace = result.indexOf('{');
      const lastBrace = result.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        result = result.slice(firstBrace, lastBrace + 1);
      }
      res.json(JSON.parse(result));
    } catch (parseErr) {
      console.error("Failed to parse AI response as JSON. Raw output:", result);
      throw new Error("AI returned an invalid response format.");
    }

  } catch (err) {
    console.error("AI Generation failed:", err.message);
    res.status(500).json({ 
      error: "Error generating concepts.",
      details: err.message === "Missing OPENAI_API_KEY in environment" ? "Server configuration error" : "AI failed to respond properly."
    });
  }
});

export default router;
