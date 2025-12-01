"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <button
          className="w-full rounded bg-black text-white py-2"
          onClick={() => signIn("google")}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
