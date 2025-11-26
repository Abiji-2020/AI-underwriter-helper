# 🛡️ AI Underwriter Helper

**A "Glass Box" Pricing Engine & AI Assistant for Insurance Underwriters.**

This application demonstrates a modern approach to insurance underwriting tools. It combines **deterministic, auditable math** for pricing calculations with **Generative AI** for explaining the "why" behind the numbers.

## 💡 Why We Built This

In the insurance industry, trust and compliance are paramount. Traditional "Black Box" AI models that output a price without explanation are often unusable for regulatory reasons. Underwriters need to know *exactly* how a premium was calculated.

However, underwriters also spend hours writing emails to brokers explaining these quotes.

**We built the AI Underwriter Helper to solve this paradox:**
1.  **The Engine (The "What")**: We use pure, deterministic code to calculate the price. This ensures 100% accuracy, auditability, and zero hallucinations.
2.  **The Assistant (The "Why")**: We use LLMs (OpenAI) *only* to analyze the math and explain it in plain English.

This "Glass Box" approach gives you the best of both worlds: **Math you can trust, and AI that saves you time.**

## 🚀 Key Features

### 1. "Glass Box" Pricing Engine
- **Deterministic Math**: Pricing logic is written in pure TypeScript, ensuring 100% accuracy and auditability.
- **Real-Time Calculation**: Instant feedback as you tweak inputs (Revenue, Industry, Claims).
- **Transparent Trace**: A detailed receipt shows exactly how the premium was calculated (e.g., `Base: $500 -> +Exposure: $2000 -> Subtotal: $2500`).

### 2. AI Underwriting Assistant
- **Powered by OpenAI (GPT-4o)**: Analyzes the pricing trace and submission details to generate human-readable insights.
- **Structured Outputs**: Uses OpenAI's JSON Schema to guarantee reliable, formatted responses every time.
- **Broker Email Draft**: Automatically writes a professional email to the broker explaining the quote.
- **Risk Analysis**: Provides a collapsible, detailed explanation of the key risk drivers.

### 3. Modern UI/UX
- **Interactive Dashboard**: Clean, three-column layout (Controls, Receipt, Assistant).
- **Premium Design**: Built with **Tailwind CSS v3.4** and **shadcn/ui** components.
- **Responsive**: Optimized for modern screens.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI, Lucide Icons
- **State Management**: TanStack Query, React Hooks
- **AI Integration**: OpenAI SDK, Vercel Serverless Functions
- **Testing**: Vitest

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+)
- OpenAI API Key

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Abiji-2020/AI-underwriter-helper.git
    cd AI-underwriter-helper
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    Create a `.env` file in the root directory (or set in Vercel dashboard):
    ```env
    OPENAI_API_KEY=sk-your-api-key-here
    # Optional
    # OPENAI_MODEL=gpt-4o-mini
    # OPENAI_BASE_URL=https://api.openai.com/v1
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```
    *Note: To test the AI features locally, use `vercel dev` if you have the Vercel CLI installed, as Vite does not natively serve the `api/` directory.*

## 🚢 Deployment

This project is optimized for **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add your `OPENAI_API_KEY` in the Vercel Project Settings > Environment Variables.
4.  Deploy! Vercel will automatically detect the `api/` folder and deploy it as a Serverless Function.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
