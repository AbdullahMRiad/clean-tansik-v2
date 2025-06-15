import { boysData, girlsData } from "./data";
import { calcScoreInput, schoolScoreInput, quduratScoreInput, collegeNameInput } from "./dom";
import { displayData } from "./display";
import { scoreDisplay } from "./dom";

export function filterAndDisplay() {
  const gender: string =
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || "boys";
  const data = gender === "boys" ? boysData : girlsData;
  const filterText: string = collegeNameInput?.value.trim().toLowerCase() || "";
  const calcScoreMin: number = parseFloat(calcScoreInput?.value ?? "");
  const school: number = parseFloat(schoolScoreInput?.value ?? "");
  const qudurat: number = parseFloat(quduratScoreInput?.value ?? "");
  const checkedCategories = Array.from(
    document.querySelectorAll<HTMLInputElement>('input[name="category"]:checked')
  ).map((el) => el.value);
  const checkedTypes = Array.from(
    document.querySelectorAll<HTMLInputElement>('input[name="type"]:checked')
  ).map((el) => el.value);
  let threshold = null;
  if (!isNaN(school) && !isNaN(qudurat)) {
    threshold = (school / 2 + qudurat / 2) * 4.1;
    if (scoreDisplay) {
      scoreDisplay.textContent = `الدرجة بعد المعادلة: ${threshold.toFixed(6)}`;
    }
  } else {
    if (scoreDisplay) {
      scoreDisplay.textContent = "الدرجة بعد المعادلة: ---";
    }
  }
  const filtered = data.filter((item) => {
    if (filterText && !item.college.toLowerCase().includes(filterText))
      return false;
    if (!isNaN(calcScoreMin) && item.score > calcScoreMin + 1e-6) return false;
    if (threshold !== null && item.score > threshold + 1e-6) return false;
    if (checkedCategories.length > 0 && !checkedCategories.includes(item.category))
      return false;
    if (checkedTypes.length > 0 && !checkedTypes.includes(item.institution_type))
      return false;
    return true;
  });
  displayData(filtered);
}
