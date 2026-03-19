export function updatePosters(theme) {
  const posters = document.querySelectorAll(".poster");

  posters.forEach((poster) => {
    // Base
    const baseImg = poster.querySelector(".poster-img.base");
    const newBaseSrc =
      theme === "dark" ? baseImg.dataset.dark : baseImg.dataset.light;

    // Solo animamos la base
    gsap.to(baseImg, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        baseImg.src = newBaseSrc;
        gsap.to(baseImg, { opacity: 1, duration: 0.3 });
      },
    });

    // Hover
    const hoverImg = poster.querySelector(".poster-img.hover");
    if (hoverImg) {
      const newHoverSrc =
        theme === "dark" ? hoverImg.dataset.dark : hoverImg.dataset.light;
      hoverImg.src = newHoverSrc; // sin animación
    }
  });
}
