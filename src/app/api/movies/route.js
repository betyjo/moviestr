import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

// This API route handles fetching all movies and adding new movies.
export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        genres: true, 
      },
    });
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch movies." }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(req);

  // Security check: Only allow 'ADMIN' to add movies.
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, overview, posterUrl, releaseDate, imdbRating, isSeries, popular, trailerKey, downloadUrl, genreSlugs } = await req.json();

    // Connect to existing genres or create new ones by their unique slug.
    const genreConnects = genreSlugs.map(slug => ({
      where: { slug },
      create: { slug, name: slug },
    }));

    // Create the new movie and connect it to the genres.
    const movie = await prisma.movie.create({
      data: {
        title,
        overview,
        posterUrl,
        releaseDate: new Date(releaseDate),
        imdbRating: parseFloat(imdbRating),
        isSeries,
        popular,
        trailerKey,
        downloadUrl,
        genres: {
          connectOrCreate: genreConnects,
        }
      },
      include: { genres: true },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create movie." }, { status: 500 });
  }
}
