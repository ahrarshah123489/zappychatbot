// /api/chat.js
export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { message } = req.body;

  try {
    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await apiRes.json();
    const reply = data.choices?.[0]?.message?.content || "ZAPPY BOT: No response.";
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "ZAPPY BOT: Server error." });
  }
}
