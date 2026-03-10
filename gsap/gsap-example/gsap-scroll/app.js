gsap.registerPlugin(ScrollTrigger);
/*
gsap.to('.cajita', {
  x:450,
  duration: 5,
  scrollTrigger: {
    trigger: '.cajita',
    //start: 150
    //start: "center center",
    start: "top 50%",
    end: "bottom: 40%",
    //toggleClass: "red",
    toggleActions: "restart none none none",
              // onEnter onLeave onEnterBack onLeaveBack
    // play pause resume reverse restart complete none        
    scrub: 4,
    markers: true
  }
})
*/

gsap.from('.hero-title', {
  opacity: 0,
  scale: .5,
  delay: 1,
  duration: 1
})

gsap.from('.about-title', {
  opacity: 0,
  y: 30,
  delay: .5,
  scrollTrigger: '.about-title'
})

gsap.from('.about-subtitle span', {
  y: 100,
  duration: 1,
  stagger: .5,
  scrollTrigger: '.about-grid'
})

gsap.from('.about-item p', {
  y: 100,
  opacity: 0,
  scrollTrigger: '.about-grid',
  duration: 1,
  stagger: .5,
  delay: .5
})

gsap.to('.mrchispa-foto', {
  bottom: "100%",
  right: "100%",
  scrollTrigger: {
    trigger: '.mrchispa-foto',
    start: 'bottom bottom',
    end: 'top top',
    //markers: true,
    scrub: true
  }
})