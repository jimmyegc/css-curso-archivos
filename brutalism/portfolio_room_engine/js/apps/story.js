import { fxSounds } from "../apps/audio/audioConfig.js";
const gameboy = document.getElementById("gameboy");
const aboutHotspot = document.querySelector(".hotspot-about");
const storyOverlay = document.getElementById("storyOverlay");
const closeStoryOverlay = document.getElementById("closeStoryOverlay");
const overlay = document.getElementById("overlay");
const closeGameboyOverlay = document.getElementById("closeOverlay");
const storyVideo = document.getElementById("storyVideo");

let gameboyUnlocked = false;

function startAboutStory() {
  // Mostrar overlay
  storyOverlay.style.display = "flex";

  // Reset video
  storyVideo.currentTime = 0;

  // Intentar reproducir
  const playPromise = storyVideo.play();

  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.warn("Autoplay bloqueado, esperando interacción...");
    });
  }
}

// cerrar overlay
function closeOverlay() {
  storyVideo.pause();
  storyOverlay.style.display = "none";
}

closeStoryOverlay.addEventListener("click", closeOverlay);

// opcional: cerrar dando click fuera del video
storyOverlay.addEventListener("click", (e) => {
  if (e.target === storyOverlay) {
    closeOverlay();
  }
});

function unlockGameboy() {
  if (gameboyUnlocked) return;

  gameboyUnlocked = true;

  setTimeout(() => {
    fxSounds.gameboy.play();
    gameboy.classList.remove("locked");
    gameboy.classList.add("unlocked");
    gameboy.classList.add("unlock-animation");
    //badge.classList.add("show");
  }, 500);
}

/* abrir recuerdo */
gameboy.addEventListener("click", () => {
  overlay.style.display = "flex";
});

closeGameboyOverlay.addEventListener("click", () => {
  overlay.style.display = "none";
});

// cuando termina el video
storyVideo.addEventListener("ended", () => {
  if (gameboyUnlocked) return;
  unlockGameboy();
  closeOverlay();
});

export function initStory() {
  if (!aboutHotspot) return;

  aboutHotspot.addEventListener("click", startAboutStory);
}
