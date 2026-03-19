export function initLighting() {
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
