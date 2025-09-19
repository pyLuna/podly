"use client";

import useAudioPlayer from "@/hooks/useAudioPlayer";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

interface CustomAudioPlayerProps {
  src?: string;
  title?: string;
  artist?: string;
}

export default function CustomAudioPlayer({
  src,
  title,
  artist,
}: CustomAudioPlayerProps) {
  const { audioRef, controls, togglePlayPause, seekTo } = useAudioPlayer(src);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="border-2 rounded-lg p-4 bg-secondary/10 border-secondary">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        autoPlay
      />

      {/* Track Info */}
      {(title || artist) && (
        <div className="flex-1 min-w-0 mb-4 flex items-baseline justify-between space-x-2">
          {title && <h3 className="font-semibold text-xl truncate">{title}</h3>}
          {artist && (
            <p className="text-sm opacity-75 truncate">
              Publisher:{" "}
              <span className="text-primary opacity-100 font-bold">
                {artist}
              </span>
            </p>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className="flex-1 flex items-center space-x-2">
        {/* Main Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => seekTo(Math.max(0, controls.currentTime - 15))}
            className="p-2 rounded hover:opacity-80 transition-opacity cursor-pointer"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-3 hover:opacity-80 transition-opacity cursor-pointer bg-primary/10 text-primary rounded-full"
          >
            {controls.isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={() =>
              seekTo(Math.min(controls.duration, controls.currentTime + 15))
            }
            className="p-2 rounded hover:opacity-80 transition-opacity cursor-pointer"
          >
            <SkipForward size={16} />
          </button>
        </div>
        <div className="flex-1 relative">
          <div className="h-2 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-150"
              style={{
                background: `linear-gradient(to right, var(--color-primary) ${
                  (controls.currentTime / controls.duration) * 100
                }%, rgb(var(--color-secondary-rgb), .15) ${
                  (controls.currentTime / controls.duration) * 100
                }%)`,
              }}
            />
          </div>
          <input
            type="range"
            min="0"
            max={controls.duration || 0}
            value={controls.currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <span className="text-xs font-mono">
          <span className="font-medium">
            {formatTime(controls.currentTime)}
          </span>
          /
          <span className="text-gray-300">{formatTime(controls.duration)}</span>
        </span>
      </div>

      {/* Volume Control */}
      {/* <div className="flex items-center space-x-2">
        <Volume2 size={16} />
        <input
          className="appearance-none bg-gray-600 h-1 rounded-lg cursor-pointer text-primary"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={controls.volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div> */}

      {/* Playback Speed */}
      {/* <select
        value={controls.playbackRate}
        onChange={(e) => setPlaybackRate(Number(e.target.value))}
        className="text-xs px-2 py-1 rounded bg-primary"
      >
        <option value={0.5}>0.5x</option>
        <option value={0.75}>0.75x</option>
        <option value={1}>1x</option>
        <option value={1.25}>1.25x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select> */}
    </div>
  );
}
