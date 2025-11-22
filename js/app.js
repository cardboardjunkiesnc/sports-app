import { renderNavbar } from "./components/navbar.js";

console.log("Sports App JS loaded");

// Optional: set footer year if the span exists
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Render the navbar into the <nav id="nav"> element
const navContainer = document.getElementById("nav");
if (navContainer) {
  navContainer.innerHTML = "";
  navContainer.appendChild(renderNavbar());
}

// Add a little starter content so we know JS ran
const main = document.querySelector("main");
if (main) {
  const card = document.createElement("section");
  card.className = "hero-card";

  card.innerHTML = `
    <h2 class="hero-title">Welcome to Sports App</h2>
    <p class="hero-text">
      This is your starter layout. Next up, we’ll add navigation and simple pages
      for things like Cards, Pricing, and Chat.
    </p>
  `;

  main.appendChild(card);
}
