import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();


const client = new OpenAI({ baseURL: "https://models.github.ai/inference", apiKey:process.env.OPENAI_API_KEY});
const model = "openai/gpt-4.1";

router.post("/core", async (req, res) => {
  const { topic } = req.body;

  const prompt = `
I want to learn "${topic}" from scratch. 
1. Break it into a structured course using the 80/20 rule.
2. List 3-5 essential concepts that make up the core 20%.
3. For each, provide a beginner-friendly explanation.
4. For each, give a short YouTube search query to find relevant videos.

Respond with JSON:
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

    try{
        const response= await client.chat.completions.create({
            messages:[
                {role:"system",content:"You are a helpful course planner."},
                {role:"user",content:prompt}
            ],
            temperature:0.7,
            model:model
        });
        const result = response.choices[0].message.content;
        res.json(JSON.parse(result));

    } catch(err){
        console.error(err);
    res.status(500).json({ error: "Error generating core concepts." });
    }
});

export default router;
