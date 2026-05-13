import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAISummary({
  results,
  rawEntries,
  totalMonthlySavings,
  yearlySavings,
}) {
  try {
    
    const safeResults = Array.isArray(results) ? results : [];
    const safeRawEntries = Array.isArray(rawEntries) ? rawEntries : [];

  
    const toolList = safeRawEntries
      .map((tool) => `${tool.tool} (${tool.plan})`)
      .join(", ");

   
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
${toolList || "No tools provided"}

Monthly savings:
$${totalMonthlySavings || 0}

Yearly savings:
$${yearlySavings || 0}

Audit results:
${JSON.stringify(safeResults)}
`;

    
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI audit assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const summary = response.choices?.[0]?.message?.content || "";

    return {
      success: true,
      summary,
    };
  } catch (error) {
    console.log("OPENAI ERROR:", error);

    return {
      success: false,
      summary:
        "We analyzed your AI stack and identified optimization opportunities across tools. Some plans can be optimized for cost savings and better resource allocation.",
    };
  }
}