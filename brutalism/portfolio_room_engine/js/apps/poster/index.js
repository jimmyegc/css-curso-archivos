export function initPoster() {
  const posters = document.querySelectorAll(".poster");

  posters.forEach((poster) => {
    const hoverImg = poster.querySelector(".hover");

    poster.addEventListener("mouseenter", () => {
      gsap.to(hoverImg, {
        opacity: 1,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    poster.addEventListener("mouseleave", () => {
      gsap.to(hoverImg, {
        opacity: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.in",
      });
    });
  });
}
