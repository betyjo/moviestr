import Link from "next/link";
import Logo from "./logo";

const GENRES = [
  "action",
  "romance",
  "adventure",
  "animation",
  "comedy",
  "rom-com",
  "k-drama",
];

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <Logo />
        <Link href="/">Home</Link>

        <div className="relative group">
          <button className="hover:underline">Genres</button>
          <div className="absolute hidden group-hover:block bg-[var(--panel)] border border-muted rounded-xl mt-2 p-2">
            {GENRES.map((g) => (
              <Link key={g} href={`/genre/${g}`} className="block px-3 py-1">
                {g}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/movies">Movies</Link>
        <Link href="/series">Series</Link>
        <Link href="/popular" className="ml-auto">
          Popular
        </Link>
        <Link href="/signin" className="btn">
          Sign in
        </Link>
      </div>
    </nav>
  );
}
