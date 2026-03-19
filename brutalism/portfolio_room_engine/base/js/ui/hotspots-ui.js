
export function initHotspotEvents(){

document.querySelectorAll(".hotspot").forEach(el=>{

el.addEventListener("mouseenter",()=>{

const tooltip=document.getElementById("tooltip")

tooltip.textContent=el.dataset.action

tooltip.style.opacity=1

})

el.addEventListener("mouseleave",()=>{

document.getElementById("tooltip").style.opacity=0

})

})

}
