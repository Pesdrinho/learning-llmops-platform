import { useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@components/ui/button';

/**
 * Player de vídeo customizado com controles acessíveis
 * Wrapper simplificado - pode integrar Plyr futuramente
 */
export default function VideoPlayer({ src, poster, title }) {
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  const toggleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border bg-black">
      <video
        ref={videoRef}
        className="w-full"
        poster={poster}
        controls
        preload="metadata"
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        <p>Seu navegador não suporta vídeo HTML5.</p>
      </video>
      {title && (
        <div className="bg-muted p-3 text-sm text-muted-foreground">
          {title}
        </div>
      )}
    </div>
  );
}





