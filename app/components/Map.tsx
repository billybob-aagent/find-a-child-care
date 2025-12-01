"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

type Props = {
  lat?: number;
  lng?: number;
  zoom?: number;
  markers?: { lat: number; lng: number; title?: string }[];
};

export default function Map({ lat = 37.7749, lng = -122.4194, zoom = 10, markers = [] }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom,
    });
    markers.forEach((m) => new mapboxgl.Marker().setLngLat([m.lng, m.lat]).addTo(map));
    return () => map.remove();
  }, [lat, lng, zoom, markers]);

  return <div ref={ref} className="w-full h-[400px] rounded" />;
}
