"use client";
import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <div className="card overflow-hidden">
      <div className="aspect-[2/3] bg-zinc-800">
        {/* Poster fallback to a gradient if you don't store poster URLs */}
        {movie.posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-sm text-zinc-300">
            No Poster
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold line-clamp-2">{movie.title}</h3>
          {movie.popularity && <span className="badge">Popular</span>}
        </div>
        <p className="text-sm text-zinc-400 line-clamp-3">
          {movie.description}
        </p>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{movie.genre?.name || "—"}</span>
          <span>
            {new Date(movie.releaseDate).getFullYear?.() ||
              new Date(movie.releaseDate).toISOString().slice(0, 10)}
          </span>
        </div>
        <div className="pt-2 flex gap-2">
          <Link href={`/movie/${movie.id}`} className="btn">
            Details
          </Link>
          <GuardedButton href={`/watch/${movie.id}`}>Watch</GuardedButton>
        </div>
      </div>
    </div>
  );
}

function GuardedButton({ href, children }) {
  const onClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token)
      window.location.href = "/auth/signin?next=" + encodeURIComponent(href);
    else window.location.href = href;
  };
  return (
    <a href={href} onClick={onClick} className="btn">
      {children}
    </a>
  );
}
