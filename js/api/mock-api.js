// Mock API persisted to localStorage. Async functions simulate network delay.
// Exports: cards, users, chats, pricing
const KEYS = {
  CARDS: 'sportsapp_cards_v2',
  USERS: 'sportsapp_users_v2',
  CHATS: 'sportsapp_chats_v2',
  PRICING: 'sportsapp_pricing_v2',
};

const seedCards = [
  { id: 1, title: '1996 Michael Jordan Rookie SP', price: '$2400', condition: 'Mint', img: 'https://picsum.photos/seed/card1/400/300', owner: null, sold: false },
  { id: 2, title: '2003 LeBron James Upper Deck', price: '$1200', condition: 'Near Mint', img: 'https://picsum.photos/seed/card2/400/300', owner: null, sold: false },
];

const seedPricing = [
  { id: 1, card: '1996 Michael Jordan Rookie SP', price: '$2400', source: 'Auction A', date: Date.now() },
  { id: 2, card: '2003 LeBron James Upper Deck', price: '$1200', source: 'Market B', date: Date.now() },
];

function delay(ms = 150) {
  return new Promise(res => setTimeout(res, ms));
}
function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function write(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function ensureSeed() {
  if (!read(KEYS.CARDS)) write(KEYS.CARDS, seedCards.slice());
  if (!read(KEYS.PRICING)) write(KEYS.PRICING, seedPricing.slice());
  if (!read(KEYS.CHATS)) write(KEYS.CHATS, {});
  if (!read(KEYS.USERS)) write(KEYS.USERS, {});
}
ensureSeed();

// Cards
export async function getCards() { await delay(); return read(KEYS.CARDS) || []; }
export async function getCardById(id) { await delay(); return (read(KEYS.CARDS) || []).find(c => String(c.id) === String(id)) || null; }
export async function createListing(listing) {
  await delay();
  const cards = read(KEYS.CARDS) || [];
  const nextId = Math.max(0, ...cards.map(c => c.id)) + 1;
  const user = JSON.parse(localStorage.getItem('sportsapp_user') || 'null') || {};
  const newCard = {
    id: nextId,
    title: listing.title || 'Untitled',
    price: listing.price || '$0',
    condition: listing.condition || 'Unknown',
    img: listing.img || `https://picsum.photos/seed/card${nextId}/400/300`,
    owner: user.username || null,
    sold: false,
    createdAt: Date.now(),
  };
  cards.unshift(newCard);
  write(KEYS.CARDS, cards);
  return newCard;
}
export async function buyCard(id, buyer) {
  await delay();
  const cards = read(KEYS.CARDS) || [];
  const idx = cards.findIndex(c => String(c.id) === String(id));
  if (idx === -1) throw new Error('Card not found');
  if (cards[idx].sold) throw new Error('Already sold');
  cards[idx].sold = true;
  cards[idx].owner = buyer || cards[idx].owner;
  cards[idx].soldAt = Date.now();
  write(KEYS.CARDS, cards);
  return cards[idx];
}

// Users
export async function getUserProfile(username) {
  await delay();
  const users = read(KEYS.USERS) || {};
  if (!users[username]) {
    users[username] = { username, displayName: username, bio: '', joinedAt: Date.now() };
    write(KEYS.USERS, users);
  }
  return users[username];
}
export async function updateUserProfile(username, updates = {}) {
  await delay();
  const users = read(KEYS.USERS) || {};
  users[username] = Object.assign({}, users[username] || { username }, updates);
  write(KEYS.USERS, users);
  return users[username];
}
export async function getUserListings(username) {
  await delay();
  const cards = read(KEYS.CARDS) || [];
  return cards.filter(c => c.owner === username);
}

// Chat
// chats stored as: { roomId: [{id, user, text, ts}, ...] }
export async function getChatMessages(roomId = 'global') {
  await delay();
  const chats = read(KEYS.CHATS) || {};
  return chats[roomId] || [];
}
export async function postChatMessage(roomId = 'global', message) {
  await delay();
  const chats = read(KEYS.CHATS) || {};
  if (!chats[roomId]) chats[roomId] = [];
  const nextId = Math.max(0, ...chats[roomId].map(m => m.id || 0)) + 1;
  const msg = Object.assign({ id: nextId, ts: Date.now() }, message);
  chats[roomId].push(msg);
  write(KEYS.CHATS, chats);
  return msg;
}

// Pricing
export async function getPricing() {
  await delay();
  return read(KEYS.PRICING) || [];
}
export async function addPricing(entry) {
  await delay();
  const p = read(KEYS.PRICING) || [];
  const nextId = Math.max(0, ...p.map(x => x.id)) + 1;
  const newEntry = Object.assign({ id: nextId, date: Date.now() }, entry);
  p.unshift(newEntry);
  write(KEYS.PRICING, p);
  return newEntry;
}

// Utilities for clearing seed (dev)
export function resetAll() {
  localStorage.removeItem(KEYS.CARDS);
  localStorage.removeItem(KEYS.USERS);
  localStorage.removeItem(KEYS.CHATS);
  localStorage.removeItem(KEYS.PRICING);
  ensureSeed();
}