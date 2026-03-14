let editorOpen = false;
const DEFAULT_STATUS = "Markdown";

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  resetRoom();
  initRoom();
  initHotspots();
  initParallax();
  initIntro();
  initGuide();
  initAmbient();
  initExplorer();
  initTabs();
  initExit();
}

function resetRoom() {
  const overlay = document.querySelector(".mouse-light");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  updateLight(mouseX, mouseY);

  window.addEventListener("mousemove", (e) => {
    updateLight(e.clientX, e.clientY);
  });

  function updateLight(x, y) {
    overlay.style.background = `radial-gradient(circle at ${x}px ${y}px,
   rgba(255,255,255,0.15),
   transparent 300px)`;
  }
}

/* ======================
ROOM ANIMATION
====================== */

function initRoom() {
  const monitor = document.querySelector(".monitor");
  if (!monitor) return;

  gsap.to(monitor, {
    scale: 1.05,
    duration: 1,
    repeat: -1,
    yoyo: true,
  });

  gsap.to(monitor, {
    boxShadow: "0 0 30px rgba(120,180,255,0.6)",
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
  });
}

/* ======================
HOTSPOTS
====================== */

function initHotspots() {
  const hotspots = document.querySelectorAll(".hotspot");
  const tooltip = document.getElementById("tooltip");

  hotspots.forEach((spot) => {
    const label = spot.dataset.label;

    spot.addEventListener("mouseenter", () => {
      tooltip.innerText = label;
      tooltip.style.opacity = 1;

      gsap.to(spot, { scale: 1.04, duration: 0.2 });
    });

    spot.addEventListener("mouseleave", () => {
      tooltip.style.opacity = 0;
      gsap.to(spot, { scale: 1, duration: 0.2 });
    });

    spot.addEventListener("mousemove", (e) => {
      tooltip.style.left = e.clientX + 15 + "px";
      tooltip.style.top = e.clientY + 15 + "px";
    });

    spot.addEventListener("click", () => {
      handleClick(label);
    });
  });
}

/* ======================
HOTSPOT ACTIONS
====================== */

function handleClick(label) {
  if (label === "Enter Portfolio") {
    startBootSequence();
  }
}

/* ======================
OPEN EDITOR
====================== */

function openEditor() {
  editorOpen = true;

  const tl = gsap.timeline();

  tl.to("#room", {
    scale: 2.6,
    duration: 1.1,
    ease: "power2.inOut",
  })

    .to("#room", {
      opacity: 0,
      duration: 0.4,
    })

    .to("#vscode", {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.5,
      onComplete: () => openFile("about"),
    });

  gsap.from(".sidebar", { x: -40, opacity: 0, duration: 0.5 });
  gsap.from(".editor", { opacity: 0, duration: 0.5 });
}

/* ======================
ROOM PARALLAX
====================== */

function initParallax() {
  const room = document.querySelector(".room-container");
  if (!room) return;

  document.addEventListener("mousemove", (e) => {
    if (editorOpen) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // AUDIO ESPACIAL
    if (playing) {
      Object.keys(audioZones).forEach((zone) => {
        const pos = audioZones[zone];

        const dx = mouseX - pos.x;
        const dy = mouseY - pos.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = 600;

        let volume = 1 - distance / maxDistance;

        volume = Math.max(0, Math.min(volume, 0.6));

        sounds[zone].volume(volume);
      });
    }

    // PARALLAX VISUAL
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    gsap.to(room, {
      x,
      y,
      duration: 0.5,
      ease: "power2.out",
    });
  });
}

/* ======================
INTRO MESSAGE
====================== */

function initIntro() {
  const intro = document.querySelector(".intro-message");
  if (!intro) return;

  gsap.from(intro, {
    opacity: 0,
    y: -20,
    duration: 1,
  });

  gsap.to(intro, {
    opacity: 0,
    delay: 7,
    duration: 1.5,
  });
}

/* ======================
GUIDE CURSOR
====================== */

