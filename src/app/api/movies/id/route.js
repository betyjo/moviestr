import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const movie = await prisma.movie.findUnique({
    where: { id: params.id },
    include: { assets: true, genres: { include: { genre: true } }, subtitles: true },
  });
  if (!movie) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(movie);
}
