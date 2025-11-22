import * as api from '../api/mock-api.js';

export function renderChat(room = 'global') {
  const root = document.createElement('div');
  root.className = 'form';
  root.innerHTML = `<h2>Chat — ${escape(room)}</h2><p class="kicker">Public chat room. Messages persist locally.</p>`;

  const chatWrap = document.createElement('div');
  chatWrap.className = 'chat-window';
  const messages = document.createElement('div'); messages.className = 'chat-messages';
  const form = document.createElement('form'); form.className = 'chat-form';
  const input = document.createElement('input'); input.type = 'text'; input.placeholder = 'Message';
  const send = document.createElement('button'); send.type='submit'; send.textContent='Send';
  form.appendChild(input); form.appendChild(send);

  chatWrap.appendChild(messages);
  chatWrap.appendChild(form);
  root.appendChild(chatWrap);

  async function load() {
    const msgs = await api.getChatMessages(room);
    messages.innerHTML = '';
    msgs.forEach(m => {
      const p = document.createElement('div'); p.style.marginBottom='0.5rem';
      p.innerHTML = `<strong>${escape(m.user)}</strong> <small class="muted">${new Date(m.ts).toLocaleTimeString()}</small><div>${escape(m.text)}</div>`;
      messages.appendChild(p);
    });
    messages.scrollTop = messages.scrollHeight;
  }
  load();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const user = JSON.parse(localStorage.getItem('sportsapp_user') || 'null') || { username: 'guest' };
    await api.postChatMessage(room, { user: user.username, text });
    input.value = '';
    await load();
  });

  return root;
}

function escape(s=''){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }