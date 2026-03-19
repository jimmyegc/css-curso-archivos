import { powerOffMonitor } from "./monitor.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

let lastView = "room"; // "terminal" | "room"

async function loadMarkdown(file) {
  const res = await fetch(`/content/${file}`);
  const text = await res.text();
  return marked.parse(text);
}

export const commands = {
  help() {
    return `
Available commands:

about
projects
skills
education
resume
clear
`;
  },

  about() {
    const terminal = document.getElementById("terminal");
    const container = terminal.parentElement;

    const win = document.createElement("div");
    win.className = "os-window";

    win.innerHTML = `
  <div class="window-header">
    about.txt
    <button class="close">x</button>
  </div>

  <div class="window-body">
    Jimmy García  
    Frontend-focused Full Stack Developer  

    I build scalable web applications and interactive user experiences.

    Stack:
    React · Vue · Astro  
    Node.js · .NET · Python  
  </div>
`;

    container.appendChild(win);
    makeDraggable(win);
    win.querySelector(".close").onclick = () => win.remove();

    return "Opening About section...";
  },

  projects() {
    openEditor();
    return "Opening Projects drawer...";
  },

  skillsv0: async function () {
    const terminal = document.getElementById("terminal");
    const container = terminal.parentElement;

    const win = document.createElement("div");
    win.className = "os-window";

    win.innerHTML = `
    <div class="window-header">
      skills.md
      <button class="close">x</button>
    </div>

    <div class="window-body markdown-body">
      loading...
    </div>
  `;

    container.appendChild(win);
    makeDraggable(win);

    const body = win.querySelector(".window-body");

    const html = await loadMarkdown("skills.md");
    body.innerHTML = html;

    win.querySelector(".close").onclick = () => win.remove();

    return "Opening skills.md...";
  },

  skills() {
    //console.log("skills ejecutado");

    const app = document.getElementById("monitor-app");
    const terminal = document.getElementById("terminal");

    lastView = !terminal.classList.contains("hidden") ? "terminal" : "room";

    const container = getActiveContainer();
    container.appendChild(app);

    terminal.classList.add("hidden");
    app.classList.remove("hidden");
    app.classList.add("active");

    app.innerHTML = `
    <div class="app-header">
      <button id="back-btn">← back</button>
      <span>skills</span>
    </div>

    <div class="app-content">
      ${getSkillsHTML()}
    </div>
  `;

    document.getElementById("back-btn").onclick = () => {
      returnFromApp();
    };

    return "Launching skills...";
  },

  education() {
    const app = document.getElementById("monitor-app");
    const terminal = document.getElementById("terminal");

    lastView = !terminal.classList.contains("hidden") ? "terminal" : "room";

    const container = getActiveContainer();
    container.appendChild(app);

    app.classList.remove("hidden");
    app.classList.add("active");

    app.innerHTML = `
    <div class="app-header">
      <button id="back-btn">← back</button>
      <span>education</span>
    </div>

    <div class="app-content">
      ${getEducationHTML()}
    </div>
  `;

    document.getElementById("back-btn").onclick = () => {
      returnFromApp();
    };

    return "Opening education...";
  },
  resume() {
    openResumeModal();
    return "Opening resume...";
  },
};

export function initTerminal() {
  console.log("Terminal initialized");

  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  const monitor = document.querySelector(".monitor");

  if (!input || !output) {
    console.warn("Terminal DOM missing");
    return;
  }

  monitor.addEventListener("click", () => {
    input.focus();
  });

  function print(text) {
    const line = document.createElement("div");
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim().toLowerCase();

      if (!cmd) return;

      if (["exit", "quit", "bye", "adios", "close", "cerrar"].includes(cmd)) {
        print("shutting down...");

        const view = document.getElementById("terminal-fullscreen-view");
        const monitor = document.getElementById("monitor");
        const terminal = document.getElementById("terminal");
        const btn = document.getElementById("terminal-fullscreen");
        btn.textContent = "⛶";

        if (!view.classList.contains("hidden")) {
          view.classList.add("hidden");
          monitor.appendChild(terminal);
        }

        setTimeout(() => {
          output.innerHTML = "";
          input.value = "";
          powerOffMonitor();
        }, 500);

        input.value = "";
        return;
      }

      print(`<span>$</span> ${cmd}`);

      if (cmd === "clear") {
        output.innerHTML = "";
        input.value = "";
        return;
      }

      if (commands[cmd]) {
        print(commands[cmd]());
      } else {
        print(`command not found: ${cmd}`);
      }

      input.value = "";
    }
  });

  print("JimmyOS Terminal v1.0");
  print("type 'help' to begin");

  input.focus();
}

function getActiveContainer() {
  const view = document.getElementById("terminal-fullscreen-view");

  if (!view.classList.contains("hidden")) {
    return view; // fullscreen activo
  }

  return document.getElementById("monitor"); // modo normal
}

function returnToTerminal() {
  const app = document.getElementById("monitor-app");
  const terminal = document.getElementById("terminal");
  const input = document.getElementById("terminal-input");

  app.classList.remove("active");
  app.classList.add("hidden");

  terminal.classList.remove("hidden");

  setTimeout(() => {
    input.focus();
  }, 50);
}

