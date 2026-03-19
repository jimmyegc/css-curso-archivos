
import {applyHotspots} from "./ui/hotspot-system.js"
import {initHotspotEvents} from "./ui/hotspots-ui.js"

function init(){

applyHotspots()

initHotspotEvents()

console.log("Portfolio Room Engine Started")

}

document.addEventListener("DOMContentLoaded",init)
