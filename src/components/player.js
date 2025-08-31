'use client'
import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export default function Player({ src }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(videoRef.current)
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      controls
      className="w-full rounded-2xl border border-silver shadow-lg"
    />
  )
}
