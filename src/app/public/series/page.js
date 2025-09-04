import NavBar from "../../components/NavBar";
import Footer from "../../components/footer";
import { latestMovies } from "../../components/latestmovies";
import MovieCard from "../../components/MovieCard";

export default function SeriesPage() {
  // Filter series only
  const seriesMovies = latestMovies.filter((m) => m.genre.toLowerCase().includes("series"));

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <NavBar />
      <main className="p-6 flex-1 max-w-6xl mx-auto">
        <h1 className="text-3xl text-red-500 mb-6">Series</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {seriesMovies.map((m) => (
            <MovieCard key={m.id} m={m} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

