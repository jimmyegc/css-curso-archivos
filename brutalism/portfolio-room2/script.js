let editorOpen = false;
const DEFAULT_STATUS = "Markdown";

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
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
    openEditor();
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
      onComplete: () => openFile("About"),
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
      });
  });
}
