import React, { useEffect, useRef } from 'react';

export default function AudioAmbient({ isPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {
        // Autoplay policy prevented playback
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <audio ref={audioRef} loop preload="none">
      <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8e0f6c8.mp3?filename=dark-ambient-110042.mp3" type="audio/mpeg" />
    </audio>
  );
}
