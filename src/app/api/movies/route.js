import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextauthOptions";

export async function GET(req, { params }) {
  const data = await prisma.movie.findUnique({ where: { id: params.id }, include: { genres: true } });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const update = {};
  if (body.title) update.title = body.title;
  if (body.overview) update.overview = body.overview;
  if (body.posterUrl) update.posterUrl = body.posterUrl;
  if (body.releaseDate) update.releaseDate = new Date(body.releaseDate);
  if (body.imdbRating !== undefined) update.imdbRating = Number(body.imdbRating);
  if (body.isSeries !== undefined) update.isSeries = !!body.isSeries;
  if (body.popular !== undefined) update.popular = !!body.popular;
  if (body.trailerKey !== undefined) update.trailerKey = body.trailerKey;
  if (body.downloadUrl !== undefined) update.downloadUrl = body.downloadUrl;

  if (body.genres) {
    update.genres = { set: [], connect: body.genres.map(slug => ({ slug })) };
  }

  const data = await prisma.movie.update({ where: { id: params.id }, data, include: { genres: true } });
  return NextResponse.json(data);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await prisma.movie.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
