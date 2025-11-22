import * as api from '../api/mock-api.js';

export async function renderPricing() {
  const root = document.createElement('div');
  const box = document.createElement('div'); box.className='form';
  box.innerHTML = `<h2>Pricing Guide</h2><p class="kicker">Reference recent sale prices.</p>`;
  root.appendChild(box);

  const listWrap = document.createElement('div'); listWrap.style.marginTop='0.5rem';
  box.appendChild(listWrap);

  const addForm = document.createElement('form'); addForm.className='form'; addForm.style.marginTop='0.6rem';
  addForm.innerHTML = `
    <h3>Add pricing</h3>
    <div class="row"><label for="pcard">Card</label><input id="pcard" name="card" type="text" required /></div>
    <div class="row"><label for="pprice">Price</label><input id="pprice" name="price" type="text" required /></div>
    <div class="row"><label for="psrc">Source</label><input id="psrc" name="source" type="text" /></div>
    <div class="row" style="margin-top:0.6rem;"><button type="submit">Add</button></div>
  `;
  root.appendChild(addForm);

  async function load() {
    const data = await api.getPricing();
    listWrap.innerHTML = '';
    if (!data || data.length === 0) listWrap.innerHTML = `<p class="center">No pricing entries yet.</p>`;
    else {
      const tbl = document.createElement('table'); tbl.className='pricing-table';
      const head = document.createElement('thead'); head.innerHTML = '<tr><th>Card</th><th>Price</th><th>Source</th><th>Date</th></tr>';
      tbl.appendChild(head);
      const body = document.createElement('tbody');
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escape(row.card)}</td><td>${escape(row.price)}</td><td>${escape(row.source || '')}</td><td>${new Date(row.date).toLocaleDateString()}</td>`;
        body.appendChild(tr);
      });
      tbl.appendChild(body);
      listWrap.appendChild(tbl);
    }
  }
  await load();

  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(addForm);
    await api.addPricing({ card: fd.get('card'), price: fd.get('price'), source: fd.get('source') });
    addForm.reset();
    await load();
  });

  return root;
}

function escape(s=''){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }