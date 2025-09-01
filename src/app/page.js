'use client'
import { useEffect, useState } from "react";
import Player from "../components/player";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchMovies() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (selectedGenre) params.set("genre", selectedGenre);

      const res = await fetch("/api/movies?" + params.toString());
      if (!res.ok) {
        console.error("Movies API failed", res.status);
        setMovies([]);
        return;
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : { data: [] };

      setMovies(data.data || []);
      if (!current && data.data?.length) setCurrent(data.data[0]);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchMovies(); }, [q, selectedGenre]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/genres");
      const d = await res.json();
      setGenres(d || []);
    })();
  }, []);

  return (
    <div className="relative pb-16 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={current?.posterUrl || "/placeholders/bg.jpg"} 
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 items-center mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search movies"
          className="flex-1 p-3 rounded-xl bg-black/60 border border-silver/20 placeholder:text-silver/60"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-3 rounded-xl bg-black/60 border border-silver/20"
        >
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.name}>{g.name}</option>
          ))}
        </select>
        <button
          onClick={fetchMovies}
          className="px-4 py-2 rounded-xl bg-silver text-black"
        >
          Search
        </button>
      </div>

      {/* Featured Player */}
      {current ? (
        <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-black/60 p-4 rounded-2xl">
            <h1 className="text-2xl font-bold mb-2">{current.title}</h1>
            <div className="text-sm text-silver/70 mb-4">
              {current.year} • {current.durationSec ? Math.ceil(current.durationSec/60) + "m" : ""}
            </div>
            <Player src={current.trailerUrl || current.src} />
          </div>

          <aside className="bg-black/60 p-4 rounded-2xl">
            <h3 className="font-semibold mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {current.genres?.map((g) => (
                <div key={g.id} className="px-2 py-1 rounded-md border border-silver/10 text-sm">
                  {g.genre.name}
                </div>
              ))}
            </div>
            <p className="text-sm text-silver/70 mb-4">{current.description}</p>
            <div className="flex gap-2">
              <button className="px-3 py-2 rounded-xl bg-silver text-black">Play</button>
              <button className="px-3 py-2 rounded-xl border border-silver/30">Add to Watchlist</button>
            </div>
          </aside>
        </section>
      ) : (
        <div className="text-silver/70 mb-6">No current movie</div>
      )}

      {/* Movie Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-4">All movies</h2>
        {loading ? (
          <div className="text-silver/60">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onSelect={() => setCurrent(movie)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function MovieCard({ movie, onSelect }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="bg-black/60 p-2 rounded-lg cursor-pointer transition transform hover:scale-105"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onSelect}
    >
      <div className="relative overflow-hidden rounded-lg h-44">
        <img
          src={movie.posterUrl || "/placeholders/poster.jpg"}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {hover && movie.previewUrl && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            {movie.previewUrl.endsWith(".gif") || movie.previewUrl.endsWith(".webp") ? (
              <img src={movie.previewUrl} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <video src={movie.previewUrl} autoPlay muted loop className="w-full h-full object-cover" />
            )}
          </div>
        )}
      </div>
      <div className="mt-2 text-center">
        <div className="font-semibold text-sm">{movie.title}</div>
        <div className="text-xs text-silver/70">
          {movie.year} • {movie.genres?.map((g) => g.genre.name).join(", ")}
        </div>
      </div>
    </div>
  );
}
