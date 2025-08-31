'use client'

export default function Upload() {
  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      padding: '2rem',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2>Upload New Movie</h2>
      <input type="file" accept="video/*" style={{
        marginTop: '1rem',
        width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #555',
        backgroundColor: '#0d0d0d',
        color: '#c0c0c0'
      }}/>
      <button style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#c0c0c0',
        color: '#0d0d0d',
        cursor: 'pointer'
      }}>Upload</button>
    </div>
  )
}
