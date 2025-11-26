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
You are a Senior Underwriter Assistant at a modern MGA. 
Your goal is to explain a transparent, algorithmic rating decision to a human underwriter and draft a communication for the broker.

### INPUT DATA
**Submission Profile:**
- Industry Class: ${inputs.industry}
- Annual Revenue: $${inputs.revenue.toLocaleString()} (Basis for exposure)
- Business Maturity: ${inputs.yearsInBusiness} years
- Loss History: ${inputs.priorClaims} claims in the lookback period

**Algorithmic Pricing Trace (The Math):**
${JSON.stringify(trace, null, 2)}

**Final Calculated Premium:** $${price.toLocaleString()}

### INSTRUCTIONS

**PART 1: INTERNAL RISK SUMMARY**
Provide a brief, bulleted analysis for the internal underwriter. 
- Identify the *primary* driver of the cost (e.g., High Revenue, Industry Risk, or Claims).
- Highlight any credits applied (e.g., Stability Discount) or debits (Claims Surcharge).
- If the risk is clean (0 claims, >3 years business), label it as "Preferred Risk."
- If there are claims, flag it as "Standard/High Risk."

**PART 2: BROKER EMAIL DRAFT**
Draft a clean, minimalist email to the broker. 
- **Tone:** Professional, direct, and partnership-focused.
- **Content:** State the final premium clearly. Briefly explain the rating factors (e.g., "The rate reflects the increase in revenue exposure and the construction class code"). 
- **Constraint:** Do NOT use placeholders like "[Broker Name]" or "[Date]". Use generic openers like "Hello," or "Hi Team,".
- **Format:** Use Markdown.
- **Subject Line:** Keep it professional and concise and dont make it header level 1 .

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
                                description: `A descriptive, and minimalist email draft to the broker.  
                  Do NOT use placeholders. 
                  Use subject line and body line. 
                  Keep the regards line.
                  Use Markdown format for the email.
                have a professional tone.`,
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