function initGuide() {
  const guideCursor = document.querySelector(".guide-cursor");
  const monitor = document.querySelector(".monitor");

  if (!guideCursor || !monitor) return;

  gsap
    .timeline({ delay: 3 })

    .to(guideCursor, { opacity: 1, duration: 0.4 })

    .to(guideCursor, {
      x: -120,
      y: 40,
      duration: 2,
    })

    .to(monitor, {
      scale: 1.04,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
    })

    .to(guideCursor, { opacity: 0, duration: 0.4 });
}

/* ======================
AMBIENT EVENTS
====================== */

function initAmbient() {
  const monitor = document.querySelector(".monitor");
  if (!monitor) return;

  setInterval(() => {
    gsap.to(monitor, {
      boxShadow: "0 0 40px rgba(120,180,255,.8)",
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  }, 15000);
}

/* ======================
EXPLORER FILES
====================== */

function initExplorer() {
  const files = document.querySelectorAll("[data-file]");

  files.forEach((file) => {
    file.addEventListener("click", () => {
      const name = file.dataset.file;
      openFile(name);
    });
  });
}

/* ======================
EDITOR TABS
====================== */

const editor = document.getElementById("editorContent");
const tabs = document.getElementById("editorTabs");

async function openFile(name) {
  if (!editor) return;

  const response = await fetch(`./content/${name}.html`);
  const html = await response.text();

  editor.innerHTML = html;
  editor.scrollTop = 0;

  renderTab(name);
  setActiveTab(name);
}

function renderTab(name) {
  const exists = document.querySelector(`[data-tab="${name}"]`);
  if (exists) return;

  const tab = document.createElement("div");

  tab.className = "tab";
  tab.dataset.tab = name;

  tab.innerHTML = `
  <span>📄</span>
  ${name}.md
  <button class="tab-close">×</button>
  `;

  tabs.appendChild(tab);
}

function setActiveTab(name) {
  document.querySelectorAll(".tab").forEach((t) => {
    t.classList.remove("active");
  });

  const current = document.querySelector(`[data-tab="${name}"]`);
  if (current) current.classList.add("active");

  const status = document.querySelector(".status-right span");
  if (status) status.textContent = name + ".md";
}

/* ======================
TAB EVENTS
====================== */

function initTabs() {
  if (!tabs) return;

  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;

    if (e.target.classList.contains("tab-close")) {
      tab.remove();

      const remaining = document.querySelectorAll(".tab");

      if (remaining.length) {
        openFile(remaining[remaining.length - 1].dataset.tab);
      } else {
        editor.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-neutral-500 gap-2">
        <p class="text-sm">No editors are open</p>
        <p class="text-xs opacity-60">Open a file from the explorer.</p>
        </div>
        `;

        document.querySelector(".status-right span").textContent =
          DEFAULT_STATUS;
      }

      return;
    }

    openFile(tab.dataset.tab);
  });
}

/* ======================
EXIT EDITOR
====================== */

function initExit() {
  const exitBtn = document.getElementById("exitEditor");
  if (!exitBtn) return;

  exitBtn.addEventListener("click", () => {
    editorOpen = false;

    const tl = gsap.timeline();

    tl.to("#vscode", {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.4,
    })

      .to("#room", {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        onComplete: resetMonitorBoot,
      });
  });
}

/* Sounds */

const audioBtn = document.getElementById("audioToggle");

const sounds = {
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

  wind: new Howl({
    src: ["assets/sounds/wind.mp3"],
    loop: true,
    volume: 0,
  }),

  retro: new Howl({
    src: ["assets/sounds/retro-room.mp3"],
    loop: true,
    volume: 0,
  }),
};

let playing = false;

const forestAmbience = new Howl({
  src: ["assets/sounds/forest.mp3"],
  loop: true,
  volume: 0.35,
});

const rainAmbience = new Howl({
  src: ["assets/sounds/rain.mp3"],
  loop: true,
  volume: 0.35,
});

function getAmbientSound() {
  return savedTheme === "dark" ? rainAmbience : forestAmbience;
}

function updateAmbientSound(theme) {
  if (!playing) return;

  forestAmbience.stop();
  rainAmbience.stop();

  const newSound = theme === "dark" ? rainAmbience : forestAmbience;

  newSound.volume(0);
  newSound.play();
  newSound.fade(0, 0.35, 1000);
}

function stopAllSpatialSounds() {
  Object.values(sounds).forEach((sound) => {
    sound.fade(sound.volume(), 0, 300);
    setTimeout(() => {
      sound.pause();
    }, 300);
  });
}

function startAllSpatialSounds() {
  Object.values(sounds).forEach((sound) => {
    if (!sound.playing()) {
      sound.play();
    }
  });
}

audioBtn.addEventListener("click", () => {
  const ambientSound = getAmbientSound();

  if (!playing) {
    ambientSound.volume(0);
    ambientSound.play();
    ambientSound.fade(0, 0.35, 1000);

    startAllSpatialSounds();

    audioBtn.classList.add("active");
    audioBtn.innerText = "🔊 Ambient ON";

    playing = true;
  } else {
    ambientSound.fade(0.35, 0, 1000);

    stopAllSpatialSounds();

    setTimeout(() => {
      ambientSound.pause();
    }, 1000);

    audioBtn.classList.remove("active");
    audioBtn.innerText = "🔈 Ambient";

    playing = false;
  }
});

const audioZones = {
  keyboard: { x: 900, y: 600 },
  computer: { x: 850, y: 450 },
  wind: { x: 200, y: 150 },
  retro: { x: 1200, y: 300 },
};

Object.values(sounds).forEach((sound) => {
  sound.play();
});

/* End Sounds */

const toggleBtn = document.getElementById("themeToggle");
const roomImage = document.getElementById("roomImage");
const bgVideo = document.getElementById("backgroundVideo");

function setTheme(theme) {
  gsap.to("#backgroundVideo", {
    opacity: 0,
    duration: 0.4,
    onComplete: () => {
      if (theme === "light") {
        //roomImage.src = "assets/images/room-light.png";
        bgVideo.src = "assets/video/bg-light.webm";
        bgVideo.playbackRate = 0.7;
      } else {
        // Dark
        //roomImage.src = "assets/images/room-dark.png";
        bgVideo.src = "assets/video/bg-dark.webm";
        bgVideo.playbackRate = 0.7;
      }

      bgVideo.load();

      const video = document.querySelector(".background-video");

      video.style.display = "none";

      requestAnimationFrame(() => {
        video.style.display = "";
      });

      gsap.to("#backgroundVideo", {
        opacity: 0.35,
        duration: 0.4,
      });
    },
  });

  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  updateAmbientSound(theme);
}

toggleBtn.addEventListener("click", () => {
  const current = document.body.dataset.theme;

  if (current === "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});

const savedTheme = localStorage.getItem("theme") || "dark";

setTheme(savedTheme);

/* Gameboy */
/*
const gameboy = document.getElementById("gameboy");
const playVideo = document.getElementById("playVideo");

const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("closeOverlay");

playVideo.addEventListener("click", () => {  
  setTimeout(() => {
    unlockGameboy();
  }, 3000);
});

function unlockGameboy() {
  gameboy.style.display = "block";

  gameboy.animate(
    [
      { transform: "translateY(-20px)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
    {
      duration: 600,
      easing: "ease-out",
    },
  );
}

gameboy.addEventListener("click", () => {
  overlay.style.display = "flex";
});

closeOverlay.addEventListener("click", () => {
  overlay.style.display = "none";
});
*/

const bootTrigger = document.getElementById("bootTrigger");
const bootSequence = document.getElementById("bootSequence");
const bootScreen = document.querySelector(".boot-layer-screen");
const devEnvironment = document.getElementById("devEnvironment");

bootTrigger.addEventListener("click", startBootSequence);

function resetMonitorBoot() {
  bootTrigger.style.display = "flex";

  bootScreen.style.opacity = "1";

  bootSequence.style.display = "none";
}

function startBootSequence() {
  bootTrigger.style.display = "none";
  bootScreen.style.opacity = "0";
  bootSequence.style.display = "flex";

  setTimeout(() => {
    bootSequence.style.display = "none";

    openEditor();
  }, 3600);
}
