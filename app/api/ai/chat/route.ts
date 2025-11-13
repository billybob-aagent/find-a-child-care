import { NextResponse } from "next/server";
import { openai } from "@/app/lib/openai";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ reply: "AI not configured." });
  const { message } = await req.json();
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant for a childcare directory." },
      { role: "user", content: String(message || "Hello") },
    ],
  });
  return NextResponse.json({ reply: res.choices[0]?.message?.content ?? "" });
}
