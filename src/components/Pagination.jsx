"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const params = useSearchParams();

  function go(p) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", p);
    router.push(url.pathname + "?" + url.searchParams.toString());
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button className="bg-gray-700 px-3 py-1 rounded" disabled={page <= 1} onClick={() => go(page - 1)}>Prev</button>
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => go(p)}
            className={`px-3 py-1 rounded ${p === page ? "bg-red-600" : "bg-gray-700"}`}
          >
            {p}
          </button>
        );
      })}
      <button className="bg-gray-700 px-3 py-1 rounded" disabled={page >= totalPages} onClick={() => go(page + 1)}>Next</button>
    </div>
  );
}
