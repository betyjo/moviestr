import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

async function fetchList(searchParams) {
  const qs = new URLSearchParams({ ...(searchParams || {}), isSeries: "false" });
  const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/movies?${qs.toString()}`, { cache: "no-store" });
  return res.json();
}

export default async function MoviesPage({ searchParams }) {
  const data = await fetchList(searchParams);
  const base = "/movies" + (searchParams?.q ? `?q=${encodeURIComponent(searchParams.q)}` : "");
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data.items?.map(m => <MovieCard key={m.id} m={m} />)}
      </div>
      <Pagination page={data.page} total={data.total} pageSize={data.pageSize} base={base} />
    </section>
  );
}
