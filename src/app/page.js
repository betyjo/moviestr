'use client'


import Player from '../components/player'
import { useEffect, useState } from "react"

export default function Home() {
  const [movies, setMovies] = useState([])
  const [current, setCurrent] = useState(null)

  // Load movies from backend
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies", { cache: "no-store" })
        const data = await res.json()
        setMovies(data)
        if (data.length > 0) setCurrent(data[0])
      } catch (err) {
        console.error("Failed to load movies:", err)
      }
    }
    fetchMovies()
  }, [])

  if (!current) return <p className="text-silver p-6">Loading movies...</p>

  return (
    <main className="p-6 space-y-6 bg-black min-h-screen text-silver">
      <h1 className="text-3xl font-bold">🎬 My Streaming App</h1>

      {/* Movie Selector */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {movies.map(movie => (
          <div
            key={movie.id}
            onClick={() => setCurrent(movie)}
            className={`cursor-pointer px-4 py-2 rounded-xl transition 
              ${current.id === movie.id 
                ? "bg-silver text-black font-bold" 
                : "bg-black/60 border border-silver/40 hover:bg-silver/20"
              }`}
          >
            {movie.title}
          </div>
        ))}
      </div>

      {/* Current Movie Player */}
      <div className="bg-black/80 p-4 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-2">{current.title}</h2>
        {current.description && (
          <p className="mb-4 text-sm text-silver/70">{current.description}</p>
        )}
        <Player src={current.src} />
      </div>
    </main>
  )
}
