// Simple login — stores user in localStorage
export function renderLogin() {
  const root = document.createElement('div');
  const box = document.createElement('div');
  box.className = 'form';
  box.innerHTML = `
    <h2>Login</h2>
    <p class="kicker">Enter a username to simulate login.</p>
    <form id="loginForm">
      <div class="row">
        <label for="username">Username</label>
        <input id="username" name="username" type="text" required />
      </div>
      <div class="row" style="margin-top:0.5rem;">
        <button type="submit">Sign in</button>
      </div>
    </form>
  `;
  root.appendChild(box);

  const form = box.querySelector('#loginForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = form.username.value.trim();
    if (!v) { alert('Enter username'); return; }
    const u = { username: v, loggedAt: Date.now() };
    localStorage.setItem('sportsapp_user', JSON.stringify(u));
    // notify via global hook: app listens for local event using storage subscription
    if (window.__onAuthChange) window.__onAuthChange();
    location.hash = '#/home';
  });

  return root;
}