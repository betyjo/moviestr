async function getMovie(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/movies/${id}`, { cache: "no-store" });
  return res.ok ? res.json() : null;
}

export default async function WatchPage({ params }) {
  const m = await getMovie(params.id);
  if (!m) return <div>Not found</div>;
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Watching: {m.title}</h1>
      <div className="card p-4">Embed a proper HLS/DASH player here. For now, trailer below:</div>
      <div className="mt-4">
        {/* server components can't use react-youtube client-only player here; you can link to trailer */}
        {m.trailerKey ? (<iframe width="100%" height="480" src={`https://www.youtube.com/embed/${m.trailerKey}`} title="Trailer" allowFullScreen />) : null}
      </div>
    </section>
  );
}
