"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/movies?q=${encodeURIComponent(q)}`);
      }}
      className="flex gap-2"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies or series"
        className="flex-1 bg-black/30 border border-muted rounded-xl px-4 py-3"
      />
      <button className="btn btn-primary">Search</button>
    </form>
  );
}
