export const metadata = {
  title: 'Movie Streamer',
  description: 'Stream your movies fast and clean',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: '#0d0d0d', // black
        color: '#c0c0c0' // silver
      }}>
        <header style={{
          padding: '1rem 2rem',
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #555',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0 }}>🎬 Movie Streamer</h1>
          <nav>
            <a href="/" style={{ marginRight: '1rem', color: '#c0c0c0', textDecoration: 'none' }}>Home</a>
            <a href="/upload" style={{ color: '#c0c0c0', textDecoration: 'none' }}>Upload</a>
          </nav>
        </header>
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
