import { updatePosters } from "./theme-posters.js";

const body = document.body;
const roomImage = document.getElementById("roomImage");

const bgVideo = document.getElementById("bgVideo");
bgVideo.dataset.light = "assets/video/bg-light.webm";
bgVideo.dataset.dark = "assets/video/bg-dark.webm";

function setTheme(theme) {
  const body = document.body;
  body.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  // ROOM IMAGE
  const roomImage = document.getElementById("roomImage");
  const newSrc = roomImage.dataset[theme]; // data-light o data-dark

  gsap.to(roomImage, {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      roomImage.src = newSrc;
      gsap.to(roomImage, { opacity: 1, duration: 0.4 });
    },
  });

  // BACKGROUND VIDEO
  const bgVideo = document.getElementById("bgVideo");
  const newVideoSrc =
    theme === "light"
      ? "assets/video/bg-light.webm"
      : "assets/video/bg-dark.webm";

  gsap.to(bgVideo, {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      bgVideo.src = newVideoSrc;
      bgVideo.load();
      bgVideo.play();
      gsap.to(bgVideo, {
        opacity: theme === "light" ? 0.7 : 0.4,
        duration: 0.4,
      });
    },
  });

  updatePosters(theme);

  // ACTUALIZAR AUDIO AMBIENTE
  //updateAmbientSound(theme);
}

function updateRoomImage(theme) {
  if (!roomImage) return;

  if (theme === "dark" && roomImage.dataset.dark) {
    roomImage.src = roomImage.dataset.dark;
  } else if (theme === "light" && roomImage.dataset.light) {
    roomImage.src = roomImage.dataset.light;
  }
}

function updateBackgroundVideo(theme) {
  if (!bgVideo) return;

  const source = bgVideo.querySelector("source");
  if (!source) return;

  if (theme === "dark" && bgVideo.dataset.dark) {
    source.src = bgVideo.dataset.dark;
  } else if (theme === "light" && bgVideo.dataset.light) {
    source.src = bgVideo.dataset.light;
  }

  bgVideo.load(); // 🔥 recarga el video
}

export function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  // 🔥 cargar preferencia
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    setDarkTheme();
  } else {
    setLightTheme();
  }

  toggle.addEventListener("click", () => {
    const isLight = document.body.dataset.theme === "light";

    if (isLight) {
      setDarkTheme();
      localStorage.setItem("theme", "dark");
    } else {
      setLightTheme();
      localStorage.setItem("theme", "light");
    }
  });
}

export function setDarkTheme() {
  setTheme("dark");
  /* document.body.dataset.theme = "dark";
  document.documentElement.classList.add("dark");
  updatePosters("dark");
  updateRoomImage("dark");
  updateBackgroundVideo("dark"); */
}

export function setLightTheme() {
  setTheme("light");
  /* document.body.dataset.theme = "light";
  document.documentElement.classList.remove("dark");
  updatePosters("light");
  updateRoomImage("light");
  updateBackgroundVideo("light"); */
}
