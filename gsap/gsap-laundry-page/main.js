gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-content", {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out",
});

gsap.utils.toArray(".card, .price-card").forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    ease: "power2.out",
  });
});

gsap.from(".promo", {
  scrollTrigger: {
    trigger: ".promo",
    start: "top 80%",
  },
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
});
