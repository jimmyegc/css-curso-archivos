import { initTerminal } from "./terminal.js";

const btn = document.getElementById("terminal-fullscreen");
const view = document.getElementById("terminal-fullscreen-view");
const terminal = document.getElementById("terminal");
const monitor = document.getElementById("monitor");
const input = document.getElementById("terminal-input");

btn.addEventListener("click", (e) => {
  e.stopPropagation();

  const isFullscreen = view.classList.contains("hidden");
  btn.textContent = isFullscreen ? "✕" : "⛶";

  if (isFullscreen) {
    view.classList.remove("hidden");
    view.appendChild(terminal);
  } else {
    view.classList.add("hidden");
    monitor.appendChild(terminal);
  }

  setTimeout(() => input.focus(), 50);
});

let monitorState = "OFF"; // OFF | BOOTING | ON

export function powerOnMonitor() {
  const boot = document.getElementById("monitor-boot");
  const terminal = document.getElementById("terminal");
  const input = document.getElementById("terminal-input");

  if (monitorState === "ON") {
    input.focus();
    return;
  }

  if (monitorState === "OFF") {
    monitorState = "BOOTING";

    boot.innerHTML = "initializing system...";

    setTimeout(() => {
      boot.innerHTML = "loading modules...";
    }, 1000);

    setTimeout(() => {
      boot.classList.add("hidden");
      terminal.classList.remove("hidden");

      initTerminal();

      monitorState = "ON";

      input.focus();
    }, 2500);
  }
}

export function powerOffMonitor() {
  const monitorEl = document.querySelector(".monitor");
  const boot = document.getElementById("monitor-boot");
  const terminal = document.getElementById("terminal");
  const input = document.getElementById("terminal-input");

  // 🔥 activar animación
  monitorEl.classList.add("monitor-off");

  setTimeout(() => {
    // Reset UI después de animación
    terminal.classList.add("hidden");
    boot.classList.remove("hidden");
    boot.innerHTML = "system offline";

    input.value = "";

    // quitar animación para el siguiente encendido
    monitorEl.classList.remove("monitor-off");

    monitorState = "OFF";
  }, 400); // igual a duración del animation
}
