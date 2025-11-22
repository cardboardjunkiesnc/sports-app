import { renderCardsList } from './cards.js';

export function renderHome() {
  const root = document.createElement('div');

  const intro = document.createElement('section');
  intro.className = 'form';
  intro.innerHTML = `
    <p class="kicker">Welcome to the Sports App — client-side demo.</p>
    <h2>Discover sports cards, buy/sell, chat, and use tools.</h2>
    <p>Use the navigation to explore marketplace, pricing guide, grading tool, and chat.</p>
  `;
  root.appendChild(intro);

  // quick featured cards
  const featuredWrap = document.createElement('div');
  featuredWrap.style.marginTop = '0.75rem';
  const cardsNode = renderCardsList();
  if (cardsNode instanceof Promise) {
    cardsNode.then(node => featuredWrap.appendChild(node));
  } else {
    featuredWrap.appendChild(cardsNode);
  }
  root.appendChild(featuredWrap);

  return root;
}