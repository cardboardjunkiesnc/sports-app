import * as api from '../api/mock-api.js';
import { navigateTo } from './utils.js';

export function renderSell() {
  const root = document.createElement('div');
  const box = document.createElement('div'); box.className = 'form';
  box.innerHTML = `
    <h2>Create a listing</h2>
    <p class="kicker">Quick demo listing — paste an image URL or leave blank.</p>
    <form id="sellForm">
      <div class="row"><label for="title">Title</label><input id="title" name="title" type="text" required /></div>
      <div class="row"><label for="price">Price</label><input id="price" name="price" type="text" required /></div>
      <div class="row"><label for="condition">Condition</label><input id="condition" name="condition" type="text" required /></div>
      <div class="row"><label for="img">Image URL</label><input id="img" name="img" type="url" placeholder="https://..." /></div>
      <div class="row" style="margin-top:0.6rem;"><button type="submit">Create listing</button></div>
    </form>
  `;
  root.appendChild(box);

  const form = box.querySelector('#sellForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('sportsapp_user') || 'null');
    if (!user || !user.username) { alert('Sign in first.'); location.hash = '#/login'; return; }
    const fd = new FormData(form);
    const payload = { title: fd.get('title'), price: fd.get('price'), condition: fd.get('condition'), img: fd.get('img') };
    try {
      const created = await api.createListing(payload);
      location.hash = '#/details/' + created.id;
    } catch (err) {
      alert('Failed to create listing: ' + err.message);
    }
  });

  return root;
}