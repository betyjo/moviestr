import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <section className="grid place-items-center gap-6 mt-20">
      <div className="text-center">
        <div className="text-5xl font-black">MovieStudio</div>
        <div className="text-sm text-[var(--muted)]">moviestr rep, all your favourite movies stay toned </div>
      </div>
      <div className="w-full max-w-xl"><SearchBar /></div>
      <div></div>
    </section>
  );
}
