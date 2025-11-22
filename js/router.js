// Simple hash-based router with route patterns (regex)
import { renderHome } from './components/home.js';
import { renderLogin } from './components/login.js';
import { renderCardsList } from './components/cards.js';
import { renderProfile } from './components/profile.js';
import { renderSell } from './components/sell.js';
import { renderDetails } from './components/details.js';
import { renderChat } from './components/chat.js';
import { renderPricing } from './components/pricing.js';
import { renderGrading } from './components/grading.js';

const routes = [
  { pattern: /^#?\/?$|^#?\/home$/, handler: renderHome },
  { pattern: /^#?\/login$/, handler: renderLogin },
  { pattern: /^#?\/cards$/, handler: renderCardsList },
  { pattern: /^#?\/profile$/, handler: renderProfile },
  { pattern: /^#?\/sell$/, handler: renderSell },
  { pattern: /^#?\/details\/(\d+)$/, handler: renderDetails }, // group 1 -> id
  { pattern: /^#?\/chat(?:\/([^\/]+))?$/, handler: renderChat }, // optional room
  { pattern: /^#?\/pricing$/, handler: renderPricing },
  { pattern: /^#?\/grading$/, handler: renderGrading },
];

export function routeTo(hash, mountPoint) {
  const path = (hash || '#/home').replace(/^#/, '');
  // find first matching route
  let matched = null;
  let matchRes = null;
  for (const r of routes) {
    const m = ('#' + path).match(r.pattern);
    if (m) {
      matched = r;
      matchRes = m;
      break;
    }
  }
  if (!matched) matched = routes[0];

  mountPoint.innerHTML = '';
  const args = (matchRes && matchRes.length > 1) ? matchRes.slice(1) : [];
  try {
    const out = matched.handler(...args);
    if (out instanceof Promise) {
      out.then(node => mountPoint.appendChild(node));
    } else {
      mountPoint.appendChild(out);
    }
  } catch (err) {
    const errNode = document.createElement('div');
    errNode.className = 'form';
    errNode.innerHTML = `<h2>Error</h2><pre>${err.message}</pre>`;
    mountPoint.appendChild(errNode);
    console.error(err);
  }
  // highlight active nav link
  document.querySelectorAll('#nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const lp = href.replace(/^#/, '').split('?')[0] || '/';
    const cur = path.split('?')[0];
    if (lp === cur || (lp !== '/' && cur.startsWith(lp))) a.classList.add('active');
    else a.classList.remove('active');
  });
}