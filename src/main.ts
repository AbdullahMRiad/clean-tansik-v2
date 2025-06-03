//#region Type
interface College {
  college: string,
  score: number
}
//#endregion

//#region Fetch JSON Data
// Import boys and girls data JSON files, then initialize display
import boysData  from './b_clean_data.json'
import girlsData from './g_clean_data.json'
filterAndDisplay()
//#endregion

//#region Input Elements References
// Get references to input elements and display elements for filtering and output
const calcScoreInput = document.getElementById("calc-score")       as HTMLInputElement | null;
const schoolScoreInput = document.getElementById("school-score")   as HTMLInputElement | null;
const quduratScoreInput = document.getElementById("qudurat-score") as HTMLInputElement | null;
const collegeNameInput = document.getElementById("college-name")   as HTMLInputElement | null;
const scoreDisplay = document.getElementById("calc-score-display");
//#endregion

//#region Event Listeners Setup
// Listen for gender radio button changes to update theme and filtered data
document.querySelectorAll('input[name="gender"]').forEach((input) =>
  input.addEventListener("change", () => {
    filterAndDisplay();
    setTheme();
  }),
);

// Listen for input changes on score and college name inputs to update filtering
[calcScoreInput, schoolScoreInput, quduratScoreInput, collegeNameInput].forEach(
  (input) => input?.addEventListener("input", filterAndDisplay),
);
//#endregion

//#region Theme Switching Function
// Updates UI colors depending on selected gender (boys or girls)
function setTheme() {
  const gender : string  = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || "boys";
  const isBoys : boolean = gender === "boys";
  // console.log(gender);

  // Toggle background color classes for elements with toggle-bg-200 class
  document.querySelectorAll(".toggle-bg-200").forEach((element) => {
    element.classList.toggle("bg-blue-200", isBoys);
    element.classList.toggle("dark:bg-slate-800", isBoys);
    element.classList.toggle("bg-red-200", !isBoys);
    element.classList.toggle("dark:bg-stone-800", !isBoys);
  });

  // Toggle ring color classes for elements with toggle-focus-ring-400 class
  document.querySelectorAll(".toggle-focus-ring-400").forEach((element) => {
    element.classList.toggle("focus:ring-blue-400", isBoys);
    element.classList.toggle("dark:focus:ring-slate-700", isBoys);
    element.classList.toggle("focus:ring-red-400", !isBoys);
    element.classList.toggle("dark:focus:ring-stone-700", !isBoys);
  });

  // Toggle ring color classes for elements with toggle-ring-400 class
  document.querySelectorAll(".toggle-ring-400").forEach((element) => {
    element.classList.toggle("ring-blue-400", isBoys);
    element.classList.toggle("dark:ring-slate-700", isBoys);
    element.classList.toggle("ring-red-400", !isBoys);
    element.classList.toggle("dark:ring-stone-700", !isBoys);
  });

  // Toggle background color classes for elements with toggle-bg-50-hover class
  document.querySelectorAll(".toggle-bg-50-hover").forEach((element) => {
    element.classList.toggle("hover:bg-blue-50", isBoys);
    element.classList.toggle("dark:hover:bg-slate-950", isBoys);
    element.classList.toggle("hover:bg-red-50", !isBoys);
    element.classList.toggle("dark:hover:bg-stone-950", !isBoys);
  });

  // Toggle background color classes for elements with toggle-bg-50 class
  document.querySelectorAll(".toggle-bg-50").forEach((element) => {
    element.classList.toggle("bg-blue-50", isBoys);
    element.classList.toggle("dark:bg-slate-950", isBoys);
    element.classList.toggle("bg-red-50", !isBoys);
    element.classList.toggle("dark:bg-stone-950", !isBoys);
  });
}
//#endregion

//#region Filtering Data and Display Update
// Filters the dataset based on user inputs and updates the display accordingly
function filterAndDisplay() {
  // Get selected gender and corresponding dataset
  const gender : string  = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || "boys";
  const data : College[] = gender === "boys" ? boysData : girlsData;

  // Get filter values from inputs
  const filterText : string = collegeNameInput?.value.trim().toLowerCase() || "";
  const calcScoreMin : number = parseFloat(calcScoreInput?.value ?? "");
  const school : number = parseFloat(schoolScoreInput?.value ?? "");
  const qudurat : number = parseFloat(quduratScoreInput?.value ?? "");

  let threshold = null;

  // Calculate threshold score if school and qudurat inputs are valid numbers
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

  // Filter the data array based on inputs and thresholds
  const filtered = data.filter((item) => {
    if (filterText && !item.college.toLowerCase().includes(filterText))
      return false;
    if (!isNaN(calcScoreMin) && item.score > calcScoreMin + 1e-6) return false;
    if (threshold !== null && item.score > threshold + 1e-6) return false;
    return true;
  });

  displayData(filtered);
}
//#endregion

//#region Display Filtered Data
// Updates both the table and card UI with filtered results
function displayData(data: College[]) {
  const tbody = document.getElementById("table-body") as HTMLTableElement;
  const cardContainer = document.getElementById("card-container") as HTMLDivElement;
  const template = document.getElementById("card-template") as HTMLTemplateElement;

  // Clear existing data
  tbody.innerHTML = "";
  cardContainer.innerHTML = "";

  // Create table rows for filtered data
  const tableFrag = document.createDocumentFragment();
  data.forEach((item, index) => {
    const tr = document.createElement("tr");
    if (index % 2 === 0) {tr.classList.add("bg-zinc-100");tr.classList.add("dark:bg-zinc-900");}
    tr.classList.add("hover:bg-blue-50");
    tr.classList.add("dark:hover:bg-slate-800");
    tr.classList.add("toggle-bg-50-hover");
    tr.innerHTML = `
            <td class="border border-gray-400/20 p-2">${item.college}</td>
            <td class="border border-gray-400/20 p-2">${item.score.toFixed(6)}</td>
        `;
    tableFrag.appendChild(tr);
  });
  tbody.appendChild(tableFrag);

  // Create card elements from template for filtered data
  const cardFrag = document.createDocumentFragment();
  data.forEach((item) => {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    (clone.querySelector("#college") as HTMLElement).textContent = item.college;
    (clone.querySelector("#score") as HTMLElement).textContent = item.score.toFixed(6);
    cardFrag.appendChild(clone);
  });
  cardContainer.appendChild(cardFrag);

  setTheme(); // Update theme for new elements
}
//#endregion
