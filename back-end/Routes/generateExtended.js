import express from "express";
import OpenAI from "openai";

const router = express.Router();
const model = "gpt-4o";

router.post("/extended", async (req, res) => {
  const { topic } = req.body;

  const prompt = `
I have already learned the core 20% of "${topic}". 
Now help me learn the remaining 80% to go deeper. 
1. List 5–7 advanced or extended concepts.
2. For each, provide a beginner-friendly explanation.
3. For each, give a YouTube search query to find relevant videos.

Respond ONLY with valid JSON in this format:
{
  "extendedConcepts": [
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
        { role: "system", content: "You are a helpful advanced instructor. Your response must be valid JSON only. Do not include markdown formatting." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      model: model
    });

    let result = response.choices[0].message.content.trim();
    
    // Attempt robust JSON extraction
    try {
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
    console.error("AI Deep Dive failed:", err.message);
    res.status(500).json({ 
      error: "Error generating extended concepts.",
      details: err.message === "Missing OPENAI_API_KEY in environment" ? "Server configuration error" : "AI failed to respond properly."
    });
  }
});

export default router;