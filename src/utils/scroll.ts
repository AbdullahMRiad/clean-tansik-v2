import { topButton, tableTopButton, lastFilter } from "./dom";

export function setupScrollButtons() {
  const scrollObserver = new IntersectionObserver(HandleIntersection);
  lastFilter
    ? scrollObserver.observe(lastFilter)
    : console.error("scoreDisplay wasn't found. Observer failed.");
  topButton?.addEventListener("click", () => ScrollToTop());
  tableTopButton?.addEventListener("click", () =>
    ScrollToTop(
      document.getElementById("main-content-area")
        ? document.getElementById("main-content-area")
        : null,
    ),
  );
}

function HandleIntersection(entries: IntersectionObserverEntry[]) {
  if (!entries[0].isIntersecting && entries[0].boundingClientRect.bottom < 0) {
    topButton?.classList.toggle("translate-y-4", false);
    topButton?.classList.toggle("opacity-0", false);
    topButton?.classList.toggle("translate-y-0", true);
    topButton?.classList.toggle("opacity-100", true);
  } else {
    topButton?.classList.toggle("translate-y-4", true);
    topButton?.classList.toggle("opacity-0", true);
    topButton?.classList.toggle("translate-y-0", false);
    topButton?.classList.toggle("opacity-100", false);
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
