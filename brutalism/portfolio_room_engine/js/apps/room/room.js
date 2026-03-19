import { initParallax } from "./parallax.js";
import { initLighting } from "./lighting.js";
import { initClock } from "../clock/index.js";
import { initPoster } from "../poster/index.js";
import { initVSCode } from "../vscode/index.js";

import { state } from "../../core/state.js";

let monitorAnimations = [];

export function initMonitorReady() {
  const monitor = document.querySelector(".monitor-overlay");
  if (!monitor) return;
  if (state.monitorActive) return;

  const scaleAnim = gsap.to(monitor, {
    scale: 1.05,
    duration: 1,
    repeat: -1,
    yoyo: true,
  });

  const glowAnim = gsap.to(monitor, {
    boxShadow: "0 0 40px rgba(120,180,255,0.6)",
    repeat: -1,
    yoyo: true,
    duration: 1.25,
    ease: "sine.inOut",
  });

  monitorAnimations = [scaleAnim, glowAnim];
}

export function stopMonitorAnimations() {
  monitorAnimations.forEach((anim) => anim.kill());
  monitorAnimations = [];
}

export function initRoom() {
  //initMonitorReady();
  initLighting();
  initParallax();
  initClock();
  initPoster();
  initVSCode();
}
