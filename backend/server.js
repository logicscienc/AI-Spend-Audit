import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend running");
});


// =====================================
// AI SUMMARY ROUTE
// =====================================

app.post("/generate-summary", async (req, res) => {

  try {

    const {
      results,
      rawEntries,
      totalMonthlySavings,
      yearlySavings,
    } = req.body;

    // -----------------------------
    // BUILD TOOL SUMMARY
    // -----------------------------

    const toolList = rawEntries
      .map(
        (tool) =>
          `${tool.tool} (${tool.plan})`
      )
      .join(", ");

    // -----------------------------
    // OPENAI PROMPT
    // -----------------------------

    const prompt = `
You are an AI finance optimization assistant.

Generate a concise personalized AI spend audit summary.

Rules:
- Around 80-120 words
- Professional but modern tone
- Mention optimization opportunities
- Mention yearly savings
- Mention the user's tools
- Do not use bullet points
- Sound like a premium SaaS product

User tools:
${toolList}

Monthly savings:
$${totalMonthlySavings}

Yearly savings:
$${yearlySavings}

Audit results:
${JSON.stringify(results)}
`;

    // -----------------------------
    // OPENAI CALL
    // -----------------------------

    const response =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",
            content:
              "You are an AI audit assistant.",
          },

          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

    const summary =
      response.choices[0].message.content;

    res.json({
      success: true,
      summary,
    });

  } catch (error) {

    console.log(error);

    // --------------------------------
    // FALLBACK SUMMARY
    // --------------------------------

    res.json({
      success: false,

      summary:
        "We analyzed your AI stack and identified optimization opportunities across multiple tools. Your current setup shows potential cost reductions through better plan alignment, seat optimization, and alternative pricing models. Additional savings may also be unlocked through infrastructure credits and vendor consolidation.",
    });
  }
});


// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});