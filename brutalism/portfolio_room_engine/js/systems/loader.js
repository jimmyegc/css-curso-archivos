export function startLoader() {
  const progress = document.getElementById("loader-progress");
  const text = document.getElementById("loader-text");
  const loader = document.getElementById("loader");

  let value = 0;

  const steps = [
    "Loading assets...",
    "Loading room...",
    "Loading interactions...",
    "Preparing experience...",
  ];

  const interval = setInterval(() => {
    value += Math.random() * 25;

    progress.style.width = value + "%";

    text.innerText = steps[Math.floor(value / 25)] || "Ready";

    if (value >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
      }, 500);
    }
  }, 400);
}

export function skipLoader() {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  loader.style.pointerEvents = "none";
}
