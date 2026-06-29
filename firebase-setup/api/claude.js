// api/claude.js
// MyTax Malaysia — Anthropic API Proxy
// Place this file at /api/claude.js in your Vercel project
// This keeps the Anthropic API key server-side and out of the browser

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Forward request to Anthropic
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":      "application/json",
        "x-api-key":         process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Claude proxy error:", error);
    return res.status(500).json({ error: "Proxy error" });
  }
}