function returnFromApp() {
  const app = document.getElementById("monitor-app");
  const terminal = document.getElementById("terminal");
  const input = document.getElementById("terminal-input");
  const room = document.getElementById("room");

  app.classList.remove("active");
  app.classList.add("hidden");

  if (lastView === "terminal") {
    terminal.classList.remove("hidden");

    setTimeout(() => {
      input.focus();
    }, 50);
  } else {
    room?.classList.remove("hidden");
  }
}

function makeDraggable(win) {
  const header = win.querySelector(".window-header");

  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;

  header.addEventListener("mousedown", (e) => {
    dragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
}

function getSkillsHTML() {
  return `
    <section style="display:flex; flex-direction:column; gap:30px;">

      <header>
        <h1 style="font-size:24px; font-weight:bold;">Skills</h1>
        <p style="color:#aaa; font-size:14px;">
          Technologies I use to build scalable and modern applications.
        </p>
      </header>

      <div style="
        display:grid; 
        grid-template-columns:repeat(2,1fr); 
        gap:24px;
      ">

        <!-- Frontend -->
        <div>
          <h3>Frontend</h3>
          <p>React • Vue • Astro • Next.js • TypeScript • Tailwind</p>
        </div>

        <!-- Backend -->
        <div>
          <h3>Backend</h3>
          <p>Node.js • Express • .NET • C# • Python</p>
        </div>

        <!-- Databases -->
        <div>
          <h3>Databases</h3>
          <p>PostgreSQL • MongoDB • MySQL • SQL Server</p>
        </div>

        <!-- Infrastructure -->
        <div>
          <h3>Infrastructure</h3>
          <p>AWS • Nginx • Docker • Linux • Firebase • Supabase</p>
        </div>

        <!-- Tools -->
        <div>
          <h3>Tools & Workflow</h3>
          <p>Git • GitHub • Jira • Confluence</p>
        </div>

        <!-- Others -->
        <div>
          <h3>Other</h3>
          <p>Clean Architecture • Design Patterns • REST APIs</p>
        </div>

      </div>

      <div style="font-size:12px; color:#888;">
        Constantly learning and improving — currently exploring better system design, DevOps practices and scalable architectures.
      </div>

    </section>
  `;
}

function getEducationHTML() {
  return `
    <section class="education">

      <header>
        <h1>Education</h1>
        <p>Background & continuous learning</p>
      </header>

      <div class="timeline">

        <div class="edu-card">
          <span class="year">2023 - Present</span>
          <h3>Self-taught Full Stack Development</h3>
          <p>
            Focused on building scalable applications and SaaS products 
            using modern frontend and backend technologies.
          </p>
        </div>

        <div class="edu-card">
          <span class="year">Certification</span>
          <h3>Vue.js Certification</h3>
          <p>
            Completed advanced Vue.js training focused on component architecture, 
            reactivity and modern frontend patterns.
          </p>
        </div>

        <div class="edu-card">
          <span class="year">Academic</span>
          <h3>Formal Education</h3>
          <p>
            Academic background that strengthened analytical thinking, 
            discipline and problem-solving skills.
          </p>
        </div>

        <div class="edu-card">
          <span class="year">More</span>
          <h3>Additional Certifications</h3>
          <p>
            Explore more certifications and courses.
          </p>
          <a href="https://drive.google.com/embeddedfolderview?id=1HuxX2ugTGpsAFGZdvTwGOI6M04tYWCpQ#grid" target="_blank" class="edu-link">
            View Certificates →
          </a>
        </div>

      </div>

    </section>
  `;
}

function openEditor() {
  //editorOpen = true;

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
      //onComplete: () => openFile("about"),
    });

  gsap.from(".sidebar", { x: -40, opacity: 0, duration: 0.5 });
  gsap.from(".editor", { opacity: 0, duration: 0.5 });
}

function closeResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (!modal) return;

  modal.classList.add("opacity-0");

  setTimeout(() => {
    modal.remove();
  }, 200);
}

function openResumeModal() {
  // evitar duplicados
  if (document.getElementById("resume-modal")) return;

  const modal = document.createElement("div");
  modal.id = "resume-modal";

  modal.className = `
    fixed inset-0 z-[9999]
    flex items-center justify-center
    bg-black/60 backdrop-blur-md
  `;

  modal.innerHTML = `
    <div class="
      relative w-[95%] md:w-[80%] lg:w-[60%]
      h-[90%]
      bg-white dark:bg-black
      border border-black/10 dark:border-white/10
      shadow-xl
      rounded-lg
      overflow-hidden
    ">

      <!-- Header -->
      <div class="
        flex justify-between items-center
        px-4 py-2
        text-xs font-mono
        border-b border-black/10 dark:border-white/10
        bg-white/70 dark:bg-black/40 backdrop-blur
      ">
        <span>resume.pdf</span>
        <button id="close-resume"
          class="px-2 py-1 hover:bg-black/10 dark:hover:bg-white/10 transition">
          ✕
        </button>
      </div>

      <!-- PDF Viewer -->
      <iframe 
        src="/assets/pdf/CV-ES-Jimmy-Ernesto-Garcia-Contreras-Fullstack-Developer.pdf"
        class="w-full h-full"
      ></iframe>

    </div>
  `;

  document.body.appendChild(modal);

  // cerrar
  document.getElementById("close-resume").onclick = closeResumeModal;

  // cerrar clic afuera
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeResumeModal();
  });
}

document.getElementById("quickProjects").onclick = () => {
  commands.projects();
};

document.getElementById("quickCV").onclick = () => {
  //commands.about();
  openResumeModal();
};
