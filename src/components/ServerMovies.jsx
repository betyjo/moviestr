import React from "react";

async function fetchMovies() {
  const res = await fetch("https://api.example.com/movies", { cache: "no-store" });
  const data = await res.json();
  return data;
}

export default async function ServerMovies() {
  const movies = await fetchMovies();

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}

