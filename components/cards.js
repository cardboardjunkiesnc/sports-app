import * as api from '../api/mock-api.js';
import { navigateTo } from './utils.js';

export async function renderCardsList() {
  const root = document.createElement('div');

  const header = document.createElement('div');
  header.className = 'form';
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.innerHTML = '<strong>Cards Marketplace</strong><small class="muted">Browse or sell your cards</small>';
  root.appendChild(header);

  const search = document.createElement('div');
  search.style.marginTop = '0.6rem';
  search.innerHTML = `<input type="search" placeholder="Search cards..." />`;
  root.appendChild(search);

  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  root.appendChild(grid);

  let list = await api.getCards();

  function renderItems(items) {
    grid.innerHTML = '';
    if (!items || items.length === 0) {
      const p = document.createElement('p'); p.className = 'center'; p.textContent = 'No cards found.'; grid.appendChild(p); return;
    }
    items.forEach(c => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img alt="${escapeHtml(c.title)}" src="${c.img}" />
        <div class="meta">
          <div>
            <div class="title">${escapeHtml(c.title)}</div>
            <div class="kicker" style="font-size:0.8rem;">${escapeHtml(c.condition)} ${c.sold ? '• SOLD' : ''}</div>
          </div>
          <div class="price">${escapeHtml(c.price)}</div>
        </div>
      `;
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => navigateTo(`/details/${c.id}`));
      grid.appendChild(card);
    });
  }
  renderItems(list);

  const input = search.querySelector('input');
  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return renderItems(list);
    renderItems(list.filter(i => (i.title + ' ' + (i.condition || '')).toLowerCase().includes(q)));
  });

  return root;
}

function escapeHtml(s=''){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }