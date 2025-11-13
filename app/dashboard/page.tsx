import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-lg">You must sign in to view the dashboard.</p>
          <Link href="/login" className="underline">Go to sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome, {session.user?.name ?? session.user?.email}</p>
    </div>
  );
}
