import * as api from '../api/mock-api.js';

export async function renderProfile() {
  const root = document.createElement('div');
  const current = JSON.parse(localStorage.getItem('sportsapp_user') || 'null');
  if (!current || !current.username) {
    const box = document.createElement('div'); box.className='form'; box.innerHTML = `<h2>Not signed in</h2><p class="kicker">Please <a href="#/login">sign in</a>.</p>`; root.appendChild(box); return root;
  }

  const username = current.username;
  const profile = await api.getUserProfile(username);
  const listings = await api.getUserListings(username);

  const box = document.createElement('div'); box.className='form';
  box.innerHTML = `
    <h2>${escape(profile.displayName || profile.username)}</h2>
    <p class="kicker">Member since ${new Date(profile.joinedAt).toLocaleDateString()}</p>
    <p>${escape(profile.bio || 'No bio yet.')}</p>
    <hr/>
    <h3>Your listings</h3>
  `;
  const listWrap = document.createElement('div'); listWrap.style.marginTop = '0.5rem';
  if (!listings || listings.length === 0) {
    listWrap.innerHTML = `<p class="center">No listings yet. <a href="#/sell">Create one</a>.</p>`;
  } else {
    const ul = document.createElement('div'); ul.className = 'cards-grid';
    listings.forEach(c => {
      const card = document.createElement('article'); card.className='card';
      card.innerHTML = `<img alt="${escape(c.title)}" src="${c.img}" /><div class="meta"><div><div class="title">${escape(c.title)}</div><div class="kicker" style="font-size:0.8rem;">${escape(c.condition)} ${c.sold? '• SOLD':''}</div></div><div class="price">${escape(c.price)}</div></div>`;
      ul.appendChild(card);
    });
    listWrap.appendChild(ul);
  }

  box.appendChild(listWrap);

  const edit = document.createElement('form'); edit.className='form'; edit.style.marginTop='0.75rem';
  edit.innerHTML = `
    <h3>Edit profile</h3>
    <div class="row"><label for="displayName">Display name</label><input id="displayName" name="displayName" type="text" value="${escape(profile.displayName || '')}" /></div>
    <div class="row"><label for="bio">Bio</label><input id="bio" name="bio" type="text" value="${escape(profile.bio || '')}" /></div>
    <div class="row" style="margin-top:0.6rem;"><button type="submit">Save</button></div>
  `;
  edit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(edit);
    await api.updateUserProfile(username, { displayName: fd.get('displayName'), bio: fd.get('bio') });
    alert('Profile saved.');
  });

  root.appendChild(box);
  root.appendChild(edit);
  return root;
}

function escape(s=''){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }