'use server'

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const movies = await prisma.movie.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(movies)
}

export async function POST(req) {
  try {
    const { title, description, src } = await req.json()
    const movie = await prisma.movie.create({ data: { title, description, src } })
    return NextResponse.json(movie)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
