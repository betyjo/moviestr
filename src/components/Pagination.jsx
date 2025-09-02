"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const params = useSearchParams();

  function go(p) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(p));
    router.push(url.pathname + "?" + url.searchParams.toString());
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button className="btn" disabled={page <= 1} onClick={() => go(page - 1)}>
        Prev
      </button>
      {Array.from({ length: totalPages })
        .slice(0, 10)
        .map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => go(p)}
              className={`btn ${p === page ? "bg-zinc-800" : ""}`}
            >
              {p}
            </button>
          );
        })}
      <button
        className="btn"
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
