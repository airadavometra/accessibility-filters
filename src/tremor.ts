import { getRandomInt } from "./utils/getRandomInt";

const TREMOR = 20;
const TREMOR_SPEED = 50;
const TREMOR_RANGE = 2;

let adjustedX = 0;
let adjustedY = 0;

const isPointOutside = (element: HTMLElement, x: number, y: number) => {
  const rect = element.getBoundingClientRect();

  return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
};

const tremor = (cursor: HTMLElement) => {
  adjustedX = getRandomInt(-TREMOR, TREMOR);
  adjustedY = getRandomInt(-TREMOR * 2, TREMOR * 2);
  cursor.style.marginLeft = adjustedX + "px";
  cursor.style.marginTop = adjustedY + "px";

  setTimeout(
    () => tremor(cursor),
    getRandomInt(TREMOR_SPEED, TREMOR_SPEED * TREMOR_RANGE)
  );
};

const click = (e: Event) => {
  const event = e as MouseEvent;

  const interactiveElements = [
    ...document.querySelectorAll("a"),
    ...document.querySelectorAll('div[role="button"]'),
    ...document.querySelectorAll("input"),
    ...document.querySelectorAll("button"),
  ];

  for (const target of interactiveElements) {
    const targetId = target?.id;

    if (target && !targetId.includes("service-")) {
      if (!isPointOutside(target as HTMLElement, event.pageX, event.pageY)) {
        const isMissClick = isPointOutside(
          target as HTMLElement,
          event.pageX + adjustedX,
          event.pageY + adjustedY
        );

        if (isMissClick) {
          e.stopPropagation();
          e.preventDefault();
          return false;
        }
      }
    }
  }
};

export const simulateTremor = () => {
  const cursor = document.querySelector(".cursor") as HTMLElement;

  if (cursor) {
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY + "px";
    };

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("click", click, true);
    document.addEventListener("touchstart", click, true);

    tremor(cursor);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", click, true);
      document.removeEventListener("touchstart", click, true);
    };
  }

  return () => {};
};
