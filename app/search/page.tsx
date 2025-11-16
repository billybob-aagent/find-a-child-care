import Map from "@/app/components/Map";
import { prisma } from "@/app/lib/prisma";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

async function getProviders(city?: string) {
  const where: Prisma.ProviderProfileWhereInput = city
    ? { location: { is: { city: { contains: city, mode: "insensitive" } } } }
    : {};
  const providers = await prisma.providerProfile.findMany({
    where,
    include: { location: true },
    take: 50,
  });
  return providers;
}

export default async function SearchPage({ searchParams }: { searchParams: { city?: string } }) {
  const city = searchParams?.city;
  const providers = await getProviders(city);
  const markers = providers
    .filter((p) => p.location?.lat && p.location?.lng)
    .map((p) => ({ lat: Number(p.location!.lat), lng: Number(p.location!.lng), title: p.name }));

  return (
    <div className="p-6 space-y-4">
      <form className="flex gap-2">
        <input name="city" placeholder="City" defaultValue={city ?? ""} className="border px-3 py-2 rounded w-64" />
        <button className="px-4 py-2 rounded bg-black text-white" type="submit">Search</button>
      </form>
      <Map markers={markers} />
      <ul className="space-y-2">
        {providers.map((p) => (
          <li key={p.id} className="border p-3 rounded">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-zinc-600">{p.location?.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
