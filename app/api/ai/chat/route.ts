import { NextResponse } from "next/server";
import { getOpenAI } from "@/app/lib/openai";

export async function POST(req: Request) {
  const openai = getOpenAI();
  if (!openai) return NextResponse.json({ reply: "AI not configured." });
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
