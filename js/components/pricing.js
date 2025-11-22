// js/components/pricing.js
export default function renderPricing() {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Pricing</h2>
    <p>Recent sale comps and price guide will go here.</p>
  `;
  return div;
}
