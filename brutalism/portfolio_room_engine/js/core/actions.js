import { powerOnMonitor } from "../apps/monitor.js";
import { commands } from "../apps/terminal.js";

export const actions = {
  monitorPower() {
    powerOnMonitor();
  },

  aboutMe() {
    commands.about();
  },

  openProjects() {
    commands.projects();
  },

  openSkills() {
    commands.skills();
  },

  openEducation() {
    commands.education();
  },

  openResume() {
    commands.resume();
  },
};
