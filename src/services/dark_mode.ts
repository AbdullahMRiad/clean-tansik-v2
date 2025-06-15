// Dark mode logic

import { darkModeToggle } from "../utils/dom";

export var isDark: boolean = false;

// Function to get dark mode (now only follows browser preference)
export function getDarkMode() {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
    if(!darkModeToggle) return;
    darkModeToggle.innerHTML = isDark ? "light_mode" : "dark_mode";
}

// Function to toggle dark mode (manual override, no localStorage)
export function setDarkMode() {
    isDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", isDark);
    if(!darkModeToggle) return;
    darkModeToggle.innerHTML = isDark ? "light_mode" : "dark_mode";
}