import { hotspots } from "../data/hotspots.js";
import { actions } from "../core/actions.js";

export function initHotspotsUI() {
  document.querySelectorAll(".hotspot").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const tooltip = document.getElementById("tooltip");
      const rect = el.getBoundingClientRect();

      tooltip.textContent = `click to explore ${el.dataset.action}`;
      tooltip.style.opacity = 1;
      tooltip.style.top = rect.bottom + 8 + "px";
      tooltip.style.left = rect.left + rect.width / 2 + "px";
      tooltip.style.transform = "translateX(-50%)";
    });

    el.addEventListener("mouseleave", () => {
      document.getElementById("tooltip").style.opacity = 0;
    });

    el.addEventListener("click", () => {
      const key = el.dataset.action;
      const hotspot = hotspots[key];

      if (!hotspot) {
        console.warn("Hotspot no definido:", key);
        return;
      }

      const actionName = hotspot.action;

      if (actions[actionName]) {
        actions[actionName]();
      }
    });
  });
}

