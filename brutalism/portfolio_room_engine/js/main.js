import { initRoom } from "./apps/room/room.js";
import { startLoader, skipLoader } from "./systems/loader.js";
import { initHotspots } from "./modules/hotspots/index.js";
import { initThemeToggle } from "./apps/theme.js";
import { initProjects } from "./apps/projects/index.js";
import { initIntro } from "./apps/intro.js";
import { initStory } from "./apps/story.js";
import "./apps/audio/index.js";

function init() {
  skipLoader();
  initRoom();
  //initAudio();
  //initEditor();
  //initBoot();
  initHotspots();
  initThemeToggle();
  initProjects();
  initIntro();
  initStory();
  console.log("Portfolio Room Engine Started");
}

document.addEventListener("DOMContentLoaded", init);
