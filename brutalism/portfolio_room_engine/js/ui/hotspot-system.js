import { hotspots } from "../data/hotspots.js";

export function startHotspots() {
  Object.entries(hotspots).forEach(([id, pos]) => {
    const el = document.querySelector(".hotspot-" + id);    
    if (!el) return;
    Object.entries(pos).forEach(([key, val]) => {
      el.style[key] = val + "%";
    });
  });
}
