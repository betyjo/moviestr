'use client'

import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export default function Player({ src }) {
  const ref = useRef(null)

  useEffect(() => {
    if(Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(ref.current)
      return () => { hls.destroy() }
    } else if (ref.current.canPlayType('application/vnd.apple.mpegurl')) {
      ref.current.src = src
    }
  }, [src])

  return (
    <video
      ref={ref}
      controls
      autoPlay
      style={{ width: '100%', borderRadius: '8px', backgroundColor: '#000' }}
    />
  )
}
