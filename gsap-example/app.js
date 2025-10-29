let logo = document.querySelector('.logo')

// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  
  /* gsap.from(logo, {
    color: "red",
    backgroundColor: "yellow",
    x: -100,
    rotate: 360,
    scale: 1,
    duration: 3,
    delay: 0,
    ease: "bounce.out"
  })

  gsap.from('.menu-item', {
    y: -100,
    ease: "power3.out",
    duration: 1,
    stagger: 0.25
  }) */

  const text = new SplitType('.hero-title', {
    types: 'words, chars'
  })        
  console.log(text.chars)

  /* gsap.from(text.chars, {
    y: () => gsap.utils.random(-150, 150),
    delay: 2
  }) */

    text.chars.forEach((char, index) => {

      let charsTl = gsap.timeline();

      charsTl.from(char, {
        y: gsap.utils.random(-150, 150),
        x: gsap.utils.random(-300, 300),
        rotate: gsap.utils.random(-360, 360),
        scale: gsap.utils.random(0, 2),        
        opacity: 0,
        duration: 0.75,        
        ease: "back.out",
        delay: index * 0.01,              
    })
    
    charsTl.from(char, {
      color: `rgb(${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)})`,
      duration: 0.1,      
    }, "-=.25")


    char.addEventListener('mouseenter', charsHover)

    let charOriginalColor = window.getComputedStyle(char).color

    function charsHover() {
      gsap.timeline()
        .to(char, {
          y: gsap.utils.random(-50, 50),
          x: gsap.utils.random(-50, 50),
          rotate: gsap.utils.random(-90, 90),
          scale: gsap.utils.random(0.5, 1.5), 
          duration: .5,
          ease: "back.out",
          color: `rgb(${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)}, ${gsap.utils.random(0,255)})`,
          onStart: () => {
            char.removeEventListener('mouseenter', charsHover)
          }
        })
        .to(char, {
          y: 0,
          x: 0,
          rotate: 0,
          scale: 1,
          duration: .5,
          ease: "back.out",
          //clearProps: 'color',
          color: "#f2ebd9",
          delay: 1,
          onComplete: () => {
            setTimeout(() => {
              char.addEventListener('mouseenter', charsHover)  
            }, 100);            
          }
        })
     // 
    }


  }); // forEach


});

