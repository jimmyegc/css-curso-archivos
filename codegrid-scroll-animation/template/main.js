import { vertexShader, fragmentShader } from "./shaders.js";

// Three.js
import * as THREE from "https://unpkg.com/three@0.158.0/build/three.module.js";

// GSAP
import gsap from "https://cdn.skypack.dev/gsap@3.12.5";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap@3.12.5/ScrollTrigger";

// Split text
import SplitType from "https://cdn.jsdelivr.net/npm/split-type@0.3.4/+esm";

// Lenis
import Lenis from "https://cdn.skypack.dev/@studio-freight/lenis@1.0.42";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- LENIS ---------------- */

const lenis = new Lenis({
  smooth: true,
});

lenis.on("scroll", ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* 🔥 CLAVE PARA QUE FUNCIONE */
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

/* ---------------- THREE ---------------- */

const CONFIG = {
  color: "#ebf5df",
  spread: 0.5,
  speed: 2,
};

const canvas = document.querySelector(".hero-canvas");
const hero = document.querySelector(".hero");

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);

function resize() {
  renderer.setSize(hero.offsetWidth, hero.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
resize();
window.addEventListener("resize", resize);

function hexToRgb(hex) {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return res
    ? {
        r: parseInt(res[1], 16) / 255,
        g: parseInt(res[2], 16) / 255,
        b: parseInt(res[3], 16) / 255,
      }
    : { r: 1, g: 1, b: 1 };
}

const rgb = hexToRgb(CONFIG.color);

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true,
  uniforms: {
    uProgress: { value: 0 },
    uResolution: {
      value: new THREE.Vector2(hero.offsetWidth, hero.offsetHeight),
    },
    uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
    uSpread: { value: CONFIG.spread },
  },
});

const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let scrollProgress = 0;

function animate() {
  material.uniforms.uProgress.value = scrollProgress;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

lenis.on("scroll", ({ scroll }) => {
  const maxScroll = hero.offsetHeight + window.innerHeight;
  scrollProgress = Math.min((scroll / maxScroll) * CONFIG.speed, 1.1);
});

/* ---------------- TEXTO ---------------- */

const heroH2 = document.querySelector(".hero-content h2");
const split = new SplitType(heroH2, { types: "words" });
const words = split.words;

gsap.set(words, { opacity: 0 });

ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: true,
  onUpdate: (self) => {
    words.forEach((word, i) => {
      gsap.to(word, {
        opacity: self.progress * words.length > i ? 1 : 0,
        overwrite: true,
      });
    });
  },
});
