// js/components/home.js

export function renderHome() {
  const page = document.createElement("section");
  page.className = "home-page";

  // === HERO SECTION ===
  const hero = document.createElement("div");
  hero.className = "hero";

  // Left side of hero
  const left = document.createElement("div");

  const title = document.createElement("h2");
  title.className = "hero-title";
  title.textContent = "Your Sports Card HQ";

  const subtitle = document.createElement("p");
  subtitle.className = "hero-subtitle";
  subtitle.textContent =
    "Track, price, and manage your entire sports card collection in one clean, simple dashboard.";

  const actions = document.createElement("div");
  actions.className = "hero-actions";

  const exploreBtn = document.createElement("a");
  exploreBtn.href = "#/cards";
  exploreBtn.className = "btn primary";
  exploreBtn.textContent = "Browse Cards";

  const pricingBtn = document.createElement("a");
  pricingBtn.href = "#/pricing";
  pricingBtn.className = "btn secondary";
  pricingBtn.textContent = "View Pricing Tools";

  actions.appendChild(exploreBtn);
  actions.appendChild(pricingBtn);

  left.appendChild(title);
  left.appendChild(subtitle);
  left.appendChild(actions);

  // Right side highlight box
  const highlight = document.createElement("aside");
  highlight.className = "hero-highlight";

  const highlightTitle = document.createElement("h3");
  highlightTitle.className = "hero-highlight-title";
  highlightTitle.textContent = "Today in Your Hobby";

  const statsList = document.createElement("ul");
  statsList.className = "hero-stats";

  const statItems = [
    { label: "Cards tracked", value: "1,250+" },
    { label: "Top sale (this week)", value: "$4,200" },
    { label: "Active watchlist", value: "18 cards" },
  ];

  statItems.forEach((s) => {
    const li = document.createElement("li");

    const labelSpan = document.createElement("span");
    labelSpan.className = "stat-label";
    labelSpan.textContent = s.label;

    const valueSpan = document.createElement("span");
    valueSpan.className = "stat-value";
    valueSpan.textContent = s.value;

    li.appendChild(labelSpan);
    li.appendChild(valueSpan);
    statsList.appendChild(li);
  });

  highlight.appendChild(highlightTitle);
  highlight.appendChild(statsList);

  hero.appendChild(left);
  hero.appendChild(highlight);

  // === FEATURE GRID ===
  const featureGrid = document.createElement("div");
  featureGrid.className = "feature-grid";

  const features = [
    {
      title: "Live Card Browser",
      text: "Search, filter, and click into detailed views of your favorite players and sets.",
    },
    {
      title: "Pricing Snapshot",
      text: "Get a quick feel for what’s up, what’s down, and where the hobby is moving.",
    },
    {
      title: "Grading Prep",
      text: "Flag cards that might be worth grading and keep notes on condition.",
    },
    {
      title: "Marketplace Ready",
      text: "Use the Sell page as your starting point to move cards quickly and confidently.",
    },
  ];

  features.forEach((f) => {
    const card = document.createElement("article");
    card.className = "feature-card";

    const h3 = document.createElement("h3");
    h3.textContent = f.title;

    const p = document.createElement("p");
    p.textContent = f.text;

    card.appendChild(h3);
    card.appendChild(p);
    featureGrid.appendChild(card);
  });

  // Put hero + features on the page
  page.appendChild(hero);
  page.appendChild(featureGrid);

  return page;
}
