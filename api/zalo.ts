export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const target = process.env.N8N_WEBHOOK_URL;
  if (!target) {
    console.error("Thiếu biến môi trường N8N_WEBHOOK_URL");
    return res.status(200).send("OK");
  }

  try {
    await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ZEvent-Signature": String(req.headers["x-zevent-signature"] ?? ""),
      },
      body: JSON.stringify(req.body ?? {}),
    });
  } catch (err) {
    console.error("Chuyển tiếp sang n8n thất bại", err);
  }

  return res.status(200).send("OK");
}
