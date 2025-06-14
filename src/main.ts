//#region Type
export type Category =
    | "طب"
    | "طب أسنان"
    | "علاج طبيعي"
    | "صيدلة"
    | "هندسة"
    | "حاسبات ومعلومات"
    | "اقتصاد وعلوم سياسية"
    | "إعلام"
    | "ألسن"
    | "علوم"
    | "تمريض"
    | "حقوق"
    | "تجارة"
    | "آداب"
    | "تخطيط عمراني"
    | "فنون جميلة"
    | "فنون تطبيقية"
    | "الاعاقة والتأهيل"
    | "تربية"
    | "أخرى";

export type InstitutionType =
    | "كلية"
    | "معهد"
    | "انتساب موجه";

export type IconType =
    | "medical_services"
    | "dentistry"
    | "fitness_center"
    | "pharmacy"
    | "engineering"
    | "computer"
    | "category"
    | "science"
    | "account_balance"
    | "campaign"
    | "language"
    | "local_hospital"
    | "gavel"
    | "storefront"
    | "location_city"
    | "palette"
    | "brush"
    | "accessible"
    | "school"
    | "book";

interface College {
  college: string,
  category: Category,
  institution_type: InstitutionType,
  score: number,
  icon: IconType
}
//#endregion

//#region Fetch JSON Data
// Import boys and girls data JSON files
import boysDataRaw from "./b_updated_data.json";
import girlsDataRaw from "./g_updated_data.json";

// Helper function to cast string properties to the correct union types
function mapToCollege(data: any[]): College[] {
  return data.map(item => ({
    college: item.college,
    category: item.category as Category,
    institution_type: item.institution_type as InstitutionType,
    score: item.score,
    icon: item.icon as IconType,
  }));
}

const boysData: College[] = mapToCollege(boysDataRaw);
const girlsData: College[] = mapToCollege(girlsDataRaw);
//#endregion

//#region Input Elements References
// Get references to input elements and display elements for filtering and output
const calcScoreInput = document.getElementById(
  "calc-score",
) as HTMLInputElement | null;
const schoolScoreInput = document.getElementById(
  "school-score",
) as HTMLInputElement | null;
const quduratScoreInput = document.getElementById(
  "qudurat-score",
) as HTMLInputElement | null;
const collegeNameInput = document.getElementById(
  "college-name",
) as HTMLInputElement | null;
const scoreDisplay = document.getElementById("calc-score-display");
//#endregion

// Initialize first data view
filterAndDisplay();

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
  const gender: string =
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)
      ?.value || "boys";
  const isBoys: boolean = gender === "boys";
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
  const gender: string =
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)
      ?.value || "boys";
  const data: College[] = gender === "boys" ? boysData : girlsData;

  // Get filter values from inputs
  const filterText: string = collegeNameInput?.value.trim().toLowerCase() || "";
  const calcScoreMin: number = parseFloat(calcScoreInput?.value ?? "");
  const school: number = parseFloat(schoolScoreInput?.value ?? "");
  const qudurat: number = parseFloat(quduratScoreInput?.value ?? "");

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
  const cardContainer = document.getElementById(
    "card-container",
  ) as HTMLDivElement;
  const template = document.getElementById(
    "card-template",
  ) as HTMLTemplateElement;

  // Clear existing data
  tbody.innerHTML = "";
  cardContainer.innerHTML = "";

  // Create table rows for filtered data
  const tableFrag = document.createDocumentFragment();
  data.forEach((item, index) => {
    const tr = document.createElement("tr");
    if (index % 2 === 0) {
      tr.classList.add("bg-zinc-100");
      tr.classList.add("dark:bg-zinc-900");
    }
    tr.classList.add("hover:bg-blue-50");
    tr.classList.add("dark:hover:bg-slate-800");
    tr.classList.add("toggle-bg-50-hover");
    tr.innerHTML = `
            <td class="border border-gray-400/20 p-2 material-symbols-outlined">${item.icon}</td>
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
    (clone.querySelector("#score") as HTMLElement).textContent =
      item.score.toFixed(6);
    cardFrag.appendChild(clone);
  });
  cardContainer.appendChild(cardFrag);

  setTheme(); // Update theme for new elements
}
//#endregion

//#region Scroll to top button logic
// Reference to the button
const topButton = document.getElementById(
  "top-button",
) as HTMLButtonElement | null;
// Reference to the scroll to table top button
const tableTopButton = document.getElementById(
  "table-top-button",
) as HTMLButtonElement | null;
// Define scroll observer and its callback
const scrollObserver = new IntersectionObserver(HandleIntersection);
// Start observing if the score display label is not null
scoreDisplay
  ? scrollObserver.observe(scoreDisplay)
  : console.error("scoreDisplay wasn't found. Observer failed.");

// Listen for click event on the button
topButton?.addEventListener("click", () => ScrollToTop());
// Listen for click event on the scroll to table top button
tableTopButton?.addEventListener("click", () =>
  ScrollToTop(
    document.getElementById("main-content-area")
      ? document.getElementById("main-content-area")
      : null,
  ),
);

// A function to handle filters appearing and disappearing (callback in scrollObserver)
function HandleIntersection(entries: IntersectionObserverEntry[]) {
  if (!entries[0].isIntersecting && entries[0].boundingClientRect.bottom < 0) {
    // Filters disappeared. Show button.
    topButton?.classList.toggle("translate-y-4", false);
    topButton?.classList.toggle("opacity-0", false);
    topButton?.classList.toggle("translate-y-0", true);
    topButton?.classList.toggle("opacity-100", true);
  } else {
    // Filters appeared. Hide button.
    topButton?.classList.toggle("translate-y-4", true);
    topButton?.classList.toggle("opacity-0", true);
    topButton?.classList.toggle("translate-y-0", false);
    topButton?.classList.toggle("opacity-100", false);
  }
}

// A function to handle scroll to top button click
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

//#endregion
