import { setTheme } from "./theme";
import { tbody, cardContainer, template } from "../utils/dom";
import type { College } from "../types/types";

export function displayData(data: College[]) {
  tbody.innerHTML = "";
  cardContainer.innerHTML = "";
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
  const cardFrag = document.createDocumentFragment();
  data.forEach((item) => {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    (clone.querySelector("#college") as HTMLElement).textContent = item.college;
    (clone.querySelector("#score") as HTMLElement).textContent =
      item.score.toFixed(6);
    cardFrag.appendChild(clone);
  });
  cardContainer.appendChild(cardFrag);
  setTheme();
}
