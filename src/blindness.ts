export const simulateBlindness = () => {
  const body = document.getElementsByTagName("body")[0] as HTMLElement;

  const filterElement = document.createElement("div");

  filterElement.style.position = "absolute";
  filterElement.style.inset = "0";
  filterElement.style.pointerEvents = "none";
  filterElement.style.backgroundColor = "#80808090";
  filterElement.style.backdropFilter = "blur(100px)";

  filterElement.ariaHidden = "true";

  body.appendChild(filterElement);
};
