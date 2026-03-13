const hotspots = document.querySelectorAll(".hotspot");
const tooltip = document.getElementById("tooltip");

hotspots.forEach((spot) => {
  const label = spot.dataset.label;

  spot.addEventListener("mouseenter", () => {
    tooltip.innerText = label;
    tooltip.style.opacity = 1;

    gsap.to(spot, {
      scale: 1.04,
      duration: 0.2,
    });
  });

  spot.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;

    gsap.to(spot, {
      scale: 1,
      duration: 0.2,
    });
  });

  spot.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 15 + "px";
    tooltip.style.top = e.clientY + 15 + "px";
  });

  spot.addEventListener("click", () => {
    handleClick(label);
  });
});

function handleClick(label) {
  console.log("clicked:", label);

  if (label === "Enter Portfolio") {
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
      });

    gsap.from(".sidebar", { x: -40, opacity: 0, duration: 0.5 });
    gsap.from(".editor", { opacity: 0, duration: 0.5 });
  }

  if (label === "Projects") {
    alert("Open Projects section");
  }

  if (label === "Skills") {
    alert("Open Skills section");
  }

  if (label === "Education") {
    alert("Open Education section");
  }

  if (label === "Play Game") {
    alert("Launch Game");
  }
}

const room = document.querySelector(".room-container");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  gsap.to(room, {
    x: x,
    y: y,
    duration: 0.5,
    ease: "power2.out",
  });
});

gsap.to(".monitor", {
  boxShadow: "0 0 30px rgba(120,180,255,0.6)",
  repeat: -1,
  yoyo: true,
  duration: 1.5,
  ease: "sine.inOut",
});

gsap.from(".intro-message", {
  opacity: 0,
  y: -20,
  duration: 1,
  ease: "power2.out",
});

gsap.to(".intro-message", {
  opacity: 0,
  delay: 7,
  duration: 1.5,
  ease: "power2.out",
});

const guideCursor = document.querySelector(".guide-cursor");

function playGuide() {
  gsap
    .timeline({ delay: 3 })

    .to(guideCursor, {
      opacity: 1,
      duration: 0.4,
    })

    .to(guideCursor, {
      x: -120,
      y: 40,
      duration: 2,
      ease: "power1.inOut",
    })

    .to(".monitor", {
      scale: 1.04,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
    })

    .to(guideCursor, {
      opacity: 0,
      duration: 0.4,
    });
}

playGuide();

function ambientEvents() {
  setInterval(() => {
    gsap.to(".monitor", {
      boxShadow: "0 0 40px rgba(120,180,255,.8)",
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  }, 15000);
}

ambientEvents();

const files = document.querySelectorAll("[data-file]");
const editor = document.getElementById("editorContent");

const content = {
  about: `# Jimmy García

Full Stack Developer

Focus:
- React
- SaaS platforms
- Product development

Currently building:
Event management systems
AI tools
Developer products
`,

  experience: `
2026: Freelancer
`,
  skills: `export const skills = {

frontend: [
"React",
"TypeScript",
"Next.js"
],

backend: [
"Node.js",
"Express",
"PostgreSQL"
],

cloud: [
"AWS",
"Docker"
]

}
`,

  event: `export const project = {

name: "Event SaaS",

features: [
"Guest management",
"Seat organization",
"Badge generation",
"Attendance scanning"
]

}
`,

  attendance: `export const attendanceSystem = {

device: "DigitalPersona 4500",

features:[
"Fingerprint scanning",
"Real time attendance",
"Admin dashboard"
]

}
`,

  contact: `export const contact = {

email:"jimmy@jimmygarcia.dev",
github:"github.com/...",
linkedin:"linkedin.com/..."

}
`,
};

files.forEach((file) => {
  file.addEventListener("click", () => {
    const key = file.dataset.file;

    editor.textContent = content[key];
  });
});

hljs.highlightAll();

//const files = document.querySelectorAll("[data-file]");
//const editor = document.getElementById("editorContent");
const tabs = document.getElementById("editorTabs");

async function openFile(name) {
  const response = await fetch(`./content/${name}.html`);
  const html = await response.text();

  editor.innerHTML = html;

  renderTab(name);
}

function setActiveTab(name) {
  document.querySelectorAll(".tab").forEach((t) => {
    t.classList.remove("active");
  });

  const current = document.querySelector(`[data-tab="${name}"]`);

  if (current) {
    current.classList.add("active");
  }

  document.querySelector(".status-right span").textContent = name + ".md";
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

  setActiveTab(name);
}

files.forEach((file) => {
  file.addEventListener("click", () => {
    const name = file.dataset.file;

    openFile(name);
  });
});

const exitBtn = document.getElementById("exitEditor");

exitBtn.addEventListener("click", () => {
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
      duration: 0.8,
      ease: "power2.inOut",
    });
});

tabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab-close")) {
    const tab = e.target.parentElement;
    const name = tab.dataset.tab;

    tab.remove();

    const remainingTabs = document.querySelectorAll(".tab");

    if (remainingTabs.length) {
      const last = remainingTabs[remainingTabs.length - 1];
      const nextFile = last.dataset.tab;

      openFile(nextFile);
    } else {
      editor.innerHTML = "";
    }
  }
});

tabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");

  if (!tab || e.target.classList.contains("tab-close")) return;

  const name = tab.dataset.tab;

  openFile(name);
});

tabs.addEventListener("auxclick", (e) => {
  if (e.button === 1) {
    const tab = e.target.closest(".tab");
    if (!tab) return;

    tab.remove();
  }
});
