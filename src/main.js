let boysData = [];
let girlsData = [];

Promise.all([
    fetch("/b_clean_data.json").then((res) => res.json()),
    fetch("/g_clean_data.json").then((res) => res.json()),
]).then(([boys, girls]) => {
    boysData = boys;
    girlsData = girls;

    displayData(boysData);
});

document.querySelectorAll('input[name="gender"]').forEach((input) => {
    input.addEventListener("change", () => {
        const value = document.querySelector(
            'input[name="gender"]:checked',
        ).value;
        displayData(value === "boys" ? boysData : girlsData);
    });
});

function displayData(data) {
    const tbody = document.getElementById("table-body");
    const cardContainer = document.getElementById("card-container");

    // Clear existing content if any
    tbody.innerHTML = "";
    cardContainer.innerHTML = "";

    data.forEach((item) => {
        // Create table row
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td class="border border-gray-400 p-2">${item.college}</td>
      <td class="border border-gray-400 p-2">${item.score.toFixed(6)}</td>
    `;
        tbody.appendChild(tr);

        // Create mobile card
        const card = document.createElement("div");
        card.className =
            "h-min w-full rounded-3xl border-2 border-black bg-gray-200 p-2";

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