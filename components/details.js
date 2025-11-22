import * as api from '../api/mock-api.js';

export async function renderDetails(id) {
  const root = document.createElement('div');
  const card = await api.getCardById(id);
  if (!card) {
    const box = document.createElement('div'); box.className = 'form'; box.innerHTML = `<h2>Not found</h2><p class="kicker">No card with id ${escapeHtml(id)}</p>`; root.appendChild(box); return root;
  }

  const box = document.createElement('div'); box.className = 'form';
  box.innerHTML = `
    <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start;">
      <img src="${card.img}" alt="${escapeHtml(card.title)}" style="width:320px;height:auto;border-radius:8px;object-fit:cover;">
      <div style="flex:1;min-width:220px;">
        <h2>${escapeHtml(card.title)} ${card.sold ? '<small style="color:#c33">• SOLD</small>' : ''}</h2>
        <p class="kicker">${escapeHtml(card.condition)}</p>
        <p><strong>Price:</strong> ${escapeHtml(card.price)}</p>
        <p><strong>Seller:</strong> ${card.owner || 'Marketplace'}</p>
        <div style="margin-top:1rem;">
          ${card.sold ? '<button disabled>Sold</button>' : '<button id="buyBtn">Buy</button>'}
          <a href="#/cards" style="margin-left:0.6rem;color:#0b5fff;">Back to cards</a>
        </div>
      </div>
    </div>
  `;
  root.appendChild(box);

  const buyBtn = box.querySelector('#buyBtn');
  if (buyBtn) {
    buyBtn.addEventListener('click', async () => {
      const current = JSON.parse(localStorage.getItem('sportsapp_user') || 'null');
      if (!current || !current.username) { alert('Please log in to buy'); location.hash = '#/login'; return; }
      try {
        await api.buyCard(id, current.username);
        alert('Purchase simulated — card marked as sold.');
        // re-render details
        const newNode = await renderDetails(id);
        root.replaceWith(newNode);
      } catch (err) { alert('Buy failed: ' + err.message); }
    });
  }

  return root;
}

function escapeHtml(s=''){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }