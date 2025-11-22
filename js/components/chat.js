 // js/components/chat.js
export default function renderChat() {
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>Chat</h2>
    <p>Real-time hobby chat will live here.</p>
  `;
  return div;
}
   