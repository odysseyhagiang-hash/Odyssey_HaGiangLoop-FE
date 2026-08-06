import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { LazyImage } from "./LazyImage";

interface VideoBackgroundProps {
  src: string;
  poster: string;
  posterAlt: string;
  playing?: boolean;
  className?: string;
}

export function VideoBackground({
  src,
  poster,
  posterAlt,
  playing = true,
  className,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Defer video load on all devices by 1.5s to prioritize initial paint / LCP
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    if (playing) {
      video
        .play()
        .catch((err) => {
          console.error("Play failed", err);
        });
    } else {
      video.pause();
    }
  }, [playing, shouldLoadVideo]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Poster */}
      <LazyImage
        src={poster}
        alt={posterAlt}
        priority
        wrapperClassName={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-1000",
          ready ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Video */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onCanPlay={() => {
            setReady(true);
          }}
          onPlaying={() => {
            setReady(true);
          }}
          onError={(e) => {
            console.error("Video Error", e);
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}