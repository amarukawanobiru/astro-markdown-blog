import { dragAndDrop } from "@/scripts/dragAndDrop.js";
import { footnote } from "@/scripts/footnote.js";

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    dragAndDrop();
    footnote();
  }
});
