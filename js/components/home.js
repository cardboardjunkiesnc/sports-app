// js/components/home.js
export default function renderHome() {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Welcome to Sports App</h2>
    <p>This is your home screen. We’ll hook real data here later.</p>
  `;
  return div;
}
