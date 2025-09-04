"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    if (q.trim()) router.push(`/movies?q=${encodeURIComponent(q)}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search movies or series"
        className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white"
      />
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 px-4 py-3 rounded text-white"
      >
        Search
      </button>
    </form>
  );
}

