import Link from "next/link";

export default function MovieCard({ m }) {
  return (
    <div className="card overflow-hidden">
      <img
        src={m.posterUrl}
        alt={m.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{m.title}</h3>
          <span className="text-sm">
            IMDb {Number(m.imdbRating).toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-[var(--muted)] line-clamp-3">{m.overview}</p>
        <div className="text-xs text-[var(--muted)]">
          {new Date(m.releaseDate).toDateString()}
        </div>
        <Link href={`/movie/${m.id}`} className="btn w-full mt-2">
          Details
        </Link>
      </div>
    </div>
  );
}
