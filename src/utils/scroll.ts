import { topButton, tableTopButton, lastFilter } from "./dom";

export function setupScrollButtons() {
  const scrollObserver = new IntersectionObserver(HandleIntersection);
  lastFilter
    ? scrollObserver.observe(lastFilter)
    : console.error("scoreDisplay wasn't found. Observer failed.");
  topButton?.addEventListener("click", () => {
    ScrollToTop();
    // Remove focus/active state after tap to prevent sticky hover on mobile
    topButton?.blur();
  });
  topButton?.addEventListener("touchend", () => {
    topButton?.blur();
  });
  tableTopButton?.addEventListener("click", () =>
    ScrollToTop(
      document.getElementById("main-content-area")
        ? document.getElementById("main-content-area")
        : null,
    ),
  );
}

function HandleIntersection(entries: IntersectionObserverEntry[]) {
  const visible = !entries[0].isIntersecting && entries[0].boundingClientRect.bottom < 0;
  if (topButton) {
    topButton.classList.toggle("translate-y-4", !visible);
    topButton.classList.toggle("opacity-0", !visible);
    topButton.classList.toggle("pointer-events-none", !visible);
    topButton.classList.toggle("translate-y-0", visible);
    topButton.classList.toggle("opacity-100", visible);
    topButton.classList.toggle("pointer-events-auto", visible);
    topButton.disabled = !visible;
    console.log(visible ? "i appear" : "i disappear")
  }
}

function ScrollToTop(element?: HTMLElement | null) {
  const scrollOptions = {
    top: 0,
    behavior: "smooth",
  } as ScrollToOptions;
  (
    element ||
    document.scrollingElement ||
    document.documentElement ||
    document.body
  ).scrollTo(scrollOptions);
}
