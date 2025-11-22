// js/components/cards.js
export default function renderCards() {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Cards</h2>
    <p>Here we'll show your sports card feed and filters.</p>
  `;
  return div;
}
