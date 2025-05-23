let boysData = [];
let girlsData = [];

// Fetch JSON
Promise.all([
    fetch("/b_clean_data.json").then((res) => res.json()),
    fetch("/g_clean_data.json").then((res) => res.json()),
]).then(([boys, girls]) => {
    boysData = boys;
    girlsData = girls;
    filterAndDisplay(); // Initial display
});

// Input references
const calcScoreInput = document.getElementById("calc-score");
const schoolScoreInput = document.getElementById("school-score");
const quduratScoreInput = document.getElementById("qudurat-score");
const collegeNameInput = document.getElementById("college-name");
const scoreDisplay = document.getElementById("calc-score-display");

// Attach listeners
document.querySelectorAll('input[name="gender"]').forEach((input) =>
    input.addEventListener("change", filterAndDisplay)
);

[calcScoreInput, schoolScoreInput, quduratScoreInput, collegeNameInput].forEach((input) =>
    input?.addEventListener("input", filterAndDisplay)
);

function filterAndDisplay() {
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "boys";
    const data = gender === "boys" ? boysData : girlsData;

    const filterText = collegeNameInput?.value.trim().toLowerCase() || "";
    const calcScoreMin = parseFloat(calcScoreInput?.value);
    const school = parseFloat(schoolScoreInput?.value);
    const qudurat = parseFloat(quduratScoreInput?.value);

    let threshold = null;

    // Only calculate threshold if both inputs are valid numbers
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

    const filtered = data.filter((item) => {
        if (filterText && !item.college.toLowerCase().includes(filterText)) return false;
        if (!isNaN(calcScoreMin) && item.score > calcScoreMin) return false;
        if (threshold !== null && item.score > threshold) return false;
        return true;
    });

    displayData(filtered);
}

function displayData(data) {
    const tbody = document.getElementById("table-body");
    const cardContainer = document.getElementById("card-container");

    tbody.innerHTML = "";
    cardContainer.innerHTML = "";

    data.forEach((item) => {
        // Table view
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="border border-gray-400 p-2">${item.college}</td>
            <td class="border border-gray-400 p-2">${item.score.toFixed(6)}</td>
        `;
        tbody.appendChild(tr);

        // Card view
        const card = document.createElement("div");
        card.className = "h-min w-full rounded-3xl border-2 border-black bg-gray-200 p-2";
        card.innerHTML = `
            <div class="mb-2 h-20 w-full rounded-3xl border-2 border-black bg-white p-4 text-center">
                ${item.college}
            </div>
            <div class="h-20 w-full rounded-3xl border-2 border-black bg-white text-center text-2xl leading-20">
                ${item.score.toFixed(6)}
            </div>
        `;
        cardContainer.appendChild(card);
    });
}
