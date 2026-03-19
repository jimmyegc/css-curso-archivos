import { spatialSounds, ambientSounds } from "./audioConfig.js";

let playing = false;
let currentAmbient = null;

export function toggleAudio(theme) {
  if (!playing) {
    playAmbient(theme);
    playSpatial();
    playing = true;
    return true;
  } else {
    stopAll();
    playing = false;
    return false;
  }
}

export function playAmbient(theme) {
  stopAmbient();
  currentAmbient = ambientSounds[theme];
  currentAmbient.volume(0);
  currentAmbient.play();
  currentAmbient.fade(0, 0.35, 1000);
}

export function stopAmbient() {
  if (currentAmbient) {
    currentAmbient.fade(currentAmbient.volume(), 0, 1000);
    setTimeout(() => currentAmbient.pause(), 1000);
  }
}

export function updateAmbient(theme) {
  if (!playing) return;
  playAmbient(theme);
}

export function playSpatial() {
  Object.values(spatialSounds).forEach((sound) => {
    if (!sound.playing()) sound.play();
  });
}

export function stopAll() {
  Object.values(spatialSounds).forEach((sound) => {
    sound.fade(sound.volume(), 0, 300);
    setTimeout(() => sound.pause(), 300);
  });
  stopAmbient();
}

// Para audio espacial por zona
export const audioZones = {
  keyboard: { x: 900, y: 600 },
  computer: { x: 850, y: 450 },
  wind: { x: 200, y: 150 },
  retro: { x: 1200, y: 300 },
};

export function updateSpatialVolume(mouseX, mouseY) {
  if (!playing) return;
  Object.keys(audioZones).forEach((zone) => {
    const pos = audioZones[zone];
    const dx = mouseX - pos.x;
    const dy = mouseY - pos.y;
    let volume = 1 - Math.sqrt(dx*dx + dy*dy)/600;
    volume = Math.max(0, Math.min(volume, 0.6));
    spatialSounds[zone].volume(volume);
  });
}