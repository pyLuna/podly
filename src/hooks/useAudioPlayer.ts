"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface PlayerControls {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
}

export const useAudioPlayer = (src?: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [controls, setControls] = useState<PlayerControls>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
  });

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || typeof time !== "number") return;
    const clamped = Math.max(0, Math.min(time, audio.duration || time));
    audio.currentTime = clamped;

    setControls((s) => ({ ...s, currentTime: clamped }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(volume, 1));
    audio.volume = clamped;
    setControls((s) => ({ ...s, volume: clamped }));
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setControls((s) => ({ ...s, playbackRate: rate }));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (src !== undefined && audio.src !== src) {
      audio.src = src;

      setControls((s) => ({
        ...s,
        currentTime: 0,
        duration: 0,
        isPlaying: !audio.paused,
      }));
    }

    const onTimeUpdate = () =>
      setControls((s) => ({ ...s, currentTime: audio.currentTime }));
    const onLoadedMeta = () =>
      setControls((s) => ({
        ...s,
        duration: isFinite(audio.duration) ? audio.duration : 0,
      }));
    const onPlayPause = () =>
      setControls((s) => ({ ...s, isPlaying: !audio.paused }));
    const onVolumeChange = () =>
      setControls((s) => ({ ...s, volume: audio.volume }));
    const onRateChange = () =>
      setControls((s) => ({ ...s, playbackRate: audio.playbackRate }));

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("play", onPlayPause);
    audio.addEventListener("pause", onPlayPause);
    audio.addEventListener("volumechange", onVolumeChange);
    audio.addEventListener("ratechange", onRateChange);

    setControls((s) => ({
      ...s,
      currentTime: audio.currentTime || 0,
      duration: isFinite(audio.duration) ? audio.duration : s.duration,
      isPlaying: !audio.paused,
      volume: audio.volume,
      playbackRate: audio.playbackRate,
    }));

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("play", onPlayPause);
      audio.removeEventListener("pause", onPlayPause);
      audio.removeEventListener("volumechange", onVolumeChange);
      audio.removeEventListener("ratechange", onRateChange);
    };
  }, [src]);

  return {
    audioRef,
    controls,
    togglePlayPause,
    seekTo,
    setVolume,
    setPlaybackRate,
  };
};

export default useAudioPlayer;
