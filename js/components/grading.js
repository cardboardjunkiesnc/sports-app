// js/components/grading.js
export default function renderGrading() {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Grading Helper</h2>
    <p>Tools to check corners, edges, and surfaces coming soon.</p>
  `;
  return div;
}
