import { NextResponse } from "next/server";
import { getStripe } from "@/app/lib/stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ ok: true });
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ ok: true });
  const raw = await req.text();
  try {
    const _event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
    // TODO: handle subscription events
    return NextResponse.json({ received: true });
  } catch (_err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
