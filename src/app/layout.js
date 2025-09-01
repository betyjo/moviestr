import './globals.css'

export const metadata = { title: "Moviestr", description: "Stream movies" }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-silver relative overflow-x-hidden">
        {/* Layer 1: big blurred backdrop (low opacity) */}
        <div id="backdrop-layer" className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
          {/* placeholder for backdrop image */}
          <div id="backdrop-image" className="absolute inset-0 bg-[url('/placeholders/backdrop.jpg')] bg-center bg-cover blur-[30px] opacity-40 transform scale-105"></div>
        </div>

        {/* Layer 2: poster grid blur/overlay (subtle parallax) */}
        <div id="poster-layer" className="fixed inset-0 -z-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <header className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold">⚡ MovieStreamin </div>
              <div className="px-3 py-1 rounded-lg bg-black/40 border border-silver/20 text-sm"> </div>
            </div>
            <nav className="flex items-center gap-3">
              <a href="/" className="text-silver hover:text-white">Home</a>
              <a href="/upload" className="text-silver hover:text-white">Upload</a>
              <a href="/admin" className="text-silver hover:text-white">Admin</a>
            </nav>
          </header>

          <main>{children}</main>

          <footer className="py-12 text-center text-sm text-silver/60">© {new Date().getFullYear()}MovieStream</footer>
        </div>
      </body>
    </html>
  )
}
