export function initIntro() {
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
