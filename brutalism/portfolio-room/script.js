c:\Users\menikmati\Downloads\Gemini_Generated_Image_e1n89ve1n89ve1n8.pngconst hotspots = document.querySelectorAll(".hotspot")
const tooltip = document.getElementById("tooltip")

hotspots.forEach(spot=>{

```
const label = spot.dataset.label

spot.addEventListener("mouseenter",(e)=>{

    tooltip.innerText = label
    tooltip.style.opacity = 1

    gsap.to(spot,{
        scale:1.05,
        duration:.2
    })

})

spot.addEventListener("mouseleave",()=>{

    tooltip.style.opacity = 0

    gsap.to(spot,{
        scale:1,
        duration:.2
    })

})

spot.addEventListener("mousemove",(e)=>{

    tooltip.style.left = e.clientX + 15 + "px"
    tooltip.style.top = e.clientY + 15 + "px"

})

spot.addEventListener("click",()=>{

    console.log("clicked:", label)

    if(label === "Enter Portfolio"){
        enterPortfolio()
    }

})
```

})

function enterPortfolio(){

```
gsap.to("#room",{
    scale:2.2,
    x:"-20%",
    y:"-25%",
    duration:1.2,
    ease:"power2.inOut"
})
```

}
