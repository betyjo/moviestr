import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const genres = [
    { slug: "action", name: "Action" },
    { slug: "romance", name: "Romance" },
    { slug: "adventure", name: "Adventure" },
    { slug: "animation", name: "Animation" },
    { slug: "comedy", name: "Comedy" },
    { slug: "rom-com", name: "Rom-Com" },
    { slug: "k-drama", name: "K-Drama" },
  ];

  for (const g of genres) {
    await prisma.genre.upsert({
      where: { slug: g.slug },
      update: {},
      create: g,
    });
  }

  const adminPassword = bcrypt.hashSync("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      username: "admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // example movie
  const action = await prisma.genre.findUnique({ where: { slug: "action" } });
  await prisma.movie.upsert({
    where: { title: "Example Action Movie" },
    update: {},
    create: {
      title: "Example Action Movie",
      overview: "A thrilling demo movie used during development.",
      posterUrl: "/logo.svg",
      releaseDate: new Date("2022-05-01"),
      imdbRating: 7.3,
      isSeries: false,
      popular: true,
      trailerKey: "dQw4w9WgXcQ",
      downloadUrl: "", // leave blank for demo
      genres: { connect: [{ id: action.id }] },
    },
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
