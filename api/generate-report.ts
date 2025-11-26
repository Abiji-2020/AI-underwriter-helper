import OpenAI from "openai";

export const config = {
  runtime: "edge",
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { trace, price, inputs } = await req.json();

    const prompt = `
    You are an expert insurance underwriter assistant.
    Analyze the following submission and pricing trace for a General Liability policy.
    
    Submission Details:
    - Industry: ${inputs.industry}
    - Revenue: $${inputs.revenue.toLocaleString()}
    - Years in Business: ${inputs.yearsInBusiness}
    - Prior Claims: ${inputs.priorClaims}
    - Base Rate: $${inputs.baseRate}

    Pricing Trace (Step-by-Step):
    ${JSON.stringify(trace, null, 2)}
    
    Final Premium: $${price}
    
    Provide a professional analysis. Keep the email output extremely concise and minimalist.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "underwriting_report",
          strict: true,
          schema: {
            type: "object",
            properties: {
              insight: {
                type: "string",
                description:
                  "A detailed , professional explanation of the key drivers of the price, referencing specific inputs and their impact along with the conversion rates and why they are important for the calculation.",
              },
              email: {
                type: "string",
                description: `A VERY short, concise, and minimalist email draft to the broker. Do NOT use markdown format.  
                  Do NOT use placeholders. 
                  Use subject line and body line. 
                  Keep the regards line.
                  Use bulletins when necessary and short sentences. have a professional tone.`,
              },
            },
            required: ["insight", "email"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = completion.choices[0].message.content;
    return new Response(content, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate report" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
