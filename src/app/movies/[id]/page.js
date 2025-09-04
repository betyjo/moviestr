import Footer from "../../components/Footer"; 
import { latestMovies } from "../../data/latestmovies"; // from movies/[id] to data
import Image from "next/image";

export default async function MovieDetail({ params }) {
  const movieId = parseInt(params.id);
  const movie = latestMovies.find((m) => m.id === movieId);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <h1 className="text-3xl text-red-500">Movie not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="p-6 flex-1 max-w-5xl mx-auto">
        <Image
          src={movie.image}
          alt={movie.title}
          width={400}
          height={600}
          className="rounded-lg"
        />
        <h2 className="text-2xl font-bold text-red-500">{movie.title}</h2>
        <p>{movie.description}</p>
      </main>
      <Footer />
    </div>
  );
}

