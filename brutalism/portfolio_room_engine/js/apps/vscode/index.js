const editor = document.getElementById("editorContent");
const tabs = document.getElementById("editorTabs");

function initExplorer() {
  const files = document.querySelectorAll("[data-file]");

  files.forEach((file) => {
    file.addEventListener("click", () => {
      const name = file.dataset.file;
      openFile(name);
    });
  });
}

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

function initExit() {
  const exitBtn = document.getElementById("exitEditor");
  if (!exitBtn) return;

  exitBtn.addEventListener("click", () => {
    //editorOpen = false;

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
        //onComplete: resetMonitorBoot,
      });
  });
}

export function initVSCode() {
  initExplorer();
  initTabs();
  initExit();
}
