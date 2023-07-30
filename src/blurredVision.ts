export const simulateBlurredVision = () => {
  const body = document.getElementsByTagName("body")[0] as HTMLElement;

  const filterElement = document.createElement("div");

  filterElement.style.position = "fixed";
  filterElement.style.inset = "0";
  filterElement.style.pointerEvents = "none";
  filterElement.style.backdropFilter = "blur(3px)";
  filterElement.style.zIndex = "1000000";

  filterElement.ariaHidden = "true";

  //TODO: add pulse animation

  body.appendChild(filterElement);

  return () => filterElement.remove();
};
