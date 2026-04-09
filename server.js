import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

app.use(express.static(join(__dirname, "public")));

app.post("/analyse", upload.single("photo"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No photo uploaded" });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GROQ_API_KEY not configured on server" });

  const base64 = req.file.buffer.toString("base64");
  const mediaType = req.file.mimetype;
  const dataUrl = `data:${mediaType};base64,${base64}`;

  const SYSTEM = `You are AeroForm AI — an expert indoor skydiving coach specialising in body flight analysis.
Analyse the photo and return ONLY a raw JSON object (no markdown, no backticks) with exactly this structure:
{"overall_score":7,"scores":{"arch":8,"arm_symmetry":7,"leg_position":6,"chin_angle":8,"hip_alignment":6},"strengths":["example strength 1","example strength 2"],"improvements":[{"area":"Area Name","issue":"What you observe","fix":"Specific drill or correction"}],"coach_summary":"2-3 sentence supportive assessment.","skill_level_estimate":"Intermediate","next_session_focus":"The single most important thing to practise next."}
Score each category 1-10. Be specific and encouraging. If image angle limits assessment, note it in the fix field.`;

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      max_tokens: 1000,
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: dataUrl } },
            { type: "text", text: "Analyse this indoor skydiving photo and return the JSON coaching report." },
          ],
        },
      ],
    }),
  });

  const groqData = await groqRes.json();
  if (!groqRes.ok) return res.status(502).json({ error: groqData.error?.message || "Groq API error" });

  let raw = groqData.choices?.[0]?.message?.content || "";
  raw = raw.replace(/```json|```/g, "").trim();

  try {
    const result = JSON.parse(raw);
    res.json(result);
  } catch {
    res.status(502).json({ error: "Could not parse AI response — please try again" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`\n  🪂  AeroForm AI running at http://localhost:${PORT}\n`));
