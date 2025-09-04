"use client";

import Footer from "../components/Footer";
import LatestMovies from "../components/LatestMovies";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <section
        className="h-[50vh] bg-cover bg-center flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: "url('/mbg.jpg')" }}
      >
        <div className="bg-black/50 p-6 rounded">
          <h1 className="text-5xl font-bold drop-shadow-lg text-red-500">
            🎬 Movie Streaming
          </h1>
          <p className="mt-4 text-lg text-white drop-shadow-md">
            Watch your favorite movies online
          </p>
        </div>
      </section>

      <main className="p-6 flex-1 max-w-7xl mx-auto">
        <LatestMovies />
      </main>

      <Footer />
    </div>
  );
}

