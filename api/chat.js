
let messages = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { user, text } = req.body;
    messages.push({ user, text });
    if (messages.length > 50) messages.shift();
    return res.status(200).json({ ok: true });
  }
  res.status(200).json(messages);
}
