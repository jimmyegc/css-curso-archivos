function updateClock() {
  const clock = document.getElementById("clockTime");
  const hudClock = document.getElementById("hudClock");

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  clock.textContent = hours + ":" + minutes;
  hudClock.textContent = hours + ":" + minutes;
}

export function initClock() {
  updateClock();
  setInterval(updateClock, 1000);
}
