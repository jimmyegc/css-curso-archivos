import {
  toggleAudio,
  updateAmbient,
  updateSpatialVolume,
} from "./audioController.js";

const audioBtn = document.getElementById("audioToggle");
audioBtn.addEventListener("click", () => {
  const theme = document.body.dataset.theme || "dark";
  const isOn = toggleAudio(theme);
  audioBtn.classList.toggle("active", isOn);
  audioBtn.innerText = isOn ? "🔊 Ambient ON" : "🔈 Ambient";
});

// Mouse movement para sonido espacial
document.addEventListener("mousemove", (e) => {
  updateSpatialVolume(e.clientX, e.clientY);
});

// Cambio de tema
function onThemeChange(theme) {
  updateAmbient(theme);
}
