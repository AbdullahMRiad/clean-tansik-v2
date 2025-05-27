let boysData = [];
let girlsData = [];

//#region Fetch JSON Data
// Load boys and girls data JSON files asynchronously, then initialize display
Promise.all([
    fetch("/b_clean_data.json").then((res) => res.json()),
    fetch("/g_clean_data.json").then((res) => res.json()),
]).then(([boys, girls]) => {
    boysData = boys;
    girlsData = girls;
    filterAndDisplay(); // Show initial filtered data after loading
});
//#endregion

//#region Input Elements References
// Get references to input elements and display elements for filtering and output
const calcScoreInput = document.getElementById("calc-score");
const schoolScoreInput = document.getElementById("school-score");
const quduratScoreInput = document.getElementById("qudurat-score");
const collegeNameInput = document.getElementById("college-name");
const scoreDisplay = document.getElementById("calc-score-display");
//#endregion

//#region Event Listeners Setup
// Listen for gender radio button changes to update theme and filtered data
document.querySelectorAll('input[name="gender"]').forEach((input) =>
    input.addEventListener("change", () => {
        filterAndDisplay();
        setTheme();
    })
);

// Listen for input changes on score and college name inputs to update filtering
[calcScoreInput, schoolScoreInput, quduratScoreInput, collegeNameInput].forEach((input) =>
    input?.addEventListener("input", filterAndDisplay)
);
//#endregion

//#region Theme Switching Function
// Updates UI colors depending on selected gender (boys or girls)
function setTheme() {
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "boys";
    const isBoys = gender === "boys";
    console.log(gender);

    // Toggle background color classes for elements with toggle-bg-200 class
    document.querySelectorAll(".toggle-bg-200").forEach(
        (element) => {
            element.classList.toggle("bg-blue-200", isBoys);
            element.classList.toggle("bg-red-200", !isBoys);
        }
    );

    // Toggle ring color classes for elements with toggle-ring-500 class
    document.querySelectorAll(".toggle-ring-500").forEach(
        (element) => {
            element.classList.toggle("focus:ring-blue-500", isBoys);
            element.classList.toggle("focus:ring-red-500", !isBoys);
        }
    );

    // Toggle background color classes for elements with toggle-bg-100 class
    document.querySelectorAll(".toggle-bg-100").forEach(
        (element) => {
            element.classList.toggle("bg-blue-100", isBoys);
            element.classList.toggle("bg-red-100", !isBoys);
        }
    );
}
//#endregion

//#region Filtering Data and Display Update
// Filters the dataset based on user inputs and updates the display accordingly
function filterAndDisplay() {
    // Get selected gender and corresponding dataset
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "boys";
    const data = gender === "boys" ? boysData : girlsData;

    // Get filter values from inputs
    const filterText = collegeNameInput?.value.trim().toLowerCase() || "";
    const calcScoreMin = parseFloat(calcScoreInput?.value);
    const school = parseFloat(schoolScoreInput?.value);
    const qudurat = parseFloat(quduratScoreInput?.value);

    let threshold = null;

    // Calculate threshold score if school and qudurat inputs are valid numbers
    if (!isNaN(school) && !isNaN(qudurat)) {
        threshold = ((school / 2) + (qudurat / 2)) * 4.10;
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
        if (filterText && !item.college.toLowerCase().includes(filterText)) return false;
        if (!isNaN(calcScoreMin) && item.score > calcScoreMin) return false;
        if (threshold !== null && item.score > threshold) return false;
        return true;
    });

    displayData(filtered);
}
//#endregion

//#region Display Filtered Data
// Updates both the table and card UI with filtered results
function displayData(data) {
    const tbody = document.getElementById("table-body");
    const cardContainer = document.getElementById("card-container");
    const template = document.getElementById("card-template");

    // Clear existing data
    tbody.innerHTML = "";
    cardContainer.innerHTML = "";

    // Create table rows for filtered data
    const tableFrag = document.createDocumentFragment();
    data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="border border-gray-400 p-2">${item.college}</td>
            <td class="border border-gray-400 p-2">${item.score.toFixed(6)}</td>
        `;
        tableFrag.appendChild(tr);
    });
    tbody.appendChild(tableFrag);

    // Create card elements from template for filtered data
    const cardFrag = document.createDocumentFragment();
    data.forEach((item) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("#college").textContent = item.college;
        clone.querySelector("#score").textContent = item.score.toFixed(6);
        cardFrag.appendChild(clone);
    });
    cardContainer.appendChild(cardFrag);

    setTheme(); // Update theme for new elements
}
//#endregion