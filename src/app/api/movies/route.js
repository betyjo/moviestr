import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // make sure src/lib/db.js exists

// GET /api/movies?q=&genre=
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || undefined;
    const genre = url.searchParams.get("genre") || undefined;

    const where = {};
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }
    if (genre) {
      where.genres = { some: { genre: { name: genre } } };
    }

    const movies = await prisma.movie.findMany({
      where,
      include: { genres: { include: { genre: true } }, assets: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: movies });
  } catch (err) {
    console.error("Movies API error:", err);
    return NextResponse.json({ data: [], error: "Failed to fetch movies" }, { status: 500 });
  }
}

// POST /api/movies
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, year, durationSec, posterUrl, backdropUrl, trailerUrl, genreNames = [] } = body;

    // Upsert genres
    const connectGenres = await Promise.all(
      genreNames.map(async (g) => {
        const found = await prisma.genre.upsert({
          where: { name: g },
          update: {},
          create: { name: g },
        });
        return { genreId: found.id };
      })
    );

    const movie = await prisma.movie.create({
      data: {
        title,
        slug: slugify(title),
        description,
        year,
        durationSec,
        posterUrl,
        backdropUrl,
        trailerUrl,
        genres: {
          create: connectGenres,
        },
      },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (err) {
    console.error("Movies POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
