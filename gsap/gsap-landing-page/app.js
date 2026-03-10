document.addEventListener("DOMContentLoaded", (event) => {
  let tl = gsap.timeline();

  tl.from("h1", {
    y: 80,
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    duration: 1,
    ease: "power3.out",
  })
    .from(
      ".tag",
      {
        y: -80,
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1,
        ease: "power3.out",
      },
      "<"
    )

    .from(".pan-1", {
      x: "-50vw",
      y: 100,
      rotation: -45,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })

    .from(
      ".pan-2",
      {
        x: "50vw",
        y: -100,
        rotation: 45,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "<"
    )

    .from(".box", {
      y: 300,
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
      stagger: { each: 0.3, from: "center" },
      duration: 0.8,
      ease: "elastic.out",
    });
});
