// js/components/profile.js
export default function renderProfile() {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Your Profile</h2>
    <p>Profile details and settings go here.</p>
  `;
  return div;
}
