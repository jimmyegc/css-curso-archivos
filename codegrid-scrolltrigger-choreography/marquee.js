import { gsap } from "https://cdn.skypack.dev/gsap";

export function setupMarqueeAnimation() {
  const marqueeItems = gsap.utils.toArray(".marquee h1");
  if (marqueeItems.length > 0) {
    const tl = horizontalLoop(marqueeItems, {
      repeat: -1,
      paddingRight: 30,
    });
  }
}

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};

  let tl = gsap.timeline({
    repeat: config.repeat,
    defaults: { ease: "none" },
  });

  let length = items.length;
  let startX = items[0].offsetLeft;
  let widths = [];
  let xPercents = [];
  let curIndex = 0;
  let pixelsPerSecond = (config.speed || 1) * 100;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = parseFloat(gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    },
  });

  gsap.set(items, {
    x: 0,
  });

  let totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    widths[length - 1] +
    (config.paddingRight || 0);

  for (let i = 0; i < length; i++) {
    let item = items[i];
    let curX = (xPercents[i] / 100) * widths[i];
    let distanceToStart = item.offsetLeft + curX - startX;
    let distanceToLoop = distanceToStart + widths[i];

    tl.to(
      item,
      {
        xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    );

    tl.fromTo(
      item,
      {
        xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
      },
      {
        xPercent: xPercents[i],
        duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  }

  tl.progress(1, true).progress(0, true);

  return tl;
}
