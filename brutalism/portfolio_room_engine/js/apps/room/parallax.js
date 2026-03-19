export function initParallax() {
  const room = document.querySelector(".room-container");
  if (!room) return;

  document.addEventListener("mousemove", (e) => {
    //    if (editorOpen) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // AUDIO ESPACIAL
    /* if (playing) {
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
    } */

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
