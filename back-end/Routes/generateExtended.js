import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({ baseURL: "https://models.github.ai/inference", apiKey: process.env.OPENAI_API_KEY });
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
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful advanced instructor. Your response must be pure JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      model: model
    });

    let result = response.choices[0].message.content.trim();
     // Remove potential markdown backticks
     if (result.startsWith("```")) {
      result = result.replace(/^```json/, "").replace(/^```/, "").replace(/```$/, "").trim();
    }

    res.json(JSON.parse(result));
  } catch (err) {
    console.error("AI Deep Dive failed:", err);
    res.status(500).json({ error: "Error generating extended concepts." });
  }
});

export default router;