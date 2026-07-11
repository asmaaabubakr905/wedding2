import { useCallback, useSyncExternalStore } from 'react';
import { wedding } from '../config/wedding';

let audio: HTMLAudioElement | null = null;
let playing = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function getAudio() {
  if (!audio && typeof window !== 'undefined') {
    audio = new Audio(wedding.music);
    audio.loop = true;
    audio.volume = 0.35;

    audio.addEventListener('play', () => {
      playing = true;
      notify();
    });
    audio.addEventListener('pause', () => {
      playing = false;
      notify();
    });
    audio.addEventListener('ended', () => {
      playing = false;
      notify();
    });
  }

  return audio;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getPlayingSnapshot() {
  return playing;
}

export function playWeddingMusic() {
  getAudio()?.play().catch(() => {});
}

export function pauseWeddingMusic() {
  audio?.pause();
}

export function toggleWeddingMusic() {
  const track = getAudio();
  if (!track) return;

  if (playing) {
    track.pause();
  } else {
    track.play().catch(() => {});
  }
}

export function useWeddingMusic() {
  const isPlaying = useSyncExternalStore(subscribe, getPlayingSnapshot, () => false);

  const play = useCallback(() => playWeddingMusic(), []);
  const pause = useCallback(() => pauseWeddingMusic(), []);
  const toggle = useCallback(() => toggleWeddingMusic(), []);

  return { isPlaying, play, pause, toggle };
}
