import { loadHeaderFooter } from "./utils.mjs";

// Load the header and footer
await loadHeaderFooter()

// Get current year for footer
const today = new Date()
const currentYear = today.getFullYear()
document.querySelector('#currentYear').textContent = currentYear

// Get last modified date and time
document.querySelector('#lastModified').textContent = document.lastModified