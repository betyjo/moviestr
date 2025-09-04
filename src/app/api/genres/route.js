import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const genres = await prisma.genre.findMany();
    return NextResponse.json(genres, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch genres." }, { status: 500 });
  }
}
