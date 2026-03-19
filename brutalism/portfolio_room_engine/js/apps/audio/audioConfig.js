// Spatial / ambiente
export const spatialSounds = {
  keyboard: new Howl({
    src: ["assets/sounds/keyboard.mp3"],
    loop: true,
    volume: 0,
  }),
  computer: new Howl({
    src: ["assets/sounds/computer-hum.mp3"],
    loop: true,
    volume: 0,
  }),
  wind: new Howl({ src: ["assets/sounds/wind.mp3"], loop: true, volume: 0 }),
  retro: new Howl({
    src: ["assets/sounds/retro-room.mp3"],
    loop: true,
    volume: 0,
  }),
};

// Theme-dependent ambient
export const ambientSounds = {
  light: new Howl({
    src: ["assets/sounds/forest.mp3"],
    loop: true,
    volume: 0.35,
  }),
  dark: new Howl({ src: ["assets/sounds/rain.mp3"], loop: true, volume: 0.35 }),
};

// One-off effects
export const fxSounds = {
  gameboy: new Howl({
    src: ["assets/sounds/nintendo-game-boy-startup.mp3"],
    loop: false,
    volume: 0.7,
  }),
};
