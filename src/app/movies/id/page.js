import Trailer from "@/components/Trailer";
import AuthGateButton from "@/components/AuthGateButton";

async function getMovie(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/movies/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function MoviePage({ params }) {
  const m = await getMovie(params.id);
  if (!m) return <div>Not found</div>;
  return (
    <article className="grid md:grid-cols-3 gap-6">
      <img src={m.posterUrl} alt={m.title} className="w-full rounded-2xl border border-muted" />
      <div className="md:col-span-2 space-y-3">
        <h1 className="text-3xl font-bold">{m.title}</h1>
        <div className="text-sm text-[var(--muted)]">Released {new Date(m.releaseDate).toDateString()} • IMDb {Number(m.imdbRating).toFixed(1)}</div>
        <p className="text-[15px] leading-6">{m.overview}</p>
        <Trailer videoId={m.trailerKey} />
        <div className="flex gap-3 pt-2">
          <AuthGateButton href={`/watch/${m.id}`} className="btn btn-primary">Watch</AuthGateButton>
          {m.downloadUrl && <AuthGateButton href={`/api/download?url=${encodeURIComponent(m.downloadUrl)}`} className="btn">Download</AuthGateButton>}
        </div>
      </div>
    </article>
  );
}
