// Import boys and girls data JSON files
import boysDataRaw from "./b_updated_data.json";
import girlsDataRaw from "./g_updated_data.json";

// Import modules
import { setTheme } from "./theme";
import { filterAndDisplay } from "./filter";
import { setupScrollButtons } from "./scroll";
import * as dom from "./dom";
import * as dark_mode from "./dark_mode";

// Initialize first data view
filterAndDisplay();

// Switch dark mode based on preferences
dark_mode.getDarkMode()

// Event Listeners Setup
// Listen for gender radio button changes to update theme and filtered data
document.querySelectorAll('input[name="gender"]').forEach((input) =>
  input.addEventListener("change", () => {
    filterAndDisplay();
    setTheme();
  }),
);

// Listen for input changes on score and college name inputs to update filtering
[dom.calcScoreInput, dom.schoolScoreInput, dom.quduratScoreInput, dom.collegeNameInput].forEach(
  (input) => input?.addEventListener("input", filterAndDisplay),
);

document.querySelectorAll('input[name="category"]').forEach((input) =>
  input.addEventListener("change", filterAndDisplay)
);
document.querySelectorAll('input[name="type"]').forEach((input) =>
  input.addEventListener("change", filterAndDisplay)
);

// Listen for clicks on the dark mode toggle
dom.darkModeToggle?.addEventListener("click", () => { dark_mode.setDarkMode(); })

// Setup scroll to top buttons
setupScrollButtons();
