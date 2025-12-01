import { NextResponse } from "next/server";

// Stub: pretend to verify documents; integrate OCR/vision later
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const status = body?.document ? "received" : "missing_document";
  return NextResponse.json({ status, confidence: status === "received" ? 0.5 : 0 });
}
