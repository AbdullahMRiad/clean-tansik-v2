import { statAll, statAvailable, statResults, statUnavailable } from "../utils/dom";
import { boysData, girlsData } from "../data/data";

function updateStats(filtered: any[], all: any[]) {
  // statAll: total number of colleges
  if (statAll) statAll.textContent = all.length ? all.length.toString() : "--";

  // statAvailable: number of colleges available based only on school/qudurat
  let available = "--";
  const schoolInput = document.getElementById("school-score") as HTMLInputElement | null;
  const quduratInput = document.getElementById("qudurat-score") as HTMLInputElement | null;
  const school = schoolInput ? parseFloat(schoolInput.value) : NaN;
  const qudurat = quduratInput ? parseFloat(quduratInput.value) : NaN;
  let threshold: number | null = null;
  if (!isNaN(school) && !isNaN(qudurat)) {
    threshold = (school / 2 + qudurat / 2) * 4.1;
    available = all.filter((item: any) => threshold !== null && item.score <= threshold + 1e-6).length.toString();
  }
  if (statAvailable) statAvailable.textContent = available;

  // statUnavailable: total - available (if available is a number)
  if (statUnavailable) {
    statUnavailable.textContent = (available !== "--" && all.length)
      ? (all.length - parseInt(available)).toString()
      : "--";
  }

  // statResults: number of search results (filtered)
  if (statResults) statResults.textContent = (filtered && filtered.length) ? filtered.length.toString() : "--";
}

export function updateAndShowStats(filtered: any[]) {
  const gender = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || "boys";
  const all = gender === "boys" ? boysData : girlsData;
  updateStats(filtered, all);
}

