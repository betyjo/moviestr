'use client'

import Player from '../components/player.js'
import { useState } from 'react'

const sampleMovies = [
  { id: 1, title: ' Movie 1', src: '/videos/sample1.m3u8' },
  { id: 2, title: ' Movie 2', src: '/videos/sample2.m3u8' },
  { id: 3, title: ' Movie 3', src: '/videos/sample2.m3u8' }
]

export default function Home() {
  const [current, setCurrent] = useState(sampleMovies[0])

  return (
    <div>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        {sampleMovies.map(movie => (
          <div 
            key={movie.id} 
            onClick={() => setCurrent(movie)}
            style={{
              padding: '1rem',
              cursor: 'pointer',
              backgroundColor: '#1a1a1a',
              border: movie.id === current.id ? '2px solid #c0c0c0' : '1px solid #555',
              borderRadius: '8px',
              flex: '1'
            }}
          >
            {movie.title}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#000', padding: '1rem', borderRadius: '8px' }}>
        <Player src={current.src} />
      </div>
    </div>
  )
}
