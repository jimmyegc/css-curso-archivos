export function startMonitor() {
  const boot = document.getElementById("monitor-boot");
  const terminal = document.getElementById("terminal");

  boot.innerHTML = "initializing system...";

  setTimeout(() => {
    boot.innerHTML = "loading modules...";
  }, 1000);

  setTimeout(() => {
    boot.classList.add("hidden");
    terminal.classList.remove("hidden");
  }, 2500);
}
