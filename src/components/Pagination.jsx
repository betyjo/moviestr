import Link from "next/link";

export default function Pagination({ page, total, pageSize, base }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const arr = [];
  for (let p = 1; p <= pages; p++) {
    const href = `${base}${base.includes("?") ? "&" : "?"}page=${p}`;
    arr.push(
      <Link
        key={p}
        href={href}
        className={`px-3 py-1 rounded-lg border border-muted ${
          p === page ? "bg-[var(--accent)] text-black" : ""
        }`}
      >
        {p}
      </Link>
    );
  }
  return <div className="flex gap-2 mt-6">{arr}</div>;
}
