// Theme switching logic
export function setTheme() {
  const gender: string =
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || "boys";
  const isBoys: boolean = gender === "boys";

  document.querySelectorAll(".toggle-bg-200").forEach((element) => {
    element.classList.toggle("bg-blue-200", isBoys);
    element.classList.toggle("dark:bg-slate-800", isBoys);
    element.classList.toggle("bg-red-200", !isBoys);
    element.classList.toggle("dark:bg-stone-800", !isBoys);
  });
  document.querySelectorAll(".toggle-focus-ring-400").forEach((element) => {
    element.classList.toggle("focus:ring-blue-400", isBoys);
    element.classList.toggle("dark:focus:ring-slate-700", isBoys);
    element.classList.toggle("focus:ring-red-400", !isBoys);
    element.classList.toggle("dark:focus:ring-stone-700", !isBoys);
  });
  document.querySelectorAll(".toggle-ring-400").forEach((element) => {
    element.classList.toggle("ring-blue-400", isBoys);
    element.classList.toggle("dark:ring-slate-700", isBoys);
    element.classList.toggle("ring-red-400", !isBoys);
    element.classList.toggle("dark:ring-stone-700", !isBoys);
  });
  document.querySelectorAll(".toggle-bg-50-hover").forEach((element) => {
    element.classList.toggle("hover:bg-blue-50", isBoys);
    element.classList.toggle("dark:hover:bg-slate-950", isBoys);
    element.classList.toggle("hover:bg-red-50", !isBoys);
    element.classList.toggle("dark:hover:bg-stone-950", !isBoys);
  });
  document.querySelectorAll(".toggle-bg-50").forEach((element) => {
    element.classList.toggle("bg-blue-50", isBoys);
    element.classList.toggle("dark:bg-slate-950", isBoys);
    element.classList.toggle("bg-red-50", !isBoys);
    element.classList.toggle("dark:bg-stone-950", !isBoys);
  });
  document.querySelectorAll(".toggle-chip").forEach((element) => {
    element.classList.toggle("bg-blue-200", isBoys);
    element.classList.toggle("dark:bg-slate-800", isBoys);
    element.classList.toggle("bg-red-200", !isBoys);
    element.classList.toggle("dark:bg-stone-800", !isBoys);
    element.classList.toggle("ring-blue-400", isBoys);
    element.classList.toggle("dark:ring-slate-700", isBoys);
    element.classList.toggle("ring-red-400", !isBoys);
    element.classList.toggle("dark:ring-stone-700", !isBoys);
    element.classList.toggle("hover:bg-blue-400", isBoys);
    element.classList.toggle("dark:hover:bg-slate-700", isBoys);
    element.classList.toggle("hover:bg-red-400", !isBoys);
    element.classList.toggle("dark:hover:bg-stone-700", !isBoys);
    element.classList.toggle("active:bg-blue-700", isBoys);
    element.classList.toggle("dark:active:bg-slate-900", isBoys);
    element.classList.toggle("active:bg-red-700", !isBoys);
    element.classList.toggle("dark:active:bg-stone-900", !isBoys);
    element.classList.toggle("peer-checked:bg-blue-400", isBoys);
    element.classList.toggle("dark:peer-checked:bg-slate-700", isBoys);
    element.classList.toggle("peer-checked:bg-red-400", !isBoys);
    element.classList.toggle("dark:peer-checked:bg-stone-700", !isBoys);
  });
}
