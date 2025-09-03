import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { movieId } = params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
      include: { genres: true },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch movie." }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(req);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { movieId } = params;
  const { title, overview, posterUrl, releaseDate, imdbRating, isSeries, popular, trailerKey, downloadUrl, genreSlugs } = await req.json();

  try {
    
    await prisma.movie.update({
      where: { id: movieId },
      data: {
        genres: {
          set: [],
        },
      },
    });


    const genreConnects = genreSlugs.map(slug => ({
      where: { slug },
      create: { slug, name: slug },
    }));


    const updatedMovie = await prisma.movie.update({
      where: { id: movieId },
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
        },
      },
      include: { genres: true },
    });
    return NextResponse.json(updatedMovie, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update movie." }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(req);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { movieId } = params;
  try {
    await prisma.movie.delete({
      where: { id: movieId },
    });
    return NextResponse.json({ message: "Movie deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete movie." }, { status: 500 });
  }
}
