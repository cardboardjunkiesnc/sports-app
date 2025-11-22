// js/components/details.js
export default function renderDetails() {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Card Details</h2>
    <p>We'll show full card info here.</p>
  `;
  return div;
}
