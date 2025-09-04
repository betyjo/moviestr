"use client";
import { useRouter } from "next/navigation";

export default function MovieCard({ m }) {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform bg-gray-800"
      onClick={() => router.push(`/movies/${m.id}`)}
    >
      <img src={m.image} alt={m.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{m.title}</h3>
        <p className="text-sm text-gray-300">{m.genre}</p>
      </div>
    </div>
  );
}

